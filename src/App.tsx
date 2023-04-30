import { useEffect, useState } from 'react';
import './App.css'
import { useDispatch, useSelector } from "react-redux";
import { filterBy, getAllData, searchCommodity, sortBy } from "@/redux/actions";
import { AppDispatch, RootState } from "@/redux/store";
import Table from "@/components/table";
import { IData, IFilter, ISort } from "@/interface/state";
import { TAB_TITLE } from "@/constant";

const LIST=[
  'ACEH KOTA',
  'CIMAHI',
  'MEDAN',
]

function App() {
  const dispatch:AppDispatch=useDispatch()
  const listData= useSelector((state:RootState)=>state.appReducer.data)
  const sort= useSelector((state:RootState)=>state.appReducer.sortBy)
  const [tempData, setTempData] = useState<IData[]>([]);
  const [showDD, setShowDD] = useState(false);
  const [filterCity, setFilterCity] = useState(new Set());
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
      setTempData(listData.slice(0).sort((a,b)=> asc ? a[key]-b[key]:b[key]-a[key]))
    else
      setTempData(listData.slice(0).sort((a,b)=> asc ? a[key]?.replace(/ /g, '').localeCompare(b[key]?.replace(/ /g, '')): b[key]?.replace(/ /g, '').localeCompare(a[key]?.replace(/ /g, ''))))
  }

  const handleSearch =(e)=>{
    const search=e.target.value.toLowerCase()
      dispatch(searchCommodity(search))
      setTempData(listData.slice(0).filter((data)=>data.komoditas.toLowerCase().includes(search)))

  }

  const handleFilter =()=>{
    console.log(filterCity)
    const payload:IFilter[]=[
      {
        name:TAB_TITLE.Kota,
        selected:Array.from(filterCity)
      }
    ]
    dispatch(filterBy(payload))
    if(filterCity.size==0) setTempData(listData)
    else setTempData(listData.slice(0).filter((data)=>Array.from(filterCity).includes(data.areaKota)))
  }

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

  return (
    <>
      <div>
        <input onChange={handleSearch} placeholder={'search commodity...'}/>
        <div className="multiselect">
          <div className="selectBox" onClick={()=>setShowDD((prevState)=>!prevState)}>
            <select>
              <option>Select an option</option>
            </select>
            <div className="overSelect"></div>
          </div>
          <div id='checkboxes' style={{display:showDD? 'block':'none'}}>
            {LIST.map((city,idx)=>
              <label htmlFor={''+idx} key={idx}>
                <input type="checkbox" id={''+idx} onChange={(e)=>updateFilter(city,e.target.checked)}/>{city}
              </label>
            )}
          </div>
          <button onClick={handleFilter}>Filter</button>
        </div>
        {tempData && <Table datas={tempData} onSort={handleSort}/>}
      </div>
    </>
  )
}

export default App
