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
                console.log(TreasureHuntsOBJECT);

                TextOutPut.innerText = "Lists";

                for (let i = 0; i < TreasureHuntsOBJECT.length; i++) {

                    UUID = TreasureHuntsOBJECT[i].uuid;

                    NameOfHunts = TreasureHuntsOBJECT[i].name;

                    let HuntOptions = document.createElement("li");

                    HuntOptions.innerHTML = "<a href='Question.html' onclick='onStartClick()' >" + NameOfHunts + "</a>";

                    TreasureHuntslist.appendChild(HuntOptions);

                    // document.location.href = "Question.html?";


                    // i have to make it, save the name , uuid , teamname, to qustions page!  !!


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

    const Settion_API = "https://codecyprus.org/th/api/start?player=Andrii&app=teamAndrii&treasure-hunt-id=ag9nfmNvZGVjeXBydXNvcmdyGQsSDFRyZWFzdXJlSHVudBiAgICAvKGCCgw";

    let FormElement = document.getElementById("FormQuestions");
    let ButtonErase = document.getElementById("StartQuestionsButton");


    fetch( "https://codecyprus.org/th/api/start?player=annsda&app=teamAndrii&treasure-hunt-id=ag9nfmNvZGVjeXBydXNvcmdyGQsSDFRyZWFzdXJlSHVudBiAgICAvKGCCgw" )
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

            if (CheckQuestion === "INTEGER")
            {

                console.log("asdfdsf");
            }

            if (CheckQuestion === "BOOLEAN")
            {

                console.log("asdasd");
            }

            if (CheckIfCanBeSkipped === true){

                document.getElementById("Notes").innerHTML =  "<input class='button' value='Skip' id='SkipButton'  />";

            }else {

                document.getElementById("Notes").innerHTML = "Sorry this question can't be skipped !!! ";
            }











            console.log(jsonObject);

        });


        }



