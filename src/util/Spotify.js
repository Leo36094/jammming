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
    },expiredTime)
    window.history.pushState('accessToken', null, '/' );
  }else{
    return window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
  }
},
search(term){
  const endPoint = `https://api.spotify.com/v1/search?type=track&q=${term}`;
  fetch(endPoint,{
    header:{
      Authorization: `Bearer ${userAccessToken}`
    }
  })
    .then(response=>response.json())
    .then(jsonResponse=>{
      
    })
}




}

export default Spotify
