import React from 'react'
export default function Header({count, num}) {
  return (
    <div className='flex justify-between items-center p-5'>
        <div className='flex gap-3 items-center text-3xl font-bold'>
            <p><i className="fa-solid fa-calendar text-tertiary"></i></p>
            <h1>Tech Event Planner</h1>
        </div>
        <p className='bg-blue-200 p-2 rounded-md text-tertiary font-semibold'>{num}/{count} Event Attended</p>
    </div>
  )
}
