import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import citiesData from "../../../Data/stateCityData (1).json";
import { BASE_URL } from "../../../main";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const schema = z.object({
  agentName: z.string().min(1,"agent name is required"),
  fatherName: z.string().min(1,"father name is required"),
  mobile: z.string().min(1,"mobile is required"),
  addressLine1: z.string().min(1,"addressLine1 is required"),
  addressLine2: z.string().min(1,"addressLine2 is required"),
  validFrom: z.string().min(1,"validFrom is required"),
  validTo: z.string().min(1,"validTo is required"),
  status: z.string().min(1,"status is required"),
  qrCode: z.string().optional(),
//   photo: z.any(),
//   signature: z.any(),
});
const RepoAgentIdCard = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    // getValues,
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
  });

  console.log(errors)
  // token related
  const token = localStorage.getItem("token");

  const onSubmit = async (data) => {
    console.log(data);
    try {
      // making api call to submit form data
      const response = await axios.post(`${BASE_URL}/create-repo-agent`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
        toast.error(errorMessage);
      } else if (error.request) {
        // if no response was received
        console.error("No response received:", error.request);
        toast.error("Server didn't respond. Please try again!");
      } else {
        // something went wrong
        console.error("Error setting up the request:", error.message);
        toast.error("Something went wrong :(");
      }
    }
  };

  const [genQr, setGenQr] = useState(false)
  const onGenerateQr = async () => {
    setGenQr(true);
    axios.get(`${BASE_URL}/generate-qr/IC0003`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response)=> {   console.log(response);
        setGenQr(false)
    }
    );
  };
  // const value = getValues(); // check this if you want to use the values
  return (
    <>
      <form
        className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Id</label>
          <input
            type="id"
            value={"1002"}
            disabled
            className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 `}          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Agent Name
          </label>
          <input
            type="agentName"
            {...register("agentName", { required: "agentName is required" })}
            className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
              errors.agentName ? "border-red-500" : ""
            }`}
          />
          {errors.agentName && (
            <span className="text-red-500 text-xs">
              {errors.agentName.message}
            </span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Father Name
          </label>
          <input
            type="fatherName"
            {...register("fatherName", { required: "fatherName is required" })}
            className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
              errors.fatherName ? "border-red-500" : ""
            }`}
          />
          {errors.fatherName && (
            <span className="text-red-500 text-xs">
              {errors.fatherName.message}
            </span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Mobile Number
          </label>
          <input
            type="tel"
            {...register("mobile", { required: "mobile number is required" })}
            className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
              errors.mobile ? "border-red-500" : ""
            }`}
          />
          {errors.mobile && (
            <span className="text-red-500 text-xs">
              {errors.mobile.message}
            </span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            addressLine1
          </label>
          <input
            type="text"
            {...register("addressLine1", {
              required: "addressLine1 is required",
            })}
            className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
              errors.addressLine1 ? "border-red-500" : ""
            }`}
          />
          {errors.addressLine1 && (
            <span className="text-red-500 text-xs">
              {errors.addressLine1.message}
            </span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            addressLine2
          </label>
          <input
            type="text"
            {...register("addressLine2", {
              required: "addressLine2 is required",
            })}
            className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
              errors.addressLine2 ? "border-red-500" : ""
            }`}
          />
          {errors.addressLine2 && (
            <span className="text-red-500 text-xs">
              {errors.addressLine2.message}
            </span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            validFrom
          </label>
          <input
            type="date"
            {...register("validFrom", { required: "validFrom is required" })}
            className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
              errors.validFrom ? "border-red-500" : ""
            }`}
          />
          {errors.validFrom && (
            <span className="text-red-500 text-xs">
              {errors.validFrom.message}
            </span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            validTo
          </label>
          <input
            type="date"
            {...register("validTo", { required: "validTo is required" })}
            className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
              errors.validTo ? "border-red-500" : ""
            }`}
          />
          {errors.validTo && (
            <span className="text-red-500 text-xs">
              {errors.validTo.message}
            </span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            status
          </label>
          <input
            type="text"
            {...register("status", { required: "status is required" })}
            className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
              errors.status ? "border-red-500" : ""
            }`}
          />
          {errors.status && (
            <span className="text-red-500 text-xs">
              {errors.status.message}
            </span>
          )}
        </div>

        <div className="p-4">
          <button  type="button" className="h-10  bg-blue-500 text-white  rounded-md uppercase hover:opacity-95 disabled:opacity-85 w-full" onClick={onGenerateQr}> 
{          genQr?"Genrating Qr": "Gentrate Qr"

}          </button>
          <img
            className="w-full aspect-square bg-black border border-black "
            src={
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKQAAACkCAYAAAAZtYVBAAAAAklEQVR4AewaftIAAAYVSURBVO3BQQ4kuRHAQFLo/3+Znpt1ElCo7lmtnRH2B2NcYjHGRRZjXGQxxkUWY1xkMcZFFmNcZDHGRRZjXGQxxkUWY1xkMcZFFmNcZDHGRRZjXGQxxkU+vKTyN1XsVJ6oOFH5poqdyjdVnKj8TRVvLMa4yGKMiyzGuMiHL6v4JpWTihOVncquYlfxhMqu4qTiCZVvqvgmlW9ajHGRxRgXWYxxkQ8/pvJExRMqu4qTihOVXcVJxU5lV/GEyknFN6k8UfFLizEushjjIosxLvLhX65ip/KEyq7ijYpvqtipnFT8my3GuMhijIssxrjIh/8xFTuVncqJyq5ip7Kr2KnsKnYqu4rxX4sxLrIY4yKLMS7y4ccqfkllV3FSsVM5UXlD5Q2Vk4o3Km6yGOMiizEushjjIh++TOXfrGKnsqvYqewqdiq7ip3KrmKnsqvYqewqTlRuthjjIosxLrIY4yIfXqr4J1XsVN5Q2VXsVJ6o2KmcqHxTxb/JYoyLLMa4yGKMi9gfvKCyq9ip7CqeUDmpOFH5poonVHYVO5VdxYnKScWJyq7iRGVXsVPZVbyxGOMiizEushjjIvYHX6Syq9ip7Cq+SWVXsVPZVexUTipOVJ6oOFE5qdipfFPFTmVX8U2LMS6yGOMiizEuYn/wgsqu4kTlpGKnsqvYqewqfknlpOJE5Zcqdiq7ihOVNyreWIxxkcUYF1mMcZEPL1WcqOwqnqg4qdipPFGxU9lVPKGyq3iiYqfyTSq7ipOKncovLca4yGKMiyzGuMiHL1M5UXmj4qRip/JLFTuVJyp2Kk9U7FROKnYqu4p/0mKMiyzGuMhijIvYH/yQyhsVO5UnKk5UdhU3U/mlihOVk4o3FmNcZDHGRRZjXOTDSyq7ipOKJ1R2FTuVE5WTihOVk4onVHYVO5WTip3KGxU7lV3FrmKn8k2LMS6yGOMiizEuYn/wgsqu4kTlpOJE5aRip7Kr2KmcVDyhsqv4JpVdxYnKruJE5aTilxZjXGQxxkUWY1zkw0sVO5UnKk5U/qaKncpJxa5ip/I3qZyo7Cp2FScqu4pvWoxxkcUYF1mMcRH7gxdUTipOVE4qTlROKk5Uvqlip3JS8YTKScWJyhMVJyq7ijcWY1xkMcZFFmNc5MOXVXyTyq7ilyp2KruKncpO5aTiROWJihOVXcWJyk5lV/FLizEushjjIosxLvLhx1R2FScVJypvqOwqnlDZVZyoPFGxU9lVvKGyqzip2Kn80mKMiyzGuMhijIvYH3yRyknFTuWJip3KrmKnsqt4QuX/ScUTKruKNxZjXGQxxkUWY1zkw49VnFTsVHYVJxUnFW9UnKjsKnYqu4qdyq7iCZWTip3KrmKnsqv4mxZjXGQxxkUWY1zkw0sqJypvqOwqTlROKnYqu4pvqnhC5ZtUdhU3W4xxkcUYF1mMcZEPL1WcqJxUvKGyq9ipfJPKGyonFScqT1TsVHYVb1R802KMiyzGuMhijIvYH7ygclKxU3mj4kTlpOJE5aRip3JScaJyk4onVHYVbyzGuMhijIssxrjIh5cqnqj4JpWTihOVXcVO5Q2VXcVJxYnKScUTKk+o/NJijIssxrjIYoyLfHhJ5W+qOKk4UXlD5aTiRGVXsVM5qdipnKjsKk5UTip+aTHGRRZjXGQxxkU+fFnFN6mcVOxU/kkqu4onKr6p4omKJ1R2FW8sxrjIYoyLLMa4yIcfU3mi4psqdionKk9U7FROKnYqT1ScqLyhsqvYqfzSYoyLLMa4yGKMi3z4H1OxU9lV7FROKp6oeKLiCZWTip3KScVO5aTilxZjXGQxxkUWY1zkw7+cyknFScWJyknFEyq7ip3KScVOZafySyonFW8sxrjIYoyLLMa4yIcfq/ilip3KTmVXsVPZVZxUnKjsKnYVJxXfVPFNFb+0GOMiizEushjjIh++TOVvUtlV7FSeUDlROak4UTmp2Kk8UXGiclKxU9lV7FR2FW8sxrjIYoyLLMa4iP3BGJdYjHGRxRgXWYxxkcUYF1mMcZHFGBdZjHGRxRgXWYxxkcUYF1mMcZHFGBdZjHGRxRgXWYxxkf8ABxj/OjpOvBkAAAAASUVORK5CYII="
            }
          />
        </div>
        <div className="p-4">
          <input
            type="file"
            {...register("photo", { required: "photo is required" })}
            className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
              errors.status ? "border-red-500" : ""
            }`}
          />
          {errors.photo && (
            <span className="text-red-500 text-xs">{errors.photo.message}</span>
          )}

          <img
            className="w-full aspect-square bg-white border border-black "
            src={
              "data:image/png;base64,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"
            }
          />
        </div>
        <button
          disabled={isSubmitting}
          type="submit"
          className=" col-span-3 h-10 btn bg-blue-500 text-white  rounded-md uppercase hover:opacity-95 disabled:opacity-85 w-full"
        >
          {isSubmitting ? "Please Wait..." : "Submit"}
        </button>
      </form>
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
    </>
  );
};
export default RepoAgentIdCard;
