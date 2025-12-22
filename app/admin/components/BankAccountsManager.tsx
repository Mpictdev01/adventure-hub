'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BankAccount } from '@/app/lib/db';

export default function BankAccountsManager() {
  const router = useRouter();
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [deleting, setDeleting] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAccount, setEditingAccount] = useState<BankAccount | null>(null);
  const [formData, setFormData] = useState({
    bankName: '',
    accountNumber: '',
    accountName: '',
    logo: '🏦',
    isActive: true,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const res = await fetch('/api/bank-accounts');
      if (res.ok) {
        setAccounts(await res.json());
      }
    } catch (error) {
      console.error('Failed to fetch bank accounts:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === accounts.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(accounts.map(a => a.id)));
    }
  };

  const deleteSelected = async () => {
    if (selectedIds.size === 0) return;
    
    if (!confirm(`Are you sure you want to delete ${selectedIds.size} bank account(s)?`)) {
      return;
    }

    setDeleting(true);
    try {
      await Promise.all(
        Array.from(selectedIds).map(id =>
          fetch(`/api/bank-accounts/${id}`, { method: 'DELETE' })
        )
      );
      setAccounts(accounts.filter(a => !selectedIds.has(a.id)));
      setSelectedIds(new Set());
    } catch (error) {
      console.error('Error deleting bank accounts:', error);
      alert('Failed to delete some accounts');
    } finally {
      setDeleting(false);
    }
  };

  const toggleActive = async (account: BankAccount) => {
    try {
      await fetch(`/api/bank-accounts/${account.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !account.isActive }),
      });
      setAccounts(accounts.map(a => 
        a.id === account.id ? { ...a, isActive: !a.isActive } : a
      ));
    } catch (error) {
      console.error('Error toggling active status:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (editingAccount) {
        const res = await fetch(`/api/bank-accounts/${editingAccount.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error('Failed to update');
      } else {
        const res = await fetch('/api/bank-accounts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error('Failed to create');
      }
      
      setShowAddForm(false);
      setEditingAccount(null);
      setFormData({ bankName: '', accountNumber: '', accountName: '', logo: '🏦', isActive: true });
      fetchAccounts();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  const openEditForm = (account: BankAccount) => {
    setEditingAccount(account);
    setFormData({
      bankName: account.bankName,
      accountNumber: account.accountNumber,
      accountName: account.accountName,
      logo: account.logo,
      isActive: account.isActive,
    });
    setShowAddForm(true);
  };

  const cancelForm = () => {
    setShowAddForm(false);
    setEditingAccount(null);
    setFormData({ bankName: '', accountNumber: '', accountName: '', logo: '🏦', isActive: true });
  };

  if (loading) return <div className="p-8 text-[#9eb7ab]">Loading bank accounts...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Bank Account Management</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-[#19b366] text-[#112119] px-4 py-2 rounded hover:bg-[#159655] font-bold"
        >
          + Add Bank Account
        </button>
      </div>

      {/* Info */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 text-blue-400 text-sm">
        <span className="material-symbols-outlined text-sm align-middle mr-2">info</span>
        Bank accounts yang aktif akan ditampilkan di halaman pembayaran saat booking.
      </div>

      {/* Action Bar */}
      {selectedIds.size > 0 && (
        <div className="flex items-center justify-between bg-red-500/10 border border-red-500/30 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-red-400">check_circle</span>
            <span className="text-white font-medium">{selectedIds.size} account(s) selected</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setSelectedIds(new Set())} className="px-4 py-2 text-[#9eb7ab] hover:text-white">
              Cancel
            </button>
            <button
              onClick={deleteSelected}
              disabled={deleting}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-sm">delete</span>
              {deleting ? 'Deleting...' : 'Delete Selected'}
            </button>
          </div>
        </div>
      )}

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-[#1c2621] rounded-lg p-6 border border-[#293830]">
          <h3 className="text-lg font-bold text-white mb-4">
            {editingAccount ? 'Edit Bank Account' : 'Add New Bank Account'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#9eb7ab] text-sm mb-1">Bank Name</label>
                <input
                  type="text"
                  value={formData.bankName}
                  onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                  placeholder="e.g., Bank BCA"
                  className="w-full px-4 py-2 bg-[#111714] border border-[#293830] rounded text-white placeholder-[#9eb7ab]/50"
                  required
                />
              </div>
              <div>
                <label className="block text-[#9eb7ab] text-sm mb-1">Account Number</label>
                <input
                  type="text"
                  value={formData.accountNumber}
                  onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                  placeholder="e.g., 1234567890"
                  className="w-full px-4 py-2 bg-[#111714] border border-[#293830] rounded text-white placeholder-[#9eb7ab]/50"
                  required
                />
              </div>
              <div>
                <label className="block text-[#9eb7ab] text-sm mb-1">Account Name</label>
                <input
                  type="text"
                  value={formData.accountName}
                  onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                  placeholder="e.g., PT AdventureHub Indonesia"
                  className="w-full px-4 py-2 bg-[#111714] border border-[#293830] rounded text-white placeholder-[#9eb7ab]/50"
                  required
                />
              </div>
              <div>
                <label className="block text-[#9eb7ab] text-sm mb-1">Logo (emoji)</label>
                <input
                  type="text"
                  value={formData.logo}
                  onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                  className="w-full px-4 py-2 bg-[#111714] border border-[#293830] rounded text-white"
                />
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-600 bg-[#1c2621] text-[#19b366]"
                />
                <label htmlFor="isActive" className="text-[#9eb7ab] text-sm">Active (show in booking)</label>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="bg-[#19b366] text-[#112119] px-4 py-2 rounded hover:bg-[#159655] font-bold disabled:opacity-50"
              >
                {saving ? 'Saving...' : editingAccount ? 'Update Account' : 'Add Account'}
              </button>
              <button
                type="button"
                onClick={cancelForm}
                className="px-4 py-2 border border-[#293830] text-[#9eb7ab] rounded hover:bg-[#293830] hover:text-white"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Accounts Table */}
      <div className="bg-[#1c2621] rounded-lg shadow border border-[#293830]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#9eb7ab]">
            <thead className="bg-[#111714] uppercase text-xs font-semibold border-b border-[#293830]">
              <tr>
                <th className="px-4 py-4 w-12">
                  <input
                    type="checkbox"
                    checked={selectedIds.size === accounts.length && accounts.length > 0}
                    onChange={toggleSelectAll}
                    className="h-4 w-4 rounded border-gray-600 bg-[#1c2621] text-[#19b366]"
                  />
                </th>
                <th className="px-4 py-4">Bank</th>
                <th className="px-4 py-4">Account Number</th>
                <th className="px-4 py-4">Account Name</th>
                <th className="px-4 py-4">Status</th>
                <th className="px-4 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#293830]">
              {accounts.map((account) => (
                <tr key={account.id} className={`hover:bg-[#111714] ${selectedIds.has(account.id) ? 'bg-[#19b366]/5' : ''}`}>
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(account.id)}
                      onChange={() => toggleSelect(account.id)}
                      className="h-4 w-4 rounded border-gray-600 bg-[#1c2621] text-[#19b366]"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{account.logo}</span>
                      <span className="font-medium text-white">{account.bankName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 font-mono">{account.accountNumber}</td>
                  <td className="px-4 py-4">{account.accountName}</td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => toggleActive(account)}
                      className={`px-2 py-1 rounded text-xs font-medium border cursor-pointer transition-colors
                        ${account.isActive 
                          ? 'bg-[#19b366]/10 text-[#19b366] border-[#19b366]/30 hover:bg-[#19b366]/20' 
                          : 'bg-gray-500/10 text-gray-400 border-gray-500/30 hover:bg-gray-500/20'}`}
                    >
                      {account.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <button
                      onClick={() => openEditForm(account)}
                      className="text-[#19b366] hover:text-[#159655] font-medium"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
              {accounts.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-[#9eb7ab]">
                    No bank accounts found. Add one to enable bank transfer payments.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
