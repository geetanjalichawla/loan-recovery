import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { BASE_URL } from '../../../main';

const SearchComponent = () => {
  const [searchParams, setSearchParams] = useState({
    lastDigit: '',
    agreementNo: '',
    engineNo: '',
    chasisNo: '',
  });
  console.log(searchParams)
   const [data, setData] = useState([])

  const debouncedSearch = _.debounce(() => {
    const params = Object.entries(searchParams)
    .filter(([_, value]) => value !== '') // Filter out empty values
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

    const url = `${BASE_URL}/search-details?${params}`;
    // Perform the fetch request here
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Process the data as needed
        console.log(data);
        setData(data.data)
      })
      .catch(error => console.error('Error:', error));
  }, 1000); // Adjust the debounce time as needed (in milliseconds)

  useEffect(() => {
    debouncedSearch()
  }, [searchParams,debouncedSearch])
  
  const handleInputChange = (param, value) => {
    setSearchParams((prevParams) => ({
        ...prevParams,
        lastDigit: param === 'lastDigit' ? value : '',
        agreementNo: param === 'agreementNo' ? value : '',
        engineNo: param === 'engineNo' ? value : '',
        chasisNo: param === 'chasisNo' ? value : '',
      }));
  };
  const onSubmit = (e)=>{
    e.preventDefault();

debouncedSearch();
  }


  const [selectedLoan, setLoan] = useState({})

  return (
    <div className='p-4'>

    <form className=" grid grid-cols-4 gap-2" 
    onSubmit={onSubmit}
    >
      <input
        className="mb-2 p-2 border rounded"
        type="text"
        placeholder="Last Digit"
        value={searchParams.lastDigit}
        onChange={e => handleInputChange('lastDigit', e.target.value)}
      />
      <input
        className="mb-2 p-2 border rounded"
        type="text"
        placeholder="Agreement No"
        value={searchParams.agreementNo}
        onChange={e => handleInputChange('agreementNo', e.target.value)}
      />
      <input
        className="mb-2 p-2 border rounded"
        type="text"
        placeholder="Engine No"
        value={searchParams.engineNo}
        onChange={e => handleInputChange('engineNo', e.target.value)}
      />
      <input
        className="mb-2 p-2 border rounded"
        type="text"
        placeholder="Chasis No"
        value={searchParams.chasisNo}
        onChange={e => handleInputChange('chasisNo', e.target.value)}
      />
      <button
        className="bg-teal-500 text-white p-2 rounded hover:bg-teal-600 none hidden"
        type='submit'
      >
        Search
      </button>
    </form>

    <div className='w-full grid grid-cols-1 md:grid-cols-3'>
        <div className='flex flex-wrap justify-evenly gap-2'>
        {
            data.map((data,key)=>(<span key={key} 
                onClick={()=>setLoan(data)}
            className="text-gray-100 bg-gray-800 font-medium h-10 px-3 py-1 rounded cursor-pointer">
            {data.regNo}
        </span>))
        }

        </div>
        <div className='grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 col-span-1 md:col-span-2 gap-2'>
  {/* Display selected loan details in disabled input fields */}
  {selectedLoan && (
    <>
      <div className="mb-2">
        <label className="font-medium text-gray-600">Agreement No</label>
        <input type='text' value={selectedLoan.agreementNo} disabled />
      </div>

      <div className="mb-2">
        <label className="font-medium text-gray-600">Bank Name</label>
        <input type='text' value={selectedLoan.bankName} disabled />
      </div>

      <div className="mb-2">
        <label className="font-medium text-gray-600">Branch</label>
        <input type='text' value={selectedLoan.branch} disabled />
      </div>

      <div className="mb-2">
        <label className="font-medium text-gray-600">Call Center No 1</label>
        <input type='text' value={selectedLoan.callCenterNo1} disabled />
      </div>

      <div className="mb-2">
        <label className="font-medium text-gray-600">Call Center No 1 Name</label>
        <input type='text' value={selectedLoan.callCenterNo1Name} disabled />
      </div>

      <div className="mb-2">
        <label className="font-medium text-gray-600">Call Center No 2</label>
        <input type='text' value={selectedLoan.callCenterNo2} disabled />
      </div>

      <div className="mb-2">
        <label className="font-medium text-gray-600">Call Center No 2 Name</label>
        <input type='text' value={selectedLoan.callCenterNo2Name} disabled />
      </div>

      <div className="mb-2">
        <label className="font-medium text-gray-600">Chasis No</label>
        <input type='text' value={selectedLoan.chasisNo} disabled />
      </div>

      <div className="mb-2">
        <label className="font-medium text-gray-600">Created At</label>
        <input type='text' value={selectedLoan.createdAt} disabled />
      </div>

      <div className="mb-2">
        <label className="font-medium text-gray-600">Customer Name</label>
        <input type='text' value={selectedLoan.customerName} disabled />
      </div>

      <div className="mb-2">
        <label className="font-medium text-gray-600">Engine No</label>
        <input type='text' value={selectedLoan.engineNo} disabled />
      </div>

      <div className="mb-2">
        <label className="font-medium text-gray-600">File Name</label>
        <input type='text' value={selectedLoan.fileName} disabled />
      </div>

      <div className="mb-2">
        <label className="font-medium text-gray-600">Last Digit</label>
        <input type='text' value={selectedLoan.lastDigit} disabled />
      </div>

      <div className="mb-2">
        <label className="font-medium text-gray-600">Load Status</label>
        <input type='text' value={selectedLoan.loadStatus} disabled />
      </div>

      <div className="mb-2">
        <label className="font-medium text-gray-600">Month</label>
        <input type='text' value={selectedLoan.month} disabled />
      </div>

      <div className="mb-2">
        <label className="font-medium text-gray-600">Registration No</label>
        <input type='text' value={selectedLoan.regNo} disabled />
      </div>

      <div className="mb-2">
        <label className="font-medium text-gray-600">Status</label>
        <input type='text' value={selectedLoan.status} disabled />
      </div>
    </>
  )}
</div>

    </div>
    </div>
  );
};

export default SearchComponent;
