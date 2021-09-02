// console.log('ici?');

let reset = document.getElementById("resetButton");
reset.addEventListener('click',() =>{
    localStorage.clear()
});

const section = document.getElementById('section-product');
// console.log(section);

/*  recuperer le localstorage,
    si il est vide, on affiche un message que le panier est vide avec un lien qui mene a l'accueil 
    si il ya quelque chose on affiche le tableau   
*/
if( localStorage.length == 0 ){
//affiche un message
}

else{
    creationDuTableau();
    resumePriceScroll();
// ---------------------


}//fin else

//declaration des fonctions____________________________________________________________________________________________________________

//afficahge dans la nav----------------------------------------------------------------


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
        let price = value.price / 100; 
        // console.log(price+ "€");
        
        let optionName = ``;
        let valueOption = "";
        switch (param1){
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
        // console.log(optionName);


        let options = ``;
        
        for( let i= 0; i< value[valueOption].length; i++ ){//la c'est pour les options
            
        // console.log("valeur de l'option " + value[valueOption]);
 
            if(i== param3){ //on compare la valeur, si elle correspond a celle en position = a param3 (donc a 0 = 1er tour  (0=i), ou a 1 = 2nd tour(i=1))
                // (value[valueOption][i]== value[valueOption][param3]){  possible avec cette ecriture

                options +=`<option value="${value[valueOption][i]}" selected>${value[valueOption][i]}</option>`;
            // console.log("valeur de l'option check " + value[valueOption][i]);

            }else{
                options +=`<option value="${value[valueOption][i]}">${value[valueOption][i]}</option>`;
            // console.log("valeur de l'option PAS check " + value[valueOption][i] +" comparer a " + value[valueOption][param3]);
            }
        }//fin de boucle for option

        let tbody = document.getElementById('productSpace');

            let tr= document.createElement('tr');

            let tdImg= document.createElement('td');
                tdImg.innerHTML=`<img  class="block-photo" src="${url}" alt="${value.name}">`;

            let tdName= document.createElement('td');
                tdName.innerHTML=`${value.name}`;

            let tdDescription= document.createElement('td');
                tdDescription.innerHTML=`${value.description}`;    

            let tdOptions= document.createElement('td');
                tdOptions.innerHTML=`<select id="option-select">${options}</select>`;
                
            let tdInputNumber= document.createElement('td');
                tdInputNumber.innerHTML=`<input type="number" name="quantite" id="quantite" min="1" max="100" value="${param4}">`;

            let tdPrice= document.createElement('td');
                tdPrice.innerHTML=`${price}€00`;

            let tdButtonSuppr= document.createElement('td');
                tdButtonSuppr.innerHTML=`<button id="supprItem${param5}"  class="btn btn-primary btn-achat btn-supprItem"  >Suppr</button>`;

            tr.appendChild(tdImg);
            tr.appendChild(tdName);
            tr.appendChild(tdDescription);
            tr.appendChild(tdOptions);
            tr.appendChild(tdInputNumber);
            tr.appendChild(tdPrice);
            tr.appendChild(tdButtonSuppr);

            tbody.appendChild(tr);
            
            tdButtonSuppr.addEventListener('click',function(){
                // alert('a bon ?'+param5);
                // console.log('element ° '+param5+' supprimer du localStorage');

                // localStorage.removeItem(param5);
                supprItem(param5);
            })

            tdInputNumber.addEventListener('change', (event) => {
                const number = event.target.value;
                let newPrice = price * number;
                let blockNewPrice = tdPrice;
                blockNewPrice.textContent= newPrice+".00€";
            });


                
        

        return


    })//2dn then
    
    .catch(function(err){
        console.log('erreur de fetch');

    })
    return
};//fin getProductCart


// supprItem function----------------------------------------------------------------
 function supprItem(param1){
     console.log("item "+param1);
     alert('etes-vous sur?')
    //  localStorage.removeItem(param1);

};



// scroll function----------------------------------------------------------------
function resumePriceScroll(){
	window.addEventListener("scroll", function(){

    // recuperer la hauteur par rapport au margine de la fenetre
	// let	windowHeight = document.documentElement.clientHeight;/*hauteur de la fenetre*/
    // console.log('hauteur: '+windowHeight);
    
    // console.log('hauteur offset: '+window.pageYOffset);

		
		// if (window.pageYOffset + windowHeight >= resumePrice ) {
		if (window.pageYOffset > 150 /*&& window.pageYOffset < 700*/ ) {
            document.getElementById('resume-price').classList.add("scroll");
		}
        else{
            document.getElementById('resume-price').classList.remove("scroll");
            // document.getElementById('resume-price').style.top =window.pageYOffset + "px";
            // recuperer la hauteur du formulaire pour la donnée comme limite au bloc de prix

        }
	}, false);
}
// console.log("ici?"); 
