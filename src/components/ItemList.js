import React,{useEffect,useState} from 'react'
import Item from './Item'
import './ItemList.css'
import axiosClient from '../API/AxiosClient'
import {useParams} from 'react-router-dom'
export default function ItemList (){
    const [products,setProducts] = useState([])
    const {madm} = useParams();
    useEffect(async()=>{
        if(!madm){
          try {
            const data = await axiosClient.get('sanpham',null);
            setProducts(data);
          } catch (error) {
            console.log(error)
          }
        }
      }
    ,[]) 
    useEffect(async()=>{
      if(madm){
        try {
          const data = await axiosClient.get('sanpham/danhmuc/'+madm,null);
          setProducts(data);
        } catch (error) {
          console.log(error)
        }
      }
    }
  ,[madm]) 

    return (
        <div className='my-carousel mt-4'>
            <h3 className='list-item__header'>DANH SÁCH HOA LÃNG MẠN</h3>
            <div className='row text-center'>
                {products.map(product=>{
                    return (
                        <div className='col-sm-12 col-md-6 col-lg-6 col-xl-3'>
                            <Item product = {product} key={product.masp}/>
                        </div>
                    )
                })}
            </div>
            <nav aria-label="Page navigation example ">
              <ul className="pagination justify-content-center mt-4">
                <li className="page-item disabled">
                  <a className="page-link" to="/#" tabIndex={-1}>Previous</a>
                </li>
                <li className="page-item"><a className="page-link" to="/#">1</a></li>
                <li className="page-item"><a className="page-link" to="/#">2</a></li>
                <li className="page-item"><a className="page-link" to="/#">3</a></li>
                <li className="page-item">
                  <a className="page-link" to="/#">Next</a>
                </li>
              </ul>
            </nav>
            
        </div>
    )
}