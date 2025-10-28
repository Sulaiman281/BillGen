
export enum InvoiceStatus {
  Draft = 'Draft',
  Sent = 'Sent',
  Paid = 'Paid',
  Overdue = 'Overdue',
}

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

export interface Client {
  id:string;
  name: string;
  email: string;
  address: string;
}

export interface ServiceItem {
  id: string;
  description: string;
  rate: number;
}

export interface BusinessProfile {
  name: string;
  address: string;
  email: string;
  phone: string;
  bankDetails: string;
  logo: string | null; // base64 string
  brandColor: string;
  currencySymbol: string;
  templateLayout: 'classic' | 'modern' | 'compact';
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  client: Client;
  issueDate: string;
  dueDate: string;
  items: LineItem[];
  taxRate: number; // percentage
  discount: number; // fixed amount
  status: InvoiceStatus;
  notes: string;
}