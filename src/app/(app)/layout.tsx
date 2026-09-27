"use client";

import AppShell from '@/components/AppShell';
import { useProfile } from '@/context/ProfileContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { profile, isLoaded } = useProfile();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoaded && !profile && pathname !== '/onboarding') {
      router.push('/onboarding');
    }
  }, [isLoaded, profile, router, pathname]);

  if (!isLoaded || (!profile && pathname !== '/onboarding')) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'var(--text-secondary)' }}>Loading...</div>;
  }

  return <AppShell>{children}</AppShell>;
}
