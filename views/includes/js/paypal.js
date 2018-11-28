// Get the js assigned to this pricing
var modal = document.getElementById('initialjs');

// Get the button that opens the popup
var btn = document.getElementById("initial");

// Get the button to cancel the transaction
var close = document.getElementsByClassName("close")[0];

// When the user clicks on the button, call the initjs
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on cancel close popup
close.onclick = function() {
    modal.style.display = "none";
    window.location.hash = '#pricing';
}

// When the user clicks anywhere outside of the popup close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}