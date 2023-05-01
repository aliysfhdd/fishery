import React, { Fragment, useState } from 'react';
import './modalAdd.scss'
import { TAB_TITLE } from "@/constant";
import { useDispatch } from "react-redux";
import { postData } from "@/redux/actions";
import { AppDispatch } from "@/redux/store";

const ModalAdd = ({onClose}) => {
  const dispatch:AppDispatch=useDispatch()
  const [form, setForm] = useState<IFormData>({
    size:0,
    price:0,
    komoditas:'',
    areaProvinsi:'',
    areaKota:''
  });
  const onSubmit=()=>{
    if(Object.values(form).includes(''))alert('You must fill all form!')
    else dispatch(postData(form))
  }
  return (
    <div className="modal">
      <div className="modal__content">
        <div className="modal__header">
          <h2>Tambah Data</h2>
        </div>
        <div className="modal__body">
          {
            Object.keys(TAB_TITLE).map((title)=>
              TAB_TITLE[title] === TAB_TITLE.Tanggal ? null :
              <Fragment key={title}>
                <label htmlFor={title}>{title}: </label>
                <input id={title} value={form[TAB_TITLE[title]]} onChange={(e)=>setForm((current)=> ({
                  ...current,
                  [TAB_TITLE[title]]:e.target.value
                }))} type={TAB_TITLE[title]===TAB_TITLE.Jumlah || TAB_TITLE[title]===TAB_TITLE.Harga ? 'number':'text'}/>
              </Fragment>
            )
          }
        </div>
        <div className="modal__footer">
          <button className="modal__btn-cancel" onClick={onClose}>Batal</button>
          <button className="modal__btn-submit" onClick={onSubmit}>Simpan</button>
        </div>
      </div>
    </div>
  );
};

export default ModalAdd;
