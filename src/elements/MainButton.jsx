import { Button } from 'antd';
import styled from 'styled-components';

export const MainButton = styled(Button)`
    background-color: #026670 !important;
    border: none !important;
    margin: ${props => props.margin ? props.margin : "0px"};
    width: ${props => props.width ? props.width : "50px"};
    height: ${props => props.height ? props.height : "40px"};
    &:hover {
        opacity: 70%;
    }
`;