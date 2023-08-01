import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { generateCompletion } from '../ChatGpt'
import GeneratedSection from '../GeneratedSection';

const RecommenderDetails = ({setDetails}) =>{
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
        <div style={{ width:'100%', marginTop:20 }}>
            <TextField required rows={5} multiline fullWidth label='Recommender Organization Information' id="outlined-basic" variant="outlined" onBlur={(e) => setDetails({ projDesc: e.target.value })} />
        </div>
    </div>
}

const Testimonial = ({setDetails}) =>{
    return  <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
    <div style={{ width: '100%' }}>
    <TextField rows={10} required multiline fullWidth label='Applicant Testimonial Details' id="outlined-basic" variant="outlined" onBlur={(e) => setDetails({ projDesc1: e.target.value })} />
</div>
</div>
}

const Conclusion = ({setDetails}) =>{
    return  <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
    <div style={{ width: '100%' }}>
    <TextField rows={5} required multiline fullWidth label='Brief-Conclusion' id="outlined-basic" variant="outlined" onBlur={(e) => setDetails({ ProjDesc2: e.target.value })} />
    </div>
    </div>
}

const JudgeWork = ({}) =>{
    const [details, setDetails] = useState({});
    const [generatedLetter, setGeneratedLetter] = useState("");
  
    const sections = [
      { name: "Recommender-Details", Component:RecommenderDetails },
      { name: "Testimonial-Details", Component: Testimonial },
      { name: "Testimonial-Conclusion", Component: Conclusion}
    ];

    const generateJudgeWorkLetter = async () => {
        const sectionQuery =
          `write a EB1 visa Judgework letter from an Industry for ${details.recommenderName} working as a ${details.recommenderRole} at ${details.recommenderCompany}. The brief information about the organization ${details.recommenderCompany} in 100 words. The testimonial details ${details.projDesc1} and the brief conclusion ${details.projDesc2} about the applicant. The Judgework letter should starts with I presently working as `
        const response = await generateCompletion(sectionQuery)
        setGeneratedLetter(response.replaceAll('\n', '<br />'))
      };
    return <div>
    <h1 style={{ marginLeft: 10, color: 'rgb(0, 114, 229)' }}>JudgeWork Letter</h1>
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
        <Button onClick={generateJudgeWorkLetter} variant="outlined">Generate Judge Work letter</Button>
    </div>
    <GeneratedSection generatedLetter={generatedLetter} setGeneratedLetter={setGeneratedLetter} />
</div>
}

export default JudgeWork