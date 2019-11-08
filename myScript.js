// JS is done here ↓



    let Title = document.getElementById("Title");
    let TeamNameElement = document.getElementById("TeamName");

    fetch   ("https://codecyprus.org/th/api/list")
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {
        console.log(jsonObject);

            let TreasureHunts = jsonObject.treasureHunts;

           let TreasureHuntslist = document.getElementById("HuntOption");

           for (let i = 0 ; i<TreasureHunts.length; i++){

               var newBrandOption = document.createElement("option");
               TreasureHuntslist.appendChild(newBrandOption);
               newBrandOption.text = TreasureHunts[i].name;



           }











    });







