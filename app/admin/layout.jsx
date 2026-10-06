'use client';

import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/admin', label: 'Dashboard', exact: true },
  { href: '/admin/appointments', label: 'Appointments' },
  { href: '/admin/schedule', label: 'Create Appointments' },
];

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top nav */}
      {/* <header className="bg-primary border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="font-semibold text-white text-sm">Pickens PC Repair</Link>
            <nav className="hidden sm:flex items-center gap-1">
              {navLinks.map(({ href, label, exact }) => {
                const isActive = exact ? pathname === href : pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      'px-3 py-1.5 text-sm rounded-md transition-colors',
                      isActive ? 'bg-gray-100 text-gray-900 font-medium' : 'text-white hover:text-gray-800 hover:bg-gray-50'
                    )}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-white hover:text-white/60 cursor-pointer transition-colors"
          >
            Logout
          </button>
        </div>
        {/* Mobile nav */}
        {/* <div className="sm:hidden border-t flex">
          {navLinks.map(({ href, label, exact }) => {
            const isActive = exact ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex-1 text-center py-2 text-xs',
                  isActive ? 'text-blue-600 font-semibold border-b-2 border-blue-600' : 'text-gray-500'
                )}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </header> */}

      

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6 mt-35">
        {children}
      </main>
    </div>
  );
}
