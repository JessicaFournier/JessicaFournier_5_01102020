
fetchProducts('teddies');


//fonction qui va récupérer les infos des produits dans l'API

function fetchProducts(type){
    let request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        let products = [];
        
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            products = JSON.parse(this.responseText);
            console.log(products);
        }

        for (let product of products){
            displayOneProduct(product);
        }
    };
    request.open("GET", "http://localhost:3000/api/" + type);
    request.send();
}

// fonction qui crée les blocs des différents produits appelés

function displayOneProduct(product){
    let newElement = document.createElement('a');
    let element = document.getElementById('ours-section');

    newElement.classList.add("ours-details");
    newElement.classList.add("text-center");
    newElement.setAttribute("href", "produit.html?id=" + product._id);
    element.appendChild(newElement);

    let img = document.createElement('img');
    img.src = product.imageUrl;
    img.classList.add("ours-img");
    newElement.appendChild(img);

    let h2 = document.createElement("h2");
    h2.innerText = product.name;
    newElement.appendChild(h2);

    let p = document.createElement("p");
    p.innerText = "Prix : " +  product.price + "€";
    newElement.appendChild(p);
}

function onChangeCategories(categorie){
    fetchProducts(categorie);
}