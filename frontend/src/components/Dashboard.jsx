function Dashboard({ leads }) {

    const total = leads.length;

    const newLeads = leads.filter(
        (lead) => lead.status === "New"
    ).length;

    const contacted = leads.filter(
        (lead) => lead.status === "Contacted"
    ).length;

    const closed = leads.filter(
        (lead) => lead.status === "Closed"
    ).length;

    return (
        <div className="row mb-4">

            <div className="col-md-3">
                <div className="card bg-primary text-white">
                    <div className="card-body text-center">
                        <h5>Total Leads</h5>
                        <h2>{total}</h2>
                    </div>
                </div>
            </div>

            <div className="col-md-3">
                <div className="card bg-success text-white">
                    <div className="card-body text-center">
                        <h5>New Leads</h5>
                        <h2>{newLeads}</h2>
                    </div>
                </div>
            </div>

            <div className="col-md-3">
                <div className="card bg-warning text-dark">
                    <div className="card-body text-center">
                        <h5>Contacted</h5>
                        <h2>{contacted}</h2>
                    </div>
                </div>
            </div>

            <div className="col-md-3">
                <div className="card bg-danger text-white">
                    <div className="card-body text-center">
                        <h5>Closed</h5>
                        <h2>{closed}</h2>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Dashboard;