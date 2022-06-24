
import React from 'react'
import Select from 'react-select';
import { useState } from "react";
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import * as XLSX from "xlsx";
import XMLParser from 'react-xml-parser'


import SbomService from './service/SbomService';

import SbomComponents from './SbomComponents';
import ComponentCvesScan from './scan/ComponentCvesScan';
import ComponentDbService from './db/DbService';
import ScanSbomComponents from './scan/ScanSbomComponents';

import './ReadXlsSbom.css'


/* This method will read SBOM from excel sheet and retrieve each components 

*/
const ReadXlsSbom = (props) => {
    const [scanComponents, setScanComponents] = useState([]);
    const [sbomFmt, setSbomFmt] = useState();
    const [type,setType] = useState();
    const params = useParams();
    //const {project} =params;

    const onChange = (e) => {


        const [file] = e.target.files;

        if (sbomFmt === 'xls') {
            setType(".xls, .xlsx")

            const reader = new FileReader();

            reader.onload = (evt) => {
                const bstr = evt.target.result;
                const wb = XLSX.read(bstr, { type: "binary" });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                var json = XLSX.utils.sheet_to_json(ws);
                //console.log(JSON.stringify(json))


                scanComponents = json.map((component) => {
                    return {


                        componentName: component.ComponentName,
                        version: component.ComponentVersion,
                        vendor:component.VendorName

                    }
                });
                setScanComponents(scanComponents);
                //console.log(JSON.stringify(scanComponents));
               

            };
            reader.readAsBinaryString(file);
            // console.log("processing excel formate "+sbomFmt);
            // const components=SbomService.processXlsSbom(file);
            alert("proccesed components form XLS " + JSON.stringify(scanComponents))
           
        }
        if (sbomFmt === 'xml') {
            setType("text/xml")
            const reader = new FileReader();

            reader.readAsText(file);
        
        
            reader.onload = evt => {
                const readerData = evt.target.result;
        
                const parser = new DOMParser();
                const xml = parser.parseFromString(readerData, "text/xml");
                /*
                 console.log(
                     "data",
                     new XMLSerializer().serializeToString(xml.documentElement)
                 );
                 */
                // var XMLParser = require("react-xml-parser");
                var objectXml = new XMLParser().parseFromString(
                    new XMLSerializer().serializeToString(xml.documentElement)
                );
        
                //console.log("XML Object", JSON.stringify(objectXml));
        
                const pomDependencies = objectXml.getElementsByTagName("dependencies");
        
               // console.log("Dependencies " + JSON.stringify(pomDependencies[0]));
        
                const scanComponent = pomDependencies[0].children.map((dependency) => {
        
        
                    return {
                         "vendor":dependency.children[0].value,
                        "componentName": dependency.children[1].value,
                        "version": dependency.children[2].value
        
        
                    }
        
        
        
        
        
                });
                alert(" scanComponents from pom.xml " + JSON.stringify(scanComponent))
                setScanComponents(scanComponent);
            }
        
        
            /* console.log("processing pom.xmlformate "+sbomFmt);
            const components = SbomService.processXmlSbom(file);
            console.log("proccesed components " + JSON.stringify(components))
            setScanComponents(components);
            */

        }
        if (sbomFmt === 'json') {
            setType("application/json")
            console.log("processing Package.json formate " + sbomFmt);
            const components = SbomService.processJsonSbom(file);
            console.log("proccesed components " + JSON.stringify(components))

            setScanComponents(components);
        }




    };  // close of onChange method 


    const selectHandler = (event) => {

        alert("please upload in " + event.target.value);
        setSbomFmt(event.target.value);
    }


    const scanproject = localStorage.getItem("scanProject");



    return (
        <div>
            <div class="form-box">


                <p class="main-text">  Project for Scan : {scanproject}  </p>

                SBOm Format   <select onChange={selectHandler}>
                    <option value="xls">Excel Sheet</option>
                    <option value="xml">POM XML</option>
                    <option value="json">Package JSON</option>
                </select>

                <p style={{ textAlign: "center" }}>please upload SBOM
                    <input style={{ padding: "15px" }} type="file" accept={type} onChange={onChange} />
                </p>
            </div>


            <ComponentCvesScan components={scanComponents}></ComponentCvesScan>




        </div>

        // <SbomComponents components={scanComponents}/>
        //<button type="submit" onClick={component2DbHandler}> Save to DB  </button>
        //  <ComponentCvesScan components={scanComponents}></ComponentCvesScan>
        //  <ScanSbomComponents components={scanComponents}></ScanSbomComponents> 
    );
}




export default ReadXlsSbom;