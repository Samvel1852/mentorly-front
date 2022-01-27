import { Input } from 'antd'
import styled from 'styled-components'

const { TextArea } = Input

export const MainTextarea = styled(TextArea)`
    
    textarea:focus {
        border-color: #026670 !important;
        outline: none !important;
        -webkit-box-shadow: 0 0 0 2px rgb(74,145,183, .2) !important;
        box-shadow: 0 0 0 2px rgb(74,145,183, .2) !important;
        opacity: 50%;
    }
    

    :hover {
        textarea {
            border: 1px solid #026670 !important;
        }
    }
`;