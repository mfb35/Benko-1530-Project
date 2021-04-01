import JSONDATA from './MOCK_DATA.json'
import Image from './Image.js'
import { useState } from 'react'
import ColoredLine from './ColoredLine.js'
import { BrowserRouter as Router, Route } from 'react-router-dom'


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

                <Route exact render={(props) => (//this is the route for all of the links shown on the campaigns page
                    < h1 style={{ color: 'red' }}> {getURL()} </h1>
                )} />
                <Route path='/home' />
                
            </div>
        </Router>
    );
}

function getURL() {
    let currentURL = window.location.href.substring(22).replace(/%/g, ' ').replace(/20/g, '')//magic number of 22 will have to be changed later
    if (currentURL.includes("Campaign/")) {
        currentURL = currentURL.substring(9)
    }
    return currentURL
}

function getCampaignAttributes() {
    for (var i = 0; i < JSONDATA.map.length; i++) {
        if (JSONDATA[i].campaign == getURL()) {
            return JSONDATA[i];
        }
    }
}
export default App;
