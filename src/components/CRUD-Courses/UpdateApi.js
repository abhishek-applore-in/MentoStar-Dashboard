import React, {useState, useEffect} from 'react';
import 'antd/dist/antd.css';
import { Button, Form, Input, InputNumber, message, Select,  } from 'antd';
import axios from 'axios';

const UpdateApi = ({course}) => {

  const { _id } = course;

  console.log(course);

    const [form] = Form.useForm();

    const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));

    console.log(token);
    console.log(token);

    const layout = {
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 16,
        },
      };


      const onComplete = async (values) => {
       console.log(course)
        console.log(values);

         message.success('Submit success!');

         const allData = {
            "name" : values.name,
            // "cover" : values.cover,
            // "shortDescription" : values.shortDescription,
            // "type" : values.type,
            // "costPrice" : values.costPrice,
            // "salePrice" : values.salePrice,
         }
         console.log(allData)
         console.log(token)
        try {
          axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
          const result = await axios({
            method: 'PATCH',
             url: `https://mentostar-api.applore.in/api/model/course/${_id}`,
             headers: {
             "Content-type": "Application/json"},
             data: allData
          })
          console.log(result)
        } catch (err) {
          console.log(err)
        }
      }

  return (
    <>
      <Form 
       {...layout} name="nest-messages"  
       form={form} 
       onFinish={onComplete}>
      <Form.Item
        name={['name']}
        label="Name"
        rules={[
          {
            // required: true,
            message: "Please Enter Course Name"
          },
          {
            whitespace: true,
            message: "Course Name cannot be empty"
          }
        ]}
        hasFeedback
      >
        <Input name='name'/>
      </Form.Item>
      <Form.Item name={['cover', 'url']} label="Url"
      rules = {[
        {
            type: 'url',
            // required: true,
            message: "Please Enter Correct Image/Video Url"
        },
        {
            whitespace: true,
            message: "Url cannot be empty"
        }
      ]}
        hasFeedback
      >
        <Input name='url' 
        // value={courseInput.url} 
        />
      </Form.Item>

      <Form.Item
        name={['costPrice']}
        label="Cost Price"
        rules={[
          {
            type: 'number',
            // required: true,
          },
        ]}
        hasFeedback
      >
        <InputNumber name='costPrice' 
        // value={courseInput.costPrice} 
        />
      </Form.Item>
      <Form.Item
        name={['salePrice']}
        label="Sale Price"
        rules={[
          {
            type: 'number',
            // required: true,
          },
        ]}
        hasFeedback
      >
        <InputNumber name='salePrice' 
        // value={courseInput.salePrice} 

        />
      </Form.Item>
      <Form.Item 
      name={['type']}
      label="Course Type"
      rules={[
        {
        //   required: true,
        },
      ]}
      hasFeedback
      >
      <Select
       placeholder="Select a Course Type"
       optionFilterProp="children"
       name="type"
      //  value={courseInput.type}
       filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}>
    <Select.Option value="Pre-Recorded">Pre-Recorded</Select.Option>
    <Select.Option value="Live Session 1 on 1">Live Session 1 on 1</Select.Option>
    <Select.Option value="Live Group Session">Live Group Session</Select.Option>
  </Select>
      </Form.Item>
      {/* </div> */}
      <Form.Item name={['shortDescription']} label="Short Description" 
      rules={[
        {
          
        },
        {
          whitespace: true,
          message: "Short Description cannot be empty"
        }
      ]}
      hasFeedback
      >
        <Input.TextArea name='shortDescription' 
        // value={courseInput.shortDescription}
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

export default UpdateApi