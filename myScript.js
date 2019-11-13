// JS is done here ↓



function NameAndTeamInput() {
    const LIST_API = "https://codecyprus.org/th/api/list";

    let TeamName = document.getElementById("TeamName").value;
    let Name = document.getElementById("Name").value;
    let TextOutPut = document.getElementById("textlist");
    let elem = document.getElementById("button");



    if (Name && TeamName !== '') {


        fetch(LIST_API)
            .then(response => response.json()) //Parse JSON text to JavaScript object
            .then(jsonObject => {


                let TreasureHuntsOBJECT = jsonObject.treasureHunts;

                let TreasureHuntslist = document.getElementById("HuntOptions");

                TextOutPut.innerText = "Lists";

                for (let i = 0; i < TreasureHuntsOBJECT.length; i++) {

                    UUID = TreasureHuntsOBJECT[i].uuid;

                    NameOfHunts = TreasureHuntsOBJECT[i].name;

                    let HuntOptions = document.createElement("li");

                    HuntOptions.innerHTML = "<a href='https://codecyprus.org/th/api/start?player=" + Name + "&app=" + TeamName + "&treasure-hunt-id=" + UUID + "  '>" + NameOfHunts + "</a>";

                    TreasureHuntslist.appendChild(HuntOptions);


                }


            });

    }else {

            TextOutPut.innerText = "Error! Refresh the page fill in the fields!";
            elem.parentNode.removeChild(elem);



    }


}



function Questions() {
    fetch("https://codecyprus.org/th/api/start?player=Andrii&app=AndriiTeam&treasure-hunt-id=ag9nfmNvZGVjeXBydXNvcmdyGQsSDFRyZWFzdXJlSHVudBiAgICAvKGCCgw")
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {

            console.log(jsonObject);

        });





}






