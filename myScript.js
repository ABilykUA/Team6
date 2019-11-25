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

                    HuntOptions.innerHTML = "<a href='#' onclick='SessionGet(UUID,Name.value,TeamName.value)' >" + NameOfHunts + "</a>";

                    TreasureHuntslist.appendChild(HuntOptions);

                    // document.location.href = "Question.html?";


                    // i have to make it, save the name , uuid , teamname, to qustions page!  !!
                    // href='Question.html'


                }


            });

    }else {

            TextOutPut.innerText = "Error! Refresh the page fill in the fields!";
            elem.parentNode.removeChild(elem);



    }


}



function SessionGet (UUID,Name,TeamName){

    console.log(Name);
    console.log(UUID);
    console.log(TeamName);


    const Api_Session = "https://codecyprus.org/th/api/start?player="+   Name   +"&app=" +    TeamName    + "&treasure-hunt-id=ag9nfmNvZGVjeXBydXNvcmdyGQsSDFRyZWFzdXJlSHVudBiAgICAvKGCCgw";

    fetch( Api_Session )
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {


            console.log( jsonObject);


            let session = jsonObject.session;
            let numofQuestions = jsonObject.numOfQuestions;

            console.log(session,numofQuestions);







        });




}



function onStartClick() {

    // name, teamName, uuid
    //input should look like this = https://codecyprus.org/th/api/start?player=" + name + "&app=" + teamName + "&treasure-hunt-id=" + uuid



    let FormElement = document.getElementById("FormQuestions");
    let ButtonErase = document.getElementById("StartQuestionsButton");


    fetch( "https://codecyprus.org/th/api/start?player=newplretysdasdsdfayer&app=teamAnsdfdsfdrii&treasure-hunt-id=ag9nfmNvZGVjeXBydXNvcmdyGQsSDFRyZWFzdXJlSHVudBiAgICAvKGCCgw" )
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

            let CheckLocation = jsonObject.requiresLocation;

            Question.innerHTML = QuestionNames;

            if (CheckQuestion === "INTEGER")
            {


            }

            if (CheckQuestion === "BOOLEAN")
            {


            }
            if (CheckQuestion === "NUMERIC")
            {


            }

            if (CheckQuestion === "MCQ")
            {


            }

            if (CheckQuestion === "TEXT")
            {


            }














            if (CheckIfCanBeSkipped === true){

                document.getElementById("Notes").innerHTML =  "<input type='button' class='button' value='Skip' id='SkipButton'  />";

            }else {

                document.getElementById("Notes").innerHTML = "Sorry this question can't be skipped !!! ";
            }

            if (CheckLocation === true ){

                document.getElementById("Notes").innerHTML =  "<input type='button' class='button' value='UpDateLocation' id='UpDateLocButton'  />";

            }









            console.log(jsonObject);

        });


        }



