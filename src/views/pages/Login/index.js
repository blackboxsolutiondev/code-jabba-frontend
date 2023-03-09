import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { signInWithRedirect, signInWithEmailAndPassword, GoogleAuthProvider } from 'firebase/auth'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import * as Constants from './constants'
import {auth, getFirebaseAuthErrorMessage} from '../../../networking'
import { addMessage } from '../../../redux/ducks/communication'
import { setThemeColor, setTintColor } from '../../../redux/ducks/theme'
import { BodyContainer } from '../../components/common/BodyContainer'
import { PageContainer } from '../../components/common/PageContainer'
import { LandingHeader } from '../../components/headers/LandingHeader'
import { LoginCard } from '../../components/login/LoginCard'
import { ActionLink } from '../../components/common/ActionLink'
import { Button } from '../../components/common/Button'

export const LoginComponent = props => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        props.setThemeColor(0)
        props.setTintColor(0)
    }, [])

    const onClickSubmit = async e => {
        e.preventDefault()
        try {
            await signInWithEmailAndPassword(auth, email, password)
        } catch (error) {
            const errorMessage = getFirebaseAuthErrorMessage(error)
            props.addMessage(errorMessage, true)
        }
    }

    const onClickContinueWithGoogle = () => {
        signInWithRedirect(auth, new GoogleAuthProvider())
    }

    const onClickForgotPassword = () => {
        navigate('/reset')
    }

    const onClickDontHaveAnAccount = () => {
        navigate('/register')
    }

    const onChangeEmail = e => setEmail(e.target.value)
    
    const onChangePassword = e => setPassword(e.target.value)

    return (
        <PageContainer>
            <LandingHeader showButtons={false} />
            <BodyContainer className='ai-center'>
                <LoginCard className='d-flex fd-column ai-stretch'>
                    <h3>Sign in to your account</h3>
                    <br /><br />
                    <form onSubmit={onClickSubmit} className='d-flex jc-flex-start ai-stretch fd-column'>
                        <label>
                            Email
                        </label>
                        <input
                            value={email}
                            onChange={onChangeEmail}
                            type="email"
                            required
                        />
                        <br />
                        <label>
                            Password
                        </label>
                        <input
                            value={password}
                            onChange={onChangePassword}
                            type="password"
                            required
                        />
                        <ActionLink onClick={onClickForgotPassword} style={{marginTop: 5}}>
                            Forgot password?
                        </ActionLink>
                        <br /><br />
                        <Button
                            type='s'
                            priority={2}
                            onClick={onClickSubmit}
                            title='Submit'
                        />
                    </form>
                    <br />
                    <h4 className='as-center'>or</h4>
                    <br />
                    <Button
                        type='c'
                        priority={2}
                        onClick={onClickContinueWithGoogle}
                        imageURL={Constants.GOOGLE_ICON_URL}
                        imageSize={18}
                        title='Continue with Google'
                    />
                </LoginCard>
                <div className='d-flex ai-center' style={{marginTop: 10}}>
                    <p style={{marginRight: 10}}>
                        Don't have an account?
                    </p>
                    <ActionLink onClick={onClickDontHaveAnAccount}>
                        Sign up
                    </ActionLink>
                </div>
            </BodyContainer>
        </PageContainer>
    )
}

const mapDispatchToProps = dispatch => bindActionCreators({
    addMessage,
    setTintColor,
    setThemeColor
}, dispatch)

export const Login = connect(null, mapDispatchToProps)(LoginComponent)