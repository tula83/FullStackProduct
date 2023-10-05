import React, { useEffect,useState } from 'react'
import axios from 'axios'
import Content from './Content'
const Display = () => {
      
      const [data,setData]=useState([])
      const [text,setText]=useState('')
      const [original,setOriginal]=useState([]);

   
    useEffect(()=>{
      axios.get("http://127.0.0.1:5000/employees")
      .then((resp)=>{
          const data=resp.data;
          setOriginal(data);
          setData(data);
      })
      .catch((error)=>{
        console.log('error in fetching data',error)
      })


    },[])


    const handle_change=(e)=>{

        setText(e.target.value);
         
        console.log(text)
        const data2=data.filter((item)=>item.name.toLowerCase().includes(text.toLowerCase()));
        setData(data2);
        if(e.target.value==='')
         setData(original)
       
        
         
         
    }

  return (
    <div class='container'>
    <Content></Content>
    <input type="text" placeholder='enter text' value={text} onChange={handle_change}/>
    
    <table class='table table-bordered table-hover table-dark'>
       <thead>
           <tr>
             <th>Name</th>
             <th>Age</th>
             <th>Position</th>

           
           </tr>
       </thead>

       <tbody>
       
       { data.map((item)=>{
        return(
              <tr  key={item.id}>
               <td>{item.name}</td>
               <td>{item.age}</td>
               <td>{item.position}</td>

              
              </tr>
        )
       })

       }
       
       </tbody>
    
    </table>
    </div>

  )
}

export default Display;
