import React from "react";
import "./index.css";
import { useHistory } from "react-router-dom";
function NotFound() {
  const history = useHistory();
  const handleRedirect = () => {
    history.push("/");
  };

  return (
    <div className="not-found">
      <h2>This is not the page you are looking for</h2>
      <div className="person-card--redirectBtn" onClick={handleRedirect}>
        <p className="person-card--redirectBtn--p">Go back to search..</p>
      </div>
    </div>
  );
}

export default NotFound;
