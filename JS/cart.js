// console.log('ici?');
const section = document.getElementById('section-product');

//verification si le serveur est allumer----------------------------------------------------------------
const verifFetch =
    
    fetch('http://localhost:3000/api/cameras') 
    .then(function(res){
        // console.table(res);
        if (!res.ok) {
            console.log(`Erreur HTTP ! statut : ${res.status}`);
          }
        if(res.ok){
            
            if( localStorage.length == 0 || localStorage.key(0)== "contact" || localStorage.key(0) == "orderId" ){
                //affiche un message
                panierVide()
                
            }//fin du if
            
            else{
                creationDuTableau();
                resumPrice()
                form(); 
 

            }//fin else
        }       
    })
    .catch(function(err){
        errServ()
    });

    // console.table(verifFetch);   
    

//declaration des fonctions____________________________________________________________________________________________________________

//Message error serveur----------------------------------------------------------------

function errServ(){
    let content = document.createElement('div');
    content.classList.add('contentError')
    content.innerHTML='serveur indisponible';
    section.appendChild(content);
            

}

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
    panier.classList.add('col-xxl-8','bg-white','border');
    panier.id="productSpace"


    for(let i =0; i < localStorage.length ; i++ ){ // on parcour le contenu du local storage
        let key = localStorage.key(i); // on stock la clef  a la place  0 , puis a la place 1 , puis a la place 2 ect...
        let info = localStorage.getItem(key); 
        
        
        let infoSplit = JSON.parse(info);
        // console.table(infoSplit);

        section.appendChild(panier);


        getProductCart(infoSplit.produit,infoSplit.id,infoSplit.optionId,infoSplit.quantites,infoSplit.unitPrice,key,i);
        
    }//fin boucle for
    
 }//fin de creationDuTableau()

//GetProductCart function----------------------------------------------------------------

// function getProductCart(param1,param2,param3,param4,param5,key){
//     fetch('http://localhost:3000/api/'+ param1 +'/'+ param2) 
//     .then(function(res){
//             // console.table(res);

//         if (!res.ok) {
//             let tbody = document.getElementById('productSpace');
//             tbody.innerHTML += `<td colspan=6 class="text-danger text-center"><strong> Product ${res.statusText} | Statut : ${res.status}</strong></td> `;
//           }
//         if(res.ok){//tant qu'il est "true" c'est bien
//             return res.json();
//         }       
//     })
//     .then(function(value){
//         // console.log(value);
//         let url = value.imageUrl.slice(22);
//         let price = value.price / 100 * param4 ; 

//         let optionName = ``;
//         let valueOption = "";
//         switch (param1){
//             case 'cameras': optionName = "objectif";
//                             valueOption = "lenses";
//               break;
//             case 'teddies':optionName ="couleur";
//                            valueOption = "colors";
//               break;
//             case 'furniture':optionName = "verni";
//                             valueOption = "varnish";
//               break;
//             default: console.log('aucun produit trouvé');                      
                
//         }
        

//         let options = ``;
//         for( let i= 0; i< value[valueOption].length; i++ ){//la c'est pour les options
            
   
//             if(i== param3){ //on compare la valeur, si elle correspond a celle en position = a param3 (donc a 0 = 1er tour  (0=i), ou a 1 = 2nd tour(i=1))
//                 // (value[valueOption][i]== value[valueOption][param3]){  possible avec cette ecriture

//                 options +=`<option value="${value[valueOption][i]}" selected>${value[valueOption][i]}</option>`; //on ajoute le "selected" en plus

//             }else{
//                 options +=`<option value="${value[valueOption][i]}">${value[valueOption][i]}</option>`;

//             }
//         }//fin de boucle for option


//         //--------------------------------------


//         let tbody = document.getElementById('productSpace');

//             let tr= document.createElement('tr');

//             let tdCle= document.createElement('td');
//                 tdCle.innerHTML=`${key}`;


//             let tdImg= document.createElement('td');
//                 tdImg.innerHTML=`<img  class="block-photo" src="${url}" alt="${value.name}">`;

//             let tdName= document.createElement('td');
//                 tdName.innerHTML=`${value.name}`;

//             let tdDescription= document.createElement('td');
//                 tdDescription.innerHTML=`${value.description}`;    

//             let tdOptions= document.createElement('td');
//                 tdOptions.classList.add('align-baseline');
//                 tdOptions.innerHTML=`<div>  <strong>${optionName} :</strong>  <select id="option-select">${options}</select>  </div>`;
                
//             let tdInputNumber= document.createElement('td');
//                 tdInputNumber.innerHTML=`<input type="number" name="quantite" id="quantite-Item${param2}" min="1" max="100" value="${param4}">`;

//             let tdPrice= document.createElement('td');
//                 tdPrice.innerHTML=`<p><span class="price">${price}</span><strong>€</strong>00</p>`;

//             let tdButtonSuppr= document.createElement('td');
//                 tdButtonSuppr.innerHTML=`<button id="supprItem${key}"  class="btn btn-danger btn-supprItem"  ><i class="fas fa-trash-alt fa-lg"></i></button>`;

//             // tr.appendChild(tdCle);
            
//             tr.appendChild(tdImg);
//             tr.appendChild(tdName);
//             tr.appendChild(tdDescription);
//             tr.appendChild(tdOptions);
//             tr.appendChild(tdInputNumber);
//             tr.appendChild(tdPrice);
//             tr.appendChild(tdButtonSuppr);

//             tbody.appendChild(tr);


//             tdButtonSuppr.addEventListener('click',function(){
//                 supprItem(key);
//             })


//             tdInputNumber.addEventListener('change', (event) => {
//                 const number = event.target.value;
//                 let isNumberValid = number.match(/^([0-9]){1,3}$/);// regex verification des valeurs entrées (on evite les virgules)
                
                
//                 if(number<0 || number >100 || isNumberValid == null ){
//                     //faire un message d'erreur
//                     alert('valeur invalide');
//                 }
//                 else{
//                     getAllPrice();
//                     let newPrice = value.price/100 * number;
//                     let blockNewPrice = tdPrice;
//                     blockNewPrice.innerHTML=`<p><span class="price"> ${newPrice}</span><strong>€</strong>00</p>`;


//                     let newInfo ={
//                         produit:param1,
//                         id:param2,
//                         optionId:param3,
//                         quantites:number,
//                         unitPrice:param5
//                     }
//                     localStorage.setItem(key,JSON.stringify(newInfo));
                    
//                 }
       
//             });//fin addEvnetListener

//         return

//     })//2dn then
    
//     .catch(function(err){

//         console.table(err);
//         console.log(err);

//         // errServ();
            
//         // console.log('erreur de fetch | aucun produit trouvé | merci de demarer le server');

//     })
//     return
// };//fin getProductCart




// [DEBUT TEST]---GET PRODUCT TEST

function getProductCart(param1,param2,param3,param4,param5,key,tour){
    fetch('http://localhost:3000/api/'+ param1 +'/'+ param2) 
    .then(function(res){
            // console.table(res);

        if (!res.ok) {
            let tbody = document.getElementById('productSpace');
            tbody.innerHTML += `<td colspan=6 class="text-danger text-center"><strong> Product ${res.statusText} | Statut : ${res.status}</strong></td> `;
          }
        if(res.ok){//tant qu'il est "true" c'est bien
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
        

        let options = ``;
        for( let i= 0; i< value[valueOption].length; i++ ){//la c'est pour les options
            
   
            if(i== param3){ //on compare la valeur, si elle correspond a celle en position = a param3 (donc a 0 = 1er tour  (0=i), ou a 1 = 2nd tour(i=1))
                // (value[valueOption][i]== value[valueOption][param3]){  possible avec cette ecriture

                options +=`<option value="${value[valueOption][i]}" selected>${value[valueOption][i]}</option>`; //on ajoute le "selected" en plus

            }else{
                options +=`<option value="${value[valueOption][i]}">${value[valueOption][i]}</option>`;

            }
        }//fin de boucle for option


        //--------------------------------------

        let panier = document.getElementById('productSpace');
        
        let objectBloc= document.createElement('div');
        objectBloc.classList.add('d-flex','object-bloc')
        
            let bloc1 = document.createElement('div');
                bloc1.classList.add('d-flex','bloc-1');
            
                let blocImg= document.createElement('div');
                    blocImg.innerHTML=`<img  class="block-photo" src="${url}" alt="${value.name}">`;

                let blocText= document.createElement('div');
                    blocText.classList.add('d-flex','flex-column','bloc-text');
                    blocText.innerHTML=`
                    <h3>${value.name}</h3>
                    <p>${value.description}</p>
                    `;
                      
            let bloc2 = document.createElement('div');
                bloc2.classList.add('d-flex','bloc-2','align-items-center');

                let blocOptions= document.createElement('div');
                    blocOptions.classList.add('mx-2');
                    blocOptions.innerHTML=` <strong>${optionName} :</strong>  <select id="option-select">${options}</select> `;
                    
                let blocInputNumber= document.createElement('div');
                    blocInputNumber.classList.add('mx-2');
                    blocInputNumber.innerHTML=`
                    <label for="quantite">quantitée</label>
                    <input type="number" name="quantite" id="quantite-Item${param2}" min="1" max="100" value="${param4}">`;

                let blocPrice= document.createElement('p');
                    blocPrice.classList.add('mx-2');
                    blocPrice.innerHTML=`<span class="price">${price}</span><strong>€</strong>00`;

                let blocButtonSuppr= document.createElement('div');
                    blocButtonSuppr.classList.add('mx-2');
                    blocButtonSuppr.innerHTML=`<button id="supprItem${key}" class="btn btn-danger btn-supprItem"  ><i class="fas fa-trash-alt fa-lg"></i></button>`;


                    
                    
                    
        bloc1.appendChild(blocImg);
        bloc1.appendChild(blocText);
        
        bloc2.appendChild(blocOptions);
        bloc2.appendChild(blocInputNumber);
        bloc2.appendChild(blocPrice);
        bloc2.appendChild(blocButtonSuppr);
        
        objectBloc.appendChild(bloc1);
        objectBloc.appendChild(bloc2);

        console.log(objectBloc);

        panier.appendChild(objectBloc);

        let separation=document.createElement('hr');

        if(tour+1 < localStorage.length){
            panier.appendChild(separation);
        //+1 par rapport au compte qui commence a 0
        }


        blocButtonSuppr.addEventListener('click',function(){
            supprItem(key);
        })


        blocInputNumber.addEventListener('change', (event) => {
            const number = event.target.value;
            let isNumberValid = number.match(/^([0-9]){1,3}$/);// regex verification des valeurs entrées (on evite les virgules)
            
            
            if(number<0 || number >100 || isNumberValid == null ){
                //faire un message d'erreur
                alert('valeur invalide');
            }
            else{
                getAllPrice();
                let newPrice = value.price/100 * number;
                let blockNewPrice = blocPrice;
                blockNewPrice.innerHTML=`<p><span class="price"> ${newPrice}</span><strong>€</strong>00</p>`;


                let newInfo ={
                    produit:param1,
                    id:param2,
                    optionId:param3,
                    quantites:number,
                    unitPrice:param5
                }
                localStorage.setItem(key,JSON.stringify(newInfo));
                
            }
    
        });//fin addEvnetListener

    return

    })//2dn then
    
    .catch(function(err){

        console.table(err);
        console.log(err);

        // errServ();
            
        // console.log('erreur de fetch | aucun produit trouvé | merci de demarer le server');

    })
    return
};//fin getProductCart




// [FIN TEST]----------------------



// refresh function----------------------------------------------------------------
function refresh(){
   document.location.reload();
   
}

// supprItem function----------------------------------------------------------------
 function supprItem(param1){

     //faire en sorte de pouvoir annuler l'action
     if(confirm('etes-vous sur?')){
         localStorage.removeItem(param1);
         refresh()
     }

};

// get price function----------------------------------------------------------------
function getAllPrice(){

        let arrayOfPrice = [];//declaration d'un tableau qui va stocker tout les prix

    for(let i = 0 ; i < localStorage.length ; i++){
        let key = localStorage.key(i);
        let info = JSON.parse(localStorage.getItem(key));
        let quantites = info.quantites;
        let unitPrice = info.unitPrice;
        let priceKey= quantites * unitPrice;
        arrayOfPrice.push(priceKey);
    }
        // console.table(arrayOfPrice);
    let sumPrice = 0;
    for(let i=0; i<arrayOfPrice.length; i++){//calcul de toutes les valeurs du tableau 
        sumPrice += arrayOfPrice[i];
    }

        document.getElementById('resumAllPrice').innerHTML =`${sumPrice}<strong>€</strong>00`;
        //ne se met pas a jour au 1er clic
        // console.log("sumPrice "+ sumPrice +"€");  
        return sumPrice;
};
    
       
// resum price function----------------------------------------------------------------

function resumPrice(){
    let blocResume = document.createElement('div');
    blocResume.classList.add('col-xxl-3','resume-price','bg-white','border');
    blocResume.id = 'resume-price';
    blocResume.innerHTML=`
        <table class="table">
            <tr>
                <td>produit(<strong>${localStorage.length}</strong>)</td>
                <td id="resumAllPrice"></td>
            </tr>
            <tr>
                <td>livraison</td>
                <td>prix frais de port</td>
            </tr>
            <tr>
                <td colspan="2">
                    <button id="resetButton" class="btn btn-danger btn-achat" >supprimer le panier</button>
                </td>
            </tr>

        </table>
    `;
    section.appendChild(blocResume);
    getAllPrice();

    
    let reset = document.getElementById("resetButton");
    reset.addEventListener('click',() =>{
        if(confirm('La totalitée de votre panier sera effacée, etes-vous sur?')){
            localStorage.clear();
            refresh()
        }
    });
    
    resumePriceScroll();

}

function resumePriceScroll(){



        window.addEventListener("scroll", function(){
            if (window.pageYOffset > 150 && document.documentElement.clientWidth> 1400 ) {
                document.getElementById('resume-price').classList.add("scroll");
            }
            else{
                document.getElementById('resume-price').classList.remove("scroll");
                // recuperer la hauteur du formulaire pour la donnée comme limite au bloc de prix
            }
        }, false);// fin event Scroll
}




// form  function----------------------------------------------------------------
// function form(){

//     let form = document.createElement('form');
//         form.classList.add('col-xxl-8','bg-white','forumlaire-panier')


//     let lastName= document.createElement('input');
//         lastName.classList.add("form-control");
//         lastName.id="lastName";
//         lastName.name = "lastName";
//         lastName.type="text"; 
//         lastName.placeholder="Nom";
//         lastName.required=true ;

//     let firstName =document.createElement('input');
//         firstName.classList.add("form-control");    
//         firstName.id="firstName";
//         firstName.name="firstName";
//         firstName.type="text";
//         firstName.placeholder="Prénom";
//         firstName.required = true;


//     let address= document.createElement('input');
//         address.classList.add("form-control");
//         address.id="address";
//         address.name="address";
//         address.type="text";
//         address.placeholder="adresse";
//         address.required = true;

        
//     let city = document.createElement('input');
//         city.classList.add("form-control");
//         city.id="city";
//         city.name="city";
//         city.type="text";
//         city.placeholder="Ville";
//         city.required = true;


//     let email= document.createElement('input');
//         email.classList.add("form-control");
//         email.id="email";
//         email.name="email";
//         email.type="email";
//         email.placeholder="email";
//         email.required = true;


//     let btnForm =document.createElement('button');
//         btnForm.classList.add('btn','btn-primary','col-5','mx-auto');
//         btnForm.id="form_submit";
//         btnForm.innerText="Acheter"


//         form.innerHTML=`
//         <fieldset id="fieldset" class="row">
//             <legend><h4>informations de livraison</h4></legend>
    
//             <div class="row">
//                 <div id="groupLastName" class="form-group col">
//                     <label for="lastName">Nom <span>*</span></label>

//                 </div>
//                 <div id="groupFirstName" class="form-group col">
//                     <label for="firstName">Prenom <span>*</span></label>

//                 </div>
//             </div>

//             <div class="row">

//                 <div id="groupAddress" class="form-group col">
//                     <label for="address">adresse <span>*</span></label>

//                 </div>
//                 <div id="groupCity" class="form-group col">
//                     <label for="city">ville <span>*</span></label>

//                 </div>

//             </div>

//             <div id="groupEmail" class="form-group">
//                 <label for="email">Email <span>*</span></label>

//             </div>
//         </fieldset>
//         `;

//     section.appendChild(form);

//     document.getElementById('groupLastName').appendChild(lastName);
//     document.getElementById('groupFirstName').appendChild(firstName);
//     document.getElementById('groupAddress').appendChild(address);
//     document.getElementById('groupCity').appendChild(city);
//     document.getElementById('groupEmail').appendChild(email);
//     document.getElementById('fieldset').appendChild(btnForm);


//     btnForm.addEventListener('click',function(event){
//     event.preventDefault()

//     let lastNameLength = lastName.value.length == 0;
//     let firstNameLength = firstName.value.length == 0;
//     let addressLength = address.value.length == 0;
//     let cityLength = city.value.length == 0;
//     let emailLength = email.value.length == 0;

    
//     formIsValid(lastName,firstName,address,city,email);//validation du formulaire


//     })

// }

// //FormIsValid function----------------------------------------------------------------
// function formIsValid(param1,param2,param3,param4,param5){

//     let value1Length = param1.value.length == 0;
//     let value2Length = param2.value.length == 0;
//     let value3Length = param3.value.length == 0;
//     let value4Length = param4.value.length == 0;
//     let value5Length = param5.value.length == 0;

//     // Seul regex pour l'email, revois true ou false
//     let emailValide = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(param5.value);// test de la structure de l'email (a voir https://regexr.com/3e48o)

//     // console.log(value1Length+"+"+value2Length+"+"+value3Length+"+"+value4Length+"+"+value5Length)

    
// // si UNE de ces valeur est vrais (donc = 0) alors :
// if(value1Length||value2Length||value3Length||value4Length||value5Length){
//         //
//         if(value1Length){
//             param1.classList.add("invalid");
//             document.getElementById('groupLastName').classList.add("invalid-message");   
//         }else if(!value1Length){
//             param1.classList.add("valid");
//                 if(param1.classList.contains("invalid")){
//                     param1.classList.remove("invalid");
//                     document.getElementById('groupLastName').classList.remove("invalid-message");
//                 }
//         }
//         if(value2Length){
//             param2.classList.add("invalid");
//             document.getElementById('groupFirstName').classList.add("invalid-message");        
//         }else if(!value2Length){
//             param2.classList.add("valid");
//                 if(param2.classList.contains("invalid")){
//                     param2.classList.remove("invalid");
//                     document.getElementById('groupFirstName').classList.remove("invalid-message");
//                 }
//         } 
//         if(value3Length){
//             param3.classList.add("invalid");
//             document.getElementById('groupAddress').classList.add("invalid-message");
//         }else if(!value3Length){
//             param3.classList.add("valid");
//                 if(param3.classList.contains("invalid")){
//                     param3.classList.remove("invalid");
//                     document.getElementById('groupAddress').classList.remove("invalid-message");
//                 }
//         }
//         if(value4Length){
//             param4.classList.add("invalid");
//             document.getElementById('groupCity').classList.add("invalid-message");
//         }else if(!value4Length){
//             param4.classList.add("valid");
//             if(param4.classList.contains("invalid")){
//                 param4.classList.remove("invalid");
//                 document.getElementById('groupCity').classList.remove("invalid-message");
//             }
//         }
//         if(value5Length){
//             param5.classList.add("invalid");
//             document.getElementById('groupEmail').classList.add("invalid-message");
//         }else if(!value5Length){
//             param5.classList.add("valid");
//             if(param5.classList.contains("invalid")){
//                 param5.classList.remove("invalid");
//                 document.getElementById('groupEmail').classList.remove("invalid-message");
//             }
//         }
//     }//fin if si toute les longueurs = 0

//     else if(!emailValide){
//         param5.classList.add("invalid-email");
//         document.getElementById('groupEmail').classList.add("invalid-message");




//     }else{//si le formulaire est valide on ajoute l'effet visuel pour montrer que les champs sont accepetés et on recupe les info puis on les post
//         if(param1.classList.contains("invalid")){
//             param1.classList.remove("invalid");
//             document.getElementById('groupLastName').classList.remove("invalid-message");
//         }
//         if(param2.classList.contains("invalid")){
//             param2.classList.remove("invalid");
//             document.getElementById('groupFirstName').classList.remove("invalid-message");
//         }
//         if(param3.classList.contains("invalid")){
//             param3.classList.remove("invalid");
//             document.getElementById('groupAddress').classList.remove("invalid-message");
//         }
//         if(param4.classList.contains("invalid")){
//             param4.classList.remove("invalid");
//             document.getElementById('groupCity').classList.remove("invalid-message");
//         }
//         if(param5.classList.contains("invalid")){
//             param5.classList.remove("invalid");
//             document.getElementById('groupEmail').classList.remove("invalid-message");
//         }
//         param1.classList.add("valid");
//         param2.classList.add("valid");
//         param3.classList.add("valid");
//         param4.classList.add("valid");
//         param5.classList.add("valid");


//     // -----------------------------------------------
//         let value1 = param1.value;
//         let value2 = param2.value;
//         let value3 = param3.value;
//         let value4 = param4.value;
//         let value5 = param5.value;
//     //-----------
//         let arrayId=[];
//         for(let i=0; i < localStorage.length; i++){//on push les id des produits
//             let key = localStorage.key(i); 
//             let info = localStorage.getItem(key);
//             let inoSplit = JSON.parse(info);
//             let infoId = inoSplit.id;
//             arrayId.push(infoId);
//         }
//         // console.table(arrayId);


//     //--recuperation des donnée dans un objet java script
//         let data ={
//                 contact :{
//                     firstName: value2,
//                     lastName: value1,
//                     address: value3,
//                     city: value4,
//                     email: value5,
//                     price:getAllPrice()
//                 },
//                 'products':arrayId
//             }

//         // console.log(data);
//         // console.log("contact"+JSON.stringify(data.contact));
//         // console.log(value3);

//         post(data);


//     }
// }

//     //function post----------------------
//     function post(data){
//         fetch('http://localhost:3000/api/cameras/order', {
//             method : "Post",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(data),
//         }) 
//         .then(function(res){
//             if(res.ok){
//                 console.log(res);
//                 return res.json();
//             }       
//         })
//         .then(function(value){

            
//             // console.log("value = "+ value.orderId);
//             // console.log("data contact "+ JSON.stringify(data.contact));

//             localStorage.clear();

//             localStorage.setItem("orderId", value.orderId);
//             localStorage.setItem("contact", JSON.stringify(data.contact));

//             setTimeout(()=>{document.location.href="commandConfirm.html";}, 500);//redirection apres 0.5sec
            
//         })//2dn then
        
//         .catch(function(err){
//             console.log('erreur lors de la requete');

//         })


//     }
