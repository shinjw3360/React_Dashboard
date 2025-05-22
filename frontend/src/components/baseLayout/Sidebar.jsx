import React, { useState } from 'react';
import { Icons } from '../../assets/icons';
import { MdOutlineClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { setSidebarClose } from '../../redux/slices/sidebarSlice';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { MENU_LISTS, routes } from '../../constants/menuLists';

const Sidebar = () => {
  const isSidebarOpen = useSelector((state) => state.sidebar.isSidebarOpen);
  const dispatch = useDispatch();

  const [currentMenu, setCurrentMenu] = useState(0);

  const selectMenuHandler = (idx) => {
    setCurrentMenu(idx);
  };

  return (
    <div
      className={`sidebar-wrapper bg-gray-950 py-5 px-4 shadow-[0_0.125rem_0.25rem_rgba(255,255,255,0.3)] lg:w-[20%] md:w-[30%] w-[50%] h-full flex flex-col rounded-sm z-[999] fixed lg:left-0 ${
        isSidebarOpen ? 'left-0' : 'left-[-100%]'
      }`}
    >
      <div className="sidebar-top mb-[32px] flex items-center justify-between">
        <div className="sidebar-brand flex items-center justify-center gap-x-[12px]">
          <span className="brand-logo bg-blue-700 rounded-md w-8 h-8 flex place-content-center">
            <img src={Icons.LogoWhite} alt="logo" className="w-5" />
          </span>
          <span>Marshall</span>
        </div>
        <button
          className="sidebar-close text-black p-[0.125rem] rounded-sm bg-white cursor-pointer hover:bg-gray-300 lg:hidden"
          onClick={() => dispatch(setSidebarClose())}
        >
          <MdOutlineClose />
        </button>
      </div>

      <div className="sidebar-body flex w-full mt-[8rem]">
        <BrowserRouter>
          <Routes>
            {routes.map((route, idx) => (
              <Route key={idx} path={route.path} element={route.element} />
            ))}
          </Routes>
          <div className="sidebar-menu w-full">
            <ul className="menu-lists flex flex-col gap-y-1.5">
              {MENU_LISTS.map((menu, idx) => (
                <li key={idx}>
                  <Link
                    to={menu.path}
                    className={`flex items-center py-0.5 px-5 font-medium gap-x-[14px] h-[44px] ${
                      currentMenu === idx
                        ? 'bg-blue-700 text-white rounded-sm'
                        : ''
                    }`}
                    onClick={() => selectMenuHandler(idx)}
                  >
                    <span
                      className={`w-5 ${
                        currentMenu === idx
                          ? 'invert-[1] brightness-[100%]'
                          : ''
                      }`}
                    >
                      <img src={menu.icon} alt={menu.alt} />
                    </span>
                    <span>{menu.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default Sidebar;
