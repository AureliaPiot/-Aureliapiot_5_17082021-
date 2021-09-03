let Url = new URLSearchParams(document.location.search.substring(1));
let id = Url.get("id"); 
let product= Url.get("p")
// console.log(id);
let section = document.getElementById('section-product');
// --------------------------------------------

getProduct(product,id);





// --------------------------------------------

function getProduct(param1,param2){
    fetch('http://localhost:3000/api/'+ param1 +'/'+ param2) 
    .then(function(res){
        if(res.ok){
            // console.log(res);
            return res.json();
        }       
    })
    .then(function(value){
        let url = value.imageUrl.slice(22);
        let price = value.price / 100;
        let productTemplate = document.createElement('div');
        productTemplate.classList.add("pdct-card","d-flex");
        // console.log(value);
        
        let optionName = ``;
        let valueOption = "";
        switch (product){
            case 'cameras': optionName = "L'objectif";
                            valueOption = "lenses";
              break;
            case 'teddies':optionName ="La couleur";
                           valueOption = "colors";
              break;
            case 'furniture':optionName = "Le verni";
                            valueOption = "varnish";
              break;
            default: console.log('aucun produit trouvé');                      
                
        }
        let options = ``;
        // console.log(value[valueOption]);

      for( let i= 0; i< value[valueOption].length; i++ ){
          if(i==0){
            options +=`
            <input type="radio" id="option${i}" name="option" value="${value[valueOption][i]}" checked >
            <label for="option${i}">${value[valueOption][i]}</label>
            `;
            // console.log(i);

          }else{
            options +=`
            <input type="radio" id="option${i}" name="option" value="${value[valueOption][i]}">
            <label for="option${i}">${value[valueOption][i]}</label>
            `;
        // console.log(i);
          }
      }

        productTemplate.innerHTML=`
  
            <img  class="pdct-photo" src="${url}" alt="${value.name}">
            <div class="pdct-info  d-flex flex-wrap">
                <h3 class="pdct-name">${value.name}</h3>
                <div class="separator"></div>
                <p class="pdct-description">${value.description}</p>
                
                <div class="pdct-choice-group align-self-end">
                    <p>Selectionnez ${optionName}:</p>
                    ${options}
                </div>

            </div>
            <div class="pdct-command text-center d-flex flex-column justify-content-evenly">
                <h4 class="pdct-price">${price}<strong>€</strong><span>00</span></h4 >

                <div class="command-number d-flex flex-column">
                    <label for="quantites">Number:</label>
                        <input id="quantites" class="input-number" type="number"  name="quantites" value="1" min="1" max="100" >
                </div>

                <div id="pdct-newPrice" class="pdct-newPrice">${price}.00€</div>
                <button id="btn-Cart" class="btn btn-primary" type="button"><i class="fas fa-cart-plus"></i></button>
            </div>              
        
        `;
        
        section.appendChild(productTemplate);    
// ------------------------------------------------------------------
        
        // recuperer les données des inputs
        // verifier les donnée avant l'envois | au click sur le bouton

        let quantites = document.getElementById('quantites');
        const btnCart = document.getElementById('btn-Cart');


        quantites.addEventListener('change', (event) => { // au changement de la quantité, on recupe la valeur de l'input pout la * par le prix du produit
                const number = event.target.value;
                let newPrice = price * number;
                // console.log(number);
                let blockNewPrice = document.getElementById('pdct-newPrice');
                blockNewPrice.textContent= newPrice+".00€";
                // console.log(newPrice);
            });//fin event
 
    console.log( "localLength= " + localStorage.length)

        btnCart.addEventListener('click', (event) => {//au click on verifi la valeur avec une fonction 

            verifQuantite(quantites.value);
            console.log(verifQuantite(quantites.value));// retourne un boolean


            if( verifQuantite(quantites.value) == false){//si la valeur de quantite est fausse alors on affiche juste un message
            alert('valeur invalide');
            // faire un affichage
            return
            }
            else{    //sinon on compar tout les index
                
            
                let chosenOptionIndex;
                for( let i= 0; i< value[valueOption].length; i++ ){
                    if(document.getElementById(`option${i}`).checked){
                        chosenOptionIndex = i ; //ici on recupere l'option qui a ete checked apres les avoirs toutes verifier
                        // console.log('option trouver! = ' + document.getElementById(`option${i}`).value);
                    }
                }

                if(localStorage.length === 0){//si il n'y a pas d'element dans le localStorage, on l'initialise
                    let lenght=localStorage.length;
                    console.log('on commence a : '+ length);
                    console.log('produit de type = ' + product);

                    localStorage.setItem(lenght,product+"&"+id+"&"+chosenOptionIndex+"&"+quantites.value);
                }else{

                    for(let i =0   ; i < localStorage.length ; i++ ){// la on execute une boucle le nombre de fois le nombre d'element dedans, par ex: 3)
                        // let key = localStorage.key(i);

                        for(let j = 0 ; j <= localStorage.length ; j++ ){// execute la boucle une seconde fois pour comparer si tout les chiffres se suivent bien
                            let itemIndex = localStorage.getItem(j);
                            // console.log(" clef verifier = "+ j);//verification de clef
                            if(itemIndex == null){//si parmis les chiffres un est sauté, on le recupere pour l'attribué comme clé,sinon il recupere le prochain chiffre (qu'il voit comme manquant) car il ya le "="
                                // console.log('produit de type = ' + product);
                                console.log(" produit n° "+ j+" ajouté");
                                let indexManquant = j;
                                localStorage.setItem(indexManquant,product+"&"+id+"&"+chosenOptionIndex+"&"+quantites.value);
                                return indexManquant;
                            }


                        };//fin boucle 2        
   
   

                    }; //fin boucle 1  
                };//fin else 
            
            }//fin else de verification

            
        });//fin de l'event click

    })//2dn then
    
    .catch(function(err){
        console.log('erreur de fetch');

    })
};// fin fonction getProduct

function verifQuantite(target){
    if(target <= 0 || target > 100 ){
        // alert('erreur de quantité')

        return false;
    }else{
        return true;
    }
};
