import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

import { 
    getLandingStats,

    fetchLandingStats
} from '../../../redux/landing'
import {
    Events,

    logEvent
} from '../../../redux/events'
import { getIsRecruiterMode, setIsRecruiterMode } from '../../../redux/user'
import { getIsMobile, getIsSemiMobile } from '../../../redux/theme'
import { setThemeColor, setTintColor } from '../../../redux/theme'
import { SubscriptionTiersFormatted, SubscriptionPrices } from '../../../redux/user'
import { PageContainer } from '../../components/common/PageContainer'
import { LandingHeader } from '../../components/headers/LandingHeader'
import { Button } from '../../components/common/Button'
import { ValueDeltaSpread } from '../../components/common/ValueDeltaSpread'

const Config = {
    candidate: {
        heroTitle: 'The job board for software engineers',
        heroMessage: "Forget job titles. Save hours searching for jobs by searching by coding language, skill, and experience level instead.",
        whyChooseUs: [
            {
                id: 0,
                imageURL: 'https://firebasestorage.googleapis.com/v0/b/template-project-7b481.appspot.com/o/landing%2Fadmin_general.png?alt=media&token=727861ea-e064-46ed-9f15-8e386243d39f',
                title: 'Easier job search',
                message: "With our search search filters, you can save time in your job search by searching for jobs by coding language, skill, and experience level.",
            },
            {
                id: 1,
                imageURL: 'https://firebasestorage.googleapis.com/v0/b/code-jabba.appspot.com/o/landing%2FScreen%20Shot%202023-11-25%20at%2011.45.47%20AM.png?alt=media&token=22db5b8e-75b4-4968-9830-4f8de210e090',
                title: 'Reward for referrals',
                message: "With our referral program, you will receive one $5 Amazon gift card for each person you refer that signs up for a premium subscription.",
                icon: 'bi-mailbox'
            },
            {
                id: 2,
                imageURL: '',
                title: 'Application Stats',
                message: "With our site, you can track the statistics of how many of your applications have been viewed, accepted, and rejected.",
                icon: 'bi-credit-card'
            }
        ],
        pricing: [
            {
                title: 'Basic Plan',
                price: 'Free',
                formatCurrency: false,
                features: [
                    {title: 'Unlimited job applications per day'},
                    {title: 'Track application stats'},
                    {title: 'Message recruiters'},
                    {title: 'Schedule interviews'}
                ],
                id: 's'
            },
            // {
            //     title: `${SubscriptionTiersFormatted.candidatePremium} Plan`,
            //     price: `${SubscriptionPrices.candidatePremium} / month`,
            //     formatCurrency: true,
            //     features: [
            //         {title: 'All basic plan benefits'},
            //         {title: 'Unlimited job postings'}
            //     ],
            //     id: 'm'
            // }
        ]
    },
    recruiter: {
        heroTitle: 'The job board for software engineers',
        heroMessage: "Forget resume parsers. Save hours reviewing candidates by sorting applications by years of experience and skill.",
        whyChooseUs: [
            {
                id: 0,
                imageURL: 'https://firebasestorage.googleapis.com/v0/b/template-project-7b481.appspot.com/o/landing%2Fadmin_general.png?alt=media&token=727861ea-e064-46ed-9f15-8e386243d39f',
                title: 'Easier application review',
                message: "With our application review process, you'll be able to save hours searching through applications by sorting by years of experience and skill.",
                icon: 'bi-person-circle'
            },
            {
                id: 1,
                imageURL: 'https://firebasestorage.googleapis.com/v0/b/code-jabba.appspot.com/o/landing%2FScreen%20Shot%202023-11-25%20at%2011.45.47%20AM.png?alt=media&token=22db5b8e-75b4-4968-9830-4f8de210e090',
                title: 'Reward for referrals',
                message: "With our referral program, you will receive one $5 Amazon gift card for each person you refer that signs up for a premium subscription.",
                icon: 'bi-mailbox'
            },
            {
                id: 2,
                imageURL: '',
                title: 'Application stats',
                message: "With our site, you can track the number of applications you receive, view, reject and accept.",
                icon: 'bi-credit-card'
            }
        ],
        pricing: [
            {
                title: 'Basic Plan',
                price: 'Free',
                formatCurrency: false,
                features: [
                    {title: '2 active job posts at a time'},
                    {title: 'Track job post stats'},
                    {title: 'Review applications'}
                ],
                id: 's'
            },
            {
                title: `${SubscriptionTiersFormatted.recruiterPremium} Plan`,
                price: `${SubscriptionPrices.recruiterPremium} / month`,
                formatCurrency: true,
                features: [
                    {title: 'All basic plan benefits'},
                    {title: 'Unlimited job postings'},
                    {title: 'Message candidates'},
                    {title: 'Schedule interviews'}
                ],
                id: 'm'
            }
        ]
    }
}

export const LandingComponent = props => {
    const navigate = useNavigate()
    const userMode = props.isRecruiterMode ? 'recruiter' : 'candidate'
    const config = Config[userMode]
    const [selectedWhyChooseUsOptionID, setSelectedWhyChooseUsOptionID] = useState(1)

    const siteStatsValues = props.isMobile ?
        [
            {title: 'Applications submitted', value: props.siteStats.applicationsCount},
            {title: 'Active job posts', value: props.siteStats.jobsCount},
        ]
        : [
            {title: 'Applications submitted', value: props.siteStats.applicationsCount},
            {title: 'Active job posts', value: props.siteStats.jobsCount},
            {title: 'Candidates', value: props.siteStats.candidatesCount},
            {title: 'Recruiters', value: props.siteStats.recruitersCount},
        ]

    useEffect(() => {
        props.setThemeColor(0)
        props.setTintColor(0)
        props.fetchLandingStats()
        
        props.logEvent(Events.landingPageVisit)
    }, [])

    const onClickGetStarted = () => {
        navigate('/register')
    }

    const onClickViewPricing = () => {
        const pricingElement = document.getElementById('pricing-container')
        pricingElement.scrollIntoView()
    }

    const onClickWhyChooseUsOption = optionID => {
        setSelectedWhyChooseUsOptionID(optionID)
    }

    const onClickPricingOption = optionID => {
        navigate(`/register`)
    }

    const onClickContactUs = () => {
        navigate('/contact-us')
    }

    const onClickIsRecruiter = () => {
        props.setIsRecruiterMode(true)
    }

    const onClickIsCandidate = () => {
        props.setIsRecruiterMode(false)
    }

    return (props.isRecruiterMode === null ?
        <FullscreenContainer>
            <div className='mode-container'>
                <h1 className='mode-title'>I am a</h1>
                <div className='mode-buttons-container'>
                    <Button
                        title='Candidate'
                        type='solid'
                        priority={1}
                        onClick={onClickIsCandidate}
                        style={{marginRight: 20}}
                    />
                    <Button
                        title='Recruiter'
                        type='clear'
                        priority={1}
                        onClick={onClickIsRecruiter}
                    />
                </div>
            </div>
        </FullscreenContainer>
        : <PageContainer>
            <LandingHeader showButtons={true} />
            <Container className={`${props.isMobile && 'mobile'} ${props.isSemiMobile && 'semi-mobile'}`}>
                <div className='hero-container'>
                    <div className='hero-message-container'>
                        <div className='d-flex fd-column ai-flex-start'>
                            <h1 className='hero-title'>{config.heroTitle}</h1>
                            <h3 className='hero-message'>{config.heroMessage}</h3>
                            <div className='d-flex jc-flex-start ai-center'>
                                <Button
                                    title='Get started'
                                    type='solid'
                                    priority={1}
                                    onClick={onClickGetStarted}
                                    style={{marginRight: 15}}
                                />
                                <Button
                                    title='View pricing'
                                    type='clear'
                                    priority={1}
                                    onClick={onClickViewPricing}
                                />
                            </div>
                        </div>
                    </div>
                    <img className='hero-image' src={props.isRecruiterMode ? require('../../../assets/recruiter_dashboard.png') : require('../../../assets/candidate_dashboard.png')} />
                </div>
                <div className='stats-container'>
                    <ValueDeltaSpread
                        values={siteStatsValues}
                        showDelta={false}
                        className='float-container value-delta-spread'
                    />
                </div>
                <div className='why-choose-us-container'>
                    <h1 className='section-title'>Why Choose Us</h1>
                    <div className='why-choose-us-options-container'>
                        <div className='why-choose-us-grid-container'>
                            <div className='why-choose-us-image-container'>
                                <img
                                    className='why-choose-us-image'
                                    src={config.whyChooseUs[selectedWhyChooseUsOptionID].imageURL}
                                    style={{
                                        marginBottom: props.isSemiMobile && selectedWhyChooseUsOptionID !== 1 ? -300 : 0,
                                        borderWidth: selectedWhyChooseUsOptionID === 1 ? 0 : 5,
                                    }}
                        
                                />
                            </div>
                            <div className='d-flex fd-column jc-space-between ai-stretch'>
                                {config.whyChooseUs.map( ({title, message, id}) => (
                                    <div
                                        onClick={() => onClickWhyChooseUsOption(id)}
                                        className={`why-choose-us-option-container ${id == selectedWhyChooseUsOptionID && 'selected'}`}
                                        key={title}
                                    >
                                        <h2 className='title'>{title}</h2>
                                        <h3 className='message'>{message}</h3>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='pricing-container' id='pricing-container'>
                    <div className='section-header'>
                        <h1 className='title'>Pricing</h1>
                        <Button
                            title='Contact us'
                            priority={2}
                            type='solid'
                            onClick={onClickContactUs}
                        />
                    </div>
                    <div
                        className='pricing-options-container'
                        style={{
                            display: props.isRecruiterMode ? 'grid' : 'flex',
                            justifyContent: 'space-around'
                        }}
                    >
                        {config.pricing.map(({title, price, formatCurrency, features, id}) => (
                            <div
                                className='pricing-option-container float-container'
                                key={title}
                                style={{
                                    maxWidth: props.isRecruiterMode ? 'auto' : 'min(600px, 100%)',
                                    minWidth: props.isRecruiterMode ? 'auto' : 'min(600px, 100%)'
                                }}
                            >
                                <div className='header'>
                                    <h3>{title}</h3>
                                    <h3 className='price'>{`${formatCurrency ? '$' : '' } ${price}`}</h3>
                                </div>
                                {features.map( ({title}, i) => (
                                    <div className={`feature-list-item ${!i && 'bold'}`} key={title}>
                                        <i className={`bi-check-circle-fill check-icon`} />
                                        <h3>{title}</h3>
                                    </div>
                                ))}
                                <Button
                                    title='Get started'
                                    type='clear'
                                    priority={1}
                                    onClick={() => onClickPricingOption(id)}
                                    style={{marginTop: 15}}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className='copyright-container'>
                    <p>© {moment().year()} {process.env.REACT_APP_SITE_NAME}. All rights reserved.</p>
                </div>
            </Container>
        </PageContainer>

    )
}

const FullscreenContainer = styled.div`
    postition: fixed;
    z-index: 20;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: ${p => p.theme.bgcLight};
    & .mode-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    & .mode-title {
        margin-bottom: 20px;
    }
    & .mode-buttons-container {
        display: flex;
        align-items: center;
    }
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 100%;

    & .hero-container {
        height: calc(100vh - var(--h-mainheader));
        display: grid;
        grid-template-columns: 1fr 2fr;
        padding: 50px;
        box-sizing: border-box;
        background-color: ${p => p.theme.bgcSettings};
    }
    &.semi-mobile .hero-container {
        padding: 30px;
        grid-template-columns: 1fr;
    }
    &.mobile .hero-container {
        padding: 15px;
    }

    & h1, h2 {
        font-weight: 700;
    }

    & .hero-message-container {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        margin-right: 50px;
    }
    &.semi-mobile .hero-message-container {
        margin-right: 0px;
        margin-bottom: 50px;
    }
    & .hero-title {
        margin-bottom: 20px;
    }
    & .hero-message {
        margin-bottom: 30px;
        line-height: 160%;
        color: ${p => p.theme.textMain};
        font-size: 20px !important;
        font-weight: 400 !important;
    }

    & .hero-image {
        width: 100%;
        border: 5px solid ${p => p.theme.bc};
        border-radius: 20px;
        margin: auto 0px;
        box-sizing: border-box;
    }

    & .stats-container {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 300px;
        background-color: ${p => p.theme.bgcLight};
    }

    & .value-delta-spread {
        padding: 30px;
        width: min(90%, 1000px);
        align-self: center;
        margin-right: 30px;
        margin-left: 30px;
        box-sizing: border-box;
    }

    & .why-choose-us-container {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        padding: 50px;
        background-color: ${p => p.theme.tint};
        border-bottom: 1px solid black;
    }
    &.semi-mobile .why-choose-us-container {
        padding: 30px;
    }
    &.mobile .why-choose-us-container {
        padding: 15px;
    }

    & .section-title {
        margin-bottom: 30px;
    }

    & .why-choose-us-grid-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
    &.semi-mobile .why-choose-us-grid-container {
        grid-template-columns: 1fr;
    }

    & .why-choose-us-image-container {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 550px;
    }
    &.semi-mobile .why-choose-us-image-container {
        height: 300px;
    }
    &.semi-mobile .why-choose-us-image {
        max-width: 275px;
    }
    & .why-choose-us-image {
        max-height: 550px;
        border: 5px solid ${p => p.theme.bc};
        border-radius: 20px;
        max-width: 500px;
    }

    & .why-choose-us-option-container {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        padding: 30px;
        cursor: pointer;
        border-radius: 20px;
        box-sizing: border-box;
        background-color: ${p => p.theme.tint};
    }
    & .why-choose-us-option-container.selected {
        background-color: ${p => p.theme.bgcLight};
    }
    & .why-choose-us-option-container .title {
        margin-bottom: 15px;
    }
    & .why-choose-us-option-container * {
        color: black !important;
    }
    & .why-choose-us-option-container.selected *  {
       color: black !important;
    }

    & .pricing-container {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        padding: 50px;
        border-bottom: 1px solid black;
        background-color: ${p => p.theme.bgcLight};
    }
    &.semi-mobile .pricing-container {
        padding: 30px;
    }
    &.mobile .pricing-container {
        padding: 15px;
    }
    & .section-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 30px;
    }

    & .pricing-options-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
    @media only screen and (max-width: 1000px) {
        & .pricing-options-container {
            grid-template-columns: 1fr;
        }
        & .pricing-option-container {
            margin-bottom: 30px !important;
        }
    }
    & .pricing-option-container {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: space-between;
        border-radius: var(--br-container);
        padding: 30px;
        flex: 1;
        box-sizing: border-box;
        margin: 0px 15px;
    }

    & .pricing-option-container .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }
    & .pricing-option-container .price {
        color: ${p => p.theme.tint};
        font-weight: 600;
    }
    & .pricing-option-container .header h3 {
        font-weight: 700;
    }

    & .feature-list-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        text-align: right;
    }
    & .feature-list-item i {
        font-size: 20px;
        color: ${p => p.theme.tint};
    }
    & .feature-list-item h3 {
        font-weight: 500;
    }
    & .feature-list-item.bold h3 {
        font-weight: 600;
    }

    & .copyright-container {
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 50px 0px;
    }

    & .check-icon {
        margin-right: 30px;
    }
`

const mapStateToProps = state => ({
    isMobile: getIsMobile(state),
    isSemiMobile: getIsSemiMobile(state),
    isRecruiterMode: getIsRecruiterMode(state),
    siteStats: getLandingStats(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    setThemeColor,
    setTintColor,
    setIsRecruiterMode,
    fetchLandingStats,
    logEvent
}, dispatch)

export const Landing = connect(mapStateToProps, mapDispatchToProps)(LandingComponent)