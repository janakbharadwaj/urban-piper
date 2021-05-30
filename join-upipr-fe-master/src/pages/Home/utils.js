import axios from "axios";

// debouncing function which make the function to call after certain period of time
export function debounce(fn, limit = 500) {
  let timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, limit);
  };
}

//get request for the api call
export const request = (query) => {
  return axios.get(`https://swapi.dev/api/people/?search=${query}`);
};
