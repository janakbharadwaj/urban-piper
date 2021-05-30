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
  
  //using refs for the input and scroll bar to add the features like suggestion names and scroll using keys
  const inputref = React.useRef();
  const scrollref = React.useRef();
  
  //used to route
  const history = useHistory();

  // added debouncing in the query to optimize the network request
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

  //reseting the search bar to initial state
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

  /*
  * handleKeup function will be used for the events triggered by keys
  * e.keyCode will give the value of key pressed -> 38(ArrowUp), 40(ArrowDown), 13(Enter)
  * ActiveBox will give the number active box
  * scrollTop will give us the view point so that if we add 22 it will increase the view point 
  */
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

  /*
  Using inputref to change the value according to activeBox such that it will 
  change input box value on keydown or keyup
  */  
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
          <React.Fragment>
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
          </React.Fragment>
        ) : null}
      </div>
      {data !== null ? (
        <div className="suggestion-box" ref={scrollref}>
          <div className="suggestion-box--splitLine"></div>
          {/* active number is the box number which is active(global value).Number is the index of that
          box. Using this when active number is equal to index then css with highlighted background will
          be activated */}
          {data?.map((item, i) => (
            <SuggestionCard key={i} {...item} active={activeBox} number={i} />
          ))}
        </div>
      ) : (
        <p className="error-text">Search character name</p>
      )}
    </div>
  );
}

export default HomePage;
