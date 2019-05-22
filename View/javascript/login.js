const formToJSON = elements => [].reduce.call(elements, (data, element) => {
    if (isValidElement(element)) {
        data[element.name] = element.value;
    }
    return data;
}, {});

const isValidElement = element => {
    return element.name && element.value;
}

const handleFormSubmit = event => {
    // opreste formularul din a submite datele atata timp cat le prelucram prin ajax
    event.preventDefault();

    //ia datele din formular
    const data = formToJSON(form.elements);
    //console.log(data);
    // transmitele datele ca un obiect JSON
    const dataContainer = document.getElementsByClassName('signUpForm')[0];

    // sa faca outputul valid
    dataContainer.textContent = JSON.stringify(data, null, " ");
    sendPost(dataContainer.textContent);
        // .then(data => {
        //     // data = JSON.stringify(data);
        //     console.log(data)})
        // .catch(error => {
        //             console.error(error)
        //         });
    //console.log(dataContainer);
    //seeStatus();
};
const form = document.getElementsByClassName('signUpForm')[0];
form.addEventListener('submit', handleFormSubmit);
function sendPost(data) {
    console.log(data);
    return fetch('/login', {
        method: "POST",
        // mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json; odata=verbose'

        },
        redirect: "follow",
        referrer: "no-refferer",
        body: data
    })
        .then((res) => {
            // data=res.json;
            // data=res.clone.text();
            // console.log(res.text());
            // console.log(data);
            return res.text();
        })
        .then((data) => {
            // data=res.json();
            console.log(JSON.parse(data));
            console.log(data)
        })
        .catch((err) => console.log(err))
}