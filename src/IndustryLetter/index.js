import React, { useEffect, useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { generateCompletion } from '../ChatGpt'
import GeneratedSection from '../GeneratedSection';

const ApplicantRoleSection = ({ setDetails }) => {
    return <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <div style={{ width: '30%' }}>
            <TextField required fullWidth label='Applicant Full Name with salutation' id="outlined-basic" variant="outlined" onBlur={(e) => setDetails({ name: e.target.value })} />
        </div>
        <div style={{ width: '30%' }}>
            <TextField required fullWidth label='Designation' id="outlined-basic" variant="outlined" onBlur={(e) => setDetails({ designation: e.target.value })} />
        </div>
        <div style={{ width: '30%' }}>
            <TextField required fullWidth label='Employer' id="outlined-basic" variant="outlined" onBlur={(e) => setDetails({ employer: e.target.value })} />
        </div>
        <div style={{ width: '100%', marginTop: 10 }}>
            <TextField required rows={2} multiline fullWidth label='Description of the Project/work' id="outlined-basic" variant="outlined" onBlur={(e) => setDetails({ projDesc: e.target.value })} />
        </div>
    </div>
}

const Qualification = ({ setDetails }) => {
    return <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <div style={{ width: '30%' }}>
            <TextField required fullWidth label='Recommender Name' id="outlined-basic" variant="outlined" onBlur={(e) => setDetails({ recommenderName: e.target.value })} />
        </div>
        <div style={{ width: '30%' }}>
            <TextField required fullWidth label='Recommender Role' id="outlined-basic" variant="outlined" onBlur={(e) => setDetails({ recommenderRole: e.target.value })} />
        </div>
        <div style={{ width: '30%' }}>
            <TextField required fullWidth label='Recommender Company' id="outlined-basic" variant="outlined" onBlur={(e) => setDetails({ recommenderCompany: e.target.value })} />
        </div>
        <div style={{ width: '100%', marginTop: 10 }}>
            <TextField required rows={2} multiline fullWidth label='Recommender Education details' id="outlined-basic" variant="outlined" onBlur={(e) => setDetails({ recommenderEducationDetails: e.target.value })} />
        </div>
    </div>
}

const ProblemToSolve = ({ setDetails }) => {
    return <div style={{ width: '100%' }}>
        <TextField rows={2} required multiline fullWidth label='Problem Explanation' id="outlined-basic" variant="outlined" onBlur={(e) => setDetails({ problemExplanation: e.target.value })} />
    </div>
}


const IndustryLetterGenerator = () => {
    const [details, setDetails] = useState({})
    const [generatedLetter, setGeneratedLetter] = useState('')

    const sections = [
        { name: 'Applicant Details, Role and its Importance', Component: ApplicantRoleSection },
        { name: 'Qualification of the recommending person', Component: Qualification },
        { name: 'Problem which applicant is solving', Component: ProblemToSolve },
        //{ name: 'Value Provided by applicant to Nation', Component: ValueSection }
    ]

    const generateIndustryCoverLetter = async () => {
        const sectionQuery = [
            `EB1 visa recommendation letter from an industry for  ${details.name} who works as ${details.designation} at ${details.employer} working for ${details.projDesc}.  The industry recommendation should should start with details of ${details.name} and add the importance of his role to the nation in under 100 words.  No need to pleased to provide sentence, start the letter with application name. No need to salutations`,
            `Allow me to introduce myself ${details.recommenderName} who is working as ${details.recommenderRole} at ${details.recommenderCompany}.  He completed his ${details.recommenderEducationDetails}. finish within 100 words.`,
            `Craft a paragraph for someone who is working ${details.problemExplanation}.  Explain the problem in detail and appreaciate their effort.  Explain the problem first and then appreciate. Write it in 150 words`,
            `write a paragaraph for of ${details.name} underlining the value and effort and his importance to the field for working ${details.problemExplanation}. Use pronouns instead of names. Finish it in 100 words`
        ]
        const response = await Promise.all(sectionQuery.map(x => generateCompletion(x)))
        setGeneratedLetter(response.join('<br />').replaceAll('\n', '<br />'))
    }

    return <div>
        <h1 style={{ marginLeft: 10, color: 'rgb(0, 114, 229)' }}>Industry Letter</h1>
        {sections.map(({ name, Component }) => <Accordion defaultExpanded>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon style={{ fontSize: 40 }} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography fontStyle={{ fontWeight: 800 }}>{name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Component setDetails={(data) => setDetails({ ...details, ...data })} />
            </AccordionDetails>
        </Accordion>)}
        <div style={{ marginLeft: 'auto', position: 'absolute', right: 15, marginTop: 10 }}>
            <Button onClick={generateIndustryCoverLetter} variant="outlined">Generate Industry Cover letter</Button>
        </div>
        <GeneratedSection generatedLetter={generatedLetter} setGeneratedLetter={setGeneratedLetter} />
    </div>
}


export default IndustryLetterGenerator