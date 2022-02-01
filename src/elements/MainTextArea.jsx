import { Input } from 'antd'
import styled from 'styled-components'

import { COLORS } from '../constants/style';

const { TextArea } = Input

export const MainTextarea = styled(TextArea)`
    
    textarea:focus {
        border-color: ${COLORS.APP_MAIN_COLOR} !important;
        outline: none !important;
        -webkit-box-shadow: 0 0 0 2px rgb(74,145,183, .2) !important;
        box-shadow: 0 0 0 2px rgb(74,145,183, .2) !important;
    }
    

    :hover {
        textarea {
            border: 1px solid ${COLORS.APP_MAIN_COLOR} !important;
        }
    }
`;