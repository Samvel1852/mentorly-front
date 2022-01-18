import { Form, Input, Button, Checkbox } from 'antd';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log(values);
    const response = await axios.post('http://localhost:4000/login', values);

    if (response.status === 200) {
      //   console.log('login successRes', response, response.data.data.token);
      localStorage.setItem('accessToken', response.data.data.token);
      navigate('/fill-my-profile');
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
          offset: 13,
          span: 16,
        }}
      >
        <h1>Login</h1>
      </Form.Item>
      <Form.Item
        label='Email'
        name='email'
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
        name='remember'
        valuePropName='checked'
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 13,
          span: 16,
        }}
      >
        <Button type='primary' htmlType='submit'>
          Login
        </Button>
        <Form.Item>
          Or <Link to='/signup'>Sign Up</Link>
        </Form.Item>
      </Form.Item>
    </Form>
  );
}
