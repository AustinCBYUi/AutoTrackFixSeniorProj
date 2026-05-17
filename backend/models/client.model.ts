export interface AccountNote {
  text: string;
  date?: string;
  addedBy?: string;
}

export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  business: string;
  phoneNumber: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
  }
  createdDate: string;
  lastServiced?: string;
  nextServiceDate?: string;
  accountNotes?: AccountNote[];
  services?: string[];
}
