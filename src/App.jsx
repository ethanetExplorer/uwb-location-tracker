import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Form from "./Form"; // Import the Form component

const App = () => {
  // ===
  // HELPER FUNCTIONS ====================================
  // ===
  function formatRelativeTime(date) {
    const now = new Date();
    const diffInSeconds = Math.floor((now - new Date(date)) / 1000); // Difference in seconds

    if (diffInSeconds < 1) {
      return `Now`;
    } else if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    }

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      return `${diffInMonths}null month${diffInMonths > 1 ? "s" : ""} ago`;
    }

    const diffInYears = Math.floor(diffInMonths / 12);

    return `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
  }

  // ===
  // PERSON STATE ================================================================================================
  //

  const [person, setPerson] = useState({
    id: 65,
    name: "John Papayaseed",
    color: "green", // 'green' needs to be in quotes
    allocated: ["983f", "88cc"],
    currentPos: ["983f", "1786"],
    lastUpdated: null, // Initialize as null
  });

  // ====
  // FETCH DATA =============================================================================================
  // ====
  const [jsonData, setJsonData] = useState(null); // Store the fetched data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5174/data"); // Your backend endpoint
      console.log("Fetched data:", response.data); // Log the data for debugging
      setJsonData(response.data.data); // Update the jsonData state with the fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []); // Runs once when component mounts

  // ===
  // LOGIC FUNCTIONS ==========================================================================================
  // ===

  const checkPosition = (array1, array2) => {
    if (array1.length !== array2.length) {
      return false; // If arrays don't have the same length, they can't be equal
    }

    const countMap1 = {};
    const countMap2 = {};

    // Count the occurrences of each elpement in arr1
    array1.forEach((element) => {
      countMap1[element] = (countMap1[element] || 0) + 1;
    });

    // Count the occurrences of each element in arr2
    array2.forEach((element) => {
      countMap2[element] = (countMap2[element] || 0) + 1;
    });

    // Compare the frequency counts for each element
    for (const key in countMap1) {
      if (countMap1[key] !== countMap2[key]) {
        return false; // If any element has a different frequency, arrays are not equal
      }
    }

    return true;
  };

  const [showForm, setShowForm] = useState(false); // Manage form visibility

  const toggleForm = () => {
    setShowForm((prev) => !prev); // Toggle the form visibility
  };

  const switchZone = () => {
    // if (checkPosition(["1786", "983f"], person.currentPos)) {
    //   const updatedPerson = {
    //     ...person, // Keep old values
    //     currentPos: ["983f", "88cc"],
    //     lastUpdated: `Manually updated`,
    //   };
    //   setPerson(updatedPerson); // Update the person state
    // } else if (checkPosition(["88cc", "983f"], person.currentPos)) {
    //   const updatedPerson = {
    //     ...person, // Keep old values
    //     currentPos: ["983f", "1786"],
    //     lastUpdated: `Manually updated`,
    //   };
    //   setPerson(updatedPerson); // Update the person state
    // }
    console.log("Nice try");
  };

  // Update person current position based on the jsonData
  useEffect(() => {
    fetchData();
    if (jsonData && jsonData.length > 0) {
      const currentDate = new Date();
      const updatedPerson = {
        ...person, // Keep old values
        currentPos: [jsonData[0]?.anchor1_addr, jsonData[0]?.anchor2_addr],
        lastUpdated: currentDate,
      };
      setPerson(updatedPerson); // Update the person state
    } else {
      setTimeout(() => {
        console.log("This is delayed by 2.5 seconds");
      }, 2500);
      const currentDate = new Date();
      const updatedPerson = {
        ...person, // Keep old values
        currentPos: ["983f", "88cc"],
        lastUpdated: currentDate,
      };
      setPerson(updatedPerson); // Update the person state
    }
  }, [jsonData]); // Update person only when jsonData changes

  return (
    <>
      {/* Title Section */}
      <div className="header">
        <div className="location-tracker-title">Overview</div>
        {/* Button to open the form */}
        <button className="register-worker-btn" onClick={toggleForm}>
          Register Worker
        </button>
      </div>

      <div className="location-diagram">
        <div className="zone-body">
          <div>
            <p className="zone-body-title">Zone 1</p>
            <p className="zone-body-caption">
              <strong>L:</strong> 1786, <strong>R:</strong> 983f
            </p>
          </div>
          <div className="zone">
            {person.currentPos.includes("1786") && (
              <div
                onClick={switchZone}
                className={
                  checkPosition(person.allocated, person.currentPos)
                    ? "worker-circle"
                    : "worker-circle-glow-red"
                }
                style={{
                  backgroundColor: person.color.toLowerCase(),
                }}
              >
                <span className="worker-id">{person.id}</span>
              </div>
            )}
          </div>
        </div>
        <div className="zone-body">
          <div>
            <p className="zone-body-title">Zone 2</p>
            <p className="zone-body-caption">
              <strong>L</strong>: 983f, <strong>R:</strong> 88cc
            </p>
          </div>
          <div className="zone">
            {person.currentPos.includes("88cc") && (
              <div
                onClick={switchZone}
                className={
                  checkPosition(person.allocated, person.currentPos)
                    ? "worker-circle"
                    : "worker-circle-glow-red"
                }
                style={{
                  backgroundColor: person.color.toLowerCase(),
                }}
              >
                <span className="worker-id">{person.id}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <hr className="divider" />
      {/* Loading and Error Handling */}

      {/* Conditionally render the form */}
      {showForm && <Form closeForm={toggleForm} />}

      {/* Person Table */}
      <div className="table-container">
        <table className="person-table">
          <thead>
            <tr>
              <th className="table-header">ID</th>
              <th className="table-header">Name</th>
              <th className="table-header">Colour</th>
              <th className="table-header">Allocated</th>
              <th className="table-header">Current Position</th>
              <th className="table-header">Last Updated</th>
            </tr>
          </thead>
          <tbody>
            <tr className="table-row">
              <td className="table-cell">{person.id}</td>
              <td className="table-cell">{person.name}</td>
              <td
                className="table-cell"
                style={{ backgroundColor: person.color.toLowerCase() }}
              ></td>
              <td className="table-cell">
                {person.allocated.length > 0
                  ? person.allocated.join(", ")
                  : "None"}
              </td>
              <td
                className="table-cell"
                style={{
                  backgroundColor: checkPosition(
                    person.allocated,
                    person.currentPos
                  )
                    ? "#ffffff00"
                    : "#ea2019",
                  color: checkPosition(person.allocated, person.currentPos)
                    ? "#000000"
                    : "#ffffff",
                  fontWeight: checkPosition(person.allocated, person.currentPos)
                    ? "400"
                    : "500",
                }}
              >
                {person.currentPos.length > 0
                  ? person.currentPos.join(", ")
                  : "Not available"}
              </td>
              <td className="table-cell">
                {person.lastUpdated
                  ? formatRelativeTime(person.lastUpdated)
                  : "Not updated yet"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default App;
