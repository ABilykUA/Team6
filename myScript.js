// JS is done here ↓
//"https://codecyprus.org/th/api/start?player=" + NameElementvalue +  "&app="+ TeamNamevalue +"&treasure-hunt-id=uuid";
// This is just an example we have to change this ↓ //
    function Output() {


        let TeamNameElement = document.getElementById("TeamName");
        let NameElement = document.getElementById("Name");

        let TeamNamevalue = TeamNameElement.value;
        let NameElementvalue = NameElement.value;


        let startlink = document.createElement("A");
        document.getElementById("maindiv").appendChild(startlink);
        startlink.innerHTML =  "Press here ";
        startlink.setAttribute("href","https://codecyprus.org/th/api/start?player="+  NameElementvalue   + "&app=" + TeamNamevalue +   "&treasure-hunt-id=uuid");

    }

// This is just an example we have to change this ↑ //



function getinformation(){

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

}

getinformation();




