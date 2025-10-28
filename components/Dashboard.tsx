
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Invoice, InvoiceStatus } from '../types';
import InvoiceList from './InvoiceList';

interface DashboardProps {
  setView: (view: 'new-invoice') => void;
  onEditInvoice: (invoice: Invoice) => void;
}

const StatCard: React.FC<{ title: string; value: string; subtext: string }> = ({ title, value, subtext }) => (
  <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
    <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{subtext}</p>
  </div>
);

const Dashboard: React.FC<DashboardProps> = ({ setView, onEditInvoice }) => {
  const { invoices, profile } = useAppContext();

  const calculateTotal = (invoice: Invoice) => {
    const subtotal = invoice.items.reduce((acc, item) => acc + item.quantity * item.rate, 0);
    const taxAmount = subtotal * (invoice.taxRate / 100);
    return subtotal + taxAmount - invoice.discount;
  };

  const outstandingAmount = invoices
    .filter(inv => inv.status === InvoiceStatus.Sent || inv.status === InvoiceStatus.Overdue)
    .reduce((acc, inv) => acc + calculateTotal(inv), 0);

  const overdueCount = invoices.filter(inv => inv.status === InvoiceStatus.Overdue).length;
  
  const totalRevenue = invoices
    .filter(inv => inv.status === InvoiceStatus.Paid)
    .reduce((acc, inv) => acc + calculateTotal(inv), 0);

  return (
    <div>
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard 
          title="Outstanding Revenue"
          value={`${profile.currencySymbol}${outstandingAmount.toFixed(2)}`}
          subtext="Total amount receivable"
        />
        <StatCard 
          title="Overdue Invoices"
          value={overdueCount.toString()}
          subtext="Awaiting payment"
        />
        <StatCard 
          title="Total Revenue (Paid)"
          value={`${profile.currencySymbol}${totalRevenue.toFixed(2)}`}
          subtext="All time"
        />
      </div>

      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Recent Invoices</h3>
        <button
          onClick={() => setView('new-invoice')}
          className="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
        >
          Create Invoice
        </button>
      </div>

      <InvoiceList onEditInvoice={onEditInvoice} />
    </div>
  );
};

export default Dashboard;
