async function getJson(url) {
    let result = {};
    await fetch(url)
        .then((response) => response.json())
        .then((data) => {
            result = data;
        });
    return result;
}

let data;

const container = document.getElementById("container");

const groups = {
    everyone: {
        name: "everyone",
        pfp: "assets/everyone.svg"
    },
    multiple: {
        name: "multiple people",
        pfp: "assets/group.svg"
    },
    government: {
        name: "the government",
        pfp: "assets/government.svg"
    },
}

async function init() {
    data = await getJson("data.json");

    console.log("uwu rawr sculk3d is a fluffy boy");

    for (card of data) {
        const element = makeCard(card);
        container.appendChild(element);
    }
}
init();

function makeStarter(starter) {
    let element = document.createElement("span");
    element.innerHTML = "started by ";
    element.id = "starter";

    const isGroup = starter.name.startsWith("@")
    if (isGroup) starter = groups[starter.name.slice(1)];

    let icon = document.createElement("span");
    icon.className = isGroup ? "icon" : "pfp";
    icon.style.backgroundImage = `url(${isGroup ? starter.pfp : "images/" + starter.pfp})`;

    let name = document.createElement("span");
    name.id = "name";
    name.innerText = starter.name;

    element.appendChild(icon);
    element.appendChild(name);

    return element;
}

function makeInfo(card) {
    let element = document.createElement("div");
    element.id = "info";

    let title = document.createElement("span");
    title.id = "title";
    title.innerText = card.name;

    let description = document.createElement("span");
    description.innerText = "Denies: ";

    let descriptionReason = document.createElement("span");
    descriptionReason.id = "reason";
    descriptionReason.innerText = card.accused_of;
    description.appendChild(descriptionReason);

    element.appendChild(title);
    element.appendChild(description);
    element.appendChild(makeStarter(card.started_by));

    return element;
}

function makeCard(card) {
    let element = document.createElement("div");
    element.className = "card";
    
    let pfp = document.createElement("img");
    pfp.id = "pfp";
    pfp.src = "images/" + card.pfp;
    pfp.draggable = false;

    element.appendChild(pfp);
    element.appendChild(makeInfo(card));

    return element;
}