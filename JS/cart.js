
resumePriceScroll()

let reset = document.getElementById("resetButton");
// console.log(reset);
reset.addEventListener('click',() =>{
    localStorage.clear()
});



/*  recuperer le localstorage,
    si il est vide, on affiche un message que le panier est vide avec un lien qui mene a l'accueil 
    si il ya quelque chose on affiche le tableau   
*/
if( localStorage.length == 0 ){

}
else{


// ---------------------



    let panier = document.createElement('div');
    panier.classList.add('col-md-8','bg-white','table-products');
    let keys = Object.keys(localStorage);
    console.log(keys);
    for(let i =0; i < localStorage.length ; i++ ){
        let key = localStorage.key(i);
        let info = localStorage.getItem(key).split("&");

        console.log(info);//retourne un tableau.
        console.log("|| cle = "+ key +"||objet = "+localStorage.getItem(key));

        
    }

    panier.innerHTML=
    `
    <div class="col-md-8 bg-white table-products">
            
    <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">photo</th>
            <th scope="col">nom</th>
            <th scope="col">description</th>
            <th scope="col">option</th>
            <th scope="col">quantité</th>
            <th scope="col">prix</th>

          </tr>
        </thead>
        <tbody>
         <tr>
            <th scope="row">1</th>
            <td><div class="block-photo"></div></td>
            <td>Mark</td>
            <td></td>
            <td></td>
            <td><input type="number" name="quantite" id="quantite" min="1" max="100">
            </td>
            <td>500</td>

          </tr >
        </tbody>
    </table>

    `;

}











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

