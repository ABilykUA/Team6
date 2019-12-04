// JS is done here ↓

var sessionID = null;
var CheckForSkip= null;
var GameScore = null;
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

                document.getElementById("Question").innerHTML = "Finished! Welldone";

                document.getElementById("Extra").innerHTML ="I hope u did good ! ";

                document.getElementById("PlaceForButtons").innerHTML ="";

                document.getElementById("location").innerHTML ="";


                LeaderBoard();
            }
            if (CheckLocation === true) {


                locationupdate(sessionID);

                setInterval(locationupdate, 60000 ,sessionID); //TODO - Back to 60 seconds


                document.getElementById("location").innerHTML ="This is a geolocation question your coordinates will be updated every minute. ";

            }else {

                document.getElementById("location").innerHTML ="";

            }




            console.log(jsonObject);

        });


}


function integer(){


    document.getElementById("PlaceForButtons").innerHTML =  "<input type='number' id='textfiled'  />"
        + " " +
        "<br/>" +
        "<br/>" +
        "<input type='button' class='button' value='Submit' id='SubmitButton' onclick='AnswerQuestion(sessionID)'  />";
    if (CheckForSkip === true){

        document.getElementById("Extra").innerHTML =  "<input type='button' class='button' value='Skip' onclick='SkipQuestion(sessionID)'  />";
    }else {
        document.getElementById("Extra").innerHTML = "Sorry this question can't be skipped !!! ";
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




}

function numeric(){


    document.getElementById("PlaceForButtons").innerHTML =  "<input type='numeric' id='textfiled'  />"
        + " " +
        "<br/>" +
        "<br/>" +
        "<input type='button' class='button' value='Submit' id='SubmitButton' onclick='AnswerQuestion(sessionID)'  />";
    if (CheckForSkip === true){

        document.getElementById("Extra").innerHTML =  "<input type='button' class='button' value='Skip' onclick='SkipQuestion(sessionID)'  />";
    }else {
        document.getElementById("Extra").innerHTML = "Sorry this question can't be skipped !!! ";
    }





}


function boolean () {

    document.getElementById("PlaceForButtons").innerHTML =



        "<input type='button' class='button'  id='TrueButton' value='True' onclick=' BoolAnswer(sessionID,0)' /> "
        + " " +
       "<input type='button' class='button' id='FalseButton'  value='False' onclick=' BoolAnswer(sessionID,1)'  />";




    if (CheckForSkip === true){

        document.getElementById("Extra").innerHTML =  "<input type='button' class='button' value='Skip' onclick='SkipQuestion(sessionID)'  />";
    }else {
        document.getElementById("Extra").innerHTML = "Sorry this question can't be skipped !!! ";
    }



}




function mcq(){

        document.getElementById("PlaceForButtons").innerHTML =
            "<input type='button' class='button' value='A' id='A' onclick='AnswerMCQ(sessionID,0)'  />"+" "+
            "<input type='button' class='button' value='B' id='B' onclick='AnswerMCQ(sessionID,1)' />"+" "+
            "<input type='button' class='button' value='C' id='C' onclick='AnswerMCQ(sessionID,2)'  />"+" "+
            "<input type='button' class='button' value='D' id='D' onclick='AnswerMCQ(sessionID,3)'  />";



    if (CheckForSkip === true){

        document.getElementById("Extra").innerHTML =  "<input type='button' class='button' value='Skip' onclick='SkipQuestion(sessionID)'  />";
    }else {
        document.getElementById("Extra").innerHTML = "Sorry this question can't be skipped !!! ";
    }



}




function BoolAnswer(sessionID,i){



    let answer = document.getElementsByClassName('button')[i].value;


    fetch("https://codecyprus.org/th/api/answer?session=" + sessionID  +  "&answer=" + answer )
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {

            console.log(jsonObject);

            document.getElementById("PlaceForButtons").innerHTML = "Loading...";

            Questions();
            Score(GameScore,sessionID);



        });







}
function AnswerMCQ(sessionID, i)
{

        let answerMCQ = document.getElementsByClassName('button')[i].value;

    fetch("https://codecyprus.org/th/api/answer?session=" + sessionID  +  "&answer=" + answerMCQ )
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {

            console.log(jsonObject);

            document.getElementById("PlaceForButtons").innerHTML = "Loading...";

            Questions();
            Score(GameScore,sessionID);



        });
}
function AnswerQuestion(sessionID) {

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

function SkipQuestion() {



    fetch( "https://codecyprus.org/th/api/skip?session=" +  sessionID )
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {

            console.log(jsonObject);

            Questions();
            Score(GameScore,sessionID);


        });

}



function Score() {

    fetch("https://codecyprus.org/th/api/score?session="+sessionID)
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(ScoreObject => {

            console.log(ScoreObject);

            GameScore = ScoreObject.score;



        });


}


//leaders
function LeaderBoard() {
    let LeadersHeader = document.getElementById("PlaceForButtons");
    LeadersHeader.innerText = "Loading . . . ";
    document.getElementById("Score").innerText="";


    let Time;
    let Player;
    let LeadersScore;

    fetch("https://codecyprus.org/th/api/leaderboard?session=" + sessionID + "&sorted&limit=5")
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {


            let LeaderBoard = jsonObject.leaderboard;
            console.log(LeaderBoard);
            let LeaderBoardlist = document.getElementById("Leaders");
            console.log(LeaderBoardlist);









            LeadersHeader.innerText = "Top 5";

            for (let i = 0; i < LeaderBoard.length; i++) {


                Time  = LeaderBoard[i].completionTime;
                Player=LeaderBoard[i].player;
                LeadersScore = LeaderBoard[i].score;


                let OutPutLeadersTime = document.createElement("li");
                let OutPutLeadersPlayer = document.createElement("li");
                let OutPutLeadersScore = document.createElement("li");
                let Space  = document.createElement("li");


                OutPutLeadersPlayer.innerHTML = "<a> Player: </a>"+" " + Player;
                OutPutLeadersScore.innerHTML = "<a> Leaders Score: </a>"+" " + LeadersScore;
                OutPutLeadersTime.innerHTML = "<a> Time: </a>" +" "+ msToTime(Time);

                Space.innerHTML = "</br>" ;

                LeaderBoardlist.appendChild(OutPutLeadersTime);
                LeaderBoardlist.appendChild(OutPutLeadersPlayer);
                LeaderBoardlist.appendChild(OutPutLeadersScore);
                LeaderBoardlist.appendChild(Space);







        }
})
}

function msToTime(duration) {
    let milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10)     ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}


//location update
function locationupdate(){

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);

        }
        else {
            alert("Geolocation is not supported by your browser.");
        }
    }

    function showPosition(position) {

        document.getElementById("Extra2").innerHTML="<p>" + "Your latitude: " + position.coords.latitude + "<br/>" + " Your Longitude: " + position.coords.longitude +"</p>";

        fetch("https://codecyprus.org/th/api/location?session=" +   sessionID +   "&latitude="+position.coords.latitude+"&longitude="+position.coords.longitude)
            .then(response => response.json()) //Parse JSON text to JavaScript object
            .then(jsonObject => {
                console.log("Updated location to: " + position.coords.latutide + ","+position.coords.longitude);
                console.log(jsonObject);

            });



    }





