import  { useState, useEffect } from "react";
import { BASE_URL } from "../../../main";
import CustomTable from "../../../components/utils/customTable";

function RepoAgentList() {
  const [repoAgents, setRepoAgents] = useState([]);
  const apiUrl = `${BASE_URL}/get-all-repo-agents`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setRepoAgents(data.agents);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [apiUrl]);

  const columns = [
    // Define your table columns based on the data properties
    { Header: "Name", accessor: "name" },
    { Header: "Mobile", accessor: "mobile" },
    // Add more columns as needed
  ];

  return (
    <div>
      <h2>Repo Agents List</h2>
      <CustomTable columns={columns} data={repoAgents} searchEnabled={true} />
    </div>
  );
}

export default RepoAgentList;
