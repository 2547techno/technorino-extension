document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("detach").addEventListener("click", detach);
});

function detach() {
    chrome.runtime.sendMessage({
        action: "nativeMessage",
        data: {
            action: "detach",
            data: null
        }
    })
}