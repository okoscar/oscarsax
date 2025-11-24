import emailjs from '@emailjs/browser';

export const sendBookingNotification = async (formData: {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate?: string;
  venue?: string;
  message: string;
}) => {
  try {
    console.log('📧 Attempting to send email...');
    console.log('Service ID:', process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID);
    console.log('Template ID:', process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID);
    console.log('Public Key exists:', !!process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      event_type: formData.eventType,
      event_date: formData.eventDate || 'Not specified',
      venue: formData.venue || 'Not specified',
      message: formData.message,
      timestamp: new Date().toLocaleString('en-UG', {
        timeZone: 'Africa/Kampala',
        dateStyle: 'full',
        timeStyle: 'short'
      })
    };

    console.log('📧 Template params:', templateParams);

    const response = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      templateParams,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
    );

    console.log('✅ Email sent successfully:', response);
    return { success: true };
  } catch (error: any) {
    console.error('❌ Email sending failed:', error);
    console.error('Error details:', error.text || error.message);
    return { success: false, error: error.message };
  }
};
