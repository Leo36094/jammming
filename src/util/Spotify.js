let userAccessToken='';
const clientID = '618ecb9148db48318f5f02034dce6620';
const redirectURI = 'http://urplaylist.surge.sh/';
const Spotify = {
  getAccessToken(){
    if (userAccessToken){
      return userAccessToken;
    }
    const url = window.location.href;
    const accessToken = url.match(/access_token=([^&]*)/);
    const expiresIn = url.match(/expires_in=([^&]*)/);

    if (accessToken&&expiresIn){
      userAccessToken = accessToken[1];
      const expiration = Number(expiresIn[1]) * 1000;
      setTimeout(()=>{
        userAccessToken='';
      },expiration);
      window.history.pushState('For Access Token', null, '/');
      return userAccessToken;
    } else {
      window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    }
  },

  search(term){
    const endpoint = `https://api.spotify.com/v1/search?type=track&q=${term}`;
    const accessToken = this.getAccessToken();
    return fetch(endpoint,{
      headers:{
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(response=>response.json())
    .then(jsonResponse=>{

      if (!jsonResponse.tracks){
        return [];
      }

      return jsonResponse.tracks.items.map(currTrack=>{
        return{
          id: currTrack.id,
          name: currTrack.name,
          artist: currTrack.artists[0].name,
          album: currTrack.album.name,
          uri:currTrack.uri
        };
      })
    });
  },

  savePlayList(playListName, trackURI){

    if(!playListName || !trackURI){
      return;
    }
    const accessToken = this.getAccessToken();
    return fetch('https://api.spotify.com/v1/me', {
      headers:{
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(response=>response.json())
    .then(jsonResponse=>jsonResponse.id)
    .then(userID=>{
      const playlistURL = `https://api.spotify.com/v1/users/${userID}/playlists`;
      fetch(playlistURL,{
        headers:{
          Authorization: `Bearer ${accessToken}`
        },
        body:JSON.stringify({name:playListName}),
        method:'POST'

      })
      .then(response=>response.json())
      .then(jsonResponse=>jsonResponse.id)
      .then(playlistID=>{
        const addSongURL = `https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`;
        fetch(addSongURL, {
          headers:{
            Authorization: `Bearer ${accessToken}`
          },
          body: JSON.stringify({uris:trackURI}),
          method:'POST'
        })
      });
    });
  }

};

export default Spotify;
