//Récupération des données du localStorage
let panier = JSON.parse(localStorage.getItem('panier'));
console.log(panier);

//création du contenu de la page

for (let i=0; i<panier.length; i++){
    let newElementTeddy = document.createElement('div');
    let elementTeddy = document.getElementById('panier-produit');

    newElementTeddy.classList.add('panier-detail');
    newElementTeddy.classList.add('text-center');
    elementTeddy.appendChild(newElementTeddy);


    //création du contenu du produit panier
    let teddyName = document.createElement('p');
    console.log(panier[i].name);
    teddyName.innerText = panier[i].name;
    newElementTeddy.appendChild(teddyName);

    let teddyImg = document.createElement('img');
    teddyImg.src = panier[i].img;
    teddyImg.classList.add('teddy-img');
    newElementTeddy.appendChild(teddyImg);

    // création du contenu option du panier
    let newElementOption = document.createElement('div');
    let elementOption = document.getElementById('panier-option');
    elementOption.appendChild(newElementOption);

    newElementOption.classList.add('panier-color');

    let teddyColor = document.createElement('p');
    teddyColor.innerText = panier[i].color;
    newElementOption.appendChild(teddyColor);
    console.log(panier[i].color);

    //création du prix du panier

    let newElementPrice = document.createElement('div');
    let elementPrice = document.getElementById('panier-prix');
    elementPrice.appendChild(newElementPrice);

    newElementPrice.classList.add('panier-price');

    let price = document.createElement('p');
    price.innerText = panier[i].price.toLocaleString('fr-FR') + ' €';
    newElementPrice.appendChild(price);


    //création du bouton supprimer
    let newElementButton = document.createElement('div');
    let elementButton = document.getElementById('panier-bouton');
    elementButton.appendChild(newElementButton);

    newElementButton.classList.add('panier-button');

    let button = document.createElement('input');
    button.id = 'bouton-supprimer';
    button.type = 'button';
    button.value = 'Supprimer'
    newElementButton.appendChild(button);

    button.addEventListener('click',deleteLigne);

    function deleteLigne() {
        newElementPrice.remove();
        newElementOption.remove();
        newElementTeddy.remove();
        newElementButton.remove();

    }
}

//affichage du prix total
totalPrice (panier);


//Validation du formulaire
let listeId = ['nom', 'prenom', 'email','adresse', 'ville'];
let formValid = document.getElementById('bouton-commander');
    
formValid.addEventListener('click', validation);

function validation(event){
    event.preventDefault();
    let allValid = true;
    for (i=0; i < listeId.length; i++) {
    
        let verif = document.getElementById(listeId[i]);
        let missVerif = document.getElementById('miss' + capitalizeFirstLetter(listeId[i]));
        let nameValid = /^[a-zA-Zéèîï][a-zéèêàçîï]+([-'\s][a-zA-Zéèîï][a-zéèêàçîï]+)?$/;
        let adressValid = /^([0-9]+)+[\s][a-zA-Zéèîï][a-zéèêàçîï]+([-'\s][a-zA-Zéèîï][a-zéèêàçîï]+)?$/;
        let mailValid = /^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
        

        //si le champs est vide
        if(verif.validity.valueMissing){
            event.preventDefault();
            missVerif.textContent = 'Champ manquant';
            missVerif.style.color = 'red';
            allValid = false;
        // si le format de données n'est pas correct    
        } else if ((listeId[i] == 'nom' || listeId[i] == 'prenom' || listeId[i] == 'ville') && nameValid.test(verif.value) == false){
            event.preventDefault();
            missVerif.textContent = 'Format incorrect';
            missVerif.style.color = 'red';
            allValid = false;
        } else if (listeId[i] == 'adresse' && adressValid.test(verif.value) == false){
            event.preventDefault();
            missVerif.textContent = 'Format incorrect';
            missVerif.style.color = 'red';
            allValid = false;
        } else if (listeId[i] == 'email' && mailValid.test(verif.value) == false){
            event.preventDefault();
            missVerif.textContent = 'Format incorrect';
            missVerif.style.color = 'red';
            allValid = false;
        };

        
    }

    if (allValid == true) {
            
        let contactForm = {
            lastName : document.getElementById(listeId[0]).value,
            firstName : document.getElementById(listeId[1]).value,
            email : document.getElementById(listeId[2]).value,
            address : document.getElementById(listeId[3]).value,
            city : document.getElementById(listeId[4]).value, 
        }

        console.log(contactForm);

        let produitPost = [];
        for (let i=0;i<panier.length; i++){
            produitPost.push(panier[i].id)
        }

        console.log(produitPost);

        let objetPost = {
            contact : contactForm,
            products : produitPost
        }

        console.log(objetPost);

        fetch('http://localhost:3000/api/teddies/order', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objetPost)
        }).then(function(response){
            return response.json();
        }).then(function(data){
            console.log(data);
            localStorage.setItem("order", JSON.stringify(data));
        })

        window.location.href = './confirmation.html';
    }
}

///////////////////////////////////////////////////////Fonctions utilisées/////////////////////////////////////////////////

//fonction qui met la première lettre en majuscule

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// fonction qui calcule le prix total et l'insère dans la page
function totalPrice(panier){
    
    let totalPrice = 0;
    for (let i=0; i<panier.length; i++) {
        totalPrice = totalPrice + panier[i].price;
        console.log(totalPrice.toLocaleString('fr-FR'));
    }

    let newElementTotalPrice = document.createElement('div');
    let elementTotalPrice = document.getElementById('contenu-panier');

    newElementTotalPrice.classList.add('panier-totalPrice');
    newElementTotalPrice.classList.add('text-center');
    elementTotalPrice.appendChild(newElementTotalPrice);

    newElementTotalPrice.innerText = 'Le montant total de la commande est : ' + totalPrice.toLocaleString('fr-FR') + '€.';

    localStorage.setItem("totalPriceConfirmation", totalPrice);
}


