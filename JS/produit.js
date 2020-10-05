//récupération de l'id de la page

const queryString = window.location.search;
console.log(queryString);

const urlParams = new URLSearchParams(queryString);

const id = urlParams.get('id');
console.log(id);

//requête des infos sur les ours et création de la page

var request = new XMLHttpRequest();
request.onreadystatechange = function(){
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var responses = JSON.parse(this.responseText);
        console.log(responses);
    }

    let newElement = document.createElement('div');
    let element = document.getElementById('ours-section');

    newElement.classList.add('ours-detail');
    newElement.classList.add('text-center');
    element.appendChild(newElement);

    //création du titre

    let title = document.createElement('h1');
    title.innerText = responses.name;
    newElement.appendChild(title);

    //création de l'image

    let img = document.createElement('img');
    img.src = responses.imageUrl;
    img.classList.add('ours-img');
    newElement.appendChild(img);

    //création de la description

    let legend = document.createElement('p');
    legend.innerText = responses.description;
    newElement.appendChild(legend);

    //création du choix de la couleur

    let color = document.createElement('select');
    color.id = "color-select";

    let optionColor = document.createElement('option');
    optionColor.innerText = 'Choisir une option';
    newElement.appendChild(optionColor);

    for (let i=0; i < responses.colors.length; i++) {
        let option = document.createElement('option');
        option.setAttribute('value', responses.colors[i]);
        option.innerText = responses.colors[i];
        color.appendChild(option);
    }

    newElement.append(color);


    

    //création du prix

    let price = document.createElement('p');
    price.innerText = 'Prix : ' +  responses.price + '€';
    newElement.appendChild(price);

    //création du bouton panier
    let button = document.createElement('button');
    button.innerText = 'Ajouter au panier';
    button.classList.add('ours-button');
    newElement.appendChild(button);

    //ajout de l'événement choix de la couleur

    let colorChoice;
    document.getElementById('color-select').addEventListener('change', function() {
       colorChoice = this.value;
       console.log(colorChoice);
    }, false);

    // ajout de l'événement sur le bouton
    button.addEventListener('click', event => {
        let contenuPanier = {
            id : responses._id,
            name : responses.name,
            price : responses.price,
            color : colorChoice,
            img : responses.imageUrl
        };
        console.log(contenuPanier);
        localStorage.setItem('panier', JSON.stringify(contenuPanier));
    });
};
request.open("GET", "http://localhost:3000/api/teddies/" + id);
request.send();

