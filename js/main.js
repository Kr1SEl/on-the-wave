function injectHeader(){
    fetch('/Yachting/components/shared/header.html')
        .then(response => response.text())
        .then(data => document.getElementById('header').innerHTML = data);
}

function injectFooter(){
    fetch('/Yachting/components/shared/footer.html')
        .then(response => response.text())
        .then(data => document.getElementById('footer').innerHTML = data);
}

document.addEventListener('DOMContentLoaded', () => {
    injectHeader();
    injectFooter();
});
