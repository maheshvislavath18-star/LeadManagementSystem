import { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "./Dashboard";
import { saveAs } from "file-saver";

function LeadList() {
    const [leads, setLeads] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    // Fetch Leads
    const fetchLeads = () => {
        axios
            .get("http://127.0.0.1:8000/api/leads/", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access")}`,
                },
            })
            .then((response) => {
                setLeads(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        fetchLeads();
    }, []);

    // Edit Lead
   const updateStatus = (lead, status) => {

    axios.put(
        `http://127.0.0.1:8000/api/leads/${lead.id}/`,
        {
            ...lead,
            status: status,
        },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
        }
    )
    .then(() => {
        fetchLeads();
    })
    .catch((error) => {
        console.log(error);
    });

};

    // Delete Lead
    const deleteLead = (id) => {
        if (!window.confirm("Are you sure you want to delete this lead?")) {
            return;
        }

        axios
            .delete(`http://127.0.0.1:8000/api/leads/${id}/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access")}`,
                },
            })
            .then(() => {
                alert("Lead Deleted Successfully!");
                fetchLeads();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const exportCSV = () => {

    let csv =
        "ID,Name,Email,Phone,Company,Status\n";

    filteredLeads.forEach((lead) => {
        csv += `${lead.id},${lead.name},${lead.email},${lead.phone},${lead.company},${lead.status}\n`;
    });

    const blob = new Blob(
        [csv],
        { type: "text/csv;charset=utf-8;" }
    );

    saveAs(blob, "Leads.csv");
};

   <div className="d-flex justify-content-end mb-3">

    <button
        className="btn btn-success"
        onClick={exportCSV}
    >
        Export CSV
    </button>

</div>

    // Search + Status Filter
    const filteredLeads = leads.filter((lead) => {
        const matchesSearch =
            lead.name.toLowerCase().includes(search.toLowerCase()) ||
            lead.email.toLowerCase().includes(search.toLowerCase()) ||
            lead.company.toLowerCase().includes(search.toLowerCase());

        const matchesStatus =
            statusFilter === "All" || lead.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

   return (
    <div className="container mt-4">

        <h2>Lead List</h2>

<Dashboard leads={leads} />

<div className="d-flex justify-content-end mb-3">
    <button
        className="btn btn-success"
        onClick={exportCSV}
    >
        Export CSV
    </button>
</div>

{/* Search Box */}

        {/* Search Box */}
        <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Name, Email or Company..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Status Filter */}
            <div className="mb-3">
                <select
                    className="form-select"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="All">All Status</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Closed">Closed</option>
                </select>
            </div>

            <table className="table table-bordered table-striped">

                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Company</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredLeads.length > 0 ? (
                        filteredLeads.map((lead) => (
                            <tr key={lead.id}>
                                <td>{lead.id}</td>
                                <td>{lead.name}</td>
                                <td>{lead.email}</td>
                                <td>{lead.company}</td>
                               <td>
    <select
        className="form-select form-select-sm"
        value={lead.status}
        onChange={(e) => updateStatus(lead, e.target.value)}
    >
        <option value="New">New</option>
        <option value="Contacted">Contacted</option>
        <option value="Closed">Closed</option>
    </select>
</td>

                                <td>
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => editLead(lead)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deleteLead(lead.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">
                                No Leads Found
                            </td>
                        </tr>
                    )}
                </tbody>

            </table>

        </div>
    );
}

export default LeadList;    