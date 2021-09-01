function resumePriceScroll(){
    
    // let resumePrice = document.getElementById('resume-price');
    // console.log(resumePrice);
    // console.log(document.body.scrollTop);
    // if(document.body.scrollTop<150){
    
    // }

    
	window.addEventListener("scroll", function(){
    let resumePrice = document.getElementById('resume-price').offsetTop;

		// var targetTop = document.getElementById("MonElement").offsetTop,
	let	windowHeight = document.documentElement.clientHeight;/*hauteur de la fenetre*/
    // console.log('hauteur: '+windowHeight);
    console.log('hauteur offset: '+window.pageYOffset);

		
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


resumePriceScroll()