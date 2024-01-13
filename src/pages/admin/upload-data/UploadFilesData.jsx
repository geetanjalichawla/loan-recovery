import { useState, useEffect } from "react";
import { BASE_URL } from "../../../main";
import CustomTable from "../../../components/utils/customTable";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UploadFilesData() {
  const [filesData, setFilesData] = useState([]);

  const apiUrl = `${BASE_URL}/get-data?page=1`;
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      axios
        .get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const data = res.data;
          setFilesData(data.data);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (fileName) => {
    console.log(fileName);
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this file?"
    );

    if (!userConfirmed) {
      return;
    }
    try {
      const response = await axios.delete(
        `${BASE_URL}/delete-by-fileName/${fileName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log(`File ${fileName} deleted successfully`);
        toast.success(`File ${fileName} deleted successfully`);
        fetchData();
      } else {
        console.error("Error deleting file. Unexpected response:", response);
        toast.error("Error deleting file.");
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  useEffect(() => {

    fetchData();
  }, [apiUrl]);

  const columns = [
    { Header: "File Name", accessor: "fileName" },
    { Header: "Month", accessor: "month" },
    { Header: "Upload Date", accessor: "createdAt" },
    { Header: "Count", accessor: "count" },
    { Header: "Status", accessor: "status" },
    {
      Header: "Actions",

      Cell: ({ row }) => (
        <button
          onClick={() => handleDelete(row.original.fileName)}
          className="px-2 py-1 bg-red-500 rounded-lg text-white hover:bg-red-700"
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <div className="container bg-blue-400 text-white  mx-auto my-4">
      <h2 className="text-2xl font-bold mb-4">Files Information</h2>
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
}

export default UploadFilesData;
