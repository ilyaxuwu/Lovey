function loadstring(url) {
  let script = document.createElement("script"); 
  script.src = url; 
  document.body.appendChild(script);
}
