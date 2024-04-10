import React, { useState, useEffect } from 'react';
import { Button, Form, Input, InputNumber, Select, message } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Option } = Select;

const EditPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [postData, setPostData] = useState(null);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(`https://localhost:7228/api/Owner/get-post-vehicle/${postId}`);
        setPostData(response.data);
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    fetchPostData();
  }, [postId]);

  const onFinish = async (values) => {
    try {
      const response = await axios.put(`https://localhost:7228/api/Owner/update-post/${postId}`, values);
      console.log(response.data);
      message.success('Post updated successfully!');
      navigate('/vehicle-post');
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <div className="container">
      {postData && (
        <Form
        className='w-1/2 mx-auto bg-white p-6 rounded-lg shadow-md'
        style={{ marginTop: '35px', marginBottom: '35px' }}
        labelCol={{
            xs: { span: 24 },
            sm: { span: 6 },
        }}
        wrapperCol={{
            xs: { span: 24 },
            sm: { span: 14 },
        }}
          onFinish={onFinish}
          initialValues={postData}
        >
          <Form.Item label="Vehicle Name" name="vehicleName" rules={[{ required: true, message: 'Please input the vehicle name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Fuel Type" name="vehicleFuel" rules={[{ required: true, message: 'Please input the fuel type!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Vehicle Type" name="vehicleType" rules={[{ required: true, message: 'Please input the vehicle type!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Manufacturing Year" name="vehicleYear" rules={[{ required: true, message: 'Please input the manufacturing year!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Number of Seats" name="vehicleSeat" rules={[{ required: true, message: 'Please input the number of seats!' }]}>
            <InputNumber />
          </Form.Item>
          <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please input the title!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please input the description!' }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Category" name="category" rules={[{ required: true, message: 'Please select the category!' }]}>
            <Select>
              <Option value="Car">Car</Option>
              <Option value="Motorbike">Motorbike</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Please input the price!' }]}>
            <InputNumber />
          </Form.Item>
          <Form.Item label="Address" name="address" rules={[{ required: true, message: 'Please input the address!' }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="PlaceId"
            name="placeId"
            rules={[{ required: true, message: 'Please input the place ID!' }]}
            extra={<a href="https://developers.google.com/maps/documentation/places/web-service/place-id" target="_blank" rel="noopener noreferrer" style={{ marginTop: '8px', display: 'block' }}>Take your Place ID</a>}
          >
            <Input />
          </Form.Item>
    
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
              <Button className='bg-sky-500 hover:bg-sky-700' type="primary" htmlType="submit">
                Update
              </Button>
            </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default EditPost;
