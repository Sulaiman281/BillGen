
import React, { forwardRef } from 'react';
import { Invoice, BusinessProfile } from '../types';

interface InvoicePreviewProps {
  invoice: Invoice;
  profile: BusinessProfile;
}

interface LayoutProps extends InvoicePreviewProps {
    subtotal: number;
    taxAmount: number;
    total: number;
}

const ClassicLayout: React.FC<LayoutProps> = ({ invoice, profile, subtotal, taxAmount, total }) => (
    <div className="bg-white p-8 md:p-12 font-serif text-gray-800 text-sm">
      <div className="flex justify-between items-start mb-12">
        <div>
          {profile.logo ? (
            <img src={profile.logo} alt="Company Logo" className="h-16 mb-4" />
          ) : (
            <h1 className="text-3xl font-bold mb-4" style={{color: profile.brandColor}}>{profile.name}</h1>
          )}
          <p className="whitespace-pre-line">{profile.address}</p>
          <p>{profile.email}</p>
          <p>{profile.phone}</p>
        </div>
        <div className="text-right">
          <h2 className="text-4xl font-bold uppercase text-gray-700">Invoice</h2>
          <p className="mt-2 text-gray-500"># {invoice.invoiceNumber}</p>
        </div>
      </div>

      <div className="flex justify-between mb-10">
        <div>
          <h3 className="font-bold text-gray-600">Bill To</h3>
          <p className="font-bold">{invoice.client.name}</p>
          <p className="whitespace-pre-line">{invoice.client.address}</p>
          <p>{invoice.client.email}</p>
        </div>
        <div className="text-right">
          <p><span className="font-bold">Issue Date:</span> {invoice.issueDate}</p>
          <p><span className="font-bold">Due Date:</span> {invoice.dueDate}</p>
        </div>
      </div>
      
      <div className="w-full overflow-x-auto">
        <table className="min-w-full mb-8">
            <thead style={{backgroundColor: profile.brandColor}}>
                <tr>
                    <th className="text-left font-bold text-white p-3 uppercase">Description</th>
                    <th className="text-center font-bold text-white p-3 uppercase">Qty</th>
                    <th className="text-right font-bold text-white p-3 uppercase">Rate</th>
                    <th className="text-right font-bold text-white p-3 uppercase">Total</th>
                </tr>
            </thead>
            <tbody>
                {invoice.items.map(item => (
                    <tr key={item.id} className="border-b border-gray-200">
                        <td className="p-3">{item.description}</td>
                        <td className="text-center p-3">{item.quantity}</td>
                        <td className="text-right p-3">{profile.currencySymbol}{item.rate.toFixed(2)}</td>
                        <td className="text-right p-3">{profile.currencySymbol}{(item.quantity * item.rate).toFixed(2)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>

      <div className="flex justify-end mb-10">
        <div className="w-full md:w-1/3">
          <div className="flex justify-between py-2 border-b">
            <span>Subtotal</span>
            <span>{profile.currencySymbol}{subtotal.toFixed(2)}</span>
          </div>
          {invoice.discount > 0 && (
          <div className="flex justify-between py-2 border-b">
            <span>Discount</span>
            <span>- {profile.currencySymbol}{invoice.discount.toFixed(2)}</span>
          </div>
          )}
          {invoice.taxRate > 0 && (
          <div className="flex justify-between py-2 border-b">
            <span>Tax ({invoice.taxRate}%)</span>
            <span>{profile.currencySymbol}{taxAmount.toFixed(2)}</span>
          </div>
          )}
          <div className="flex justify-between py-3 font-bold text-lg" style={{backgroundColor: profile.brandColor, color: 'white', padding: '10px'}}>
            <span>Total</span>
            <span>{profile.currencySymbol}{total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      {invoice.notes && (
      <div className="mb-10">
        <h4 className="font-bold text-gray-600 mb-1">Notes</h4>
        <p className="text-gray-500 text-xs">{invoice.notes}</p>
      </div>
      )}

      <div>
        <h4 className="font-bold text-gray-600 mb-1">Payment Details</h4>
        <p className="text-gray-500 text-xs whitespace-pre-line">{profile.bankDetails}</p>
      </div>
    </div>
);

const ModernLayout: React.FC<LayoutProps> = ({ invoice, profile, subtotal, taxAmount, total }) => (
    <div className="bg-white p-10 font-sans text-gray-800 text-sm">
        <header className="mb-10 border-b-2 pb-5" style={{borderColor: profile.brandColor}}>
            <div className="flex justify-between items-center">
                 <div>
                    {profile.logo ? (
                        <img src={profile.logo} alt="Company Logo" className="h-14 mb-2" />
                    ) : (
                        <h1 className="text-3xl font-bold mb-2" style={{color: profile.brandColor}}>{profile.name}</h1>
                    )}
                    <div className="text-xs text-gray-500">
                        <p className="whitespace-pre-line">{profile.address}</p>
                        <p>{profile.email} | {profile.phone}</p>
                    </div>
                </div>
                <div className="text-right">
                    <h2 className="text-2xl font-light uppercase text-gray-600">Invoice</h2>
                    <p className="text-sm font-semibold" style={{color: profile.brandColor}}># {invoice.invoiceNumber}</p>
                </div>
            </div>
        </header>

        <section className="grid grid-cols-2 gap-10 mb-10">
             <div>
                <h3 className="font-semibold text-gray-500 mb-2">BILL TO</h3>
                <p className="font-bold text-base">{invoice.client.name}</p>
                <p className="whitespace-pre-line text-gray-600">{invoice.client.address}</p>
                <p className="text-gray-600">{invoice.client.email}</p>
            </div>
            <div className="text-right">
                <div className="mb-2">
                    <span className="font-semibold text-gray-500">Issue Date: </span>
                    <span className="text-gray-800">{invoice.issueDate}</span>
                </div>
                <div>
                    <span className="font-semibold text-gray-500">Due Date: </span>
                    <span className="text-gray-800">{invoice.dueDate}</span>
                </div>
            </div>
        </section>

        <table className="w-full mb-8">
            <thead>
                <tr className="border-b" style={{borderColor: profile.brandColor}}>
                    <th className="text-left font-semibold text-gray-600 p-2 uppercase">Description</th>
                    <th className="text-center font-semibold text-gray-600 p-2 uppercase">Qty</th>
                    <th className="text-right font-semibold text-gray-600 p-2 uppercase">Rate</th>
                    <th className="text-right font-semibold text-gray-600 p-2 uppercase">Total</th>
                </tr>
            </thead>
            <tbody>
                {invoice.items.map(item => (
                    <tr key={item.id}>
                        <td className="p-2 border-b border-gray-100">{item.description}</td>
                        <td className="text-center p-2 border-b border-gray-100">{item.quantity}</td>
                        <td className="text-right p-2 border-b border-gray-100">{profile.currencySymbol}{item.rate.toFixed(2)}</td>
                        <td className="text-right p-2 border-b border-gray-100">{profile.currencySymbol}{(item.quantity * item.rate).toFixed(2)}</td>
                    </tr>
                ))}
            </tbody>
        </table>

        <div className="flex justify-end mb-10">
            <div className="w-full md:w-2/5 space-y-2">
                <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>{profile.currencySymbol}{subtotal.toFixed(2)}</span></div>
                {invoice.discount > 0 && <div className="flex justify-between text-gray-600"><span>Discount</span><span>- {profile.currencySymbol}{invoice.discount.toFixed(2)}</span></div>}
                {invoice.taxRate > 0 && <div className="flex justify-between text-gray-600"><span>Tax ({invoice.taxRate}%)</span><span>{profile.currencySymbol}{taxAmount.toFixed(2)}</span></div>}
                <div className="flex justify-between font-bold text-xl p-3 rounded text-white" style={{backgroundColor: profile.brandColor}}><span>TOTAL</span><span>{profile.currencySymbol}{total.toFixed(2)}</span></div>
            </div>
        </div>

        <footer className="text-xs text-gray-500">
            {invoice.notes && <div className="mb-4">
                <h4 className="font-semibold text-gray-600 mb-1">Notes</h4>
                <p>{invoice.notes}</p>
            </div>}
            <div>
                <h4 className="font-semibold text-gray-600 mb-1">Payment Details</h4>
                <p className="whitespace-pre-line">{profile.bankDetails}</p>
            </div>
        </footer>
    </div>
);

const CompactLayout: React.FC<LayoutProps> = ({ invoice, profile, subtotal, taxAmount, total }) => (
    <div className="bg-white p-6 font-sans text-gray-700 text-xs">
        <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
                {profile.logo ? <img src={profile.logo} alt="Logo" className="h-10 mb-2"/> : <h1 className="text-xl font-bold mb-1" style={{color: profile.brandColor}}>{profile.name}</h1>}
                <p className="whitespace-pre-line text-gray-500">{profile.address}</p>
            </div>
            <div className="text-right">
                <h2 className="text-2xl font-semibold">INVOICE</h2>
                <p># {invoice.invoiceNumber}</p>
            </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 p-2 rounded-md bg-gray-50 mb-4">
            <div>
                <strong className="block">Bill To:</strong>
                <span className="whitespace-pre-line">{invoice.client.name}, {invoice.client.address}</span>
            </div>
            <div className="text-center">
                <strong className="block">Issue Date:</strong>
                <span>{invoice.issueDate}</span>
            </div>
            <div className="text-right">
                <strong className="block">Due Date:</strong>
                <span>{invoice.dueDate}</span>
            </div>
        </div>
        
        <table className="w-full mb-4">
            <thead className="border-b-2 border-gray-300">
                <tr>
                    <th className="text-left p-1 font-bold uppercase">Description</th>
                    <th className="text-center p-1 font-bold uppercase">Qty</th>
                    <th className="text-right p-1 font-bold uppercase">Rate</th>
                    <th className="text-right p-1 font-bold uppercase">Total</th>
                </tr>
            </thead>
            <tbody>
                {invoice.items.map(item => (
                    <tr key={item.id} className="border-b border-gray-100">
                        <td className="p-1">{item.description}</td>
                        <td className="text-center p-1">{item.quantity}</td>
                        <td className="text-right p-1">{profile.currencySymbol}{item.rate.toFixed(2)}</td>
                        <td className="text-right p-1">{profile.currencySymbol}{(item.quantity * item.rate).toFixed(2)}</td>
                    </tr>
                ))}
            </tbody>
        </table>

        <div className="flex justify-end mb-4">
            <div className="w-full sm:w-1/2 space-y-1">
                <div className="flex justify-between"><span>Subtotal:</span><span>{profile.currencySymbol}{subtotal.toFixed(2)}</span></div>
                {invoice.discount > 0 && <div className="flex justify-between"><span>Discount:</span><span>- {profile.currencySymbol}{invoice.discount.toFixed(2)}</span></div>}
                {invoice.taxRate > 0 && <div className="flex justify-between"><span>Tax ({invoice.taxRate}%):</span><span>{profile.currencySymbol}{taxAmount.toFixed(2)}</span></div>}
                <div className="flex justify-between font-bold text-base border-t-2 border-black mt-1 pt-1"><span>Total:</span><span>{profile.currencySymbol}{total.toFixed(2)}</span></div>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-[10px] text-gray-500">
            {invoice.notes && <div><strong>Notes:</strong><p>{invoice.notes}</p></div>}
            <div><strong>Payment Details:</strong><p className="whitespace-pre-line">{profile.bankDetails}</p></div>
        </div>
    </div>
);

const InvoicePreview = forwardRef<HTMLDivElement, InvoicePreviewProps>(({ invoice, profile }, ref) => {
  const subtotal = invoice.items.reduce((acc, item) => acc + item.quantity * item.rate, 0);
  const taxAmount = subtotal * (invoice.taxRate / 100);
  const total = subtotal + taxAmount - invoice.discount;
  
  const layoutProps = { invoice, profile, subtotal, taxAmount, total };

  return (
    <div ref={ref}>
      {
        !profile.templateLayout || profile.templateLayout === 'classic' ? <ClassicLayout {...layoutProps} /> :
        profile.templateLayout === 'modern' ? <ModernLayout {...layoutProps} /> :
        <CompactLayout {...layoutProps} />
      }
    </div>
  );
});

InvoicePreview.displayName = "InvoicePreview";
export default InvoicePreview;
