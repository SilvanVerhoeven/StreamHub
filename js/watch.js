function getRequestedStream(streams) {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const streamId = urlParams.get('sid')
    return streams.find(stream => stream.id == streamId)
}

function setStreamOnPage(stream) {
    document.title = `${stream.name} – ${streamHubName}`
    document.querySelector("#stream-title").textContent = stream.name
    document.querySelector("#stream-description").textContent = stream.description
    const video = document.querySelector("#stream-video")
    const sources = stream.sources || []
    sources.forEach(streamSource => {
        const source = document.createElement("source")
        source.src = streamSource.url
        source.type = streamSource.type
        video.appendChild(source)
    })
    videojs(video)  // Create Video.js player
}

function createStreamCards(streams) {
    /* Create Cards */
    const streamCardTemplate = document.querySelector(".card-stream-template")
    const streamContainer = document.querySelector("#stream-container")

    streams.forEach(stream => {
        const streamCardWrapper = streamCardTemplate.cloneNode(true)
        streamCardWrapper.classList.remove("card-stream-template")
        const streamCard = streamCardWrapper.querySelector(".card-stream")
        streamCard.querySelector(".card-title").textContent = stream.name
        streamCard.querySelector(".card-text").textContent = stream.description
        streamCard.href = `?sid=${stream.id}`
        streamContainer.appendChild(streamCardWrapper)
    })

    if (streams.length > 0) {
        document.querySelector("#further-streams-section").classList.remove("invisible")
    }

    /* Add mouse events */
    let cards = document.querySelectorAll(".card-stream")
    cards.forEach(card => {
        card.addEventListener("mouseenter", () => card.classList.add("border-primary"))
        card.addEventListener("mouseleave", () => card.classList.remove("border-primary", "bg-light"))
        card.addEventListener("mousedown", () => card.classList.add("bg-light"))
        card.addEventListener("mouseup", () => card.classList.remove("bg-light"))
    });
}

async function populate() {
    const jsonData = await (await fetch('data/data.json')).json()
    streamHubName = jsonData.settings.streamHubName
    const streamOnPage = getRequestedStream(jsonData.streams)
    const furtherStreams = jsonData.streams.filter(stream => stream !== streamOnPage)
    setStreamOnPage(streamOnPage)
    createStreamCards(furtherStreams)
}

let streamHubName = "StreamHub"

populate()