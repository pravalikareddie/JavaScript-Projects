const currency1=document.querySelector("#currency-one");
const currency2=document.querySelector("#currency-two");
const currencyValue1=document.querySelector("#currency1");
const currencyValue2=document.querySelector("#currency2");
const swap=document.querySelector("#swap");
const result=document.querySelector("#result");
converter=()=>{
    
    let currency_one=currency1.value;
    let currency_two=currency2.value;
    let currency_one_input=currencyValue1.value;
    let currency_two_input=currencyValue2.value;


    fetch("https://v6.exchangerate-api.com/v6/677768d3ed807139951efa4c/latest/"+currency_one,{
        "Access-Control-Allow-Origin":"*",
        "content-type":"application/json"
    }).
    then((result)=>result.json()).
    then((response)=>{
        console.log(response);
        let value=  response.conversion_rates[currency_two];
        result.innerHTML=   ` 1 ${currency_one} = ${value} ${currency_two}`
        currencyValue2.value=(value*currency_one_input).toFixed(2);
    
    });
}

swapValues=()=>{
    let temp=currency1.value;
    currency1.value=currency2.value;
    currency2.value=temp;
    converter();
}

currency1.addEventListener("change",converter);
currency2.addEventListener("change",converter)
currencyValue1.addEventListener("input",converter)
currencyValue2.addEventListener("input",converter)
swap.addEventListener("click",swapValues)

