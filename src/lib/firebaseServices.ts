import { collection, addDoc, Timestamp, query, where, getDocs, orderBy, limit, doc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from './firebase';

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
  createdAt: Timestamp;
  size?: 'normal' | 'wide' | 'tall';
}

export const submitContactForm = async (formData: ContactFormData) => {
  try {
    const contactRef = collection(db, 'contactInquiries');
    const docRef = await addDoc(contactRef, {
      ...formData,
      createdAt: Timestamp.now(),
      status: 'new'
    });
    return { success: true, id: docRef.id };
  } catch (error: any) {
    console.error('Error submitting contact form:', error);
    return { success: false, error: error.message };
  }
};

export const subscribeToNewsletter = async (email: string) => {
  try {
    // Validate email
    if (!email || !email.includes('@')) {
      return { success: false, message: 'Invalid email address' };
    }

    const subscribersRef = collection(db, 'newsletterSubscribers');
    
    // Check if email already exists
    const q = query(subscribersRef, where('email', '==', email.toLowerCase()));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      console.log('❌ Email already subscribed');
      return { success: false, message: 'Email already subscribed' };
    }

    // Add new subscriber
    const docRef = await addDoc(subscribersRef, {
      email: email.toLowerCase(),
      subscribedAt: Timestamp.now(),
      isActive: true
    });

    console.log('✅ Newsletter subscription successful:', email);
    return { success: true, id: docRef.id, message: 'Successfully subscribed!' };
  } catch (error: any) {
    console.error('Error subscribing:', error);
    return { success: false, error: error.message, message: 'Subscription failed' };
  }
};

// --- Media Services ---

export const uploadMedia = async (
  file: File, 
  metadata: { title: string; category: string; type: 'image' | 'video'; size?: 'normal' | 'wide' | 'tall' }
) => {
  try {
    // 1. Upload to Storage
    const storageRef = ref(storage, `media/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);

    // 2. Save metadata to Firestore
    const mediaRef = collection(db, 'media');
    const docRef = await addDoc(mediaRef, {
      title: metadata.title,
      category: metadata.category,
      type: metadata.type,
      url: downloadURL,
      size: metadata.size || 'normal',
      createdAt: Timestamp.now()
    });

    return { success: true, id: docRef.id, url: downloadURL };
  } catch (error: any) {
    console.error('Error uploading media:', error);
    return { success: false, error: error.message };
  }
};

export const getMediaItems = async (category?: string, type?: 'image' | 'video', maxItems = 50) => {
  try {
    const mediaRef = collection(db, 'media');
    let q = query(mediaRef, orderBy('createdAt', 'desc'), limit(maxItems));
    
    if (category && category !== 'all') {
      q = query(mediaRef, where('category', '==', category), orderBy('createdAt', 'desc'), limit(maxItems));
    }
    
    const querySnapshot = await getDocs(q);
    const items: MediaItem[] = [];
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() } as MediaItem);
    });
    
    return items;
  } catch (error) {
    console.error('Error fetching media items:', error);
    return [];
  }
};

export const deleteMediaItem = async (id: string, url: string) => {
  try {
    // 1. Delete from Firestore
    await deleteDoc(doc(db, 'media', id));

    // 2. Delete from Storage (if it's a firebase storage URL)
    if (url.includes('firebasestorage.googleapis.com')) {
      const storageRef = ref(storage, url);
      await deleteObject(storageRef);
    }

    return { success: true };
  } catch (error: any) {
    console.error('Error deleting media item:', error);
    return { success: false, error: error.message };
  }
};