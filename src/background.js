let url = null;
const REGEX = /^https?:\/\/(?:www\.)?twitch\.tv\/(\w+)\/?(?:\?.*)?$/
const IGNORED = [
    'settings',
    'payments',
    'inventory',
    'messages',
    'subscriptions',
    'friends',
    'directory',
    'videos',
    'prime'
]

let interval

chrome.tabs.onActivated.addListener(e => {
    updateWatching()
})

chrome.tabs.onUpdated.addListener(e => {
    updateWatching()
})

chrome.runtime.onMessage.addListener((req, sender, res) => {
    switch (req.action) {
        case "nativeMessage":
            console.log(req.data);
            sendNativeMessage(req.data)
            break;
    }
})

async function updateWatching() {
    let active = (await chrome.tabs.query({active:true, currentWindow: true}))[0]
    if (!active) return; // nullcheck
    if (active.url == url) return; // url has not changed, do not sent new message

    url = active.url

    const match = url.match(REGEX)
    if(!match) {
        stopPing();
        return
    }
    if(IGNORED.includes(match[1].toLowerCase())) return;
    startPing();

    sendNativeMessage({
        action: "attach",
        data: match[1]
    })
}

function detach() {
    sendNativeMessage(
        {
            action: "detach",
            data: null
        }
    )
}

function startPing() {
    interval = setInterval(() => {
        sendNativeMessage({
            action: "ping",
            data: null
        })
    }, 3000);
}

function stopPing() {
    clearInterval(interval)
}

function sendNativeMessage(message) {
    console.log(message);
    chrome.runtime.sendNativeMessage("com.2547techno.technorino", message, p => {
        console.log("response");
        console.log(chrome.runtime.lastError.message); // print last error to get rid of exception
    })
}