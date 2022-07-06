import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';


//import ResponsiveAppBar from './ResponsiveAppBar';

import SecurityImage from './image/AdobeStock.jpg'

import { Label } from '@mui/icons-material';

import './SignInSide.css'

function Copyright(props) {
  return (

    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.bosch-softwaretechnologies.com/">
        BGSW
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide(props) {

  const navigate = useNavigate();

  localStorage.removeItem("loginDetails");
  localStorage.removeItem("auth");
  const [error, setError] = useState({
    'isError': false,
    'errorMessage': ''
  })

  const handleSubmit = (event) => {
    event.preventDefault();
    const loginData = new FormData(event.currentTarget);
    const loginUser = {
      "username": loginData.get('username').toLowerCase(),
      "password": loginData.get("password")
    }


    fetch("https://5w3a2f7pqh.execute-api.ap-southeast-1.amazonaws.com/dev/login", {
      // Adding method type
      method: "POST",

      // Adding body or contents to send
      body: JSON.stringify({
        "email": loginData.get('username').toLowerCase(),
        "password": loginData.get('password')
      }),

      // Adding headers to the request
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    }).then(response => {

      if (!response.ok) {
        const error = response.status;
        const tempError = {
          'isError': true,
          'errorMessage': error

        }
        setError(tempError);


        return Promise.reject(error);
      }
      else {


        return response.json()


      }

    }).then(data => {
      /* If user id not exist */

      if (data.statusCode === 404) {
        const tempError = {
          'isError': true,
          'errorMessage': ' User Does Not exist , please Register yourself '

        }
        setError(tempError);
        return Promise.reject(tempError.errorMessage)

      }
      /* if password not match */
      if (data.statusCode === 401) {
        const tempError = {
          'isError': true,
          'errorMessage': ' There is some error in authentication userId or Password not match '

        }
        setError(tempError);
        return Promise.reject(tempError.errorMessage)

      }

      /* user logged in successfully */
      if (data.statusCode === 200) {
        localStorage.setItem("auth", "true");
        localStorage.setItem("loginDetails", JSON.stringify(data));
        // navigation page 

        if (data.body.role === 'user')
          navigate("/home/project/dashboard");
        if (data.body.role === 'admin' || data.body.role === 'Admin')
          navigate("/home/admin");

      }
    })
      .catch(error => console.log("there was error in fetching authntication "))
  }


  /* <Grid className='flex-container banner-text'>

          <div className='flex-item1'></div>
          <div className='flex-item2 main-text'> Say No to  <span className='flex-item2 main-text font-red' > Vulnerability </span>   </div>
          <div className='main-text2'> Vulnerability free Mobility </div>
        </Grid>
      </Grid>
      <Copyright sx={{ mt: 5, backgroundColor: 'white', align: 'left' }} />

      */

  return (



    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />

        <Grid
          item
          xs={false}
          sm={true}
          md={9}
          sx={{
            backgroundImage: `url(${SecurityImage})`,
            backgroundRepeat: 'no-repeat',

            backgroundSize: 'cover',
            backgroundPosition: 'right bottom',



          }}
        />
        <Grid item sm={true} md={true} component={Paper} elevation={7} square>

          < div className='card-sign-in'>


            <header className='login-header'>
              <h1> Sign in to Wov Smart </h1>

            </header>



            <form noValidate onSubmit={handleSubmit} >


              <div className='form-group'>
                <label >  Email </label>
                <TextField className='form-control'
                  margin="normal"
                  required
                  fullWidth
                  id="username"

                  name="username"
                  autoComplete="username"
                  autoFocus

                />
              </div>

              <div className='form-group'>
                <label > Password </label>
                <TextField className='form-control'
                  margin="normal"
                  required
                  fullWidth
                  name="password"

                  type="password"
                  id="password"
                  autoComplete="current-password"

                />

              </div >




              <div className=' login-button '>

                <input type="submit" value="Sign In" name="LogIn"></input>

              </div>



            </form>

            <div className="error">
              <h3>    {error.isError ? error.errorMessage : ' '}</h3>

            </div>
          </div >





        </Grid>
      </Grid>

    </ThemeProvider>


  );


}