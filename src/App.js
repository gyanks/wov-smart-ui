import { BrowserRouter } from 'react-router-dom';
import { Route, Routes, useNavigate } from 'react-router-dom'

import ReadXlsSbom from './component/ReadXlsSbom';
import ResponsiveAppBar from './component/ui/ResponsiveAppBar';
import NavBar from './component/ui/NavBar';
import SignInSide from './component/ui/SignInSide';
import ViewDashboard from './component/projects/ProjectDashboard';
import ComponentCvesScan from './component/scan/ComponentCvesScan';
import DisplayScanResults from './component/scan/DisplayScanResults';
//import ReadXlsSbom from './component/ReadXlsSbom'
import RegisterUser from './component/ui/user/RegisterUser';
import AdminHomePage from './component/admin/AdminHomePage';

import AssignProject from './component/admin/AssignProject';
import AddProject from './component/admin/AddProject';
import ResetPassword from './component/ui/user/ResetPassword';
import './App.css';




function App() {
  const navigate = useNavigate();
  
  return (
    <div>
     
    <div className="App">
      <Routes>
        <Route path="/login" element={<SignInSide />}> </Route>
        <Route path="/home" element={<ResponsiveAppBar />}></Route>
        <Route path="/home/project/dashboard" element={<ViewDashboard />}></Route>
        <Route path="/home/project/scan" element={<ComponentCvesScan />}></Route>
        
        <Route path="/home/project/scan/results" element={<DisplayScanResults />}></Route>
        <Route path="/home/project/sbom" element={<ReadXlsSbom />}></Route>
        <Route path="/home/project/sbom/:project" element={<ReadXlsSbom />}></Route>
        <Route path="/home/user/registration" element={<RegisterUser />}></Route>
        <Route path="/home/user/resetPassword" element={<ResetPassword />}></Route>
        <Route path="/home/admin" element={<AdminHomePage />}></Route>
        <Route path="/home/admin/assign" element={<AssignProject />}></Route>
        <Route path="/home/admin/project/add" element={<AddProject />}></Route>

      </Routes>


    </div>
    </div>


  );

}


export default App;
