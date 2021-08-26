let Url = new URLSearchParams(document.location.search.substring(1));
let id = Url.get("id"); 
let product= Url.get("p")
// console.log(id);
let section = document.getElementById('section-product');


function getProduct(param1,param2){
    fetch('http://localhost:3000/api/'+ param1 +'/'+ param2) 
    .then(function(res){
        if(res.ok){
            console.log(res);
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
      
        for(let object of value[valueOption]){
            
            let i =0;
            i ++;
            options +=`
            <input type="radio" id="option${i}" name="option${i}" value="${object}">
            <label for="option${i}">${object}</label>
            
            `;
            console.log(object);
        }


        productTemplate.innerHTML=`
  
            <img  class="pdct-photo" src="${url}" alt="${value.name}">
            <div class="pdct-info  d-flex flex-wrap">
                <h3 class="pdct-name">${value.name}</h3>
                <div class="separator"></div>
                <p class="pdct-description">${value.description}</p>
                
                <div class="pdct-choice-group align-self-end">
                    <p>Selectionnez ${optionName}:</p>
                    ${options}
                </div>

            </div>
            <div class="pdct-command text-center d-flex flex-column justify-content-evenly">
                <h4 class="pdct-price">${price}<strong>€</strong><span>00</span></h4 >

                <div class="command-number d-flex flex-column">
                    <label for="quantites">Number:</label>
                    <input class="input-command" type="number" id="quantites" name="quantites" value="1" min="1" max="100">
                </div>

                <div class="pdct-newPrice">${price}</div>
                <button class="btn btn-primary" type="button"><i class="fas fa-cart-plus"></i></button>
            </div>              
        
        `;
        


        // recuperer les données des inputs
        // verifier les donnée avant l'envois

        section.appendChild(productTemplate);

        // let quantites = document.getElementById('quantites').value;

        // quantites.addEventListener('change', (event) => {
        //     const number = event.target.value
        //     console.log(number);
            
        //   });

        //   quantites.addEventListener('change', updateValue);
        //   function updateValue(e) {
        //     let number = e.target.value;
        //     console.log(number);

        //   }
        // const getNumber = () =>{
        //     console.log(quantites);
            
        // };
        // getNumber();



    
    
    })
    
    .catch(function(err){
        console.log('erreur de fetch');

    })

};


getProduct(product,id);