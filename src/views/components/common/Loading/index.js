import React from 'react'
import styled from 'styled-components'

export const Loading = props => {
    const {
        ...rest
    } = props

    return (
        <Root {...rest}>
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </Root>
    )
}

const Root = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;

    .lds-ellipsis {
        display: inline-flex;
        position: relative;
        width: 80px;
        height: 13px;
    }
    .lds-ellipsis div {
        position: absolute;
        width: 13px;
        height: 13px;
        border-radius: 50%;
        background-color: darkgray;
        background-color: ${p => p.theme.textTertiary};
        animation-timing-function: cubic-bezier(0, 1, 1, 0);
    }
    .lds-ellipsis div:nth-child(1) {
        left: 8px;
        animation: lds-ellipsis1 0.6s infinite;
    }
    .lds-ellipsis div:nth-child(2) {
        left: 8px;
        animation: lds-ellipsis2 0.6s infinite;
    }
    .lds-ellipsis div:nth-child(3) {
        left: 32px;
        animation: lds-ellipsis2 0.6s infinite;
    }
    .lds-ellipsis div:nth-child(4) {
        left: 56px;
        animation: lds-ellipsis3 0.6s infinite;
    }
    @keyframes lds-ellipsis1 {
        0% {
            transform: scale(0);
        }
        100% {
            transform: scale(1);
        }
    }
    @keyframes lds-ellipsis3 {
        0% {
            transform: scale(1);
        }
        100% {
            transform: scale(0);
        }
    }
    @keyframes lds-ellipsis2 {
        0% {
            transform: translate(0, 0);
        }
        100% {
            transform: translate(24px, 0);
        }
    }
`