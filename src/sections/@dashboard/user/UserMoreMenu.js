import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Modal, Button } from 'antd';
import 'antd/dist/antd.css';

import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// component
import MentorUpdateApi from '../../../components/CRUD-MentorProfile/MentorUpdateApi';
import MentorDeleteApi from '../../../components/CRUD-MentorProfile/MentorDeleteApi';
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

export default function UserMoreMenu({row}) {

  const { _id } = row
  console.log(row);


  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
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
    <>
      {/* <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      > */}
        {/* <MenuItem sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem> */}

        {/* <MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }} onClick={showModal}>
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem> */}
      {/* </Menu> */}
      <div style={{display: "flex"}}>
      <Button onClick={showModal}>Edit</Button>
        <Modal title="Edit Mentor Profile" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <MentorUpdateApi row={row}/>
      </Modal>
      <MentorDeleteApi row={row}/>
      </div>
    </>
  );
}
