let section = document.getElementById("section");

let card = document.createElement("div");
card.classList.add('confirmation','col-6');

if(localStorage.key(0)== "contact" || localStorage.key(0) == "orderId" ){
        console.table(localStorage);
        
        let orderId = localStorage.getItem("orderId");
        
        let contact = JSON.parse(localStorage.getItem("contact"));
        console.log(contact);
        
        let firstName = contact.firstName;
        let lastName = contact.lastName;
        let address = contact.address;
        let city = contact.city;
        let price = contact.price;
        
        
        card.innerHTML=`
        <h2>votre commande est bien enregistrée !</h2>
        <p>Bonjour ${firstName} ${lastName},<br> votre commande <strong>${orderId}</strong> de <strong>${price}€</strong>, vous sera bientot envoyer à l'adresse: ${address} à ${city}.</p>
        
        `;
                
        //le localStorage est clear apres 5sec
        // setTimeout(()=>{localStorage.clear();}, 5000);
}
else{
        card.innerHTML=`
        <h2>Aucune commande enregistrée !</h2>
        <p>aucune commande en cour n'est enregistrée, merci de bien valider le formulaire disponible dans votre panier!</p>
        
        `;
}
        section.appendChild(card);
        