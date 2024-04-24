// javascript purely for the navbar button icons, didnt manage to do it without this
document.getElementById('toggleNavbar').addEventListener('click', function(){
    let navbar = document.querySelector('.navbar');
    let navButton = document.querySelector('.navigationText');
    navbar.classList.toggle('expanded');
    if(navbar.classList.contains('expanded')){
        navButton.classList.remove('hamburger-icon');
        navButton.classList.add('close-icon');
        navButton.innerHTML = "&#10005;"
    } else {
        navButton.classList.remove('close-icon');
        navButton.classList.add('hamburger-icon');
        navButton.innerHTML = "&#9776;";
    }
});
