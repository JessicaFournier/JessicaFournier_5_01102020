//récupération des infos du localStorage

let totalPrice = localStorage.getItem("totalPriceConfirmation");

let order = JSON.parse(localStorage.getItem("order"));

//création du contenu de la page

let newElement = document.createElement('p');
let element = document.getElementById('confirmation-section');

newElement.classList.add('confirmation-detail');
newElement.classList.add('text-center');
newElement.innerText = 'Nous vous remercions de votre commande n° ' + order.orderId + '. Le montant de votre commande s\'élève à ' + totalPrice.toLocaleString('fr-FR') + ' €.';
element.appendChild(newElement);

let button = document.createElement('a');
button.innerText = 'Revenir à la page d\'accueil';
button.classList.add('home-button');
button.setAttribute('href', 'index.html');
newElement.appendChild(button);

button.addEventListener('click', clearLocalStorage)

function clearLocalStorage() {
    localStorage.clear();
}