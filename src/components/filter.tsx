import React, { useState } from 'react';
import { IFilter } from "@/interface/state";
import { TAB_TITLE } from "@/constant";
import { filterBy } from "@/redux/actions";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import "./filter.scss"

const LIST=[
  'ACEH KOTA',
  'CIMAHI',
  'ACEH KOTA',
  'CIMAHI',
  'ACEH KOTA',
  'CIMAHI',
  'MEDAN',
]
const Filter = () => {
  const [showDD, setShowDD] = useState(false);
  const [filterCity, setFilterCity] = useState(new Set());
  const dispatch:AppDispatch=useDispatch()
  const updateFilter =(city,checked)=>{
    if(!checked) setFilterCity((current)=>{
      current.delete(city)
      return current
    } )
    else setFilterCity((current)=>{
      current.add(city)
      return current
    })
  }

  const handleFilter =()=>{
    const payload:IFilter[]=[
      {
        name:TAB_TITLE.Kota,
        selected:Array.from(filterCity)
      }
    ]
    dispatch(filterBy(payload))
    setShowDD(false)
  }
  return (
    <div className="filter">
      <div className="filter__dd" onClick={()=>setShowDD((prevState)=>!prevState)}>
        <select>
          <option>{filterCity.size ? Array.from(filterCity).slice(0,3).join(', '): 'Pilih Kota'}</option>
        </select>
        <div className="filter__over"></div>
      </div>
      <div className="filter__wrapper" style={{display:showDD? 'block':'none'}}>
        <div className="filter__opt">
          {LIST.map((city,idx)=>
            <label className='filter__label' htmlFor={''+idx} key={idx}>
              <input type="checkbox" id={''+idx} onChange={(e)=>updateFilter(city,e.target.checked)}/>{city}
            </label>
          )}
        </div>
        <button className='filter__btn' onClick={handleFilter}>Filter</button>
      </div>
    </div>
  );
};

export default Filter;
