import React, { useEffect } from 'react';
import HeadTitle from './HeadTitle';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVisitors } from '../../redux/slices/apiSlice';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const formatTooltipValue = (name, value) => {
  return `${name.replace('_', ' ')} : ${value}`;
};

const CustomTooltip = ({ payload }) => {
  // console.log(payload);
  if (!payload || !payload.length) return null;

  return (
    <div className="custom-recharts-tooltip">
      <p className="recharts-tooltip-label">{payload[0].payload.month}</p>
      <ul className="recharts-tooltip-item-list">
        {payload.map((item, idx) => (
          <li key={idx}>{formatTooltipValue(item.name, item.value)}</li>
        ))}
      </ul>
    </div>
  );
};

const Visitors = () => {
  const state = useSelector((state) => state.apis.visitorsData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVisitors());
  }, [dispatch]);

  // console.log(state);

  // todo: 그래프 랜더링 자연스럽게 하기
  return (
    <div className="block-wrap w-full mt-[14px] lg:mt-0">
      <HeadTitle title="Visitors Insights" />
      <div className="line-chart w-full h-[230px]">
        {state !== null && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={state}
              margin={{
                top: 10,
                right: 5,
                left: -20,
                bottom: 0,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 0"
                vertical={false}
                horizontal={true}
                stroke="#333"
              />
              <XAxis
                dataKey="month"
                tickSize={0}
                axisLine={false}
                padding={{ left: 0 }}
                tick={({ payload, x, y, dy }) => (
                  <text
                    x={x}
                    y={y}
                    dy={dy}
                    fontSize={14}
                    fill="#777"
                    textAnchor="middle"
                  >
                    {payload.value}
                  </text>
                )}
              />
              <YAxis
                tickSize={0}
                axisLine={false}
                ticks={[0, 100, 200, 300, 400]}
                tick={{
                  fill: '#777',
                  fontSize: 14,
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                iconType="square"
                formatter={(value) => value.replace('_', ' ')}
              />
              <Line
                dot={false}
                type="basis"
                dataKey="loyal_customer"
                stroke="#8884d8"
                strokeWidth={2}
              />
              <Line
                dot={false}
                type="basis"
                dataKey="new_customer"
                stroke="#a700ff"
                strokeWidth={2}
              />
              <Line
                dot={false}
                type="basis"
                dataKey="unique_customer"
                stroke="#3cd856"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default Visitors;
