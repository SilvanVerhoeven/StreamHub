function setPage() {
    document.title = streamHubName
}

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
        const video = streamCard.querySelector(".video-js")
        const sources = stream.sources || []
        sources.forEach(streamSource => {
            const source = document.createElement("source")
            source.src = streamSource.url
            source.type = streamSource.type
            video.appendChild(source)
        })
        streamContainer.appendChild(streamCard)
        videojs(video)  // Create Video.js player
    })

    if (streams.length > 0) {
        document.querySelector("#alert-no-stream").classList.add("invisible")
    }
}

async function populate() {
    const jsonData = await (await fetch('data/data.json')).json()
    streamHubName = jsonData.settings.streamHubName
    createStreamCards(jsonData.streams)
}

let streamHubName = "StreamHub"

populate()