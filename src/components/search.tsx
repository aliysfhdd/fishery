import React, { useEffect, useState } from 'react';
import { filterBy, searchCommodity } from "@/redux/actions";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

const Search = () => {
  const dispatch:AppDispatch=useDispatch()
  const [input, setInput] = useState('');
  const listData= useSelector((state:RootState)=>state.appReducer.data)

  useEffect(() => {
    setInput('')
  }, [listData]);

  useEffect(() => {
    dispatch(searchCommodity(input))
  }, [input]);

  const handleSearch =(e)=>{
    setInput(e.target.value.toLowerCase())
  }
  return (
      <input onChange={handleSearch} value={input} placeholder={'Cari Komoditas...'}/>
  );
};

export default Search;
