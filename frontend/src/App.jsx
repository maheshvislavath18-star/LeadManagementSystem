import Login from "./components/Login";
import AddLead from "./components/AddLead";
import LeadList from "./components/LeadList";

function App() {

  const token = localStorage.getItem("access");

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    window.location.reload();
  };

  if (!token) {
    return <Login />;
  }

  return (
    <div className="container">

      <div className="d-flex justify-content-between align-items-center mt-3">

        <h1 className="text-primary">
          Lead Management System
        </h1>

        <button
          className="btn btn-danger"
          onClick={logout}
        >
          Logout
        </button>

      </div>

      <hr />

      <AddLead />

      <LeadList />

    </div>
  );
}

export default App;