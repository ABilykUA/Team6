// JS is done here ↓

// This is just an example we have to change this ↓ //
    function Output() {

        let output = document.getElementById("test");
        let TeamNameElement = document.getElementById("TeamName");
        let NameElement = document.getElementById("Name");

        let TeamNamevalue = TeamNameElement.value;
        let NameElementvalue = NameElement.value;

        output.innerHTML = TeamNamevalue + " " + NameElementvalue;


    }

// This is just an example we have to change this ↑ //



    fetch   ("https://codecyprus.org/th/api/list")
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {
        console.log(jsonObject);

            let TreasureHunts = jsonObject.treasureHunts;

            let TreasureHuntslist = document.getElementById("HuntOption");


           for (let i = 0 ; i<TreasureHunts.length; i++){



               let newHuntOption = document.createElement("option");
               TreasureHuntslist.appendChild(newHuntOption);
               newHuntOption.text = TreasureHunts[i].name;




           }











    });







