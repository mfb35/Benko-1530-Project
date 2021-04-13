import JSONDATA from './MOCK_DATA.json'
import { useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'                                                       //must install with, npm install --save react-router-dom
import Message from './Message.js'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure()                                                                                                       //this sets up the copied notification
function App() {
    const notify = () => {
        toast('Email Address has been copied to clipboard!')
    }

  const [searchTerm, setSearchTerm] = useState("");
    return (
    <Router>
        <div className="App">
            <Route path='/' exact render={(props) => (
                <>
                        <h1 style={{ color: 'red' }}>CharityDrop Contact User:</h1>                                     {/* this is the header to the messenger page*/}
                                                                                                                        {/* this is the search bar*/}
                        <input
                            type="text"
                            placeholder="Enter a username"
                            onChange={(event) => {
                                setSearchTerm(event.target.value);
                            }}
                        />

                        <h3 style={{ color: 'red' }}>Users found from Input:</h3>                                        {/*this is another header*/}

                        {JSONDATA.filter((val) => {                                                                      {/* allows for screen to dynamically display users based on search entry*/}
                            if (searchTerm == "") {
                                return val
                            } else if (val.user_name.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return val
                            }
                        }).map((val, key) => {
                                                                                                                          {/* these are the users that are displayed on the main page based on the search */ }
                            return (                                                                                        
                                <div className="user" key={key}>
                                    <p>{val.user_name}                                                                    {/*This is information displayed to the screen based on search results*/}
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(val.email)
                                                notify()
                                            }}
                                        >
                                            Get Email
                                            </button>
                                    </p>                                             
                                </div>
                            );
                        })}
                </>
            )}  />

        <Route path='/message' component={Message} />
        </div>
    </Router>
  );
}


export default App;