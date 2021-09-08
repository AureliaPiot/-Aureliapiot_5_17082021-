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
    // getAllData();
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
        let info = localStorage.getItem(key); 
        
        
        let infoSplit = JSON.parse(info);
        // console.table(infoSplit);


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


        getProductCart(infoSplit.produit,infoSplit.id,infoSplit.optionId,infoSplit.quantites,infoSplit.unitPrice,key);

        // getProductCart(info[0],info[1],info[2],info[3],key);

        
    }//fin boucle for
    
 }//fin de creationDuTableau()

//GetProductCart function----------------------------------------------------------------

function getProductCart(param1,param2,param3,param4,param5,key){
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


        //--------------------------------------


        let tbody = document.getElementById('productSpace');

            let tr= document.createElement('tr');

            let tdCle= document.createElement('td');
                tdCle.innerHTML=`${key}`;


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
                tdButtonSuppr.innerHTML=`<button id="supprItem${key}"  class="btn btn-danger btn-supprItem"  ><i class="fas fa-trash-alt"></i></button>`;

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
                supprItem(key);
                refresh()
            })


            tdInputNumber.addEventListener('change', (event) => {
                const number = event.target.value;
                let isNumberValid = number.match(/^([0-9]){1,3}$/);// regex verification des valeurs entrées (on evite les virgules)


                if(number<0 || number >100 || isNumberValid == null ){
                    //faire un message d'erreur
                    alert('valeur invalide');
                }
                else{
                    let newPrice = value.price/100 * number;
                    let blockNewPrice = tdPrice;
                    blockNewPrice.innerHTML=`<p><span class="price"> ${newPrice}</span><strong>€</strong>00</p>`;
                    // produit":"cameras","id":"5be9bc241c9d440000a730e7","optionId":0,"quantites":7,"unitPrice":2099}
                    let getInfo = localStorage.getItem(key);
                    let info = JSON.parse(getInfo);
                    console.table(info);

                    let newInfo ={
                        produit:param1,
                        id:param2,
                        optionId:param3,
                        quantites:number,
                        unitPrice:param5
                    }
                    localStorage.setItem(key,JSON.stringify(newInfo));
                    

                    // localStorage.setItem(param5, param1 +"&"+param2+"&"+param3+"&"+number)
                    getAllPrice();

                    // console.log(newPrice);
                }
       
            });//fin addEvnetListener

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
                

        let classPrice = document.getElementsByClassName('price');

         let arrayOfPrice = [];//declaration d'un tableau qui va stocker tout les prix

        if(localStorage.length == classPrice.length){//seulement pour que ce soit fait une fois tout les inputes recuperer 

            for(let i=0; i< classPrice.length; i++){
                let priceTour = Number(classPrice[i].innerHTML);//conversion en nombre
                arrayOfPrice.push(priceTour);
                // console.log(priceTour);     
            }// fin for

            let sumPrice = 0;

            for(let i=0; i<arrayOfPrice.length; i++){//calcul de toutes les valeurs du tableau 
                sumPrice += arrayOfPrice[i];
            }
            // console.table(arrayOfPrice);
            // console.log(sumPrice +"€");

            document.getElementById('resumAllPrice').innerHTML =`<p>${sumPrice}<strong>€</strong>00</p>` //le prix ne ce met pas a jour en direct
            classesFound()
            
            }// fin if

        });

        
    observer.observe(section, { attributes: false, childList: true, subtree: true , characterDataOldValue: true});

    //fonction pour arreter la recherche de classe, sinon ça tourne en loop au moindre changement
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
                <td>produit(<strong>${localStorage.length}</strong>)</td>
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

// form  function----------------------------------------------------------------
function form(){

    let form = document.createElement('form');
        form.classList.add('col-md-8','bg-white','forumlaire-panier')


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
        btnForm.classList.add('btn','btn-primary','col-5','mx-auto');
        btnForm.id="form_submit";
        // btnForm.type="submit";
        btnForm.innerText="envoyer"


        form.innerHTML=`
        <fieldset id="fieldset" class="row">
            <legend><h4>informations de livraison</h4></legend>
    
            <div class="row">
                <div id="groupLastName" class="form-group col">
                    <label for="lastName">Nom <span>*</span></label>

                </div>
                <div id="groupFirstName" class="form-group col">
                    <label for="firstName">Prenom <span>*</span></label>

                </div>
            </div>

            <div class="row">

                <div id="groupAddress" class="form-group col">
                    <label for="address">adresse <span>*</span></label>

                </div>
                <div id="groupCity" class="form-group col">
                    <label for="city">ville <span>*</span></label>

                </div>

            </div>

            <div id="groupEmail" class="form-group">
                <label for="email">Email <span>*</span></label>

            </div>
        </fieldset>
        `;

    section.appendChild(form);

    document.getElementById('groupLastName').appendChild(lastName);
    document.getElementById('groupFirstName').appendChild(firstName);
    document.getElementById('groupAddress').appendChild(address);
    document.getElementById('groupCity').appendChild(city);
    document.getElementById('groupEmail').appendChild(email);
    document.getElementById('fieldset').appendChild(btnForm);


    btnForm.addEventListener('click',function(event){
    event.preventDefault()

    let lastNameLength = lastName.value.length == 0;
    let firstNameLength = firstName.value.length == 0;
    let addressLength = address.value.length == 0;
    let cityLength = city.value.length == 0;
    let emailLength = email.value.length == 0;

    
    formIsValid(lastName,firstName,address,city,email);//validation du formulaire


    })




}

//FormIsValid function----------------------------------------------------------------
function formIsValid(param1,param2,param3,param4,param5){

    let value1Length = param1.value.length == 0;
    let value2Length = param2.value.length == 0;
    let value3Length = param3.value.length == 0;
    let value4Length = param4.value.length == 0;
    let value5Length = param5.value.length == 0;

    // Seul regex pour l'email, revois true ou false
    let emailValide = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(param5.value);// test de la structure de l'email (a voir https://regexr.com/3e48o)

    // console.log(value1Length+"+"+value2Length+"+"+value3Length+"+"+value4Length+"+"+value5Length)

    
// si UNE de ces valeur est vrais (donc = 0) alors :
if(value1Length||value2Length||value3Length||value4Length||value5Length){
    //
    if(value1Length){
        param1.classList.add("invalid");
        document.getElementById('groupLastName').classList.add("invalid-message");   
    }else if(!value1Length){
        param1.classList.add("valid");
            if(param1.classList.contains("invalid")){
                param1.classList.remove("invalid");
                document.getElementById('groupLastName').classList.remove("invalid-message");
            }
    }
    if(value2Length){
        param2.classList.add("invalid");
        document.getElementById('groupFirstName').classList.add("invalid-message");        
    }else if(!value2Length){
        param2.classList.add("valid");
            if(param2.classList.contains("invalid")){
                param2.classList.remove("invalid");
                document.getElementById('groupFirstName').classList.remove("invalid-message");
            }
    } 
    if(value3Length){
        param3.classList.add("invalid");
        document.getElementById('groupAddress').classList.add("invalid-message");
    }else if(!value3Length){
        param3.classList.add("valid");
            if(param3.classList.contains("invalid")){
                param3.classList.remove("invalid");
                document.getElementById('groupAddress').classList.remove("invalid-message");
            }
    }
    if(value4Length){
        param4.classList.add("invalid");
        document.getElementById('groupCity').classList.add("invalid-message");
    }else if(!value4Length){
        param4.classList.add("valid");
        if(param4.classList.contains("invalid")){
            param4.classList.remove("invalid");
            document.getElementById('groupCity').classList.remove("invalid-message");
        }
    }
    if(value5Length){
        param5.classList.add("invalid");
        document.getElementById('groupEmail').classList.add("invalid-message");
    }else if(!value5Length){
        param5.classList.add("valid");
        if(param5.classList.contains("invalid")){
            param5.classList.remove("invalid");
            document.getElementById('groupEmail').classList.remove("invalid-message");
        }
    }
}//fin if si toute les longueurs = 0
else if(!emailValide){
    param5.classList.add("invalid-email");
    document.getElementById('groupEmail').classList.add("invalid-message");




}else{//si le formulaire est valide on ajoute l'effet visuel pour montrer que les champs sont accepetés et on recupe les info puis on les post
    if(param1.classList.contains("invalid")){
        param1.classList.remove("invalid");
        document.getElementById('groupLastName').classList.remove("invalid-message");
    }
    if(param2.classList.contains("invalid")){
        param2.classList.remove("invalid");
        document.getElementById('groupFirstName').classList.remove("invalid-message");
    }
    if(param3.classList.contains("invalid")){
        param3.classList.remove("invalid");
        document.getElementById('groupAddress').classList.remove("invalid-message");
    }
    if(param4.classList.contains("invalid")){
        param4.classList.remove("invalid");
        document.getElementById('groupCity').classList.remove("invalid-message");
    }
    if(param5.classList.contains("invalid")){
        param5.classList.remove("invalid");
        document.getElementById('groupEmail').classList.remove("invalid-message");
    }
    param1.classList.add("valid");
    param2.classList.add("valid");
    param3.classList.add("valid");
    param4.classList.add("valid");
    param5.classList.add("valid");


// -----------------------------------------------
    let value1 = param1.value;
    let value2 = param2.value;
    let value3 = param3.value;
    let value4 = param4.value;
    let value5 = param5.value;
//-----------
    let arrayId=[];
    for(let i=0; i < localStorage.length; i++){//on push les id des produits
        let key = localStorage.key(i); 
        let info = localStorage.getItem(key);
        let inoSplit = JSON.parse(info);
        let infoId = inoSplit.id;
        arrayId.push(infoId);
    }
    // console.table(arrayId);


//--recuperation des donnée dans un objet java script
    let data ={
            contact :{
                firstName: value2,
                lastName: value1,
                address: value3,
                city: value4,
                email: value5,
            },
            'products':arrayId
        }

    // console.log(data);
    // console.log("contact"+JSON.stringify(data.contact));

    post(data);


}

//get All Data function----------------------------------------------------------------
function getAllData(){
    // console.log(localStorage.length);
    // console.table(localStorage);

/**
 *
 * Expects request to contain:
 * contact: {
 *   firstName: string,
 *   lastName: string,
 *   address: string,
 *   city: string,
 *   email: string
 * }
 * products: [string] <-- array of product _id
 *
 */

}
//function post----------------------
function post(data){
    fetch('http://localhost:3000/api/cameras/order', {
        method : "Post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    }) 
    .then(function(res){
        if(res.ok){
            console.log(res);
            // console.log(res.ok);//tant qu'il est "true" c'est bien
            return res.json();
        }       
    })
    .then(function(value){
        console.log("value = "+ value.orderId);
        localStorage.clear();

        localStorage.setItem("orderId", value.orderId);
        localStorage.setItem("contact", JSON.stringify(data.contact));

        setTimeout(()=>{document.location.href="commandConfirm.html";}, 1000);//erdirection apres 1sec
        
    })//2dn then
    
    .catch(function(err){
        console.log('erreur de fetch | aucun produit trouvé');

    })


    }
}

//new localStorage function----------------------------------------------------------------
function newLocalStorage(){
    // key1 = orderId
    // key2 = contact
    // key3 = orderPrice
    localStorage.clear();

    localStorage.setItem(orderId, value.orderId);
    localStorage.setItem("contact", JSON.stringify(data.contact));
    localStorage.setItem(orderPrice, value3);

    document.location.href="commandConfirm.html";
}