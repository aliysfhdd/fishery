import { IFilter, ISort } from "@/interface/state";

export enum DATA_ACTION {
  GET_DATA = 'GET_DATA',
  SORT_DATA = 'SORT_DATA',
  SEARCH_DATA = 'SEARCH_DATA',
  FILTER_DATA = 'FILTER_DATA',
  LOADING = 'LOADING',
}

export type APP_ACTION =
  | DATA_ACTION

interface IBaseAction{
  type: APP_ACTION;
}

export interface IGetDataPayload {
  listData: IResponseData[];
}

export interface ISortPayload {
  sortBy: ISort
}

export interface ISearchPayload {
  search: string;
}

export interface IFilterPayload {
  filter:IFilter[]
}
export interface ILoadingPayload {
  isLoading:boolean
}
export interface IAppAction extends IBaseAction {
  payload:
    | IGetDataPayload
    | ISortPayload
    | ISearchPayload
    | IFilterPayload
    | ILoadingPayload
}
