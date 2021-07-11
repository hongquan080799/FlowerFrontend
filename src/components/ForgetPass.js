import React,{useState,useEffect} from 'react'
import emailjs from 'emailjs-com'
import axios from 'axios'
import {useHistory} from 'react-router-dom'


export default function ForgetPass() {
    const history = useHistory();
    const[user,setUser] = useState()
    const [username,setUsername] = useState('')
    const [key,setKey] = useState();
    const [restore,setRestore] = useState(false)
    const [newPass,setNewPass] = useState('')
    const [code,setCode] =useState('')
    useEffect(()=>{
        setKey(Number(Math.floor(Math.random() * 100000)) )
    },[])
    const sendEmail = (email)=>{
        var templateParams = {
            to_name:user?.ho + ' '  + user?.ten,
            from_name: 'Chủ tịch Hồng Quân',
            message:'Mã phục hồi tài khoản là : ' + key,
            notes: 'Check this out!',
            email:email
        };
         
        emailjs.send('service_c4h4x3s', 'template_au2r4sv', templateParams,'user_eXT3mcACRHWvnrHkCZPaZ')
            .then(function(response) {
               console.log('SUCCESS!', response.status, response.text);
            }, function(error) {
               console.log('FAILED...', error);
            });
    } 
    const handleSubmit = (e)=>{
        e.preventDefault();
        axios.get(process.env.REACT_APP_API +'restore/'+username)
        .then(res => {
            setUser(res.data)
            sendEmail(res.data.email)
            alert('Gửi mã xác thực qua email. Vui lòng kiểm tra !')
            setRestore(true)
        })
        .catch(err => alert('Thông tin username sai !!!' + err))
        
    }
    const handleRestore = (e)=>{
        e.preventDefault();
        if(code == key){
            axios.put(process.env.REACT_APP_API +'restore/',{username:username,password:newPass})
            .then(res => {
                alert('Thay đổi mật khẩu thành công')
                history.push("/")
            })
            .catch(err => alert('Thay đổi mật khẩu thất bại'))
        }
        else{
            alert('Mã xác thực sai')
        }
        
    }
    return (
        <div>
            {!restore?
            <div className="card mt-4" style={{width: '30rem'}}>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                  <label htmlFor="formGroupExampleInput">Username đã đăng ký</label>
                    <input type="text" name="username" className="form-control" id="formGroupExampleInput" placeholder="Nhập Username" required onChange={(e)=> setUsername(e.target.value)} value={username}/>
                  </div>
                  <button type="submit" className="btn btn-info">Xác nhận</button>
                </form>
                
              </div>
            </div>:
            <div className="card mt-4" style={{width: '30rem'}}>
            <div className="card-body">
              <form onSubmit={handleRestore}>
                <div className="form-group">
                <label htmlFor="formGroupExampleInput1">Nhập mã xác thực</label>
                  <input type="text" name="code" className="form-control" id="formGroupExampleInput1" placeholder="Nhập code" required onChange={(e)=> setCode(e.target.value)} value={code}/>
                <label htmlFor="formGroupExampleInput2">Nhập mật khẩu mới</label>
                  <input type="password" name="password" className="form-control" id="formGroupExampleInput2" placeholder="Nhập mật khẩu mới" required onChange={(e)=> setNewPass(e.target.value)} value={newPass}/>
                </div>
                <button type="submit" className="btn btn-info">Xác nhận</button>
              </form>
              
            </div>
          </div>}
            
        </div>
    )
}
