import ScanDashboardDev from "./ScanDashboardDev";
import ScanDashboard from "./ScanDashboardDev";

const ScanResultDev = (props) => {

const data=props.scanData;

return (


    <div>
             { data.map((scanData)=> {

                 <div>  ComponentName : {scanData.componentName}  version :{scanData.version}  vendor:{scanData.vendor}
                 
                 <ScanDashboardDev cveList="scanData.cveList"></ScanDashboardDev>
                 </div>  
                   

             })}
        

        
    </div>
)



}

export default ScanResultDev;
