import { css } from 'styled-components'


export const SlimScrollStyle = css`
    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-track {
        -webkit-box-shadow: none;
        box-shadow: none;
        border-radius: 10px;
        border-right: 5px solid transparent;
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        -webkit-border-radius: 10px;
        border-radius: 10px;
        height: 20px;
        background: #F8F8F8;
    }
`