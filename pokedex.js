fetch(`https://pokeapi.co/api/v2/pokemon/?limit=151`)
    .then((response) => response.json())
    .then((data) => {
        data.results.forEach((pokemon) => {
            fetch(`${pokemon.url}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data)
                    document.querySelector(".entry").innerHTML += `
                    <div class="listed">
                    <div>
                        <img src="${data.sprites.front_default}">
                        <h3>${pokemon.name}</h3>
                        <p>#${data.game_indices[9].game_index}</p>
                    </div>
                    <img src="img/pokeball.png" alt="Pokéball billede">
                    </div> 
                    `;
                })
        })
        
    });