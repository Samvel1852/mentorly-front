import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Layout, Form, Button, message, Select } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './FillMyProfile.module.less';
import './FillMyProfile.less';
import 'antd/dist/antd.css';
import Skill from '../../components/Skill/Skill';
import MainHeader from '../../components/Header/MainHeader';
import { MainInput } from '../../elements/MainInput';

import {
  verifyUser,
  setProfileState,
  getUserData,
} from '../../features/fillMyProfile/fillMyProfileSlice';

import {
  getLocalStorage,
  setLocalStorage,
} from '../../helpers/localStorage';
import { MainTextarea } from '../../elements/MainTextArea';
import { MainSelect } from '../../elements/MainSelect';
import { MainButton } from '../../elements/MainButton';
import MainFooter from '../../components/Footer/MainFooter';

const { Content } = Layout;
const { Option } = Select;

export default function FillMyProfile() {  
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
    submitLoader,
    updatedAt,
  } = useSelector((state) => state.fillMyProfile);

  const [form] = Form.useForm();

  const initialValues = { 
    firstName, lastName,
    selectedRole: selectedRole.length ? selectedRole : null, 
    selectedField: selectedField.length ? selectedField : null,
    position, education,
    experience, about,
    plans, skills }

  const navigate = useNavigate();
  const params = useParams();

  const dispatch = useDispatch();

  const clearState = {
    firstName: '', lastName: '', selectedRole: '', selectedField: '',
    position: '', education: '', experience: '', about: '', plans: '',
    skills: [],
  }

  const userId = getLocalStorage('currentUserId');

  useEffect(() => {
    if (!getLocalStorage('accessToken')) navigate('/login');

    // dispatch(getUserData(userId));
    
    return () => dispatch(setProfileState(clearState));
  }, []);

  useEffect(async () => {
    const {payload} = await dispatch(getUserData(userId));

    dispatch(setProfileState(payload));

    form.setFieldsValue(initialValues);
  }, [updatedAt]);

  const onFinish = async () => {

    try {
      const { id } = params;
      const result = await dispatch(
        verifyUser({
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

      if (result.payload && !result.error && !result.errors) {
        await setLocalStorage('verified', 'verified');
        navigate(`/${id}`);
      } else {
        message.error('Refused! Please check Your connection and try again');
      }
    } catch ({ response }) {
      message.error('This is a message of error');
    }
  };

  function handleChange (value, name) {
    dispatch(setProfileState({
      [name]: value
    }));
  }

  function handleAddingSkillChange(e) {
    e.preventDefault();
    if (e.target.value) {
      dispatch(setProfileState({skills: [...skills, { id: Date.now(), name: e.target.value }], 
                                [e.target.name]: ''}));
    }
      dispatch(setProfileState({addingSkill: !addingSkill}));
  }

  function handleDeleteSkill({ id }) {
    const filteredSkills = skills.filter((skill) => skill.id !== id);
    dispatch(setProfileState({skills: filteredSkills}));
  }

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
      <MainHeader requestsQuantity={200} />
      <Content className={styles.site_layout} >
        <div className={styles.content}>
          <Form
            onFinish={onFinish}
            name='submit'
            form={form}
            className={styles.form}
            requiredMark={false}
            validateTrigger='onSubmit'
            initialValues={initialValues}
          >
            <div className={styles.namesContainer}>
              <Form.Item 
                className={styles.fillMyProfileFormItem, styles.firstName}
                name='firstName'
                label='First Name'
                labelCol={{ span: 24 }}
                rules={[
                  getRequiredMessage('Please input your First Name!'),
                  validateMinTwoCharacters(),
                  validateNamesOnlyLetters(),
                ]}
              >
                <MainInput name='firstName' value={firstName} onChange={({target}) => 
                        handleChange(target.value, target.name)} />
              </Form.Item>
              <Form.Item 
                className={styles.fillMyProfileFormItem, styles.lastName}
                name='lastName'
                label='Last Name'
                labelCol={{ span: 24 }}
                rules={[
                  getRequiredMessage('Please input your Last Name!'),
                  validateMinTwoCharacters(),
                  validateNamesOnlyLetters(),
                ]}
              >
                <MainInput name='lastName' value={lastName} onChange={({target}) => 
                        handleChange(target.value, target.name)} />
              </Form.Item>
            </div>
            <div className={styles.selectsContainer}>
              <Form.Item 
                className={styles.fillMyProfileFormItem, styles.role}
                name='selectedRole'
                label='Choose Role'
                labelCol={{ span: 24 }}
                rules={[getRequiredMessage('Please select Your Role!')]}
              >
                <MainSelect
                  onChange={(value) => handleChange(value, 'selectedRole')}
                  placeholder='--Select Role'
                >
                  <Option value='--Select Role' disabled>
                    --Select Role
                  </Option>
                  <Option value='Mentor'>Mentor</Option>
                  <Option value='Mentee'>Mentee</Option>
                </MainSelect>
              </Form.Item>
              <Form.Item 
                className={styles.fillMyProfileFormItem, styles.field}
                name='selectedField'
                label='Choose Field'
                labelCol={{ span: 24 }}
                rules={[getRequiredMessage('Please select Your Field!'),]}
              >
                <MainSelect
                  initialvalue='--Select Field'
                  onChange={(value) => handleChange(value, 'selectedField')}
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
                </MainSelect>
              </Form.Item>
            </div>
            <Form.Item 
              className={styles.fillMyProfileFormItem}
              name='position'
              label='Position'
              labelCol={{ span: 24 }}
              rules={[getRequiredMessage('Please input your Position!')]}
            >
              <MainInput
                name='position'
                maxLength={50}
                onChange={({target}) => 
                    handleChange(target.value, target.name)}
                value={position}
              />
            </Form.Item>
            <Form.Item 
              className={styles.fillMyProfileFormItem}
              name='education'
              label='Education'
              labelCol={{ span: 24 }}
              rules={[getRequiredMessage('Please input your Education!'),
              {min: 10, message: 'The Education field must contain at least 10 characters'}]}
            >
              <MainTextarea
                name='education'
                value={education}
                onChange={({target}) => 
                      handleChange(target.value, target.name)}
                autoSize={{ minRows: 3 }}
                showCount
                maxLength={255}
              />
            </Form.Item>
            <Form.Item 
              className={styles.fillMyProfileFormItem}
              name='experience'
              label='Experience'
              labelCol={{ span: 24 }}
              rules={[getRequiredMessage('Please input your Experience!'),
              {min: 10, message: 'The Experience field must contain at least 10 characters'}]}
            >
              <MainTextarea
                name='experience'
                value={experience}
                onChange={({target}) => 
                handleChange(target.value, target.name)}
                autoSize={{ minRows: 3 }}
                showCount
                maxLength={255}
              />
            </Form.Item>
            <Form.Item 
              className={styles.fillMyProfileFormItem}
              name='about'
              label='About'
              labelCol={{ span: 24 }}
              rules={[getRequiredMessage('Please input something About You!'), 
              {min: 10, message: 'The About field must contain at least 10 characters'}]}
            >
              <MainTextarea
                name='about'
                value={about}
                onChange={({target}) => 
                handleChange(target.value, target.name)}
                autoSize={{ minRows: 3 }}
                showCount
                maxLength={255}
              />
            </Form.Item>
            <Form.Item 
              className={styles.fillMyProfileFormItem}
              name='plans'
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
              <MainTextarea 
                name='plans'
                value={plans}
                onChange={({target}) => 
                handleChange(target.value, target.name)}
                autoSize={{ minRows: 3 }}
                showCount
                maxLength={150}
              />
            </Form.Item>
            <Form.Item 
              className={styles.fillMyProfileFormItem}
              name='skills'
              label='Skills'
              labelCol={{ span: 24 }}
              rules={[getRequiredMessage('Please provide Your Skills!'),
                    validateMaxTen(skills)]} >
              <Layout>
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
                    <MainInput
                      name='skillName'
                      value={skillName}
                      onPressEnter={handleAddingSkillChange}
                      onChange={({target}) => 
                          handleChange(target.value, target.name)}
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
            <MainButton width={'100px'} height={"40px"} type='primary' htmlType='submit' 
            loading={submitLoader}>
              Submit
            </MainButton>
          </Form>
        </div>
      </Content>
      <MainFooter> Simply Technologies ©2022 Created with Pleasure </MainFooter>
    </Layout> 
    
  );
}

FillMyProfile.propTypes = {
  accessToken: PropTypes.string,
  skillId: PropTypes.number,
};