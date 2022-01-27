import { Button } from 'antd';
import styled from 'styled-components';

export const MainButton = styled(Button)`
    background-color: #026670 !important;
    border: none !important;
    margin: ${props => props.margin ? props.margin : ""};
    min-width: ${props => props.minWidth ? props.minWidth : ""};
    width: ${props => props.Width ? props.Width : ""};
    height: ${props => props.height ? props.height : ""};
    &:hover {
        opacity: 70%;
    }
`;