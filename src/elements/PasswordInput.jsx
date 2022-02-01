import { Input } from 'antd'
import styled from 'styled-components'

import { COLORS } from '../constants/style';

export const PasswordInput = styled(Input.Password)`
    :focus {
        border-color: ${COLORS.APP_MAIN_COLOR} !important;
        -webkit-box-shadow: 0 0 0 2px rgb(74 145 183 / 20%) !important;
        box-shadow: 0 0 0 2px rgb(74 145 183 / 20%) !important;
    }

    :hover {
        border: 1px solid ${COLORS.APP_MAIN_COLOR} !important;
    }
`;