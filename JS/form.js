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

        // console.log(object.element);
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

    console.log(cityInput.length)
    console.log(addressInput)


    
    formIsValid(lastNameInput,firstNameInput,addressInput,cityInput,emailInput);//validation du formulaire


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
                    price:getAllPrice()
                },
                'products':arrayId
            }

        post(data);


    }
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