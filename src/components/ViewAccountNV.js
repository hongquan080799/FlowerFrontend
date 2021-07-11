import React,{useState,useEffect} from 'react'
import axios from 'axios'
export default function ViewAccount() {
    const [user,setUser] = useState(null);
    const [changePass,setChangePass] =useState(false)
    const myStore = window.localStorage;
    const [tk,setTk] =useState({})
    const jwt = myStore.getItem('jwt')
    const header = {
        headers: {
            Authorization: 'Bearer ' + jwt //the token is a variable which holds the token
          }
    }
    const username = myStore.getItem('username')

    const submitUpdate = ()=>{
        axios.put(process.env.REACT_APP_API +'nhanvien/',user,header)
        .then(response => {
            alert('Sửa thành công')
            setChangePass(false)
        })
        .catch(error => console.log(error))
    }
    const handlChangeTK = (e)=>{
        const {value,name} = e.target
        setTk({
            ...tk,
            [name]:value
        })
    }
    useEffect(()=>{
        if(username)
        {
          axios.get(process.env.REACT_APP_API +'nhanvien/'+username,header)
        .then(response => {

          setUser(response.data) ;
          setTk({
              username:response.data.taikhoan?.username,
              password:response.data.taikhoan?.password
          })
        })
        .catch(error => console.log(error))  

        
        }
    },[])
    const handleChange = (e)=>{
        const {name,value} = e.target;
        setUser({
            ...user,
            [name]:value
        })
    }
    const changePassWord = ()=>{
        axios.put(process.env.REACT_APP_API +'taikhoan/',tk,header)
        .then(response => alert('Sửa thành công'))
        .catch(error => console.log(error))
    }
    return (
        <div className="workplace">
            {!changePass?
            <div className="card mt-4" style={{width: '80%'}}>
                <div className="card-header bg-info text-white">THÔNG TIN TÀI KHOẢN</div>
              <div className="card-body">
               Họ
               <input type="text" className="form-control mb-2 mr-sm-2" defaultValue={user?.ho} name="ho" onChange={handleChange}/>
               Tên
               <input type="text" className="form-control mb-2 mr-sm-2" defaultValue={user?.ten} name="ten" onChange={handleChange} />
               Giới tính
                
                    <select className="custom-select my-1 mr-sm-2" defaultValue={user?.gioitinh} name="gioitinh" onChange={handleChange}>
                        <option defaultValue={0}>Nam</option>
                        <option defaultValue={1}>Nữ</option>
                    </select> 
                
               Số điện thoại
               <input type="text" className="form-control mb-2 mr-sm-2" defaultValue={user?.sdt} name="sdt" onChange={handleChange}/>
               Email
               <input type="text" className="form-control mb-2 mr-sm-2" defaultValue={user?.email} name="email" onChange={handleChange}/>
               Địa chỉ
               <input type="text" className="form-control mb-2 mr-sm-2" defaultValue={user?.diachi} name="diachi" onChange={handleChange}/> 
            
                <button type="button" className="btn btn-primary mr-4 mt-4" data-dismiss="modal" onClick={()=>setChangePass(true)}>Thay đổi mật khẩu</button>
                <button type="button" className="btn btn-outline-primary mt-4" data-dismiss="modal" onClick={submitUpdate}>Lưu thay đổi mật khẩu</button>
              </div>
            </div>
            :
            <div className="card mt-4" style={{width: '50%'}}>
              <div className="card-body">
                <h5 className="card-title">Thay đổi mât khẩu</h5>
                <p>Username</p>
                <input type="text" className="form-control mb-2 mr-sm-2" placeholder="Nhập username" name="username" value={tk.username} disabled/>
                <p>Password</p>
                <input type="password" className="form-control mb-2 mr-sm-2" placeholder="Nhập password" name="password" onChange={handlChangeTK} value={tk.password} />
                <button className="btn btn-primary mr-4 mt-3" type="button" onClick={changePassWord}>Xác nhận</button>
                <button className="btn btn-outline-primary mr-4 mt-3" type="button" onClick={()=> setChangePass(false)}>Thoát</button>
              </div>
            </div>
            
            }
        </div>
    )
}
