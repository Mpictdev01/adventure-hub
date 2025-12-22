'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminUser } from '@/app/lib/db';

export default function UsersManager() {
  const router = useRouter();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [deleting, setDeleting] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    email: '',
    role: 'admin' as 'admin' | 'superadmin',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    console.log('Frontend: Mulai fetchUsers...');
    try {
      const res = await fetch('/api/admin-users');
      console.log('Frontend: Respon diterima, status:', res.status);
      if (res.ok) {
        const data = await res.json();
        console.log('Frontend: Data diterima:', data);
        setUsers(data);
      }
    } catch (error) {
      console.error('Frontend: Gagal fetch users:', error);
    } finally {
      console.log('Frontend: Selesai fetchUsers, set loading false');
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
    if (selectedIds.size === users.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(users.map(u => u.id)));
    }
  };

  const deleteSelected = async () => {
    if (selectedIds.size === 0) return;
    
    if (!confirm(`Are you sure you want to delete ${selectedIds.size} user(s)?`)) {
      return;
    }

    setDeleting(true);
    try {
      await Promise.all(
        Array.from(selectedIds).map(id =>
          fetch(`/api/admin-users/${id}`, { method: 'DELETE' })
        )
      );
      setUsers(users.filter(u => !selectedIds.has(u.id)));
      setSelectedIds(new Set());
    } catch (error) {
      console.error('Error deleting users:', error);
      alert('Failed to delete some users');
    } finally {
      setDeleting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (editingUser) {
        // Update existing user
        const res = await fetch(`/api/admin-users/${editingUser.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error('Failed to update');
      } else {
        // Create new user
        const res = await fetch('/api/admin-users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || 'Failed to create');
        }
      }
      
      setShowAddForm(false);
      setEditingUser(null);
      setFormData({ username: '', password: '', name: '', email: '', role: 'admin' });
      fetchUsers();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  const openEditForm = (user: AdminUser) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      password: '', // Don't populate password for security
      name: user.name,
      email: user.email,
      role: user.role,
    });
    setShowAddForm(true);
  };

  const cancelForm = () => {
    setShowAddForm(false);
    setEditingUser(null);
    setFormData({ username: '', password: '', name: '', email: '', role: 'admin' });
  };

  if (loading) return <div className="p-8 text-[#9eb7ab]">Loading users...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">User Management</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-[#19b366] text-[#112119] px-4 py-2 rounded hover:bg-[#159655] font-bold"
        >
          + Add User
        </button>
      </div>

      {/* Action Bar */}
      {selectedIds.size > 0 && (
        <div className="flex items-center justify-between bg-red-500/10 border border-red-500/30 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-red-400">check_circle</span>
            <span className="text-white font-medium">{selectedIds.size} user(s) selected</span>
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

      {/* Add/Edit Form Modal */}
      {showAddForm && (
        <div className="bg-[#1c2621] rounded-lg p-6 border border-[#293830]">
          <h3 className="text-lg font-bold text-white mb-4">
            {editingUser ? 'Edit User' : 'Add New User'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#9eb7ab] text-sm mb-1">Username</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  disabled={!!editingUser}
                  className="w-full px-4 py-2 bg-[#111714] border border-[#293830] rounded text-white disabled:opacity-50"
                  required
                />
              </div>
              <div>
                <label className="block text-[#9eb7ab] text-sm mb-1">
                  Password {editingUser && '(leave blank to keep current)'}
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-2 bg-[#111714] border border-[#293830] rounded text-white"
                  required={!editingUser}
                />
              </div>
              <div>
                <label className="block text-[#9eb7ab] text-sm mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-[#111714] border border-[#293830] rounded text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-[#9eb7ab] text-sm mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 bg-[#111714] border border-[#293830] rounded text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-[#9eb7ab] text-sm mb-1">Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as 'admin' | 'superadmin' })}
                  className="w-full px-4 py-2 bg-[#111714] border border-[#293830] rounded text-white"
                >
                  <option value="admin">Admin</option>
                  <option value="superadmin">Super Admin</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="bg-[#19b366] text-[#112119] px-4 py-2 rounded hover:bg-[#159655] font-bold disabled:opacity-50"
              >
                {saving ? 'Saving...' : editingUser ? 'Update User' : 'Create User'}
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

      {/* Users Table */}
      <div className="bg-[#1c2621] rounded-lg shadow border border-[#293830]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#9eb7ab]">
            <thead className="bg-[#111714] uppercase text-xs font-semibold border-b border-[#293830]">
              <tr>
                <th className="px-4 py-4 w-12">
                  <input
                    type="checkbox"
                    checked={selectedIds.size === users.length && users.length > 0}
                    onChange={toggleSelectAll}
                    className="h-4 w-4 rounded border-gray-600 bg-[#1c2621] text-[#19b366]"
                  />
                </th>
                <th className="px-4 py-4">Username</th>
                <th className="px-4 py-4">Name</th>
                <th className="px-4 py-4">Email</th>
                <th className="px-4 py-4">Role</th>
                <th className="px-4 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#293830]">
              {users.map((user) => (
                <tr key={user.id} className={`hover:bg-[#111714] ${selectedIds.has(user.id) ? 'bg-[#19b366]/5' : ''}`}>
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(user.id)}
                      onChange={() => toggleSelect(user.id)}
                      className="h-4 w-4 rounded border-gray-600 bg-[#1c2621] text-[#19b366]"
                    />
                  </td>
                  <td className="px-4 py-4 font-medium text-white">{user.username}</td>
                  <td className="px-4 py-4">{user.name}</td>
                  <td className="px-4 py-4">{user.email}</td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium border
                      ${user.role === 'superadmin' ? 'bg-purple-500/10 text-purple-400 border-purple-500/30' : 'bg-[#19b366]/10 text-[#19b366] border-[#19b366]/30'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <button
                      onClick={() => openEditForm(user)}
                      className="text-[#19b366] hover:text-[#159655] font-medium"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-[#9eb7ab]">
                    No admin users found. Add one to get started.
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
