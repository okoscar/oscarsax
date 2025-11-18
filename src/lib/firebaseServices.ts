import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from './firebase';

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate?: string;
  venue?: string;
  message: string;
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
    const subscribersRef = collection(db, 'newsletterSubscribers');
    const docRef = await addDoc(subscribersRef, {
      email,
      subscribedAt: Timestamp.now(),
      isActive: true
    });
    return { success: true, id: docRef.id };
  } catch (error: any) {
    console.error('Error subscribing:', error);
    return { success: false, error: error.message };
  }
};