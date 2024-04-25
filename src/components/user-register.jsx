import Axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"
const API_URI= "https://appointment-backend-p5of.onrender.com" 


export function UserRegister() {

    const [error, setError] = useState('');
    const [color, setColor] = useState('');

    let navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            UserId: '',
            UserName: '',
            Password: '',
            Email: '',
            Mobile: ''
        },
        onSubmit: (user => {
            Axios.post(`${API_URI}/register-user`, user)
                .then(() => {
                    alert("registerd successfully");
                    navigate('/login');
                })
        })
    });
    // verify userId 
    function VerifyUserId(e) {
        Axios.get(`${API_URI}/get-users`)
            .then(response => {
                for (var user of response.data) {
                    if (user.UserId === e.target.value) {
                        setError('User Id taken -Try another');
                        setColor('red');
                        break;
                    } else {
                        setError('User Id available');
                        setColor('green');
                    }
                }
            })
    }

    return (
        <div style={{ width: '400px' }} className="d-flex justify-content-start border border-light border-2 p-4">
            <form onSubmit={formik.handleSubmit} className="m-3 p-4">
                <h3>Resister User</h3>
                <dl>
                    <dt>User Id</dt>
                    <dd><input className="form-control" onKeyUp={VerifyUserId} name="UserId" onChange={formik.handleChange} type="text" /></dd>
                    <dd style={{ color }}>{error}</dd>
                    <dt>User Name</dt>
                    <dd><input className="form-control" name="UserName" onChange={formik.handleChange} type="text" /></dd>
                    <dt>Password</dt>
                    <dd><input className="form-control" name="Password" onChange={formik.handleChange} type="password" /></dd>
                    <dt>Email</dt>
                    <dd><input className="form-control" name="Email" onChange={formik.handleChange} type="email" /></dd>
                    <dt>Mobile</dt>
                    <dd><input className="form-control" name="Mobile" onChange={formik.handleChange} type="text" /></dd>
                </dl>
                <button className="btn btn-dark w-100">Resister</button>
                <div className="mt-3 ms-2">
                    <Link className="mt-4" to='/login'>Existing user ? login </Link>
                </div>
            </form>

        </div>
    )
}