import React,{useState,useEffect} from 'react';
import {baseUrl} from './baseUrl'


function Json(){
    const [state,setState]=useState([]);
    const fetchData=async ()=>{
        const response=await fetch(baseUrl+'announcements');
        const data=response.json();
        setState(data);
        console.log(data)
    }
    return(
        <div>Hello</div>
    )
}
export default Json;