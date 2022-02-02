import { Spin } from 'antd';
import styled from 'styled-components';

export const MainSpin = styled(Spin)`

    .ant-spin-dot-item {
        background-color: var(--app-main-color);
    }

    .ant-spin-text {
        color: var(--app-main-color);
    }
`;