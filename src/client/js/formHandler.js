function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let userUrl = document.getElementById('name').value
    if (Client.validateURL(userUrl)) {
        console.log("url is correct")
        postData('http://localhost:8081/add', { url: userUrl })
            .then(res => {
                document.getElementById('polarity').innerHTML = `Polarity: ${res.score_tag}`;
                document.getElementById("agreement").innerHTML = `Agreement: ${res.agreement}`
                document.getElementById("subjectivity").innerHTML = `Subjectivity: ${res.subjectivity}`;
                document.getElementById("confidence").innerHTML = `Confidence: ${res.confidence}`;
                document.getElementById("irony").innerHTML = `Irony: ${res.irony}`;
            })
    }
    else
        alert("please enter a valid URL!")

}

//post request 
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}




export { handleSubmit }
