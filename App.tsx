
import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import InvoiceForm from './components/InvoiceForm';
import ClientManager from './components/ClientManager';
import ItemManager from './components/ItemManager';
import Settings from './components/Settings';
import { Invoice } from './types';

type View = 'dashboard' | 'new-invoice' | 'edit-invoice' | 'clients' | 'items' | 'settings';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);

  const handleEditInvoice = (invoice: Invoice) => {
    setEditingInvoice(invoice);
    setCurrentView('edit-invoice');
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard setView={setCurrentView} onEditInvoice={handleEditInvoice} />;
      case 'new-invoice':
        return <InvoiceForm setView={setCurrentView} />;
      case 'edit-invoice':
        return <InvoiceForm setView={setCurrentView} existingInvoice={editingInvoice} />;
      case 'clients':
        return <ClientManager />;
      case 'items':
        return <ItemManager />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard setView={setCurrentView} onEditInvoice={handleEditInvoice} />;
    }
  };

  return (
    <AppProvider>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-800 font-sans">
        <Sidebar currentView={currentView} setView={setCurrentView} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-800">
            <div className="container mx-auto px-6 py-8">
              {renderView()}
            </div>
          </main>
        </div>
      </div>
    </AppProvider>
  );
};

export default App;
