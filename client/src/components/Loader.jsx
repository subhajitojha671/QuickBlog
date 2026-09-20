import React from 'react';

const Loader = () => {
  return (
    <div className='flex flex-col justify-center items-center min-h-[65vh] gap-4 animate-fadeIn'>
      <div className='relative w-14 h-14'>
        {/* Modern Base Static Track ring visual ring asset */}
        <div className='w-full h-full border-4 border-slate-100/80 rounded-2xl shadow-inner-sm' />
        {/* Liquid Spinning Interface accent loop wrapper */}
        <div className='absolute top-0 left-0 w-full h-full border-4 border-primary border-t-transparent rounded-2xl animate-spin shadow-sm' />
      </div>
      <p className='text-xs font-bold uppercase tracking-widest text-slate-400/80 animate-pulse'>Syncing platform resources...</p>
    </div>
  );
};

export default Loader;