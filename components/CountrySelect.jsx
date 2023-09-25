'use client';

import React from 'react';
import Select from 'react-select';
import useCountries from '../hooks/useCountries';
import { useDispatch } from 'react-redux';
import { setCountry, setSelectedCountryMapCoordinates } from '../redux/stepper/detailsSlice';

const CountrySelect = ({ value, onChange }) => {
  const { getAll, getByValue } = useCountries();
  const dispatch = useDispatch();  

  const handleCountryChange = (selectedOption) => {
    const selectedCountry = selectedOption.value;
    const selectedCountryData = getByValue(selectedCountry);
    const selectedCountryCoordinates = selectedCountryData?.latlng;
    onChange(selectedOption);

    dispatch(setCountry(selectedOption));
    dispatch(setSelectedCountryMapCoordinates(selectedCountryCoordinates));

  };

  return (
    <div className='mb-5'>
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={handleCountryChange}
        formatOptionLabel={(option) => (
          <div className='flex flex-row items-center gap-3'>
            <div>{option.flag}</div>
            <div>
              {option.label},
              <span className='text-neutral-500 ml-1'>{option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => 'p-3 border-2 border-gray-200 font-light text-red-200',
          input: () => 'text-lg font-light ',
          option: () => 'text-lg font-light',
        }}
      />
    </div>
  );
};

export default CountrySelect;
