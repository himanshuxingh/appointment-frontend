
import { Link } from "react-router-dom";



export function UserError(){
    return(
        <div>
             <h1 className="mt-4 p-4">invalid credentials</h1>
             <Link to='/login' className="btn btn-primary">try again</Link>
        </div>
    )
}