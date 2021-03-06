import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';
import Profile from './Profile.jsx'
import Gallery from './Gallery.jsx'

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            query: '',
            artist: null,
            tracks: []
        }
    }

    search() {
        console.log('this-state:', this.state);
        const BASE_URL = 'https://api.spotify.com/v1/search?';
        let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
        const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
        console.log('FETCH_URL: ', FETCH_URL);
        var ACCESS_TOKEN = 'BQAJIwMsPOaRa_znpo0JLT0O5EnF87vBcYR1b_xextq3MDbB4Q9bSiFQrq1NohMqfl8UdqPMrzAQLHrh4MeaVNC16LhYFR1c4QYr0yZ_72mqnY4tekLviqQXRqlTkGIflF9AxzVv9GhR9X_JgeUE1Uzr4utark_7&refresh_token=AQAMyLj22p6IBVHuay0b1qp0Rwn6fyMZSBBbx7DKY-mcpOSKR-ZjeOaQ16Gf6XKKY-27nuKq0MCwkWSD7TSLw1sFxXl9jNmaok8uknD9-hO58Fy4vO-ccpGv_-_-r4xYR-Y';
    
        var myOptions = {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer ' + ACCESS_TOKEN
            },
            mode: 'cors',
            cache: 'default'
          };
      
          fetch(FETCH_URL, myOptions)
            .then(response => response.json())
            .then(json => {
                const artist = json.artists.items[0];
                this.setState({artist}); 

                FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`;

                fetch(FETCH_URL, myOptions)
                .then(response => response.json())
                .then(json => {
                    console.log('artist\' top tracks: ', json);
                    const { tracks } = json;
                    this.setState({tracks});
                })
            })

    }

    render() {
        return (
            <div className="App">
                <div className="App-title">Music Master</div>
                <FormGroup>
                    <InputGroup>
                        <FormControl
                            type="text"
                            placeholder="Search for an Artist"
                            value={this.state.query}
                            onChange={event => {this.setState({query: event.target.value})}}
                            onKeyPress={event => {
                                if (event.key === 'Enter') {
                                    this.search()
                                }
                            }}
                        />
                        <InputGroup.Addon onClick={() => this.search()}>
                            <Glyphicon glyph="search"/>
                        </InputGroup.Addon>
                    </InputGroup>
                </FormGroup>
                {
                    this.state.artist !== null
                    ?
                    <div>
                        <hr />
                        <Profile
                            artist={this.state.artist}/>
                            <Gallery tracks={this.state.tracks}/>
                    </div>
                :
                    <div></div>
                }
            </div>
        )
    }
}

export default App