import logo from './logo.svg';
import './App.css';
import react, {useState, useEffect} from 'react'
import ListNotifications from './component/ListNotifications'
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';

function App() {
  const [token, setToken] = useState();
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const [isLoading, setIsLoading]= useState(false);

  const postNotification = async (token,title,body) =>{
    const res = await axios.post(`https://app-fcm.herokuapp.com/notifications`, {
      token: token,
      title: title,
      body: body
    }).then((res) => {
      const person = res.data
      toast.success("Send Notification success!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000
      });
    });
  }

  const handleSubmit = ()=>{
    setIsLoading(true)
    console.log(token,title,body);
    try{

      postNotification(token,title,body);

    }catch(e){
      toast.error("Send Notification failed!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000
      });
    }
    setTimeout(()=>{setIsLoading(false)},2000)

    

  };

  return (
    <div className="App">
      {isLoading ? 
        <div className ="loading">
          <div className="ring"></div>
        </div> 
        :<></>
      }
      <ToastContainer />
      <div className="wrapper">
          <div className="title">
            Create Item Form
          </div>
          <div className="form">
            <div className="inputfield">
                <label>Token: </label>
                <input type="text" className="input" name="token" onChange={(e)=>setToken(e.target.value)}/>
            </div>  
            <div className="inputfield">
                <label>Title: </label>
                <input type="text" className="input"  name="title" onChange={(e)=>setTitle(e.target.value)}/>
            </div> 
            <div className="inputfield">
                <label>Body: </label>
                <input type="text" className="input"  name="body" onChange={(e)=>setBody(e.target.value)}/>
            </div> 
            <div className="inputfield">
              <input type="submit" value="Register" className="btn" onClick={()=>handleSubmit()} value = "send notification"/>
            </div>
          </div>
      </div>
      <ListNotifications></ListNotifications>
    </div>
  );
}

export default App;
