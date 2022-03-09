function createStreamCards(streams) {
    /* Create Cards */
    const streamCardTemplate = document.querySelector(".card-stream-template")
    const streamContainer = document.querySelector("#stream-container")

    streams.forEach(stream => {
        const streamCard = streamCardTemplate.cloneNode(true)
        streamCard.classList.remove("card-stream-template")
        streamCard.classList.add("card-stream")
        streamCard.querySelector(".card-title").innerHTML = stream.name
        streamCard.querySelector(".card-text").innerHTML = stream.description
        streamCard.querySelector(".btn").href = `watch.html?sid=${stream.id}`
        streamContainer.appendChild(streamCard)
    })

    if (streams.length > 0) {
        document.querySelector("#alert-no-stream").classList.add("invisible")
    }
}

async function populate() {
    const jsonData = await (await fetch('data/data.json')).json()
    createStreamCards(jsonData.streams)
}

populate()