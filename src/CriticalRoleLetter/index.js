import React,{useState,useEffect} from 'react'
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
    return <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap',justifyContent: 'space-between' }}>
        <div style={{ width: '30%' }}>
            <TextField required fullWidth label='Recommender Name' id="outlined-basic" variant="outlined" onBlur={(e) => setDetails({ recommenderName: e.target.value })} />
        </div>
        <div style={{ width: '30%' }}>
            <TextField required fullWidth label='Recommender Role' id="outlined-basic" variant="outlined" onBlur={(e) => setDetails({ recommenderRole: e.target.value })} />
        </div>
        <div style={{ width: '30%' }}>
            <TextField required fullWidth label='Recommender Company' id="outlined-basic" variant="outlined" onBlur={(e) => setDetails({ recommenderCompany: e.target.value })} />
        </div>
        <div style={{ width:'60%',marginTop:20 }}>
            <TextField required rows={2} multiline fullWidth label='Recommender-Address' id="outlined-basic" variant="outlined" onBlur={(e) => setDetails({ projDesc: e.target.value })} />
        </div>
        <div style={{ width:'100%',marginTop:20}}>
            <TextField required rows={5} multiline fullWidth label='Recommender Experience Details' id="outlined-basic" variant="outlined" onBlur={(e) => setDetails({ projDesc: e.target.value })} />
        </div>
        
       <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap'}}>

        <div style={{ width: '30%',marginTop:'2%',paddingright:'4rem'}}>
            <TextField required fullWidth label='Recommender E-mail ID' id="outlined-basic" variant="outlined" onBlur={(e) => setDetails({ recommenderName: e.target.value })} />
        </div>
        <div style={{ width: '30%',marginTop:'2%',paddingLeft:'2rem'}}>
            <TextField required fullWidth label='Recommender Phone No:' id="outlined-basic" variant="outlined" onBlur={(e) => setDetails({ recommenderName: e.target.value })} />
        </div>
        </div>
    </div>
}

const ApplicantRoleSection = ({ setDetails }) => {
    return <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap' }}>
        <div style={{ width: '30%' }}>
            <TextField required fullWidth label='Applicant Full Name with salutation' id="outlined-basic" variant="outlined" onBlur={(e) => setDetails({ name: e.target.value })} />
        </div>
        <div style={{ width: '30%', marginLeft: '5%' }}>
            <TextField required fullWidth label='Organization' id="outlined-basic" variant="outlined" onBlur={(e) => setDetails({ employer: e.target.value })} />
        </div>
       
        <div style={{ width: '100%', marginTop: 30 }}>
            <TextField required rows={7} multiline fullWidth label='Applicant Contribution to Organization' id="outlined-basic" variant="outlined" onBlur={(e) => setDetails({ projDesc: e.target.value })} />
        </div>
    </div>
}

const CriticalRole = () =>{
    const [details, setDetails] = useState({});
    const [generatedLetter, setGeneratedLetter] = useState("");
  
    const sections = [
      { name: "Recommender-Details", Component:RecommenderDetails },
      { name: "Applicant-Details", Component:ApplicantRoleSection }
    ];

    const generateCriticalRoleLetter = async () => {
        const sectionQuery =
          `Craft a EB1 visa critical letter from an Industry for ${details.recommenderName} working as a ${details.recommenderRole} at ${details.recommenderCompany}.The second paragraph starts with  ${details.Name} working as a ${details.employer} and the entire details of his work ${details.projDesc}. The letter should ends with
          ${details.recommenderName} and ${details.recommenderName}. The letter should be within 150 words. `
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
        <Button onClick={generateCriticalRoleLetter} variant="outlined">Generate Critical Role letter</Button>
    </div>
    <GeneratedSection generatedLetter={generatedLetter} setGeneratedLetter={setGeneratedLetter} />
</div>

}
export default CriticalRole