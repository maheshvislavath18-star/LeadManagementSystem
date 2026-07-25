import { useState } from "react";
import axios from "axios";

function AddLead() {
  const [lead, setLead] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    status: "New",
  });

  const handleChange = (e) => {
    setLead({ ...lead, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   await axios.post(
    "http://127.0.0.1:8000/api/leads/",
    lead,
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
    }
);

    alert("Lead Added Successfully!");

    window.location.reload();
  };

  return (
    <div className="container mt-4">
      <h2>Add Lead</h2>

      <form onSubmit={handleSubmit}>

       <input
  className="form-control mb-2"
  type="text"
  name="name"
  placeholder="Name"
  value={lead.name}
  onChange={handleChange}
  required
/>

       <input
  className="form-control mb-2"
  type="email"
  name="email"
  placeholder="Email"
  value={lead.email}
  onChange={handleChange}
  required
/>

        <input
  className="form-control mb-2"
  type="text"
  name="phone"
  placeholder="Phone"
  value={lead.phone}
  onChange={handleChange}
  required
/>

       <input
  className="form-control mb-2"
  type="text"
  name="company"
  placeholder="Company"
  value={lead.company}
  onChange={handleChange}
  required
/>

      <textarea
  className="form-control mb-2"
  name="message"
  placeholder="Message"
  value={lead.message}
  onChange={handleChange}
  required
/>

        <button className="btn btn-success">
          Save Lead
        </button>

      </form>
    </div>
  );
}

export default AddLead;