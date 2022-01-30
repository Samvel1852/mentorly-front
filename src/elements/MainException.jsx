import Exception from 'ant-design-pro/lib/Exception';
import styled from 'styled-components'

export const MainException = styled(Exception)`
    .ant-btn-primary {
        background-color:  var(--app-main-color);
        border: none;
    }

    .ant-btn-primary:hover {
        opacity: 70%;
    }
`;