
import  {useNavigate} from 'react-router-dom'
import './DisplayProject.css'
const DisplayProject = (props) => {

    const navigate= useNavigate();
    const proj = props.project;
     console.log("Inside display "+ JSON.stringify(proj));

     const scanComponentsHandler= (proj) => {
         console.log("Scaniing for project" + JSON.stringify(proj))
         localStorage.setItem("scanProject",JSON.stringify(proj))
         navigate("/home/project/sbom")

     }

     const scanHistoryHandler = (proj) => {

        localStorage.setItem("scanProject",JSON.stringify(proj))
        navigate("/home/project/scan/history")

     }


     const viewDetailsHandler = (proj) => {
        localStorage.setItem("scanProject",JSON.stringify(proj))
        navigate("/home/project/details")



     }
    return (

        <div className='project'>
            <nav className ="project__nav">
              <button onClick={() => scanComponentsHandler(proj)}>Scan Component</button>
              <button onClick={() => scanHistoryHandler(proj)}> Scan History</button>
              
            </nav>
           
            <div className="project__main">
               <h3>  Project Id : {proj.projectId} </h3> 
              <h3> Project Name : {proj.projectName}</h3>  
              <h3> Version : {proj.version}</h3>  
               <h3> Scan Counts:{proj.scan}</h3> 
               <h3>  Components Count :{proj.components.length}</h3> 
            </div>

        </div>



    )


};

export default DisplayProject;