import React from 'react';
import { IData, ISort } from "@/interface/state";
import { TAB_TITLE } from "@/constant";
import { sortBy } from "@/redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import './table.scss'

const Table = ({datas}:{datas:IData[]}) => {
  const dispatch:AppDispatch=useDispatch()
  const sort= useSelector((state:RootState)=>state.appReducer.sortBy)
  const handleSort= (e)=>{
    const key=e.target.title
    let asc=true
    if(key===sort.key){
      asc=!sort.asc
    }
    const payload:ISort={
      key,
      asc
    }
    dispatch(sortBy(payload))
  }
  return (
    <div className='table__wrapper'>
      <table className='table__main'>
        <thead>
          <tr onClick={handleSort}>
            <th>No. </th>
            {Object.keys(TAB_TITLE).map((title)=>
              <th key={title} title={TAB_TITLE[title]}>
                {title} {sort.key!==TAB_TITLE[title] ? '': sort.asc ? '▴':'▾'}
              </th>)}
          </tr>
        </thead>
        <tbody>
        {
          datas.length===0 ? <tr><td colSpan={7}>No Data</td></tr> :
            datas.map((data,idx)=>
              <tr key={data.uuid}>
                <td>{idx+1}</td>
                <td>{data.komoditas || '-'}</td>
                <td>{data.areaKota || '-'}</td>
                <td>{data.areaProvinsi || '-'}</td>
                <td>{data.price || '-'}</td>
                <td>{data.size || '-'}</td>
                <td>{data.tglParsed.toDateString() || '-'}</td>
              </tr>
            )
        }
        </tbody>
      </table>
    </div>

  );
};

export default Table;
