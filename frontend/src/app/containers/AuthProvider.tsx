'use client';
import { ReactNode } from 'react';
import { AuthProvider as Provider } from '../hooks/useAuth';

export default function AuthProvider({ children }: { children: ReactNode }) {
  return <Provider>{children}</Provider>;
} 