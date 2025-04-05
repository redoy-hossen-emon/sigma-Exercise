let num = Math.random();
let input1 = document.querySelector('#input1');
let input2 = document.querySelector('#input2');
let btn = document.querySelector('button');

var result = 0;
var type = 'right' ;
btn.addEventListener('click', function() {

  if(num < .01){
    result = input1.value +input2.value;
    
  }else{
    result = input1.value+input2.value *num;
    type = 'wrong' ;
    
  }
  let Fresult = Math.round(result)
console.log(Fresult);
console.log(type);
input1.value = '';
input2.value = '';
})
