import React from 'react'
import { useForm } from "react-hook-form";
import axios from "axios";
import { BASE_URL } from "../../../main";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CombineData = () => {

    const {
        handleSubmit,
        formState: { errors, isSubmitting },
      } = useForm();

      const token = localStorage.getItem("token");

      const onSubmit = async (data) => {
        console.log(data);
        try {
          const response = await axios.post(
            `${BASE_URL}/upload`,
            data,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("API Response:", response.data);
          toast.success("Form submitted successfully");
        } catch (error) {
          console.error("API Request Error:", error);
    
          if (error.response) {
            console.error("Server responded with:", error.response.data.error);
            const errorMessage = error.response.data.error || "An Error occured. Please try Again!";
            toast.error(errorMessage);
          } else if (error.request) {
            console.error("No response received:", error.request);
            toast.error("Server didn't respond. Please try again!");
          } else {
            console.error("Error setting up the request:", error.message);
            toast.error("Something went wrong :(");
          }
        }
    };


  return (
    <form 
    className="p-4 grid grid-cols-2 gap-4"
      onSubmit={handleSubmit(onSubmit)}>

      <div className="mb-2 col-span-2">
        <label className="block text-sm font-medium text-black">
          Select Month
        </label>
        <select
          className="mt-1 p-2 border rounded-md w-full"
        >
          <option value="" disabled>
            Select month
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
        {errors.selectedMonth && (
          <span className="text-red-500 text-xs">
            {errors.selectedMonth.message}
          </span>
        )}
      </div>

      <div className="my-4 col-span-2">
        <label htmlFor="file" className="block text-sm font-medium text-black">
          Choose file to upload
        </label>
        <input
          type="file"
          id="file"
          name="file"
          className="mt-1 p-2 border rounded-md w-full"
        />
        {errors.file && (
          <span className="text-red-500 text-xs">
            {errors.file.message}
          </span>
        )}
      </div>

      <button
        disabled={isSubmitting}
        className="col-span-2 h-10 bg-blue-500 text-white rounded-md uppercase hover:opacity-95 disabled:opacity-85 w-full"
      >
        {isSubmitting ? "Please Wait..." : "Submit"}
      </button>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />


    </form>
  )
}

export default CombineData
