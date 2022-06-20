import Select from 'react-select'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MaterialTable from 'material-table';
import './ManageRole.css'

const ManageRole = () => {
    const [users, setUsers] = useState();
    const [projects, setProjects] = useState();
    const [selectedUser, setSelectedUser] = useState();
    const [selectedProject, setSelectedProject] = useState();
    const [selectedRole, setSelectedRole] = useState();
    const [usersRole, setUsersRole] = useState([]);

    const navigate= useNavigate();

    //let usersArray = [];

    useEffect(() => {
        StartUp()
    }, []);
    /* This method will  integrate list of functions need to be 
    called in begining using useEffect
    */
    const StartUp = () => {
        getAllProjects();
        getAllUsers();
        // alert("done setup")

    }

    const headers = {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*"
    };



    const roleOptions = [
        { value: 'user', label: 'User' },
        { value: 'admin', label: 'Admin' },
        { value: 'supervisor', label: 'Supervisor' },


    ];

    const tableColumns = [

        { title: 'User Id ', field: 'userId', filtering: false },
        { title: 'Role', field: 'role', filtering: false },
    ];


    /* this function will retrieve all users from server and convert it in 
    option format for Select 
    */



    const getAllUsers = () => {

        const userUrl = "https://5w3a2f7pqh.execute-api.ap-southeast-1.amazonaws.com/dev/getusers";
        fetch(userUrl, headers)
            .then(response => {
                if (response.ok)
                    return response.json()
                else {
                    const error = response.status;
                    return Promise.reject(error);
                }

            })


            .then(data => {
                //alert("get all user executed "+ JSON.stringify(data))

                // converting server data in select options format 
                const userOptions = data.body.map(user => {


                    return {
                        'value': user.userid,
                        'label': user.FirstName
                    }

                });
                setUsers(userOptions);
                // alert("users "+ JSON.stringify(userOptions))


            })
            .catch(error => { return error; })

    }

    /* this function will retrieve all projects from server and convert it in 
        option format for Select 
        */




    const getAllProjects = () => {


        const projectUrl = "https://5w3a2f7pqh.execute-api.ap-southeast-1.amazonaws.com/dev/getprojects";
        fetch(projectUrl, headers)
            .then(response => {
                if (!response.ok) {
                    const error = response.status;
                    return Promise.reject(error);
                }
                else {
                    return response.json()
                }
            })

            .then(data => {
                //alert("project data"+ JSON.stringify(data))
                const projectOptions = data.body.map(project => {

                    return {
                        'value': project.projectId,
                        'label': project.projectName
                    }
                });
                //alert("projects "+ JSON.stringify(projectOptions))
                setProjects(projectOptions);
            });
    }


    const handleSelectProject = (event) => {

        setSelectedProject(event.value)


    }

    const handleSelectUser = (event) => {

        setSelectedUser(event.value)
    }

    const handleSelectRole = (event) => {
        setSelectedRole(event.value)
    }

    const customStyles = {
        control: base => ({
            ...base,
            width: 200,
            height: 35,
            minHeight: 35
        })
    };


    const addHandler = () => {

        const tempUserRole = [...usersRole,{
            'userId': selectedUser,

            'role': selectedRole
        }];
        /*
        let  temp= usersRole;
               temp.push(tempUserRole);
               alert(JSON.stringify(temp));
               */

        setUsersRole(tempUserRole);
    }


    const handleSubmit = () => {

        const addUserUrl = "https://5w3a2f7pqh.execute-api.ap-southeast-1.amazonaws.com/dev/add_project_to_user";

        const user2Project = {
            "id": selectedProject,
            "users": usersRole
        }
        alert("going to add users " + JSON.stringify(user2Project));
        fetch(addUserUrl, {
            method: "POST",
            body: JSON.stringify(user2Project),
            headers: {
                "Content-type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        })
            .then(response => {
                if (!response.ok) {
                    const error = response.status;
                    return Promise.reject(error);
                }
                else {
                    return response.json();
                }

            })
            .then(data => {
                if(data.statusCode===200){
                
                alert("Users successfully assigned to Project ")
                      navigate("/home/admin")
                }
                else{
                    alert("there is error in  assigning users  to Project ") 
                }
                })


            .catch(error => alert("There was error while adding users to project" + error))

    }
    return (
        <div className='container__main'>
            <div className='container__form'>
                <div>
                    <h4> Select Project </h4>
                    <Select options={projects} styles={customStyles} onChange={(event) => handleSelectProject(event)} >

                    </Select>
                </div>
                <div>
                    <h4> Select Users </h4>
                    <Select options={users} styles={customStyles} onChange={(event) => handleSelectUser(event)}  ></Select>

                </div>
                <div>

                    <h4> Select Role </h4>
                    <Select onChange={(event) => handleSelectRole(event)} styles={customStyles} options={roleOptions}>


                    </Select>
                    <button onClick={addHandler}>Add </button>
                </div>
            </div>
            <div className='container__table'>
                <MaterialTable columns={tableColumns} data={usersRole} title=" Add Users"></MaterialTable>
                <button onClick={handleSubmit}> Submit</button>
            </div>
        </div>




    );


};

export default ManageRole;