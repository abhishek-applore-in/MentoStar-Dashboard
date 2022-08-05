import React from 'react';
import { Button } from 'antd';
import axios from "axios";


const DeleteApi = ({course}) => {

    const { name, cover, costPrice, duration, salePrice, shortDescription, type, totalLectures, _id } = course;
     console.log(course);
     
    const handleDelete = async (course) => {
        console.log(course);
        const AuthStr = JSON.parse(localStorage.getItem('token'))
        console.log(AuthStr)
        axios.delete(`https://mentostar-api.applore.in/api/model/course/${course}`,  
        {
          'headers': {  
          "Content-type": "application/json", 
          "Authorization" : `Bearer ${AuthStr}`  
          }
        })
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
      }
      
    

  return (

    <Button variant="contained" size="medium" color="error" onClick={(_id)=>handleDelete(course._id)}>Remove</Button>

  )
}

export default DeleteApi