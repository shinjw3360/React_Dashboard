import React, { useEffect } from 'react';
import HeadTitle from './HeadTitle';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomers } from '../../redux/slices/apiSlice';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const Customers = () => {
  const state = useSelector((state) => state.apis.customersData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const formatLegendValue = (value, name) => {
    const initialValue = 0;
    const totalValue = state?.reduce((acc, cur) => {
      if (Object.keys(cur).includes(name.dataKey)) {
        return acc + cur[name.dataKey];
      } else {
        return acc;
      }
    }, initialValue);
    return (
      <div className="custom-legend-item-text-group">
        <span className="custom-legend-item-text">
          {value.replace('_', '')}
        </span>
        <span className="custom-legend-item-text">{' ' + totalValue}</span>
      </div>
    );
  };

  return (
    <div className="block-wrap w-full mt-[14px] lg:mt-0">
      <HeadTitle title="Customer Satisfaction" />

      <div className="custom_chart_wrap area-chart w-full h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={730}
            height={250}
            data={state}
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Legend formatter={formatLegendValue} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="last_month"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
            <Area
              type="monotone"
              dataKey="this_month"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorPv)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Customers;
