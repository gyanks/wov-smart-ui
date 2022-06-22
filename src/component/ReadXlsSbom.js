
import React from 'react'
import Select from 'react-select';
import { useState } from "react";
import { useContext } from 'react';
import { useParams } from 'react-router-dom';


import SbomService from './service/SbomService';

import SbomComponents from './SbomComponents';
import ComponentCvesScan from './scan/ComponentCvesScan';
import ComponentDbService from './db/DbService';
import ScanSbomComponents from './scan/ScanSbomComponents';

import './ReadXlsSbom.css'


/* This method will read SBOM from excel sheet and retrieve each components 

*/
const ReadXlsSbom = (props ) => {
    const [scanComponents, setScanComponents] = useState([]);
    const[sbomFmt,setSbomFmt] = useState();
    const params=useParams();
    //const {project} =params;
    
    const onChange = (e) => {
      
       
        const [file] = e.target.files;

        if(sbomFmt==='xls'){
           // console.log("processing excel formate "+sbomFmt);
         const components=SbomService.processXlsSbom(file);
         console.log("proccesed components "+ JSON.stringify(components))
         setScanComponents(components);
        }
        if(sbomFmt==='xml'){
           // console.log("processing pom.xmlformate "+sbomFmt);
            const components=   SbomService.processXmlSbom(file);
            console.log("proccesed components "+ JSON.stringify(components))
            setScanComponents(components);
           
        }
        if(sbomFmt==='json'){
            console.log("processing Package.json formate "+sbomFmt);
            const components=   SbomService.processJsonSbom(file);
            console.log("proccesed components "+ JSON.stringify(components))
           
            setScanComponents(components);
        }


        

    };  // close of onChange method 


    const selectHandler= (event) => {

        alert("please upload in "+event.target.value);
        setSbomFmt(event.target.value);
    }


   const scanproject=localStorage.getItem("scanProject");


     
    return (
        <div>
            <div class="form-box">
          
           
            <p class="main-text">  Project for Scan : {scanproject}  </p> 
         
         SBOm Format   <select  onChange={selectHandler}>
               <option value="xls">Excel Sheet</option>
               <option value="xml">POM XML</option>
               <option value="json">Package JSON</option>
           </select>

            <p style={{textAlign: "center"}}>please upload SBOM 
            <input  style={{padding:"15px"}}type="file" accept='application/json' onChange={onChange} />
            </p>
            </div>
            
          
           
          

            

        </div>

        // <SbomComponents components={scanComponents}/>
        //<button type="submit" onClick={component2DbHandler}> Save to DB  </button>
        //  <ComponentCvesScan components={scanComponents}></ComponentCvesScan>
        //  <ScanSbomComponents components={scanComponents}></ScanSbomComponents> 
    );
}




export default ReadXlsSbom;