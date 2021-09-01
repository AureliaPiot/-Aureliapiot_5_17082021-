


function inputNumberBtn(){

    let decrementBtn = document.getElementById('decBtn');
    let incrementBtn = document.getElementById('incBtn');
    console.log(document.getElementById('decBtn'));
    console.log(incrementBtn);
    
    function decreaseValue() {
        var value = parseInt(document.getElementById('quantites').value, 10);
        value = isNaN(value) ? 0 : value;
        value < 1 ? value = 1 : '';
        value--;
        document.getElementById('quantites').value = value;
    }
    function increaseValue() {
        var value = parseInt(document.getElementById('quantites').value, 10);
        value = isNaN(value) ? 0 : value;
        value++;
        document.getElementById('quantites').value = value;
    }
   
    decrementBtn.addEventListener('click',function (event){
        decreaseValue();
    });
    incrementBtn.addEventListener('click',function (event){
        increaseValue()
    });
}
