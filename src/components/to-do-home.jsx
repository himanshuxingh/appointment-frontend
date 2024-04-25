
import { Link } from "react-router-dom"

export function ToDoHome(){
    return(
        <div>
             <h1 className="text-end pt-4">Your Appointments</h1>
             <main style={{height:'400px'}} className="ms-4 d-flex justify-content-start align-items-center">
               <div className="d-flex">
               <Link to='/resister' className="btn btn-light me-2">New User Resister</Link>
                <Link to='/login' className="btn btn-info">User Login</Link>
               </div>
             </main>
        </div>
    )
}