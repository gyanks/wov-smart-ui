import react from 'react'
import { useEffect, createContext } from 'react';
import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'
import Display from '../scan/Display';
import dummyProjects from './data/DummyProject.json'
import MaterialTable from 'material-table';
import { MTableAction } from 'material-table';
import { Button } from '@mui/material';


import AddIcon from "@material-ui/icons/AddAlarm";
import IconButton from "@material-ui/core/IconButton";
import DetailsIcon from '@mui/icons-material/Details';
import RadarIcon from '@mui/icons-material/Radar';

import ProjectDetails from './ProjectDetails';
import ReadXlsSbom from '../ReadXlsSbom';
import ScanDbService from '../scan/service/ScanDbService';


const ProjectDashboard = () => {

    const navigate = useNavigate();
    const username = localStorage.getItem("username").toUpperCase()

    const ProjectContext = createContext();

    const tableRef = react.createRef();
    const addActionRef = react.useRef();
    const [projects, setProjects] = useState();
    const [showSbom, setShowSbom] = useState(false);
    const [project, setProject] = useState();
    const [scanResult, setScanResult] = useState();
    const [scanReport, setScanReport] = useState();

    const getAllProjects = () => {

        fetch("https://5w3a2f7pqh.execute-api.ap-southeast-1.amazonaws.com/dev/getprojects").
            then(response => response.json())
            .then(projects => { return projects })
            .then(projects => {
                //const userProjects = projects.filter(project => project.owner.toLowerCase() == username.toLowerCase());
                setProjects(projects);

            })
            .catch(error => console.log(' There is error while accessing data ' + error))


    }

    const getScanResult = () => {

        fetch("http://localhost:4004/scan")
            .then(response => response.json())
            .then(scan => {

                setScanResult(scan)

            })

    }


    const fetchApi = () => {
        getAllProjects();
        getScanResult();

    }

    useEffect(() => {
        fetchApi();


    }, []);




    const scanReport4Project = (projectName) => {
        const scanReport = ScanDbService.prepareScanSummary4Project(scanResult, projectName);

        return scanReport;
    }

  //const headerSummary = ScanDbService.summaryHeader(scanReport4Project);


    const updateProjectComponents = (projId, componentList) => {
        /*
        const project= Projects.filter(proj => proj.projectId==projId);
        project.components=componentList;
        */
        const index = projects.indexOf(projId);
        const updatedProjects = projects.map((project) => {
            if (project.projectId == projId)
                project.components = componentList;
        })
        projects[index].components = componentList;


    }

    const tableColumns = [

        {
            title: 'Project Id', field: '_id', color: '#FFF',
            filtering: false
        },
        {
            title: 'Project Name', field: 'projectName', headerStyle: {
                backgroundColor: "green"
            }
        },
        { title: 'Version', field: 'version' },
        { title: 'Owner', field: 'owner' }

       
        /*
        {
            title: "View Details ",
            field: "internal_action",
            editable: false,
            render: (rowData) =>
                rowData && (
                <IconButton
                    color="secondary"
                    onClick={() => alert('Clicked ')}
                >
                    <AddIcon />
                </IconButton>
                )
            }
       */
    ];
/*<div>
                    <div>
                        <div>  Components Count : </div>
                        <div>  Vulnerability Count  :</div>
                    </div>
                    <div>  
                           <div> Critical </div>
                           <div> High </div>
                           <div> Medium  </div>
                           <div> Low</div>

                    </div>


                </div>
*/

    return (
        <ProjectContext.Provider value={projects}>
            <div>
                <h2> Welcome {username} </h2>
                



                
            <MaterialTable
                    columns={tableColumns}

                    data={projects}
                    title="Project Dashboard "
                    options={{
                        headerStyle: {
                            borderBottomColor: 'red', borderBottomWidth: '3px', fontFamily: 'verdana', backgroundColor: '#01579b',
                            color: '#FFF'
                        },
                        filtering: true,
                        sorting: true,
                        actionsColumnIndex: -1,
                        exportButton: true,
                        grouping: true,
                        groupRowSeparator: "==="

                    }}
                    detailPanel={rowData => {
                       // const report = scanReport4Project(rowData.projectName);
                        //localStorage.setItem("scanReport", report);
                        return (
                            <div>

                                <ProjectDetails scanResult={scanReport4Project(rowData.projectName)} project={rowData}></ProjectDetails>

                            </div>
                        )
                    }
                    }

                    actions={[
                        {
                            icon: RadarIcon,
                            tooltip: "Scan ",
                            onClick: (event, rowData) => {
                                setProject(rowData);
                                setShowSbom(true);
                                localStorage.setItem("scanProject", rowData.projectName);
                                navigate("/home/project/sbom");
                            }
                        }
                    ]}

                    editable={{
                        onRowAdd: newData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    setProjects(...projects, newData)


                                    resolve();
                                }, 1000);
                            }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    const dataUpdate = [...projects];
                                    const index = oldData.tableData.id;
                                    dataUpdate[index] = newData;
                                    setProjects([...dataUpdate]);

                                    resolve();
                                }, 1000);
                            }),
                        onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    const dataDelete = [...projects];
                                    const index = oldData.tableData.id;
                                    dataDelete.splice(index, 1);
                                    setProjects([...dataDelete]);

                                    resolve();
                                }, 1000);
                            })

                    }}
                />
                {showSbom ? <ReadXlsSbom></ReadXlsSbom> : null}

            </div>
        </ProjectContext.Provider>
    )


};
/*
 return (

    <div> 
        <button onClick={print}> Print Report </button>
    </div>
 )*/

export default ProjectDashboard;
