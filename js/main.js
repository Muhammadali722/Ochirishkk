let elPokimonList = document.querySelector(".pokimon-list");
let elSearchInput = document.querySelector(".search-input");
let elSearchBtn = document.querySelector(".search-button");
let elModalWrapper = document.querySelector(".modal-wrapper");
let elModalInner = document.querySelector(".modal-inner");


elSearchBtn.addEventListener("click", filterPokemons);


elSearchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        filterPokemons();
    }
});
if (!localStorage.getItem("pokemonWidths")) {
    const widths = {};
    pokemons.forEach(pokemon => {
        widths[pokemon.id] = Math.floor(Math.random() * (100 - 60 + 1)) + 60;
    });
    localStorage.setItem("pokemonWidths", JSON.stringify(widths));
}


const savedWidths = JSON.parse(localStorage.getItem("pokemonWidths"));
pokemons = pokemons.map(pokemon => ({
    ...pokemon,
    randomWidth: savedWidths[pokemon.id] || 80
}));

function filterPokemons() {
    const searchValue = elSearchInput.value.trim().toLowerCase();
    let filtered = pokemons;

    if (searchValue !== "") {
        filtered = filtered.filter(item =>
            item.num.toLowerCase().includes(searchValue) ||
            item.name.toLowerCase().includes(searchValue) ||
            item.candy.toLowerCase().includes(searchValue) ||
            item.type.some(t => t.toLowerCase().includes(searchValue))
        );
    }

    renderPokemons(filtered, elPokimonList);
}


function renderPokemons(arr, list) {
    list.innerHTML = "";
    arr.forEach(item => {
        let elItem = document.createElement("li");
        elItem.className = "!w-[180px] text-center bg-sky-100 rounded-l-[40%] rounded-r-[50%] cursor-pointer";
        elItem.onclick = () => handleBtnClick(item.id);
        elItem.innerHTML = `
      <img style="width: ${item.randomWidth}px; height: 100px;" class="mt-[-65px] mx-auto transition duration-300 ease-in-out transform hover:scale-110"
           src="${item.img}" alt="${item.name}" />
      <div>
        <strong class="block text-[18px] text-[#777777] font-bold pt-[20px]">#${item.id}</strong>
        <p class="font-bold text-[17px]">${item.name}</p>
        <div class="flex gap-[5px] flex-wrap mx-auto pt-[20px] pb-[10px] justify-center items-center">
          ${item.type.map(type => {
            let bgColor = getTypeButtonColor(type);
            return `<button onclick="handleBtnClick(${item.id})" class="text-[12px] font-semibold text-white px-[18px] py-[5px] rounded-[5px] ${bgColor} transition">${type}</button>`;
        }).join("")}
        </div>
      </div>
    `;
        list.appendChild(elItem);
    });
}

function handleBtnClick(id) {
    elModalWrapper.classList.remove("hidden");
    let findeObj = pokemons.find(item => item.id == id);

    elModalInner.innerHTML = `
    <div class="bg-white relative rounded-xl shadow-[0_4px_10px_rgba(0,0,0,1)] p-[20px] max-w-[500px] h-[450px] mx-auto">
      <div class="flex flex-col items-center text-center">
        <div class="flex justify-between w-[440px]">
          <p class="text-[17px] text-[#000000] font-bold">${findeObj.height}</p>
          <p class="text-[17px] text-[#000000] font-bold">${findeObj.weight}</p>
        </div>

        <img class="w-40 h-40 object-contain mt-[-150px]" src="${findeObj.img}" alt="${findeObj.name}" />
        <h2 class="font-semibold flex flex-col text-gray-500">#${findeObj.id}
          <span class="text-[#000000] font-bold text-[20px]">${findeObj.name}</span>
        </h2>

        <div class="w-[400px] mt-[20px] flex justify-between mx-auto">
          <div class="w-[200px] text-center">
            <p class="font-bold text-[17px] text-[#000000] pb-[10px]">Types</p>
            <div class="flex flex-wrap gap-[10px] justify-center">
              ${findeObj.type.map(type => `<span class="text-white px-3 py-1 rounded-[5px] text-sm ${getTypeColor(type)}">${type}</span>`).join("")}
            </div>
          </div>

          <div class="w-[300px] text-center">
            <p class="pb-[10px] text-[#000000] text-[17px] font-bold">❌ Weaknesses ❌</p>
            <div class="flex flex-wrap gap-[10px] justify-center">
              ${findeObj.weaknesses.map(w => `<span class="text-white px-3 py-1 rounded-[5px] text-sm ${getTypeColor(w)}">${w}</span>`).join("")}
            </div>
          </div>
        </div>

        <p class="font-bold text-[17px] pt-[70px]">Stats</p>
        <div class="w-[460px] flex flex-wrap gap-[10px] justify-center pt-[20px]">
          ${getStatsHtml(findeObj)}
        </div>
      </div>
    </div>
  `;
}

function getTypeColor(type) {
    switch (type) {
        case "Grass":
            return "bg-green-500";
        case "Poison":
            return "bg-purple-600";
        case "Fire":
            return "bg-red-500";
        case "Water":
            return "bg-blue-500";
        case "Flying":
            return "bg-sky-400";
        case "Bug":
            return "bg-yellow-600";
        case "Normal":
            return "bg-stone-500";
        case "Electric":
            return "bg-yellow-400";
        case "Ground":
            return "bg-amber-600";
        case "Fighting":
            return "bg-red-700";
        case "Psychic":
            return "bg-pink-500";
        case "Rock":
            return "bg-stone-700";
        case "Ice":
            return "bg-cyan-300";
        case "Dragon":
            return "bg-indigo-700";
        default:
            return "bg-gray-500";
    }
}

function getTypeButtonColor(type) {
    switch (type) {
        case "Grass":
            return "bg-green-400 hover:bg-green-600";
        case "Poison":
            return "bg-purple-600 hover:bg-purple-800";
        case "Fire":
            return "bg-red-400 hover:bg-red-500";
        case "Water":
            return "bg-blue-500 hover:bg-blue-700";
        case "Flying":
            return "bg-sky-400 hover:bg-sky-600";
        case "Bug":
            return "bg-yellow-600 hover:bg-yellow-800";
        case "Normal":
            return "bg-stone-500 hover:bg-stone-600";
        case "Electric":
            return "bg-yellow-400 hover:bg-yellow-600";
        case "Ground":
            return "bg-amber-600 hover:bg-amber-800";
        case "Fighting":
            return "bg-red-700 hover:bg-red-900";
        case "Psychic":
            return "bg-pink-500 hover:bg-pink-700";
        case "Rock":
            return "bg-stone-500 hover:bg-stone-700";
        case "Ice":
            return "bg-cyan-300 hover:bg-cyan-500";
        case "Dragon":
            return "bg-indigo-700 hover:bg-indigo-900";
        default:
            return "bg-gray-500 hover:bg-gray-400";
    }
}


function getStatColor(label) {
    switch (label) {
        case "Candy":
            return "bg-red-400";
        case "Candy Count":
            return "bg-orange-400";
        case "Egg":
            return "bg-yellow-500";
        case "Spawn Chance":
            return "bg-green-500";
        case "Avg Spawns":
            return "bg-blue-500";
        case "Spawn Time":
            return "bg-purple-500";
        default:
            return "bg-gray-400";
    }
}


function getStatsHtml(pokemon) {
    const stats = [
        {
            label: "Candy",
            value: pokemon.candy
        },
        {
            label: "Candy Count",
            value: pokemon.candy_count ?? "N/A"
        },
        {
            label: "Egg",
            value: pokemon.egg
        },
        {
            label: "Spawn Chance",
            value: pokemon.spawn_chance
        },
        {
            label: "Avg Spawns",
            value: pokemon.avg_spawns
        },
        {
            label: "Spawn Time",
            value: pokemon.spawn_time
        },
    ];

    return stats.map(stat => `
    <div class="text-center">
      <p class="text-xs text-gray-500">${stat.label}</p>
      <p class="text-[13px] font-semibold text-white py-[3px] px-[8px] rounded-[5px] ${getStatColor(stat.label)}">
        ${stat.value}
      </p>
    </div>
  `).join("");
}


elModalWrapper.addEventListener("click", function (e) {
    if (e.target === elModalWrapper) {
        elModalWrapper.classList.add("hidden");
    }
});


document.addEventListener("DOMContentLoaded", () => {
    renderPokemons(pokemons, elPokimonList);
});