import React from 'react'

const Consumpstion = ({ company }) => {
    const actual = company?.energyMetrics?.actualConsumption || 0;
    const ideal = company?.energyMetrics?.idealConsumption || 0;
    const diff = ideal*12 - actual;
    const pf = ideal !==0 ? (diff)/(ideal*10) : 0;
  return (
    <div className=" mx-auto h-90 p-6 bg-[#111827] rounded-lg shadow-md space-y-4">
        <h2 className='text-2xl font-bold '>Energy Consumption Report</h2>
        <p className="text-xl font-medium ">The ideal value for the Energy Consumption is : {ideal}</p>
        <p className="">The actual value for the Energy consumption diffence is : {diff}</p>
        {pf < 0.5 && (
            <>
                <p>Energy Consumption is very poor the Power Factor reaches : {pf.toFixed(2)}</p>
                <div className='bg-[#182237] p-6 rounded-lg '>
                    <h1 className='text-xl text-red-600'>Alert :</h1>
                    <p className='ml-10'>The system is under high pressure better to switch all the heavy machines off</p>
                    <p className='ml-10'>for further equipment details immediately visit suggestions section</p>
                </div>
            </>
        )}
        { (pf > 0.5 && pf <= 0.7) && (
            <>
                <p>The Power Factor of the complete Output is : {pf.toFixed(2)}</p>
                <div className='bg-[#182237] p-6 rounded-lg '>
                    <h1 className='text-xl text-yellow-600'>Warning :</h1>
                    <p className='ml-10'>The system is under moderate pressure better to switch the heavy machines to offtime</p>
                    <p className=''>Apply the suggestive method for increasing the power factor</p>
                </div>
            </>
        )}
        {pf > 0.7 && (
            <>
                <p className='text-green-600'>The power Factor is ediquate just need some monitoring <br/> please visit the suggestive methods for that.</p>
            </>
        )}
    </div>
  )
}

export default Consumpstion;