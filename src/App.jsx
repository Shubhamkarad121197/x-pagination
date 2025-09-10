import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [userData, setUserData] = useState([]);
  const [allUserData, setAllUserData] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const rowsPerPage = 10;

  const API_URL =
    "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

  const getUserData = async () => {
    try {
      let response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      let data = await response.json();
      setAllUserData(data);
      setUserData(data.slice(0, rowsPerPage));
    } catch (error) {
      alert("Failed to fetch data");
      console.error("Fetch error:", error);
    }
  };

  const handleNext = () => {
    const newPageCount = pageCount + 1;
    const start = (newPageCount - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    if (start < allUserData.length) {
      setPageCount(newPageCount);
      setUserData(allUserData.slice(start, end));
    }
  };

  const handlePrevious = () => {
    if (pageCount > 1) {
      const newPageCount = pageCount - 1;
      const start = (newPageCount - 1) * rowsPerPage;
      const end = start + rowsPerPage;

      setPageCount(newPageCount);
      setUserData(allUserData.slice(start, end));
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <div>
        <h1>Employee Data Table</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((res) => (
              <tr key={res.id}>
                <td>{res.id}</td>
                <td>{res.name}</td>
                <td>{res.email}</td>
                <td>{res.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <button
            className="paginationBtn"
            onClick={handlePrevious}
            disabled={pageCount === 1}
          >
            Previous
          </button>

          <div className="count">{pageCount}</div>

          <button
            className="paginationBtn"
            onClick={handleNext}
            disabled={pageCount * rowsPerPage >= allUserData.length}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
