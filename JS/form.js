function form(){

    let form = document.createElement('form');
        form.classList.add('col-xxl-8','bg-white','forumlaire-panier')

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
    class Input{
        constructor(element,classe,id,nom,type,placeholder,required,parent){
            this.element = document.createElement(element);
            this.class = classe;
            this.id= id;
            this.name = nom;
            this.type= type; 
            this.placeholder= placeholder;
            this.required= required;
            this.parent=parent;
        }
    }  
    let inputLastName = new Input("input","form-control","lastName","lastName","text","Nom",true,'groupLastName');     
    let inputFirstName = new Input("input","form-control","firstName","firstName","text","Prenom",true,'groupFirstName');
    let inputAddress = new Input("input","form-control","address","address","text","Adresse",true,'groupAddress');    
    let inputCity = new Input("input","form-control","city","city","text","Ville",true,'groupCity');  
    let inputEmail = new Input("input","form-control","email","email","text","email",true,'groupEmail');   

    function CreatElement(object){
        
        object.element.classList.add(object.class);
        object.element.id = object.id;
        object.element.name = object.name;
        object.element.type = object.type;
        object.element.placeholder = object.placeholder;
        object.element.required = object.required;

        document.getElementById(object.parent).appendChild(object.element);
    };

    CreatElement(inputLastName);
    CreatElement(inputFirstName);
    CreatElement(inputAddress);
    CreatElement(inputCity);
    CreatElement(inputEmail);

    let btnForm =document.createElement('button');
    btnForm.classList.add('btn','btn-primary','col-5','mx-auto');
    btnForm.id="form_submit";
    btnForm.innerText="Acheter"
    document.getElementById('fieldset').appendChild(btnForm);

    
 






    btnForm.addEventListener('click',function(event){
    event.preventDefault()

    let lastNameInput = document.getElementsByName("lastName")[0];
    let firstNameInput = document.getElementsByName("firstName")[0];
    let addressInput = document.getElementsByName("address")[0];
    let cityInput = document.getElementsByName("city")[0];
    let emailInput = document.getElementsByName("email")[0]; 

    // console.log(addressInput.parentNode);
    // console.log(lastNameInput.value.length)

    
    formIsValid(lastNameInput,firstNameInput,addressInput,cityInput,emailInput);//validation du formulaire


    })




}

//FormIsValid function----------------------------------------------------------------
function formIsValid(param1,param2,param3,param4,param5){

    //faire un regex: vzrifier si il a au moin une lettre dans les champs

    // Seul regex pour l'email, revois true ou false
    let emailValide = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(param5.value);// test de la structure de l'email (a voir https://regexr.com/3e48o)
    let containALetter = /^([\w]{1,})(.+)$/; // pour obliger au moin UN caractere alphabetique ou chiffre
    // console.log(containALetter.test(param1.value));

    
// si UNE de ces valeur est = 0 alors :
if(param1.value.length == 0||param2.value.length == 0||param3.value.length == 0||param4.value.length == 0||param5.value.length == 0 ||
    !containALetter.test(param1.value) || !containALetter.test(param2.value) || !containALetter.test(param3.value)|| !containALetter.test(param4.value) || !emailValide ){

    verifInputs(param1);
    verifInputs(param2);
    verifInputs(param3);
    verifInputs(param4);
    verifInputs(param5);
    verifInputEmail(param5);

    function verifInputs(param){
    console.log(containALetter.test(param.value));

        if(param.value.length == 0 || containALetter.test(param.value) == false){        
            param.classList.add("invalid");
            param.parentNode.classList.add("invalid-message");   
        }else{
            param.classList.add("valid");
                if(param.classList.contains("invalid")){
                    param.classList.remove("invalid");
                    param.parentNode.classList.remove("invalid-message");
                    
                }
        }
    }
    function verifInputEmail(param){

        if(!emailValide){        
            param.classList.add("invalid");
            param.parentNode.classList.add("invalid-message");   
        }
        else{
            param.classList.add("valid");
            if(param.classList.contains("invalid")){
               console.log("yes");
                param.classList.remove("invalid");
                param.parentNode.classList.remove("invalid-message");
                
            }
        }
    }


       
    // }//fin if si toute les longueurs = 0

    // else if(!emailValide){
    //     param5.classList.add("invalid-email");
    //     document.getElementById('groupEmail').classList.add("invalid-message");




    }else{//si le formulaire est valide on ajoute l'effet visuel pour montrer que les champs sont accepetés et on recupe les info puis on les post

        containinvalide(param1);
        containinvalide(param2);
        containinvalide(param3);
        containinvalide(param4);
        containinvalide(param5);

        param1.classList.add("valid");
        param2.classList.add("valid");
        param3.classList.add("valid");
        param4.classList.add("valid");
        param5.classList.add("valid");

        function containinvalide(param){
            if(param.classList.contains("invalid")){        
                param.classList.remove("invalid");
                param.parentNode.classList.remove("invalid-message");   
            }
        }

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
                    firstName: param2.value,
                    lastName: param1.value,
                    address: param3.value,
                    city: param4.value,
                    email: param5.value,
                    price:getAllPrice()
                },
                'products':arrayId
            }

            // console.log('yes');
        post(data);


    }//fin else
}//fin function formIsValid

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
            return res.json();
        }       
    })
    .then(function(value){



        localStorage.clear();

        localStorage.setItem("orderId", value.orderId);
        localStorage.setItem("contact", JSON.stringify(data.contact));

        setTimeout(()=>{document.location.href="commandConfirm.html";}, 500);//redirection apres 0.5sec
        
    })//2dn then
    
    .catch(function(err){
        console.log('erreur lors de la requete');

    })


}