import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
import Modal from 'antd/lib/modal/Modal';

export default function Signup() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const [submitLoader, setSubmitLoader] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log('signUpValues', values);
    const response = await axios.post('http://localhost:4000/signup', values);
    console.log('bad response', response);

    if (response.status === 201) {
      console.log('signUp resOk response', response);
      navigate('/confirm');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className='formContainer'>
      <Form
        name='basic'
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 8,
        }}
        initialValues={{
          remember: true,
        }}
        style={{
          maxWidth: '700px',
          minWidth: '400px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Form.Item
          wrapperCol={{
            offset: 15,
            span: 16,
          }}
        >
          <h1>Sign Up</h1>
        </Form.Item>
        <Form.Item
          label='Email'
          name='email'
          labelCol={{ span: 24, offset: 12 }}
          wrapperCol={{ span: 24, offset: 12 }}
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          labelCol={{ span: 24, offset: 12 }}
          wrapperCol={{ span: 24, offset: 12 }}
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label='Confirm Password'
          name='confirmPassword'
          labelCol={{ span: 24, offset: 12 }}
          wrapperCol={{ span: 24, offset: 12 }}
          rules={[
            {
              required: true,
              message: 'Confirm password must be the same as password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 15,
            span: 16,
          }}
        >
          <Button type='primary' htmlType='submit'>
            Sign Up
          </Button>
        </Form.Item>
        <Form.Item>
          Already have an account? <Link to='/login'>Log in</Link>
        </Form.Item>
      </Form>
      <Modal
        title='Something went wrong'
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Please check whether all the fields are filled right!</p>
        <p>and Please try Again</p>
      </Modal>
    </div>
  );
}
