import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";

const BankWiseData = () => {
  const [banks, setBanks] = useState([]);

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    // getValues,
  } = useForm();

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${BASE_URL}/get-bank`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setBanks(response.data.banks);
      })
      .catch((error) => {
        console.error("Error fetching banks:", error);
      });
  }, [token]);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      // making api call to submit form data
      const response = await axios.post(
        `${BASE_URL}/upload-bank-wise-data`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // handling api response
      console.log("API Response:", response.data);
      // success toast
      toast.success("Form submitted successfully");
    } catch (error) {
      //  api call error
      console.error("API Request Error:", error);

      if (error.response) {
        // if status code falls out of the range of 2xx
        console.error("Server responded with:", error.response.data);
        // error message from the response
        const errorMessage =
          error.response.data.message || "Error form submitting";
        // error toast showing the message
        // toast.error(errorMessage);
      } else if (error.request) {
        // if no response was received
        console.error("No response received:", error.request);
        // toast.error("Server didn't respond. Please try again!");
      } else {
        // something went wrong
        console.error("Error setting up the request:", error.message);
        // toast.error("Something went wrong :(");
      }
    }
  };

  return (
    <form className="p-4 "
    onSubmit={handleSubmit(onSubmit)}>
      <div className="">
        <label className="block text-sm font-medium text-gray-600">
          Select Month
        </label>
        <select>
          <option value="" disabled>
            Select City
          </option>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
      </div>

      <div className="row-span-1 col-span-1 mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Bank Name
        </label>
        <Select
          // {...register("", { required: "Bank is required" })}
          onChange={(selectedOption) => {
            setValue("bankName", selectedOption.value);
          }}
          options={banks.map((bank) => ({
            value: bank._id,
            label: bank.name,
          }))}
          // className={`mt-1 p-2 border rounded-md ${
          //   errors. ? "border-red-500" : ""
          // }`}
        />
        {/* {errors. && (
            <span className="text-red-500 text-xs">
              {errors..message}
            </span>
          )} */}
      </div>

      <div>
        <label htmlFor="file">Choose file to upload</label>
        <input type="file" id="file" name="file" />
      </div>

      <button disabled={isSubmitting}  className=' col-span-3 h-10  bg-blue-500 text-white  rounded-md uppercase hover:opacity-95 disabled:opacity-85 w-full'>
          {isSubmitting ? 'Please Wait...' : 'Submit'}
          </button>


    </form>
  );
};

export default BankWiseData;
