import React, { useState } from 'react'
import Popup from 'reactjs-popup'
import axios from 'axios';


const Add=()=>{
   
    const [title,setTitle]=useState('');
    const [price,setPrice]=useState('');
    const [category,setCategory]=useState("");
    const [id,setId]=useState(0);

   
   const add=()=>{
        
      
        axios.post("http://127.0.0.1:5000/items",{
         "id":id,
         "title":title,
         "price":price,
         "category":category
        })
        .then((resp)=>{
         console.log(resp)
        })
        .catch((error)=>{
         console.log('error in  posting data',error)
        })
   }
   return(

    <form>
          <label htmlFor="">Id</label><br />
          <input type="text" value={id} onChange={(e)=>setId(e.target.value)}/><br />
          <label htmlFor="">Title</label><br />
          <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)}/><br />
          <label htmlFor="">Price</label><br />
          <input type="text" value={price} onChange={(e)=>setPrice(e.target.value)} /><br />
          <label htmlFor="">Category</label><br />
          <input type="text" value={category} onChange={(e)=>setCategory(e.target.value)} />
         
          <button class='btn btn-primary' onClick={add}>Submit</button>
    </form>
   )
}

const Edit=()=>{
   return(
      <form action="">
      <input type="text" />

      
      </form>
   )
}


const Delete=()=>{
   return(
      <form action="">
      <input type="text" />
        
      
      </form>
   )
}


const Content = () => {
  
   return (



       <div>
       <Popup trigger={<button class='btn btn-primary' > ADD</button>}
       position="left"><Add/></Popup>
           
       <Popup trigger={<button class='btn btn-primary' >Edit</button>}
       position="middle"><Edit/></Popup>


       <Popup trigger={<button class='btn btn-primary'>Delete</button>}
       position="right"><Delete/></Popup>


       
           

       
       
       </div>
  )
}

export default Content