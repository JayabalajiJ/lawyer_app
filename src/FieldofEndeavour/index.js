import React,{useEffect,useState} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { generateCompletion } from '../ChatGpt'
import GeneratedSection from '../GeneratedSection';


const AboutOrganization = ({setDetails}) =>{
    return  <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
    
        <div style={{ width: '30%', marginLeft:'2%' }}>
            <TextField required fullWidth label='Sender Full Name with salutation' id="outlined-basic" variant="outlined" onBlur={(e) => setDetails({ name: e.target.value })} />
        </div>
        <div style={{ width: '30%' }}>
            <TextField required fullWidth label='Designation' id="outlined-basic" variant="outlined" onBlur={(e) => setDetails({ designation: e.target.value })} />
        </div>
        <div style={{ width: '30%' }}>
            <TextField required fullWidth label='Employer' id="outlined-basic" variant="outlined" onBlur={(e) => setDetails({ employer: e.target.value })} />
        </div>

    <div style={{ width: '100%',padding:'1em' }}>
    <TextField rows={10} required multiline fullWidth label='About-Organization' id="outlined-basic" variant="outlined" onBlur={(e) => setDetails({ projDesc: e.target.value })} />
</div>
</div>

}

const ApplicantReview = ({setDetails}) => {
    return <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap' }}>
    <div style={{ width: '100%' }}>
    <TextField rows={5} required multiline fullWidth label='Applicant Performance Details' id="outlined-basic" variant="outlined" onBlur={(e) => setDetails({ appReview: e.target.value })} />
</div>
        
</div>
}
const FieldEndeavour = () =>{
    const [details, setDetails] = useState({});
    const [generatedLetter, setGeneratedLetter] = useState("");
  
    const sections = [
      { name: "About-Organization", Component:AboutOrganization },
      { name: "Applicant-Review", Component:ApplicantReview}
      
    ];
    const generateFieldEndeavour = async () => {
        const sectionQuery =
          `EB1 visa recommendation letter from an industry for ${details.recommenderName}.who works as a  ${details.recommenderRole} at ${details.recommenderCompany} The industry recommendation should should start with I presently working as a ${details.recommenderRole}and ${details.projDesc} add the importance of his role to the nation in under 100 words.  No need to pleased to provide sentence, start the letter with application name.
            The second paragraph starts with ${details.name} and ${details.designation} underlining the value and effort and his importance to the field for working ${details.appReview}. The paragraph should not exceed 150 words. `
        const response = await generateCompletion(sectionQuery)
        setGeneratedLetter(response.replaceAll('\n', '<br />'))
    };
    return <div>
    <h1 style={{ marginLeft: 10, color: 'rgb(0, 114, 229)' }}>Field Of Endeavour</h1>
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
        <Button onClick={generateFieldEndeavour} variant="outlined">Generate Field of Endeavour Letter</Button>
    </div>
    <GeneratedSection generatedLetter={generatedLetter} setGeneratedLetter={setGeneratedLetter} />
    </div>
}

export default FieldEndeavour
