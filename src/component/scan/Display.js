import React from 'react'
import './Display.css'

const Display =(props ) => {
return (
 <div> 
<li className="cve">
          <h2> Vuln Id: {props.myCve.vulnId}</h2>
          <h3> Description :{props.myCve.description}</h3>
         
          <h3>Impact Score :{props.myCve.impactScore}</h3>
          <h3>vectorString :{props.myCve.vectorString}</h3>
          <h3>cvvsScore :{props.myCve.cvvsScore}</h3>
          <h3>severity :{props.myCve.severity}</h3>
         
        </li>

 </div>

);

}
export default  Display ;