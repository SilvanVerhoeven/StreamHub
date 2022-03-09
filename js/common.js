function populatePlayer(video, stream) {
    const parent = video.parentNode
    setTimeout(() => parent.style.opacity = 1, 1)
    if (!stream) return

    const sources = stream.sources || []
    sources.forEach(streamSource => {
        const source = document.createElement("source")
        source.src = streamSource.url
        source.type = streamSource.type
        video.appendChild(source)
    })
    videojs.hook("error", (player, error) => {
        const parent = player.el_.parentNode
        const hasOfflineUI = parent.querySelector(".stream-offline")
        if (hasOfflineUI || error.code !== 4) return  // hook was called multiple times in a row, we always return after the first

        const offlinePlaceholder = document.createElement("div")
        offlinePlaceholder.classList.add("stream-offline")
        offlinePlaceholder.innerHTML = `
            <div>
                Offline
            </div>
        `
        player.el_.style.display = "none"
        parent.insertBefore(offlinePlaceholder, player.el_)

        // We cannot dispose player immediately, this may raise errors after we leave this hook
        setTimeout(() => player.dispose(), 5)
    })
    // Create Video.js player
    videojs(video, {
        liveui: true
    })
}

let settings = {}
let config = {}

async function init() {
    const jsonData = await (await fetch('data/data.json')).json()
    settings = jsonData.settings
    config = jsonData

    document.title = settings.streamHubName
    initPage()
}

init()
