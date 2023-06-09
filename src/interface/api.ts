interface IResponsePostData{
  updatedRange?:string
}
interface IResponseArea{
  province:string,
  city:string
}
interface IResponseSize{
  size:number
}
interface IResponseData{
  uuid: string,
  komoditas: string,
  area_provinsi: string,
  area_kota: string,
  size: string,
  price: string,
  tgl_parsed: string,
  timestamp: string
}

interface IFormData{
  size:number,
  price:number,
  komoditas:string,
  areaProvinsi:string,
  areaKota:string
}
