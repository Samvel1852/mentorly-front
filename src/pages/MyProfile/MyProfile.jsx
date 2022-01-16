import { Layout, Menu, Form, Input, Button, Select } from 'antd';

import './MyProfile.less';
import 'antd/dist/antd.css';
import { useState } from 'react';

const { Header, Content, Footer } = Layout;
const { Option } = Select;
const { TextArea } = Input;

export default function MyProfile() {
  const [experience, setExperience] = useState('');
  const [education, setEducation] = useState('');
  const [about, setAbout] = useState('');
  const [plans, setPlans] = useState('');

  const [form] = Form.useForm();

  const onfinish = () => {};

  function handleChangeRole(value) {
    console.log(`selected ${value}`);
  }

  function handleChangeField(value) {
    console.log(`selected ${value}`);
  }

  function handleEducationChange(e) {
    setEducation(e.target.value);
  }

  function handleExperienceChange(e) {
    setExperience(e.target.value);
  }

  function handleAboutChange(e) {
    setAbout(e.target.value);
  }

  function handlePlansChange(e) {
    setPlans(e.target.value);
  }

  return (
    <Layout>
      <Header
        style={{
          position: 'fixed',
          zIndex: 1,
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div className='logo'>LOGO</div>
        <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['3']}>
          <Menu.Item key='1'>Dashboard</Menu.Item>
          <Menu.Item key='2'>Message Requests</Menu.Item>
          <Menu.Item key='3'>My Profile</Menu.Item>
          <Menu.Item key='4'>Log Out</Menu.Item>
        </Menu>
      </Header>
      <Content
        className='site-layout'
        style={{ padding: '0 50px', marginTop: 64 }}
      >
        <div className='content'>
          <Form onFinish={onfinish} name='submit' form={form}>
            <div className='namesContainer'>
              <Form.Item
                name='First Name'
                label='First Name'
                labelCol={{ span: 24 }}
                rules={[
                  { required: true, message: 'Please input your First Name!' },
                ]}
              >
                <Input style={{ width: '80%' }} />
              </Form.Item>
              <Form.Item
                name='Last Name'
                label='Last Name'
                labelCol={{ span: 24 }}
                rules={[
                  { required: true, message: 'Please input your Last Name!' },
                ]}
              >
                <Input style={{ width: '80%' }} />
              </Form.Item>
            </div>
            <div className='selectsContainer'>
              <Form.Item
                name='Role'
                label='Role'
                labelCol={{ span: 24 }}
                rules={[
                  { required: true, message: 'Please select Your Role!' },
                ]}
              >
                <Select
                  defaultValue='--Select Role'
                  style={{ width: 212 }}
                  onChange={handleChangeRole}
                >
                  <Option value='--Select Role' disabled>
                    --Select Role
                  </Option>
                  <Option value='Mentor'>Mentor</Option>
                  <Option value='Mentee'>Mentee</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name='Field'
                label='Field'
                labelCol={{ span: 24 }}
                rules={[
                  { required: true, message: 'Please select Your Field!' },
                ]}
              >
                <Select
                  defaultValue='--Select Field'
                  style={{ width: 220 }}
                  onChange={handleChangeField}
                >
                  <Option value='--Select Field' disabled>
                    --Select Field
                  </Option>
                  <Option value='Software Development'>
                    Software Development
                  </Option>
                  <Option value='Quality Assurance'>Quality Assurance</Option>
                </Select>
              </Form.Item>
            </div>
            <Form.Item
              name='Position'
              label='Position'
              labelCol={{ span: 24 }}
              rules={[
                { required: true, message: 'Please input your Position!' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name='Education'
              label='Education'
              labelCol={{ span: 24 }}
              rules={[
                { required: true, message: 'Please input your Education!' },
              ]}
            >
              <TextArea
                value={education}
                onChange={handleEducationChange}
                autoSize={{ minRows: 3 }}
                showCount
                maxLength={255}
              />
            </Form.Item>
            <Form.Item
              name='Experience'
              label='Experience'
              labelCol={{ span: 24 }}
              rules={[
                { required: true, message: 'Please input your Experience!' },
              ]}
            >
              <TextArea
                value={experience}
                onChange={handleExperienceChange}
                autoSize={{ minRows: 3 }}
                showCount
                maxLength={255}
              />
            </Form.Item>
            <Form.Item
              name='About'
              label='About'
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: 'Please input your Something About You!',
                },
              ]}
            >
              <TextArea
                value={about}
                onChange={handleAboutChange}
                autoSize={{ minRows: 3 }}
                showCount
                maxLength={255}
              />
            </Form.Item>
            <Form.Item
              name='Plans'
              label='Who can request mentorship (for mentor) / My plans (for mentee)'
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: 'Please input Your plans!',
                },
              ]}
            >
              <TextArea
                value={plans}
                onChange={handlePlansChange}
                autoSize={{ minRows: 3 }}
                showCount
                maxLength={255}
              />
            </Form.Item>
            <Form.Item
              name='Skills'
              label='Skills'
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: 'Please Provide Your Skills!',
                },
              ]}
            >
              <Layout style={{ minHeight: '100px' }}>
                <Button style={{ width: '20%' }}>+ New skill</Button>
              </Layout>
            </Form.Item>
            <br />
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Simply Technologies ©2022 Created with Pleasure
      </Footer>
    </Layout>
  );
}
