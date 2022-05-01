const grid = document.getElementById('gifgrid')
let currentOffset = 0
let limit = 10

function trending() {
  fetchGifs('trending','')
}

function sendApiRequest(endpoint, query){
  var userInput = document.getElementById("input").value
  console.log(userInput)
  
  var giphyApiKey = "oCaukQ8WHEMu6Mc9Iu2gmQWIUDQTBfWK"
  var giphyApiURL = `https://api.giphy.com/v1/gifs/search?q=${userInput}&rating=g&api_key=${giphyApiKey}`
  
  fetch(giphyApiURL).then(function(data){return data.json()})
  .then(function(json){
    console.log(json.data[0].images.fixed_height.url)
    var imgPath =json.data[0].images.fixed_height.url
    var img =document.createElement("img")
    img.setAttribute("src", imgPath)
    document.body.appendChild(img)
                     
  })
}

function loadMore(){
  currentOffset += limit
  const searchItem = document.getElementById('input').value
  if (searchItem) {
    fetchGifs('search',`q=${searchItem}&offset=${currentOffset}`)
  } else {
    fetchGifs('trending',`offset=${currentOffset}`)
  }
}

function fetchGifs(endpoint, query){
  const apiKey = "oCaukQ8WHEMu6Mc9Iu2gmQWIUDQTBfWK"
  console.log(`query -> https://api.giphy.com/v1/gifs/${endpoint}?api_key=${apiKey}&limit=${limit}&${query}`)
  fetch(`https://api.giphy.com/v1/gifs/${endpoint}?api_key=${apiKey}&limit=${limit}&${query}`)
  .then(response => response.json())
  .then(json => {
    json.data
      .map(gif => gif.images.fixed_height.url)
      .forEach(url => {
        let img = document.createElement('img')
        img.src = url
        grid.appendChild(img)
      })
  })
  .catch(error => grid.appendChild = error)
}
