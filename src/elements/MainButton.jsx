import { Button } from 'antd';
import styled from 'styled-components';
import { COLORS } from '../constants/style';

export const MainButton = styled(Button)`
    background-color: ${COLORS.APP_MAIN_COLOR} !important;
    border: none !important;
    color: ${props => props.color ? props.color : "white"};
    margin: ${props => props.margin ? props.margin : ""};
    min-width: ${props => props.minWidth ? props.minWidth : ""};
    width: ${props => props.width ? props.width : ""} !important;
    height: ${props => props.height ? props.height : ""};
    &[disabled] {
        color: #808080;
        opacity:70%
    }
    &:hover {
        opacity: 70%;   
    }
`;