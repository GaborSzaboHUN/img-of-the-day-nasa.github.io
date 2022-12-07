
const sectionElement = function (imageSource, mediaType, imageTitle, explanation, photographer) {
    return `    	
    <h1>Astronomy Picture of the Day</h1>

    <div class="image-details-container">

        <article class="image-section grid-col-spam-2">
            <a target="_blank" href="${imageSource}"><i class="fa-solid fa-expand"></i></a>
            ${mediaType}
        </article>

        <article class="details">
            <h2>${imageTitle}</h2>
            <p class="copyright">&copy ${photographer}</p>
        </article>

        <article class="details grid-col-spam-3">
            <h3 class="subtitle">Explanation:</h3>
            <p class="explanation">${explanation}</p>
        </article>
    </div>
    `
}

const apiKey = "EW6Hy9qkZSugVxOoiKpI1m4XnQOPtaFmG9IRgUrW"


const loadEvent = async function () {
    const rootElement = document.getElementById("root")
    /* 
        fetch("https://api.nasa.gov/planetary/apod?api_key=1jBfMgdoLIlPKKS2u09Q5cWSgKmUwMZ7ur4JV2Rr")
            .then(function (response) {
                console.log(response)
                return response.json()
            })
            .then(function (json) {
                console.log(json)
                rootElement.insertAdjacentHTML("beforeend", sectionElement(json.hdurl, json.title, json.date, json.explanation, json.copyright))
            })
     */


    const today = new Date()
    const todayDate = today.getFullYear() + "-" + (today.getMonth() + 1).toString().padStart(2, 0) + "-" + (today.getDate()).toString().padStart(2, 0);
    console.log(todayDate)

    let selectedDate = todayDate


    let response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${selectedDate}`)
    let responseJson = await response.json()

    console.log("response: ", response)
    console.log("responseJson: ", responseJson)
    console.log("responseJson.date: ", responseJson.date)


    // ------ if photographer name is undefined 

    const authorNameDisplay = function () {
        let authorName;
        if (responseJson.copyright === undefined) {
            authorName = "Unknown author"
        } else {
            authorName = responseJson.copyright
        }
        return authorName
    }

    // ------ image vs video

    const mediaTypeDisplay = function () {
        if (responseJson.media_type === "image") {
            return `
                <img src=${responseJson.hdurl} alt="Image of the day from NASA">
            `
        } else {
            return `
                <iframe src=${responseJson.url} width="100%" height=357px title="Video of the day from NASA"></iframe>
                `
        }
    }


    // ------ Link to original
    const linkToOriginal = function () {
        if (responseJson.media_type === "image") {
            return responseJson.hdurl
        } else {
            return responseJson.url
        }
    }


    rootElement.insertAdjacentHTML("beforeend", sectionElement(linkToOriginal(), mediaTypeDisplay(), responseJson.title, responseJson.explanation, authorNameDisplay()))

    console.log("JSON", responseJson.date)
    console.log("selectedDate", todayDate)












    rootElement.insertAdjacentHTML("beforebegin", `
    <div class="date-section">
        <h3 class="subtitle">Select a date:</h3>
        <input class="date" type="date" id="myDate" min="2015-01-01" max=${selectedDate} value="${selectedDate}">
    </div>
    `)

    let calendar = document.querySelector("#myDate")
    console.log(calendar)

    let chosenDate;
    calendar.addEventListener("input", async function (event) {
        chosenDate = event.target.value

        let response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${chosenDate}`)
        let responseJson = await response.json()


        // ------ if photographer name is undefined 

        const authorNameDisplay = function () {
            let authorName;
            if (responseJson.copyright === undefined) {
                authorName = "Unknown author"
            } else {
                authorName = responseJson.copyright
            }
            return authorName
        }

        // ------ image vs video

        const mediaTypeDisplay = function () {
            if (responseJson.media_type === "image") {
                return `
                    <img src=${responseJson.hdurl} alt="Image of the day from NASA">
                `
            } else {
                return `
                    <iframe src=${responseJson.url} width="100%" height=357px title="Video of the day from NASA"></iframe>
                `
            }
        }
        console.log("mediaTypeDisplay: ", mediaTypeDisplay())
        console.log("response: ", response)
        console.log("responseJson: ", responseJson)
        console.log("responseJson.date: ", responseJson.date)


        // ------ Link to original
        const linkToOriginal = function () {
            if (responseJson.media_type === "image") {
                return responseJson.hdurl
            } else {
                return responseJson.url
            }
        }

        rootElement.innerHTML = sectionElement(linkToOriginal(), mediaTypeDisplay(), responseJson.title, responseJson.explanation, authorNameDisplay())

    })

}
window.addEventListener("load", loadEvent)





/*Before window.addeventlistener
    // Create updating date
    const calendar = document.querySelector("#myDate");
    calendar.addEventListener("submit", function (event) {
        event.preventDefault()
    })
    
    let chosenDate;
    calendar.addEventListener("input", async function (event) {
        chosenDate = event.target.value
        console.log("függvényen belül", chosenDate)
    })
    
    console.log("chosenDate: ", chosenDate)
 */


















/* 
    https://stackoverflow.com/questions/9989382/how-can-i-add-1-day-to-current-date
    var current = new Date(); //'Mar 11 2015' current.getTime() = 1426060964567
    console.log(current)
    var followingDay = new Date(current.getTime() + 86400000); // + 1 day in ms
    console.log(followingDay)
    followingDay.toLocaleDateString();
 */