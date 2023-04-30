import { DATA_ACTION } from "@/interface/actions";
import { ThunkAction } from "redux-thunk";
import { fetchList } from "@/api";
import { IFilter, ISort } from "@/interface/state";

export const setListData=(listData:IResponseData)=>{
  return {
    type: DATA_ACTION.GET_DATA,
    payload: {
      listData
    }
  };
}

export function getAllData():ThunkAction<void, any, any, any>{
  return async (dispatch) => {
    try{
      const response = await fetchList()
      dispatch(setListData(response))
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

