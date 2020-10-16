fetch('http://localhost:3000/api/teddies', {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
}).then(function(response){
    return response.json();
}).then(function(data){
    console.log(data);

    for (let product of data){
        displayOneProduct(product);
    }

}).catch(err => {
    console.log("err", err);
});

//Fonction qui crée les bloc HTML
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
    p.innerText = "Prix : " +  product.price.toLocaleString('fr-FR') + "€";
    newElement.appendChild(p);
}
