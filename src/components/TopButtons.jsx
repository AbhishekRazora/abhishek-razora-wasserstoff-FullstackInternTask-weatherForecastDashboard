import React from 'react'

const TopButtons = () => {

    const cities=[
        {
            id:1,
            name:'London'
        },
        {
            id:2,
            name:'Mumbai'
        },
        {
            id:3,
            name:'Delhi'
        },
        {
            id:4,
            name:'Tokyo'
        },
        {
            id:5,
            name:'Paris'
        },
    ]
  return (
    <div className='flex items-center justify-around my-6'>
        {
            cities.map(ct=>(
<button key={ct.name} className='text-lg font-medium hover:bg-gray-700/20 px-3 py-2
         rounded-md transition ease-in'>{ct.name}</button>
            ))
        }
        
      
    </div>
  )
}

export default TopButtons

