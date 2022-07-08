
//import NavBar from "../ui/NavBar";
import "./AdminHomePage.css"

const AdminHomePage = () => {
    const user = JSON.parse(localStorage.getItem("loginDetails"));

    // header 
    // navigation 
    // registration page 


    return (

        <div>
            <h1 className="header__admin"> Welcome {user.body.firstName} to Admin Console </h1>
            
            
            <div className="navBox">
            <div class="navbar">
                
                <a href="/home/admin/project/add"> Create Project </a>
                <a href="/home/user/registration"> Create User </a>
                <a href="/home/admin/role"> Assign Project</a>
                
                </div>
           
            </div>
    


        </div>
    )

};

export default AdminHomePage;