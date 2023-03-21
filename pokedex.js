fetch(`https://pokeapi.co/api/v2/pokemon/?limit=151`)
    .then((response) => response.json())
    .then((data) => {
        const promises = data.results.map((pokemon) => {
            return fetch(`${pokemon.url}`).then((response) => response.json());
        });

        Promise.all(promises).then((pokemons) => {
            pokemons.forEach((pokemon, pokemonIndex) => {
                console.log("foreach: " + pokemonIndex);
                document.querySelector(".entry").innerHTML += `
                <div class="listed">
                <div>
                    <img src="${pokemon.sprites.front_default}">
                    <h3>${pokemon.name}</h3>
                    <p>#${pokemon.game_indices[9].game_index}</p>
                    ${pokemon.abilities.map(item => `${item.ability.name}`).join(" - ")}
                </div>
                <img src="img/pokeball.png" alt="Pokéball billede">
                </div> 
                `;
            });

            const listedItems = document.querySelectorAll(".listed");
            listedItems.forEach((item, listedItemIndex) => {
                console.log("listedItemIndex: " + listedItemIndex);
                item.addEventListener("click", () => {
                    const newDiv = document.createElement("div");
                    newDiv.classList.add("info");
                    newDiv.textContent = pokemon.abilities.map(item => `${item.ability.name}`);                            
                    const isAdded = item.classList.contains("added");
                    if (isAdded) {
                        const addedDiv = document.querySelector(".info");
                        addedDiv.remove();
                        item.classList.remove("added");
                    } else {
                        item.appendChild(newDiv);
                        item.classList.add("added");
                    }
                });
            });
        });
    });
