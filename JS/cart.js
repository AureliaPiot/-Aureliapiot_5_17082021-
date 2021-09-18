// console.log('ici?');
const section = document.getElementById('section-product');

//verification si le serveur est allumer----------------------------------------------------------------

const verifFetch =
    
    fetch('http://localhost:3000/api/cameras') 
    .then(function(res){
        // console.table(res);
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
        console.log(err);
        serverInaccessible()
        //dans le fichier navCart
    });

    // console.table(verifFetch);   
    

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

// GET PRODUCT TEST

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
        // console.log('erreur de fetch | aucun produit trouvé | merci de demarer le server');

    })
    return
};//fin getProductCart



// refresh function----------------------------------------------------------------
function refresh(){
   document.location.reload();
   
}


// supprItem function----------------------------------------------------------------
 function supprItem(param1){
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