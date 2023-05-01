import SteinStore from "stein-js-client";

const store = new SteinStore(
  "https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4"
);

export const fetchList= async ():Promise<IResponseData>  =>{
  return await store.read("list")
}

export const fetchOptArea= async ():Promise<IResponseData>  =>{
  return await store.read("option_area")
}
export const fetchOptSize= async ():Promise<IResponseData>  =>{
  return await store.read("option_size")
}

export const addData = async (data:IResponseData):Promise<IResponsePostData>  =>{
  return await store.append("list",[
    {...data}
  ])
}
