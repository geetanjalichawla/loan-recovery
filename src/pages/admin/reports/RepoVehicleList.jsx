import { useState, useEffect } from "react";
import { BASE_URL } from "../../../main";
import CustomTable from "../../../components/utils/customTable";
import axios from "axios";

const RepoVehicleList = () => {
  const [filesData, setFilesData] = useState([]);

  const apiUrl = `${BASE_URL}/repo-vehicle-list?page=`;
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

  useEffect(() => {
    fetchData();
  }, [apiUrl]);

  const columns = [
    { Header: "Ser. No.", accessor: "_id" },
    { Header: "Regd. No.", accessor: "regNo" },
    { Header: "Customer Name", accessor: "customerName" },
    { Header: "Bank Name", accessor: "bankName" },
    { Header: "Branch", accessor: "branch" },
    { Header: "Agreement No.", accessor: "agreementNo" },
    { Header: "Engine No.", accessor: "engineNo" },
    { Header: "Chasis No.", accessor: "chasisNo" },
    { Header: "Seezer Name", accessor: "seezerId.name" },
    {
        Header: "Status",
        Cell: ({ row }) => (
            <div
            className="px-2 py-1 text-center bg-green-500 rounded-lg text-white"
            >
          Repo
        </div>
      ),
    }
  ];

  return (
    <div className="container bg-blue-400 text-white  mx-auto my-4">
      <h2 className="text-2xl font-bold mb-4">Repo Vehicle Details</h2>
      <CustomTable
        columns={columns}
        data={filesData}
        searchEnabled={true}
        filterEnabled={false}
      />
    </div>
  );
};

export default RepoVehicleList;
