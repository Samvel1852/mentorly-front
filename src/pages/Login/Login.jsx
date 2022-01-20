import { Form, Input, Button } from 'antd';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { setLocalStorage } from '../../helpers/localstorage';

import styles from './Login.module.less';

export default function Login() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log(values);
    const response = await axios.post('http://localhost:4000/login', values);

    if (response.status === 200) {
      //   console.log('login successRes', response, response.data.data.token);
      setLocalStorage('accessToken', response.data.data.token);
      navigate('/users/verify');
    }
    console.log('res', response);
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
