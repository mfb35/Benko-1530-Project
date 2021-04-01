import JSONDATA from './MOCK_DATA.json'
import Image from './Image.js'
import { useState } from 'react'
import ColoredLine from './ColoredLine.js'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { render } from 'react-dom'


function App() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <Router>
            <div className="App">
                <Route path='/' exact render={(props) => (//this is the route for the campaigns page
                    <>
                        <br /> <a href='/Home'>Home</a><br />
                        <a href='/Create'>Create a Campaign</a>
                        <h1 style={{ color: 'red' }}>CharityDrop Campaigns</h1>
                        <input
                            type="text"
                            placeholder="Search for a Campaign"
                            onChange={(event) => {
                                setSearchTerm(event.target.value);
                            }}
                        />

                        <h3 style={{ color: 'red' }}>Live Campaigns:</h3>

                        {JSONDATA.filter((val) => {
                            if (searchTerm == "") {
                                return val
                            } else if (val.campaign.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return val
                            }
                        }).map((val, key) => {
                            return (
                                <div className="user" key={key}>
                                    <Image img={val.PFP} />
                                    <a href={'/Campaign/'+val.campaign}>{val.campaign} </a>
                                    <p><h5> Description: </h5>{val.Description}</p>
                                    <ColoredLine color="black" />
                                </div>
                            );
                        })}
                    </>
                )} />
                <Route path='/' />


                <Route path='/Home' exact render={(props) => (//this is the route for all of the links shown on the campaigns page
                    <h1> </h1>
                )} />
                <Route path='/Home' />

                <Route exact render={(props) => (//this is the route for all of the links shown on the campaigns page
                    renderCampaign(getAddress())
                )} />
                <Route path='/' />
                
            </div>
        </Router>
    );
}
function getAddress() {
    return window.location.href
}
function getURL() {
    let currentURL = window.location.href.substring(22).replace(/%/g, ' ').replace(/20/g, '')//magic number of 22 will have to be changed later
    if (currentURL.includes("Campaign/")) {
        currentURL = currentURL.substring(9)
    }
    return currentURL
}

function getCampaignID() {
    for (var i = 0; i < JSONDATA.length; i++) {
        if (JSONDATA[i].campaign == getURL()) {
            return JSONDATA[i].id;
        }
    }
}

function getCampaignCampaign() {
    for (var i = 0; i < JSONDATA.length; i++) {
        if (JSONDATA[i].campaign == getURL()) {
            return JSONDATA[i].campaign;
        }
    }
}

function getCampaignPFP() {
    for (var i = 0; i < JSONDATA.length; i++) {
        if (JSONDATA[i].campaign == getURL()) {
            return JSONDATA[i].PFP;
        }
    }
}

function getCampaignIP() {
    for (var i = 0; i < JSONDATA.length; i++) {
        if (JSONDATA[i].campaign == getURL()) {
            return JSONDATA[i].ip_address;
        }
    }
}

function getCampaignDescription() {
    for (var i = 0; i < JSONDATA.length; i++) {
        if (JSONDATA[i].campaign == getURL()) {
            return JSONDATA[i].Description;
        }
    }
}

function renderCampaign(props) {
    if (props.includes('donate') || props.includes('Home') || props.includes('Create')) {
        if (props.includes('donate')) {
            return (
                <h1>Donate</h1>
            )
        }
        if (props.includes('Home')) {
            return (
                <h1>Home</h1>
            )
        }
        if (props.includes('Create')) {
            return (
                <h1>Create</h1>
            )
        }
    }
    else {
        return (
            <>
                <Image img={getCampaignPFP()} />
                < h1 style={{ color: 'red' }}>  {getCampaignCampaign()}</h1>
                < h2 style={{ color: 'green' }}>  {getCampaignID()}</h2>
                < h3 style={{ color: 'blue' }}>  {getCampaignIP()}</h3>
                < p style={{ color: 'yellow' }}>  {getCampaignDescription()}</p>
                <a href={getAddress() + '/donate'}>Click to donate</a>
            </>
        )
    }
}
export default App;
