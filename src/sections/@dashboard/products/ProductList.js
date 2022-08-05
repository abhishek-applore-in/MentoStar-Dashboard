import PropTypes from 'prop-types';
import axios from 'axios';
// material
import { Grid } from '@mui/material';
import { useEffect, useState } from "react";
import ShopProductCard from './ProductCard';

// ----------------------------------------------------------------------

ProductList.propTypes = {
  products: PropTypes.array.isRequired
};

export default function ProductList({ products, ...other }) {

  const [coursesData, setCoursesData] = useState([]);

  const CourseData = async () => {

    const URL = "https://mentostar-api.applore.in/api/model/course";
    const AuthStr = JSON.parse(localStorage.getItem('token'))
    console.log(AuthStr)
    axios.get(URL,
    { 
        'headers': { 
        'Authorization' : `Bearer ${AuthStr}`  
      } 
    })
    .then((response) => {
      console.log(response.data);
      setCoursesData(response.data.result);     
    })
    .catch((error) => {
      console.log(error);
    });
  }

useEffect(() => {
  CourseData();
}, [])

// console.log(coursesData)

  return (
    <Grid container spacing={3} {...other}>
        { coursesData?.map((course, index) => 
          // <h1 key={index}> { item.name } </h1>
          <Grid key={index} item xs={12} sm={6} md={3}>
          <ShopProductCard course={course} />
        </Grid>
        ) }
    
    </Grid>

  );
}
