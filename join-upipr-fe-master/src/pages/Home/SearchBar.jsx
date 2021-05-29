import React, { useState, useEffect } from "react";
import styled from "styled-components";
//import './index.css';
import { useThrottle } from "./throttle";
import { BsSearch } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

const SearchBarWrapper = styled.div`
  width: 400px;
  padding: 12px 20px;
  border-radius: 25px;
  border: 0;
  outline: 0;
  font-size: 16px;
  background: #2d2f30;
  color: #f2f2f2;
  display: flex;
  justify-content: center;
  border-bottom-right-radius: ${({ results }) => (results ? `0px` : `20px`)};
  border-bottom-left-radius: ${({ results }) => (results ? `0px` : `20px`)};
  border-bottom-color: ${({ results }) => (results ? `transparent` : `black`)};
`;

const Input = styled.input`
  width: 350px;
  border: 0;
  outline: 0;
  font-size: 16px;
  background: #2d2f30;
  color: #f2f2f2;
`;

const RightSide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor:pointer;
`;

const Spinner = styled.div`
  border: 2px solid gray;
  border-top: 2px solid #ffeb00;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  animation: spin 1s linear infinite;
  margin-left: 15px;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const SearchIcon = styled.div`
  margin-left: 15px;
`;


export default function SearchBar({
  value,
  suggestions,
  onChange,
  loading,
  setLoading
}) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const throttledVal = useThrottle(q, 1000);
  const handleInputChange = (e) => {
    setQ(e.target.value);
    setLoading(true);
  };

  useEffect(() => {
    onChange(throttledVal);
  }, [throttledVal, onChange]);

  const clearQuery = () => {
    setQ("");
    if (loading) setLoading(false);
  };

  return (
    <>
      <SearchBarWrapper>
        <Input value={q} onChange={handleInputChange} placeholder='Search by name'/>
        <RightSide>
          {q && <div onClick={clearQuery}><AiOutlineClose className="headerIcon" /></div>}
          {loading ? <Spinner /> : <SearchIcon><BsSearch className="headerIcon" /></SearchIcon>}
        </RightSide>
      </SearchBarWrapper>
    </>
  );
}
