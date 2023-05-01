import {
  DATA_ACTION,
  IAppAction,
  IFilterPayload,
  IGetDataPayload, ILoadingPayload,
  ISearchPayload,
  ISortPayload
} from "@/interface/actions";
import { IData, IState } from "@/interface/state";
import { combineReducers } from "redux";

const initialState:IState={
  sortBy:{
    key:'',
    asc:true
  },
  search:'',
  filter:[],
  data:[],
  isLoading:false,
  listCity:[],
  listProvince:[],
  listSize:[]
}
const appReducer =(state =initialState, action:IAppAction)=>{
  switch (action.type) {
    case DATA_ACTION.GET_DATA:
      const payloadGetData=(action.payload as IGetDataPayload)
      // eslint-disable-next-line no-case-declarations
      const parsedListData:IData[]=
        payloadGetData.listData
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

      const parsedListCity= Array.from(new Set(payloadGetData.listArea.map((data)=>data.city) ))
      const parsedListProvince= Array.from(new Set(payloadGetData.listArea.map((data)=>data.province)))
      const parsedListSize= payloadGetData.listSize.map((data)=>isNaN(data.size) ? 0:  Number(data.size)).sort((a,b)=>a-b)
      return {
        ...state,
        data:parsedListData,
        listCity:parsedListCity,
        listProvince:parsedListProvince,
        listSize:parsedListSize,
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
    case DATA_ACTION.LOADING:
      const {isLoading}=(action.payload as ILoadingPayload)
      return {
        ...state,
        isLoading,
      }
    default:
      return state
  }
}


export const combinedReducer = combineReducers({
  appReducer,
});
