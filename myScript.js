// JS is done here ↓
// JS is done here ↓
// function Cookies(UUID0,UUID1,NameOfHunts0,NameOfHunt1)
// {
// let date = new Date();
// date.setTime(date.getTime() + (60 * 1000));
// let expires = "expires=" + date.toUTCString();
// document.cookie="UUID0"+ "=" + UUID0 + ";" + expires + ";path=/";
// document.cookie="UUID1"+ "=" + UUID1 + ";" + expires + ";path=/";
// document.cookie="NameOfHunts0" + "=" + NameOfHunts0 + ";" + expires + ";path=/";
// document.cookie="NameOfHunts1" + "=" + NameOfHunt1 + ";" + expires + ";path=/";
// console.log(document.cookie);
// }


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
                console.log(TreasureHuntsOBJECT);

                TextOutPut.innerText = "Lists";

                for (let i = 0; i < TreasureHuntsOBJECT.length; i++) {

                    UUID = TreasureHuntsOBJECT[i].uuid;

                    NameOfHunts = TreasureHuntsOBJECT[i].name;

                    let HuntOptions = document.createElement("li");

                    HuntOptions.innerHTML = "<a href='Question.html' onclick='onStartClick(Name.value, TeamName.value, UUID )' >" + NameOfHunts + "</a>";

                    TreasureHuntslist.appendChild(HuntOptions);

                    // document.location.href = "Question.html?";


                    // i have to make it, save the name , uuid , teamname, to qustions page!  !!

//TextOutPut.innerText = "Lists";
//
//                     UUID0 = TreasureHuntsOBJECT[0].uuid;
//                     NameOfHunts0 = TreasureHuntsOBJECT[0].name;
//
//                     UUID1 = TreasureHuntsOBJECT[1].uuid;
//                     NameOfHunt1 = TreasureHuntsOBJECT[1].name;
//
//
//
//                     // document.location.href = "Question.html?";
//
//
//                     // i have to make it, save the name , uuid , teamname, to qustions page!  !!
//
//                     Cookies(UUID0,UUID1,NameOfHunts0,NameOfHunt1);

                }


            });

    }else {

            TextOutPut.innerText = "Error! Refresh the page fill in the fields!";
            elem.parentNode.removeChild(elem);



    }


}

function onStartClick() {

    // name, teamName, uuid
    //input should look like this = https://codecyprus.org/th/api/start?player=" + name + "&app=" + teamName + "&treasure-hunt-id=" + uuid


    let FormElement = document.getElementById("FormQuestions");
    let ButtonErase = document.getElementById("StartQuestionsButton");


    fetch( "https://codecyprus.org/th/api/start?player=ansdfgna&app=teamrteAndrii&treasure-hunt-id=ag9nfmNvZGVjeXBydXNvcmdyGQsSDFRyZWFzdXJlSHVudBiAgICAvKGCCgw" )
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {


            let session = jsonObject.session;
            let numofQuestions = jsonObject.numOfQuestions;

            Questions(session);

            console.log(session,numofQuestions);

            FormElement.removeChild(ButtonErase);



        });



}

function Questions(session) {

    let FormElement = document.getElementById("FormQuestions");

    let Question = document.getElementById("Question");

    fetch( "https://codecyprus.org/th/api/question?session="+ session )
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {

            let QuestionNames = jsonObject.questionText;

            let  CheckQuestion = jsonObject.questionType;

            let CheckIfCanBeSkipped = jsonObject.canBeSkipped;

            Question.innerHTML = QuestionNames;

            if (CheckQuestion == "INTEGER")
            {

                console.log("asdfdsf");
            }

            if (CheckQuestion == "BOOLEAN")
            {

                console.log("asdasd");
            }

            if (CheckIfCanBeSkipped == true){

                document.getElementById("Notes").innerHTML =  "<input class='button' value='Skip' id='SkipButton'  />";

            }else {

                document.getElementById("Notes").innerHTML = "Sorry this question can't be skipped !!! ";
            }











            console.log(jsonObject);

        });


        }



