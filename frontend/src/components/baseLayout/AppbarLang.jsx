import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { COUNTRIES_API_URL } from '../../constants/apiUrls';
import { Icons } from '../../assets/icons';

const AppbarLang = () => {
  const DEFAULT_COUNTRY = 'South Korea';

  const [countries, setCountries] = useState([]);
  const [isDropListOpen, setIsDropListOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleDropListEnable = () => setIsDropListOpen(!isDropListOpen);

  const handleCountrySelected = (country, flag, lang) => {
    setSelectedCountry({ country, flag, lang });
    setIsDropListOpen(false);
  };

  const fetchCountriesData = async () => {
    try {
      const response = await axios.get(COUNTRIES_API_URL);
      setCountries(response.data);
      const defaultCountry = response.data.find(
        (country) => country.name.common === DEFAULT_COUNTRY
      );

      console.log(defaultCountry);

      if (defaultCountry) {
        let langKey = Object.keys(defaultCountry?.languages)[0];
        setSelectedCountry({
          country: defaultCountry.name.common,
          flag: defaultCountry.flags.png,
          lang: langKey,
        });
      }
    } catch (error) {
      console.log('Error Feching Data: ' + error);
    }
  };

  // console.log(countries);

  useEffect(() => {
    fetchCountriesData();
  }, []);

  return (
    <div className="relative w-30 h-10">
      <div
        className="drop-selected cursor-pointer px-1 py-3 flex items-center gap-3 w-full h-full"
        onClick={handleDropListEnable}
      >
        <div className="drop-selected-img w-6 h-6 overflow-hidden rounded-full">
          <img
            src={selectedCountry?.flag}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="drop-selected-text flex items-center gap-2">
          <span>{selectedCountry?.lang}</span>
          <img src={Icons.ChevronDownDark} alt="" className="invert-[1]" />
        </div>
      </div>
      <div
        className={`drop-lists absolute top-full w-full bg-gray-950 ${
          isDropListOpen ? '' : 'hidden'
        }`}
      >
        <div className="drop-list-wrapper max-h-52 overflow-y-scroll py-[6px] px-3">
          {countries?.length > 0 ? (
            countries.map((country) => {
              if (Object.keys(country?.languages)) {
                const langKey = Object.keys(country?.languages)[0];

                return (
                  <div
                    key={country.name.common}
                    className="drop-item flex items-center gap-3 py-1 px-0 hover:bg-gray-700 transition-all duration-200 cursor-pointer"
                    onClick={() =>
                      handleCountrySelected(
                        country?.name?.common,
                        country?.flags?.png,
                        langKey
                      )
                    }
                  >
                    <span className="drop-img w-4 h-4 overflow-hidden rounded-full">
                      <img
                        src={country?.flags?.png}
                        alt=""
                        className="w-full h-full object-center"
                      />
                    </span>
                    <span className="drop-text text-sm uppercase font-medium text-white">
                      {langKey}
                    </span>
                  </div>
                );
              }
            })
          ) : (
            <p>No Data Listed</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppbarLang;
