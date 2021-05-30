import axios from "axios";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./index.css";

function Person() {
  const [person_data, setPersonData] = React.useState([]);
  const history = useHistory();
  const location = useLocation();

  //fetching data with url
  React.useEffect(() => {
    let id = +location.pathname.split("/")[2];
    axios
      .get(`http://swapi.dev/api/people/${id}/`)
      .then((res) => setPersonData(res.data))
      .catch((err) => err);
  }, [location.pathname]);

  const handleRedirect = () => {
    history.push("/");
  };

  //{person_data?.name}
  return (
    <div className='person-parent'>
      <div className="person-card">
        <div className="person-card--contentBox">
          <p className="person-card--contentBox--p">Name : {person_data?.name}</p>
        </div>
        <div className="person-card--contentBox">
          <p className="person-card--contentBox--p">
            Birth Year : {person_data?.birth_year}
          </p>
        </div>
        <div className="person-card--contentBox">
          <p className="person-card--contentBox--p">
            Gender : {person_data?.gender}
          </p>
        </div>
        <div className="person-card--contentBox">
          <p className="person-card--contentBox--p">
            Height : {person_data?.height}
          </p>
        </div>
        <div className="person-card--contentBox">
          <p className="person-card--contentBox--p">
            Hair Color : {person_data?.hair_color}
          </p>
        </div>
        <div className="person-card--contentBox">
          <p className="person-card--contentBox--p">
            Eye Color : {person_data?.eye_color}
          </p>
        </div>
      </div>
      <div className="person-card--contentBox redirectBtn" onClick={handleRedirect}>
          <button onClick={handleRedirect}>
            Back
          </button>
      </div>
    </div>
  );
}

export default Person;
