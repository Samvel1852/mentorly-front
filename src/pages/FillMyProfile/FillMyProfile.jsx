import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Layout, Form, Input, Button, Select, Modal } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './FillMyProfile.module.less';
import 'antd/dist/antd.css';
import Skill from '../../components/Skill/Skill';
import MainHeader from '../../components/Header/MainHeader';

import {
  finish,
  setProfileState,
} from '../../features/fillMyProfile/fillMyProfileSlice';

import {
  getLocalStorage,
  setLocalStorage,
} from '../../helpers/localStorage';

const { Content, Footer } = Layout;
const { Option } = Select;
const { TextArea } = Input;

export default function FillMyProfile() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [submitLoader, setSubmitLoader] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
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

  function handleInputChange ({ target }) {
      dispatch(setProfileState({
        [target.name]: target.value
      }));
  }

  function handleSelectsChange (value, name) {
    dispatch(setProfileState({
      [name]: value
    }));
  }

  function handleAddingSkillChange(e) {
    e.preventDefault();
    if (e.target.value) {
      dispatch(setProfileState({skills: [...skills, { id: Date.now(), name: e.target.value }]}));
      dispatch(setProfileState({
        [e.target.name]: ''
      }));
    }
      dispatch(setProfileState({addingSkill: !addingSkill}));
  }

  function handleDeleteSkill({ id }) {
    const filteredSkills = skills.filter((skill) => skill.id !== id);
    dispatch(setProfileState({skills: filteredSkills}));
  }

  const handleOk = () => {
    setIsModalVisible(false);
  };

  function getRequiredMessage (message) {
    return {required: true, message}
  } 

  function validateNamesOnlyLetters () {
    return ({
      validator(_, value) {
        if (/^[A-z]+$/.test(value)) {
          return Promise.resolve();
        }
        return Promise.reject(
          new Error('Last Name should contain only letters.'),
        );
      },
    })
  }

  function validateMinTwoCharacters () {
    return ({ min: 2, message: 'Last Name should contain at least two letters.' })
  }

  function validateMaxTen (array) {
    return ({
      validator() {
        if (array.length < 11) {
          return Promise.resolve();
        } else {
          return Promise.reject(
            new Error('Skills can contain maximum 10 fields.'),
          );
        }
      },
    })
  }

  return (
    <Layout>
      <MainHeader />
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
          >
            <div className={styles.namesContainer}>
              <Form.Item
                name='First Name'
                label='First Name'
                labelCol={{ span: 24 }}
                className={styles.firstName}
                rules={[
                  getRequiredMessage('Please input your First Name!'),
                  validateMinTwoCharacters(),
                  validateNamesOnlyLetters(),
                ]}
              >
                <Input name='firstName' value={firstName} onChange={handleInputChange} />
              </Form.Item>
              <Form.Item
                name='Last Name'
                label='Last Name'
                labelCol={{ span: 24 }}
                className={styles.lastName}
                rules={[
                  getRequiredMessage('Please input your Last Name!'),
                  validateMinTwoCharacters(),
                  validateNamesOnlyLetters(),
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
                rules={[getRequiredMessage('Please select Your Role!')]}
                className={styles.role}
              >
                <Select
                  initialvalue='--Select Role'
                  onChange={(value) => handleSelectsChange(value, 'selectedRole')}
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
                rules={[getRequiredMessage('Please select Your Field!'),]}
                className={styles.field}
              >
                <Select
                  initialvalue='--Select Field'
                  onChange={(value) => handleSelectsChange(value, 'selectedField')}
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
              rules={[getRequiredMessage('Please input your Position!')]}
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
              rules={[getRequiredMessage('Please input your Education!'),
              {min: 10, message: 'The Education field must contain at least 10 characters'}]}
            >
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
              rules={[getRequiredMessage('Please input your Experience!'),
              {min: 10, message: 'The Experience field must contain at least 10 characters'}]}
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
              rules={[getRequiredMessage('Please input something About You!'), 
              {min: 10, message: 'The About field must contain at least 10 characters'}]}
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
              rules={[getRequiredMessage('Please input your Your Plans!'),
              {min: 10, message: 'This field must contain at least 10 characters'}]}
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
              rules={[getRequiredMessage('Please provide Your Skills!'),
                    validateMaxTen(skills)]} >
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
                      name='skillName'
                      value={skillName}
                      onPressEnter={handleAddingSkillChange}
                      onChange={handleInputChange}
                      className={styles.addSkillInput}
                      autoFocus
                      maxLength={30}
                    />
                  ) : (
                    <Button type='button' onClick={handleAddingSkillChange} 
                            className={styles.newSkillBtn} >
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
  accessToken: PropTypes.string,
  skillId: PropTypes.number,
};