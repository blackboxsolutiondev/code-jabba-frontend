import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import { addModal } from '../../../redux/modal'
import { ModalTypes } from '../../../containers/ModalProvider'
import { getIsLoggedIn } from '../../../redux/user'
import { PageContainer } from '../../components/common/PageContainer'
import { BodyContainer } from '../../components/common/BodyContainer'
import { MainHeader } from '../../components/headers/MainHeader'
import { LandingHeader } from '../../components/headers/LandingHeader'
import { Button } from '../../components/common/Button'

export const ErrorElementComponent = props => {
    const {
        
    } = props
    const navigate = useNavigate()

    const onClickGoToDashboard = () => navigate('/dashboard')

    const onClickGoToLanding = () => navigate('/')

    const onClickReportBug = () => {
        props.addModal(ModalTypes.CREATE_BUG_REPORT)
    }

    return (
        <PageContainer>
            {props.isLoggedIn ? <MainHeader /> : <LandingHeader />}
            <BodyContainer>
                <Container>
                    <h1>Page not found</h1>
                    {props.isLoggedIn ?
                            <div className='buttons-container'>
                                <Button
                                    title='Go to Dashboard'
                                    type='solid'
                                    priority={1}
                                    onClick={onClickGoToDashboard}
                                    style={{marginBottom: 30}}
                                />
                                <Button
                                    title='Report Bug'
                                    type='clear'
                                    priority={1}
                                    onClick={onClickReportBug}
                                />
                            </div>
                            : <Button
                            title='Go to Landing'
                            type='solid'
                            priority={1}
                            onClick={onClickGoToLanding}
                        />
                    }
                </Container>
            </BodyContainer>
        </PageContainer>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 100%;

    & h1 {
        margin-bottom: 60px;
    }

    & .buttons-container {
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }
`
const mapStateToProps = state => ({
    isLoggedIn: getIsLoggedIn(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
    addModal
}, dispatch)

export const ErrorElement = connect(mapStateToProps, mapDispatchToProps)(ErrorElementComponent)