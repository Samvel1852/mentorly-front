import { Form, Input, Button } from 'antd';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { setLocalStorage } from '../../helpers/localstorage';
// import { setLocalStorage } from '../../helpers/localstorage';

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
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
    >
      <Form.Item
        wrapperCol={{
          offset: 10,
          span: 10,
        }}
      >
        <h1>Login</h1>
      </Form.Item>
      <Form.Item
        label='Email'
        name='email'
        labelCol={{ span: 24, offset: 10 }}
        wrapperCol={{ span: 10, offset: 10 }}
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
        labelCol={{ span: 24, offset: 10 }}
        wrapperCol={{ span: 10, offset: 10 }}
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
          offset: 13,
          span: 24,
        }}
      >
        <Button type='primary' htmlType='submit'>
          Login
        </Button>
        <Form.Item>
          Do not have an account? <Link to='/signup'>Sign Up</Link>
        </Form.Item>
      </Form.Item>
    </Form>
  );
}
