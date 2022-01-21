import { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import { myAxios } from '../../helpers/axiosInstance';
import { setLocalStorage } from '../../helpers/localStorage';

import styles from './Login.module.less';

export default function Login() {
  const [errorVisibility, setErrorVisibility] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setErrorVisibility(true);

    try {
      const response = await myAxios.post(`login`, values);

      if (response.status === 200) {
        setLocalStorage('accessToken', response.data.data.token);
        navigate('/users/verify');
      }

    } catch (error) {
      setErrorVisibility(false);
      setErrorMessage(error.response.data.errors[0]);
    }
  };

  return (
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
          rules={[
            {
              required: true,
              message: 'Please input your e-mail!',
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

        <Form.Item wrapperCol={{ offset: 2, span: 24 }} >
          <div
            className={styles.errMessage}
            hidden={errorVisibility}
          >
            {errorMessage}
          </div>
        </Form.Item>

        <Form.Item
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Button type='primary' htmlType='submit'>
            Login
          </Button>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 24 }} >
          Don`t have an account <Link to='/signup'>Sign Up</Link>
        </Form.Item>
      </Form>
    </div>
  );
}