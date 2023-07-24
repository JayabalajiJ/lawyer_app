import '../Dashboard/dashboard.css'

const sidePanelLinks = [
    { name: 'Industry Letter', route: 'industry' },
    { name: 'FM Personal Letter', route: 'finance' },
    { name: 'Credibility Letter', route: 'credibility' },
    { name: 'IT Critical Capacity Letter', route: 'critical' },
    { name: 'JudgeWork Letter', route: 'Law' }

]
const SidePanel = ({ setSelectedLetter, selectedLetter }) => {
    return <div style={{ display: 'flex', flexDirection: 'column' }}>
        {sidePanelLinks.map(x => {
            return <div onClick={() => setSelectedLetter(x.route)} className='sidePanelItem'>
                <div className='sideIndicator'></div>
                <div className='sectionName' style={{
                    borderRadius: 5,
                    background: selectedLetter == x.route ? 'linear-gradient(193deg, lightgrey, transparent)' : 'transparent',
                    borderLeft: selectedLetter == x.route ? '5px solid #5196f2' : 'none'
                }}>{x.name}</div>
            </div>
        })}
    </div>
}

export default SidePanel