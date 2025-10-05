import React from 'react'

const Costing = ({ company }) => {
  const ideal = company?.energyMetrics?.idealCost || 0;
  const actual = company?.energyMetrics?.actualCost || 0;
  return (
    <div className='bg-[#111827] p-6 space-y-4'>
      <h2 className='text-2xl font-bold'>Cost Analysis</h2>
      <p>Ideal Cost of each equipment without usage : {ideal}</p>
      <p>Actual Cost of each equipment with usage cost : {actual}</p>
      
      {(actual > 15000) && (
        <>
          <p >The costing is high enough</p>
          <p>Take the suggestive action to reduce the cost.</p>
        </>
      )}
      {(actual < 15000) && (
        <>
          <p>Cost is moderate considering the per unit consumption</p>
        </>
      )}


    </div>
  )
}

export default Costing;
