import type { Metadata } from 'next';
import HomePage from '../src/views/HomePage';

export const metadata: Metadata = { alternates: { canonical: '/' } };

export default function Page() {
  return <HomePage />;
}
