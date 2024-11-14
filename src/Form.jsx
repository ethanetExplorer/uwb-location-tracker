import React, { useState } from "react";
import "./Form.css";

const Form = ({ closeForm }) => {
  // State for form fields
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    color: "",
    zone: [],
    duration: "",
  });

  // Handlers for form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "zone") {
      // Handle multiple selections for 'zone'
      const selectedZones = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      );
      setFormData((prevData) => ({
        ...prevData,
        [name]: selectedZones, // Store the selected zones as an array
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission (e.g., send to backend)
    console.log("Form Data Submitted:", formData);
  };

  // Handle form reset
  const handleReset = () => {
    setFormData({
      id: "",
      name: "",
      color: "",
      zone: [],
      duration: "",
    });
  };

  // Handle form cancellation
  const handleCancel = () => {
    // Close the form (this will depend on how the form is rendered in your app)
    closeForm(); // Call the passed closeForm function to close the form
  };

  return (
    <div className="slideover-overlay">
      <div className="slideover">
        <h2>Register Worker</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="id">ID</label>
            <input
              type="number"
              id="id"
              name="id"
              value={formData.id}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="color">Colour</label>
            <select
              name="color"
              value={formData.color}
              onChange={handleChange}
              required
            >
              <option value="">Select Colour</option>
              <option
                value="orange"
                style={{ backgroundColor: "orange", color: "white" }}
              >
                Orange
              </option>
              <option
                value="yellow"
                style={{ backgroundColor: "yellow", color: "black" }}
              >
                Yellow
              </option>
              <option
                value="green"
                style={{ backgroundColor: "green", color: "white" }}
              >
                Green
              </option>
              <option
                value="blue"
                style={{ backgroundColor: "blue", color: "white" }}
              >
                Blue
              </option>
              <option
                value="cyan"
                style={{ backgroundColor: "cyan", color: "black" }}
              >
                Cyan
              </option>
              <option
                value="magenta"
                style={{ backgroundColor: "magenta", color: "white" }}
              >
                Magenta
              </option>
              <option
                value="purple"
                style={{ backgroundColor: "purple", color: "white" }}
              >
                Purple
              </option>
              <option
                value="brown"
                style={{ backgroundColor: "brown", color: "white" }}
              >
                Brown
              </option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="zone">Assign Zone</label>
            <select
              id="zone"
              name="zone"
              value={formData.zone}
              onChange={handleChange}
              multiple
              required
            >
              <option value="1786">Zone 1: 1786-983f</option>
              <option value="983f">Zone 2: 983f-88cc</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="duration">Duration</label>
            <input
              type="text"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="e.g., 2h 45m"
              required
            />
          </div>

          <div className="form-buttons">
            <button type="submit" className="add-btn">
              Submit
            </button>
            <button
              type="button"
              className="reset-btn"
              onClick={handleReset} // Reset the form when clicked
            >
              Reset
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={handleCancel} // Call the passed closeForm function when Cancel is clicked
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
