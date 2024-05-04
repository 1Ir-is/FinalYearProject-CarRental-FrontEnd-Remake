import { useState, useEffect } from 'react';
import { Button, Form, Input, InputNumber, Select, message, Spin, Modal } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { uploadImageToCloudinary } from '../../Components/Cloudinary/CloudinaryConfiguration'; 



const { Option } = Select;

const EditPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [postData, setPostData] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(`https://localhost:7228/api/Home/get-post-vehicle/${postId}`);
        setPostData(response.data);
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    fetchPostData();
  }, [postId]);

  console.log(postData);

  const onFinish = async (values) => {
    setIsModalVisible(true);
    form.setFieldsValue(values);
  };

  const handleModalOk = async () => {
    setIsModalVisible(false);
    setConfirmLoading(true);
  
    try {
      const values = await form.validateFields();
      
      // If no new image is uploaded, remove the 'Image' property from the values object
      if (!imageUrl) {
        delete values.Image;
      } else {
        values.Image = imageUrl; // Update the image URL if a new image is uploaded
      }
  
      // Send the update request immediately
      const response = await axios.put(`https://localhost:7228/api/Owner/update-post/${postId}`, values);
      console.log(response.data);
      message.success('Post updated successfully!');
      navigate('/owner/vehicle-post');
    } catch (error) {
      console.error('Error updating post:', error);
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    try {
      setLoading(true);
      const imageUrl = await uploadImageToCloudinary(file);
      setImageUrl(imageUrl);
      setLoading(false);
    } catch (error) {
      console.error('Error uploading image:', error);
      setLoading(false);
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
        form={form}
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
          <Form.Item label="Image" name="image">
  <div>
    {imageUrl || postData.image ? (
      <div style={{ marginBottom: '8px' }}>
        {postData.image && (
          <div>
            <img src={postData.image} alt="Post Image" style={{ maxWidth: '100%' }} />
            <Button type="link" className="border border-gray-300 rounded px-4 mt-3 shadow" onClick={() => setPostData({...postData, image: ''})}>
              Remove Image
            </Button>
          </div>
        )}
        {imageUrl && (
          <div>
            <img src={imageUrl} alt="Post Image" style={{ maxWidth: '100%' }} />
            <Button type="link" className="border border-gray-300 rounded mt-3 px-4 shadow" onClick={() => setImageUrl('')}>
              Remove Image
            </Button>
          </div>
        )}
      </div>
    ) : (
      <input type="file" onChange={handleFileChange} />
    )}
    {loading && <Spin />} {/* Display loading spinner while uploading image */}
  </div>
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
          {/* Confirmation Modal */}
      <Modal
        title="Confirmation"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okButtonProps={{ className: 'bg-sky-500 hover:bg-sky-700', loading: loading }} // Pass loading prop to the OK button
        cancelButtonProps={{ className: 'bg-red-500 hover:bg-red-700' }}
      >
        <p>Are you sure you want to update this post?</p>
      </Modal>
    </div>
  );
};

export default EditPost;
