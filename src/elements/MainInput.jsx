import { Input } from 'antd'
import styled from 'styled-components'

export const MainInput = styled(Input)`
    :focus {
        border-color: #026670 !important;
        outline: 0 !important;
        -webkit-box-shadow: 0 0 0 2px rgb(74,145,183, .2) !important;
        box-shadow: 0 0 0 2px rgb(74,145,183, .2) !important;
        color: black;
    }

    :hover {
        border: 1px solid #026670 !important;
    }
`;