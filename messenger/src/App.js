import JSONDATA from './MOCK_DATA.json'
import { useState } from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Message from './Message.js'

function App() {
  const [searchTerm, setSearchTerm] = useState("");
    return (
    <Router>
        <div className="App">
            <Route path='/' exact render={(props) => (
                <>
                    <h1 style={{ color: 'red' }}>CharityDrop Messenger</h1>
                        <input
                            type="text"
                            placeholder="Enter a username"
                            onChange={(event) => {
                                setSearchTerm(event.target.value);
                            }}
                        />

                        <h3 style={{ color: 'red' }}>Users found from Input:</h3>

                        {JSONDATA.filter((val) => {
                            if (searchTerm == "") {
                                return val
                            } else if (val.user_name.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return val
                            }
                        }).map((val, key) => {
                            return (
                                <div className="user" key={key}>
                                    <p>{val.user_name}  <a href='/message'>send message</a></p>
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
