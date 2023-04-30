import { useEffect, useState } from 'react';
import './App.css'
import { useDispatch, useSelector } from "react-redux";
import { filterBy, getAllData, searchCommodity, sortBy } from "@/redux/actions";
import { AppDispatch, RootState } from "@/redux/store";
import Table from "@/components/table";
import { IData, IFilter, ISort } from "@/interface/state";
import { TAB_TITLE } from "@/constant";

function App() {
  const dispatch:AppDispatch=useDispatch()
  const listData= useSelector((state:RootState)=>state.appReducer.data)
  const sort= useSelector((state:RootState)=>state.appReducer.sortBy)
  const [tempData, setTempData] = useState<IData[]>([]);
  useEffect(() => {
    dispatch(getAllData())
  }, []);

  useEffect(() => {
    setTempData(listData)
  }, [listData]);



  const handleSort= (key)=>{
    let asc=false
    if(key===sort.key){
      asc=!sort.asc
    }
    const payload:ISort={
      key,
      asc
    }
    dispatch(sortBy(payload))
    if(key===TAB_TITLE.Harga || key=== TAB_TITLE.Jumlah || key===TAB_TITLE.Tanggal)
      setTempData(tempData.slice(0).sort((a,b)=> asc ? a[key]-b[key]:b[key]-a[key]))
    else
      setTempData(tempData.slice(0).sort((a,b)=> asc ? a[key]?.replace(/ /g, '').localeCompare(b[key]?.replace(/ /g, '')): b[key]?.replace(/ /g, '').localeCompare(a[key]?.replace(/ /g, ''))))
  }

  const handleSearch =(e)=>{
    const search=e.target.value.toLowerCase()
    if(search.length>2){
      dispatch(searchCommodity(search))
      setTempData(tempData.slice(0).filter((data)=>data.komoditas.toLowerCase().includes(search)))
    }
    else{
      setTempData(listData)
    }
  }

  const handleFilter =(e)=>{
    const payload:IFilter[]=[]
    dispatch(filterBy(payload))
  }

  return (
    <>
      <div>
        <input onChange={handleSearch} placeholder={'search commodity...'}/>
        <select onChange={handleFilter} >
          <option value={'PURWOREJO'}>PURWOREJO</option>
          <option value={'PURWOREJO'}>KOTA TUA</option>
        </select>
        {tempData && <Table datas={tempData} onSort={handleSort}/>}
      </div>
    </>
  )
}

export default App
