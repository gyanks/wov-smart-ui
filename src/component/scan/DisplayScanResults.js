import React from "react"
import { useState } from "react";
import Display from './Display'
import DisplayReportXls from "./DisplayReportXls";
import Select from 'react-select'
import MaterialTable from "material-table";
const DisplayScanResults = (props) => {

      // const cveList = JSON.parse(localStorage.getItem("cveList"));

      const [userRemarks, setUserRemarks] = useState();
      const [cveList, setCveList] = useState(JSON.parse(localStorage.getItem("cveList")));


      const categoryList = [
            { "value": 'accepted', "label": "Accepted" },

            { "value": 'rejected', "label": "Rejected" },
            { "value": 'pending', "label": "Pending" },
            { "value": 'resolved', "label": "Resolved" }


      ];


      const tableColumns = [
            { title: 'CVE ID', field: 'vulnId', filtering: false },
            { title: 'Description ', field: 'Description', filtering: false },
            { title: 'Vector String', field: 'vectorString', filtering: false },
            { title: 'Impact Score', field: 'impactScore', filtering: true },
            { title: ' CVE Score', field: 'cveScore', filtering: true },
            { title: 'Severity', field: 'severity', filtering: true },
            {
                  title: ' Category', field: 'category', filtering: false,

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

      ]


      const saveCveRemarksHandler = () => {

            alert(" Remarks saved to Backend");
      }

      return (
            <div>
                  <MaterialTable
                        columns={tableColumns}
                        data={cveList}
                        title="CVE list for component"


                        options={{

                              export: true,
                              filtering: true,
                              sorting: true,
                              actionsColumnIndex: -1,
                              exportButton: true
                        }}


                        editable={{

                              onRowUpdate: (newData, oldData) =>
                                    new Promise((resolve, reject) => {
                                          setTimeout(() => {
                                                console.log("old:", oldData);
                                                console.log("new:", newData);
                                                const dataUpdate = [...cveList];
                                                const index = oldData.tableData.id;
                                                dataUpdate[index] = newData;
                                                setCveList([...dataUpdate]);
                                                setUserRemarks([...dataUpdate]);

                                                resolve();
                                          }, 1000);
                                    })
                        }}





                  >

                  </MaterialTable>

                  <button onClick={saveCveRemarksHandler}> Save CVE Remarks</button>

            </div>
      )
};



export default DisplayScanResults;