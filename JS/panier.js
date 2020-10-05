//Récupération des données du localStorage
let panier = JSON.parse(localStorage.getItem('panier'));
console.log(panier);

//création du contenu de la page

let newElement = document.createElement('div');
let element = document.getElementById('panier-section');

newElement.classList.add('panier-detail');
newElement.classList.add('text-center');
element.appendChild(newElement);


//création du contenu du panier
let teddyName = document.createElement('p');
teddyName.innerText = panier.name;
newElement.appendChild(teddyName);

let teddyImg = document.createElement('img');
teddyImg.src = panier.img;
teddyImg.classList.add('teddy-img');
newElement.appendChild(teddyImg);

let teddyColor = document.createElement('p')
teddyColor.innerText = 'Option choisie : ' + panier.color;
newElement.appendChild(teddyColor);

//création du prix

let price = document.createElement('p');
price.innerText = 'Prix total : ' + panier.price + '€';
newElement.appendChild(price);

