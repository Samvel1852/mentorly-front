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

    .antd-pro-exception-desc {
        width: 350px;
        display: flex;
        justify-content: center;
        text-align: center;
    }

    .antd-pro-exception-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
    }
`;