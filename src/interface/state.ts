export interface IData{
  uuid: string,
  komoditas: string,
  areaProvinsi: string,
  areaKota: string,
  size: number,
  price: number,
  tglParsed: Date,
  timestamp: string
}

export interface IFilter{
  name:string,
  selected:string[]
}

export interface ISort{
  key:string,
  asc:boolean
}
export interface IState{
  data:IData[],
  filter:IFilter[]
  search:string
  sortBy:ISort,
  isLoading: boolean,
  listCity:string[],
  listProvince:string[],
  listSize:number[]
}
