import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PropTypes from 'prop-types';
import { Layout, Form, Input, Button, Select, Modal } from 'antd';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import styles from './EditMyProfile.module.less';
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
  getLocalStorage,
  removeFromLocalStorage,
  setLocalStorage,
} from '../../helpers/localStorage';
import MainHeader from '../../components/Header/MainHeader';
// import { myAxios } from '../../helpers/axiosInstance';

const { Content, Footer } = Layout;
const { Option } = Select;
const { TextArea } = Input;

export default function FillMyProfile() {
// const [userData, setUserData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [submitLoader, setSubmitLoader] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const { state } = useLocation();
  console.log('state', state);

  useEffect(async () => {
    // const userResponse = await myAxios.get(`${params.id}`)
    // await setUserData(userResponse.data.user);
    // console.log('useEffectUserData', userResponse.data.user, userData);
    // if (userResponse.data.user) {
        // console.log('dispFirstName', userResponse.data.user.firstName)
        dispatch(setSkills(state.skills));
        dispatch(setFirstName(state.firstName));
        dispatch(setLastName(state.lastName));
    // }
    if (!getLocalStorage('accessToken')) navigate('/login');
  }, []);

  const {
    firstName,
    lastName,
    selectedRole,
    selectedField,
    experience,
    position,
    education,
    about,
    plans,
    addingSkill,
    skillName,
    skills,
  } = useSelector((state) => state.fillMyProfile);

  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const onFinish = async () => {
    setSubmitLoader(true);
    try {
      const { id } = params;
      const result = await dispatch(
        finish({
          firstName,
          lastName,
          selectedRole,
          selectedField,
          position,
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

      console.log('resErrors', result)
      setSubmitLoader(false);
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

  function handleInputChange ({target}) {
    switch (target.name) {
      case 'firstName': dispatch(setFirstName(target.value)); break;
      case 'lastName': dispatch(setLastName(target.value)); break;
      case 'position': dispatch(setPosition(target.value)); break
      case 'education': dispatch(setEducation(target.value)); break;
      case 'experience': dispatch(setExperience(target.value)); break;
      case 'about': dispatch(setAbout(target.value)); break;
      case 'plans': dispatch(setPlans(target.value)); break;
      case 'skill': dispatch(setSkillName(target.value)); break;
      default:
        break;
    }
  }

  function handleChangeRole(value) {
    dispatch(setRole(value));
  }

  function handleChangeField(value) {
    dispatch(setField(value));
  }

  function handleAddingSkillChange({ target }) {
    if (target.value) {
      dispatch(
        setSkills([...skills, { id: Date.now(), name: target.value }]),
      );
      dispatch(setSkillName(''));
    }
      dispatch(setAddingSkill(!addingSkill));
  }

  function handleDeleteSkill({ id, e }) {
    const filteredSkills = skills.filter((skill) => skill.id !== id);
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

  return (
    <Layout>
      <MainHeader handleLogOut={handleLogOut} />
      <Modal
        title='Something went wrong'
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleOk}
      >
        <p>Please check whether all the fields are filled right!</p>
        <p>and Please try Again</p>
      </Modal>
      <Content className={styles.site_layout} >
        <div className={styles.content}>
          <Form
            onFinish={onFinish}
            name='submit'
            form={form}
            className={styles.form}
            requiredMark={false}
            validateTrigger='onSubmit'
            initialValues={{ ['First Name']: state.firstName, ['Last Name']: state.lastName,
            ['Role']: state.selectedRole, ['Field']: state.selectedField,
            ['Position']: state.position, ['Education']: state.education,
            ['Experience']: state.experience, ['About']: state.about,
            ['Plans']: state.plans, ['Skills']: state.skills }
          }
          >
            <div className={styles.namesContainer}>
              <Form.Item
                name='First Name'
                label='First Name'
                labelCol={{ span: 24 }}
                grid={{ gutter: 16 }}
                className={styles.firstName}
                rules={[
                  { required: true, message: 'Please input your First Name!' },
                  { min: 2, message: 'First Name should contain at least two letters.' },
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
                <Input name='firstName' 
                value={ firstName } onChange={handleInputChange} />
              </Form.Item>
              <Form.Item
                name='Last Name'
                label='Last Name'
                labelCol={{ span: 24 }}
                className={styles.lastName}
                rules={[
                  { required: true, message: 'Please input your Last Name!' },
                  { min: 2, message: 'Last Name should contain at least two letters.' },
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
                <Input name='lastName' value={lastName} onChange={handleInputChange} />
              </Form.Item>
            </div>
            <div className={styles.selectsContainer}>
              <Form.Item
                name='Role'
                label='Choose Role'
                labelCol={{ span: 24 }}
                rules={[{ required: true, message: 'Please select Your Role!' }]}
                className={styles.role}
              >
                <Select
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
                className={styles.field}
              >
                <Select
                  onChange={handleChangeField}
                  placeholder='--Select Field'
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
              rules={[{ required: true, message: 'Please input Your Position!' }]}
            >
              <Input
                name='position'
                maxLength={50}
                onChange={handleInputChange}
                value={position}
              />
            </Form.Item>
            <Form.Item
              name='Education'
              label='Education'
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: 'Please input Your Education!' },
                      {min: 10, message: 'The education field must contain at least 10 characters'}]}>
              <TextArea
                name='education'
                value={education}
                onChange={handleInputChange}
                autoSize={{ minRows: 3 }}
                showCount
                maxLength={255}
              />
            </Form.Item>
            <Form.Item
              name='Experience'
              label='Experience'
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: 'Please input Your Experience!' },
              {min: 10, message: 'The experience field must contain at least 10 characters'}]}
            >
              <TextArea
                name='experience'
                value={experience}
                onChange={handleInputChange}
                autoSize={{ minRows: 3 }}
                showCount
                maxLength={255}
              />
            </Form.Item>
            <Form.Item
              name='About'
              label='About'
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: 'Please input Something About You!' }, 
              {min: 10, message: 'The about field must contain at least 10 characters'}]}
            >
              <TextArea
                name='about'
                value={about}
                onChange={handleInputChange}
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
              rules={[{ required: true, message: 'Please input Your plans!' }, 
              {min: 10, message: 'The field must contain at least 10 characters'}]}
            >
              <TextArea
                name='plans'
                value={plans}
                onChange={handleInputChange}
                autoSize={{ minRows: 3 }}
                showCount
                maxLength={150}
              />
            </Form.Item>
            <Form.Item
              name='Skills'
              label='Skills'
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: 'Please Provide Your Skills!' },
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
              <Layout className={styles.skillsContainer} >
                <div className={styles.skillsContainer}>
                  {skills.map((skill) => (
                    <Skill
                      key={skill.id}
                      name={skill.name}
                      id={skill.id}
                      handleDeleteSkill={handleDeleteSkill}
                      withDelete={true}
                    />
                  ))}
                  {addingSkill ? (
                    <Input
                      name='skill'
                      value={skillName}
                      onPressEnter={handleAddingSkillChange}
                      onChange={handleInputChange}
                      className={styles.addSkillInput}
                      autoFocus
                      maxLength={30}
                    />
                  ) : (
                    <Button onClick={handleAddingSkillChange} className={styles.newSkillBtn} >
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
      <Footer className={styles.foot}>
        Simply Technologies ©2022 Created with Pleasure
      </Footer>
    </Layout>
  );
}

FillMyProfile.propTypes = {
  skillId: PropTypes.number,
};