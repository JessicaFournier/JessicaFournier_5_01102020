//création du contenu de la page

let newElement = document.createElement('p');
let element = document.getElementById('confirmation-section');

newElement.classList.add('confirmation-detail');
newElement.classList.add('text-center');
newElement.innerText = 'Nous vous remercions de votre commande n°' +  + '. Le montant de votre commande s\'élève à ' + + '.';
element.appendChild(newElement);

