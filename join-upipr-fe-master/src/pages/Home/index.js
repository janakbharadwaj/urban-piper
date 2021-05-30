import React from "react";
import logo from "./star-wars-logo.png";
import "./index.css";
import { SuggestionCard } from "../../Components/SuggestionCard/SuggestionCard";
import { request, debounce } from "./utils";
import { useHistory } from "react-router-dom";
import { BiSearch } from "react-icons/bi";

function HomePage() {
  const [query, Setquery] = React.useState("");
  const [loader, Setloader] = React.useState(true);
  const [data, Setdata] = React.useState(null);
  const [error, Seterror] = React.useState(false);
  const [activeBox, SetActiveBox] = React.useState(-1);
  const [person_id, setId] = React.useState(-1);
  const inputref = React.useRef();
  const scrollref = React.useRef();
  const history = useHistory();

  // debouncing in the query
  const handleQuery = debounce((e) => {
    return Setquery(e);
  });


  const getData = (searchQuery) => {
    Setloader(true);
    request(searchQuery)
      .then((res) => {
        if (res.data.count === 0) {
          Setdata(null);
        } else {
          Setdata(res.data.results);
        }
        Setloader(false);
      })
      .catch((err) => Seterror(true));
  };


  const handleCancel = () => {
    inputref.current.value = "";
    Setquery("");
    Setdata(null);
    SetActiveBox(-1);
  };


  const handleSearch = () => {
    if (person_id !== -1) {
      history.push(`/person/${person_id}`);
    } else {
      history.push(`/wrongName`);
    }
  };

  
  React.useEffect(() => {
    if (error === true) {
      alert("something went wrong reoad the page");
    }
    if (query !== "") {
      getData(query);
    }
  }, [query,error]);

  
  //function used to trigger events by keys
  const handlekeyUp = (e) => {
    switch (e.keyCode) {
      case 38:
        scrollref.current.scrollTop -= 22;
        if (activeBox < 0) {
          SetActiveBox(data?.length - 1);
        }
        SetActiveBox((prev) => prev - 1);
        break;
      case 40:
        scrollref.current.scrollTop += 22;
        if (activeBox === data?.length - 1) {
          SetActiveBox(-1);
        }
        SetActiveBox((prev) => prev + 1);
        break;
      case 13:
        handleSearch();
        break;
      default:
        break;
    }
  };

  //chaanging active element
  React.useEffect(() => {
    if (activeBox > -1 && data?.length > activeBox) {
      let currentName = data[activeBox].name;
      inputref.current.value = currentName;
      let idNumber = data[activeBox]?.url.split("/");
      setId(idNumber ? idNumber[5] * 1 : 1);
    }
  }, [activeBox, data, person_id]);


  return (
    <div onKeyUp={handlekeyUp}>
      <div className="logo">
        <img src={logo} alt="Star Wars Logo" />
      </div>
      <div className={data ? `search-box search-box--active` : "search-box"}>
        <input
          ref={inputref}
          onChange={(e) => handleQuery(e.target.value)}
          className="search-box--input"
          placeholder="search by name"
        />
        {query !== "" ? (
          <>
            <div className="search-box--cancelBtn" onClick={handleCancel}>
              X
            </div>
            <div className="search-box--splitLine"></div>
            {!loader ? (
              <div className="search-box--searchBtn">
                <p
                  onClick={handleSearch}
                  className="search-box--searchBtn--logo"
                >
                  <BiSearch />
                </p>
              </div>
            ) : (
              <div className="search-box--loader"></div>
            )}
          </>
        ) : (<div className="search-box--searchBtn1">
                <p
                  onClick={handleSearch}
                  className="search-box--searchBtn--logo1"
                >
                  <BiSearch />
                </p>
              </div>
      )}
      </div>
      {data && (
        <div className="suggestion-box" ref={scrollref}>
          <div className="suggestion-box--splitLine"></div>
          {data?.map((item, i) => (
            <SuggestionCard key={i} {...item} active={activeBox} number={i} />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
