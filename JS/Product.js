let Url = new URLSearchParams(document.location.search.substring(1));
let id = Url.get("id"); 
console.log(id);
//document.location.search = recupere l'url a partir de "?" | et substring(1) retire un caractere donc le "?" 



function getProduct(){
    fetch('http://localhost:3000/api/?=_id') 
}