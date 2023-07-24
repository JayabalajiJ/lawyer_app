import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { generateCompletion } from "../ChatGpt";
import GeneratedSection from "../GeneratedSection";

const ApplicantRoleSection = ({ setDetails }) => {
    return <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap' }}>
        <div style={{ width: '30%' }}>
            <TextField required fullWidth label='Applicant Full Name with salutation' id="outlined-basic" variant="outlined" onBlur={(e) => setDetails({ name: e.target.value })} />
        </div>
        <div style={{ width: '30%', marginLeft: '5%' }}>
            <TextField required fullWidth label='Organization' id="outlined-basic" variant="outlined" onBlur={(e) => setDetails({ employer: e.target.value })} />
        </div>
        
    </div>
}
const Problem = ({ setDetails }) => {
    return <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <div style={{ width: '100%' }}>
            <TextField required rows={15} multiline fullWidth label='Describe Genral Problems In Organization' id="outlined-basic" variant="outlined" onChange={(e) => setDetails({projDesc: e.target.value})} />
        </div>
    </div>
}
const ITcritical = () =>{
    const [details, setDetails] = useState({});
    const [generatedLetter, setGeneratedLetter] = useState("");

    const sections = [
        { name: "Person-Details", Component:ApplicantRoleSection},
        { name: "General-Problem", Component:Problem },
    ]

    const generateITcritical = async() =>{

        const sectionQuery = [
            `craft a IT critical capacity contribution letter starting with ${details.name} and ${details.employer}. Stating the problem ${details.projDesc}. The letter should be within 200 words. `
        ]
        const response = await Promise.all(sectionQuery.map(x => generateCompletion(x)))
        setGeneratedLetter(response.join('<br />').replaceAll('\n', '<br />'))


    }
    return <div>
        <h1 style={{ marginLeft: 10, color: 'rgb(0, 114, 229)' }}>IT Critical Capacity Letter</h1>
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
            <Button onClick={generateITcritical} variant="outlined">Generate IT Critical Capacity Letter</Button>
        </div>
        <GeneratedSection generatedLetter={generatedLetter} setGeneratedLetter={setGeneratedLetter} />
    </div>
}
export default ITcritical