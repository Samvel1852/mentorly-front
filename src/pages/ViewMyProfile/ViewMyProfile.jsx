import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Layout, Row, Spin, Typography } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './ViewMyProfile.module.less';
import 'antd/dist/antd.css';

import { getLocalStorage, removeFromLocalStorage } from '../../helpers/localStorage';
import Skill from '../../components/Skill/Skill';
import MainHeader from '../../components/Header/MainHeader';
import { myAxios } from '../../helpers/axiosInstance';

import {
  setProfileState,
} from '../../features/fillMyProfile/fillMyProfileSlice';
import { useDispatch } from 'react-redux';

const { Content, Footer } = Layout;

const { Title } = Typography;

export default function ViewMyProfile() {
  const [userData, setUserData] = useState(null);
  const [editLoader, setEditLoader] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch()

  const { id } = useParams();

  useEffect(async () => {
    const userResponse = await myAxios.get(`http://localhost:4000/${id}`)
    await setUserData(userResponse.data.user);
    console.log('useEffectUserData', userData);
    if (!getLocalStorage('accessToken')) navigate('/login');
  }, []);

  console.log('userData', userData);

  function handleLogOut() {
    removeFromLocalStorage('accessToken');
    removeFromLocalStorage('currentUserId');
    removeFromLocalStorage('verified');
    navigate('/login');
  }

  async function handleEditProfileClick () {
    setEditLoader(true);
    const userResponse = await myAxios.get(`http://localhost:4000/${id}`);
    dispatch(setProfileState(userResponse.data.user));
    navigate(`/users/${id}`);
  }

  return (
    <Layout>
      <MainHeader handleLogOut={handleLogOut} verified={true} />
      { userData ?
      <Content
        className={styles.site_layout}
        style={{ padding: '20px', marginTop: 64 }}
      >
          <Row className={styles.mainRow} >
            <Col flex='200px' className={styles.personalInfoContainer}>
              <Title level={3}>Personal Info </Title>
                <Title level={4} className={styles.mentorBeige} style={{color: '#1890FF'}}> 
                {userData && userData.selectedRole === 'Mentor'? 'Mentor': null} </Title>
                <Typography>First Name: {userData && userData.firstName}</Typography>
                <Typography>Last Name: {userData && userData.lastName}</Typography>
                {id === getLocalStorage('currentUserId') && 
                  <Typography>Email: {userData && userData.email}</Typography>
                }
                <Typography>Role: {userData && userData.selectedRole}</Typography>
                <Typography>Position: {userData && userData.position}</Typography>
                <Typography>Field: {userData && userData.selectedField}</Typography>
              <Title level={3}>Skills</Title>
              <div className={styles.skillsContainer}>
              {
                userData && userData.skills.map((skill) => <Skill name={skill.name} key={skill._id}></Skill>)
              }
              </div>
              {
                 id === getLocalStorage('currentUserId') ? <Button type='primary' 
                 style={{marginTop: '15px', display: 'block'}} onClick={handleEditProfileClick}
                 loading={editLoader}>Edit</Button>
                 : <Button type='primary' 
                 style={{marginTop: '15px', display: 'block'}}>Connect</Button>
                }
            </Col>
            <Col xs={5} sm={6} md={15} lg={16} xl={17} className={styles.generalInfoContainer}>
              <Title level={3}>Education</Title>
              <Typography style={{minWidth: '100px', maxWidth:'900px'}}>{ userData && 
                  userData.education}</Typography>
              <Title level={3}>Experience</Title>
              <Typography style={{minWidth: '100px', maxWidth:'900px'}}>{ userData && 
                  userData.experience}</Typography>
              <Title level={3}>About</Title>
              <Typography style={{minWidth: '100px', maxWidth:'900px'}}>{ userData &&
                  userData.about}</Typography>
              <Title level={3}> { userData && userData.selectedRole === 'Mentor' ? 'Who can request mentorship'
                  : 'My plans' }</Title>
              <Typography style={{minWidth: '100px', maxWidth:'900px'}}>{userData && 
                  userData.plans}</Typography>
            </Col>
          </Row>
      </Content> : <div className={styles.pageLoaderContainer}><Spin tip='Loading...' /></div>
      }
      <Footer className={styles.foot}>
        Simply Technologies ©2022 Created with Pleasure
      </Footer>
    </Layout>
  );
}

ViewMyProfile.propTypes = {
  accessToken: PropTypes.string,
};
