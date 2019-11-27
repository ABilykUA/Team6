// JS is done here ↓

var sessionID = null;


function NameAndTeamInput() {
    const LIST_API = "https://codecyprus.org/th/api/list";

    let Name = document.getElementById("Name").value;
    let TextOutPut = document.getElementById("textlist");
    let elem = document.getElementById("button");



    if (Name !== '') {


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

                    HuntOptions.innerHTML = "<a href='Question.html?uuid=" + UUID + "&name=" + Name + " '  >" + NameOfHunts + "</a>";

                    TreasureHuntslist.appendChild(HuntOptions);



                }


            });

    }else {

            TextOutPut.innerText = "Error! Refresh the page fill in the fields!";
            elem.parentNode.removeChild(elem);



    }


}



function SessionGet () {


    const params = new URLSearchParams(location.search);


    const Session_Api = "https://codecyprus.org/th/api/start?player="+   params.get("name")   +"&app=simpsons-app&treasure-hunt-id=" +   params.get("uuid");


    fetch(Session_Api)
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {

                let Session = jsonObject.session;

                sessionID = Session;


                console.log(Session);

                Questions(Session);




        });

        }

        SessionGet();









function Questions() {

    console.log("Questions()session -> " + sessionID);

    let FormElement = document.getElementById("FormQuestions");

    let Question = document.getElementById("Question");

    const  Questions_Api = "https://codecyprus.org/th/api/question?session="+ sessionID ;

    fetch( Questions_Api )
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {

            let QuestionNames = jsonObject.questionText;

            let  CheckQuestion = jsonObject.questionType;

            let CheckIfCanBeSkipped = jsonObject.canBeSkipped;

            let CheckLocation = jsonObject.requiresLocation;

            Question.innerHTML = QuestionNames;

            if (CheckQuestion === "INTEGER")
            {

                document.getElementById("TextField").innerHTML =  "<input type='text' id='textfiled'  />";

                document.getElementById("SubmitButton").innerHTML =  "<input type='button' class='button' value='Sybmit' id='SubmitButton'  />";

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






                document.getElementById("Skip").innerHTML =  "<a href='#'> <input type='button' class='button' value='Skip' onclick='SkipQuestion(sessionID)'  /> </a>";


            }else {




                document.getElementById("Notes").innerHTML = "Sorry this question can't be skipped !!! ";

                Skip.parentNode.removeChild(Skip);
            }


            if (CheckLocation === true){

                document.getElementById("Location").innerHTML =  "<input type='button' class='button' value='UpDate Location' id='UpDateLocationButton'  />";


            }









            console.log(jsonObject);

        });


        }






        function SkipQuestion() {



            fetch( "https://codecyprus.org/th/api/skip?session=" +  sessionID )
                .then(response => response.json()) //Parse JSON text to JavaScript object
                .then(jsonObject => {

                    console.log(jsonObject);

                    Questions();



                });







        }



