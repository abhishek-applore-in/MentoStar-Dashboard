import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Button, Form, Input, InputNumber, message, Select,  } from 'antd';
import axios from 'axios';


const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };


const MentorUpdateApi = ({row}) => {

    const { _id } = row

    const [ form ] = Form.useForm();
    const[token, setToken] = useState(JSON.parse(localStorage.getItem("token")));
    console.log(token);

    const onFinish = async (values) => {
        console.log(values);
     message.success('Submit success!');

     const allData = {
        "firstname" : values.firstname,
        "lastname" : values.lastname,
        "picture" : values.picture,
        "education" : values.education,
        "experience" : values.experience,
        "description" : values.shortDescription,
        "totalEarnings" : values.totalEarnings
     }
     console.log(allData)
     console.log(token)
    try {
      axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
      const result = await axios({
        method: 'PATCH',
         url: `https://mentostar-api.applore.in/api/model/mentor-profile/${_id}`,
         headers: {
         "Content-type": "Application/json"},
         data: allData
      })
      console.log(result)
    } catch (err) {
      console.log(err)
    }
    }

    const onFinishFailed = () => {
        message.error('Submit failed!');
    } 

  return (
    <>
       <Form 
       {...layout} name="nest-messages"  
       form={form} 
       onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <Form.Item
        name={['firstname']}
        label="First Name"
        rules={[
          {
        
          }
        ]}
        hasFeedback
      >
        <Input name='firstname' />
      </Form.Item>
      <Form.Item
        name={['lastname']}
        label="Last Name"
        rules={[
          {
    
          },
        ]}
        hasFeedback
      >
        <Input name='lastname' />
      </Form.Item>
      <Form.Item name={['picture']} label="Profile Picture"
      rules = {[
        {
            type: 'url',
            message: "Please Enter Correct Profile Image"
        }
      ]}
        hasFeedback
      >
        <Input name='picture' />
      </Form.Item>

      <Form.Item
        name={['education']}
        label="Education"
        rules={[
          {
          },
        ]}
        hasFeedback
      >
        <Input name='education' />
      </Form.Item>
      <Form.Item
        name={['experience']}
        label="Experience"
        rules={[
          {
          },
        ]}
        hasFeedback
      >
        <InputNumber name='experience' />
      </Form.Item>
      <Form.Item 
      name={['totalEarnings']}
      label="Total Earnings"
      rules={[
        {
        },
      ]}
      hasFeedback
      >
     <InputNumber name='totalEarnings'/>
      </Form.Item>
      {/* </div> */}
      <Form.Item name={['description']} label="Short Description" 
      rules={[
        {
        },
      ]}
      hasFeedback
      >
        <Input.TextArea name='shortDescription' 
        />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </>
  )
}

export default MentorUpdateApi