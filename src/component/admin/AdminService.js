
const getAllUsers = () =>{
   const usersUrl="";
   headerOptions={
     "content-type":"application/json"

   }

    fetch(usersUrl,headerOptions ).
    then(response => {return response.json()})
    .then(data )
}