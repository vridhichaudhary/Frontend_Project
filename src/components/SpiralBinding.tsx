import React from 'react';

export default function SpiralBinding() {
  const loops = Array.from({ length: 28 });
  
  return (
    <div className="w-full flex justify-between px-8 absolute top-0 -translate-y-1/2 z-50 pointer-events-none">
      {loops.map((_, i) => (
        <div key={i} className="relative w-1.5 h-6 md:w-2 md:h-7">
          <div className="absolute inset-0 bg-[#8c929d] rounded-sm border-[0.5px] border-[#3a3d42]" />
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 md:w-2.5 md:h-2.5 bg-[#0F1115] rounded-full" />
        </div>
      ))}
    </div>
  );
}
