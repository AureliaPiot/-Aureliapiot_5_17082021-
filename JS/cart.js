// console.log('ici?');
const section = document.getElementById('section-product');
// console.log(section);

/*  recuperer le localstorage,
    si il est vide, on affiche un message que le panier est vide avec un lien qui mene a l'accueil 
    si il ya quelque chose on affiche le tableau   
*/
if( localStorage.length == 0 ){
//affiche un message
panierVide()

}//fin du if

else{
    resumPrice()
    creationDuTableau();
    getAllPrice();
    // resumePriceScroll();
    form();
// ---------------------


}//fin else

//declaration des fonctions____________________________________________________________________________________________________________


//Message panier vide----------------------------------------------------------------
function panierVide(){
    let message = document.createElement('div');
message.classList.add('panier-vide');
message.innerHTML =`
    <p>Panier Vide !</p>
    `;
section.appendChild(message);    
}

//creation du tableau----------------------------------------------------------------

function creationDuTableau(){

    let panier = document.createElement('div');//creation de la div qui va recevoir le tableau
    panier.classList.add('col-md-8','bg-white','table-products');

    for(let i =0; i < localStorage.length ; i++ ){ // on parcour le contenu du local storage
        let key = localStorage.key(i); // on stock la clef  a la place  0 , puis a la place 1 , puis a la place 2 ect...
        let info = localStorage.getItem(key).split("&"); // on decoupe la valeur de la cle actuel a chaque "&" les rengeant dans un tableau


        // console.log("info "+info);//retourne un tableau.
        // console.log("type =  "+info[0] +"|| id "+info[1]+"|| option n° "+ info[2] +"|| quantite "+info[3] );//retourne l'info du tableau a l'index indiquer.

        // console.log("|| cle = "+ key +"||objet = "+localStorage.getItem(key));

        // on recupe les info des produit dans le 
        
        panier.innerHTML=
        `                   
            <table class="table">
                <thead>
                <tr>
                    <th scope="col">cle</th>
                    <th scope="col">photo</th>
                    <th scope="col">nom</th>
                    <th scope="col">description</th>
                    <th scope="col">option</th>
                    <th scope="col">quantité</th>
                    <th scope="col">prix</th>
                    <th scope="col"></th>


                </tr>
                </thead>
                <tbody id="productSpace">
                    
                </tbody>
            </table>

        `; 
        section.appendChild(panier);

        getProductCart(info[0],info[1],info[2],info[3],key);
        
    }//fin boucle for
    
 }//fin de creationDuTableau()

//GetProductCart function----------------------------------------------------------------

function getProductCart(param1,param2,param3,param4,param5){
    fetch('http://localhost:3000/api/'+ param1 +'/'+ param2) 
    .then(function(res){
        if(res.ok){
            // console.log(res);
            // console.log(res.ok);//tant qu'il est "true" c'est bien
            return res.json();
        }       
    })
    .then(function(value){
        // console.log(value);
        let url = value.imageUrl.slice(22);
        let price = value.price / 100 * param4 ; 

        let optionName = ``;
        let valueOption = "";
        switch (param1){
            case 'cameras': optionName = "objectif";
                            valueOption = "lenses";
              break;
            case 'teddies':optionName ="couleur";
                           valueOption = "colors";
              break;
            case 'furniture':optionName = "verni";
                            valueOption = "varnish";
              break;
            default: console.log('aucun produit trouvé');                      
                
        }
        // console.log(optionName);


        let options = ``;
        for( let i= 0; i< value[valueOption].length; i++ ){//la c'est pour les options
            
        // console.log("valeur de l'option " + value[valueOption]);
 
            if(i== param3){ //on compare la valeur, si elle correspond a celle en position = a param3 (donc a 0 = 1er tour  (0=i), ou a 1 = 2nd tour(i=1))
                // (value[valueOption][i]== value[valueOption][param3]){  possible avec cette ecriture

                options +=`<option value="${value[valueOption][i]}" selected>${value[valueOption][i]}</option>`; // le "selected" en plus
            // console.log("valeur de l'option check " + value[valueOption][i]);

            }else{
                options +=`<option value="${value[valueOption][i]}">${value[valueOption][i]}</option>`;
            // console.log("valeur de l'option PAS check " + value[valueOption][i] +" comparer a " + value[valueOption][param3]);
            }
        }//fin de boucle for option

        //envoie du prix dans la boite de resumé

        //--------------------------------------


        let tbody = document.getElementById('productSpace');

            let tr= document.createElement('tr');

            let tdCle= document.createElement('td');
                tdCle.innerHTML=`${param5}`;


            let tdImg= document.createElement('td');
                tdImg.innerHTML=`<img  class="block-photo" src="${url}" alt="${value.name}">`;

            let tdName= document.createElement('td');
                tdName.innerHTML=`${value.name}`;

            let tdDescription= document.createElement('td');
                tdDescription.innerHTML=`${value.description}`;    

            let tdOptions= document.createElement('td');
                tdOptions.innerHTML=`<div>  <p>${optionName} :</p>  <select id="option-select">${options}</select>  </div>`;
                
            let tdInputNumber= document.createElement('td');
                tdInputNumber.innerHTML=`<input type="number" name="quantite" id="quantite-Item${param2}" min="1" max="100" value="${param4}">`;

            let tdPrice= document.createElement('td');
                tdPrice.innerHTML=`<p><span class="price">${price}</span><strong>€</strong>00</p>`;

            let tdButtonSuppr= document.createElement('td');
                tdButtonSuppr.innerHTML=`<button id="supprItem${param5}"  class="btn btn-danger btn-supprItem"  ><i class="fas fa-trash-alt"></i></button>`;

            tr.appendChild(tdCle);
            
            tr.appendChild(tdImg);
            tr.appendChild(tdName);
            tr.appendChild(tdDescription);
            tr.appendChild(tdOptions);
            tr.appendChild(tdInputNumber);
            tr.appendChild(tdPrice);
            tr.appendChild(tdButtonSuppr);

            tbody.appendChild(tr);
            
            tdButtonSuppr.addEventListener('click',function(){
                supprItem(param5);
                refresh()
            })

            tdInputNumber.addEventListener('change', (event) => {
                const number = event.target.value;
                let newPrice = value.price/100 * number;
                let blockNewPrice = tdPrice;
                blockNewPrice.innerHTML=`<p><span class="price"> ${newPrice}</span><strong>€</strong>00</p>`;
                console.log(newPrice);
            });

        return

    })//2dn then
    
    .catch(function(err){
        console.log('erreur de fetch | aucun produit trouvé');

    })
    return
};//fin getProductCart


// refresh function----------------------------------------------------------------
function refresh(){
   document.location.reload();
   
}

// supprItem function----------------------------------------------------------------
 function supprItem(param1){
     //faire en sorte de pouvoir annuler l'action
    //  alert('etes-vous sur?')
     console.log("item "+param1);
     localStorage.removeItem(param1);

};

// get price function----------------------------------------------------------------
function getAllPrice(){
    // console.log(document.getElementsByClassName('price'))

    var observer = new MutationObserver(function(){ // est a l'écoute des changement du dom
        
        
        
        let allPrice=0;
        let classPrice = document.getElementsByClassName('price');
        // let allInput = document.getElementsByClassName('price');
         let arrayOfPrice = [];


        if(localStorage.length == classPrice.length){
            console.log(classPrice.length);
            console.log(classPrice);

            for(let i=0; i< classPrice.length; i++){
                let priceTour = Number(classPrice[i].innerHTML);//conversion en nombre
                allPrice += priceTour;
                arrayOfPrice.push(priceTour);
                console.log(priceTour);     
                
                

            }// fin for
            console.table(arrayOfPrice);
            console.log("prix total = "+allPrice);
            document.getElementById('resumAllPrice').innerHTML =`${allPrice}` //le prix ne ce met pas a jour en direct
            classesFound()
            
            }// fin if
            


            
        });

        
    observer.observe(section, { attributes: false, childList: true, subtree: true , characterDataOldValue: true});


    // When you've got what you need, you should call this function to trigger a disconnect 
    function classesFound(){
    observer.disconnect();
    };
// console.log(observer);



};



// resum price function----------------------------------------------------------------
//on recupere tout les prix pour les additionner
function resumPrice(){
    let blocResume = document.createElement('div');
    blocResume.classList.add('col-md-3','resume-price','bg-white');
    blocResume.id = 'resume-price';
    blocResume.innerHTML=`
        <table class="table">
            <tr>
                <td>produit(${localStorage.length})</td>
                <td id="resumAllPrice">prix</td>
            </tr>
            <tr>
                <td>livraison</td>
                <td>prix frais de port</td>
            </tr>
            <tr>
            <td colspan="2">
                <button class="btn btn-primary btn-achat">achat</button>
            </td> 
            </tr>
            <tr>
                <td colspan="2">
                    <button id="resetButton" class="btn btn-danger btn-achat" >supprimer le panier</button>
                </td>
            </tr>

        </table>
    `;
    section.appendChild(blocResume);
    resumePriceScroll()
    
    let reset = document.getElementById("resetButton");
    reset.addEventListener('click',() =>{
        localStorage.clear()
        refresh()
        
    });

    // let allPriceBlock= document.getElementsByClassName("price");
    // console.log(allPriceBlock.length);

}

// scroll function----------------------------------------------------------------
function resumePriceScroll(){
	window.addEventListener("scroll", function(){

    // recuperer la hauteur par rapport au margine de la fenetre
	// let	windowHeight = document.documentElement.clientHeight;/*hauteur de la fenetre*/
    // console.log('hauteur: '+windowHeight);    
    // console.log('hauteur offset: '+window.pageYOffset);

		if (window.pageYOffset > 150 /*&& window.pageYOffset < 700*/ ) {
            document.getElementById('resume-price').classList.add("scroll");
		}
        else{
            document.getElementById('resume-price').classList.remove("scroll");
            // recuperer la hauteur du formulaire pour la donnée comme limite au bloc de prix

        }
	}, false);
}
// console.log("ici?"); 
// form  function----------------------------------------------------------------
function form(){

    let form = document.createElement('form');
        form.classList.add('col-md-8','bg-white','forumlaire-panier')
        // form.method="POST";
        // form.action="#";

    let lastName= document.createElement('input');
        lastName.classList.add("form-control");
        lastName.id="lastName";
        lastName.name = "lastName";
        lastName.type="text"; 
        lastName.placeholder="Nom";
        lastName.required=true ;

    let firstName =document.createElement('input');
        firstName.classList.add("form-control");    
        firstName.id="firstName";
        firstName.name="firstName";
        firstName.type="text";
        firstName.placeholder="Prénom";
        firstName.required = true;


    let address= document.createElement('input');
        address.classList.add("form-control");
        address.id="address";
        address.name="address";
        address.type="text";
        address.placeholder="adresse";
        address.required = true;

        
    let city = document.createElement('input');
        city.classList.add("form-control");
        city.id="city";
        city.name="city";
        city.type="text";
        city.placeholder="Ville";
        city.required = true;


    let email= document.createElement('input');
        email.classList.add("form-control");
        email.id="email";
        email.name="email";
        email.type="email";
        email.placeholder="email";
        email.required = true;


    let btnForm =document.createElement('button');
        btnForm.classList.add('btn','btn-primary','col');
        btnForm.id="form_submit";
        // btnForm.type="submit";
        btnForm.innerText="envoyer"


    let verifInput =`<small id="verifInput" class="text-danger">merci de bien renseignée ce champs</small>`;


        form.innerHTML=`
        <fieldset>
            <legend><h4>informations de livraison</h4></legend>
    
            <div class="row">
                <div id="groupLastName" class="form-group col">
                    <label for="lastName">Nom</label>

                </div>
                <div id="groupFirstName" class="form-group col">
                    <label for="firstName">Prenom</label>

                </div>
            </div>

            <div class="row">

                <div id="groupAddress" class="form-group col">
                    <label for="address">addresse</label>

                </div>
                <div id="groupCity" class="form-group col">
                    <label for="city">ville</label>

                </div>

            </div>

            <div id="groupEmail" class="form-group">
                <label for="email">Email</label>

            </div>
        </fieldset>
        `;
    section.appendChild(form);

    document.getElementById('groupLastName').appendChild(lastName);
    document.getElementById('groupFirstName').appendChild(firstName);
    document.getElementById('groupAddress').appendChild(address);
    document.getElementById('groupCity').appendChild(city);
    document.getElementById('groupEmail').appendChild(email);

    form.appendChild(btnForm);

    btnForm.addEventListener('click',function(event){
    event.preventDefault()
    // console.log();
    console.log("last name "+lastName.value +"first name "+firstName.value+ "address "+ address.value +"city "+city.value + "email "+email.value)
    })




}
//get All Data function----------------------------------------------------------------
function getAllData(){
    console.log(localStorage.length);
}

