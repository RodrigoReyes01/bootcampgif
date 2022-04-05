const giphyData = {
    api_key: "oCaukQ8WHEMu6Mc9Iu2gmQWIUDQTBfWK",
    limitBegin: 24,
};

let embededTrendigGifs = [];
const fetchPromise = fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${giphyData.api_key}&limit=${giphyData.limitBegin}`);
fetchPromise.then(response => {
    const jsonPromise = response.json();
    jsonPromise.then(json => {
        const data = json.data;
        for (let i = 0; i < data.length; i++) {
            embededTrendigGifs.push(data[i]['embed_url']);
        }
        const container = document.getElementById('gifs-container');
        for (let i = 0; i < embededTrendigGifs.length; i++) {
            let col = document.createElement('div');
            col.classList.add('col');
            let card = document.createElement('div');
            card.classList.add('card');
            let frame = document.createElement('iframe');
            frame.setAttribute('src', embededTrendigGifs[i]);
            frame.classList.add('giphy-embed');
            card.appendChild(frame);
            col.appendChild(card);
            container.appendChild(col);
        }
    });
});


function loadMore() {
    randomNumber = Math.floor((Math.random() * 1000) + 1);
    let embededTrendigGifs = [];
    const fetchPromise = fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${giphyData.api_key}&limit=9&offset=${randomNumber}`);
    fetchPromise.then(response => {
        const jsonPromise = response.json();
        jsonPromise.then(json => {
            const data = json.data;
            for (let i = 0; i < data.length; i++) {
                embededTrendigGifs.push(data[i]['embed_url']);
            }
            const container = document.getElementById('gifs-container');
            for (let i = 0; i < embededTrendigGifs.length; i++) {
                let col = document.createElement('div');
                col.classList.add('col');
                let card = document.createElement('div');
                card.classList.add('card');
                let frame = document.createElement('iframe');
                frame.setAttribute('src', embededTrendigGifs[i]);
                frame.classList.add('giphy-embed');
                card.appendChild(frame);
                col.appendChild(card);
                container.appendChild(col);
            }
        });
    });
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function searchGif() {
    const search = document.getElementById('search').value;
    console.log(search);
    const h1 = document.getElementById('heading');
    h1.innerHTML = "Results for: " + search.toUpperCase();
    document.getElementById('button-container').remove;
    let embededTrendigGifs = [];
    const fetchPromise = fetch(`https://api.giphy.com/v1/gifs/search?api_key=${giphyData.api_key}&q=${search}&limit=${giphyData.limitBegin}`);
    fetchPromise.then(response => {
        const jsonPromise = response.json();
        jsonPromise.then(json => {
            const data = json.data;
            console.log(data)
            for (let i = 0; i < data.length; i++) {
                embededTrendigGifs.push(data[i]['embed_url']);
            }
            console.log(embededTrendigGifs);
            const container = document.getElementById('gifs-container');
            removeAllChildNodes(container);
            for (let i = 0; i < embededTrendigGifs.length; i++) {
                let col = document.createElement('div');
                col.classList.add('col');
                let card = document.createElement('div');
                card.classList.add('card');
                let frame = document.createElement('iframe');
                frame.setAttribute('src', embededTrendigGifs[i]);
                frame.classList.add('giphy-embed');
                card.appendChild(frame);
                col.appendChild(card);
                container.appendChild(col);
            }
        });
    });
}