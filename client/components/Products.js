import React,{useEffect,useState} from 'react'
import axios from 'axios'
import './Form.css'


const Products = () => {
    const [data,setData]=useState([])
    const [text,setText]=useState('')
    const [original,setOriginal]=useState([]);
    
  
    

    useEffect(()=>{
        axios.get("http://127.0.0.1:5000/items")
        .then((resp)=>{
            const data=resp.data;
            setOriginal(data);
           
            setData(data);
        })
        .catch((error)=>{
          console.log('error in fetching data',error)
        })
      },[])


    const remove=(e)=>{
       const id2=+e.target.value;

       const arr=data.filter((item)=>item.id!==id2)
       setData(arr)
          
       }
    
      
      const handle_change=(e)=>{
         setText(e.target.value||'');
         const arr=data.filter((item)=>item.title.toLowerCase().includes(text.toLowerCase()));
         setData(arr)
         if(e.target.value==='')
           setData(original)
        
      }

     

  return (
      <div class='product'>
      
        <input type="text" placeholder='enter items for searching' value={text} onChange={handle_change} />
    
    
    <div class='container'>
      
    {
        data.map((item)=>{
           return(
               <div className="card" key={item.id}>
             <div class='card-body'>
             <img src={item.image} alt="Name of"/>
               <p>{item.title.substr(0,15)}</p>
               <p>${item.price}</p>
               <p>{item.category.charAt(0).toUpperCase()+item.category.slice(1)}</p>

               </div>
            <button class='remove' value={item.id} onClick={remove}>Remove</button>
               
          </div>


           )
        })
      }
       
    
      </div>
    
    
    </div>
  )
}



export default Products;