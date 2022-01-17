import { Form, Input, Button } from 'antd';

export default function Signup() {
  const onFinish = (values) => {
    console.log('Success:', values);
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
        label='Username'
        name='username'
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
        name='passwordConfirm'
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
