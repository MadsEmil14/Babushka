const url = "https://babushka-dd8a.restdb.io/rest/menu";

const options = {
  headers: {
    "x-apikey": "600ec2fb1346a1524ff12de4",
  },
};

const main = document.querySelector("#holder");
const template = document.querySelector("template").content;

async function hentBabushkaData() {
  const resspons = await fetch(url, options);
  const json = await resspons.json();

  vis(json);
}

function vis(json) {
  console.log(json);
  json.forEach((json) => {
    const klon = template.cloneNode(true);
    klon.querySelector("img").src = "billeder/" + json.billednavn + "-md.jpg";
    klon.querySelector(".navn").textContent = json.navn;
    klon.querySelector(".beskrivelse").textContent = json.kortbeskrivelse;
    klon.querySelector(".pris").textContent = json.pris;
    main.appendChild(klon);
  });
}

hentBabushkaData();
