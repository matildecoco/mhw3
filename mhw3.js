const client_id = '80c2c0a401714ed18188dcd3797ad36c';
const client_secret = 'add0e342d53a4c5bb7e0a20e7a1d6c32';

function onJSONSpot(json){ 
    const libreria = document.querySelector('#catsImage');
    libreria.innerHTML = '';
    const results = json.albums.items;
    let num_results = results.length;
    if(num_results > 2)
      num_results = 2;
    for(let i=0; i<num_results; i++)
    {
      
      const lista = results[i]
      
      const titolo = lista.name;
      const img_select = lista.images[0].url;
      
      const canzoni = document.createElement('div');
      canzoni.classList.add('stile');
      const img = document.createElement('img');
      img.src = img_select;
      const caption = document.createElement('p');
      caption.textContent = titolo;
      const link= document.createElement('a');
      link.setAttribute('href', lista.external_urls.spotify);
      link.textContent = "Apri su spotify";

      
      canzoni.appendChild(img);
      canzoni.appendChild(caption);
      canzoni.appendChild(link);
      
      libreria.appendChild(canzoni);
  
    }
}


function onJSON(json){
 
  const data = json;
  console.log(data[0].url);
  const image = document.querySelector('#catsImage');
  image.innerHTML = '';
  const img = document.createElement('img');
  img.src=data[0].url
  image.appendChild(img)

}

function onTokenJSON(json){
    token = json.access_token;
}

function onResponseSpot(response){
    return response.json();
}

function onTokenResp(response){
    return response.json();
}

function onResponse(response){
    return response.json();
}

function fetchpics(event){
  event.preventDefault();
  fetch('https://api.thecatapi.com/v1/images/search').then(onResponse).then(onJSON);
}

function fetchspot(event){
    event.preventDefault();
    const search = encodeURIComponent('meow');
    fetch("https://api.spotify.com/v1/search?type=album&q=" + search,
      {
        headers:
        {
          'Authorization': 'Bearer ' + token
        }
      }
    ).then(onResponseSpot).then(onJSONSpot);
}

fetch("https://accounts.spotify.com/api/token",
{
method: "post",
body: 'grant_type=client_credentials',
headers:
{
'Content-Type': 'application/x-www-form-urlencoded',
'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
}
}
).then(onTokenResp).then(onTokenJSON);



let caats=document.querySelector(".Caats");
let spotify=document.querySelector(".Spotify");
caats.addEventListener("click", fetchpics);
spotify.addEventListener("click", fetchspot);

