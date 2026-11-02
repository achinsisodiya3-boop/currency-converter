// console.log('one');
// console.log("two");

// set-timeout(()=>{



//     console.log("three");

// },4000);

// console.log("four");

// function getData(DataId) {
//     setTimeout(() => {
//         console.log("data", DataId);
//     }, 2000);
// }

// let promise = new Promise((resolve, reject) => {
//     console.log("promise is pending");
//     reject("some error occurred");
// });

// const getPromise = () => {
//     return new Promise((resolve,_reject) => {
//         console.log("promise is pending");
//         resolve("success");
//     });
// };

// let promise = getPromise();
// promise.then(() => {
//     console.log("promise is fulfilled");
// });


// const URL= "https://api.master-setter.com/"
// // let promise = fetch(URL)
// // console.log(promise)

// const getFacts = async () => {
// console.log("data is loading...")
// let response= await fetch(URL)
// console.log(response);
// // let data= await response.jason()
// // console.log(data);



// }

const BASE_URL ="https://latest.currency-api.pages.dev/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr= document.querySelector(".from select");
const toCurr= document.querySelector(".to select");
const msg = document.querySelector(".msg");
for(let select of dropdowns){
    for(currCode in countryList){
    let newOption=document.createElement("option");
    newOption.innerText=currCode;
    newOption.value=currCode;
    if(select.name=== "from" && currCode=== "USD"  ){
        newOption.selected="selected";
    }else if(select.name==="to"&& currCode==="INR"){
        newOption.selected="selected"
    }
    select.append(newOption); 
    
}
select.addEventListener("change",(evt) =>{
    updateFlag(evt.target);
});
}

const updateFlag= (element) =>{
    let currCode=element.value;
    let countryCode= countryList[currCode];
    let newSrc= `https://flagsapi.com/${countryCode}/flat/64.png`;
let img = element.parentElement.querySelector("img");
img.src=newSrc ; 

};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  const from = fromCurr.value.toLowerCase();
  const to = toCurr.value.toLowerCase();
  const url = `${BASE_URL}/${from}.json`;

  let response = await fetch(url);
  let data = await response.json();
  let rate = data[from][to];

  let finalAmount = (amtVal * rate).toFixed(2);
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
});

