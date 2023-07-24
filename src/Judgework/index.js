import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';


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
        <div style={{ width:'100%', marginTop: 20 }}>
            <TextField required rows={5} multiline fullWidth label='Recommender Organization Information' id="outlined-basic" variant="outlined" onBlur={(e) => setDetails({ projDesc: e.target.value })} />
        </div>
    </div>


}

const JudgeWork = ({}) =>{
    return <div>
        <p>Hello-World</p>
    </div>
}
export default RecommenderDetails