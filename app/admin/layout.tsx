'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (pathname === '/admin/login') {
      setAuthorized(true);
      return;
    }

    // Simple check for cookie
    if (!document.cookie.includes('admin_auth=true')) {
      router.push('/admin/login');
    } else {
      setAuthorized(true);
    }
  }, [pathname, router]);

  if (!authorized) {
    return null; // Or a loading spinner
  }

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const menuItems = [
    { name: 'Dashboard', href: '/admin', icon: 'dashboard' },
    { name: 'Trips', href: '/admin/trips', icon: 'hiking' },
    { name: 'Bookings', href: '/admin/bookings', icon: 'calendar_month' },
    { name: 'Reports', href: '/admin/reports', icon: 'assessment' },
    { name: 'Articles', href: '/admin/articles', icon: 'article' },
    { name: 'Gallery', href: '/admin/gallery', icon: 'photo_library' },
  ];

  const settingsItems = [
    { name: 'Users', href: '/admin/users', icon: 'group' },
    { name: 'Bank Accounts', href: '/admin/bank-accounts', icon: 'account_balance' },
    { name: 'Settings', href: '/admin/settings', icon: 'settings' },
  ];

  return (
    <div className="flex min-h-screen bg-[#112119] font-sans text-white">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full bg-[#111714] border-b border-[#293830] z-40 p-4 flex justify-between items-center">
         <h2 className="text-xl font-bold tracking-wider text-[#19b366]">AdminHub</h2>
         <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="text-white p-2">
           <span className="text-2xl">☰</span>
         </button>
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#111714] border-r border-[#293830] flex-shrink-0 transition-transform duration-300 transform
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0
      `}>
        <div className="p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-wider text-[#19b366]">AdminHub</h2>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-500">✕</button>
        </div>
        <nav className="mt-2 px-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded transition-colors ${
                  isActive
                    ? 'bg-[#19b366] text-[#112119] font-bold'
                    : 'text-[#9eb7ab] hover:bg-[#1c2621] hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}

          {/* Settings Section */}
          <div className="pt-6 mt-4 border-t border-[#293830]">
            <p className="px-4 text-xs uppercase tracking-wider text-[#9eb7ab]/60 mb-2">Settings</p>
            {settingsItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded transition-colors ${
                    isActive
                      ? 'bg-[#19b366] text-[#112119] font-bold'
                      : 'text-[#9eb7ab] hover:bg-[#1c2621] hover:text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  {item.name}
                </Link>
              );
            })}
          </div>

          <button
            onClick={() => {
              document.cookie = "admin_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              router.push('/admin/login');
            }}
            className="flex items-center gap-3 w-full text-left px-4 py-3 text-red-400 hover:bg-[#1c2621] rounded mt-6"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 pt-20 md:pt-8 overflow-y-auto w-full">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            {menuItems.find((item) => item.href === pathname)?.name || 'Dashboard'}
          </h1>
          <div className="flex items-center space-x-4">
             <div className="h-10 w-10 rounded-full bg-[#1c2621] border border-[#293830] flex items-center justify-center text-[#19b366] font-bold">
               A
             </div>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
