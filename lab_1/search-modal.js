import { mkDict } from './MK-dict.js';

// Simple modal setup
var modal = document.getElementById("searchModal");
var openModalBtn = document.getElementById("openSearchModalBtn");
var closeBtn = document.getElementById("closeSearchBtn");

closeBtn.onclick = function() {
    modal.style.display = "none";
}

openModalBtn.onclick = function() {
    modal.style.display = "flex";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Filtering the regular exp. pattern to find macedonian words
function searchDict(pattern) {
    const regex = new RegExp('^' + pattern + '$');
  
    const results = mkDict.filter(word => regex.test(word));
    
    return results.join(', ');
}
document.getElementById('runButton').addEventListener('click', function() {
    const resultField = document.getElementById("resultField");

    if (resultField) {
        const inp = document.getElementById("searchInput").value;
        console.log(inp)
        resultField.textContent = searchDict(inp);
    } else {
        resultField.innerHTML = "Нема Резултати...";
    }
});
