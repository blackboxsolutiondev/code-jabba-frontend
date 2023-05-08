import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { getIsMobile } from '../../../../redux/theme'
import {
    getProject,
    getLoadingProject,
    getProjectNotFound,

    fetchProject,

    ProjectStatuses
} from '../../../../redux/project'
import { PageContainer } from '../../../components/common/PageContainer'
import { BodyContainer } from '../../../components/common/BodyContainer'
import { MainHeader } from '../../../components/headers/MainHeader'
import { ProjectHeader } from '../../../components/project/ProjectHeader'
import { Loading } from '../../../components/common/Loading'
import { PillLabel } from '../../../components/common/PillLabel'
import { ErrorElement } from '../../ErrorElement'

export const ProjectStatusComponent = props => {
    const {
        
    } = props
    const {projectID} = useParams()

    useEffect(() => {
        props.fetchProject(projectID)
    }, [])

    // Direct Functions

    return (props.projectNotFound ?
        <ErrorElement />
        : <PageContainer>
            <MainHeader />
            <ProjectHeader
                activeLinkID='status'
                projectID={projectID}
            />
            <BodyContainer>
                {!props.loadingProject && props.project ?
                    <Container className={`float-container ${props.isMobile && 'mobile'}`}>
                        <div className='header-container'>
                            <h3 className='line-clamp-1'>{props.project.projectName}</h3>
                        </div>
                        <div className='status-row'>
                            <label>Project Status: </label>
                            <PillLabel
                                title={props.project.status}
                                color={props.project.status === ProjectStatuses.pendingApproval ?
                                        'yellow'
                                    : props.project.status === ProjectStatuses.inProgress ?
                                        'blue'
                                    : props.project.status === ProjectStatuses.completed ?
                                        'green'
                                    : props.project.status === ProjectStatuses.inReview ?
                                        'blue'
                                    : props.project.status === ProjectStatuses.denied ?
                                        'red'
                                    : 'blue'
                                }
                                size='s'
                            />
                        </div>
                        <div className='status-row'>
                            <label>Payment Status: </label>
                            {props.project.receivedPayment ?
                                <PillLabel title='Paid' color='green' size='s' />
                                : <PillLabel title='Unpaid' color='red' size='s' />
                            }
                        </div>
                        <div className='status-row' style={{marginBottom: 0}}>
                            <label>Refund Status: </label>
                            {props.project.refundIssued ?
                                <PillLabel title='Issued' color='green' size='s' />
                                : <PillLabel title='Not issued' color='blue' size='s' />
                            }
                        </div>
                    </Container>
                    : <Loading />
                }
            </BodyContainer>
        </PageContainer>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 30px;

    &.mobile {
        padding: 20px;
    }

    & .header-container {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 40px;
    }

    & .status-row {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
    }
    & .status-row label {
        margin-right: 10px;
    }
`

const mapStateToProps = state => ({
    project: getProject(state),
    loadingProject: getLoadingProject(state),
    projectNotFound: getProjectNotFound(state),
    isMobile: getIsMobile(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchProject
}, dispatch)

export const ProjectStatus = connect(mapStateToProps, mapDispatchToProps)(ProjectStatusComponent)