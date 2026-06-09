import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "Welcome": "Welcome to Twin Scissors Barbershop",
      "Tagline": "Premium Grooming & Professional Barber Services in Bahrain",
      "BookNow": "Book Appointment",
      "Services": "Our Services",
      "FAQ": "FAQ",
      "Reviews": "Google Reviews",
      "Photos": "Gallery",
      "Contact": "Contact Us",
      "Chat": "Chat with our Booking Assistant",
      "Haircut": "Hair Cut",
      "Beard": "Shave & Style",
      "Facial": "Facial Treatment",
      "Address": "Rd 4625, Manama 973, Bahrain",
      "Hours": "Hours",
      "Opening_Hours": "Opening Hours",
      "Saturday": "Saturday",
      "Sunday": "Sunday",
      "Monday": "Monday",
      "Tuesday": "Tuesday",
      "Wednesday": "Wednesday",
      "Thursday": "Thursday",
      "Friday": "Friday",
      "FaqQ1": "Do I need to book in advance?",
      "FaqA1": "While we accept walk-ins, we highly recommend booking in advance via WhatsApp, especially on weekends.",
      "FaqQ2": "What are your working hours?",
      "FaqA2": "We are open Monday to Saturday 10 AM – 9 PM, and Sunday 10 AM – 7:30 PM.",
      "FaqQ3": "Do you offer facial and grooming treatments?",
      "FaqA3": "Yes, we offer a full range of grooming packages including facial treatments, manicure, pedicure, foot massage, and more.",
      "ChatWelcome": "Hello! Welcome to Twin Scissors Barbershop Bahrain. How can I help you book an appointment today?"
    }
  },
  ar: {
    translation: {
      "Welcome": "مرحباً بكم في توين سيزرز",
      "Tagline": "تجربة حلاقة احترافية وعناية فائقة في البحرين",
      "BookNow": "احجز موعدك",
      "Services": "خدماتنا",
      "FAQ": "الأسئلة الشائعة",
      "Reviews": "تقييمات جوجل",
      "Photos": "المعرض",
      "Contact": "اتصل بنا",
      "Chat": "تحدث مع مساعد الحجز الخاص بنا",
      "Haircut": "قص الشعر",
      "Beard": "حلاقة وتصفيف",
      "Facial": "تنظيف البشرة",
      "Address": "طريق 4625، المنامة 973، البحرين",
      "Hours": "ساعات العمل",
      "Opening_Hours": "أوقات العمل",
      "Saturday": "السبت",
      "Sunday": "الأحد",
      "Monday": "الإثنين",
      "Tuesday": "الثلاثاء",
      "Wednesday": "الأربعاء",
      "Thursday": "الخميس",
      "Friday": "الجمعة",
      "FaqQ1": "هل أحتاج إلى حجز مسبق؟",
      "FaqA1": "على الرغم من قبولنا الزيارات بدون موعد، إلا أننا نوصي بشدة بالحجز مسبقاً عبر واتساب، خاصةً في عطلات نهاية الأسبوع.",
      "FaqQ2": "ما هي ساعات العمل؟",
      "FaqA2": "نحن مفتوحون من الاثنين إلى السبت من 10 صباحاً حتى 9 مساءً، والأحد من 10 صباحاً حتى 7:30 مساءً.",
      "FaqQ3": "هل تقدمون خدمات العناية بالبشرة؟",
      "FaqA3": "نعم، نقدم باقة متكاملة من خدمات العناية تشمل تنظيف البشرة، المانيكير، البديكير، تدليك القدم والمزيد.",
      "ChatWelcome": "مرحباً بك! أهلاً في توين سيزرز بربر شوب البحرين. كيف يمكنني مساعدتك في حجز موعدك اليوم؟"
    }
  }
};

let defaultLng = 'ar';
if (typeof navigator !== 'undefined') {
  const sysLang = navigator.language.toLowerCase();
  defaultLng = sysLang.startsWith('en') ? 'en' : 'ar';
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: defaultLng,
    fallbackLng: 'ar',
    interpolation: { escapeValue: false }
  });

export default i18n;