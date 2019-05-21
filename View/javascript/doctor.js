fetch('./date')
.then(response => {
    console.log(response);
    // console.log(response);
    return response.json();
})
.then(data => {
  console.log(data); // Prints result from `response.json()` in getRequest
})
.catch(error => console.error(error));
// var request = new XMLHttpRequest();
// request.open('GET', 'http://localhost:3000/date', true);
// request.onload = function () {
//     if(response.status>=200 && response.status<400){
//     var data = JSON.parse(this.response);
//     console.log(data);
//     }
//     else console.log('error');
// }
// request.send();

