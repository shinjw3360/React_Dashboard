import React, { useEffect } from 'react';
import HeadTitle from './HeadTitle';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVolumeServices } from '../../redux/slices/apiSlice';
import { BarChart, Bar, Legend, ResponsiveContainer } from 'recharts';

const VolumeServices = () => {
  const state = useSelector((state) => state.apis.volumeServicesData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVolumeServices());
  }, [dispatch]);

  // console.log(state);
  const formatLegendValue = (name, obj) => {
    const initialValue = 0;
    const totalValue = state?.reduce((acc, cur) => {
      if (Object.keys(cur).includes(obj.dataKey)) {
        return acc + cur[obj.dataKey];
      } else {
        return acc;
      }
    }, initialValue);

    return (
      <span className="flex items-center gap-[5px]">
        <span>{name}</span>
        <span className="text-gary-300 font-medium">{totalValue}</span>
      </span>
    );
  };

  return (
    <div className="block-wrap lg:ml-0 lg:mt-0 sm:ml-[14px] sm:mt-[14px] lg:w-auto w-full sm:w-[calc(50%-7px)]">
      <HeadTitle title="Volume Services Level" />
      <div className="stacked-bar-chart w-full h-[250px] mb-5">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={state}
            margin={{
              top: 5,
              left: 0,
              bottom: 5,
            }}
          >
            <Legend
              iconType="circle"
              iconSize={10}
              formatter={formatLegendValue}
            />
            <Bar
              dataKey="volume"
              fill="#0095ff"
              radius={[0, 0, 4, 4]}
              barSize={16}
              stackId="a"
            />
            <Bar
              dataKey="services"
              fill="#00e096"
              radius={[4, 4, 0, 0]}
              barSize={16}
              stackId="a"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default VolumeServices;
