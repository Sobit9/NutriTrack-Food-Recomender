import React, { useState } from "react";
const Contact = () => {
  const [email, setEmail] = useState("");
  const handleSearch = async () => {
    try {
      const response = await fetch("http://localhost:3000/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();


      if (response.ok) {
        console.log("email updated");
        alert("email updated ");
      } else {
      }
    } catch (error) {
      console.error("Error adding email:", error);
      setMessage("Failed to add email. Please try again.");
    }
  };

  return (
    <div className="contact-page-wrapper">
      <h1 className="primary-heading">Have Question In Mind?</h1>
      <h1 className="primary-heading">Let Us Help You</h1>
      <div className="contact-form-container">
        <input
          type="text"
          placeholder="yourmail@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{color: 'black'}}
        />
        <button
          className="secondary-button"
          style={{ textDecoration: "none" }}
          onClick={handleSearch}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Contact;
