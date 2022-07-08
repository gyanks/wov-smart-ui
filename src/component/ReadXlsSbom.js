
import React from 'react'
import Select from 'react-select';
import { useState } from "react";
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import * as XLSX from "xlsx";
import XMLParser from 'react-xml-parser'

import MaterialTable from 'material-table';
import SbomService from './service/SbomService';

import SbomComponents from './SbomComponents';
import ComponentCvesScan from './scan/ComponentCvesScan';
import ComponentDbService from './db/DbService';
import ScanSbomComponents from './scan/ScanSbomComponents';

import './ReadXlsSbom.css'
import { cveScan4Components } from './scan/service/ScanService';


/* This method will read SBOM from excel sheet and retrieve each components 

*/
const ReadXlsSbom = (props) => {

    const [scanComponents, setScanComponents] = useState([{}]);
    const [sbomFmt, setSbomFmt] = useState();
    const [accept, setAccept] = useState();
    const [enable, setEnable] = useState(true);
    const [show,setShow]= useState(false);
    const [cveScan,setCveScan] = useState(false);

    const scanproject = localStorage.getItem("scanProject");

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
                setShow(true);
                //console.log(JSON.stringify(scanComponents));


            };
            reader.readAsBinaryString(file);
            // console.log("processing excel formate "+sbomFmt);
            // const components=SbomService.processXlsSbom(file);
           // alert("proccesed components form XLS " + JSON.stringify(scanComponents))

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
               // alert(" scanComponents from pom.xml " + JSON.stringify(scanComponent))
                setScanComponents(scanComponent);
                setShow(true)

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
               // console.log("Package.json", e.target.result);
                const packageData = JSON.parse(e.target.result).dependencies;
               // console.log(" dependencies " + JSON.stringify(packageData));
                // extracting each components and version 
                const components = Object.keys(packageData).reduce((result, currentKey) => {
                    if (typeof packageData[currentKey] === 'string' || packageData[currentKey] instanceof String) {

                        const component = {
                            "componentName": currentKey,
                            "version": packageData[currentKey].substring(1),
                            "vendor": ""
                        }
                        result.push(component);
                    }

                    return result;
                }, []);
                console.log("scan components " + JSON.stringify(components))
                components.forEach( comp => delete comp['tableData'])
                setScanComponents(components);
                setShow(true);
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


    const scanColumns = [
        { title: 'Component Name', field: 'componentName', filtering: false },
        { title: 'Version', field: 'version', filtering: false },
        { title: 'Vendor', field: 'vendor', filtering: false },

    ];

    const handleScan= () =>  {
        alert("final scan List "+JSON.stringify(scanComponents))
        setShow(false);
       setCveScan(true);
    }


    const SbomScanList = () => {
        return(
            <div>
        <MaterialTable
            columns={scanColumns}
            data={scanComponents}
            title="Review SBOM Components"

            options={{


                filtering: true,
                sorting: true,
                actionsColumnIndex: -1,
                
            }}

            editable={{

                onRowAdd: (newComponent) =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            setScanComponents([...scanComponents, newComponent]);

                            resolve();
                        }, 1000);
                    }),

                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            console.log("old:", oldData);
                            console.log("new:", newData);
                            const dataUpdate = [...scanComponents];
                            const index = oldData.tableData.id;
                            dataUpdate[index] = newData;
                            setScanComponents(dataUpdate)

                            resolve();
                        }, 1000);
                    }),


                onRowDelete: (oldData) =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            const dataDelete = [...scanComponents];
                            const index = oldData.tableData.id;
                            dataDelete.splice(index, 1);
                            setScanComponents([...dataDelete]);

                            resolve();
                        }, 1000);
                    })
            }}


        >


        </MaterialTable>
        <div  style={{textAlign:'center'}}>
        <button   onClick={handleScan}> Scan  </button>
        </div>
        
           </div>
        );

       
    }



    return (
        <div>
            <div class="form-box">




                SBOM Format   <select onChange={selectHandler}>
                    <option value="xls">Excel Sheet</option>
                    <option value="xml">POM XML</option>
                    <option value="json">Package JSON</option>
                </select>

                <p style={{ textAlign: "center" }}>please upload SBOM
                    <input disabled={enable} style={{ padding: "15px" }} type="file" accept={accept} onChange={onChange} />
                </p>


            </div>



            <div>
               {show ? <SbomScanList></SbomScanList>: " "}   
            </div>

           <div> 
               {cveScan ? <ComponentCvesScan components={scanComponents}></ComponentCvesScan> : ""}
           </div>



        </div>

        // <SbomComponents components={scanComponents}/>
        //<button type="submit" onClick={component2DbHandler}> Save to DB  </button>
        //  <ComponentCvesScan components={scanComponents}></ComponentCvesScan>
        //  <ScanSbomComponents components={scanComponents}></ScanSbomComponents> 
    );
}




export default ReadXlsSbom;