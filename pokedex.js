fetch(`https://pokeapi.co/api/v2/pokemon/?limit=151`)
    .then((response) => response.json())
    .then((data) => {
        const promises = data.results.map((pokemon) => {
            return fetch(`${pokemon.url}`).then((response) => response.json());
        });

        Promise.all(promises).then((pokemons) => {
            const entryHTML = pokemons.map((pokemon, pokemonIndex) => `
                <div class="listed">
                    <div>
                        <img src="${pokemon.sprites.front_default}">
                        <h3>${pokemon.name}</h3>
                        <p>#${pokemon.game_indices[9].game_index}</p>
                    </div>
                    <img src="img/pokeball.png" alt="Pokéball billede">
                </div>
            `).join("");

            document.querySelector(".entry").innerHTML = entryHTML;

            const listedItems = document.querySelectorAll(".listed");
            
            listedItems.forEach((item, listedItemIndex) => {
                item.addEventListener("click", () => {
                    const newDiv = document.createElement("div");
                    newDiv.classList.add("info");
                    newDiv.innerHTML = "";

                    const title = document.createElement("h3");
                    title.textContent = "Abilities:";
                    newDiv.appendChild(title);
                        
                    const newP = document.createElement("p");
                    newP.classList.add("abilities");
                    newP.innerHTML = "";

                    

                    newP.innerHTML = pokemons[listedItemIndex].abilities.join(", ")
                    pokemons[listedItemIndex].abilities.forEach((ability) => {
                        const p = document.createElement("p");
                        p.textContent = ability.ability.name;
                        newP.appendChild(p);
                    });

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
