import { useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import axios from 'axios';

export default function Confirm() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log(values);
    const response = await axios.post('http://localhost:4000/verify', values);

    if (response.status === 200) {
      navigate('/login');
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
        <h1>Please confirm Your Email</h1>
      </Form.Item>
      <Form.Item
        label='Verification code'
        name='verificationCode'
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
        wrapperCol={{
          offset: 13,
          span: 16,
        }}
      >
        <Button type='primary' htmlType='submit'>
          Confirm
        </Button>
      </Form.Item>
    </Form>
  );
}
