import { Table } from 'antd';
import styled from 'styled-components';

export const MainTable = styled(Table)`

    .ant-pagination-item-active {
        border-color: var(--app-main-color);
        a {
            color: var(--app-main-color);
        }
    }

    .ant-pagination-item:hover {
        border-color: var(--app-main-color);
        a {
            color: var(--app-main-color);
        }
    }

    .ant-pagination-jump-prev .ant-pagination-item-container .ant-pagination-item-link-icon, .ant-pagination-jump-next .ant-pagination-item-container .ant-pagination-item-link-icon {
        color: var(--app-main-color);
    }

    .ant-pagination-next > .ant-pagination-item-link:hover {
        border-color: var(--app-main-color); 
        span {
            color: var(--app-main-color);
        }
    }

    .ant-pagination-prev > .ant-pagination-item-link:hover {
        border-color: var(--app-main-color); 
        span {
            color: var(--app-main-color);
        }
    }

    .ant-pagination-disabled > .ant-pagination-item-link:hover {
        border-color: lightgray !important; 
        span {
            color: lightgray !important;
        }
    }

    .ant-spin-dot-item {
        background-color: var(--app-main-color);
    }
`;