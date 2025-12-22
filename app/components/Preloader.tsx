'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';

import { Suspense } from 'react';

function PreloaderContent() {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Promise 1: Tunggu minimal 2 detik (agar animasi text selesai)
    console.log('Preloader v1.1 - Checking deployment');
    const minTimePromise = new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Promise 2: Tunggu halaman selesai loading
    const loadPromise = new Promise((resolve) => {
      if (document.readyState === 'complete') {
        resolve(true);
      } else {
        window.addEventListener('load', () => resolve(true));
      }
    });

    // Tunggu KEDUANYA selesai baru hilangkan loader
    Promise.all([minTimePromise, loadPromise]).then(() => {
      setLoading(false);
    });

  }, []);

  // Efek saat pindah halaman (navigasi)
  useEffect(() => {
      setLoading(true);
      // Saat navigasi, beri waktu animasi main sebentar (2 detik juga konsisten)
      const timeout = setTimeout(() => setLoading(false), 2000); 
      return () => clearTimeout(timeout);
  }, [pathname, searchParams]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black transition-opacity duration-500">
      <div className="relative animate-fade-in-up mb-4">
        <Image 
          src="/logo.png" 
          alt="Adventure Hub Logo" 
          width={120} 
          height={120} 
          className="object-contain brightness-0 invert"
          priority
        />
      </div>
      <div className="flex items-center space-x-[2px] text-white tracking-[0.2em] text-lg md:text-xl">
        {"ADVENTURE".split("").map((char, i) => (
          <span 
            key={i} 
            className="opacity-0 animate-fade-in"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            {char}
          </span>
        ))}
        <span 
          className="font-bold opacity-0 animate-fade-in text-[#19b366] ml-1" 
          style={{ animationDelay: `${900}ms` }}
        >
          HUB
        </span>
      </div>
    </div>
  );
}

export default function Preloader() {
  return (
    <Suspense fallback={null}>
      <PreloaderContent />
    </Suspense>
  );
}
