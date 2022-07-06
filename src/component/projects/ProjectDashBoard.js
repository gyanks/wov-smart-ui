import dummyProjects from './data/DummyProject.json'
import DisplayProject from './DisplayProject';
import ProjectComponentChart from './ProjectComponentChart';
import VulnComponentChart from './VulnComponentChart';
const ProjectDashBoard = () => {

    const projects = dummyProjects;
    const userName = "Rakesh";

    /*
    const Header = () => {

        return (

            <div>
                <h3> Welcome  {userName}  to Project Dashboard </h3>
            </div>
        )
    }


    const MainDashBoard = () => {


        projects.map((proj) => { DisplayProject(proj) }

        )
    };

    const DisplayProject = (proj) => {
        // const proj=props.project;
        // console.log(JSON.stringify(proj))
        return (
            <div>

                <div>Header for Project</div>
                <div>
                    Project Id : {proj.projectId}
                    Project Name : {proj.projectName}
                    Version : {proj.version}
                    Scan Counts:{proj.scan}
                    Components Count :{proj.components.length}
                </div>

            </div>
        )

    }
      <ProjectComponentChart projects={projects}></ProjectComponentChart>
    */
    return (

        <div>

            <div>
                <h3> Welcome  {userName}  to Project Dashboard </h3>

            </div>
            <div> 
            <VulnComponentChart></VulnComponentChart>
              
            </div>
            <div>
  
                {projects.data.map((project) => 

                <DisplayProject project={project}></DisplayProject>
                   

                

              )}

            </div>
        </div>


    )






}

export default ProjectDashBoard;