/********* create variables *********/
// useful variables might be: the cost per day, the number of days selected, and elements on the screen that will be clicked or will need to be modified. 
// Do any of these variables need to be initialized when the page is loaded? 
// When do they need to be reset or updated?
let calculatedCostElement = document.getElementById("calculated-cost");
let initialCalulation = true;
let fullDayCost = 35;
let halfDayCost = 20;
let costRate = 0;
let selectedDaysSet = new Set();
let dayCounter = 0;

if (initialCalulation === true){
    costRate = fullDayCost;
    initialCalulation = false;
    calculateCost();
}


/********* colour change days of week *********/
// when the day buttons are clicked, we will apply the "clicked" class to that element, and update any other relevant variables. Then, we can recalculate the total cost.
// added challenge: don't update the dayCounter if the same day is clicked more than once. hint: .classList.contains() might be helpful here!

function addDayToSelection(dayElement) {
    let dayId = dayElement.id;
    if (!selectedDaysSet.has(dayId)) {
        selectedDaysSet.add(dayId);
        dayElement.classList.add("clicked");
        dayCounter++;
    } else {
        selectedDaysSet.delete(dayId);
        dayElement.classList.remove("clicked");
        dayCounter--;
    }
    calculateCost();
}
document.querySelector(".day-selector").addEventListener("click", function(event) {
    if (event.target && event.target.tagName === 'LI') {
        addDayToSelection(event.target);
    }
});

/********* clear days *********/
// when the clear-button is clicked, the "clicked" class is removed from all days, any other relevant variables are reset, and the calculated cost is set to 0.

document.getElementById("clear-button").addEventListener("click", function(){
    selectedDaysSet.forEach(function(dayId) {
        let dayElement = document.getElementById(dayId);
        dayElement.classList.remove("clicked");
    });
    selectedDaysSet.clear();
    dayCounter = 0;
    document.getElementById("full").classList.add("clicked");
    document.getElementById("half").classList.remove("clicked");
    costRate = fullDayCost;
    calculateCost();
});






/********* change rate *********/
// when the half-day button is clicked, set the daily rate to $20, add the "clicked" class to the "half" element, remove it from the "full" element, and recalculate the total cost.



document.getElementById("half").addEventListener("click", function(){
    document.getElementById("half").classList.add("clicked");
    document.getElementById("full").classList.remove("clicked");
    costRate = halfDayCost;
    console.log('rate changed to half');
    calculateCost();
});




// when the full-day button is clicked, the daily rate is set back to $35, the clicked class is added to "full" and removed from "half", and the total cost is recalculated.

document.getElementById("full").addEventListener("click", function() {
    document.getElementById("full").classList.add("clicked");
    document.getElementById("half").classList.remove("clicked");
    costRate = fullDayCost;
    console.log('rate changed to full');
    calculateCost();
});





/********* calculate *********/
// when a calculation is needed, set the innerHTML of the calculated-cost element to the appropriate value

function calculateCost() {
    console.log("calculation start");
    let totalCost = costRate * dayCounter;
    calculatedCostElement.innerHTML = totalCost;
}
