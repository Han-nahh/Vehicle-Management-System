import React from 'react'

const DefLayout = (props) => {
  return (
    <div>
<div className='p-4'>
  <div className="flex justify-between items-center bg-gray-800 p-6 rounded-lg shadow-xl">
    <h1 className="text-3xl font-extrabold text-white">
      FleetTrackers
    </h1>
    <button className="bg-gray-200 text-gray-800 px-5 py-2 rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-500 transition duration-300 transform hover:scale-105">
      user@gmail.com
    </button>
  </div>
</div>

        <div className="content">

            {props.children}
        </div>
        </div>
  )
}

export default DefLayout