import React, { Component } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import PlayList from '../PlayList/PlayList';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      searchResults:[
        {
          name:'Sugar',
          artist:'Leo',
          album:'aka',
          id:1
        },
        {
          name:'Another',
          artist:'Leokie',
          album:'akaka',
          id:2
        },
        {
          name:'Songggg',
          artist:'Leooo',
          album:'akabb',
          id:3
        }
      ],
      playListTracks: [
        {
          name:'SugarA',
          artist:'LeoA',
          album:'akaA',
          id:4,
          uri:'trackUri4'
        },
        {
          name:'SugarB',
          artist:'LeoB',
          album:'akaB',
          id:5,
          uri:'trackUri5'
        },
        {
          name:'SugarX',
          artist:'LeoX',
          album:'akaX',
          id:6,
          uri:'trackUri6'
        }
      ],
      playListName:'',
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlayListName = this.updatePlayListName.bind(this);
    this.savePlayList = this.savePlayList.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track){
    const tracks = this.state.playListTracks;
    const output = tracks.find(currTrack => currTrack.id === track.id);

    if(!output){
      tracks.push(track);
      this.setState({
        playListTracks:tracks
      });
    }
  }

  removeTrack(track){
    const tracks = this.state.playListTracks;
    const filteredTrack = tracks.filter(currTrack => currTrack.id !== track.id);
    this.setState({
      playListTracks:filteredTrack
    })
  }

  updatePlayListName(name){
    this.setState({
      playListName:name
    })
  }

  savePlayList(){
    const playListTracks = this.state.playListTracks;
    const trackURIs = playListTracks.map(currTrack=>{
      currTrack.uri;
    });
  }

  search(term){
    console.log(term);
  }


  render() {

    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch = {this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} addTrack={this.addTrack}/>
            <PlayList
              playListTracks={this.state.playListTracks}
              playListName={this.state.playListName}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlayListName}
              onSave={this.savePlayList}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
