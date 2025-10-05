import React from 'react'
import SixMonthTrend from './SixMonthTrend'

const ReportChartPlaceholder = ({ company }) => {
  return (
    <div className=''>
        <section className="bg-[#111827] p-6 rounded">
        <h3 className="text-xl font-bold mb-4">6-Month Consumption & Savings Trend</h3>
        <div className="h-64 mt-15 w-full bg-gray-900 rounded flex items-center justify-center text-gray-500 text-sm">
          <SixMonthTrend  company={company}/>
        </div>
      </section>
    </div>
  )
}

export default ReportChartPlaceholder
