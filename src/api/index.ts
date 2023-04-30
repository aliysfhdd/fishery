import SteinStore from "stein-js-client";

const store = new SteinStore(
  "https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4"
);

export const fetchList= async ():Promise<IResponseData>  =>{
  return await store.read("list")
}
