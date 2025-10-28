
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Invoice, InvoiceStatus } from '../types';

interface InvoiceListProps {
  onEditInvoice: (invoice: Invoice) => void;
}

const StatusBadge: React.FC<{ status: InvoiceStatus }> = ({ status }) => {
  const baseClasses = "px-2 py-1 text-xs font-semibold leading-tight rounded-full";
  let specificClasses = "";
  switch (status) {
    case InvoiceStatus.Paid:
      specificClasses = "text-green-700 bg-green-100 dark:bg-green-700 dark:text-green-100";
      break;
    case InvoiceStatus.Sent:
      specificClasses = "text-blue-700 bg-blue-100 dark:bg-blue-700 dark:text-blue-100";
      break;
    case InvoiceStatus.Overdue:
      specificClasses = "text-red-700 bg-red-100 dark:bg-red-700 dark:text-red-100";
      break;
    case InvoiceStatus.Draft:
      specificClasses = "text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-100";
      break;
  }
  return <span className={`${baseClasses} ${specificClasses}`}>{status}</span>;
};


const InvoiceList: React.FC<InvoiceListProps> = ({ onEditInvoice }) => {
  const { invoices, setInvoices, profile } = useAppContext();

  const calculateTotal = (invoice: Invoice) => {
    const subtotal = invoice.items.reduce((acc, item) => acc + item.quantity * item.rate, 0);
    const taxAmount = subtotal * (invoice.taxRate / 100);
    return subtotal + taxAmount - invoice.discount;
  };

  const handleStatusChange = (invoiceId: string, newStatus: InvoiceStatus) => {
    setInvoices(invoices.map(inv => inv.id === invoiceId ? { ...inv, status: newStatus } : inv));
  };

  const sortedInvoices = [...invoices].sort((a, b) => new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime());

  return (
    <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Invoice #</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Client</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Due Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Total</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {sortedInvoices.map((invoice) => (
              <tr key={invoice.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{invoice.invoiceNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{invoice.client.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{invoice.dueDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{profile.currencySymbol}{calculateTotal(invoice).toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <StatusBadge status={invoice.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => onEditInvoice(invoice)} className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-200 mr-4">Edit</button>
                  <select
                    value={invoice.status}
                    onChange={(e) => handleStatusChange(invoice.id, e.target.value as InvoiceStatus)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    {Object.values(InvoiceStatus).map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceList;
