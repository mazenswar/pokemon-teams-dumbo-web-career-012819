const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const trainersArrayIterate = (trainersArray) => {
  for (const trainerObj of trainersArray ) {

      const divTag = document.createElement('DIV');
      divTag.dataset.id = trainerObj.id;
      divTag.className = "card";
      const pTag = document.createElement('P');
      pTag.innerText = trainerObj.name;
      const buttonTag = document.createElement('BUTTON');
      buttonTag.innerText = "Add Pokemon";
      buttonTag.dataset.trainerId = trainerObj.id;
      const ulTag = document.createElement('UL');

      trainerObj.pokemons.forEach(pokemon => {
        let pokemonLi = `<li>${pokemon.nickname} (${pokemon.species})<button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
        ulTag.innerHTML += pokemonLi;
      })

      divTag.append(pTag,buttonTag,ulTag);

      document.querySelector('main').append(divTag);
  }
}

///////// DELETE ///////////
const configObj = (action) => {
 return  {
    method: action,
    header: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }
};

const deletePokemon = (id) => {
  const dataObj = configObj('DELETE');
  fetch(POKEMONS_URL+"/"+id, dataObj)
  .then(response => response.json())
}


const dataa = {
method: "POST",
header: {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
},
body: JSON.stringify( {pokemon:{trainer_id: "2"}} )
}

const addPokemon = (id) => {
  const dataObj = configObj('POST');
  const pokemon = { trainer_id: id }
  dataObj.body = JSON.stringify(pokemon);
  // delete dataObj.header['Accept'];
  // debugger
  fetch(POKEMONS_URL, dataa)
  .then( response => response.json() )

}

////////////// CRUD METHODS ///////////////////
document.addEventListener('click', (event) => {
  const target = event.target;
  if(target.className === "release") {
    deletePokemon(target.dataset.pokemonId);
    target.parentElement.remove();
  } else if (target.innerText === "Add Pokemon"){
    let ok = addPokemon(target.dataset.trainerId);

  }
})

///////////   END   //////////////

const trainerCard = (trainerObj) => {
  trainersArrayIterate(trainerObj);
}



document.addEventListener('DOMContentLoaded', () => {


  fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(renderedResp => {
      trainerCard(renderedResp);
    })

})



//
// <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
// <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li>
// <li>Mittie (Farfetch'd) <button class="release" data-pokemon-id="149">Release</button></li>
// <li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li>
// <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li>
