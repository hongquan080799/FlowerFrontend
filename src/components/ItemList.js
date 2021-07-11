import React,{useEffect,useState} from 'react'
import Item from './Item'
import './ItemList.css'
import axiosClient from '../API/AxiosClient'
import {useParams} from 'react-router-dom'
export default function ItemList (){
    const [products,setProducts] = useState([])
    let {madm,num} = useParams();
    const [p,setP] = useState(0)
    const [pageNum,setPageNum] = useState(1)
    useEffect(async()=>{
        if(!madm){
          try {
            const data = await axiosClient.get('sanpham',null);
            setPageNum(data.length / 8)
            setProducts(data);
          } catch (error) {
            console.log(error)
          }
        }
        if(num){
          setP(Number(num) -1)
        }
      }
    ,[]) 
    useEffect(async()=>{
      if(madm){
        try {
          const data = await axiosClient.get('sanpham/danhmuc/'+madm,null);
          setPageNum(data.length / 8 )
          setProducts(data);
        } catch (error) {
          console.log(error)
        }
      }
    }
  ,[madm]) 
  const renderPage = ()=>{
      const items = []
      for(let i =0;i<pageNum;i++){
        items.push(<li className="page-item"><a className="page-link" href={'/page/'+Number(i+1)}>{i+1}</a></li>)
      }
      return items;
  }
    return (
        <div className='my-carousel mt-4'>
            <h3 className='list-item__header'>DANH SÁCH HOA LÃNG MẠN</h3>
            <div className='row text-center'>
                {products.slice(p *   8,  8 + p * 8).map(product=>{
                    return (
                        <div className='col-sm-12 col-md-6 col-lg-6 col-xl-3'>
                            <Item product = {product} key={product.masp}/>
                        </div>
                    )
                })}
            </div>
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-center">
                <li className={p  <=0?"page-item disabled":'page-item'}>
                  <a className="page-link" href={'/page/' +Number(p)} >Trang trước</a>
                </li>
                {renderPage()}
                
                <li className={p>=pageNum -1?"page-item disabled":'page-item'}>
                  <a className="page-link" href={'/page/' +Number(p+2)}>Trang tiếp</a>
                </li>
              </ul>
            </nav>
            
            
        </div>
    )
}