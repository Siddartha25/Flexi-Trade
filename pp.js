var month=new Date().getUTCMonth() + 1;
var day=new Date().getUTCDate();
var year=new Date().getUTCFullYear();

console.log(month)
console.log(year)
console.log(day)
console.log((new Date(year,month,day+3)));


// const successCallback = (position) => {
//     console.log(position);
//   };
  
//   const errorCallback = (error) => {
//     console.log(error);
//   };
  
//   navigator.geolocation.getCurrentPosition(successCallback, errorCallback);


  if(window.navigator.geolocation) {
    window.navigator.geolocation.getCurrentPosition(console.log, console.log);

   } 