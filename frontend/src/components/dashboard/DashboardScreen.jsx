import React from 'react';
import Sales from './Sales';
import Visitors from './Visitors';
import Revenue from './Revenue';
import Customers from './Customers';
import TargetReality from './TargetReality';

const DashboardScreen = () => {
  return (
    <div className="contents-area lg:ml-[calc(20%+14px)] lg:w-[calc(80%-28px)] w-full mt-[14px]">
      <div className="area-row area-top lg:grid lg:grid-cols-[4fr_3fr] gap-[14px] mt-[14px]">
        <Sales />
        <Visitors />
      </div>
      <div className="area-row area-bottom lg:grid lg:grid-cols-[3fr_2fr_2fr] flex flex-wrap lg:gap-[14px] lg:mt-[14px]">
        <Revenue />
        <Customers />
        <TargetReality />
      </div>
    </div>
  );
};

export default DashboardScreen;
