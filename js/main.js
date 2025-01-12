async function injectHeader(){
    const headerContainer = document.getElementById('header');
    try {
        const response = await fetch('/on-the-wave/components/shared/header.html');
        if (response.ok) {
            headerContainer.innerHTML = await response.text();
            injectNavbar();
        } else {
            console.error('Failed to load header:', response.statusText);
        }
    } catch (error) {
        console.error('Error loading header:', error);
    }
}

function injectNavbar(){
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (navbar){
            if (window.scrollY > 10) {
                navbar.classList.remove('navbar-transparent');
                navbar.classList.add('navbar-solid');
            } else {
                navbar.classList.remove('navbar-solid');
                navbar.classList.add('navbar-transparent');
            }
        }
    });
}

function injectFooter(){
    fetch('/on-the-wave/components/shared/footer.html')
        .then(response => response.text())
        .then(data => document.getElementById('footer').innerHTML = data);
}

function injectFooter() {
    fetch('/on-the-wave/components/shared/footer.html')
        .then(response => response.text())
        .then(data => document.getElementById('footer').innerHTML = data);
}

document.addEventListener('DOMContentLoaded', () => {
    injectHeader();
    injectFooter();
    injectNavbar();
});


