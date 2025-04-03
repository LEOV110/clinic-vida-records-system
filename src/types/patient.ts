
export interface Patient {
  id: string;
  name: string;
  birthDate: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  allergies: string;
  conditions: string[];
  medications: string;
  image?: string;
}
