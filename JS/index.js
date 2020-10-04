
var request = new XMLHttpRequest();
request.onreadystatechange = function(){
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var responses = JSON.parse(this.responseText);
        console.log(responses);
    }
    for (let response of responses){
        let newElement = document.createElement('a');
        let element = document.getElementById('ours-section');

        newElement.classList.add("ours-details");
        newElement.classList.add("text-center");
        newElement.setAttribute("href", "produit.html?id=" + response._id);
        element.appendChild(newElement);

        let img = document.createElement('img');
        img.src = response.imageUrl;
        img.classList.add("ours-img");
        newElement.appendChild(img);

        let h2 = document.createElement("h2");
        h2.innerText = response.name;
        newElement.appendChild(h2);

        let p = document.createElement("p");
        p.innerText = "Prix : " +  response.price + "€";
        newElement.appendChild(p);
    }
};
request.open("GET", "http://localhost:3000/api/teddies/");
request.send();

