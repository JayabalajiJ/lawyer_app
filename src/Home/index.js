import React from 'react'
import { useState } from 'react'
import IndustryLetterGenerator from '../IndustryLetter'
import FMPeronsalStatement from '../FMPeronsalStatement'
import CredibilityLetter from '../CredibilityLetter'
import ITcritical from '../IT'
import JudgeWork from '../Judgework'
import FieldEndeavour from '../FieldofEndeavour'

import './home.css'
import SidePanel from './SidePanel'
import CriticalRole from '../CriticalRoleLetter'
import Reputation from '../ReputationLetter'
import AcademicSample from '../AcademicSample'
import RegardingLetter from '../RegardingLetter'

const Home = () => {
    const [selectedLetter, setSelectedLetter] = useState('industry')
    const generatorToload = {
        industry: <IndustryLetterGenerator />,
        finance: <FMPeronsalStatement />,
        credibility: <CredibilityLetter />,
        critical: <ITcritical />,
        Law: <JudgeWork />,
        field:<FieldEndeavour/>,
        criticalrole:<CriticalRole/>,
        reputation:<Reputation/>,
        academic:<AcademicSample/>,
        regard:<RegardingLetter/>


    }
    return <div>
        <div className='header'>Jayabalaji</div>
        <div style={{ display: 'flex', width: '100%' }}>
            <div style={{ width: '22%', marginTop: 10, borderRight: '1px solid lightgrey' }}>
                <SidePanel selectedLetter={selectedLetter} setSelectedLetter={letter => setSelectedLetter(letter)} />
            </div>
            <div style={{ width: '78%', height: '94vh', padding: 10 }}>
                {generatorToload[selectedLetter]}
            </div>
        </div>
    </div>
}

export default Home