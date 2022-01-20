import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PropTypes from 'prop-types';
import { Layout, Menu, Form, Input, Button, Select, Modal } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import './FillMyProfile.less';
import 'antd/dist/antd.css';
import Skill from '../../components/Skill/Skill';

import {
  setFirstName,
  setLastName,
  setExperience,
  setPosition,
  setEducation,
  setAbout,
  setPlans,
  setAddingSkill,
  setSkillName,
  setSkills,
  finish,
  setRole,
  setField,
} from '../../features/fillMyProfile/fillMyProfileSlice';
import {
  removeFromLocalStorage,
  setLocalStorage,
} from '../../helpers/localStorage';
// import myAxios from '../../helpers/axiosInstance';

const { Header, Content, Footer } = Layout;
const { Option } = Select;
const { TextArea } = Input;

export default function MyProfile({ accessToken }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [submitLoader, setSubmitLoader] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  console.log(accessToken);

  useEffect(() => {
    if (!accessToken) navigate('/login');
  }, []);

  const {
    firstName,
    lastName,
    selectedRole,
    experience,
    position,
    education,
    about,
    plans,
    addingSkill,
    skillName,
    skills,
  } = useSelector((state) => state.fillMyProfile);
  console.log(selectedRole, 'selectedRole');
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const onfinish = async () => {
    setSubmitLoader(true);
    try {
      console.log(params, 'params');
      const { id } = params;
      const result = await dispatch(
        finish({
          firstName,
          lastName,
          experience,
          education,
          about,
          plans,
          addingSkill,
          skillName,
          skills,
          id,
        }),
      );

      setSubmitLoader(false);
      console.log('result payl or result errs', result.payload, result.errors);
      console.log('resFill', result);
      if (result.payload && !result.errors) {
        await setLocalStorage('verified', true);
        navigate(`/${id}`);
      } else {
        setIsModalVisible(true);
      }
    } catch ({ response }) {
      console.log('errResponse', { response });
    }
  };

  function handleFirstNameChange(e) {
    dispatch(setFirstName(e.target.value));
  }

  function handleLastNameChange(e) {
    dispatch(setLastName(e.target.value));
  }

  function handleChangeRole(value) {
    dispatch(setRole(value));
    // console.log(`selected ${value}`);
  }

  function handleChangeField(value) {
    dispatch(setField(value));
    // console.log(`selected ${value}`);
  }

  function handleChangePosition(e) {
    dispatch(setPosition(e.target.value));
  }

  function handleEducationChange(e) {
    dispatch(setEducation(e.target.value));
  }

  function handleExperienceChange(e) {
    dispatch(setExperience(e.target.value));
  }

  function handleAboutChange(e) {
    dispatch(setAbout(e.target.value));
  }

  function handlePlansChange(e) {
    dispatch(setPlans(e.target.value));
  }

  function handleAddingSkillChange(e) {
    if (e.target.value) {
      dispatch(
        setSkills([...skills, { id: Date.now(), name: e.target.value }]),
      );
      dispatch(setAddingSkill(!addingSkill));
      dispatch(setSkillName(''));
    } else {
      dispatch(setAddingSkill(!addingSkill));
    }
  }

  function handleSkillNameChange(e) {
    dispatch(setSkillName(e.target.value));
  }

  function handleDeleteSkill({ id, e }) {
    const filteredSkills = skills.filter((skill) => skill.id !== id);
    console.log('filteredSkills', filteredSkills);
    e.preventDefault();
    dispatch(setSkills(filteredSkills));
  }

  function handleLogOut() {
    removeFromLocalStorage('accessToken');
    navigate('/login');
  }

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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
        <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['1']}>
          <Menu.Item key='1'>My Profile</Menu.Item>
          <Menu.Item key='2' onClick={handleLogOut}>
            Log Out
          </Menu.Item>
        </Menu>
      </Header>
      <Modal
        title='Something went wrong'
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Please check whether all the fields are filled right!</p>
        <p>and Please try Again</p>
      </Modal>
      <Content
        className='site-layout'
        style={{ padding: '0 50px', marginTop: 64 }}
      >
        <div className='content'>
          <Form
            onFinish={onfinish}
            name='submit'
            form={form}
            style={{ maxWidth: '600px' }}
            requiredMark={false}
          >
            <div className='namesContainer'>
              <Form.Item
                name='First Name'
                label='First Name'
                labelCol={{ span: 24 }}
                grid={{ gutter: 16 }}
                style={{ marginRight: '70px' }}
                rules={[
                  { required: true, message: 'Please input your First Name!' },
                  {
                    min: 2,
                    message: 'First Name should contain at least two letters.',
                  },
                  {
                    validator(_, value) {
                      if (/^[A-z]+$/.test(value)) {
                        return Promise.resolve();
                      }

                      return Promise.reject(
                        new Error('First Name should contain only letters.'),
                      );
                    },
                  },
                ]}
              >
                <Input value={firstName} onChange={handleFirstNameChange} />
              </Form.Item>
              <Form.Item
                name='Last Name'
                label='Last Name'
                labelCol={{ span: 24 }}
                rules={[
                  { required: true, message: 'Please input your Last Name!' },
                  {
                    min: 2,
                    message: 'Last Name should contain at least two letters.',
                  },
                  {
                    validator(_, value) {
                      if (/^[A-z]+$/.test(value)) {
                        return Promise.resolve();
                      }

                      return Promise.reject(
                        new Error('Last Name should contain only letters.'),
                      );
                    },
                  },
                ]}
              >
                <Input value={lastName} onChange={handleLastNameChange} />
              </Form.Item>
            </div>
            <div className='selectsContainer'>
              <Form.Item
                name='Role'
                label='Choose Role'
                labelCol={{ span: 24 }}
                rules={[
                  { required: true, message: 'Please select Your Role!' },
                ]}
                style={{ width: '265px', marginRight: '70px' }}
              >
                <Select
                  initialvalue='--Select Role'
                  // style={{ width: 265 }}
                  onChange={handleChangeRole}
                  placeholder='--Select Role'
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
                label='Choose Field'
                labelCol={{ span: 24 }}
                rules={[
                  { required: true, message: 'Please select Your Field!' },
                ]}
                style={{ width: '265px' }}
              >
                <Select
                  initialvalue='--Select Field'
                  // style={{ width: '100%' }}
                  onChange={handleChangeField}
                  placeholder='Select Field'
                >
                  <Option value='--Select Field' disabled>
                    --Select Field
                  </Option>
                  <Option value='IT'>IT</Option>
                  <Option value='Marketing'>Marketing</Option>
                  <Option value='Finance'>Finance</Option>
                  <Option value='Law'>Law</Option>
                  <Option value='Tourism'>Tourism</Option>
                  <Option value='Business'>Business</Option>
                </Select>
              </Form.Item>
            </div>
            <Form.Item
              name='Position'
              label='Position'
              labelCol={{ span: 24 }}
              rules={[
                { required: true, message: 'Please input Your Position!' },
              ]}
            >
              <Input
                maxLength={50}
                onChange={handleChangePosition}
                value={position}
              />
            </Form.Item>
            <Form.Item
              name='Education'
              label='Education'
              labelCol={{ span: 24 }}
              rules={[
                { required: true, message: 'Please input Your Education!' },
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
                { required: true, message: 'Please input Your Experience!' },
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
                  message: 'Please input Something About You!',
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
              label={
                selectedRole === 'Mentor'
                  ? 'Who can request mentorship'
                  : selectedRole === 'Mentee'
                  ? 'My plans'
                  : 'Who can request mentorship (for mentor) / My plans (for mentee)'
              }
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
                maxLength={150}
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
                {
                  validator() {
                    if (skills.length < 10) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject(
                        new Error('Skills can contain maximum 10 fields.'),
                      );
                    }
                  },
                },
              ]}
            >
              <Layout
                style={{
                  minHeight: '100px',
                  display: 'flex',
                  backgroundColor: '#fff',
                }}
              >
                <div className='skillsContainer'>
                  {skills.map((skill) => (
                    <Skill
                      key={skill.id}
                      name={skill.name}
                      id={skill.id}
                      handleDeleteSkill={handleDeleteSkill}
                    />
                  ))}
                  {addingSkill ? (
                    <Input
                      value={skillName}
                      onPressEnter={handleAddingSkillChange}
                      onChange={handleSkillNameChange}
                      style={{ width: '15%', minWidth: '100px' }}
                      autoFocus
                      maxLength={30}
                    />
                  ) : (
                    <Button
                      onClick={handleAddingSkillChange}
                      style={{ width: '15%', minWidth: '100px' }}
                    >
                      + New skill
                    </Button>
                  )}
                </div>
              </Layout>
            </Form.Item>
            <br />
            <Button type='primary' htmlType='submit' loading={submitLoader}>
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

MyProfile.propTypes = {
  accessToken: PropTypes.string,
  skillId: PropTypes.number,
};
