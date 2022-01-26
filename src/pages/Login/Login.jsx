import { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { Link, useNavigate, Navigate } from 'react-router-dom';

import axiosInstance from '../../helpers/axiosInstance';
import { setLocalStorage, getLocalStorage } from '../../helpers/localStorage';

import styles from './Login.module.less';

export default function Login() {
  const [errorMessage, setErrorMessage] = useState('');
  const [loginLoader, setLoginLoader] = useState(false);

  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoginLoader(true);

    try {
      const response = await axiosInstance.post(`login`, values);
      const userDetails = response.data.data;

      if (response.status === 200) {
        setLocalStorage('accessToken', userDetails.token);
        setLocalStorage('currentUserId', userDetails.user._id);
        setLocalStorage('verified', userDetails.user.status);
        if (userDetails.user.status === 'verified') {
          navigate(`/${userDetails.user._id}`)
        } else {
          navigate(`/users/${userDetails.user._id}`);
        }
      }

    } catch (error) {
      setErrorMessage(error.response.data.errors[0]);
      setLoginLoader(false);
    }
  };

  const validateRequiredFields = (message) => ({required: true, message})

  return (
    <>
    { getLocalStorage('accessToken') ? <Navigate to='/' /> :
    <div className={styles.formContainer}>
      <Form
        name='basic'
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 10 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete='off'
        requiredMark={false}
      >
        <Form.Item
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <h1>Login</h1>
        </Form.Item>

        <Form.Item
          label='Email'
          name='email'
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          rules={[ validateRequiredFields('Please input your e-mail!') ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          rules={[ validateRequiredFields('Please input your password!') ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 2, span: 24 }} hidden={!errorMessage} >
          <div className={styles.errMessage} >
            {errorMessage}
          </div>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }} >
          <Button type='primary' htmlType='submit' loading={loginLoader}>
            Login
          </Button>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 24 }} >
          Don`t have an account <Link to='/signup'>Sign Up</Link>
        </Form.Item>
      </Form>
    </div>
    }
    </>);
}