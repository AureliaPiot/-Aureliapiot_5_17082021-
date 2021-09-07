let section = document.getElementById("section");

let orderId = localStorage.getItem("orderId");

console.table(localStorage);
let contact = JSON.parse(localStorage.getItem("contact"));
console.log(contact);

let firstName = contact.firstName;
let lastName = contact.lastName;
let address = contact.address;
let city = contact.city;



let card = document.createElement("div");
card.classList.add('confirmation','col-6');
card.innerHTML=`
        <h2>votre commande est bien enregistrée !</h2>
        <p>Bonjour ${firstName} ${lastName},<br> votre commande <strong>${orderId}</strong>, de {prix}, vous sera bientot envoyer à l'adresse ${address} à ${city}.</p>

`;

section.appendChild(card);

// faire une verification que l'orderId existe bien dans le localStorage pour etre sûr