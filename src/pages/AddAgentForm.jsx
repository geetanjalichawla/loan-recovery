import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import citiesData from "../Data/stateCityData (1).json";
import { BASE_URL } from "../main";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const validationSchema = z.object({
  name: z.string().min(2).max(50),
mobile: z.string(),
alternativeMobile: z.string().optional(),
email: z
  .string()
  .min(1, { message: "Email is Required." })
  .email("This is not a valid email."),
panCard: z.string()
  .min(1, { message: "Pan Card is Required." })
  .min(8)
  .max(20),
aadharCard: z.string()
  .min(1, { message: "Aadhar Card is Required." })
  .min(12)
  .max(20),
addressLine1: z.string()
  .min(1, { message: "Address Line is Required." })
  .min(2)
  .max(100),
addressLine2: z.string()
  .min(1, { message: "Address Line 2 is Required." })
  .max(100)
  .optional(),
state: z.string()
  .min(1, { message: "state is Required." })
  .min(2)
  .max(50),
city: z.string()
  .min(1, { message: "city is Required." })
  .min(2)
  .max(50),
pincode: z.string()
  .min(1, { message: "pincode is Required." })
  .min(6, { message: "Enter a valid pincode." })
  .max(6, { message: "Enter a valid pincode." }),
username: z.string()
  .min(1, { message: "username is Required." })
  .min(4)
  .max(20),
password: z.string()
  .min(1, { message: "password is Required." })
  .min(8)
  .max(20),
zoneId: z.string(),
stateId: z.string(),
cityId: z.string(),
});
  
  const AddAgentForm = () => {
    const {
      register,
      handleSubmit,
      formState: { errors },
      getValues,
      setValue,
    } = useForm({
      resolver: zodResolver(validationSchema),
    });
  
    const [zones, setZones] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    };


    

    // token related
    const token = localStorage.getItem('token');

    const [States, SetStates] = useState([]);
  const [Cities, SetCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");

  useEffect(() => {
    SetStates(Object.keys(citiesData));
  }, []);

  useEffect(() => {
    if (selectedState) {
      SetCities(citiesData[selectedState]);
    }
  }, [selectedState]);


    useEffect(() => {
      axios
        .get(`${BASE_URL}/zones`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setZones(response.data.zones);
        })
        .catch((error) => {
          console.error("Error fetching zones:", error);
        });
    }, []);
  
    const fetchStates = (zoneId) => {
      axios
        .get(`${BASE_URL}/get-state-by-zone/${zoneId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setStates(response.data.states);
        })
        .catch((error) => {
          console.error("Error fetching states:", error);
        });
    };
  
    const fetchCities = (stateId) => {
      axios
        .get(`${BASE_URL}/get-city-by-state/${stateId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setCities(response.data.cities);
        })
        .catch((error) => {
          console.error("Error fetching cities:", error);
        });
    };
  
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
        console.log('API Response:', response.data);
        // success toast
      toast.success('Form submitted successfully');
        
      }

      catch (error) {
        //  api call error
        console.error('API Request Error:', error);
        // error toast
      toast.error('Error submitting form');
       
      }
    };


const value  =getValues();// check this if you want to use the values 
    return(

    // <form onSubmit={handleSubmit(onSubmit)}>
    //    <Card className="w-full p-4">
        //  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        // <div className="" > 
         <div className="grid">

{/* <form className="mx-auto max-w-2xl" onSubmit={handleSubmit(onSubmit)}> */}
<form className=" bg-gray-500 rounded-md shadow-md p-4" onSubmit={handleSubmit(onSubmit)}>
      {/* <div className="bg-white rounded-md shadow-md p-4"> */}
        {/* // */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* <div className="col-span-1"> */}

            {/* zones */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Zone</label>
              {/* */}

<Select
    {...register("zoneId", { required: "Zone is required" })}
    onChange={(selectedOption) => {
      setValue("stateId", "");
      setValue("cityId", "");
      setValue("zoneId", selectedOption.value);
      fetchStates(selectedOption.value);
    }}
    options={zones.map((zone) => ({

      value: zone._id,
      label: zone.name
    }))}
    className={`mt-1 p-2 border rounded-md ${
      errors.zoneId ? "border-red-500" : ""
    }`}
  />

              {errors.zoneId && <span className="text-red-500 text-xs">{errors.zoneId.message}</span>}
            </div>
            {/* </div> */}
            {/* // */}

            {/* <div className="col-span-1"> */}
            {/* states */}

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">State</label>
              {/**/}

<Select
    {...register("stateId", { required: "State is required" })}
    onChange={(selectedOption) => {
      setValue("cityId", "");
      setValue("stateId", selectedOption.value);
      fetchCities(selectedOption.value);
    }}
    options={states.map((state) => ({
      value: state._id,
      label: state.name
    }))}
    className={`mt-1 p-2 border rounded-md ${
      errors.stateId ? "border-red-500" : ""
    }`}
  />
              {errors.stateId && <span className="text-red-500 text-xs">{errors.stateId.message}</span>}
            </div>
            {/* </div> */}
            {/* // */}
            {/* <div className="col-span-1"> */}

            {/* cities */}

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">City</label>
              {/**/}

<Select
    {...register("cityId", { required: "City is required" })}
    onChange={(selectedOption)=>{
      setValue("cityId", selectedOption.value);

    }}
    options={cities.map((city) => ({
      value: city._id,
      label: city.name
    }))}
    className={`mt-1 p-2 border rounded-md ${
      errors.cityId ? "border-red-500" : ""
    }`}
  />
              {errors.cityId && <span className="text-red-500 text-xs">{errors.cityId.message}</span>}
            </div>    
            {/* </div>     */}


          {/* first row */}
          {/* name */}

          {/* <div className="col-span-1"> */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Name</label>
              <input onChange={handleChange}
                {...register("name", { required: "Name is required" })}
                className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                  errors.name ? "border-red-500" : ""
                }`}
                />
              {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
            </div>
          {/* </div> */}

          {/* mobile */}


          <div className="col-span-1">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Mobile</label>
              <input onChange={handleChange}
                {...register("mobile", { required: "Mobile is required" })}
                className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                  errors.mobile ? "border-red-500" : ""
                }`}
                />
              {errors.mobile && <span className="text-red-500 text-xs">{errors.mobile.message}</span>}
            </div>
          </div>

          {/* Alternative Mobile */}

          <div className="col-span-1">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Alternative Mobile</label>
              <input onChange={handleChange}
                {...register("alternativeMobile", { required: "Alternative Mobile is required" })}
                name="alternativeMobile"
                className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                  errors.alternativeMobile ? "border-red-500" : ""
                }`}
                />
              {errors.alternativeMobile && <span className="text-red-500 text-xs">{errors.alternativeMobile.message}</span>}
            </div>
          </div>

          {/* second row */}
          {/* email */}

          <div className="col-span-1">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Email</label>
              <input onChange={handleChange}
                              name="email"
                              {...register("email", { required: "Email is required" })}
                              className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                                errors.email ? "border-red-500" : ""
                              }`}
                              />
              {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
            </div>
          </div>

                {/* PAN Card */}

                <div className="col-span-1">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Pan Card</label>
              <input onChange={handleChange}
                name="email"
                {...register("panCard", { required: "Pan Card is required" })}
                className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                  errors.panCard ? "border-red-500" : ""
                }`}
                />
              {errors.panCard && <span className="text-red-500 text-xs">{errors.panCard.message}</span>}
            </div>
          </div>

          {/* Aadhar Card */}

          <div className="col-span-1">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Aadhar Card</label>
              <input onChange={handleChange}
                    name="aadharCard"
                {...register("aadharCard", { required: "Aadhar Card is required" })}
                className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                  errors.aadharCard ? "border-red-500" : ""
                }`}
              />
              {errors.aadharCard && <span className="text-red-500 text-xs">{errors.aadharCard.message}</span>}
            </div>
          </div>
                </div>

          {/* third row */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">

          {/* Address Line 1 */}

          {/* <div className="col-span-1"> */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Address Line 1</label>
              <input onChange={handleChange}
                name="addressLine1"
                {...register("addressLine1", { required: "Address is required" })}
                className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                  errors.addressLine1 ? "border-red-500" : ""
                }`}
              />
              {errors.addressLine1 && <span className="text-red-500 text-xs">{errors.addressLine1.message}</span>}
            </div>
          {/* </div> */}

          {/* Address Line 2 */}

          {/* <div className="col-span-1"> */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Address Line 2</label>
              <input onChange={handleChange}
                name="addressLine1"
                {...register("addressLine2")}

                className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                  errors.addressLine2 ? "border-red-500" : ""
                }`}
              />
              {errors.addressLine2 && <span className="text-red-500 text-xs">{errors.addressLine2.message}</span>}
            </div>
          {/* </div> */}
          </div>

          {/* fourth row */}
          {/* state */}

          {/* */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
{/* <div className="col-span-1"> */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">State</label>
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
            <option value="" disabled>Select State</option>
            {States.map((State) => (
              <option key={State} value={State}>
                {State}
              </option>
            ))}
          </select>
          {errors.State && <span className="text-red-500 text-xs">{errors.State.message}</span>}
        </div>
      {/* </div> */}

          {/* city */}
          {/**/}

{/* <div className="col-span-1"> */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">City</label>
          <select
            {...register("city", { required: "City is required" })}
            className={`mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
              errors.city ? "border-red-500" : ""
            }`}
          >
            <option value="" disabled>Select City</option>
            {Cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors.city && <span className="text-red-500 text-xs">{errors.City.message}</span>}
        </div>
      {/* </div> */}

          {/* fifth row */}
          {/* Pincode */}

          {/* <div className="col-span-1"> */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Pincode</label>
              <input onChange={handleChange}
                name="pincode"
                {...register("pincode", { required: "Pincode is required" })}
                className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                  errors.pincode ? "border-red-500" : ""
                }`}
              />
              {errors.pincode && <span className="text-red-500 text-xs">{errors.pincode.message}</span>}
            </div>
          {/* </div> */}
          </div>


          {/* sixth row */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">

          {/* username */}

          {/* <div className="col-span-1"> */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Username</label>
              <input onChange={handleChange}
                              name="pincode"

                {...register("username", { required: "Username is required" })}
                className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                  errors.username ? "border-red-500" : ""
                }`}
              />
              {errors.username && <span className="text-red-500 text-xs">{errors.username.message}</span>}
            </div>
          {/* </div> */}

          {/* password */}

          {/* <div className="col-span-1"> */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Password</label>
              <input onChange={handleChange}
                {...register("password", { required: "Password is required" })}
                className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                  errors.password ? "border-red-500" : ""
                }`}
              />
              {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
            </div>
          {/* </div> */}
          </div>

          <div className="col-span-3">
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">
  Submit
</button>

          </div>
        {/* </div> */}
    </form>
<ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>

   

    );
  };
    export default AddAgentForm;