listaPokemon = document.getElementById('listaPokemon');
let url = "https://pokeapi.co/api/v2/pokemon/";
let botonesHeader= document.querySelectorAll('.btn-header');

let pokeNombre = document.getElementById('poke-nombre').value;

function buscarPokemon (){
  
  alert(pokeNombre);
}


for (let i = 1; i <= 151; i++) {
  fetch(url + i)
    .then((response) => response.json())
    .then((pokeData) => mostrarData(pokeData))
    .catch((error) => console.log(error));
}

const mostrarData = (pokeData) => {

  let tipos = pokeData.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
  tipos= tipos.join('');

  let pokeId= pokeData.id.toString();
  

  if(pokeId.length===1){
    pokeId ='00'+ pokeId;
  }else if(pokeId.length ===2){
    pokeId ='0'+pokeId;

  }

  const div = document.createElement("div");
  div.classList.add("pokemon");

  div.innerHTML = 
  `
  <div class="pokemon">
    <p class="pokemon-id-back">#${pokeId}</p>
    <div class="pokemon-imagen">
      <img
      src="${pokeData.sprites.other.dream_world.front_default}"
      alt="${pokeData.name}"/>
    </div>
    <div class="pokemon-info">
      <div class="nombre-contenedor">
      <p class="pokemon-id">#${pokeId}</p>
      <h2 class="pokemon-nombre">${pokeData.name}</h2>
      </div>
      <div class="pokemon-tipos">
        ${tipos}
      </div>
      <div class="pokemon-stats">
        <p class="stat">${pokeData.height}M</p>
        <p class="stat">${pokeData.weight}kG</p>
      </div>
    </div>
  </div>
  `

  listaPokemon.append(div);

}

botonesHeader.forEach(boton => boton.addEventListener('click', (e) =>{
  listaPokemon.innerHTML= "";


  const botonPagina= e.currentTarget.id;
  console.log(botonPagina);

  for (let i = 1; i <= 151; i++) {
    fetch(url + i)
      .then((response) => response.json())
      .then(data => {

        const tipos= (data.types.map(type => type.type.name));

        if(botonPagina === 'ver-todos'){
          mostrarData(data);
        }else if(tipos.some(tipo=>tipo.includes(botonPagina))){
          mostrarData(data)
        }

        

      })
  }

}));