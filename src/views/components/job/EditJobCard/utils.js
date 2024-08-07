export const getFormData = job => ({
    title: job.title,
    company: job.company._id,
    companyText: job.company.name, // temp
    position: job.position,
    type: job.type,
    setting: job.setting,
    experienceLevels: job.experienceLevels,
    experienceYears: job.experienceYears,
    location: job.location,
    applicationType: job.applicationType,
    applicationURL: job.applicationURL,
    language: '', // temp
    languages: job.languages,
    skill: '', // temp
    skills: job.skills,
    salaryType: job.salaryType,
    salaryExact: job.salaryExact,
    salaryMin: job.salaryMin,
    salaryMax: job.salaryMax,
    salaryFrequency: job.salaryFrequency,
    archive: job.archive,
    description: job.description,
    includeQuestions: job.applicationType === 'easy-apply', // temp
    questions: job.questions,
    requiresClearance: job.requiresClearance,
    sponsorsVisa: job.sponsorsVisa,
})


export const getFormDataModified = (formData, job={}) => ({
    title: job.title !== formData.title,
    company: Object.keys(job).length ? job.company._id !== formData.company : false,
    position: job.position !== formData.position,
    type: job.type !== formData.type,
    setting: job.setting !== formData.setting,
    experienceLevels: job.experienceLevels !== formData.experienceLevels,
    experienceYears: job.experienceYears !== formData.experienceYears,
    location: job.location !== formData.location,
    applicationType: job.applicationType !== formData.applicationType,
    applicationURL: job.applicationURL !== formData.applicationURL,
    languages: job.languages !== formData.languages,
    skills: job.skills !== formData.skills,
    salaryType: job.salaryType !== formData.salaryType,
    salaryExact: job.salaryExact !== formData.salaryExact,
    salaryMin: job.salaryMin !== formData.salaryMin,
    salaryMax: job.salaryMax !== formData.salaryMax,
    salaryFrequency: job.salaryFrequency !== formData.salaryFrequency,
    archive: job.archive !== formData.archive,
    description: job.description !== formData.description,
    questions: job.questions !== formData.questions,
    requiresClearance: job.requiresClearance !== formData.requiresClearance,
    sponsorsVisa: job.sponsorsVisa !== formData.sponsorsVisa,
})