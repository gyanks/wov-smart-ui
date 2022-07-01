import './DisplayProject.css'
const DisplayProject = (props) => {
    const proj = props.project;
     console.log("Inside display "+ JSON.stringify(proj))
    return (

        <div className='project'>
            <nav className ="project__nav">
              <button>Scan Component</button>
              <button> Scan History</button>
              <button> View Details </button>
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