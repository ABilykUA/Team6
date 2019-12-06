// JS is done here ↓


let CheckForSkip= null;
let GameScore = 0;
let IntClear = null;



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


    const Session_Api = "https://codecyprus.org/th/api/start?player="+   params.get("name")   +"&app=Team6-app&treasure-hunt-id=" +   params.get("uuid");


    fetch(Session_Api)
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {

            let Session = jsonObject.session;

            checkCookie(Session);


            console.log(Session,"testing");


            Questions();




        });

}












function Questions() {

    let sessionid = getCookie("username");

    console.log("Questions()session -> " +  sessionid);

    const  Questions_Api = "https://codecyprus.org/th/api/question?session="+ sessionid ;

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


                integer(CheckForSkip);


            }

            if (CheckQuestion === "BOOLEAN")
            {


                boolean (CheckForSkip);



            }
            if (CheckQuestion === "MCQ")
            {
                mcq(CheckForSkip);

            }

            if (CheckQuestion === "TEXT")
            {

                text(CheckForSkip);



            }

            if (CheckQuestion === "NUMERIC")
            {


                numeric(CheckForSkip);


            }
            if (CheckIfFinished === true ){

                document.getElementById("Question").innerHTML = "Finished! Welldone";

                document.getElementById("Extra").innerHTML ="I hope u did good ! ";

                document.getElementById("PlaceForButtons").innerHTML =  "";

                document.getElementById("location").innerHTML ="";

                document.getElementById("BackHome").innerHTML="<br/>"+"<a href='index.html'>" +"<input type='button' class='button' value='Back to the landing page'>" + "</a>";



                LeaderBoard();
            }
            if (CheckLocation === true) {


                locationupdate();




                IntClear =   setInterval(locationupdate, 60000 ); //

                document.getElementById("location").innerHTML ="This is a geolocation question your coordinates will be updated every minute. ";

            }
            if (CheckLocation === false) {

                document.getElementById("location").innerHTML ="";
                document.getElementById("Extra2").innerHTML ="";


            }




            console.log(jsonObject);

        });


}


function integer(){


    document.getElementById("PlaceForButtons").innerHTML =  "<input type='number' id='textfiled'  />"
        + " " +
        "<br/>" +
        "<br/>" +
        "<input type='button' class='button' value='Submit' id='SubmitButton' onclick='AnswerQuestion()'  />";
    if (CheckForSkip === true){

        document.getElementById("Extra").innerHTML =  "<input type='button' class='button' value='Skip' onclick='SkipQuestion()'  />";
    }else {
        document.getElementById("Extra").innerHTML = "Sorry this question can't be skipped !!! ";
    }




}


function text(){


    document.getElementById("PlaceForButtons").innerHTML =  "<input type='text' id='textfiled'  />"
        + " " +
        "<br/>" +
        "<br/>" +
        "<input type='button' class='button' value='Submit' id='SubmitButton' onclick='AnswerQuestion()'  />";
    if (CheckForSkip === true){

        document.getElementById("Extra").innerHTML =  "<input type='button' class='button' value='Skip' onclick='SkipQuestion()'  />";
    }else {
        document.getElementById("Extra").innerHTML = "Sorry this question can't be skipped !!! ";
    }




}

function numeric(){


    document.getElementById("PlaceForButtons").innerHTML =  "<input type='number' id='textfiled'  />"
        + " " +
        "<br/>" +
        "<br/>" +
        "<input type='button' class='button' value='Submit' id='SubmitButton' onclick='AnswerQuestion()'  />";
    if (CheckForSkip === true){

        document.getElementById("Extra").innerHTML =  "<input type='button' class='button' value='Skip' onclick='SkipQuestion()'  />";
    }else {
        document.getElementById("Extra").innerHTML = "Sorry this question can't be skipped !!! ";
    }





}


function boolean () {

    document.getElementById("PlaceForButtons").innerHTML =



        "<input type='button' class='button'  id='TrueButton' value='True' onclick=' BoolAnswer(0)' /> "
        + " " +
       "<input type='button' class='button' id='FalseButton'  value='False' onclick=' BoolAnswer(1)'  />";




    if (CheckForSkip === true){

        document.getElementById("Extra").innerHTML =  "<input type='button' class='button' value='Skip' onclick='SkipQuestion()'  />";
    }else {
        document.getElementById("Extra").innerHTML = "Sorry this question can't be skipped !!! ";
    }



}




function mcq(){


        document.getElementById("PlaceForButtons").innerHTML =
            "<input type='button' class='button' value='A' id='A' onclick='AnswerMCQ(0)'  />"+" "+
            "<input type='button' class='button' value='B' id='B' onclick='AnswerMCQ(1)' />"+" "+
            "<input type='button' class='button' value='C' id='C' onclick='AnswerMCQ(2)'  />"+" "+
            "<input type='button' class='button' value='D' id='D' onclick='AnswerMCQ(3)'  />";



    if (CheckForSkip === true){

        document.getElementById("Extra").innerHTML =  "<input type='button' class='button' value='Skip' onclick='SkipQuestion()'  />";
    }else {
        document.getElementById("Extra").innerHTML = "Sorry this question can't be skipped !!! ";
    }



}




function BoolAnswer(i){

    let sessionid=getCookie("username");


    let answer = document.getElementsByClassName('button')[i].value;


    fetch("https://codecyprus.org/th/api/answer?session=" + sessionid  +  "&answer=" + answer )
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {
            let CheckForError = jsonObject.correct;


            if (CheckForError === false){

                document.getElementById("Incorrectquestion").innerText="Wrong answer, try again!";
            }else {
                document.getElementById("Incorrectquestion").innerText=" ";

            }
            console.log(jsonObject);

            document.getElementById("PlaceForButtons").innerHTML = "Loading...";

            Questions();
            Score(GameScore);



        });







}
function AnswerMCQ(i)
{
    let sessionid=getCookie("username");

        let answerMCQ = document.getElementsByClassName('button')[i].value;

    fetch("https://codecyprus.org/th/api/answer?session=" + sessionid  +  "&answer=" + answerMCQ )
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {



            let CheckForError = jsonObject.correct;


            if (CheckForError === false){

                document.getElementById("Incorrectquestion").innerText="Wrong answer, try again!";
            }else {
                document.getElementById("Incorrectquestion").innerText=" ";

            }

            console.log(jsonObject);

            document.getElementById("PlaceForButtons").innerHTML = "Loading...";

            Questions();
            Score(GameScore);



        });
}
function AnswerQuestion() {

    let sessionid=getCookie("username");

    let answer =  document.getElementById("textfiled").value;

    fetch("https://codecyprus.org/th/api/answer?session=" + sessionid  +  "&answer=" + answer )
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {


            let CheckForError = jsonObject.correct;


            if (CheckForError === false){

                document.getElementById("Incorrectquestion").innerText="Wrong answer, try again!";
            }else {
                document.getElementById("Incorrectquestion").innerText=" ";

            }

            console.log(jsonObject);

            document.getElementById("PlaceForButtons").innerHTML = "Loading...";

            Questions();
            Score(GameScore);





        });



}



function SkipQuestion() {

    let sessionid=getCookie("username");

    fetch( "https://codecyprus.org/th/api/skip?session=" +  sessionid )
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {

            console.log(jsonObject);

            Questions();
            Score(GameScore);

            document.getElementById("Incorrectquestion").innerText=" ";
        });

}



function Score() {

    let sessionid=getCookie("username");

    fetch("https://codecyprus.org/th/api/score?session="+sessionid)
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(ScoreObject => {

            console.log(ScoreObject);

            GameScore = ScoreObject.score;



        });


}


//leaders
function LeaderBoard() {
    let sessionid=getCookie("username");
    let LeadersHeader = document.getElementById("PlaceForButtons");
    LeadersHeader.innerText = "Loading . . . ";
    document.getElementById("Score").innerText="";


    let Time;
    let Player;
    let LeadersScore;

    fetch("https://codecyprus.org/th/api/leaderboard?session=" + sessionid + "&sorted&limit=5")
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {


            let LeaderBoard = jsonObject.leaderboard;
            console.log(LeaderBoard);
            let LeaderBoardlist = document.getElementById("Leaders");
            console.log(LeaderBoardlist);


            LeadersHeader.innerHTML = "Your Score: " + GameScore+  "<br/>"  +   "<br/>" + "Top 5";



            for (let i = 0; i < LeaderBoard.length; i++) {


                Time  = LeaderBoard[i].completionTime;
                Player=LeaderBoard[i].player;
                LeadersScore = LeaderBoard[i].score;


                let OutPutLeadersTime = document.createElement("li");
                let OutPutLeadersPlayer = document.createElement("li");
                let OutPutLeadersScore = document.createElement("li");
                let Space  = document.createElement("li");


                OutPutLeadersPlayer.innerHTML = "<a> Player: </a>"+" " + Player+ "<br/>" ;
                OutPutLeadersScore.innerHTML = "<a> Leaders Score: </a>"+" " + LeadersScore;
                OutPutLeadersTime.innerHTML = "<a> Time: </a>" +" "+ Time;

                Space.innerHTML = "</br>" ;

                LeaderBoardlist.appendChild(OutPutLeadersTime);
                LeaderBoardlist.appendChild(OutPutLeadersPlayer);
                LeaderBoardlist.appendChild(OutPutLeadersScore);
                LeaderBoardlist.appendChild(Space);







        }
})


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

        document.getElementById("Extra2").innerHTML="<p>" + "Your latitude: " + position.coords.latitude +  "<br/>" + " Your Longitude: " + position.coords.longitude +"</p>";

        let sessionid=getCookie("username");

        fetch("https://codecyprus.org/th/api/location?session=" +   sessionid +   "&latitude="+position.coords.latitude+"&longitude="+position.coords.longitude)
            .then(response => response.json()) //Parse JSON text to JavaScript object
            .then(jsonObject => {

                console.log(jsonObject);

            });



    }


function handleConnectionChange(event){
    if(event.type === "offline"){
        document.getElementById("Internetcheck").innerHTML="Please check your internet connection,this message will disappear after you reconnect no need to refresh the page! ";

    }
    if(event.type === "online"){
        document.getElementById("Internetcheck").innerHTML=" ";
    }


}
window.addEventListener('online', handleConnectionChange);
window.addEventListener('offline', handleConnectionChange);






















//setting cookies and getting them back
function setCookie(cname,cvalue,exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie(k) { //todo --- change back to session //

   let sessioncookie = k ;

    setCookie("username", sessioncookie, 30);


}

