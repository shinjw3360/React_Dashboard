import React, { useEffect } from 'react';
import HeadTitle from './HeadTitle';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRevenue } from '../../redux/slices/apiSlice';
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const Revenue = () => {
  const state = useSelector((state) => state.apis.revenueData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRevenue());
  }, [dispatch]);

  return (
    <div className="block-wrap w-full mt-[14px] lg:mt-0">
      <HeadTitle title="Total Revenue" />
      <div className="bar-chart w-full h-[250px] mt-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={state}
            margin={{
              top: 5,
              right: 5,
              left: -20,
              bottom: 5,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 0"
              vertical={false}
              horizontal={true}
              stroke="#333"
            />
            <XAxis
              dataKey="day"
              tickSize={0}
              axisLine={false}
              tick={({ payload, x, y, dy }) => (
                <text
                  x={x}
                  y={y + 25}
                  dy={dy}
                  textAnchor="middle"
                  fill="#7b91b0"
                  fontSize={14}
                >
                  {payload.value}
                </text>
              )}
            />
            <YAxis
              tickCount={6}
              tickSize={0}
              tick={{
                fill: '#7b91b0',
                fontSize: 14,
              }}
              axisLine={false}
              tickFormatter={(value) => `${value}K`}
            />
            <Tooltip formatter={(value) => `${value} Sales`} cursor={false} />
            <Legend iconType="circle" iconSize={10} />
            <Bar
              dataKey="online"
              fill="#8884d8"
              activeBar={false}
              isAnimationActive={false}
              radius={[4, 4, 0, 0]}
              barSize={18}
            />
            <Bar
              dataKey="online"
              fill="#00e096"
              activeBar={false}
              isAnimationActive={false}
              radius={[4, 4, 0, 0]}
              barSize={18}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Revenue;
