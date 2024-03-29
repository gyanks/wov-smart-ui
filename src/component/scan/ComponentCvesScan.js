import React from 'react'
import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Select from 'react-select'
import MaterialTable from 'material-table';

import DetailsIcon from '@mui/icons-material/Details';
import IconButton from "@material-ui/core/IconButton";
import Settings from "@material-ui/icons/Settings";
import ViewColumn from '@material-ui/icons/ViewColumn';


import CvesScanService from './CvesScanService';
import DisplayScanResults from './DisplayScanResults';
import DisplayReportXls from './DisplayReportXls';
import ScanService from './service/ScanService'
import ScanDbService from './service/ScanDbService'
import ScanDashboard from './ScanDashboard'
import { padding } from '@mui/system';


const ComponentCvesScan = (props) => {

    // const scan= props.scan;
    const [dbScanData, setDbScanData] = useState([]);
    const [scanResult, setScanResult] = useState([])
    const [scanReport, setScanReport] = useState([])
    const [userRemarks,setUserRemarks] = useState();
    const [error,setError]= useState();
    const navigate = useNavigate();

    const tableIcons = {
      Edit: () => <Settings />,
      Cancel: () => <Settings/>,
      Save: () => <Settings/>,

    };

/*
    const tableIcons = {
      Save: forwardRef((props,ref) => <Save {...props} ref={ref} />),
      Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
      Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
      Delete: forwardRef((props, ref) => <Delete {...props} ref={ref} />),
      Cancel: forwardRef((props, ref) => <Cancel {...props} ref={ref} />),
      Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  };
*/
    const scanComponentsFromApi = () => {
        //console.log("scanning for components "+ JSON.stringify(props.components))
        const requestBody = {
            "scanComponents": props.components
        };
       
       
            requestBody.scanComponents.forEach(comp => { 
              if (comp['tableData'])
              delete comp['tableData']
            });


       

        console.log("API call  for components " + JSON.stringify(requestBody));

        fetch("https://5w3a2f7pqh.execute-api.ap-southeast-1.amazonaws.com/dev/scanforvulnerabilities", {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: {
                "Content-type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }

        }).
            then(response => response.json()).
            then(result => {
               // console.log("scan result from api" + JSON.stringify(result.scanResults))
                setScanResult(result.scanResults)
                return result.scanResults
            })
            .then(finalResult => printSummaryReport(finalResult))
            .catch(error => " There was error while featching Scan data from server" + error)

        // calling print Report ()

    }

    // useEffect(loadFromApi, []);

    const testDelta = () => {

        const scanId = ScanService.generateScanId()
        const username = localStorage.getItem("username");
        const projectName = localStorage.getItem("scanProject");

        const components = props.components;

        console.log(" components in current scan " + JSON.stringify(components))

        console.log(" Scan data from db " + JSON.stringify(dbScanData));



        const scan4Proj = ScanDbService.isProjectScaned(dbScanData, projectName);

        if (!scan4Proj)
            console.log(" No scan record found for project " + projectName);
        else {
            const allScanedComponents = ScanDbService.fetchScanComponents4Project(dbScanData, projectName)
            const deltaComponents = ScanDbService.findDeltaComponents(allScanedComponents, components);
            console.log(" Delta components " + JSON.stringify(deltaComponents))


        }


    }// close of function testDelta

    const scanId = "S001"
    // const scanId = ScanService.generateScanId();
    //const userName = localStorage.getItem("username")
    //const projectName = localStorage.getItem("scanProject")
    const userName = "Rakesh";
    const projectName = JSON.parse(localStorage.getItem("scanProject")).projectName;


    const title = "Scan Id :" + scanId + "  Project Name :" + projectName;
    /* function for Scannning component and saving to DB */


    const scanSbomHandler = () => {


        scanComponentsFromApi();
        //printSummaryReport();

    }// end of method scanSbomHandler 


    // logic for display Material Table 

    const printSummaryReport = (finalResult) => {


        const scanReport = finalResult.map((comp) => {

            return {

                componentName: comp.componentName,
                version: comp.version,
                vendor: comp.vendor,
                cveCount: comp.cveList.length,
                highSeverity: comp.cveList.filter((cve) => cve.severity === 'HIGH').length,
                category: "",
                remarks: " "
            }

        });

        setScanReport(scanReport);

    }

    // const to store value of  category 
    const categoryList = [
        { "value": 'accepted', "label": "Accepted" },

        { "value": 'rejected', "label": "Rejected" },
        { "value": 'pending', "label": "Pending" },
        { "value": 'resolved', "label": "Resolved" }


    ];






    const tableColumns = [
        { title: 'Component Name', field: 'componentName', filtering: false },
        { title: 'Version ', field: 'version', filtering: false },
        { title: 'Vendor', field: 'vendor', filtering: false },
        { title: 'CVE Count', field: 'cveCount', filtering: false },
        { title: ' High Severity', field: 'highSeverity', filtering: false, backgroundColor: 'red' },
        { title: ' Category', field: 'category', filtering: false,
    
        editComponent: ({ value, onChange }) => (
            <Select
              options={categoryList}
              name="categorySelect"
              onChange={(selectedOption) => onChange(selectedOption.value)}
              value={value ? value.value : value}
            />
          )
    
    },
        { title: ' Remarks ', field: 'remarks', filtering: false }
    ];



    const projectDashboardHandler = () => {

        navigate("/home/project/dashboard");
    }


    const saveUserActionHandler =( )=> {
       alert(" User action updated to DB "+JSON.stringify(userRemarks));
       
 fetch("https://5w3a2f7pqh.execute-api.ap-southeast-1.amazonaws.com/dev/usercomments", {

        method: "POST",
        body: JSON.stringify(userRemarks),

        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      }).then(response => {


        return response.json()
      }

      ).then(data => {

        
        if (data.statusCode === 400) {
          setError({
            "isError": true,
            "errorMessage": "Server error while saving User Remarks  "
          })
          alert(" Server error while saving User Remarks");
          Promise.reject("Server error while saving User Remarks");
        
        }
        if(data.statusCode===200){
        
          alert("user  remarks saved successfully in database " );
        }
        
      })
        .catch(error => console.log("there was error in user registration " + error));

      // saveToDb(userRegistration);
    };

   
    
    return (

        <div>
            <div style={{ textAlign: "center" }}>

            

                <button onClick={scanSbomHandler} > Scan SBOM </button>
               
            </div>
            <MaterialTable
                columns={tableColumns}
                data={scanReport}
                title={title}
                

                options={{
                    
                
                    filtering: true,
                    sorting: true,
                    actionsColumnIndex: -1,
                    exportButton: true
                }}
                

                editable={{
                    /*
                    onRowAdd: (newData) =>
                      new Promise((resolve, reject) => {
                        setTimeout(() => {
                          setData([...data, newData]);
          
                          resolve();
                        }, 1000);
                      }),
                      */
                    onRowUpdate: (newData, oldData) =>
                      new Promise((resolve, reject) => {
                        setTimeout(() => {
                          console.log("old:", oldData);
                          console.log("new:", newData);
                          const dataUpdate = [...scanReport];
                          const index = oldData.tableData.id;
                          dataUpdate[index] = newData;
                         setScanReport([...dataUpdate]);
                         setUserRemarks([...dataUpdate]);
          
                          resolve();
                        }, 1000);
                      })
                    }}
                      /*
                    onRowDelete: (oldData) =>
                      new Promise((resolve, reject) => {
                        setTimeout(() => {
                          const dataDelete = [...data];
                          const index = oldData.tableData.id;
                          dataDelete.splice(index, 1);
                          setData([...dataDelete]);
          
                          resolve();
                        }, 1000);
                      })
                  }}
            
            detailPanel={rowData => {
                return (
                    <div>

                        <ScanDashboard reportComp={rowData} dbData={scanResult}></ScanDashboard>

                    </div>
                )
            }}
            */
            
            actions={[
                {
                    icon: ViewColumn,
                    tooltip: "Detailed View  ",
                    onClick: (event, rowData) => {
                        
                        
                        localStorage.setItem("cveList", JSON.stringify(scanResult[rowData.tableData.id].cveList));
                       navigate("/home/project/scan/results");
                    }
                },

               
            ]}
            

            >

            </MaterialTable>

             <button   style={{ textAlign: "center" }} onClick={saveUserActionHandler}> Save </button> 
        </div>
        /* 
                            } */


        /*<DisplayScanResults matchedCves={nvdCves}></DisplayScanResults>
        // {console.log("found Cves "+ nvdCves[0].vulnId)}

         <button onClick={fetchNvdCvesHandler}> Scan NVD for SBOM </button>

            <ScanDashboard cveList={nvdCves} component={scan}></ScanDashboard> */


    )

};

export default ComponentCvesScan;