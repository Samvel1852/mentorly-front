import { Select } from 'antd';
import styled from 'styled-components';

import { COLORS } from '../constants/style';

export const MainSelect = styled(Select)`

    &.ant-select-focused .ant-select-selector  {
        border-color: ${COLORS.APP_MAIN_COLOR} !important;
        outline: none !important;
        -webkit-box-shadow: 0 0 0 2px rgb(74,145,183, .2) !important;
        box-shadow: 0 0 0 2px rgb(74,145,183, .2) !important;
        opacity: 50%;
    }
    

    :hover {
        .ant-select-selector {
            border: 1px solid ${COLORS.APP_MAIN_COLOR} !important;
        }
    }
`;