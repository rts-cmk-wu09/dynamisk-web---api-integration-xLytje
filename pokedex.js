
fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then((response) => response.json())
    .then((data) => {

        document.querySelector("body").innerHTML += `
        <div class="listed">
            <div>
                <img src="img/bulbasaur.png">
                <h3>${name}</h3>
            </div>
            <p>Vis mere</p>
            <img src="img/pokeball.png" alt="Pokéball billede">
        </div>`;
    });












/* <div class="listed">
     <div>
         <img src="img/bulbasaur.png">
         <h3>Bulbasaur</h3>
     </div>
     <p>Vis mere</p>
     <img src="img/pokeball.png" alt="Pokéball billede">
</div> */