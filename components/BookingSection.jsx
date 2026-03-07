'use client';

import { useEffect, useState } from 'react';
import Packages from './Packages';
import Booking from './Booking';

export default function BookingSection({ t }) {
  const [selectedPackage, setSelectedPackage] = useState('');
  
  return (
    <>
      <Packages t={t} onSelectPackage={(pkg) => {
        console.log('Selected package:', pkg);
        setSelectedPackage(pkg);
        document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' });
      }} />
      
      <div className="gold-divider" />
      <Booking t={t} selectedPackage={selectedPackage} />
    </>
  );
}