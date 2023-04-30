import {
  DATA_ACTION,
  IAppAction,
  IFilterPayload,
  IGetDataPayload,
  ISearchPayload,
  ISortPayload
} from "@/interface/actions";
import { IData, IState } from "@/interface/state";
import { combineReducers } from "redux";

const initialState:IState={
  sortBy:{
    key:'',
    asc:false
  },
  search:'',
  filter:[],
  data:[]
}
const appReducer =(state =initialState, action:IAppAction)=>{
  switch (action.type) {
    case DATA_ACTION.GET_DATA:
      // eslint-disable-next-line no-case-declarations
      const parsedListData:IData[]=
        (action.payload as IGetDataPayload).listData
          .filter((data)=>data.uuid!==null)
          .map((data)=>
            ({
              uuid: data.uuid,
              komoditas: data.komoditas,
              areaProvinsi: data.area_provinsi,
              areaKota: data.area_kota,
              size: Number(data.size) | 0,
              price: Number(data.price) | 0,
              tglParsed: new Date(data.tgl_parsed),
              timestamp: data.timestamp
            } as IData)
          )
      return {
        ...state,
        data:parsedListData
      }
    case DATA_ACTION.SORT_DATA:
      const { sortBy }=(action.payload as ISortPayload)
      return {
        ...state,
        sortBy
      }
    case DATA_ACTION.SEARCH_DATA:
      const {search}=(action.payload as ISearchPayload)
      return {
        ...state,
        search
      }
    case DATA_ACTION.FILTER_DATA:
      const {filter}=(action.payload as IFilterPayload)
      return {
        ...state,
        filter,
      }
    default:
      return state
  }
}


export const combinedReducer = combineReducers({
  appReducer,
});
