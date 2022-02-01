import { Modal } from 'antd';
import styled from 'styled-components';

export const MainModal = styled(Modal)`
    .ant-modal-close-x {
        background-color: red;
        color: #fff;
    }

    .ant-modal-title {
        color: 
        ${props => props.message === 'success' ? 'darkgreen': (props.message === 'error') ? "darkred" : "black"};
     }

    .ant-btn-primary {
        background-color: #026670;
        color: #fff;
        border: none;
        &:hover {
            opacity: 50%;
        }
    }
`;