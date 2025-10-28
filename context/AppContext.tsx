
import React, { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Invoice, Client, ServiceItem, BusinessProfile, InvoiceStatus } from '../types';

// Mock Data
const MOCK_CLIENTS: Client[] = [
  { id: 'client-1', name: 'Tech Solutions Inc.', email: 'contact@techsolutions.com', address: '123 Innovation Drive, Silicon Valley, CA' },
  { id: 'client-2', name: 'Creative Designs Co.', email: 'hello@creativedesigns.co', address: '456 Art Avenue, Design District, NY' },
];

const MOCK_ITEMS: ServiceItem[] = [
  { id: 'item-1', description: 'Web Development (hourly)', rate: 100 },
  { id: 'item-2', description: 'UI/UX Design Mockups', rate: 1500 },
  { id: 'item-3', description: 'Consulting Services (hourly)', rate: 150 },
];

const MOCK_INVOICES: Invoice[] = [
  {
    id: 'inv-1',
    invoiceNumber: '2024-001',
    client: MOCK_CLIENTS[0],
    issueDate: new Date(new Date().setDate(new Date().getDate() - 15)).toISOString().split('T')[0],
    dueDate: new Date(new Date().setDate(new Date().getDate() + 15)).toISOString().split('T')[0],
    items: [
      { id: 'li-1', description: 'Web Development', quantity: 20, rate: 100 },
      { id: 'li-2', description: 'Project Management', quantity: 5, rate: 80 },
    ],
    taxRate: 10,
    discount: 100,
    status: InvoiceStatus.Sent,
    notes: 'Thank you for your business!',
  },
  {
    id: 'inv-2',
    invoiceNumber: '2024-002',
    client: MOCK_CLIENTS[1],
    issueDate: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString().split('T')[0],
    dueDate: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString().split('T')[0],
    items: [{ id: 'li-3', description: 'UI/UX Design Mockups', quantity: 1, rate: 1500 }],
    taxRate: 0,
    discount: 0,
    status: InvoiceStatus.Overdue,
    notes: 'Please remit payment at your earliest convenience.',
  },
    {
    id: 'inv-3',
    invoiceNumber: '2024-003',
    client: MOCK_CLIENTS[0],
    issueDate: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
    dueDate: new Date(new Date().setDate(new Date().getDate() - 10)).toISOString().split('T')[0],
    items: [{ id: 'li-4', description: 'Consulting Services', quantity: 10, rate: 150 }],
    taxRate: 10,
    discount: 0,
    status: InvoiceStatus.Paid,
    notes: 'Payment received. Thank you!',
  },
];

const MOCK_PROFILE: BusinessProfile = {
  name: 'Your Company Name',
  address: '123 Main Street, Anytown, USA',
  email: 'your.email@company.com',
  phone: '+1 (555) 123-4567',
  bankDetails: 'Bank: Global Bank, Account: 123456789, SWIFT: GBLBUSBX',
  logo: null,
  brandColor: '#3b82f6',
  currencySymbol: '$',
  templateLayout: 'classic',
};

interface AppContextType {
  invoices: Invoice[];
  setInvoices: React.Dispatch<React.SetStateAction<Invoice[]>>;
  clients: Client[];
  setClients: React.Dispatch<React.SetStateAction<Client[]>>;
  items: ServiceItem[];
  setItems: React.Dispatch<React.SetStateAction<ServiceItem[]>>;
  profile: BusinessProfile;
  setProfile: React.Dispatch<React.SetStateAction<BusinessProfile>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [invoices, setInvoices] = useLocalStorage<Invoice[]>('invoices', MOCK_INVOICES);
  const [clients, setClients] = useLocalStorage<Client[]>('clients', MOCK_CLIENTS);
  const [items, setItems] = useLocalStorage<ServiceItem[]>('items', MOCK_ITEMS);
  const [profile, setProfile] = useLocalStorage<BusinessProfile>('profile', MOCK_PROFILE);

  const value = { invoices, setInvoices, clients, setClients, items, setItems, profile, setProfile };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};