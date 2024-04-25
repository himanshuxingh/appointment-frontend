import axios from "axios";
import Axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"
import { useNavigate, Link } from "react-router-dom"
const API_URI= "https://appointment-backend-p5of.onrender.com" 
// https://appointment-backend-p5of.onrender.com/

export function UserDashBoard() {
    const [cookies, setCookie, removeCookie] = useCookies('userid');
    const [appointments, setAppointments] = useState([{ Appointment_Id: 0, Title: '', Description: '', Date: Date(), UserId: '' }]);
    const [editAppointment, setEditAppointment] = useState([{ Appointment_Id: 0, Title: '', Description: '', Date: Date(), UserId: '' }]);
    const formik = useFormik({
        initialValues: {
            Appointment_Id: 0,
            Title: "",
            Description: "",
            Date: "",
            UserId: cookies['userid']
        },
        onSubmit: appointment => {
            Axios.post(`${API_URI}/add-task`, appointment)
                .then(() => {
                    window.location.reload();
                    alert("task added succesfully");
                });
        }

    });
    let navigate = useNavigate();
    function LoadAppointments() {
        Axios.get(`${API_URI}/get-appointments/${cookies['userid']}`)
            .then(response => {
                setAppointments(response.data);
            })
    }

    useEffect(() => {
        LoadAppointments();
    }
        , []);

    function handleSignOut() {
        removeCookie('userid');
        navigate('/');
    }
    function handleRemoveClick(appointment_Id) {
        Axios.delete(`${API_URI}/remove-task/${appointment_Id}`)

        window.location.reload();
    }

    // EDIT FORMIK

    function handleEditClick(id) {
        Axios.get(`${API_URI}/appointments/${id}`)
            .then(response => {
                setEditAppointment(response.data);
            });
    }

    const editFormik = useFormik({
        initialValues: {
            Appointment_Id: 0,
            Title: "",
            Description: "",
            Date: "",
            UserId: cookies['userid']
        },
        onSubmit: (appointment) => {
            Axios.put(`${API_URI}/edit-task/${appointment.Appointment_Id}`, appointment)
                .then(() => {
                    alert('updated succesfully..');
                    window.location.reload();
                })
        },
        enableReinitialize: true

    });
    return (
        <div className="row pt-4">
            <div className="col-7">
                <button style={{}} className=" bi bi-calendar ps-4 pe-5 btn btn-warning" data-bs-target="#AddTask" data-bs-toggle="modal" to=''> add task</button>
                <div className="modal fade" id="AddTask">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <form onSubmit={formik.handleSubmit}>
                                <div className="modal-header">
                                    <h2>Add New Appointment</h2>
                                    <button type="button" className="btn btn-close" data-bs-dismiss="modal"></button>
                                </div>
                                <div className="modal-body">
                                    <dl>
                                        <dt>Appointment_Id</dt>
                                        <dd><input name="Appointment_Id" onChange={formik.handleChange} type="number" /></dd>
                                        <dt>Title</dt>
                                        <dd><input onChange={formik.handleChange} type="text" name="Title" className="form-control" /></dd>
                                        <dt>Description</dt>
                                        <dd>
                                            <textarea onChange={formik.handleChange} name="Description" className="form-control" id="" cols="30" row="10"></textarea>
                                        </dd>
                                        <dt>Date</dt>
                                        <input onChange={formik.handleChange} name="Date" type="date" className="form-control" />
                                    </dl>
                                </div>
                                <div className="modal-footer">
                                    <button data-bs-dismiss="modal" className="bi bi-calender-date btn btn-info">Add Task</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


            <div className="col-5">
                <h3>{cookies['userid']}-Dashboard <button onClick={handleSignOut} className="btn btn-danger">signout</button></h3>

                <div className="mt-4">
                    {
                        appointments.map(appointment =>
                            <div className="alert alert-success alert-dismissible" key={appointment.Appointment_Id}>
                                <button onClick={() => handleRemoveClick(appointment.Appointment_Id)} className="btn btn-close"></button>
                                <h2 className="alert-title">{appointment.Title}</h2>
                                <p className="alert-text">
                                    {appointment.Description}
                                </p>
                                <p>
                                    {appointment.Date}
                                </p>
                                <button data-bs-target="#EditTask" data-bs-toggle="modal" onClick={() => { handleEditClick(appointment.Appointment_Id) }} className="bi bi-pen-fill btn btn-warning"> Edit Task</button>
                                <div className="modal fade" id="EditTask">
                                    <form onSubmit={editFormik.handleSubmit}>
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h2>Edit Task</h2>
                                                <button type="button" data-bs-dismiss="modal" className=" mt-3 me-3 btn btn-close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <dl>
                                                    <dt>Appointment_id</dt>
                                                    <dd><input name="Appointment_Id" value={editAppointment[0].Appointment_Id} onChange={editFormik.handleChange} type="number" /></dd>
                                                    <dt>Title</dt>
                                                    <dd><input name="Title" value={editAppointment[0].Title} onChange={editFormik.handleChange} type="text" className="form-control" /></dd>
                                                    <dt>Description</dt>
                                                    <dd>
                                                        <textarea name="Description" value={editAppointment[0].Description} onChange={editFormik.handleChange} className="form-control" id="" cols="30" row="10"></textarea>
                                                    </dd>
                                                    <dt>Date</dt>
                                                    <input name="Date" value={editAppointment[0].Date} onChange={editFormik.handleChange} type="date" className="form-control" />
                                                </dl>
                                                <button type="submit" data-bs-dismiss="modal" className="bi bi-floppy-fill btn btn-primary"> Save</button>
                                            </div>
                                        </div>
                                    </div>

                                    </form>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}