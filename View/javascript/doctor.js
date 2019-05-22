// fetch('/login')
// .then(response => {
//     // console.log(response.json());
//     console.log(response.text());
//     response.text();
//     // console.log(JSON.parse(response));
// })
// .then(data => {
//   console.log(data); // Prints result from `response.json()` in getRequest
// })
// .catch(error => console.error(error));
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

  fetch('http://localhost:3000/login', {
    headers: {
      'Content-Type': 'application/json',
        'Accept': 'application/json; odata=verbose'
    }
  })
  .then((response) => {
    console.log(response);
    console.log(response.text());
    // response.text()
  })
  .then((messages) => {console.log(messages);})
  .catch((err) => console.log(err));
