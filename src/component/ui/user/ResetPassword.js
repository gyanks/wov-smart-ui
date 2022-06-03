import { useState, useRef } from "react";

const ResetPassword = () => {
     const currentUser = localStorage.getItem("loginUser");

     const [currentPassword, setCurrentPassword] = useState();
     const [newPassword, setNewPassword] = useState();
     const [confirmPassword, setConfirmPassword] = useState();
     const [validateUser, setValidateUser] = useState(false);
     const [errorPassword, setErrorPassword] = useState('');
     const [errorConfirmPassword, setErrorConfirmPassword] = useState('');


     const currentPasswordHandler = (event) => {
          setCurrentPassword(event.target.value);

          if (currentUser.password === event.target.value)
               setValidateUser(true);

     }

     const newPasswordHandler = (event) => {
          /*
          if(event.target.value===currentUser.password)
          setErrorPassword("New Password can not same as previous password");
          */

          setNewPassword(event.target.value);

     }

     const confirmPasswordHanlder = (event) => {

          if (event.target.value !== newPassword)
               setErrorConfirmPassword("New Password and Confirm Password not matched ")

     }


     const handleSubmit = (event) => {
          event.preventDefault();

          const loginDetails = localStorage.getItem("loginDetails");
          const id = loginDetails.id;
          const token = loginDetails.token;

          const requestOptions = {

               "method": 'PUT',
               "body": JSON.stringify({
                    "password": newPassword
               }),
               headers: {
                    "Content-type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": 'Bearer ${token}'
               }
          }


          fetch("http://localhost:4000/users/${id}", requestOptions)
               .then(response => {
                    
                    return response.json()

               })
               .then(data => console.log(" password updated successfully " + data))
               .catch(error => console.log("There is error in change password " + error))


     }


     return (
          <div>

               <h2> Change Password </h2>


               <form onSubmit={handleSubmit}>
                    <div className="form-group">
                         <div className="form-control">
                              <label htmlFor="oldPassword"> Current Password </label>
                              <input type="password" id="oldPassword" onChange={currentPasswordHandler}></input>
                              <div className="text-danger"> {validateUser ? " Password Matched " : " Password not"}</div>
                         </div>
                         <div className="form-control">
                              <label htmlFor="newpassword" >New Password </label>
                              <input type="password" id="newPassword" onChange={newPasswordHandler}></input>
                         </div>
                         <div className="form-control">
                              <label htmlFor="confirm">  Confirm Password </label>
                              <input type="password" name="confirmPassword" onChange={confirmPasswordHanlder}></input>
                              <div classname="text-danger">{errorConfirmPassword}</div>
                         </div>
                         <input type="submit" value="Change Password" name="changePassword"></input>
                    </div>
               </form>



          </div>);

}

export default ResetPassword;