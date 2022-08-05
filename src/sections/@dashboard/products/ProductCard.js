import { useState } from "react";
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Modal, Button } from 'antd';
// utils
import axios from "axios";
import { fCurrency } from '../../../utils/formatNumber';
// components
import DeleteApi from "../../../components/CRUD-Courses/DeleteApi";
import Label from '../../../components/Label';
import UpdateApi from "../../../components/CRUD-Courses/UpdateApi";
import { ColorPreview } from '../../../components/color-utils';


// ----------------------------------------------------------------------


const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ course }) {
  const { name, cover, costPrice, duration, salePrice, shortDescription, type, totalLectures, _id } = course;
  console.log(course);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  return (
    <Card>
      
      <Box sx={{ pt: '100%', position: 'relative' }}>
        
        <ProductImgStyle alt={name} src={cover.url} />
      </Box>
      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through'
              }}
            >
              { costPrice }
            </Typography>
            &nbsp;
            { salePrice }
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
       {/* <Button variant="contained" size="medium">Update</Button> */}
       <Button onClick={showModal}> 
            Edit Course
          </Button>
      <Modal title="Edit Course" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <UpdateApi course={course}/>
      </Modal>
              {/* CRUD-COURSES Delete Api Axios Request */}
        <DeleteApi course={course}/>
      </Stack>
      </Stack>
    </Card>
  );
}
