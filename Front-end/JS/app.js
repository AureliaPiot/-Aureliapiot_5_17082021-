
let product= 'cameras';
// teddies
// furniture

//faire une fonction qui verifie l'url

let section = document.getElementById('section-product');

function getProduct(productToCall){

    fetch('http://localhost:3000/api/' + productToCall) 
    //promet de nous renvoyer une reponse
        .then(function(res){
    // quand la reponse arrive "then()", on va faire quelque chose (function) avec cette reponse (res)        
            if(res.ok){
            //si le "ok" de reponse est "true", alors:    
                 //console.log(res); // ici on peut voir ce que la reponse contient
                return res.json();// tu me retourne la reponse au format json.
            }
        })
        .then(function(values){ // puis avec la reponse du precedent then() (donc la reponse au format json), on recupere les valeurs avec "value".
            // console.log(values); //retourne le tableau d'objet
    
            for( let value of values){
        
               // console.log("VALUE id = " + value._id +"  and name =" + value.name + " AND price " + value.price + " AND Decription " + value.description);

                // console.log("VALUE  = " + value.lenses);

                for(object of value.lenses){
                    console.log(object);

                    let objectProduct = object;

                    let productOption = document.createElement("div");
                    productOption.classList.add('product-Option');
                    productOption.innerHTML =`
                    <p>${objectProduct}</p>
                    `;

                    section.appendChild(productOption);


                }

                let url = value.imageUrl.slice(22);
                let price = value.price / 100;
                price = price.toFixed(2);

                
                
                
                let cards = document.createElement("div");
                cards.classList.add("card");
                cards.innerHTML = `
                
                
                <img class="card-img-top" src="${url}" alt="${value.name}">
                <div class="card-body">
                  <h5 class="card-title">${value.name}</h5>
                  <p class="card-text">${value.description}</p>
                  <div class="row text-center align-content-center flex-wrap">
                    <p class="card-price col">${price} <strong>€</strong></p>
                  </div>
                <p>${object} </p>  
                </div>

                `;
                // <a href="#" class="col btn btn-primary"><i class="fas fa-shopping-cart"></i></a>
                
                section.appendChild(cards);
                



            }
    
        })
        .catch(function(err){
            console.log("erreur quelque part");
        });
}

getProduct(product);







newElement.innerHTML = "<p>YES</p>"



// voir pour afficher quelque chose :/



