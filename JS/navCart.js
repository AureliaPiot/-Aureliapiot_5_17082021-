let navCart = document.getElementById('nav-cart');
let nbrInCart = document.createElement('p');
nbrInCart.classList.add('nbr');

if(localStorage.length == 0 || localStorage.key(0) == "contact" || localStorage.key(0) == "orderId"){

    nbrInCart.textContent = 0;
}

else{

    nbrInCart.textContent = localStorage.length;    
}

navCart.appendChild(nbrInCart);    
// console.log(navCart);

window.onstorage =event=>{
    console.log(event);
    console.log(event.returnValue);

    if(event.returnValue == true){
        document.location.reload();
    }

}
// _________________________________________________________________

