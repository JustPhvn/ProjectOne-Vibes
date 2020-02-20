
$("#submit").on("click", function(){

// first add then if
    var sum = 0;

    $(".radio:checked").each(function(){ 
        sum += +this.value;
    
});
console.log(sum);
    if (sum > 1 ) {
       
   // // run kanye 
    }
    else {
         // run trump
    }
    
});

4("#restart").on("click", function(){
    $("#quest").attr("style", "display: block");
});