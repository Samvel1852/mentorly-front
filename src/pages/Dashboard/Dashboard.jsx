import React, { useEffect, useState } from 'react';
import { Col, Form, Layout, Row, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../features/Dashboard/dashboardSlice';
import { Option } from 'antd/es/mentions';
import MainHeader from '../../components/Header/MainHeader';
import { useNavigate } from 'react-router-dom';
import { MainInput } from '../../elements/MainInput';
import { MainSelect } from '../../elements/MainSelect';
import { MainButton } from '../../elements/MainButton';
import { COLORS } from '../../constants/style';

function Dashboard() {
    const dispatch = useDispatch();
    const { users, pageTotal, loading } = useSelector(state => state.users);
    const navigate = useNavigate()
    const [params, setParams] = useState({
        page: 1,
        limit: 5,
    });

    useEffect(async () => {
       await getData(params)
    }, []);

    const getData = async (params) => {
        await dispatch(getUsers(params));
    };

    const columns = [
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Position',
            dataIndex: 'position',
            key: 'position',
        },
        {
            title: 'Field',
            dataIndex: 'filed',
            key: 'filed',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
    ];
    const dataSource = users.map((item) => (
        {
            key: item._id,
            firstName: item.firstName,
            lastName: item.lastName,
            position: item.position,
            filed: item.selectedField,
            role: item.selectedRole,
        }
    ));
    const handleSubmit = async (event) => {
        event.preventDefault();
        await getData(params);
    };
    return (
        <Layout style={{ height: '100vh', backgroundColor: COLORS.APP_BACKGROUND_COLOR }}>
            <MainHeader verified={true}/>
            <div style={ { 'margin': '30px'} }>
                <Form
                    onSubmit={ handleSubmit }
                    onSubmitCapture={ handleSubmit }
                    size={ 'middle' }
                    style={ { 'margin': '10px' } }
                >
                    <Row justify="space-between">
                        <Col span={ 4 } >
                            <Form.Item>
                                <MainInput
                                    placeholder="First Name"
                                    value={ params.firstName }
                                    onChange={ (e) => setParams({ ...params, firstName: e.target.value })
                                    }/>
                            </Form.Item>
                        </Col>
                        <Col span={ 4 }>
                            <Form.Item>
                                <MainInput
                                    placeholder="Last Name"
                                    value={ params.lastName }
                                    onChange={ (e) => setParams({ ...params, lastName: e.target.value }) }
                                />
                            </Form.Item>
                        </Col>
                        <Col span={ 4 }>
                            <Form.Item>
                                <MainInput
                                    placeholder="Position"
                                    value={ params.position }
                                    onChange={ (e) => setParams({ ...params, position: e.target.value }) }
                                />
                            </Form.Item>
                        </Col>
                        <Col span={ 4 }>
                            <Form.Item>
                                <MainSelect
                                    mode={ 'multiple' }
                                    allowClear
                                    style={ { width: '100%' } }
                                    placeholder="Field"
                                    onChange={ (value) => setParams({ ...params, selectedField: value }) }
                                >
                                    <Option value="it">IT</Option>
                                    <Option value="marketing">Marketing</Option>
                                    <Option value="finance">Finance</Option>
                                    <Option value="law">Law</Option>
                                    <Option value="tourism">Tourism</Option>
                                    <Option value="business">Business</Option>
                                </MainSelect>
                            </Form.Item>
                        </Col>
                        <Col span={ 4 }>
                            <Form.Item>
                                <MainSelect
                                    placeholder="Role"
                                    onChange={ (value) => setParams({ ...params, selectedRole: value }) }
                                    allowClear
                                >
                                    <Option value="mentor">Mentor</Option>
                                    <Option value="mentee">Mentee</Option>
                                </MainSelect>
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item>
                                <MainButton type="primary" htmlType={ 'submit' }>
                                    Search
                                </MainButton>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>

                <Table
                    dataSource={ dataSource }
                    columns={ columns }
                    onRow={(record) => {
                        return {
                            style: {  cursor: 'pointer' },
                            onClick: () => navigate(`/${record.key}`)
                          }
                    }}
                    loading={ loading }
                    pagination={ {
                        total: pageTotal,
                        current: params.page,
                        pageSize: params.limit,
                        onChange: async (page, limit) => {
                            setParams({ ...params, page: page, limit: limit });
                            await getData({ ...params, page: page, limit: limit });
                        },
                    } }
                />
            </div>
        </Layout>
    );
}

export default Dashboard;