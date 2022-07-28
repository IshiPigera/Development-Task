import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Login from './pages/Login'
import Notes from './Notes'


function CheckLogin() {
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() =>{
    const checkLogin = async () =>{
      const token = localStorage.getItem('myToken')
      if(token){
        const verify = await axios.get('http://localhost:8081/student/tokenVerify',{
          headers:{ Auth: token}
        })
        console.log(verify)
        setIsLogin(verify.data)
        if(verify.data === false) return localStorage.clear()
      }else{
        setIsLogin(false)
      }
    }
    checkLogin()
  }, [])

  return (
    <div className="App">
      {
        isLogin 
        ? <Notes setIsLogin={setIsLogin} /> 
        : <Login setIsLogin={setIsLogin} />
      }
    </div>
  );
}

export default CheckLogin;
