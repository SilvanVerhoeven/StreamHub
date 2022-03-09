function createStreamCards(streams) {
    const streamCardTemplate = document.querySelector(".card-stream-template")
    const streamContainer = document.querySelector("#stream-container")

    streams.forEach(stream => {
        const streamCard = streamCardTemplate.cloneNode(true)
        streamCard.classList.remove("card-stream-template")
        streamCard.classList.add("card-stream")
        streamCard.querySelector(".card-title").innerHTML = stream.name
        streamCard.querySelector(".card-text").innerHTML = stream.description
        streamCard.querySelector(".btn").href = `watch.html?sid=${stream.id}`
        const video = streamCard.querySelector(".video-js")
        streamContainer.appendChild(streamCard)
        populatePlayer(video, stream)
    })
}

function initPage() {
    if (config.streams.length === 0) {
        document.querySelector("#alert-no-stream").classList.add("show")
    }

    createStreamCards(config.streams)
}
