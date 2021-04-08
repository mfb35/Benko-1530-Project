import JSONDATA from './MOCK_DATA.json'
import Image from './Image.js'
import { useState } from 'react'
import ColoredLine from './ColoredLine.js'
import { BrowserRouter as Router, Route } from 'react-router-dom'                                           //must install with, npm install --save react-router-dom
import { render } from 'react-dom'


function App() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <Router>
            <div className="App">
                <Route path='/' exact render={(props) => (                                                     //this is the route for the campaigns page
                    <>
                        <br /> <a href='/Home'>Home</a><br />                                                   {/* adds a link to Home */}
                        <a href='/Create'>Create a Campaign</a>                                                 {/* adds a link to create campaign */}
                        <h1 style={{ color: 'red' }}>CharityDrop Campaigns</h1>                                 {/* page header */}
                                                                                                                {/* adds a search bar */}
                        <input                                                                                 
                            type="text"                                                                         
                            placeholder="Search for a Campaign"
                            onChange={(event) => {
                                setSearchTerm(event.target.value);
                            }}
                        />

                        <h3 style={{ color: 'red' }}>Live Campaigns:</h3>                                       {/* adds another header */}

                        {JSONDATA.filter((val) => {                                                             {/* allows for screen to dynamically display camapaigns based on search entry*/}
                            if (searchTerm == "") {
                                return val
                            } else if (val.campaign.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return val
                            }
                        }).map((val, key) => {
                            return (
                                <div className="user" key={key}>                                                {/* these are the items that are displayed on the main page for each campaign based on the search */}
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


                <Route path='/Home' exact render={(props) => (                                              //this is the route for all of the links shown on the campaigns page
                    <h1> </h1>
                )} />
                <Route path='/Home' />

                <Route exact render={(props) => (                                                           //this is the route for all of the links shown on the campaigns page
                    renderPage(getAddress())
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
    let currentURL = window.location.href.substring(22).replace(/%/g, ' ').replace(/20/g, '')               //this allows the page name to be displayed by converting information in the URL to a string with spaces instead of percent symbols
    if (currentURL.includes("Campaign/")) {                                                                 //extract the ending of the URL if it is a campaign page URL
        currentURL = currentURL.substring(9)
    }
    return currentURL
}

function getCampaignID() {                                                                                  //searches the JSON array for the Campaign ID based on current URL
    for (var i = 0; i < JSONDATA.length; i++) {
        if (JSONDATA[i].campaign == getURL()) {
            return JSONDATA[i].id;
        }
    }
}

function getCampaignCampaign() {                                                                            //searches the JSON array for the Campaign Name based on current URL
    for (var i = 0; i < JSONDATA.length; i++) {
        if (JSONDATA[i].campaign == getURL()) {
            return JSONDATA[i].campaign;
        }
    }
}

function getCampaignPFP() {                                                                                 //searches the JSON array for a picture URL based on current URL
    for (var i = 0; i < JSONDATA.length; i++) {
        if (JSONDATA[i].campaign == getURL()) {
            return JSONDATA[i].PFP;
        }
    }
}

function getCampaignIP() {                                                                                  //searches the JSON array for a IP address based on current URL
    for (var i = 0; i < JSONDATA.length; i++) {
        if (JSONDATA[i].campaign == getURL()) {
            return JSONDATA[i].ip_address;
        }
    }
}

function getCampaignDescription() {                                                                         //searches the JSON array for a specific desricption based on current URL
    for (var i = 0; i < JSONDATA.length; i++) {
        if (JSONDATA[i].campaign == getURL()) {
            return JSONDATA[i].Description;
        }
    }
}

function renderPage(props) {                                                                                //this function prevents the JSON array from being searched and data being displayed on certain URL's such as Home, Donate, and Create
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

    else if (props ==="http://localhost:3000/") {                                                           {/* prevnts rendering at the very bottom of the main page*/}
        return
    }

    else {
        return (
            <>
                <Image img={getCampaignPFP()} />                                                            {/* This is "printed" to the page when the URL is a campaign page */}                                
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
