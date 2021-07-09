import React, { useState, useEffect } from 'react'
import Metadata from '@woodytechnologies/metadata'
import logo from './logo.svg';
import './App.css';


const configBrowser = {
  sessionID : "session_945aab3d-298a-420a-8304-3ce60fb39149",
  browseUrl : "https://localhost:4443/browser/browse"
}


const exampleMetadata = [
  {
    "id": "usermetadata_text",
    "name": "text",
    "type": "text",
    "config": {
      "type": {},
      "format": {
        "name": "text",
        "multi_line": true
      }
    },
    "editable": true,
    "mandatory": false
  },
  {
    "id": "usermetadata_tags",
    "name": "tags",
    "type": "tags",
    "config": {
      "type": {},
      "format": {
        "name": "text"
      }
    },
    "editable": true,
    "mandatory": false
  }
]

const handleChange = function (e) {
  console.log('change', e)
}


function App() {
  const [woodyUri, setwoodyUri] = useState("https://localhost:4443")
  const [username, setusername] = useState("administrator")
  const [password, setpassword] = useState("woody")
  const [source, setsource] = useState("in2itGoMobile")
  const [profileList, setProfileList] = useState([{ name: "NONE", id: null }])
  const [profile, setprofile] = useState(null)
  const [error, seterror] = useState(null)
  const [metadatas, setmetadatas] = useState([])

  useEffect(async () => {
    try{
      const basic = btoa(`${username}:${password}`)
      const result = await fetch(`${woodyUri}/fetch/profiles/user?source=${source}`, {
        headers: {
          'Authorization': `Basic ${basic}`
        }
      })
      if (result.ok) {
        const profiles = await result.json()
        console.log('profiles', profiles)
        setProfileList(profiles)
        if (profiles.length > 0) {
          console.log('setprofile', profiles[0].id)
          setprofile(profiles[0].id)
        }
        seterror(null)
      }
      else {
        setProfileList([{ name: "NONE", id: null }])
        setmetadatas([])
        setprofile(null)
      }
    }
    catch(error){
      console.error(error)
      seterror(error.message)
      setProfileList([{ name: "NONE", id: null }])
      setmetadatas([])
    }
  }, [woodyUri, username, password, source])

  useEffect(async () => {
    if (profile) {
      const basic = btoa(`${username}:${password}`)
      const result = await fetch(`${woodyUri}/fetch/profiles/user/${profile}?source=${source}`, {
        headers: {
          'Authorization': `Basic ${basic}`
        }
      })
      if (result.ok) {
        const p = await result.json()
        setmetadatas(p.metadatas || [])
      }
    }
  }, [profile])

  return (
    <div className="App">
      <div id="modal" />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a className="App-link" href="https://www.npmjs.com/package/@woodytechnologies/metadata" target="_blank" rel="noopener noreferrer" >
          NPM Documentation
        </a>
        <h3>Example metadata</h3>
        <div className="meta-container">
          {exampleMetadata.map(metadata => {
            return <Metadata data={metadata} {...configBrowser} onChange={handleChange} />
          })}
        </div>

        <h3>Metadata from woody profile</h3>
        <div className="form">
          {error && <h3>{error}</h3>}
          <label>
            Woody Endpoint
          <input value={woodyUri} onChange={e => setwoodyUri(e.target.value)} />
          </label>
          <br/>
          <label>
            Woody username
          <input value={username} onChange={e => setusername(e.target.value)} />
          </label>
          <br/>
          <label>
            Woody password
          <input value={password} onChange={e => setpassword(e.target.value)} />
          </label>
          <br/>
          <label>
            Source
          <input value={source} onChange={e => setsource(e.target.value)} />
          </label>
          <br/>
        </div>
        <select onChange={e => setprofile(e.target.value)}>
          {profileList.map(p => {
            return <option value={p.id}>{p.name}</option>
          })}
        </select>
        <div className="meta-container">
          {metadatas && metadatas.map(meta => {
            return <Metadata data={meta} onChange={handleChange} {...configBrowser} />
          })}
        </div>
      </header>
    </div>
  );
}

export default App;
