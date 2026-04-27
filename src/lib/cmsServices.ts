import { createClient } from './supabase';

// Helper to get the supabase client (browser client)
const supabase = createClient();

// --- Global Settings ---

export interface SiteSettings {
  heroTitle: string;
  heroSubtitle: string;
  bio: string;
  contactEmail: string;
  contactPhone: string;
  socials: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
    tiktok?: string;
  };
  heroImage?: string;
  aboutImage?: string;
}

export const getSiteSettings = async (): Promise<SiteSettings | null> => {
  try {
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .eq('slug', 'global')
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }

    if (data) {
      return {
        heroTitle: data.hero_title,
        heroSubtitle: data.hero_subtitle,
        bio: data.bio,
        contactEmail: data.contact_email,
        contactPhone: data.contact_phone,
        socials: {
          instagram: data.instagram,
          facebook: data.facebook,
          youtube: data.youtube,
          tiktok: data.tiktok,
        },
        heroImage: data.hero_image,
        aboutImage: data.about_image,
      } as SiteSettings;
    }
    return null;
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return null;
  }
};

export const updateSiteSettings = async (settings: SiteSettings) => {
  try {
    const { error } = await supabase
      .from('settings')
      .upsert({
        slug: 'global',
        hero_title: settings.heroTitle,
        hero_subtitle: settings.heroSubtitle,
        bio: settings.bio,
        contact_email: settings.contactEmail,
        contact_phone: settings.contactPhone,
        instagram: settings.socials?.instagram || '',
        facebook: settings.socials?.facebook || '',
        youtube: settings.socials?.youtube || '',
        tiktok: settings.socials?.tiktok || '',
        hero_image: settings.heroImage,
        about_image: settings.aboutImage,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'slug' });

    if (error) throw error;
    return { success: true };

  } catch (error: any) {
    console.error('Error updating site settings:', error);
    return { success: false, error: error.message };
  }
};

// --- Music & Tracks ---

export interface MusicTrack {
  id?: string;
  title: string;
  artist: string;
  duration: string;
  url: string; // URL to MP3 or YouTube link
  type: 'original' | 'cover' | 'video';
  thumbnail?: string;
  createdAt?: string;
}

export const getMusicTracks = async (type?: 'original' | 'cover' | 'video') => {
  try {
    let query = supabase.from('music').select('*').order('created_at', { ascending: false });
    
    if (type) {
      query = query.eq('type', type);
    }
    
    const { data, error } = await query;
    if (error) throw error;

    return (data || []).map(track => ({
      id: track.id,
      title: track.title,
      artist: track.artist,
      duration: track.duration,
      url: track.url,
      type: track.type,
      thumbnail: track.thumbnail,
      createdAt: track.created_at,
    })) as MusicTrack[];
  } catch (error) {
    console.error('Error fetching music tracks:', error);
    return [];
  }
};

export const addMusicTrack = async (track: Omit<MusicTrack, 'id'>) => {
  try {
    const { data, error } = await supabase
      .from('music')
      .insert({
        title: track.title,
        artist: track.artist,
        duration: track.duration,
        url: track.url,
        type: track.type,
        thumbnail: track.thumbnail,
        created_at: track.createdAt || new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return { success: true, id: data.id };
  } catch (error: any) {
    console.error('Error adding music track:', error);
    return { success: false, error: error.message };
  }
};

export const deleteMusicTrack = async (id: string) => {
  try {
    const { data, error } = await supabase.from('music').delete().eq('id', id).select();
    if (error) throw error;
    if (!data || data.length === 0) throw new Error('Permission denied or record not found.');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting music track:', error);
    return { success: false, error: error.message };
  }
};

export const updateMusicTrack = async (id: string, updates: Partial<MusicTrack>) => {
  try {
    const { error } = await supabase.from('music').update(updates).eq('id', id);
    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    console.error('Error updating music track:', error);
    return { success: false, error: error.message };
  }
};


// --- Reviews & Testimonials ---

export interface Review {
  id?: string;
  name: string;
  event: string;
  date: string;
  text: string;
  rating: number;
  avatar?: string;
  createdAt?: string;
}

export const getReviews = async () => {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []).map(review => ({
      id: review.id,
      name: review.name,
      event: review.event,
      date: review.date,
      text: review.text,
      rating: review.rating,
      avatar: review.avatar,
      createdAt: review.created_at,
    })) as Review[];
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
};

export const addReview = async (review: Omit<Review, 'id'>) => {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .insert({
        name: review.name,
        event: review.event,
        date: review.date,
        text: review.text,
        rating: review.rating,
        avatar: review.avatar,
        created_at: review.createdAt || new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return { success: true, id: data.id };
  } catch (error: any) {
    console.error('Error adding review:', error);
    return { success: false, error: error.message };
  }
};

export const deleteReview = async (id: string) => {
  try {
    const { data, error } = await supabase.from('reviews').delete().eq('id', id).select();
    if (error) throw error;
    if (!data || data.length === 0) throw new Error('Permission denied or record not found.');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting review:', error);
    return { success: false, error: error.message };
  }
};

export const updateReview = async (id: string, updates: Partial<Review>) => {
  try {
    const { error } = await supabase.from('reviews').update(updates).eq('id', id);
    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    console.error('Error updating review:', error);
    return { success: false, error: error.message };
  }
};

// --- Events & Services ---

export interface ServiceEvent {
  id?: string;
  type: string;
  title: string;
  description: string;
  mediaUrl: string; // Video or image URL
  thumbnail?: string;
  createdAt?: string;
}

export const getServices = async () => {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []).map(service => ({
      id: service.id,
      type: service.type,
      title: service.title,
      description: service.description,
      mediaUrl: service.media_url,
      createdAt: service.created_at,
      thumbnail: service.thumbnail,
    })) as ServiceEvent[];

  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
};

export const addService = async (service: Omit<ServiceEvent, 'id'>) => {
  try {
    const { data, error } = await supabase
      .from('services')
      .insert({
        type: service.type,
        title: service.title,
        description: service.description,
        media_url: service.mediaUrl,
        thumbnail: service.thumbnail,
        created_at: service.createdAt || new Date().toISOString(),
      })

      .select()
      .single();

    if (error) throw error;
    return { success: true, id: data.id };
  } catch (error: any) {
    console.error('Error adding service:', error);
    return { success: false, error: error.message };
  }
};

export const updateService = async (id: string, updates: Partial<ServiceEvent>) => {
  try {
    const supabaseUpdates: any = { ...updates };
    
    // Remove ID and other non-updatable/camelCase fields
    delete supabaseUpdates.id;
    delete supabaseUpdates.createdAt;
    
    if (updates.mediaUrl) {
      supabaseUpdates.media_url = updates.mediaUrl;
      delete supabaseUpdates.mediaUrl;
    }

    const { error } = await supabase.from('services').update(supabaseUpdates).eq('id', id);
    if (error) {
      console.error('Supabase update error:', error);
      throw error;
    }
    return { success: true };

  } catch (error: any) {
    console.error('Error updating service:', error);
    return { success: false, error: error.message };
  }
};

export const deleteService = async (id: string) => {
  try {
    const { error } = await supabase.from('services').delete().eq('id', id);
    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting service:', error);
    return { success: false, error: error.message };
  }
};
