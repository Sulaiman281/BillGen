
import React from 'react';
import { DashboardIcon, InvoiceIcon, ClientsIcon, ItemsIcon, SettingsIcon, PlusIcon } from './icons/IconCollection';

type View = 'dashboard' | 'new-invoice' | 'edit-invoice' | 'clients' | 'items' | 'settings';

interface SidebarProps {
  currentView: View;
  setView: (view: View) => void;
}

const NavLink: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
  <a
    href="#"
    onClick={(e) => {
      e.preventDefault();
      onClick();
    }}
    className={`flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700 ${
      isActive ? 'bg-gray-200 dark:bg-gray-700' : ''
    }`}
  >
    {icon}
    <span className="mx-4 font-medium">{label}</span>
  </a>
);

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  return (
    <div className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-900 border-r dark:border-gray-700">
      <div className="flex items-center justify-center h-16 border-b dark:border-gray-700">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">BillGen</h1>
      </div>
      <div className="flex flex-col flex-1 p-4">
        <button
          onClick={() => setView('new-invoice')}
          className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
        >
          <PlusIcon className="w-5 h-5" />
          <span className="mx-1">New Invoice</span>
        </button>
        <nav className="flex-1">
          <NavLink
            icon={<DashboardIcon className="w-5 h-5" />}
            label="Dashboard"
            isActive={currentView === 'dashboard'}
            onClick={() => setView('dashboard')}
          />
          <NavLink
            icon={<InvoiceIcon className="w-5 h-5" />}
            label="Invoices"
            isActive={currentView === 'new-invoice' || currentView === 'edit-invoice'}
            onClick={() => setView('dashboard')} // Invoices are on dashboard
          />
          <NavLink
            icon={<ClientsIcon className="w-5 h-5" />}
            label="Clients"
            isActive={currentView === 'clients'}
            onClick={() => setView('clients')}
          />
          <NavLink
            icon={<ItemsIcon className="w-5 h-5" />}
            label="Items"
            isActive={currentView === 'items'}
            onClick={() => setView('items')}
          />
        </nav>
        <div>
           <NavLink
            icon={<SettingsIcon className="w-5 h-5" />}
            label="Settings"
            isActive={currentView === 'settings'}
            onClick={() => setView('settings')}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
