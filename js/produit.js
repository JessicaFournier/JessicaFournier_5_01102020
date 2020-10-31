//récupération de l'id de la page

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const id = urlParams.get('id');

// récupération des données et affichage

fetch('http://localhost:3000/api/teddies/' + id, {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
}).then(function(response) {
    return response.json();
}).then(function(data) {
    
    let newElement = document.createElement('div');
    let element = document.getElementById('ours-section');

    newElement.classList.add('ours-detail');
    newElement.classList.add('text-center');
    element.appendChild(newElement);

    teddyRecap(data, newElement);

    //création du choix de la couleur

    colorSelect(data.colors, newElement);

    //création du bouton panier

    let button = document.createElement('button');
    button.innerText = 'Ajouter au panier';
    button.classList.add('ours-button');
    newElement.appendChild(button);

    //ajout de l'événement choix de la couleur

    let colorChoice = data.colors[0];
    document.getElementById('color-select').addEventListener('change', function() {
       colorChoice = this.value;
    }, false);

    // ajout de l'événement sur le bouton

    button.addEventListener('click', function(event) {

        if (localStorage.getItem('panier') == null) {
            localStorage.setItem('panier', JSON.stringify([]));
        }

        let contenuProduit = {
            id : data._id,
            name : data.name,
            price : data.price,
            color : colorChoice,
            img : data.imageUrl
        };

        //ajout au panier
        let panier  = localStorage.getItem('panier');
        panier = JSON.parse(panier);

        panier.push(contenuProduit)
        
        localStorage.setItem('panier', JSON.stringify(panier));
    });

}).catch(err => {
    console.log('err', err);
    alert("Serveur non disponible");
});

//////////////////////////////////////////////////////////////Fonctions utilisées//////////////////////////////////////////////////////////////////

// fontion qui crée le produit (titre, description, image, prix)

function teddyRecap (responses, newElement) {

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

    //création du prix

    let price = document.createElement('p');
    price.innerText = 'Prix : ' +  responses.price.toLocaleString('fr-FR') + '€';
    newElement.appendChild(price);
}

//fonction qui crée le sélecteur de couleur

function colorSelect (colors, newElement) {
    let color = document.createElement('select');
    color.id = 'color-select';

    let optionColor = document.createElement('option');
    optionColor.innerText = 'Choisir une option';
    newElement.appendChild(optionColor);

    for (let i=0; i < colors.length; i++) {
        let option = document.createElement('option');
        option.setAttribute('value', colors[i]);
        option.innerText = colors[i];
        color.appendChild(option);
    }

    newElement.append(color);
}