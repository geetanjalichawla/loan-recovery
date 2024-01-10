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

// Styles
const styles = {
    fileUpload: {
      marginBottom: "20px",
    },
    label: {
      display: "block",
      marginBottom: "5px",
      color: "#333",
    },
    fileInput: {
      display: "none",
    },
    filePreview: {
      display: "inline-block",
      border: "1px solid #ccc",
      padding: "10px",
      marginTop: "5px",
    },
    previewImage: {
      maxWidth: "100%",
      maxHeight: "100px",
      display: "block",
      margin: "0 auto",
    },
  };

const validationSchema = z.object({
  name: z.string().min(2).max(50),
  mobile: z.string().min(10).max(10),
  alternativeMobile: z.string().optional(),
  email: z
    .string()
    .min(1, { message: "Email is Required." })
    .email("This is not a valid email."),
  panCard: z
    .string()
    .min(1, { message: "Pan Card is Required." })
    .min(8)
    .max(20),
  aadharCard: z
    .string()
    .min(1, { message: "Aadhar Card is Required." })
    .min(12)
    .max(20),
  addressLine1: z
    .string()
    .min(1, { message: "Address Line is Required." })
    .min(2)
    .max(100),
  addressLine2: z
    .string()
    .min(1, { message: "Address Line 2 is Required." })
    .max(100)
    .optional(),
  state: z.string().min(1, { message: "state is Required." }).min(2).max(50),
  city: z.string().min(1, { message: "city is Required." }).min(2).max(50),
  pincode: z
    .string()
    .min(1, { message: "pincode is Required." })
    .min(6, { message: "Enter a valid pincode." })
    .max(6, { message: "Enter a valid pincode." }),
  username: z
    .string()
    .min(1, { message: "username is Required." })
    .min(4)
    .max(20),
  password: z
    .string()
    .min(1, { message: "password is Required." })
    .min(8)
    .max(20),
  status: z
    .string()
});

const AddStaffForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        getValues,
        setValue,
      } = useForm({
        resolver: zodResolver(validationSchema),
      });

      const [formData, setFormData] = useState({});
      const [staffId, setStaffId] = useState("");

      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };

      // token related
      const token = localStorage.getItem("token");

      const [States, SetStates] = useState([]);
      const [Cities, SetCities] = useState([]);
      const [selectedState, setSelectedState] = useState("");

  useEffect(() => {
    const fetchStaffId = async () => {
      try {
        const response = await axios.get(
            `${BASE_URL}/office-stafId`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setStaffId(response.data.stafId);
        }
      } catch (error) {
        console.error("Error fetching Staff ID:", error.message);
      }
    };

    fetchStaffId();
  }, [token]);

  useEffect(() => {
    SetStates(Object.keys(citiesData));
  }, []);

  useEffect(() => {
    if (selectedState) {
      SetCities(citiesData[selectedState]);
    }
  }, [selectedState]);


  const onSubmit = async (data) => {
    try {
      // making api call to submit form data
      const response = await axios.post(`${BASE_URL}/create-staf`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // Make sure to set the content type
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
        const errorMessage = error.response.data.message || "Error form submitting";
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


  const value = getValues(); // check this if you want to use the values
  return (
    <>
      <form
        className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >


        {/* first row */}
        {/* name */}

        {/* Staff ID */}
        <div className="row-span-1 col-span-1 mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Staff Id
          </label>
          <input
            value={staffId}
            readOnly
            className="mt-1 p-2 w-full border rounded-md bg-gray-200"
          />
        </div>

        <div className="row-span-1 col-span-1 mb-4">
          <label className="block text-sm font-medium text-gray-600">
           Staff Name
          </label>
          <input
            onChange={handleChange}
            {...register("name", { required: "Name is required" })}
            className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
              errors.name ? "border-red-500" : ""
            }`}
          />
          {errors.name && (
            <span className="text-red-500 text-xs">{errors.name.message}</span>
          )}
        </div>

        {/* mobile */}

        <div className="row-span-1 col-span-1 mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Mobile 1
          </label>
          <input
            onChange={handleChange}
            {...register("mobile", { required: "Mobile is required" })}
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

        {/* Alternative Mobile */}

        <div className="row-span-1 col-span-1 mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Mobile 2
          </label>
          <input
            onChange={handleChange}
            {...register("alternativeMobile", {
              required: "Alternative Mobile is required",
            })}
            name="alternativeMobile"
            className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
              errors.alternativeMobile ? "border-red-500" : ""
            }`}
          />
          {errors.alternativeMobile && (
            <span className="text-red-500 text-xs">
              {errors.alternativeMobile.message}
            </span>
          )}
        </div>

        {/* second row */}
        {/* email */}

        <div className="row-span-1 col-span-1 mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Mail Id
          </label>
          <input
            onChange={handleChange}
            name="email"
            {...register("email", { required: "Email is required" })}
            className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <span className="text-red-500 text-xs">{errors.email.message}</span>
          )}
        </div>

        {/* PAN Card */}

        <div className="row-span-1 col-span-1 mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Pan Card No
          </label>
          <input
            onChange={handleChange}
            name="email"
            {...register("panCard", { required: "Pan Card is required" })}
            className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
              errors.panCard ? "border-red-500" : ""
            }`}
          />
          {errors.panCard && (
            <span className="text-red-500 text-xs">
              {errors.panCard.message}
            </span>
          )}
        </div>

        {/* Aadhar Card */}

        <div className="row-span-1 col-span-1 mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Aadhar Card No
          </label>
          <input
            onChange={handleChange}
            name="aadharCard"
            {...register("aadharCard", { required: "Aadhar Card is required" })}
            className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
              errors.aadharCard ? "border-red-500" : ""
            }`}
          />
          {errors.aadharCard && (
            <span className="text-red-500 text-xs">
              {errors.aadharCard.message}
            </span>
          )}
        </div>

        {/* third row */}

        {/* Address Line 1 */}

        <div className="row-span-1 col-span-1 mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Address Line 1
          </label>
          <input
            onChange={handleChange}
            name="addressLine1"
            {...register("addressLine1", { required: "Address is required" })}
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

        {/* Address Line 2 */}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Address Line 2
          </label>
          <input
            onChange={handleChange}
            name="addressLine1"
            {...register("addressLine2")}
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

        {/* fourth row */}
        {/* state */}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            State
          </label>
          <select
            {...register("state", { required: "State is required" })}
            onChange={(e) => {
              setValue("city", "");
              setValue("state", e.target.value);
              setSelectedState(e.target.value);
            }}
            className={`mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
              errors.State ? "border-red-500" : ""
            }`}
          >
            <option value="" disabled>
              Select State
            </option>
            {States.map((State) => (
              <option key={State} value={State}>
                {State}
              </option>
            ))}
          </select>
          {errors.State && (
            <span className="text-red-500 text-xs">{errors.State.message}</span>
          )}
        </div>

        {/* city */}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            City
          </label>
          <select
            {...register("city", { required: "City is required" })}
            className={`mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
              errors.city ? "border-red-500" : ""
            }`}
          >
            <option value="" disabled>
              Select City
            </option>
            {Cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors.city && (
            <span className="text-red-500 text-xs">{errors.City.message}</span>
          )}
        </div>

        {/* fifth row */}
        {/* Pincode */}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Pincode
          </label>
          <input
            onChange={handleChange}
            name="pincode"
            {...register("pincode", { required: "Pincode is required" })}
            className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
              errors.pincode ? "border-red-500" : ""
            }`}
          />
          {errors.pincode && (
            <span className="text-red-500 text-xs">
              {errors.pincode.message}
            </span>
          )}
        </div>

        {/* sixth row */}

        {/* username */}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Username
          </label>
          <input
            onChange={handleChange}
            name="pincode"
            {...register("username", { required: "Username is required" })}
            className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
              errors.username ? "border-red-500" : ""
            }`}
          />
          {errors.username && (
            <span className="text-red-500 text-xs">
              {errors.username.message}
            </span>
          )}
        </div>

        {/* password */}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            onChange={handleChange}
            {...register("password", { required: "Password is required" })}
            className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
              errors.password ? "border-red-500" : ""
            }`}
          />
          {errors.password && (
            <span className="text-red-500 text-xs">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Status
          </label>
          <input
            onChange={handleChange}
            {...register("status")}
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

        <div className="file-upload mb-4">
          <label className="block text-sm font-medium text-gray-600" htmlFor="photo">Upload Photo</label>
          <input
            type="file"
            id="photo"
            name="photo"
            {...register("photo", { required: "Photo is required" })}
          />
          {errors.photo && (
            <span className="text-red-500 text-xs">
              {errors.photo.message}
            </span>
          )}
        </div>
        <div className="file-upload mb-4">
          <label className="block text-sm font-medium text-gray-600" htmlFor="signature">Upload sign</label>
          <input
            type="file"
            id="signature"
            name="signature"
            {...register("signature", { required: "signature is required" })}
          />
          {errors.signature && (
            <span className="text-red-500 text-xs">
              {errors.signature.message}
            </span>
          )}
        </div>
        <div className="file-upload mb-4">
          <label className="block text-sm font-medium text-gray-600" htmlFor="aadhar">Upload Aadhar</label>
          <input
            type="file"
            id="aadhar"
            name="aadhar"
            {...register("aadhar", { required: "aadhar is required" })}
          />
          {errors.aadhar && (
            <span className="text-red-500 text-xs">
              {errors.aadhar.message}
            </span>
          )}
        </div>
        <div className="file-upload mb-4">
          <label className="block text-sm font-medium text-gray-600" htmlFor="pancard">Upload Pancard</label>
          <input
            type="file"
            id="pancard"
            name="pancard"
            {...register("pancard", { required: "pancard is required" })}
          />
          {errors.pancard && (
            <span className="text-red-500 text-xs">
              {errors.pancard.message}
            </span>
          )}
        </div>
        <div className="file-upload mb-4">
          <label className="block text-sm font-medium text-gray-600" htmlFor="cheque">Upload Cheque</label>
          <input
            type="file"
            id="cheque"
            name="cheque"
            {...register("cheque", { required: "cheque is required" })}
          />
          {errors.cheque && (
            <span className="text-red-500 text-xs">
              {errors.cheque.message}
            </span>
          )}
        </div>
        <div className="file-upload, mb-4">
            <label className="block text-sm font-medium text-gray-600" htmlFor="licence">Upload Driving</label>
            <input type="file" id="licence" name="licence"

            {...register("cheque", { required: "cheque is required" })}
            />
            {errors.cheque && (
            <span className="text-red-500 text-xs">
                {errors.cheque.message}
            </span>
            )}
        </div>

        <button disabled={isSubmitting}  className='w-full h-10 mt-36 bg-blue-500 text-white  rounded-md uppercase hover:opacity-95 disabled:opacity-85'>
          {isSubmitting ? 'Please Wait...' : 'Submit'}
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
export default AddStaffForm;