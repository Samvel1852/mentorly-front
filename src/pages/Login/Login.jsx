import { Form, Input, Button } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { setLocalStorage } from '../../helpers/localStorage';
import styles from './Login.module.less';

export default function Login() {
  const [errorVisibility, setErrorVisibility] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setErrorVisibility(true);
    console.log(values);
    try {
      const response = await axios.post('http://localhost:4000/login', values);

      if (response.status === 200) {
        console.log('login successRes', response, response.data);
        setLocalStorage('accessToken', response.data.data.token);
        console.log('user.id', response.data.data.user._id);
        navigate(`/users/${response.data.data.user._id}`);
      }
      console.log('res', response);
    } catch (error) {
      setErrorVisibility(false);
      console.log('error', error.response);
      setErrorMessage(error.response.data.errors[0]);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={styles.formContainer}>
      <Form
        name='basic'
        labelCol={{
          span: 10,
        }}
        wrapperCol={{
          span: 10,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
        requiredMark={false}
      >
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <h1>Login</h1>
        </Form.Item>

        <Form.Item
          label='Email'
          name='email'
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
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
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
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
          wrapperCol={{
            offset: 2,
            span: 24,
          }}
        >
          <div
            style={{ color: 'red', fontSize: '9px' }}
            hidden={errorVisibility}
          >
            {errorMessage}
          </div>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type='primary' htmlType='submit'>
            Login
          </Button>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 4,
            span: 24,
          }}
        >
          Don`t have an account <Link to='/signup'>Sign Up</Link>
        </Form.Item>
      </Form>
    </div>
  );
}
