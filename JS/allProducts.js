let Url = new URLSearchParams(document.location.search.substring(1));
let product = Url.get("product"); 
  
let section = document.getElementById('section-product');
if(product == null){
    product= 'cameras';
    getProducts(product);
    // console.log(product);
}
else{
    getProducts(product);
}

function getProducts(productToCall){

    fetch('http://localhost:3000/api/' + productToCall) 
    //promet de nous renvoyer une reponse
        .then(function(res){
    // quand la reponse arrive "then()", on va faire quelque chose (function) avec cette reponse (res)        
            if(res.ok){
            //si le "ok" de reponse est "true", alors:    
                //  console.log(res); // ici on peut voir ce que la reponse contient
                return res.json();// tu me retourne la reponse au format json.
            }
            
        })
        .then(function (values){ // puis avec la reponse du precedent then() (donc la reponse au format json), on recupere les valeurs avec "value".
            // console.log(values); //retourne le tableau d'objet
    
            for( let value of values){
            //    console.log("VALUE id = " + value._id +"  and name =" + value.name + " AND price " + value.price + " AND Decription " + value.description);
                let url = value.imageUrl.slice(22);

                let price = value.price / 100;
                price = price.toFixed(2);               
                
                let cards = document.createElement("div");
                cards.classList.add("card");


                let optionName = ``;
                let valueOption = "";
                switch (product){
                    case 'cameras': optionName = "objectifs";
                                    valueOption = "lenses";
                      break;
                    case 'teddies':optionName ="couleurs";
                                   valueOption = "colors";
                      break;
                    case 'furniture':optionName = "vernis";
                                    valueOption = "varnish";
                      break;
                    default: console.log('aucun produit trouvé');                      
                        
                }

                let productOption = ``;
      
                for(let object of value[valueOption]){
                    productOption +=`<p>${object}</p>`;
                }
                
                cards.innerHTML = `
                    <a href="produit.html?p=${product}&id=${value._id}">
                        <img class="card-img-top" src="${url}" alt="${value.name}">
                        <div class="card-body">
                            <h4 class="card-title">${value.name}</h4>
                            <p class="card-text">${value.description}</p>
                            <div class="text-center">
                                <p class="card-price col"> ${price} <strong>€</strong></p>
                            </div>   
                            <hr>
                            <p> ${optionName} disponible : </p> 
                            <div class="productOption d-flex justify-content-evenly">
                            ${productOption} 
                             </div>   
                        </div>
                    </a>
                `;               

                section.appendChild(cards);

            }

        })
        .catch(function(err){
            let content = document.createElement('div');
            content.classList.add('contentError')
            content.innerHTML='serveur indisponible';
            section.appendChild(content);          
            // console.log(err.message); 
        });
}




