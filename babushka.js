const url = "https://babushka-dd8a.restdb.io/rest/menu";

const options = {
  headers: {
    "x-apikey": "600ec2fb1346a1524ff12de4",
  },
};

// const, variabel og clicklytter

const main = document.querySelector("#holder");
const template = document.querySelector("template").content;
const header = document.querySelector("h4");

let filter = "alle";

const filterKnapper = document.querySelectorAll("nav button");
filterKnapper.forEach((knap) =>
  knap.addEventListener("click", filtrerOversigt)
);

// filter funktion

function filtrerOversigt() {
  filter = this.dataset.kategori;
  hentBabushkaData();

  header.textContent = this.textContent;
}

// hent babushka data

async function hentBabushkaData() {
  const resspons = await fetch(url, options);
  const json = await resspons.json();

  vis(json);
}

// vis babushka data

function vis(json) {
  console.log(json);
  main.textContent = "";
  json.forEach((json) => {
    if (filter == json.kategori || filter == "alle") {
      const klon = template.cloneNode(true);
      klon.querySelector("img").src = "billeder/" + json.billednavn + "-md.jpg";
      klon.querySelector(".navn").textContent = json.navn;
      klon.querySelector(".beskrivelse").textContent = json.kortbeskrivelse;
      klon.querySelector(".pris").textContent = "" + json.pris + ",-";
      klon
        .querySelector("article")
        .addEventListener("click", () => visMere(json));
      main.appendChild(klon);
    }
  });
}

// popup info

function visMere(json) {
  popup.style.display = "block";
  popup.querySelector("img").src = "billeder/" + json.billednavn + "-md.jpg";
  popup.querySelector(".navn").textContent = json.navn;
  popup.querySelector(".pris").textContent = json.pris + ",-";
  popup.querySelector(".langbeskrivelse").textContent = json.langbeskrivelse;
  popup.querySelector(".oprindelsesregion").textContent =
    json.oprindelsesregion;
}
// luk popup
document
  .querySelector("#luk")
  .addEventListener("click", () => (popup.style.display = "none"));

hentBabushkaData();
