import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Button, Form, Input, InputNumber, message, Select,  } from 'antd';
import axios from 'axios';

const { Option } = Select;

const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  /* eslint-disable no-template-curly-in-string */
  
  const validateMessages = {
    required: '${label} is required!',
  };

const MentorPostApi = () => {

    const [ form ] = Form.useForm()
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")))
    // const [formState, setFormState]
    console.log(token);

    const onFinish = (values) => {
      console.log(values);
      console.log(token);

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
     console.log(allData);
      axios({
          method: "post",
          url: "https://mentostar-api.applore.in/api/model/mentor-profile",
          data: allData,
          headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
          },
      })
          .then((res) => {
             console.log(res)
          })
          .catch((err) => {
              console.log(err)
          });
    }

    const onFinishFailed = () => {
        message.error('Submit failed!');
    };

  


  return (
       <>
    <Form 
       {...layout} name="nest-messages" validateMessages={validateMessages} 
       form={form} 
       onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <Form.Item
        name={['firstname']}
        label="First Name"
        rules={[
          {
            required: true,
            message: "Please Enter First Name",
          },
          {
            whitespace: true,
            message: "First Name cannot be empty"
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
            required: true,
            message: "Please Enter Last Name"
          },
          {
            whitespace: true,
            message: "Last Name cannot be empty"
          }
        ]}
        hasFeedback
      >
        <Input name='lastname' />
      </Form.Item>
      <Form.Item name={['picture']} label="Profile Picture"
      rules = {[
        {
            type: 'url',
            required: true,
            message: "Please Enter Correct Profile Image"
        },
        {
            whitespace: true,
            message: "Profile Image cannot be empty"
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
            required: true,
            message: 'Enter Mentor Education'
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
            required: true,
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
          required: true,
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
          required: true,
        },
        {
          whitespace: true,
          message: "Short Description cannot be empty"
        }
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

export default MentorPostApi