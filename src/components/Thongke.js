import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { Bar } from "react-chartjs-2";
export default function Thongke() {
    const [tk,setTK] = useState([])
    const [data,setData] = useState();
    //const [options,setOptions] = useState();
    const header = {
        headers: {
            Authorization: 'Bearer ' + window.localStorage.getItem('jwt') //the token is a variable which holds the token
          }
    }
    useEffect(()=>{
        axios.get(process.env.REACT_APP_API+'thongke/',header)
        .then(res => setTK(res.data))
        .catch(err => console.log(err))
    },[])
    useEffect(()=>{
        const labels = tk.map(t =>{
            return t.tensp
        })
        //
        const soluong = tk.map(t =>{
            return t.soluong
        })
        const myData = {
            labels:labels,
            datasets:[{
                label:"Số lượng đã bán",
                backgroundColor: [
                    "#3e95cd",
                    "#8e5ea2",
                    "#3cba9f",
                    "#e8c3b9",
                    "#c45850"
                ],
                data:soluong
            }]
        }
        setData(myData)


        
    },[tk])
    const options={
        legend: { display: false },
        title: {
          display: true,
          text: "Thống kê top 10 sản phẩm bán chạy trong năm"
        }
      }
    return (
        <div style={{width:'70%',marginTop:'8vh',marginLeft:'10vh'}}>
            <h4 className='mb-4'>TOP 10 SẢN PHẨM CÓ SỐ LƯỢNG MUA NHIỀU NHẤT</h4>
            <Bar data={data} options = {options} />
        </div>
    )
}
