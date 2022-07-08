import MaterialTable from "material-table";

const ViewScanHistory = () => {


    const scanHistoryColumns = [
        { title: 'Scan ID', field: 'scanId' },

        { title: 'Scan Data', field: 'scanDate' },
        { title: 'Scan By ', field: 'scanBy' },
        { title: ' # Components ', field: 'components' },
        { title: ' Delta Components', field: 'delta' }
        

    ];

    const scanHistoryData = [

        {'scanId':"S01254","scanDate":"01-July-2022" , "scanBy":"Rakesh Ranjan","components":"4","delta":"4" },
        {'scanId':"S01257","scanDate":"01-July-2022" , "scanBy":"Rakesh Ranjan","components":"6","delta":"2" },
        {'scanId':"S01765","scanDate":"06-July-2022" , "scanBy":"Munni Kumar" ,"components":"3","delta":"0" },
        {'scanId':"S01276","scanDate":"06-July-2022" , "scanBy":"Rakesh Ranjan","components":"6","delta":"2" }
    ];


    return (

         <div>

             <MaterialTable 
             columns={scanHistoryColumns}
             data= {scanHistoryData}
             title="Scan History for Project"
             >

             </MaterialTable>
         </div>

    )

}

export default ViewScanHistory;

