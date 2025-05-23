import React from 'react';
import { Icons } from '../../assets/icons';
import { Images } from '../../assets/images';

const AppbarProfile = () => {
  return (
    <div className="appbar-profile ml-6 cursor-pointer">
      <div className="drop-info flex items-center gap-x-4">
        <div className="drop-info-img w-11 h-11 overflow-hidden rounded-full">
          <img
            src={Images.ProfileImage}
            alt=""
            className="w-full h-full object-center"
          />
        </div>
        <div className="drop-info-text flex flex-col min-w-20 mt-2 justify-center leading-4">
          <span className="font-semibold overflow-hidden">Marshall</span>
          <span className="text-sm text-gray-400">Admin</span>
        </div>
        <img
          src={Icons.ChevronDownDark}
          alt=""
          className="w-5 h-5 invert-[1]"
        />
      </div>
    </div>
  );
};

export default AppbarProfile;
