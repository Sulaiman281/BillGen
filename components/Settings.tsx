
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { BusinessProfile } from '../types';

const TemplateOption: React.FC<{
  label: string;
  layout: BusinessProfile['templateLayout'];
  selectedLayout: BusinessProfile['templateLayout'];
  onClick: (layout: BusinessProfile['templateLayout']) => void;
}> = ({ label, layout, selectedLayout, onClick }) => {
  const isSelected = selectedLayout === layout;
  
  const getPreview = () => {
    switch(layout) {
      case 'modern':
        return (
          <div className="h-24 w-full bg-white rounded flex flex-col p-2">
            <div className="flex items-start justify-between">
              <div className="w-1/3 h-4 bg-gray-300 rounded-sm"></div>
              <div className="w-1/4 h-6 bg-gray-400 rounded-sm"></div>
            </div>
            <div className="flex-grow mt-3 space-y-1">
              <div className="w-full h-2 bg-gray-200 rounded-sm"></div>
              <div className="w-full h-2 bg-gray-200 rounded-sm"></div>
              <div className="w-3/4 h-2 bg-gray-200 rounded-sm"></div>
            </div>
            <div className="w-1/3 h-3 bg-blue-300 rounded-sm self-end"></div>
          </div>
        );
      case 'compact':
        return (
          <div className="h-24 w-full bg-white rounded flex flex-col p-1.5">
            <div className="flex justify-between items-center">
              <div className="w-1/4 h-3 bg-gray-300 rounded-sm"></div>
               <div className="w-1/4 h-4 bg-gray-400 rounded-sm"></div>
            </div>
            <div className="flex-grow mt-2 space-y-1">
              <div className="w-full h-1.5 bg-gray-200 rounded-sm"></div>
              <div className="w-full h-1.5 bg-gray-200 rounded-sm"></div>
              <div className="w-full h-1.5 bg-gray-200 rounded-sm"></div>
              <div className="w-3/4 h-1.5 bg-gray-200 rounded-sm"></div>
            </div>
          </div>
        );
      case 'classic':
      default:
        return (
          <div className="h-24 w-full bg-white rounded flex flex-col p-2">
            <div className="flex justify-between">
              <div className="w-1/3 h-6 bg-gray-300 rounded-sm"></div>
              <div className="w-1/4 h-6 bg-gray-400 rounded-sm"></div>
            </div>
            <div className="flex-grow mt-3 space-y-2">
              <div className="w-full h-2 bg-gray-200 rounded-sm"></div>
              <div className="w-full h-2 bg-gray-200 rounded-sm"></div>
              <div className="w-3/4 h-2 bg-gray-200 rounded-sm"></div>
            </div>
            <div className="w-1/3 h-4 bg-blue-300 rounded-sm self-end"></div>
          </div>
        );
    }
  }

  return (
    <div
      onClick={() => onClick(layout)}
      className={`cursor-pointer rounded-lg p-2 border-2 ${isSelected ? 'border-blue-500' : 'border-gray-300 dark:border-gray-600'}`}
    >
      <div className="bg-gray-100 dark:bg-gray-700 rounded-md p-2">
        {getPreview()}
      </div>
      <p className="text-center mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">{label}</p>
    </div>
  );
};

const Settings: React.FC = () => {
  const { profile, setProfile } = useAppContext();
  const [formData, setFormData] = useState<BusinessProfile>(profile);
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, logo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTemplateChange = (layout: BusinessProfile['templateLayout']) => {
    setFormData({ ...formData, templateLayout: layout });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(formData);
    setSuccessMessage('Settings saved successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">Settings</h2>
      
      <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md max-w-4xl mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Business Info */}
            <div className="col-span-1">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Business Profile</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Company Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white sm:text-sm" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
                <textarea name="address" value={formData.address} onChange={handleInputChange} rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white sm:text-sm"></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white sm:text-sm" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white sm:text-sm" />
              </div>
            </div>

            {/* Branding & Payment */}
            <div className="col-span-1">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Branding & Finance</h3>
               <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Logo</label>
                <div className="mt-1 flex items-center">
                    {formData.logo && <img src={formData.logo} alt="logo" className="h-12 w-12 rounded-full object-cover mr-4" />}
                    <input type="file" onChange={handleLogoChange} className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
                </div>
              </div>
               <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Brand Color</label>
                 <input type="color" name="brandColor" value={formData.brandColor} onChange={handleInputChange} className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Currency Symbol</label>
                <input type="text" name="currencySymbol" value={formData.currencySymbol} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white sm:text-sm" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Bank Details / Payment Info</label>
                <textarea name="bankDetails" value={formData.bankDetails} onChange={handleInputChange} rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white sm:text-sm"></textarea>
              </div>
            </div>

             <div className="md:col-span-2 mt-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Invoice Template</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <TemplateOption
                    label="Classic"
                    layout="classic"
                    selectedLayout={formData.templateLayout}
                    onClick={handleTemplateChange}
                    />
                    <TemplateOption
                    label="Modern"
                    layout="modern"
                    selectedLayout={formData.templateLayout}
                    onClick={handleTemplateChange}
                    />
                    <TemplateOption
                    label="Compact"
                    layout="compact"
                    selectedLayout={formData.templateLayout}
                    onClick={handleTemplateChange}
                    />
                </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end items-center">
            {successMessage && <span className="text-green-600 mr-4">{successMessage}</span>}
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
