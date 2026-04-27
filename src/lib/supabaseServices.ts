import { createClient } from './supabase';
import { isVideoFile, isYouTubeURL } from './mediaUtils';

const supabase = createClient();


export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate?: string;
  venue?: string;
  message: string;
}

export interface MediaItem {
  id?: string;
  title: string;
  description?: string;
  url: string;
  type: 'image' | 'video';
  category: string;
  createdAt: any;
  size?: 'normal' | 'wide' | 'tall';
  sourceTable?: 'media' | 'services' | 'music';
}


export const submitContactForm = async (formData: ContactFormData) => {
  try {
    const { data, error } = await supabase
      .from('contact_inquiries')
      .insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        event_type: formData.eventType,
        event_date: formData.eventDate,
        venue: formData.venue,
        message: formData.message,
        status: 'new',
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    return { success: true, id: data.id };
  } catch (error: any) {
    console.error('Error submitting contact form:', error);
    return { success: false, error: error.message };
  }
};

export const subscribeToNewsletter = async (email: string) => {
  try {
    if (!email || !email.includes('@')) {
      return { success: false, message: 'Invalid email address' };
    }

    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert({
        email: email.toLowerCase(),
        subscribed_at: new Date().toISOString(),
        is_active: true
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase Error details:', error);
      if (error.code === '23505') { // Unique violation
        return { success: false, message: 'Email already subscribed' };
      }
      throw error;
    }

    return { success: true, id: data.id, message: 'Successfully subscribed!' };
  } catch (error: any) {
    console.error('Full Error Object:', error);
    return { success: false, error: error.message, message: 'Subscription failed' };
  }
};

// --- Media Services ---

export const uploadMedia = async (
  file: File, 
  metadata: { title: string; category: string; type: 'image' | 'video'; size?: 'normal' | 'wide' | 'tall' }
) => {
  try {
    const res = await uploadFile(file, 'media');
    if (!res.success) throw new Error(res.error);

    // 3. Save metadata to Database
    const { data: dbData, error: dbError } = await supabase
      .from('media')
      .insert({
        title: metadata.title,
        category: metadata.category,
        type: metadata.type,
        url: res.url,
        size: metadata.size || 'normal',
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (dbError) throw dbError;

    return { success: true, id: dbData.id, url: res.url };
  } catch (error: any) {
    console.error('Error uploading media:', error);
    return { success: false, error: error.message };
  }
};

export const uploadFile = async (file: File, bucket = 'media') => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `${fileName}`; // Removed redundant 'media/' prefix as bucket is 'media'

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return { success: true, url: publicUrl };
  } catch (error: any) {
    console.error('Error in uploadFile:', error);
    return { success: false, error: error.message };
  }
};


export const getMediaItems = async (category?: string, type?: 'image' | 'video', maxItems = 50) => {
  try {
    console.log('Fetching combined media items...', { category, type });

    // 1. Fetch from 'media' table (Gallery tab)
    let mediaQuery = supabase
      .from('media')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(maxItems);
    
    if (category && category !== 'all') {
      mediaQuery = mediaQuery.ilike('category', `%${category}%`);
    }
    if (type) {
      mediaQuery = mediaQuery.eq('type', type);
    }
    
    // 2. Fetch from 'services' table (Events tab)
    let servicesQuery = supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(maxItems);

    if (category && category !== 'all') {
      servicesQuery = servicesQuery.ilike('type', `%${category}%`);
    }

    // 3. Fetch from 'music' table (Music tab - only videos)
    let musicQuery = supabase
      .from('music')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(maxItems);

    if (type === 'image') {
       musicQuery = musicQuery.eq('id', 'non-existent'); 
    } else {
       musicQuery = musicQuery.eq('type', 'video');
    }

    const [mediaRes, servicesRes, musicRes] = await Promise.all([mediaQuery, servicesQuery, musicQuery]);

    if (mediaRes.error) console.error('Media fetch error:', mediaRes.error);
    if (servicesRes.error) console.error('Services fetch error:', servicesRes.error);
    if (musicRes.error) console.error('Music fetch error:', musicRes.error);

    const mediaItems = (mediaRes.data || []).map(item => ({
      id: item.id,
      title: item.title,
      url: item.url,
      type: (item.type === 'video' || isVideoFile(item.url) || isYouTubeURL(item.url)) ? 'video' : 'image',
      category: item.category.toLowerCase().includes('introduction') ? 'introduction' : 
                item.category.toLowerCase().includes('wedding') ? 'weddings' :
                item.category.toLowerCase().includes('corporate') ? 'corporate' :
                item.category.toLowerCase().includes('live') ? 'live' : 
                item.category.toLowerCase().includes('private') ? 'private' : 
                item.category.toLowerCase(), // fallback to original
      size: item.size || 'normal',
      createdAt: item.created_at,
      sourceTable: 'media',
    }));

    const serviceItems = (servicesRes.data || []).map(item => ({
      id: item.id,
      title: item.title,
      url: item.media_url,
      type: (isVideoFile(item.media_url) || isYouTubeURL(item.media_url)) ? 'video' : 'image',
      category: item.type.toLowerCase().includes('wedding') ? 'weddings' : 
                item.type.toLowerCase().includes('corporate') ? 'corporate' :
                item.type.toLowerCase().includes('introduction') ? 'introduction' :
                item.type.toLowerCase().includes('live') ? 'live' : 'private',
      size: 'normal',
      createdAt: item.created_at,
      sourceTable: 'services',
    }));

    const musicItems = (musicRes.data || []).map(item => ({
      id: item.id,
      title: item.title,
      url: item.type === 'video' ? item.url : (item.thumbnail || item.url),
      type: (item.type === 'video' || isVideoFile(item.url) || isYouTubeURL(item.url)) ? 'video' : 'image',
      category: item.title.toLowerCase().includes('wedding') ? 'weddings' : 
                item.title.toLowerCase().includes('introduction') ? 'introduction' : 
                item.title.toLowerCase().includes('ceremony') ? 'introduction' : 'live',
      size: 'normal',
      createdAt: item.created_at,
      sourceTable: 'music',
    }));





    // Merge and sort
    const allItems = [...mediaItems, ...serviceItems, ...musicItems]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // Second filter pass to ensure strict category matching if requested
    const filteredItems = (category && category !== 'all')
      ? allItems.filter(item => item.category === category)
      : allItems;

    console.log(`Successfully fetched ${filteredItems.length} items.`);
    return filteredItems.slice(0, maxItems) as MediaItem[];
  } catch (error) {
    console.error('Error fetching combined media items:', error);
    return [];
  }
};




export const deleteMediaItem = async (id: string, url: string, sourceTable: 'media' | 'services' | 'music' = 'media') => {
  try {
    // 1. Delete from Database
    const { data, error: dbError } = await supabase.from(sourceTable).delete().eq('id', id).select();
    if (dbError) throw dbError;
    
    if (!data || data.length === 0) {
      throw new Error('Permission denied or record not found. Please check your Supabase RLS policies.');
    }

    // 2. Delete from Storage (if it's a direct upload)
    if (url && (url.includes('supabase.co') || url.includes('storage.googleapis.com'))) {
      try {
        const urlObj = new URL(url);
        // Find bucket name from URL path
        const pathParts = urlObj.pathname.split('/object/public/');
        if (pathParts.length > 1) {
          const fullPath = pathParts[1];
          const bucket = fullPath.split('/')[0];
          const filePath = fullPath.substring(bucket.length + 1);

          await supabase.storage.from(bucket).remove([filePath]);
        }
      } catch (e) {
        console.warn('Storage delete warning:', e);
      }
    }

    return { success: true };
  } catch (error: any) {
    console.error('Error deleting media item:', error);
    return { success: false, error: error.message };
  }
};

