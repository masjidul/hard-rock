function getLyricsData(){
        const srchLyrics = document.getElementById('input-srch').value;
        fetch(`https://api.lyrics.ovh/suggest/${srchLyrics}`)
        .then(res => res.json())
        .then(data => {
            
            const getLyr = document.getElementById('results')
            for(let i = 0; i <= data.data.slice(0, 9).length; i++){
                const lyrics = data.data[i];
                const Title = lyrics.title;
                const Artist = lyrics.artist.name;
                const part = document.createElement('p')
                part.innerHTML = `
                <div class="single-result row align-items-center my-3 p-3">
                <div class="col-md-9">
                    <h3 class="lyrics-name">${lyrics.title}</h3>
                    <p class="author lead">Album by <span>${lyrics.artist.name}</span></p>
                </div>
                <div class="col-md-3 text-md-right text-center">
                    <button onclick="getLyrics('${Artist}', '${Title}')" class="btn btn-success">Get Lyrics</button>
                </div>
                </div> 
                `;
                getLyr.appendChild(part);
            }
        })
    } 

    function getLyrics(Artist,Title){
        fetch(`https://api.lyrics.ovh/v1/${Artist}/${Title}`)
        .then(res => res.json())
        .then(data => {
            const lyrics = data.lyrics;
            document.getElementById('songtitle').innerText = Title;
            document.getElementById('lyrTxt').innerText = lyrics;
           
        })
    }

    document.getElementById('srchBtn').addEventListener('click', function(){
        document.getElementById('results').innerHTML = ''
        getLyricsData();

    })
