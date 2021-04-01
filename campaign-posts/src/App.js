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
                <Route path='/' exact render={(props) => (
                    <>
                        <a href='/home'>home</a>
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
                                    <a href={'/Campaign/'+val.campaign}>{val.campaign}</a>
                                    <p><h5> Description: </h5>{val.Description}</p>
                                    <ColoredLine color="black" />
                                </div>
                            );
                        })}
                    </>
                )} />
                <Route path='/' />           
            </div>
        </Router>
    );
}

export default App;
