import { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { Button, Col, Layout, Row, Typography } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';

import styles from './ViewMyProfile.module.less';
import 'antd/dist/antd.css';

import { removeFromLocalStorage } from '../../helpers/localStorage';
import Skill from '../../components/Skill/Skill';
import MainHeader from '../../components/Header/MainHeader';
import axios from 'axios';

const { Content, Footer } = Layout;

const { Title } = Typography;

export default function ViewMyProfile({ accessToken }) {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(async () => {
    const userResponse = await axios.get(`http://localhost:4000/${id}`)
    await setUserData(userResponse.data.user);
    console.log('useEffectUserData', userData);
    // console.log('arrayUserData', Object.entries(userData))
    if (!accessToken) navigate('/login');
  }, []);

  console.log('userData', userData);

  function handleLogOut() {
    removeFromLocalStorage('accessToken');
    navigate('/login');
  }

  return (
    <Layout>
      <MainHeader handleLogOut={handleLogOut} verified={true} />
      
      <Content
        className={styles.site_layout}
        style={{ padding: '20px', marginTop: 64 }}
      >
          <Row style={{width: '100%', height: '100%'}}>
            <Col flex="200px">
              <Title level={3}>Personal Info </Title>
                <Title level={4} className={styles.mentorBeige} style={{color: '#1890FF'}}> {userData && userData.selectedRole === 'Mentor'? 'Mentor': null} </Title>
                <Typography>First Name: {userData && userData.firstName}</Typography>
                <Typography>Last Name: {userData && userData.lastName}</Typography>
                <Typography>Email: {userData && userData.email}</Typography>
                <Typography>Role: {userData && userData.selectedRole}</Typography>
                <Typography>Position: {userData && userData.position}</Typography>
                <Typography>Field: {userData && userData.selectedField}</Typography>
              <Title level={3}>Skills</Title>
              {
                userData && userData.skills.map((skill) => <Skill name={skill.name} key={skill._id}></Skill>)
              }
              <Button type='primary' style={{marginTop: '15px', display: 'block'}}><Link to={`/edit/${id}`}>Edit</Link></Button>
            </Col>
            <Col flex="auto" style={{paddingLeft: '90px'}}>
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
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Simply Technologies ©2022 Created with Pleasure
      </Footer>
    </Layout>
  );
}

ViewMyProfile.propTypes = {
  accessToken: PropTypes.string,
};
