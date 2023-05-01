import { DATA_ACTION } from "@/interface/actions";
import { ThunkAction } from "redux-thunk";
import { addData, fetchList, fetchOptArea, fetchOptSize } from "@/api";
import { IFilter, ISort } from "@/interface/state";

export const setListData= (listData,listArea,listSize)=>{
  return {
    type: DATA_ACTION.GET_DATA,
    payload: {
      listData,
      listArea,
      listSize
    }
  };
}

export function getAllData():ThunkAction<void, any, any, any>{
  return async (dispatch) => {
    try{
      dispatch(setLoading(true))
      const data = await Promise.all([fetchList(),fetchOptArea(), fetchOptSize()])
      dispatch(setListData(...data))
      dispatch(setLoading(false))
    }
    catch (e) {
      console.log(e)
    }
  }
}
export function postData(data:IFormData):ThunkAction<void, any, any, any>{
  return async (dispatch) => {
    try{
      dispatch(setLoading(true))
      const date=new Date();
      const response = await addData({
        timestamp:+date,
        tgl_parsed:date,
        price:data.price,
        size:data.size,
        area_kota:data.areaKota,
        area_provinsi:data.areaProvinsi,
        uuid:+date,
        komoditas:data.komoditas
      } as IResponseData)
      dispatch(setLoading(false))
      if(response?.updatedRange){
        alert('Data has been added successfully!')
        dispatch(getAllData())
      }
    }
    catch (e) {
      console.log(e)
    }
  }
}

export const sortBy=(sort:ISort)=>{
  return {
    type: DATA_ACTION.SORT_DATA,
    payload: {
      sortBy:sort
    }
  };
}

export const searchCommodity=(search:string)=>{
  return {
    type: DATA_ACTION.SEARCH_DATA,
    payload: {
      search
    }
  };
}
export const filterBy=(filter:IFilter[])=>{
  return {
    type: DATA_ACTION.FILTER_DATA,
    payload: {
      filter
    }
  };
}

export const setLoading= (isLoading:boolean)=>{
  return{
    type:DATA_ACTION.LOADING,
    payload:{
      isLoading
    }
  }
}


