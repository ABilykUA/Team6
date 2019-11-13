// JS is done here ↓



function getinformation(){
    const LIST_API = "https://codecyprus.org/th/api/list";

    let TeamNameElement = document.getElementById("TeamName");
    let NameElement = document.getElementById("Name");

    let TeamNamevalue = TeamNameElement.value;
    let NameElementvalue = NameElement.value;



    fetch(LIST_API)
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {


            let TreasureHuntsOBJECT = jsonObject.treasureHunts;

            let TreasureHuntslist = document.getElementById("HuntOptions");


           for (let i = 0 ; i<TreasureHuntsOBJECT.length; i++){

               UUID = TreasureHuntsOBJECT[i].uuid;

               NameOfHunts = TreasureHuntsOBJECT[i].name;

               let HuntOptions = document.createElement("li");

               HuntOptions.innerHTML = "<a href='https://codecyprus.org/th/api/start?player=" +   NameElementvalue   + "&app=" +  TeamNamevalue +   "&treasure-hunt-id=" + UUID + "  '>" + NameOfHunts  + "</a>";

               TreasureHuntslist.appendChild(HuntOptions);





           }











    });

}

getinformation();




