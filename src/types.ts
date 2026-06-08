export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'bakim' | 'onarim' | 'elektronik' | 'diger';
  details: string[];
  priceEst: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  vehicle: string;
  date: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface Booking {
  id: string;
  customerName: string;
  phone: string;
  plate: string;
  carBrandModel: string;
  serviceId: string;
  date: string;
  timeSlot: string;
  status: 'beklemede' | 'onaylandi';
  note?: string;
}
