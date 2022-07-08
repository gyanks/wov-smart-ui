
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-number-input'

import 'react-phone-number-input/style.css'
import './RegisterUser.css'


const RegisterUser = () => {

  const RegistrationForm = () => {

    const navigate = useNavigate();

    const [userId, setUserId] = useState();
    const [password, setPassword] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [role, setRole] = useState();
    const [company, setCompany] = useState();
    const [email, setEmail] = useState();
    const [mobile, setMobile] = useState();

    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState({
      'isError': false,
      "errorMessage": ""
    });
  const [emailInvalid,setEmailInvalid] = useState('');
  const [ firstNameInvalid,setFirstNameInvalid] = useState('');
  const[formInvalid,setFormInvalid] = useState(false)
   
  
  const userIdHandler = (e) => {
      const formEmail=e.target.value;

      if(formEmail=='' || formEmail==null){

        setFormInvalid(true);
        setEmailInvalid("Email is Required ");
        return ;
      }
      //(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+[\.[A-Z]{2,}]{1,2}$/i.test(formEmail)
      else if(! formEmail.include('@')){
        setFormInvalid(true);
        setEmailInvalid("Email should be in correct format");
        return ;

      }
      else{
        setEmailInvalid(" ")
      }
      setUserId(formEmail);
      setSubmitted(false);
    };


    const passwordHandler = (e) => {
      setPassword(e.target.value);
      setSubmitted(false);
    };


    const emailHandler = (e) => {
      setEmail(e.target.value);
      setSubmitted(false);
    };

    const mobileHandler = (e) => {
      setMobile(e.target.value);
      setSubmitted(false);
    };

    const roleHandler = (e) => {
      setRole(e.target.value);
      setSubmitted(false);
    };
    const companyHandler = (e) => {
      setCompany(e.target.value);
      setSubmitted(true);
    };

    const firstNameHandler = (e) => {
      const formFirstName=e.target.value;
      if(formFirstName=='' || formFirstName.length===0){

        setFirstNameInvalid("First name is Required");
        setFormInvalid(true);
        return;

      }
     else  if(formFirstName.length<3){

        setFirstNameInvalid(" First name should be minumum 3 charactors")
        setFormInvalid(true);

      }

     else  if(!formFirstName.match(/^[a-zA-Z]+$/)){
        setFirstNameInvalid(" First Name should have Alphabates Only ")
        setFormInvalid(true);


      }
      else{
        setFirstNameInvalid("")
      }
      setFirstName(e.target.value);
      setSubmitted(false);
    };

    const lastNameHandler = (e) => {
      setLastName(e.target.value);
      setSubmitted(false);
    };

    const submitHandler = (event) => {
      event.preventDefault();
      console.log("submit handler .. ")
      const userRegistration = {
        "username": userId,
        firstName,
        lastName,

        mobile,
        "hash": 'aaa',
        "loginFlag": "0",
        role,
        company


      }

      console.log(" for registrtion" + JSON.stringify(userRegistration));

      fetch("https://b58laqvjjg.execute-api.ap-southeast-1.amazonaws.com/dev/registeruser", {

        method: "POST",
        body: JSON.stringify(userRegistration),

        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      }).then(response => {


        return response.json()
      }

      ).then(data => {


        if (data.statusCode === 409) {
          setError({
            "isError": true,
            "errorMessage": "User already exist with this email id"
          })
          alert(" User already exist with this email id");
          Promise.reject("User already exist with this email id")
        }
        if (data.statusCode === 408) {
          setError({
            "isError": true,
            "errorMessage": " Unable to send email to this Id, please contact Admin "
          })
          alert("Unable to send email to this Id, please contact Admin ");
          Promise.reject("Unable to send email to this Id, please contact Admin")
        }


        alert("user registered successful " );
        navigate("/home/admin");

      })
        .catch(error => console.log("there was error in user registration " + error));

      // saveToDb(userRegistration);
    };



    /*
        const saveToDb = (user) => {
    
          fetch("http://localhost:4000/users/register", {
    
            method: "POST",
    
    
            body: JSON.stringify(user),
    
    
            headers: {
              "Content-type": "application/json",
              "Access-Control-Allow-Origin": "*"
            }
          }).then(response => {
    
            if (!response.ok) {
    
              console.log('User Registration failed  ' + error)
              return Promise.reject(error);
            }
            return response.json()
    
          }).then(data => {
            console.log("user registerd successful " + data)
    
    
          })
            .catch(error => console.log("there was error in user registration " + error))
        }
    
    */





    return (
      <div className="container">

        <form onSubmit={submitHandler} noValidate>
          <div className="row">
            <div className="row">
              <label className="col-10">Email </label>
              <input className="col-90" name="email" type="email" required value={userId} onChange={userIdHandler}></input>
              <span style={{"color":'red'}}>{emailInvalid}</span>
            </div>
            <label className="col-10">FirstName</label>
            <input className="col-90"  name="firstName" type="text"  required minLength="3" value={firstName} onChange={firstNameHandler}></input>
            <span style= {{"color":'red'}}>  {firstNameInvalid}</span>
          </div>

          <div className='row'>
            <label className='col-10'>LastName</label>
            <input className="col-90" name="lastName" type="text" value={lastName} onChange={lastNameHandler}></input>
          </div>

          <div className='row'>
          <label className='col-10'>Mobile</label>
            <PhoneInput   style ={{width:"45%"}}className="col-90" placeHolder='Enter Mobile Number' defaultCountry='IN' value={mobile} onChange={mobile => setMobile(mobile)}></PhoneInput>
            
          </div>
          <div className="row">
            <label className='col-10'>Role </label>
            <select  style={{width:"45%"}}className="col-90"  value={role} onChange={roleHandler}>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>

          <div className="row">
            <label className='col-10'>Company Name </label>
            <input className="col-90"  required type="text" value={company} onChange={companyHandler}></input>
          </div>






          <button type="submit" disabled={!submitted}> Submit</button>
        </form>

        <div style={{ "color": 'red' }}>

          <h3> {error.isError ? error.errorMessage : " "}</h3>
        </div>
      </div>
    );
  }

  return (

    <div>

      <h1> Registration Form</h1>
      <RegistrationForm />
    </div>
  )

};

export default RegisterUser;