import { useState, useEffect } from "react";
import { BASE_URL } from "../../../main";
import CustomTable from "../../../components/utils/customTable";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HoldVehicleList = () => {
  const [filesData, setFilesData] = useState([]);

  const apiUrl = `${BASE_URL}/hold-vehicle-list?page=`;
  const token = localStorage.getItem("token");

  const fetchData = async (page = 1) => {
    try {
      axios
        .get(`${apiUrl}${page}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const data = res.data;
          setFilesData(data.vehiclesList);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleRelease = async (data) => {
    console.log(data);
    try {
      const response = await axios.put(
        `${BASE_URL}/change-vehicle-status/${data.agreementNo}`,
        { status: "release" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("API Response:", response.data);
      //   toast.success("Status successfully");
    } catch (error) {
      console.error("API Request Error:", error);

      if (error.response) {
        console.error("Server responded with:", error.response.data.error);
        const errorMessage =
          error.response.data.error || "An Error occured. Please try Again!";
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
  const handleRepo = async (data) => {
    console.log(data);
    try {
      const response = await axios.put(
        `${BASE_URL}/change-vehicle-status/${data.agreementNo}`,
        { status: "repo" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("API Response:", response.data);
      //   toast.success("Form submitted successfully");
    } catch (error) {
      console.error("API Request Error:", error);

      if (error.response) {
        console.error("Server responded with:", error.response.data.error);
        const errorMessage =
          error.response.data.error || "An Error occured. Please try Again!";
        // toast.error(errorMessage);
      } else if (error.request) {
        console.error("No response received:", error.request);
        // toast.error("Server didn't respond. Please try again!");
      } else {
        console.error("Error setting up the request:", error.message);
        // toast.error("Something went wrong :(");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [apiUrl]);

  const columns = [
    { Header: "Regd. ID", accessor: "_id" },
    // { Header: "Status", accessor: "status" },
    {
      Header: "Status",
      Cell: ({ row }) => (
        <div
          className="px-2 py-1 text-center border-black rounded-lg"
        >
          {row.original.status}
        </div>
      ),
    },
    {
      Header: "Release",
      Cell: ({ row }) => (
        <button
          onClick={() => handleRelease(row.original)}
          className="px-2 py-1 bg-green-500 rounded-lg text-white hover:bg-green-700"
        >
          Release
        </button>
      ),
    },
    {
      Header: "Repo",
      Cell: ({ row }) => (
        <button
          onClick={() => handleRepo(row.original)}
          className="px-2 py-1 bg-red-500 rounded-lg text-white hover:bg-red-700"
        >
          Repo
        </button>
      ),
    },
    { Header: "Regd. No.", accessor: "regNo" },
    { Header: "Customer Name", accessor: "customerName" },
    { Header: "Bank Name", accessor: "bankName" },
    { Header: "Branch", accessor: "branch" },
    { Header: "Agreement No.", accessor: "agreementNo" },
    { Header: "Engine No.", accessor: "engineNo" },
    { Header: "Chasis No.", accessor: "chasisNo" },
    { Header: "Seezer Name", accessor: "seezerId.name" },
  ];

  return (
    <div className="container bg-blue-400 text-white  mx-auto my-4">
      <h2 className="text-2xl font-bold mb-4">Hold Vehicle Details</h2>
      <CustomTable
        columns={columns}
        data={filesData}
        searchEnabled={true}
        filterEnabled={false}
      />

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
    </div>
  );
};

export default HoldVehicleList;
