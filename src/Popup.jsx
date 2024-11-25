import React from 'react'

export default function Popup({ values, setValues, pop, setPop, index, setCount, setNum }) {
  const handleDelete = () => {
    if (index !== null) {
      setValues(values.filter((_, i) => i !== index));
      setPop(false); 
      setCount(c => c - 1);
      setNum(n => n > 0 ? n - 1 : n);
    }
  }

  const closePopup = () => setPop(false);

  return (
    <div>
      {pop && (
        <div className='absolute bg-secondary min-h-screen top-0 w-full bg-opacity-35 backdrop-blur-md flex justify-center items-center'>
          <div className='bg-primary p-5 rounded-md shadow-2xl px-5 py-8 w-[35%]'>
            <p className='font-bold text-2xl text-center'>Are you sure you want to delete?</p>
            <div className='flex gap-7 items-center justify-center mt-10'>
              <button 
                className='px-4 py-1 bg-tertiary text-primary font-bold text-xl' 
                onClick={handleDelete}
                aria-label="Confirm delete"
              >
                Yes
              </button>
              <button 
                className='px-4 py-1 bg-tertiary text-primary font-bold text-xl' 
                onClick={closePopup}
                aria-label="Cancel delete"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
