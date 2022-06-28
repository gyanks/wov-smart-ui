
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
    const [accept, setAccept] = useState();
    const [enable,setEnable] =useState(true);

    const params = useParams();
    //const {project} =params;

    const onChange = (e) => {


        const [file] = e.target.files;

        if (sbomFmt === 'xls') {


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
                        vendor: component.VendorName

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

            const reader = new FileReader();

            reader.readAsText(file);


            reader.onload = evt => {
                const readerData = evt.target.result;

                const parser = new DOMParser();
                const xml = parser.parseFromString(readerData, "text/xml");

                var objectXml = new XMLParser().parseFromString(
                    new XMLSerializer().serializeToString(xml.documentElement)
                );

                //console.log("XML Object", JSON.stringify(objectXml));

                const pomDependencies = objectXml.getElementsByTagName("dependencies");

                // console.log("Dependencies " + JSON.stringify(pomDependencies[0]));

                const scanComponent = pomDependencies[0].children.map((dependency) => {


                    return {
                        "vendor": dependency.children[0].value,
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

            const fileReader = new FileReader();
            fileReader.readAsText(e.target.files[0], "UTF-8");
            fileReader.onload = e => {
                console.log("Package.json", e.target.result);
                const packageData = JSON.parse(e.target.result).dependencies;
                console.log(" dependencies " + JSON.stringify(packageData));
                // extracting each components and version 
                const components = Object.keys(packageData).reduce((result, currentKey) => {
                    if (typeof packageData[currentKey] === 'string' || packageData[currentKey] instanceof String) {

                        const component = {
                            "componentName": currentKey,
                            "version": packageData[currentKey].substring(1)
                        }
                        result.push(component);
                    }

                   return result;
                }, []);
                console.log("scan components "+ JSON.stringify(components))
                setScanComponents(components);
            };

            
        }




    };  // close of onChange method 


    const selectHandler = (event) => {

        //alert("please upload in " + event.target.value);
        const type = event.target.value;
        setSbomFmt(event.target.value);
        if (type === "xls")
            setAccept(".xls ,.xlsx")
        if (type === "xml")
            setAccept("text/xml")
        if (type === "json")
            setAccept("application/json")
    setEnable(false);
    }


    const scanproject = localStorage.getItem("scanProject");



    return (
        <div>
            <div class="form-box">


                <p class="main-text">  Project for Scan : {scanproject}  </p>

                SBOM Format   <select onChange={selectHandler}>
                    <option value="xls">Excel Sheet</option>
                    <option value="xml">POM XML</option>
                    <option value="json">Package JSON</option>
                </select>

                <p style={{ textAlign: "center" }}>please upload SBOM
                    <input  disabled={enable} style={{ padding: "15px" }} type="file" accept={accept} onChange={onChange} />
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