import { frequencyData } from './MK-dict.js';
const letters = ['А', 'Б', 'В', 'Г', 'Д', 'Ѓ', 'Е', 'Ж', 'З', 'Ѕ', 'И', 'Ј', 'К', 'Л', 'Љ', 'М', 'Н', 'Њ', 'О', 'П', 'Р', 'С', 'Т', 'Ќ', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Џ', 'Ш'];

// Generates a simple chart and percentage field for each letter
function updateTable(frequencyType, thNums) {
    const textFrequency = frequencyData?.[frequencyType] || frequencyType;

    const thElements = document.querySelectorAll(`.table-container table tr:nth-child(${thNums[0]}) th`);
    const thPercentElements = document.querySelectorAll(`.table-container table tr:nth-child(${thNums[1]}) th`);

    thElements.forEach((th, index) => {
        if (index < letters.length) { 
            const letter = letters[index]; 
            const frequency = textFrequency[letter]; 
            const thPercent = thPercentElements[index];

            if (frequency !== undefined) {
                const percentage = frequency * 6;
                th.style.background = `linear-gradient(to top, #00695c ${percentage}%, transparent ${percentage}%)`;
                thPercent.innerHTML = frequency.toFixed(3);
                thPercent.style.fontSize = "10px";
            }
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    updateTable('textFrequency', [1, 2]);

    const analysisType = document.getElementById("analysisType");
    const analysisButton = document.getElementById("analysisButton");
    const swapButton = document.getElementById("swapButton");

    // Updates the table based on the dropdown values
    analysisType.addEventListener("change", function () {
        updateTable(analysisType.value, [1, 2]);
    });

    // For each letter in input text adds up the occurances, calculates the percentage and updates the table
    analysisButton.addEventListener("click", function() {
        const inputText = String(document.getElementById("inputText").value);
        const letterFrequencies = new Map();
        const totalLength = inputText.length;
    
        letters.forEach((letter) => {
            let frequency = 0;
    
            for (let i = 0; i < totalLength; i++) {
                if (inputText[i] === letter) {
                    frequency++;
                }
            }

            const frequencyPercentage = (frequency / totalLength) * 100;
            letterFrequencies.set(letter, frequencyPercentage);
        });
    
        const letterFrequenciesJson = Object.fromEntries(letterFrequencies);
        updateTable(letterFrequenciesJson, [6,5]);
    });

    // Turns the the input text into '*' characters if unknown otherwise the set table letter entry
    swapButton.addEventListener("click", function() {
        const inputText = String(document.getElementById("inputText").value);
        const tds = document.querySelectorAll('.table-container table tr td input');
        
        let outputText = "";
    
        for (let i = 0; i < inputText.length; i++) {
            let char = inputText[i];
            const letterIndex = letters.indexOf(char.toUpperCase());
            
            if (letterIndex !== -1) {
                const inputField = tds[letterIndex];
                
                if (inputField) {
                    const inputValue = inputField.value.trim();
                    
                    if (inputValue === "") {
                        outputText += "*";
                    } else {
                        outputText += inputValue;
                    }
                } else {
                    outputText += "*";
                }
            } else {
                outputText += char;
            }
        }
    
        document.getElementById("outputText").value = outputText;
    });
    

});

