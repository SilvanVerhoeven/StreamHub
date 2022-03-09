function getRequestedStream(streams) {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const streamId = urlParams.get('sid')
    return streams.find(stream => stream.id == streamId)
}

function setStreamOnPage(stream) {
    if (!stream) return
    document.title = `${stream.name} – ${settings.streamHubName}`
    document.querySelector("#stream-title").textContent = stream.name
    document.querySelector("#stream-description").textContent = stream.description
    const video = document.querySelector("#stream-video")
    populatePlayer(video, stream)
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

    /* Add mouse events */
    let cards = document.querySelectorAll(".card-stream")
    cards.forEach(card => {
        card.addEventListener("mouseenter", () => card.classList.add("border-primary"))
        card.addEventListener("mouseleave", () => card.classList.remove("border-primary", "bg-light"))
        card.addEventListener("mousedown", () => card.classList.add("bg-light"))
        card.addEventListener("mouseup", () => card.classList.remove("bg-light"))
    });
}

function initPage() {
    const streamOnPage = getRequestedStream(config.streams)
    const furtherStreams = config.streams.filter(stream => stream !== streamOnPage)
    setStreamOnPage(streamOnPage)
    createStreamCards(furtherStreams)

    if (config.streams.length > 0) {
        document.querySelector("#further-streams-section").classList.remove("invisible")
    }
}
