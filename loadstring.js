function loadstring(url) {
    fetch(url)
        .then(test => test.text())
        .then(receive => {
            let script = document.createElement("script");
            script.innerHTML = receive;
            document.body.appendChild(script);
        })
        .catch(error => console.error('Error: This script is failed to load. The error code is:', error));
}
