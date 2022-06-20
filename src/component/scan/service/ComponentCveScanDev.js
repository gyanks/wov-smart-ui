import { useState, useEffect } from "react";
import ScanDashboard from "../ScanDashboard";
const ComponentCveScanDev = () => {
    const [dbScanData, setDbScanData] = useState([]);

    const loadFromApi = () => {
        fetch("https://5w3a2f7pqh.execute-api.ap-southeast-1.amazonaws.com/dev/scanforvulnerabilities").
            then(response => response.json()).
            then(result => setDbScanData(result))
            .catch(error => " There was error while featching Scan data from server" + error)

    }

    useEffect(loadFromApi, []);

    return(

       <div>

         <ScanDashboard scanData={dbScanData}></ScanDashboard>

       </div>

    )


}

export default ComponentCveScanDev;