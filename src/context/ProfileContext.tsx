"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { defaultProfile, Profile as ProfileType } from '@/data/profile';
import { useRouter } from 'next/navigation';

interface ProfileContextType {
  profile: ProfileType | null;
  setProfile: (profile: ProfileType) => void;
  loadDemoProfile: () => void;
  resetProfile: () => void;
  isLoaded: boolean;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfileState] = useState<ProfileType | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedProfile = localStorage.getItem('oppOS_profile');
    if (savedProfile) {
      setProfileState(JSON.parse(savedProfile));
    }
    setIsLoaded(true);
  }, []);

  const setProfile = (newProfile: ProfileType) => {
    setProfileState(newProfile);
    localStorage.setItem('oppOS_profile', JSON.stringify(newProfile));
  };

  const loadDemoProfile = () => {
    setProfile(defaultProfile);
    router.push('/dashboard');
  };

  const resetProfile = () => {
    setProfileState(null);
    localStorage.removeItem('oppOS_profile');
    router.push('/onboarding');
  };

  return (
    <ProfileContext.Provider value={{ profile, setProfile, loadDemoProfile, resetProfile, isLoaded }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}
