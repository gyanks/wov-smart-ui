import './RegisterUser.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
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


    const userIdHandler = (e) => {
      setUserId(e.target.value);
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
      setSubmitted(false);
    };

    const firstNameHandler = (e) => {
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

      fetch("https://5w3a2f7pqh.execute-api.ap-southeast-1.amazonaws.com/dev/users/register", {

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

        if (data.statusCode === 200) {
          alert("user registered successful " + JSON.stringify(data));
          navigate("/home/admin");
        }
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

        <form onSubmit={submitHandler}>
          <div className="row">
            <div className="row">
              <label className="col-10">Email </label>
              <input className="col-90" type="text" value={userId} onChange={userIdHandler}></input>
            </div>
            <label className="col-10">FirstName</label>
            <input className="col-90" type="text" value={firstName} onChange={firstNameHandler}></input>
          </div>

          <div className='row'>
            <label className='col-10'>LastName</label>
            <input className="col-90" type="text" value={lastName} onChange={lastNameHandler}></input>
          </div>

          <div className='row'>
            <label className="col-10">Mobile Number</label>
            <input className="col-90" type="text" value={mobile} onChange={mobileHandler}></input>
          </div>
          <div className="row">
            <label className='col-10'>Role </label>
            <input className="col-90" type="text" value={role} onChange={roleHandler}></input>
          </div>

          <div className="row">
            <label className='col-10'>Company Name </label>
            <input className="col-90" type="text" value={company} onChange={companyHandler}></input>
          </div>






          <button type="submit"> Submit</button>
        </form>

         <div style={{color:red}}> 

           <h3> {error.isError ?error.errorMessage : " "}</h3>
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