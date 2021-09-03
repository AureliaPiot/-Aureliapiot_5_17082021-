if(localStorage.length > 0){

    let navCart = document.getElementById('nav-cart');
    let nbrInCart = document.createElement('p');
    nbrInCart.classList.add('nbr');
    nbrInCart.textContent = localStorage.length;
    
    navCart.appendChild(nbrInCart);    
    // console.log(navCart);

    window.onstorage =event=>{
        console.log(event);
        console.log(event.returnValue);
        if(event.returnValue == true){
            document.location.reload();
        }

    }



}

