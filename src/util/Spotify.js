let userAccessToken = '';
const clientId = 'cc669f02891e496a91b8072088a2c6d1';
const redirectURI = 'http://localhost:3001/';
const Spotify = {

  getAccessToken(){
    if (userAccessToken){
      return userAccessToken;
    }
    const url = window.location.href;
    const accessToken = url.match(/access_token=([^&]*)/);
    const expireIn = url.match(/expires_in=([^&]*)/);

  if (userAccessToken&&expireIn){
    userAccessToken = accessToken[1];
    const expiredTime = Number(expireIn[1]*1000);
    window.setTimeout(()=>{
      userAccessToken = '';
    }, expiredTime)
    window.history.pushState('accessToken', null, '/' );
    return userAccessToken;
  }else{
    return window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
  }
},
  search(term){
    const endPoint = `https://api.spotify.com/v1/search?type=track&q=${term}`;
    return fetch(endPoint, {
      headers: {
        Authorization: `Bearer ${this.getAccessToken()}`
      }
    })
    .then(response=>response.json())
    .then(jsonResponse=>{
      console.log(jsonResponse);
      if (!jsonResponse.tracks){
        return [];
      }else{
        return jsonResponse.tracks.map(currTracks=>{
          return{
            id:currTracks.id,
            name : currTracks.name,
            artist : currTracks.artists[0].name,
            album : currTracks.album.name,
            uri : currTracks.uri
          }
        })
      }
    })
  }
}

export default Spotify;
