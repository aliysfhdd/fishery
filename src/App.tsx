import { useEffect, useState } from 'react';
import './App.scss'
import { useDispatch, useSelector } from "react-redux";
import { filterBy, getAllData } from "@/redux/actions";
import { AppDispatch, RootState } from "@/redux/store";
import Table from "@/components/table";
import { IData } from "@/interface/state";
import { TAB_TITLE } from "@/constant";
import Search from "@/components/search";
import Filter from "@/components/filter";
import { createPortal } from "react-dom";
import ModalAdd from "@/components/modalAdd";
import Loading from "@/components/loading";

function App() {
  const dispatch:AppDispatch=useDispatch()
  const listData= useSelector((state:RootState)=>state.appReducer.data)
  const sortParam= useSelector((state:RootState)=>state.appReducer.sortBy)
  const filterParam= useSelector((state:RootState)=>state.appReducer.filter)
  const searchParam= useSelector((state:RootState)=>state.appReducer.search)
  const isLoading= useSelector((state:RootState)=>state.appReducer.isLoading)
  const [showModal, setShowModal] = useState(false);
  const [tempData, setTempData] = useState<IData[]>([]);
  useEffect(() => {
    dispatch(getAllData())
  }, []);

  useEffect(() => {
    setTempData(listData)
    setShowModal(false)
  }, [listData]);

  useEffect(() => {
    const {key, asc} =sortParam
    if(key===TAB_TITLE.Harga || key=== TAB_TITLE.Jumlah || key===TAB_TITLE.Tanggal)
      setTempData(tempData.slice(0).sort((a,b)=> asc ? a[key]-b[key]:b[key]-a[key]))
    else
      setTempData(tempData.slice(0).sort((a,b)=> asc ? a[key]?.replace(/ /g, '').localeCompare(b[key]?.replace(/ /g, '')): b[key]?.replace(/ /g, '').localeCompare(a[key]?.replace(/ /g, ''))))
  }, [sortParam]);

  useEffect(() => {
    setTempData(listData.slice(0)
      .filter((data)=>data.komoditas?.toLowerCase().includes(searchParam.toLowerCase()))
      .filter((data)=> {
        let selected=true
        for (const filter of filterParam) {
          if(filter.selected.length>0 && !filter.selected.includes(data[filter.name])) {
            selected=false
            break;
          }
        }
        return selected
      }))
  }, [searchParam,filterParam]);

  return (
      <div className='home'>
        <h2>Data Komoditas</h2>
        <div className='home__header'>
          <Search/>
          <button onClick={()=>setShowModal(true)}>Tambah Data</button>
        </div>
        <div className='home__filter'>
          <Filter filterKey={'Kota'}/>
          <Filter filterKey={'Provinsi'}/>
          <Filter filterKey={'Jumlah'}/>
        </div>
        {tempData && <Table datas={tempData}/>}
        {showModal && !isLoading && createPortal(<ModalAdd onClose={()=>setShowModal(false)}/>, document.body)}
        {isLoading && createPortal(<Loading/>, document.body)}
      </div>
  )
}

export default App
