import { useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import axios from 'axios';

export default function Signup() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log('signUpValues', values);
    const response = await axios.post('http://localhost:4000/signup', values);

    if (response.status === 200) {
      console.log('signUp resOk response', response);
      navigate('/confirm');
    }
    console.log('signUp response', response);
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
        <h1>Sign Up</h1>
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
        <Input style={{ width: '80%' }} />
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
        <Input.Password style={{ width: '80%' }} />
      </Form.Item>

      <Form.Item
        label='Confirm Password'
        name='confirmPassword'
        rules={[
          {
            required: true,
            message: 'Confirm password must be the same as password!',
          },
        ]}
      >
        <Input.Password style={{ width: '80%' }} />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 13,
          span: 16,
        }}
      >
        <Button type='primary' htmlType='submit'>
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  );
}