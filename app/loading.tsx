import Image from 'next/image';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black">
      {/* 1. Logo Image */}
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

      {/* 2. Text Logo: ADVENTUREHUB */}
      <div className="flex items-center space-x-[2px] text-white tracking-[0.2em] text-lg md:text-xl">
        {/* Animasi huruf per huruf */}
        {"ADVENTURE".split("").map((char, i) => (
          <span 
            key={i} 
            className="opacity-0 animate-fade-in"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            {char}
          </span>
        ))}
        {/* HUB Bold & Green */}
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
