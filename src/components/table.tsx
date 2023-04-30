import React from 'react';
import { IData } from "@/interface/state";
import { TAB_TITLE } from "@/constant";

const Table = ({datas, onSort}:{datas:IData[], onSort:(key)=>void}) => {
  const handleSort=(event)=>{event.target.title && onSort(event.target.title)}
  return (
    <table>
      <thead>
        <tr onClick={handleSort}>
          <td>No. </td>
          {Object.keys(TAB_TITLE).map((title)=><th key={title} title={TAB_TITLE[title]}>{title}</th>)}
        </tr>
      </thead>
      <tbody>
      {datas.map((data,idx)=>
        <tr key={data.uuid}>
          <td>{idx+1}</td>
          <td>{data.komoditas}</td>
          <td>{data.areaKota}</td>
          <td>{data.areaProvinsi}</td>
          <td>{data.price}</td>
          <td>{data.size}</td>
          <td>{data.tglParsed.toDateString()}</td>
        </tr>
      )}
      </tbody>
    </table>
  );
};

export default Table;
