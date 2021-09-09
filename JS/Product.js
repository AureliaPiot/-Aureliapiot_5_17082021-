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

      for( let i= 0; i< value[valueOption].length; i++ ){//ici on check la premiere option
          if(i==0){
             options +=`
            <option  id="option${i}" name="option" value="${value[valueOption][i]}" selected >${value[valueOption][i]}</option>
            `;
            // options +=`
            // <input type="radio" id="option${i}" name="option" value="${value[valueOption][i]}" checked >
            // <label for="option${i}">${value[valueOption][i]}</label>
            // `;
            // console.log(i);

          }else{
              options +=` 
            <option  id="option${i}" name="option" value="${value[valueOption][i]}">${value[valueOption][i]}</option>
            `;
            // options +=`
            // <input type="radio" id="option${i}" name="option" value="${value[valueOption][i]}">
            // <label for="option${i}">${value[valueOption][i]}</label>
            // `;
        // console.log(i);
          }
      }

        productTemplate.innerHTML=`
  
            <img  class="pdct-photo" src="${url}" alt="${value.name}">
            <div class="pdct-info  d-flex flex-wrap">
                <h3 class="pdct-name">${value.name}</h3>
                <div class="separator"></div>
                <p class="pdct-description">${value.description}</p>
                
                <div class="pdct-choice-group align-self-end d-flex">
                    <label class="input-group-text" for="inputGroupOption">Selectionnez ${optionName} :</label>
                    <select class="form-select" id="inputGroupOption">
                        ${options}
                    </select>
                </div>

            </div>
            <div class="pdct-command text-center d-flex justify-content-evenly">
                <h4 class="pdct-price">${price}<strong>€</strong><span>00</span></h4 >

                <div class="command-number d-flex flex-column">
                    <label for="quantites">quantité:</label>
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


            if( verifQuantite(quantites.value) == false ){//si la valeur de quantite est fausse et qu'il y a une virgule  alors on affiche juste un message 
            // alert('valeur invalide');
            let message ="valeur incorrect";
            visualerror(message)
            // faire un affichage
            return
            }
            else{    //sinon on compar tout les index
                
            
                let chosenOptionIndex;
                for( let i= 0; i< value[valueOption].length; i++ ){
                    if(document.getElementById(`option${i}`).selected){
                        chosenOptionIndex = i ; //ici on recupere l'option qui a ete checked apres les avoirs toutes verifier
                        console.log('option trouver! = ' + document.getElementById(`option${i}`).value);
                    }
                }

                if(localStorage.length === 0 || localStorage.key(1) == "orderId"){//si il n'y a pas d'element dans le localStorage,ou si il contient les donnée de commande, on le reinitialise
                    localStorage.clear();
                    let lenght=localStorage.length;
                    console.log('on commence a : '+ length);
                    console.log('produit de type = ' + product);

                    let item ={
                        'produit':product,
                        'id':id,
                        'optionId':chosenOptionIndex,
                        'quantites':quantites.value,
                        'unitPrice':price
                    }
                    

                    localStorage.setItem(lenght,JSON.stringify(item));
                    let message ="Ajout de "+quantites.value+" "+value.name+" ,Option: " +value[valueOption][chosenOptionIndex]+ "  dans le panier";
                    visualAdd(message);


                }else{

                    //BOUCLE COMPARATIF DES VALEURS du localStorage-____________________________________________________________________________
                    
                    for(let i =0   ; i < localStorage.length ; i++ ){// la on execute une boucle le nombre de fois le nombre d'element dedans, par ex: 3)

                        let key = localStorage.key(i);//la cle a l'index 0 n'est pas forcement egal a 0, ils sont rangé bizarement dans le localStorage
                        console.log("cle = "+key)
                        console.log("i= "+i)

                        let item = localStorage.getItem(key);//on recupe la valeur de l'item a comparer avec "key" et non "I" car les cle ne sont pas forcement dans l'ordre (ex 1-2-3 ect) alors que I , oui.
                        // let itemSplit = item.split("&")//on casse la valeur qui contient les info a comparer
                        let itemSplit = JSON.parse(item);
                        console.table(itemSplit);                    
                        //--------------------------------------------------------------------------
                        

                        if(itemSplit.produit == product && itemSplit.id == id && itemSplit.optionId == chosenOptionIndex){
                            //si les valeurs que l'on ajoute est les meme que des valeurs deja enregistre alors | on recupere la quantité que l'on ajoute a l'item trouver
                        /*
                            si :
                             - le produit
                             - l'id
                             - l'option choisie
                             sont les meme qu'un item deja enregistrer, alors on incremente juste les quantiés a l'item qui a deja ces valeurs

                        */
                            // console.log("les valeur sont bien similaire ");
                            let newQuantity = Number(itemSplit.quantites) + Number(quantites.value); //parseInt() = pour les nombres entier, Number() = si la varaiable a un nombre a virgule
                            console.log("on calcul  = "+ itemSplit.quantites+" + "+ quantites.value +" = "+ newQuantity);
                            console.log(newQuantity)
                          
                            ///conditionnel pour pour ne pas que la quantité depasse 100 dans la valeur stocker
                                if(newQuantity <= 100){

                                    let itemNewQuantity ={
                                        'produit':product,
                                        'id':id,
                                        'optionId':chosenOptionIndex,
                                        'quantites':newQuantity,
                                        'unitPrice':price
                                    }

                                    localStorage.setItem(key,JSON.stringify(itemNewQuantity))
                                    console.log("quantite ajouter = "+ newQuantity);
                                    let message="ajout de "+quantites.value +" "+ value.name+" ,Option: [" +value[valueOption][chosenOptionIndex]+"] dans le panier ("+newQuantity+")";
                                    visualAdd(message)

                                }
                                else{
                                    // console.log("quantite maximal atteinte");
                                    let message ="quantite maximal atteinte pour ce produit";
                                    visualerror(message);


                                }


                            return//qui termine le else d'ajout de valeur sans jouer les 2 boucles, donc n'ajoute rien au localStorage

                        }//else sinon on execute les 2 boucle qui compare l'index
                        else{
                            console.log("nan");
                            
                            
                        }//fin du else
                    }//fin for, comparatif de valeur



                    //DOUBLE BOUCLE COMPARATIF DES CLE du localStorage____________________________________________________________________________


                    for(let i =0   ; i < localStorage.length ; i++ ){// la on execute une boucle le nombre de fois le nombre d'element dedans, par ex: 3)

                        for(let j = 0 ; j <= localStorage.length ; j++ ){// execute la boucle une seconde fois pour comparer si tout les chiffres existent bien( si il ya 3 element dans le localStorage, on verifie que les cle corresponde a 0,1,2 et 3 avec le signe égale)
                            let itemIndex = localStorage.getItem(j);
                            // console.log(" clef verifier = "+ j);//verification de clef
                            if(itemIndex == null){//si parmis les chiffres un est sauté, on le recupere pour l'attribué comme clé,sinon il recupere le prochain chiffre (qu'il voit comme manquant) car il ya le "="
                                // console.log('produit de type = ' + product);
                                console.log(" produit n° "+ j+" ajouté");
                                let indexManquant = j;
                                let newItem={
                                    'produit':product,
                                    'id':id,
                                    'optionId':chosenOptionIndex,
                                    'quantites':quantites.value,
                                    'unitPrice':price
                                }
                                localStorage.setItem(indexManquant,JSON.stringify(newItem));

                                let message ="Ajout de "+quantites.value+" "+value.name+ " ,Option: " +value[valueOption][chosenOptionIndex]+" dans le panier";
                                visualAdd(message);
                                
                                return indexManquant;
                            }


                        };//fin boucle 2        
   
   

                    }; //fin boucle 1  
                };//fin else 
            
            }//fin else de verification

            
        });//fin de l'event click

    })//2dn then
    
    .catch(function(err){
        let content = document.createElement('div');
            content.classList.add('contentError')
            content.innerHTML='serveur indisponible';
            section.appendChild(content);
            
            // console.log(err.message);


    })
};// fin fonction getProduct

//-----------------------------------------------------
function verifQuantite(target){
    let isNumberValid = target.match(/^([0-9]){1,3}$/);// regex pour evité les virgules)
    if(target <= 0 || target > 100 || isNumberValid == null ){
        // alert('erreur de quantité')

        return false;
    }else{
        return true;
    }
};

//-----------------------------------------------------
function visualAdd(param){

    const block= document.createElement("div");
    block.classList.add('visualAdd');    
    block.innerHTML=param;
    
    let main = document.getElementsByTagName('main');
    main[0].insertBefore(block, section);
    setTimeout(function(){main[0].removeChild(block)},1000);
}

function visualerror(param){

    const block= document.createElement("div");
    block.classList.add('visualError');
    block.innerHTML=param;

    let main = document.getElementsByTagName('main')
    main[0].insertBefore(block, section);
    setTimeout(function(){main[0].removeChild(block)},1000);
}