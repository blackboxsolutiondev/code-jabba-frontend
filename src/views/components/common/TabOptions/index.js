import React from 'react'
import styled from 'styled-components'

export const TabOptions = props => {
    const {
        options, // [{name, id}]
        activeTabID,

        onClickTab, // (id) => void

        ...rest
    } = props

    const onClickTabOption = tabID => {
        onClickTab(tabID)
    }

    return (
        <Root {...rest}>
            {options.map( ({name, id}) => (
                <h5 
                    className={`
                        tab-option
                        ${id === activeTabID ? 'tab-option-active' : ''}
                    `}
                    onClick={() => onClickTabOption(id)}
                >
                    {name}
                </h5>
            ))}
        </Root>
    )
}

const Root = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;

    & .tab-option {
        border-bottom: 2px solid;
        border-color: transparent;
        padding-bottom: 8px;
        transition: 0.2s;
        cursor: pointer;
        font-weight: 600;
        color: ${p => p.theme.textSecondary} !important;
        margin-right: 15px;
    }
    & .tab-option:hover {
        color: ${p => p.theme.tint} !important;
    }

    & .tab-option-active {
        border-color: ${p => p.theme.tint};
        color: ${p => p.theme.textPrimary} !important;
    }
`