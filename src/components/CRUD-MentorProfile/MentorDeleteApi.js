import React from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import axios from "axios";

const MentorDeleteApi = ({row}) => {

    const { _id } = row
    console.log(row);

    const handleDelete = async (row) => {
        console.log(row);
        const AuthStr = JSON.parse(localStorage.getItem('token'))
        console.log(AuthStr)
        axios.delete(`https://mentostar-api.applore.in/api/model/mentor-profile/${row}`,  
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
    <Button variant="contained" size="medium" color="error" onClick={(_id)=>handleDelete(row._id)}>Remove</Button>
  )
}

export default MentorDeleteApi