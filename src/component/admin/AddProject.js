import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import "./AddProject.css"
const AddProject = () => {

    const [error, setError] = useState();


    const navigate = useNavigate();
    /*
        const [projectName, setProjectName] = useState();
        const [projectId, setProjectId] = useState();
        const [clientName, setClientName] = useState();
        const [version, setVersion] = useState();
        const [ownerId, setOwnerId] = useState();
        const [ownerName, setOwnerName] = useState();
        const [adminId, setAdminId] = useState();
        const [adminName, setAdminName] = useState();
        const [projectData, setProjectData] = useState();
    
        const [submitted, setSubmitted] = useState(false);
        const [error, setError] = useState(false);
    
    
    
        const projectNameHandler = (e) => {
            setProjectName(e.target.value);
            setSubmitted(false);
        }
    
        const projectIdHandler = (e) => {
            setProjectId(e.target.value);
            setSubmitted(false);
        }
        
    
        const clientNameHandler = (e) => {
            setClientName(e.target.value);
            setSubmitted(false);
        }
        
        const versionHandler = (e) => {
            setVersion(e.target.value);
            setSubmitted(false);
        }
        const ownerIdHandler = (e) => {
            setOwnerId(e.target.value);
            setSubmitted(false);
        }
        const ownerNameHandler = (e) => {
            setOwnerName(e.target.value);
            setSubmitted(false);
        }
        const adminIdHandler = (e) =>{
             setAdminId(e.target.value);
             setSubmitted(false);
        }
        const adminNameHandler = (e) => {
            setAdminName(e.target.value);
            setSubmitted(false);
        }
    
        const generateProjectId = () => {
    
            const rand = Math.random() * 1000;
            return "VOW" + rand;
        }
    
       
    
        const createProjectData = () => {
            console.log("creating project Object .. ")
           // const pid= generateProjectId();
            const project = {
                "_id": projectId,
                projectName,
                version,
                clientName,
                creationDate: new Date(),
                owner: {
                    "_id": ownerId,
                    "name": ownerName
                },
                admin: {
                    "_id": adminId,
                    "name": adminName
                }
    
    
    
            }
    
            console.log("Project Object is " + JSON.stringify(project));
            setProjectData(project);
    
        }
    
        const saveProject2DB = () => {
    
    
            fetch("https://5w3a2f7pqh.execute-api.ap-southeast-1.amazonaws.com/dev/project", {
    
                method: "POST",
                body: JSON.stringify(projectData),
                headers: {
                    "Content-type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            }).then(response => {
    
    
                return response.json()
    
            }).then(data => {
                console.log("Project " + projectId + "created successfully in DB ");
                navigate("/home/admin");
    
            })
                .catch(error => console.log("there was error in user registration " + error));
    
            // saveProject2DB
        };
    */
    const submitHandler = (event) => {
        event.preventDefault();
        const projectData = new FormData(event.currentTarget);

        const project = {
            "id": projectData.get("projectId"),
            projectName: projectData.get("projectName"),
            //version,
            client_name: projectData.get("clientName"),
            creation_date: new Date(),
            owner: projectData.get("ownerName"),
            admin: projectData.get("adminName"),
            users: [
                { "id": "Rakesh.Ranjan@bosch.com" }
            ]



        }

        // alert("Project Object is " + JSON.stringify(project));

        // save to db 

        fetch("https://5w3a2f7pqh.execute-api.ap-southeast-1.amazonaws.com/dev/project", {

            method: "POST",
            body: JSON.stringify(project),
            headers: {
                "Content-type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        }).then(response => {


            return response.json()

        }).then(data => {

            if (data.statusCode === 409) {
                setError({
                    isError: true,
                    errorMessage: "Project already exist in system "
                })

                alert("Project name already exist ")
                Promise.reject("Project name already exist ")
            }
            else {
                if(data.statusCode === 200)
                alert("Project added successfully ")
                navigate("/home/admin");
            }




        })
            .catch(error => console.log("there was error in user registration " + error));


    }





    const AddProjectForm = () => {

        /*<div className="row">
                        <label className="col-10">Project Name</label>
                        <input className="col-90" type="text"  id="projectName" ></input>
                    </div>
    
    
    
                    */


        return (



            <div className="book__form">

                <form onSubmit={submitHandler}>

                    <div className="form__group">
                        <label className="form__label">Project ID</label>
                        <input className="form__input" id="projectId" name="projectId" type="text" ></input>
                    </div>

                    <div className="form__group">
                        <label className="form__label">Project Name</label>
                        <input className="form__input" type="text" name="projectName" ></input>
                    </div>

                    <div className='form__group'>
                        <label className='form__label'>Version</label>
                        <input className="form__input" type="text" name="version"></input>
                    </div>
                    <div className="form__group">
                        <label className="form__label">Client Name</label>
                        <input className="form__input" type="text" name="clientName" ></input>
                    </div>

                    <div className="form__group">
                        <label className='form__label'>Owner Name </label>
                        <input className="form__input" type="text" name="ownerName" ></input>
                    </div>




                    <div className="form__group">
                        <label className="form__label">Admin Name</label>
                        <input className="form__input" type="text" name="adminName" ></input>
                    </div>

                    <div className="form__group">

                        <button className="btn btn--green " type="submit"> Submit</button>
                    </div>
                </form>

               
            </div>


        );

        /*  <div style={{ 'color': 'red' }}>

                    <h4> {error.isError ? error.errorMessage : " "}</h4>
                </div>
                */

    };


    return (
        <div>
            <h2> Create New Project</h2>
            <AddProjectForm />

        </div>


    )

}

export default AddProject;
