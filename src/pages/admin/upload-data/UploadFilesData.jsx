import  { useState, useEffect } from "react";
import { BASE_URL } from "../../../main";
import CustomTable from "../../../components/utils/customTable";
import axios from "axios";

function UploadFilesData() {
  const [filesData, setFilesData] = useState([]);

  const apiUrl = `${BASE_URL}/get-data?page=1`;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }).then(res=>     {
          const data = res.data;
          setFilesData(data.data);
        });
      

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [apiUrl]);



  const columns = [
    { Header: "File Name", accessor: "fileName" },
    { Header: "Month", accessor: "month" },
    { Header: "Upload Date", accessor: "createdAt" },
    { Header: "Count", accessor: "count" },
    { Header: "Status", accessor: "status" }
  ];

  return (

    <div className="container bg-blue-400 text-white  mx-auto my-4">
      <h2 className="text-2xl font-bold mb-4">Files Information</h2>
      <CustomTable columns={columns} data={filesData} searchEnabled={true} />
    </div>

  );
}

export default UploadFilesData;