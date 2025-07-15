"use client"
import React, { useState, useEffect } from 'react';

import { BackgroundLines } from "@/components/ui/background-lines";

export default function Home() {
 return <div><BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b  from-neutral-600 to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
        DrawByte <br />
      </h2>
      <p className="max-w-xl mx-auto text-md md:text-xl text-neutral-300 text-center pb-3">
      Create in sync — sketch live with friends
      
      </p>
      <div className='flex justify-center items-center'> <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
          Start Drawing
        </span>
      </button></div>
      </BackgroundLines>
     
     
      
      
      </div>
}