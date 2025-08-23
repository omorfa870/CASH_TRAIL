import React, { useState, useEffect } from 'react'
import CustomPieChart from '../Charts/CustomPieChart'

const COLORS = ['#875CF5', '#FA2C37', '#FF6900', '#4f39f6'];

const RecentIncomeWithChart = ({ data, totalIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const dataArr = data?.map((item) => ({
      name: item?.source,
      amount: item?.amount,
    }));
    setChartData(dataArr);
  }, [data]);

  return (
    <div className='card'>
      <div className='flex item-center justify-between'>
        <h5 className='text-lg'>Last 60 days Income</h5>
      </div>

      <CustomPieChart
        data={chartData}
        label="Total Balance"
        totalAmount={`$${totalIncome}`}
        showTextAnchor
        colors={COLORS}
      />
    </div>
  );
};

export default RecentIncomeWithChart;
