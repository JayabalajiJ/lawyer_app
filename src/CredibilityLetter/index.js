import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { generateCompletion } from '../ChatGpt'
import GeneratedSection from "../GeneratedSection";

const AboutRecommender = ({ setDetails }) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      <div style={{ width: "30%" }}>
        <TextField
          required
          fullWidth
          label="Recommender Name"
          id="outlined-basic"
          variant="outlined"
          onBlur={(e) => setDetails({ recommenderName: e.target.value })}
        />
      </div>
      <div style={{ width: "30%" }}>
        <TextField
          required
          fullWidth
          label="RecommenderDesignation"
          id="outlined-basic"
          variant="outlined"
          onBlur={(e) => setDetails({ recommenderRole: e.target.value })}
        />
      </div>
      <div style={{ width: "30%" }}>
        <TextField
          required
          fullWidth
          label="Recommender Organization"
          id="outlined-basic"
          variant="outlined"
          onBlur={(e) => setDetails({ recommenderCompany: e.target.value })}
        />
      </div>
      <div style={{ width: "100%", marginTop: 10 }}>
        <TextField
          required
          rows={3}
          multiline
          fullWidth
          label="About Recommender Organization"
          id="outlined-basic"
          variant="outlined"
          onBlur={(e) => setDetails({ projDesc: e.target.value })}
        />
      </div>
    </div>
  );
};
const AboutApplicant = ({ setDetails }) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      <div style={{ width: "30%" }}>
        <TextField
          required
          fullWidth
          label="Applicant-Name"
          id="outlined-basic"
          variant="outlined"
          onBlur={(e) => setDetails({ name: e.target.value })}
        />
      </div>

      <div style={{ width: "30%", marginLeft: '5%' }}>
        <TextField
          required
          fullWidth
          label="Designation"
          id="outlined-basic"
          variant="outlined"
          onBlur={(e) => setDetails({ designation: e.target.value })}
        />
      </div>
      <div style={{ width: "100%", marginTop: 10 }}>
        <TextField
          required
          rows={4}
          multiline
          fullWidth
          label="Contribution of the Applicant to our Country"
          id="outlined-basic"
          variant="outlined"
          onBlur={(e) => setDetails({ projDesc: e.target.value })}
        />
      </div>
    </div>
  );
};
const CredibilityLetter = () => {
  const [details, setDetails] = useState({});
  const [generatedLetter, setGeneratedLetter] = useState("");

  const sections = [
    { name: "About-Recommender", Component: AboutRecommender },
    { name: "About-Applicant", Component: AboutApplicant }
  ];

  const generateCredibilityLetter = async () => {
    const sectionQuery =
      `EB1 visa recommendation letter from an industry for ${details.recommenderName}.who works as a  ${details.recommenderRole} at ${details.recommenderCompany} The industry recommendation should should start with I presently working as a ${details.recommenderRole}and ${details.projDesc} add the importance of his role to the nation in under 100 words.  No need to pleased to provide sentence, start the letter with application name. No need to salutations.
        The second paragraph starts with ${details.name} and ${details.designation} underlining the value and effort and his importance to the field for working ${details.projDesc}. The paragraph should not exceed 150 words. `
    const response = await generateCompletion(sectionQuery)
    setGeneratedLetter(response.replaceAll('\n', '<br />'))
  };

  return (
    <div>
      <h1 style={{ marginLeft: 10, color: "rgb(0, 114, 229)" }}>
        Copy of Credibility
      </h1>
      {sections.map(({ name, Component }) => (
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ fontSize: 40 }} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography fontStyle={{ fontWeight: 800 }}>{name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Component
              setDetails={(data) => setDetails({ ...details, ...data })}
            />
          </AccordionDetails>
        </Accordion>
      ))}
      <div
        style={{
          marginLeft: "auto",
          position: "absolute",
          right: 15,
          marginTop: 10,
        }}
      >
        <Button onClick={generateCredibilityLetter} variant="outlined">
          Generate Credibility Letter
        </Button>
      </div>
      <GeneratedSection
        generatedLetter={generatedLetter}
        setGeneratedLetter={setGeneratedLetter}
      />
    </div>
  );
};
export default CredibilityLetter
