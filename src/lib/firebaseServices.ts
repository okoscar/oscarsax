import { collection, addDoc, Timestamp, query, where, getDocs } from 'firebase/firestore';
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