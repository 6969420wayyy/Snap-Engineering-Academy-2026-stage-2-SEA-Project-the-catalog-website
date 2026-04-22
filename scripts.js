const snapCatalog = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    price: 64850.20,
    category: "Layer 1",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
    description: "Bitcoin is the original cryptocurrency and digital gold."
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    price: 3150.45,
    category: "Layer 1",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
    description: "A programmable blockchain that powers smart contracts."
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    price: 145.10,
    category: "Layer 1",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png",
    description: "Known for high speed and low transaction costs."
  },
  {
    id: "dogecoin",
    name: "Dogecoin",
    symbol: "DOGE",
    price: 0.15,
    category: "Meme",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/74.png",
    description: "The internet's favorite dog-themed community coin."
  },
  {
    id: "pepe",
    name: "Pepe",
    symbol: "PEPE",
    price: 0.000008,
    category: "Meme",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/24478.png",
    description: "A popular meme coin based on the Pepe the Frog character."
  },
  {
    id: "uniswap",
    name: "Uniswap",
    symbol: "UNI",
    price: 7.50,
    category: "DeFi",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/7083.png",
    description: "A leading decentralized exchange protocol."
  },
  {
    id: "chainlink",
    name: "Chainlink",
    symbol: "LINK",
    price: 13.80,
    category: "DeFi",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/1975.png",
    description: "Connects smart contracts with real-world data."
  },
  {
    id: "tether",
    name: "Tether",
    symbol: "USDT",
    price: 1.00,
    category: "Stablecoin",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png",
    description: "A stablecoin pegged to the value of the US Dollar."
  },
  {
    id: "shiba-inu",
    name: "Shiba Inu",
    symbol: "SHIB",
    price: 0.00002,
    category: "Meme",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/5994.png",
    description: "A community-driven meme coin ecosystem."
  },
  {
    id: "avalanche",
    name: "Avalanche",
    symbol: "AVAX",
    price: 35.20,
    category: "Layer 1",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/5805.png",
    description: "An open, programmable smart contracts platform for apps."
  },
  {
    id: "cardano",
    name: "Cardano",
    symbol: "ADA",
    price: 0.45,
    category: "Layer 1",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png",
    description: "A blockchain platform for changemakers and innovators."
  },
  {
    id: "polkadot",
    name: "Polkadot",
    symbol: "DOT",
    price: 6.90,
    category: "Layer 1",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/6636.png",
    description: "Connects and secures a network of specialized blockchains."
  },
  {
    id: "aave",
    name: "Aave",
    symbol: "AAVE",
    price: 85.00,
    category: "DeFi",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/7278.png",
    description: "A decentralized non-custodial liquidity protocol."
  },
  {
    id: "usdc",
    name: "USDC",
    symbol: "USDC",
    price: 1.00,
    category: "Stablecoin",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png",
    description: "A fully collateralized US dollar stablecoin."
  },
  {
    id: "render",
    name: "Render",
    symbol: "RNDR",
    price: 8.20,
    category: "AI",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/5690.png",
    description: "Distributed GPU rendering on the blockchain."
  }
];

var currentCategory = "All";
var currentSort = "default";
var currentSearch = "";

function showCards() {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  const templateCard = document.querySelector(".card");
  const emptyState = document.getElementById("emptyState");
  const countLabel = document.getElementById("resultsCount");

  var result = snapCatalog.slice();

  if (currentCategory !== "All") {
    var filtered = [];
    for (var i = 0; i < result.length; i++) {
      if (result[i].category === currentCategory) {
        filtered.push(result[i]);
      }
    }
    result = filtered;
  }

  if (currentSearch !== "") {
    var query = currentSearch.toLowerCase();
    var searched = [];
    for (var i = 0; i < result.length; i++) {
      var nameMatches = result[i].name.toLowerCase().indexOf(query) !== -1;
      var symbolMatches = result[i].symbol.toLowerCase().indexOf(query) !== -1;
      if (nameMatches || symbolMatches) {
        searched.push(result[i]);
      }
    }
    result = searched;
  }

  if (currentSort === "price-high") {
    result.sort(function(a, b) { return b.price - a.price; });
  } else if (currentSort === "price-low") {
    result.sort(function(a, b) { return a.price - b.price; });
  } else if (currentSort === "name-az") {
    result.sort(function(a, b) { return a.name.localeCompare(b.name); });
  }

  if (result.length === 0) {
    emptyState.style.display = "block";
    countLabel.textContent = "0 coins found";
    return;
  }

  emptyState.style.display = "none";
  countLabel.textContent = "Showing " + result.length + " coins";

  for (let i = 0; i < result.length; i++) {
    let coin = result[i];
    const nextCard = templateCard.cloneNode(true);
    editCardContent(nextCard, coin);
    cardContainer.appendChild(nextCard);
  }
}

function editCardContent(card, coin) {
  card.style.display = "block";

  card.querySelector("h2").textContent = coin.name;
  card.querySelector(".card-symbol").textContent = coin.symbol;
  card.querySelector(".card-category").textContent = coin.category;
  card.querySelector(".card-description").textContent = coin.description;
  card.querySelector(".card-price").innerHTML = '<span class="dollar">$</span>' + coin.price.toFixed(2);

  const cardImage = card.querySelector(".card-img");
  cardImage.src = coin.image;
  cardImage.alt = coin.name + " logo";

  console.log("new card:", coin.name, "- html:", card);
}

document.addEventListener("DOMContentLoaded", showCards);

function filterByCategory(category) {
  currentCategory = category;

  var buttons = document.querySelectorAll(".filter-buttons button");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("active");
  }
  for (var i = 0; i < buttons.length; i++) {
    if (buttons[i].innerText === category) {
      buttons[i].classList.add("active");
    }
  }

  showCards();
}

function handleSearch() {
  currentSearch = document.getElementById("searchInput").value;
  showCards();
}

function handleSort() {
  currentSort = document.getElementById("sortSelect").value;
  showCards();
}

function quoteAlert() {
  console.log("Button Clicked!");
  alert("I guess I can kiss heaven goodbye, because it got to be a sin to look this good!");
}

function removeLastCard() {
  snapCatalog.pop();
  showCards();
}
