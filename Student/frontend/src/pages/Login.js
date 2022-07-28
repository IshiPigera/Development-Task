import React, { useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

export default function Login({ setIsLogin }) {
    const [user, setUser] = useState({ studentId: '', studentName: '', email: '', gender: '', password: '' })
    const [err, setErr] = useState('')
    const [studentData , setStudentData ] = useState('');

    const onChangeInput = e => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
        setErr('')
    }

    const registerSubmit = async e => {
        e.preventDefault()
        try {

            console.log("res id",studentData._id)
            const res = await axios.put(`http://localhost:8081/student/studentRegister/update/${studentData._id}`, {
                studentId: user.studentId,
                studentName: user.studentName,
                email: user.email,
                gender: user.gender,
                password: user.password,
                studentStatus:'N'
            })

            if(res.data.status == 200){
                console.log("update res",res)
                setUser({ studentId: '', studentName: '', email: '', gender: '', password: '' })
                setErr(res.data.message)
                setOnLogin(false)
                
            }else{
                Swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    title: 'Technical error',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
           
        } catch (err) {
            err.response.data.message && setErr(err.response.data.message)
        }
    }

    const loginSubmit = async e => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:8081/student/studentRegister/login', {
                email: user.email,
                password: user.password
            })



            if (res.data.state) {

                const studentData = res.data;
                console.log("dataaa",studentData.userState)
                setStudentData(studentData.userState);

                if(studentData.userState.studentStatus == 'Y'){
                    setOnLogin(true);
                }else{
                    setUser({ studentId: '', studentName: '', email: '', gender: '', password: '' })
                    localStorage.setItem('myToken', res.data.token)
                    setIsLogin(true)
    
                }

            
            } else {

                Swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    title: 'password or userName is not correct',
                    showConfirmButton: false,
                    timer: 1500
                })

            }




        } catch (err) {
            err.response.data.message && setErr(err.response.data.message)
        }
    }

     
    const [onLogin, setOnLogin] = useState(false)
    const style = {
        visibility: onLogin ? "visible" : "hidden",
        opacity: onLogin ? 1 : 0
    }

    return (
        <section className="login-page">
            <div className="login create-note">
                <h2>Login</h2>
                <form onSubmit={loginSubmit}>
                    <input type="email" name="email" id="login-email"
                        placeholder="Email" required value={user.email}
                        onChange={onChangeInput} />

                    <input type="password" name="password" id="login-password"
                        placeholder="Password" required value={user.password}
                        autoComplete="true"
                        onChange={onChangeInput} />

                    <button type="submit">Login</button>
                     
                    <h3>{err}</h3>
                </form>
            </div>
            <div className="register create-note" style={style}>
                <h2>Register</h2>
                <form onSubmit={registerSubmit}>
                    <input type="text" name="studentId" id="studentId"
                        placeholder="Student Id" required value={user.studentId}
                        onChange={onChangeInput} />

                    <input type="text" name="studentName" id="studentName"
                        placeholder="Student Name" required value={user.studentName}
                        onChange={onChangeInput} />

                    <input type="email" name="email" id="email"
                        placeholder="Email" required value={user.email}
                        onChange={onChangeInput} />

                    <input type="gender" name="gender" id="gender"
                        placeholder="Gender" required value={user.gender}
                        onChange={onChangeInput} />

                    <input type="password" name="password" id="password"
                        placeholder="Password" required value={user.password}
                        autoComplete="true" onChange={onChangeInput} />

                    <button type="submit">Register</button>
                     
                    <h3>{err}</h3>
                </form>
            </div>
        </section>
    )
}
