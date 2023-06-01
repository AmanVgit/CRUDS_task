import React, { useState } from "react";
import "./AddButton.css";

const BASE_URL = 'http://localhost:5000/api';

const AddButton = () => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [tableData, setTableData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validation logic
    if (!name || !phoneNumber || !email || !hobbies) {
      alert("Please fill in all fields");
      return;
    }

    // Create a new response object
    const newResponse = {
      name,
      phoneNumber,
      email,
      hobbies,
    };

    try {
      // Send the form data to the server to save in MongoDB
      const response = await fetch(`${BASE_URL}/data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newResponse),
      });

      if (!response.ok) {
        throw new Error("Failed to save response");
      }

      // Save the response in the table
      setTableData([...tableData, newResponse]);

      // Reset form fields
      setName("");
      setPhoneNumber("");
      setEmail("");
      setHobbies("");

      // Close the form
      setShowForm(false);
    } catch (error) {
      console.error(error);
      alert("Failed to save response. Please try again.");
    }
  };

  //Delete functionality
  const handleDeleteClick = (index) => {
    setTableData(tableData.filter((_, i) => i !== index));
    setSelectedRows(selectedRows.filter((rowIndex) => rowIndex !== index));
  };
  const handleCheckboxChange = (index) => {
    const selectedIndex = selectedRows.indexOf(index);
    if (selectedIndex === -1) {
      setSelectedRows([...selectedRows, index]);
    } else {
      setSelectedRows(selectedRows.filter((rowIndex) => rowIndex !== index));
    }
  };

  const handleSendClick = () => {
    const selectedData = selectedRows.map((index) => tableData[index]);

    const emailData = {
      to: "info@redpositive.in",
      subject: "Selected Data",
      body: JSON.stringify(selectedData),
    };

    const mailtoLink = `mailto:${emailData.to}?subject=${encodeURIComponent(
      emailData.subject
    )}&body=${encodeURIComponent(emailData.body)}`;

    window.location.href = mailtoLink;

    // Clear the selected rows
    setSelectedRows([]);
  };


  return (
    <div>
      <button className="add-button" onClick={() => setShowForm(true)}
      onMouseEnter={(e) => (e.target.style.backgroundColor = 'darkblue')}
      onMouseLeave={(e) => (e.target.style.backgroundColor = 'blue')}>
        Add
      </button>

      {showForm && (
        <div className="form-container">
          <form className="form" onSubmit={handleFormSubmit}>
            <label className="form-label">Name:</label>
            <input
              className="form-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label className="form-label">Phone Number:</label>
            <input
              className="form-input"
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />

            <label className="form-label">Email:</label>
            <input
              className="form-input"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="form-label">Hobbies:</label>
            <input
              className="form-input"
              type="text"
              value={hobbies}
              onChange={(e) => setHobbies(e.target.value)}
            />

            <button className="form-submit-button" type="submit" >
              Save
            </button>
          </form>
        </div>
      )}

      {tableData.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Select</th>
              <th>Serial Number</th>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Hobbies</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((data, index) => (
              <tr key={index}>
                <td>
                  <input type="checkbox" 
                  checked={selectedRows.includes(index)}
                  onChange={() => handleCheckboxChange(index)}
                  />
                </td>
                <td>{index + 1}</td>
                <td>{data.name}</td>
                <td>{data.phoneNumber}</td>
                <td>{data.email}</td>
                <td>{data.hobbies}</td>
                <td><div style={{border:"12px"}}>
                <button
                    className="delete-button"
                    onClick={() => handleDeleteClick(index)}
                   style={{color:"black", fontWeight:"bold"}}>
                    Delete
                  </button>
                </div>
                 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {selectedRows.length > 0 && (
        <button className="send-button" onClick={handleSendClick}
         style={{
          backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            fontsize: '16px',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = 'darkblue')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = 'blue')}>
          Send
        </button>
      )}
    </div>
  );
};

export default AddButton;