import React, {useState, useEffect} from 'react';
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


const PostAPI = () => {

    const [form] = Form.useForm();
    const [courseData, setCourseData] = useState([]);
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")))
    console.log(token)
    // const [courseInput, setCourseInput] = useState({
    //   name:"", shortDescription:"", type:"", costPrice:"", salePrice:"", status:"", averageRating:"", url:"",
    //   totalReviews:"", tags:"",
    // });

    const handleChange = (e) => {
      // const name = e.target.name;
      // const value = e.target.value;
      //  setCourseInput({...courseInput, [name] : value});
    }
    
    const onFinish = async (values) => {
        console.log(values);
        console.log(token)
        setCourseData(values);
        // console.log(courseData);
        message.success('Submit success!');

        const allData = {
          "name" : values.name,
          // "cover" : values.cover,
          "shortDescription" : values.shortDescription,
          "type" : values.type,
          "costPrice" : values.costPrice,
          "salePrice" : values.salePrice,
       }
       
       console.log();
        axios({
            method: "post",
            url: "https://mentostar-api.applore.in/api/model/course",
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
        message.error("Submit Failed!")
      };

    const handleSubmit = () => {
        // const allData = JSON.stringify({
        //    "name" : courseInput.name,
        //    "shortDescription" : courseInput.shortDescription,
        //    "type" : courseInput.type,
        //    "costPrice" : courseInput.costPrice,
        //    "salePrice" : courseInput.salePrice,
        //    "averageRating" : courseInput.averageRating,
        // })
        // try {
        //   const AuthStr = JSON.parse(localStorage.getItem('token'))
        //   console.log(AuthStr);
        //   await axios({
        //     method: 'POST',
        //     url: 'https://mentostar-api.applore.in/api/model/course',
        //     header: {
        //       "Content-type": "Application/json",
        //       "Authorization": `Bearer ${AuthStr}`
        //     },
        //     body: allData
        //   })
          
        // } catch(error) {
        //   console.log(error);
        // }
      }
  return (
    <>
       <Form 
       {...layout} name="nest-messages" validateMessages={validateMessages} 
       form={form} onSubmit={handleSubmit}
       onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <Form.Item
        name={['name']}
        label="Name"
        rules={[
          {
            required: true,
            message: "Please Enter Course Name"
          },
          {
            whitespace: true,
            message: "Course Name cannot be empty"
          }
        ]}
        hasFeedback
      >
        <Input name='name' 
        // value={courseInput.name} 
        onChange={(e) => handleChange(e)}/>
      </Form.Item>
      <Form.Item name={['cover', 'url']} label="Url"
      rules = {[
        {
            type: 'url',
            required: true,
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
        onChange={(e) => handleChange(e)}/>
      </Form.Item>

      <Form.Item
        name={['costPrice']}
        label="Cost Price"
        rules={[
          {
            type: 'number',
            required: true,
          },
        ]}
        hasFeedback
      >
        <InputNumber name='costPrice' 
        // value={courseInput.costPrice} 
        onChange={(e) => handleChange(e)}/>
      </Form.Item>
      <Form.Item
        name={['salePrice']}
        label="Sale Price"
        rules={[
          {
            type: 'number',
            required: true,
          },
        ]}
        hasFeedback
      >
        <InputNumber name='salePrice' 
        // value={courseInput.salePrice} 
        onChange={(e) => handleChange(e)}/>
      </Form.Item>
      <Form.Item 
      name={['type']}
      label="Course Type"
      rules={[
        {
          required: true,
        },
      ]}
      hasFeedback
      >
      <Select
       placeholder="Select a Course Type"
       optionFilterProp="children"
       onChange={(e) => handleChange(e)}
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
        onChange={(e) => handleChange(e)} 
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

export default PostAPI;