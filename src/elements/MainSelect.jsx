import { Select } from 'antd';
import styled from 'styled-components';

export const MainSelect = styled(Select)`

    &.ant-select-focused .ant-select-selector  {
        border-color: #026670 !important;
        outline: none !important;
        -webkit-box-shadow: 0 0 0 2px rgb(74,145,183, .2) !important;
        box-shadow: 0 0 0 2px rgb(74,145,183, .2) !important;
        opacity: 50%;
    }
    

    :hover {
        .ant-select-selector {
            border: 1px solid #026670 !important;
        }
    }
`;