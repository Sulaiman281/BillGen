
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { ServiceItem } from '../types';
import { TrashIcon } from './icons/IconCollection';

const ItemManager: React.FC = () => {
  const { items, setItems, profile } = useAppContext();
  const [newItem, setNewItem] = useState<Omit<ServiceItem, 'id'>>({ description: '', rate: 0 });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: name === 'rate' ? parseFloat(value) : value });
  };

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItem.description && newItem.rate >= 0) {
      setItems([...items, { ...newItem, id: `item-${Date.now()}` }]);
      setNewItem({ description: '', rate: 0 });
    }
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
     <div>
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">Manage Items/Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
                <form onSubmit={addItem} className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Add New Item</h3>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                        <input type="text" name="description" value={newItem.description} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white sm:text-sm" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Rate ({profile.currencySymbol})</label>
                        <input type="number" name="rate" value={newItem.rate} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white sm:text-sm" required />
                    </div>
                    <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Add Item</button>
                </form>
            </div>
            <div className="md:col-span-2">
                 <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-800">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Rate</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                                {items.map(item => (
                                    <tr key={item.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{item.description}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{profile.currencySymbol}{item.rate.toFixed(2)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button onClick={() => removeItem(item.id)} className="text-red-600 hover:text-red-900"><TrashIcon className="w-5 h-5" /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                 </div>
            </div>
        </div>
    </div>
  );
};

export default ItemManager;
