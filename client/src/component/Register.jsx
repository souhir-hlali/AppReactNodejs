import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Register = () => {
    const [user, setUser] = useState({
        email:"",
        password:"",
        nom:"",
        prenom:"",
        carte_etu:"",
        classe:"",
        type:""

    })
   
    const [msg,setMsg]= useState("");
   const his=useHistory();
   axios.defaults.withCredentials = true;


    const onSub= async (e)=>{
        e.preventDefault();
       let val=  await axios.post("http://localhost:3001/register",user);


       if(val.data.msg)
       {
        setMsg(val.data.msg);
       }else{
        his.push("/login");
       }
    // console.log(val)

        

    }

    useEffect(() => {
        const checkLogin= async ()=>{
         let val= await axios.get("http://localhost:3001/login");
        
         if(val.data.user)
         {
             his.push("/profile")
             // console.log(val.data.user[0].email);
         }
        }
        checkLogin();
     }, [])
 
   

    const userInput=(event)=>{
        const {name,value}=event.target;
        setUser((prev)=>{
            return {
                ...prev,
                [name]:value
            }
        })

    }
    return (
        <>
       <div className="container" id="formm">
       <div className="row">
           <div className="col-lg-6 col-md-8 col-12 mx-auto">
           {
                  msg ? (
                       <>
                      <div class="alert alert-danger alert-dismissible">
  <button type="button" class="close" data-dismiss="alert">&times;</button>
  <strong>ERROR!</strong> {msg}
</div>
                       
                       
                       </>
                   ):null
               }
               <br />
           <form onSubmit={onSub}>
  <div className="form-group">
    <label >Email address:</label>
    <input type="email" className="form-control" placeholder="Enter email" name="email" value={user.email} onChange={userInput}  required/>
  </div>
  <div className="form-group">
    <label for="pwd">Password:</label>
    <input type="password" className="form-control" placeholder="Enter password" name="password" value={user.password} onChange={userInput} required />
  </div>
  <div className="form-group">
    <label for="pwd">Last Name</label>
    <input type="text" className="form-control" placeholder="Enter last name" name="nom" value={user.nom} onChange={userInput} required />
  </div>
  <div className="form-group">
    <label for="pwd">First Name</label>
    <input type="text" className="form-control" placeholder="Enter first name" name="prenom" value={user.prenom} onChange={userInput} required />
  </div>
  <div className="form-group">
    <label for="pwd">Student Card:</label>
    <input type="text" className="form-control" placeholder="Enter student card" name="carte_etu" value={user.carte_etu} onChange={userInput} required />
  </div>
  <div className="form-group">
    <label for="pwd">Class:</label>
    <input type="text" className="form-control" placeholder="Enter your class" name="classe" value={user.classe} onChange={userInput} required />
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
           </div>
       </div>
       </div>
            
        </>
    )
}

export default Register
