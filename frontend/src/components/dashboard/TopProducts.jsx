import React, { useEffect } from 'react';
import HeadTitle from './HeadTitle';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopProducts } from '../../redux/slices/apiSlice';

const TopProducts = () => {
  const state = useSelector((state) => state.apis.topProductsData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTopProducts());
  }, [dispatch]);

  // console.log(state);
  return (
    <div className="block-wrap w-full lg:w-auto sm:mt-[14px] lg:mt-0">
      <HeadTitle title="Top Products" />
      <div className="table-products">
        <table className="md:min-w-[500px] w-full">
          <thead>
            <tr>
              <th className="tbl-title">#</th>
              <th className="tbl-title">Name</th>
              <th className="tbl-title">Popularity</th>
              <th className="tbl-title hidden lg:table-cell">Sales</th>
            </tr>
          </thead>
          <tbody>
            {state?.map((item, idx) => (
              <tr key={idx}>
                <td className="tbl-data">{item.id}</td>
                <td className="tbl-data">{item.name}</td>
                <td className="tbl-data">
                  <div className="bg-[#c3d3e2] min-w-[180px] h-[5px] rounded-full overflow-hidden relative">
                    <div
                      className="bg-[#0095ff] left-0 top-0 rounded-full absolute h-full"
                      style={{ width: `${item.papularitypercent}%` }}
                    ></div>
                  </div>
                </td>
                <td className="tbl-data">{item.salespercent}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopProducts;
