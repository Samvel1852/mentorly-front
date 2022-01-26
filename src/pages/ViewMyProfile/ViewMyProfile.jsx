import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Layout, Row, Spin, Typography } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './ViewMyProfile.module.less';
import 'antd/dist/antd.css';

import { getLocalStorage } from '../../helpers/localStorage';
import Skill from '../../components/Skill/Skill';
import MainHeader from '../../components/Header/MainHeader';
import {
  setProfileState,
} from '../../features/fillMyProfile/fillMyProfileSlice';
import { useDispatch } from 'react-redux';
import { getUserData } from '../../features/profile/profileSlice';
import { useSelector } from 'react-redux';

const { Content, Footer } = Layout;

const { Title } = Typography;

export default function ViewMyProfile() {
  const {userData, editLoader} = useSelector((state) => state.profile);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(async () => {
    await dispatch(getUserData(id));
  }, []);

  async function handleEditProfileClick () {
    await dispatch(setProfileState(userData));
    navigate(`/users/${id}`);
  }

  return (
    <Layout>
      <MainHeader verified={true} />
      { userData?.status !== 'verified' && !editLoader ? 
      <div className={styles.pageLoaderContainer}>The User not exists</div> :
       !editLoader  ? 
      <Content className={styles.site_layout} >
          <Row className={styles.mainRow} >
            <Col flex='200px' className={styles.personalInfoContainer}>
              <Title level={3}>Personal Info </Title>
                <Title level={4} className={styles.mentorBeige} > 
                {userData?.selectedRole === 'Mentor'? 'Mentor': null} </Title>
                <Typography>First Name: {userData?.firstName}</Typography>
                <Typography>Last Name: {userData?.lastName}</Typography>
                {id === getLocalStorage('currentUserId') && 
                  <Typography>Email: {userData?.email}</Typography>
                }
                <Typography>Role: {userData?.selectedRole}</Typography>
                <Typography>Position: {userData?.position}</Typography>
                <Typography>Field: {userData?.selectedField}</Typography>
              <Title level={3}>Skills</Title>
              <div className={styles.skillsContainer}>
              {
                userData?.skills.map((skill) => <Skill name={skill.name} key={skill._id}></Skill>)
              }
              </div>
              {
                 id === getLocalStorage('currentUserId') ? <Button type='primary' 
                 className={styles.editBtn}
                 onClick={handleEditProfileClick}
                 loading={editLoader}>Edit</Button>
                 : <Button type='primary' 
                 className={styles.connectBtn}>Connect</Button>
                }
            </Col>
            <Col xs={5} sm={6} md={15} lg={16} xl={17} className={styles.generalInfoContainer}>
              <Title level={3}>Education</Title>
              <Typography className={styles.genInfoContainers} >{  
                  userData?.education}</Typography>
              <Title level={3}>Experience</Title>
              <Typography className={styles.genInfoContainers}>{  
                  userData?.experience}</Typography>
              <Title level={3}>About</Title>
              <Typography className={styles.genInfoContainers}>{ 
                  userData?.about}</Typography>
              <Title level={3}> { userData?.selectedRole === 'Mentor' ? 'Who can request mentorship'
                  : 'My plans' }</Title>
              <Typography className={styles.genInfoContainers}>{  
                  userData?.plans}</Typography>
            </Col>
          </Row>
      </Content>
      : <div className={styles.pageLoaderContainer}><Spin tip='Loading...' /></div>
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
