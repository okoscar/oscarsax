import { doc, getDoc, setDoc, collection, addDoc, getDocs, query, orderBy, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

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
    const docRef = doc(db, 'settings', 'global');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as SiteSettings;
    }
    return null;
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return null;
  }
};

export const updateSiteSettings = async (settings: SiteSettings) => {
  try {
    const docRef = doc(db, 'settings', 'global');
    await setDoc(docRef, settings, { merge: true });
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
  createdAt: any;
}

export const getMusicTracks = async (type?: 'original' | 'cover' | 'video') => {
  try {
    const musicRef = collection(db, 'music');
    let q = query(musicRef, orderBy('createdAt', 'desc'));
    
    const querySnapshot = await getDocs(q);
    const tracks: MusicTrack[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data() as MusicTrack;
      if (!type || data.type === type) {
        tracks.push({ id: doc.id, ...data });
      }
    });
    return tracks;
  } catch (error) {
    console.error('Error fetching music tracks:', error);
    return [];
  }
};

export const addMusicTrack = async (track: Omit<MusicTrack, 'id'>) => {
  try {
    const musicRef = collection(db, 'music');
    const docRef = await addDoc(musicRef, track);
    return { success: true, id: docRef.id };
  } catch (error: any) {
    console.error('Error adding music track:', error);
    return { success: false, error: error.message };
  }
};

export const deleteMusicTrack = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'music', id));
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting music track:', error);
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
  createdAt: any;
}

export const getReviews = async () => {
  try {
    const reviewsRef = collection(db, 'reviews');
    const q = query(reviewsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const reviews: Review[] = [];
    querySnapshot.forEach((doc) => {
      reviews.push({ id: doc.id, ...doc.data() } as Review);
    });
    return reviews;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
};

export const addReview = async (review: Omit<Review, 'id'>) => {
  try {
    const reviewsRef = collection(db, 'reviews');
    const docRef = await addDoc(reviewsRef, review);
    return { success: true, id: docRef.id };
  } catch (error: any) {
    console.error('Error adding review:', error);
    return { success: false, error: error.message };
  }
};

export const deleteReview = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'reviews', id));
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting review:', error);
    return { success: false, error: error.message };
  }
};

export const updateReview = async (id: string, updates: Partial<Review>) => {
  try {
    const reviewRef = doc(db, 'reviews', id);
    await updateDoc(reviewRef, updates);
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
  createdAt: any;
}

export const getServices = async () => {
  try {
    const servicesRef = collection(db, 'services');
    const q = query(servicesRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const services: ServiceEvent[] = [];
    querySnapshot.forEach((doc) => {
      services.push({ id: doc.id, ...doc.data() } as ServiceEvent);
    });
    return services;
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
};

export const addService = async (service: Omit<ServiceEvent, 'id'>) => {
  try {
    const servicesRef = collection(db, 'services');
    const docRef = await addDoc(servicesRef, service);
    return { success: true, id: docRef.id };
  } catch (error: any) {
    console.error('Error adding service:', error);
    return { success: false, error: error.message };
  }
};

export const updateService = async (id: string, updates: Partial<ServiceEvent>) => {
  try {
    const serviceRef = doc(db, 'services', id);
    await updateDoc(serviceRef, updates);
    return { success: true };
  } catch (error: any) {
    console.error('Error updating service:', error);
    return { success: false, error: error.message };
  }
};

export const deleteService = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'services', id));
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting service:', error);
    return { success: false, error: error.message };
  }
};


