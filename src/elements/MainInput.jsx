import { Input } from 'antd'
import styled from 'styled-components'

import { COLORS } from '../constants/style';

export const MainInput = styled(Input)`
    .ant-form-item-explain-error {
        color: red !important;
        background-color: yellow !important;
    }

    :focus {
        border-color: ${COLORS.APP_MAIN_COLOR} !important;
        outline: 0 !important;
        -webkit-box-shadow: 0 0 0 2px rgb(74,145,183, .2) !important;
        box-shadow: 0 0 0 2px rgb(74,145,183, .2) !important;
        color: black;
    }

    :hover {
        border: 1px solid ${COLORS.APP_MAIN_COLOR} !important;
    }
`;