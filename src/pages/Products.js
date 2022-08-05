import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Container, Stack, Typography,  } from '@mui/material';
import { Modal, Button } from 'antd';
import 'antd/dist/antd.css';
// components
// import PostAPI from './src/components/CRUD-Courses/PostAPI';
import PostAPI from '../components/CRUD-Courses/PostAPI'
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import PRODUCTS from '../_mock/products';


// ----------------------------------------------------------------------

export default function EcommerceShop() {


  const [openFilter, setOpenFilter] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

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
    <Page title="Dashboard: Products">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Courses
        </Typography>
         <div>
         <Button onClick={showModal}> 
            New Course
          </Button>
      <Modal title="Add New Course" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <PostAPI/>
      </Modal>
         </div>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              isOpenFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>

        <ProductList products={PRODUCTS} />
        <ProductCartWidget />
      </Container>
    </Page>
  );
}
