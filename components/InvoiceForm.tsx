
import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { Invoice, Client, LineItem, InvoiceStatus, ServiceItem } from '../types';
import InvoicePreview from './InvoicePreview';
import { TrashIcon, PlusIcon } from './icons/IconCollection';

declare const html2canvas: any;
declare const jspdf: any;

interface InvoiceFormProps {
  setView: (view: 'dashboard') => void;
  existingInvoice?: Invoice | null;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ setView, existingInvoice }) => {
  const { invoices, setInvoices, clients, setClients, items, profile } = useAppContext();
  const [invoiceData, setInvoiceData] = useState<Invoice>(
    existingInvoice || {
      id: `inv-${Date.now()}`,
      invoiceNumber: `INV-${String(invoices.length + 1).padStart(4, '0')}`,
      client: clients[0] || { id: '', name: '', email: '', address: '' },
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split('T')[0],
      items: [{ id: `li-${Date.now()}`, description: '', quantity: 1, rate: 0 }],
      taxRate: 10,
      discount: 0,
      status: InvoiceStatus.Draft,
      notes: 'Thank you for your business!',
    }
  );

  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (existingInvoice) {
      setInvoiceData(existingInvoice);
    }
  }, [existingInvoice]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInvoiceData({ ...invoiceData, [name]: value });
  };

  const handleClientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedClient = clients.find(c => c.id === e.target.value);
    if (selectedClient) {
      setInvoiceData({ ...invoiceData, client: selectedClient });
    }
  };

  const handleItemChange = (index: number, field: keyof LineItem, value: any) => {
    const newItems = [...invoiceData.items];
    (newItems[index] as any)[field] = value;
    setInvoiceData({ ...invoiceData, items: newItems });
  };
  
  const handleItemSelect = (index: number, serviceItemId: string) => {
    const selectedItem = items.find(i => i.id === serviceItemId);
    if(selectedItem){
      const newItems = [...invoiceData.items];
      newItems[index].description = selectedItem.description;
      newItems[index].rate = selectedItem.rate;
      setInvoiceData({ ...invoiceData, items: newItems });
    }
  }

  const addItem = () => {
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, { id: `li-${Date.now()}`, description: '', quantity: 1, rate: 0 }],
    });
  };

  const removeItem = (index: number) => {
    const newItems = invoiceData.items.filter((_, i) => i !== index);
    setInvoiceData({ ...invoiceData, items: newItems });
  };

  const saveInvoice = () => {
    if (existingInvoice) {
      setInvoices(invoices.map(inv => inv.id === existingInvoice.id ? invoiceData : inv));
    } else {
      setInvoices([...invoices, invoiceData]);
    }
    setView('dashboard');
  };
  
  const downloadPDF = () => {
    if (!previewRef.current) return;
    const { jsPDF } = jspdf;

    html2canvas(previewRef.current, { scale: 2 }).then((canvas: any) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Invoice-${invoiceData.invoiceNumber}.pdf`);
    });
  };

  return (
    <div className="container mx-auto p-4 lg:p-0">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">
            {existingInvoice ? `Edit Invoice #${existingInvoice.invoiceNumber}` : 'Create New Invoice'}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Invoice #</label>
                        <input type="text" name="invoiceNumber" value={invoiceData.invoiceNumber} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white sm:text-sm" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Client</label>
                        <select name="client" value={invoiceData.client.id} onChange={handleClientChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white sm:text-sm">
                            {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>
                </div>
                 <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Issue Date</label>
                        <input type="date" name="issueDate" value={invoiceData.issueDate} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white sm:text-sm" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Due Date</label>
                        <input type="date" name="dueDate" value={invoiceData.dueDate} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white sm:text-sm" />
                    </div>
                </div>

                <h3 className="text-lg font-medium text-gray-900 dark:text-white mt-6 mb-2">Items</h3>
                {invoiceData.items.map((item, index) => (
                    <div key={item.id} className="grid grid-cols-12 gap-2 mb-2 p-2 border rounded-md dark:border-gray-700">
                        <div className="col-span-12">
                             <select onChange={(e) => handleItemSelect(index, e.target.value)} className="block w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white mb-2">
                                <option>Select a saved item</option>
                                {items.map(i => <option key={i.id} value={i.id}>{i.description}</option>)}
                            </select>
                            <input type="text" placeholder="Description" value={item.description} onChange={(e) => handleItemChange(index, 'description', e.target.value)} className="block w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white" />
                        </div>
                        <div className="col-span-3">
                            <input type="number" placeholder="Qty" value={item.quantity} onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value))} className="block w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white" />
                        </div>
                        <div className="col-span-4">
                             <input type="number" placeholder="Rate" value={item.rate} onChange={(e) => handleItemChange(index, 'rate', parseFloat(e.target.value))} className="block w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white" />
                        </div>
                        <div className="col-span-3 flex items-center justify-end font-semibold dark:text-white">
                           {profile.currencySymbol}{(item.quantity * item.rate).toFixed(2)}
                        </div>
                        <div className="col-span-2 flex items-center justify-end">
                            <button onClick={() => removeItem(index)} className="text-red-500 hover:text-red-700"><TrashIcon className="w-5 h-5"/></button>
                        </div>
                    </div>
                ))}
                <button onClick={addItem} className="mt-2 flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                    <PlusIcon className="w-4 h-4 mr-1"/> Add Item
                </button>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Discount ({profile.currencySymbol})</label>
                        <input type="number" name="discount" value={invoiceData.discount} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white sm:text-sm" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tax Rate (%)</label>
                        <input type="number" name="taxRate" value={invoiceData.taxRate} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white sm:text-sm" />
                    </div>
                </div>
                 <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Notes</label>
                    <textarea name="notes" value={invoiceData.notes} onChange={handleInputChange} rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white sm:text-sm"></textarea>
                </div>
                
                 <div className="mt-6 flex justify-end space-x-3">
                    <button onClick={saveInvoice} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Save Invoice</button>
                    <button onClick={downloadPDF} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Download PDF</button>
                </div>
            </div>

            {/* Preview Section */}
            <div className="lg:col-span-3">
                <div className="sticky top-8">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Live Preview</h3>
                     <div className="shadow-lg">
                        <InvoicePreview ref={previewRef} invoice={invoiceData} profile={profile} />
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default InvoiceForm;
