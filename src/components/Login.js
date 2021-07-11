
import React,{useState} from 'react'
import Detail_Portfolio from './Detail_Portfolio'
import axios from 'axios'
import {useHistory,Link} from 'react-router-dom'
import './Login.css'
function Login(){
    let history =useHistory();
    let userInfo = null;
    const myStorage = window.localStorage;
    const [login,setLogin] = useState({})
    const alterInput = (e)=>{
        const {value,name} = e.target;
        setLogin({
            ...login,
            [name]:value
        })
        //console.log(login)
    }
    const handleSubmit = ()=>{
        axios.post(process.env.REACT_APP_API +'authenticate',login)
        .then(response => {
            myStorage.setItem('jwt',response.data.jwt)
            myStorage.setItem('username',login.username)
            axios.get(process.env.REACT_APP_API +'quyen/'+login.username,{headers:{authorization: 'Bearer ' + response.data.jwt}})
            .then(res => {
                let quyen = res.data;
                console.log(quyen)
                myStorage.setItem('quyen',quyen)
                if(quyen == 1)
                    history.push('/admin/index')
                else if(quyen == 2)
                    history.push('/')
                else if(quyen == 3)
                history.push('/nhanvien/index')
            })
            .catch(err =>{})
            
        })
        .catch(erro => alert('login thất bại !!!'))
    }
    return(
        <div className='container-fluid'>
                <div className='row'>
                    {/* <div className='col-4'>               
                        <Detail_Portfolio />
                        <Detail_Portfolio />
                    </div> */}
                    <div className='col-12'>               
                        <div className="login_container">
                            <div className="login_form">
                                <div className="login_logo">
                                    <i className="fa fa-user-secret" aria-hidden="true"></i>
                                </div>
                                <h3>ĐĂNG NHẬP</h3>
                                <div className="username">
                                    <input type="text" name ="username" placeholder="Username" value={login.usename} onChange={alterInput} required/>
                                </div>
                                <div className="password">
                                    <input type="password" name ="password" placeholder="Password" value={login.password} onChange={alterInput} required/>
                                </div>
                                <div className="info">
                                    <Link to="/register"><a>Tạo tài khoản</a><br    /></Link>
                                    <Link to="/forget"><a>Quên mật khẩu</a><br    /></Link>
                                </div>
                                <div className="submit" type="submit">
                                    <button onClick={handleSubmit}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}
export default Login