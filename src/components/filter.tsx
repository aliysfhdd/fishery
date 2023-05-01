import React, { useEffect, useRef, useState } from 'react';
import { IFilter } from "@/interface/state";
import { filterBy } from "@/redux/actions";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import "./filter.scss"
const KEY_TO_FILTER={
  Kota: 'listCity',
  Provinsi: 'listProvince',
  Jumlah:'listSize',
}
const FILTER_TO_DATA={
  listCity:'areaKota',
  listProvince:'areaProvinsi',
  listSize:'size',
}
const Filter = ({ filterKey }:{filterKey: 'Kota' | 'Provinsi' | 'Jumlah'}) => {
  const [showDD, setShowDD] = useState(false);
  const [filterData, setFilterData] = useState(new Set());
  const listFilter= useSelector((state:RootState)=>state.appReducer[KEY_TO_FILTER[filterKey]])
  const existingFilter= useSelector((state:RootState)=>state.appReducer.filter)
  const listData= useSelector((state:RootState)=>state.appReducer.data)
  const dispatch:AppDispatch=useDispatch()
  const ref = useRef([]);

  useEffect(() => {
    setFilterData(new Set())
    dispatch(filterBy([]))
    for (const el of ref.current) {
      el.checked=false
    }
  }, [listData]);

  const updateFilter =(data,checked)=>{
    if(!checked) setFilterData((current)=>{
      current.delete(data)
      return current
    } )
    else setFilterData((current)=>{
      current.add(data)
      return current
    })
  }

  const handleFilter =()=>{
    let payload:IFilter[]
    if(existingFilter.filter((filter)=>filter.name===FILTER_TO_DATA[KEY_TO_FILTER[filterKey]]).length!==0){
      payload=existingFilter.map((filter)=>{
        if(filter.name===FILTER_TO_DATA[KEY_TO_FILTER[filterKey]]){
          filter.selected=Array.from(filterData)
        }
        return filter
      })
      console.log(payload)
    }
    else{
      payload=[
        {
          name:FILTER_TO_DATA[KEY_TO_FILTER[filterKey]],
          selected:Array.from(filterData)
        },
        ...existingFilter
      ]
    }
    dispatch(filterBy(payload))
    setShowDD(false)
  }
  return (
    <div className="filter">
      <div className="filter__dd" onClick={()=>setShowDD((prevState)=>!prevState)}>
        <select>
          <option>{filterData.size ? Array.from(filterData).join(', '): 'Pilih '+filterKey}</option>
        </select>
        <div className="filter__over"></div>
      </div>
      <div className="filter__wrapper" style={{display:showDD? 'block':'none'}}>
        <div className="filter__opt">
          {listFilter.map((city,idx)=>
            <label className='filter__label' htmlFor={''+idx+city} key={idx+city}>
              <input ref={(element) => { ref.current[idx] = element }}  type="checkbox" id={''+idx+city} onChange={(e)=>updateFilter(city,e.target.checked)}/>{city}
            </label>
          )}
        </div>
        <button className='filter__btn' onClick={handleFilter}>Filter</button>
      </div>
    </div>
  );
};

export default Filter;
