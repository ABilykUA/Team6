// JS is done here ↓

var sessionID = null;
var CheckForSkip= null;
var GameScore = 0;
var CheckLocation = null;




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

                    HuntOptions.innerHTML = "<a href='Question.html?uuid=" + UUID + "&name=" + Name + " '   >" + NameOfHunts + "</a>";

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

    const  Questions_Api = "https://codecyprus.org/th/api/question?session="+ sessionID ;

    fetch( Questions_Api )
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {

            let  CheckIfFinished = jsonObject.completed;

            let QuestionNames = jsonObject.questionText;

            let  CheckQuestion = jsonObject.questionType;

            CheckLocation = jsonObject.requiresLocation;

            CheckForSkip = jsonObject.canBeSkipped;

            document.getElementById("Score").innerHTML = "Your Score: " + GameScore;



            document.getElementById("Question").innerHTML = QuestionNames;

            if (CheckQuestion === "INTEGER")
            {


                integer(CheckForSkip,CheckLocation);


            }

            if (CheckQuestion === "BOOLEAN")
            {


                boolean (CheckForSkip,CheckLocation);



            }
            if (CheckQuestion === "MCQ")
            {
                mcq(CheckForSkip,CheckLocation);

            }

            if (CheckQuestion === "TEXT")
            {

                text(CheckForSkip,CheckLocation);



            }

            if (CheckQuestion === "NUMERIC")
            {


                numeric(CheckForSkip,CheckLocation);


            }
            if (CheckIfFinished === true ){

                    document.getElementById("Question").innerHTML = "Finished";

                    document.getElementById("PlaceForButtons").innerHTML ="Welldone ";

                    document.getElementById("Extra").innerHTML ="I hope u did good ! ";

            }














            console.log(jsonObject);

        });


        }

        function integer(){


            document.getElementById("PlaceForButtons").innerHTML =  "<input type='text' id='textfiled'  />"
                + " " +
                "<br/>" +
                "<br/>" +
                "<input type='button' class='button' value='Submit' id='SubmitButton' onclick='AnswerQuestion(sessionID)'  />";
            if (CheckForSkip === true){

                document.getElementById("Extra").innerHTML =  "<input type='button' class='button' value='Skip' onclick='SkipQuestion(sessionID)'  />";
            }else {
                document.getElementById("Extra").innerHTML = "Sorry this question can't be skipped !!! ";
            }
            if (CheckLocation === true){


                document.getElementById("location").innerHTML =  "<input type='button' class='button' value='Location UpDFate'  />";
            }else {

                document.getElementById("location").innerHTML =  " ";

            }



            }


            function text(){


            document.getElementById("PlaceForButtons").innerHTML =  "<input type='text' id='textfiled'  />"
            + " " +
            "<br/>" +
            "<br/>" +
            "<input type='button' class='button' value='Submit' id='SubmitButton' onclick='AnswerQuestion(sessionID)'  />";
            if (CheckForSkip === true){

            document.getElementById("Extra").innerHTML =  "<input type='button' class='button' value='Skip' onclick='SkipQuestion(sessionID)'  />";
            }else {
            document.getElementById("Extra").innerHTML = "Sorry this question can't be skipped !!! ";
            }
                if (CheckLocation === true){


                    document.getElementById("location").innerHTML =  "<input type='button' class='button' value='Location UpDFate'  />";
                }else {

                    document.getElementById("location").innerHTML =  " ";

                }


            }

            function numeric(){


                document.getElementById("PlaceForButtons").innerHTML =  "<input type='text' id='textfiled'  />"
                    + " " +
                    "<br/>" +
                    "<br/>" +
                  "<input type='button' class='button' value='Submit' id='SubmitButton' onclick='AnswerQuestion(sessionID)'  />";
                  if (CheckForSkip === true){

                  document.getElementById("Extra").innerHTML =  "<input type='button' class='button' value='Skip' onclick='SkipQuestion(sessionID)'  />";
                    }else {
                  document.getElementById("Extra").innerHTML = "Sorry this question can't be skipped !!! ";
                     }

                if (CheckLocation === true){


                    document.getElementById("location").innerHTML =  "<input type='button' class='button' value='Location UpDFate'  />";
                }else {

                    document.getElementById("location").innerHTML =  " ";

                }



            }










        function boolean () {





            document.getElementById("PlaceForButtons").innerHTML =

                "<input type='button' class='button' value='False' id='FalseButton' onclick=' SubBool()'  />"
                + " " +
                "<br/>" +
                "<br/>" +
                "<input type='button' class='button' value='True' id='TrueButton' onclick=' SubBool()' /> ";

            if (CheckForSkip === true){

                document.getElementById("Extra").innerHTML =  "<input type='button' class='button' value='Skip' onclick='SkipQuestion(sessionID)'  />";
            }else {
                document.getElementById("Extra").innerHTML = "Sorry this question can't be skipped !!! ";
            }
            if (CheckLocation === true){


                document.getElementById("location").innerHTML =  "<input type='button' class='button' value='Location UpDFate'  />";
            }else {

                document.getElementById("location").innerHTML =  " ";

            }


            }

                function SubBoolTrue(){





                }
                function SubBoolFalse(){





                }








function mcq(){

            document.getElementById("PlaceForButtons").innerHTML =  "WIP";

            if (CheckForSkip === true){

                document.getElementById("Extra").innerHTML =  "<input type='button' class='button' value='Skip' onclick='SkipQuestion(sessionID)'  />";
            }else {
                document.getElementById("Extra").innerHTML = "Sorry this question can't be skipped !!! ";
            }
            if (CheckLocation === true){


                document.getElementById("location").innerHTML =  "<input type='button' class='button' value='Location UpDFate'  />";
            }else {

                document.getElementById("location").innerHTML =  " ";

            }



        }




        function SkipQuestion() {



            fetch( "https://codecyprus.org/th/api/skip?session=" +  sessionID )
                .then(response => response.json()) //Parse JSON text to JavaScript object
                .then(jsonObject => {

                    console.log(jsonObject);





                    Questions();
                    Score(GameScore,sessionID);


                });







        }

        function AnswerQuestion() {




       let answer =  document.getElementById("textfiled").value;


         fetch("https://codecyprus.org/th/api/answer?session=" + sessionID  +  "&answer=" + answer )
                .then(response => response.json()) //Parse JSON text to JavaScript object
                .then(jsonObject => {

                    console.log(jsonObject);

                    document.getElementById("PlaceForButtons").innerHTML = "Loading...";

                    Questions();
                    Score(GameScore,sessionID);



            });







            }

function Score() {

    fetch("https://codecyprus.org/th/api/score?session="+sessionID)
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {

            console.log(jsonObject);

            GameScore = jsonObject.score;



        });


}






