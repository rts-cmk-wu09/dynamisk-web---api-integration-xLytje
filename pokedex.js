fetch(`https://pokeapi.co/api/v2/pokemon/?limit=15`)
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

                    const listedItems = document.querySelectorAll(".listed");

                    listedItems.forEach((item) => {
                        item.addEventListener("click", () => {
                            const newDiv = document.createElement("div");
                            newDiv.classList.add("info");

                            newDiv.innerHTML = `<section><p>Teste text til information</p></section>`;

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

                })
        })
        
    });