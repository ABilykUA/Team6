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

                    HuntOptions.innerHTML = "<a onclick='onStartClick(Name.value, TeamName.value, UUID )' >" + NameOfHunts + "</a>";

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

function onStartClick(Name, TeamName, UUID ) {

    // name, teamName, uuid
    //input should look like this = https://codecyprus.org/th/api/start?player=" + name + "&app=" + teamName + "&treasure-hunt-id=" + uuid
    // https://codecyprus.org/th/api/start?player=vashfgily&app=vasilsdfykgames&treasure-hunt-id=ag9nfmNvZGVjeXBydXNvcmdyGQsSDFRyZWFzdXJlSHVudBiAgICAvKGCCgw

    let FormElement = document.getElementById("FormQuestions");
    let ButtonErase = document.getElementById("StartQuestionsButton");



    fetch("https://codecyprus.org/th/api/start?player=lo0xrr&app=vasia&treasure-hunt-id=ag9nfmNvZGVjeXBydXNvcmdyGQsSDFRyZWFzdXJlSHVudBiAgICAvKGCCgw" )
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



    let Question = document.getElementById("Question");

    fetch( "https://codecyprus.org/th/api/question?session="+ session )
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {

            let QuestionNames = jsonObject.questionText;

            let  CheckQuestion = jsonObject.questionType;

            let CheckIfCanBeSkipped = jsonObject.canBeSkipped;

            let CheckLocqation = jsonObject.requiresLocation;

            Question.innerHTML = QuestionNames;

            if (CheckQuestion === "INTEGER")
            {

                document.getElementById("Textfield").innerHTML =  "<input type='text' id='textfiled'  />";

                document.getElementById("SubmitBitton").innerHTML =  "<input type='button' class='button' value='Sybmit' id='SubmitButton'  />";

                console.log("asdfdsf");
            }

            if (CheckQuestion === "BOOLEAN")
            {

                document.getElementById("TrueAnswer").innerHTML =  "<input type='button' class='button' value='True' id='TrueButton'  />";

                document.getElementById("FalseAnswer").innerHTML =  "<input type='button' class='button' value='False' id='FalseButton'  />";


                console.log("asdasd");
            }
            if (CheckQuestion === "MCQ")
            {


                console.log("dfgdfgdfjhasdasd");
            }

            if (CheckQuestion === "TEXT")
            {




                console.log("asdafghfgjdsd");
            }

            if (CheckQuestion === "NUMERIC")
            {




                console.log("asdafghfgjdsd");
            }





            if (CheckIfCanBeSkipped === true){

                document.getElementById("Skip").innerHTML =  "<input type='button' class='button' value='Skip' id='SkipButton'  />";

            }else {

                document.getElementById("Skip").innerHTML = "Sorry this question can't be skipped !!! ";
            }


            if (CheckLocqation === true){

                document.getElementById("Location").innerHTML =  "<input type='button' class='button' value='UpDate Location' id='UpDateLocationButton'  />";


            }









            console.log(jsonObject);

        });


        }



