
import { Link,useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import Axios from "axios";
import { useState } from "react";
import {useCookies} from "react-cookie"
const API_URI= "https://appointment-backend-p5of.onrender.com" 

export function UserLogin() {
    const [cookies,setCookie,removeCookie]=useCookies('userid');
    const [users, setUsers] = useState([{ UserId: '', Password: '' }]);

    let navigate= useNavigate();
    const formik = useFormik({
        initialValues: {
            UserId: '',
            Password: ''
        },
        onSubmit: (formdata) => {
            Axios.get(`${API_URI}/get-users`)
                .then((response) => {
                    // setUsers(response.data);
                    var user=response.data.find(user => user.UserId === formdata.UserId);
                     if(user&&user.Password==formdata.Password){
                        setCookie('userid',formdata.UserId);
                        navigate('/dashboard');
                    }else{
                        navigate('/error');
                    }
                })
        }
    })



    return (
        <div style={{ height: '500px' }} className="ms-4 d-flex justify-content-start align-items-center">
            <div>
                <h1 className="bi bi-person-fill mb-4">User Login</h1>
                <form onSubmit={formik.handleSubmit} className="bg-white text-dark p-4">
                    <dl>
                        <dt>User Id</dt>
                        <dd><input onChange={formik.handleChange} className="form-control" type="text" name="UserId" /></dd>
                        <dt>Password</dt>
                        <dd><input onChange={formik.handleChange} type="password" className="form-control" name="Password" /></dd>
                    </dl>
                    <button type="submit" onSubmit={formik.handleSubmit} className="btn btn-info w-100">Login</button>
                    <Link to='/resister' className="btn btn-link w-100 mt-2" >New User?Resister</Link >
                </form>
            </div>
        </div>
    )
}