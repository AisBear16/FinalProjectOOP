const { ipcRenderer } = require('electron');

var btnExit = document.getElementById('btnExit');
var btnGroceries = document.getElementById('btnGroceries');

btnExit.addEventListener('click', function(){ //button to exit application
    var choice = confirm("Do you want to exit?"); //confirmation dialogue box before exiting application
    if( choice == true ) {
        window.close();
        return true;
    } else {
        return false;
    }
});

btnGroceries.addEventListener('click', function(){ //button to open CRUD page from main page
    var addWindow;

    ipcRenderer.send('newWindow', addWindow); 
});

function buttonClicked(){ //function to search recipe from API link based on value entered
    var meals = document.getElementById("food").value;
  
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meals}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data); //output the API into console.
        console.log("Recipe name: " + data.meals[0].strMeal);
        console.log("Recipe category: " + data.meals[0].strCategory);
        console.log("Recipe origin: " + data.meals[0].strArea);
        console.log("Recipe instructions: " + data.meals[0].strInstructions);

        //display output at main page after data found
        document.getElementById('display').innerHTML="Recipe name: " + data.meals[0].strMeal + "<br/>";
        document.getElementById('display').innerHTML+="Recipe category: " + data.meals[0].strCategory + "<br/>"; 
        document.getElementById('display').innerHTML+="Recipe origin: " + data.meals[0].strArea + "<br/>";
        document.getElementById('display').innerHTML+="Ingredients: <br/> ";

        for (var i = 9; i < 29; i++){//for loop to display ingredients
            if (Object.values(data.meals[0])[i] != "" && Object.values(data.meals[0])[i] != null){
                document.getElementById('display').innerHTML+="- " + Object.values(data.meals[0])[i+20] + " " + Object.values(data.meals[0])[i] + "<br/>";
            }
        }
        document.getElementById('display').innerHTML+="<br/><center>Watch cooking tutorial and instruction below: <br/>" + data.meals[0].strYoutube;
        document.getElementById('display').scrollIntoView(); //windows views display after recipe found
    })
}