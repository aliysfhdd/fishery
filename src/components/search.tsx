import React from 'react';
import { searchCommodity } from "@/redux/actions";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";

const Search = () => {
  const dispatch:AppDispatch=useDispatch()
  const handleSearch =(e)=>{
    const search=e.target.value.toLowerCase()
    dispatch(searchCommodity(search))
  }
  return (
      <input onChange={handleSearch} placeholder={'Cari Komoditas...'}/>
  );
};

export default Search;
