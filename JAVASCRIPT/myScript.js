// JS is done here ↓
let CheckLocation = null;
let CheckForSkip= null;
var GameScore = 0;
let IntClear;
var SessionID ;
var User;



function NameInput() {
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

                    HuntOptions.innerHTML = "<a href='Question.html?uuid=" + UUID + "&name=" + Name + " '>" + NameOfHunts + "</a>"+"<br/>"+"<br/>";

                    TreasureHuntslist.appendChild(HuntOptions);



                }


            });

    }else {

        TextOutPut.innerText = "Error! Refresh the page fill in the fields!";
        elem.parentNode.removeChild(elem);



    }


}



function SessionGet () {

    let TreasureHuntslist = document.getElementById("Error");

    const params = new URLSearchParams(location.search);


    const Session_Api = "https://codecyprus.org/th/api/start?player="+   params.get("name")   +"&app=Team6-app&treasure-hunt-id=" +  params.get("uuid");


    fetch(Session_Api)

        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {

            let Session = jsonObject.session;
            let ErrorCheck = jsonObject.status;

            if(ErrorCheck==="ERROR"){
            let HuntOptions = document.createElement("p");
            HuntOptions.innerHTML = "<a>" + jsonObject.errorMessages[0] + "</a>";
            TreasureHuntslist.appendChild(HuntOptions);

        }else {

                SessionID = Session;
                User = params.get("name");

                setCookie("SessionID", Session, 1);
                setCookie("User", params.get("name"), 1);


                console.log(Session, "testing");


                Questions();
            }



        });

}












function Questions() {

    console.log("Questions()session -> " +  SessionID );

    const  Questions_Api = "https://codecyprus.org/th/api/question?session="+ SessionID ;

    fetch( Questions_Api )
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {

            let  CheckIfFinished = jsonObject.completed;

            let QuestionNames = jsonObject.questionText;

            let  CheckQuestion = jsonObject.questionType;

            CheckLocation = jsonObject.requiresLocation;

            CheckForSkip = jsonObject.canBeSkipped;

            document.getElementById("Player").innerHTML = User;

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

                deleteCookie();

                document.getElementById("Question").innerHTML = "Finished! Welldone";

                document.getElementById("Extra").innerHTML ="";

                document.getElementById("PlaceForButtons").innerHTML =  "";

                document.getElementById("location").innerHTML ="";

                document.getElementById("BackHome").innerHTML="<br/>"+"<a href='index.html'>" +"<input type='button' class='button' value='Landing page'>" + "</a>";



                LeaderBoard();


            }





            console.log(jsonObject);

        });


}

function deleteCookie()
{
    document.cookie = "SessionID=;  path=/;";

    document.cookie = "User=;  path=/;";

    document.cookie = "SetScoreCookie=;  path=/;";


}

function integer(){


    document.getElementById("PlaceForButtons").innerHTML =  "<input type='number' id='textfiled'  />"
        + " " +
        "<br/>" +
        "<br/>" +

        "<input type='button' class='button' value='Submit' id='SubmitButton' onclick='AnswerQuestion()' />";

    if (CheckForSkip === true){

        document.getElementById("Extra").innerHTML =  "<input type='button' class='button' value='Skip' onclick='SkipQuestion()'  />";
    }else {
        document.getElementById("Extra").innerHTML = "Sorry this question can't be skipped !!! ";
    }

    if (CheckLocation === true) {

        IntClear =   setInterval(locationupdate, 60000 ); //

        document.getElementById("location").innerHTML ="This is a geolocation question your coordinates will be updated every 60 seconds, wait until the coordinates are shown before you answer !!!";

    }

    if (CheckLocation === false) {

        document.getElementById("location").innerHTML ="";
        document.getElementById("Extra2").innerHTML ="";

        clearInterval(IntClear);
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


    if (CheckLocation === true) {

        IntClear =   setInterval(locationupdate, 60000 ); //

        document.getElementById("location").innerHTML ="This is a geolocation question your coordinates will be updated every 60 seconds, wait until the coordinates are shown before you answer !!!";

    }


    if (CheckLocation === false) {

        document.getElementById("location").innerHTML ="";
        document.getElementById("Extra2").innerHTML ="";

        clearInterval(IntClear);
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


    if (CheckLocation === true) {

        IntClear =   setInterval(locationupdate, 60000 ); //

        document.getElementById("location").innerHTML ="This is a geolocation question your coordinates will be updated every 60 seconds, wait until the coordinates are shown before you answer !!! ";

    }


    if (CheckLocation === false) {

        document.getElementById("location").innerHTML ="";
        document.getElementById("Extra2").innerHTML ="";

        clearInterval(IntClear);
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
    if (CheckLocation === true) {

        IntClear =   setInterval(locationupdate, 60000 ); //

        document.getElementById("location").innerHTML ="This is a geolocation question your coordinates will be updated every 60 seconds, wait until the coordinates are shown before you answer !!!";

    }
    if (CheckLocation === false) {

        document.getElementById("location").innerHTML ="";
        document.getElementById("Extra2").innerHTML ="";

        clearInterval(IntClear);
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
    if (CheckLocation === true) {

        IntClear =   setInterval(locationupdate, 60000 ); //

        document.getElementById("location").innerHTML ="This is a geolocation question your coordinates will be updated every 60 seconds, wait until the coordinates are shown before you answer !!!";

    }
    if (CheckLocation === false) {

        document.getElementById("location").innerHTML ="";
        document.getElementById("Extra2").innerHTML ="";
        clearInterval(IntClear);


    }



}




function BoolAnswer(i){


    let answer = document.getElementsByClassName('button')[i].value;


    fetch("https://codecyprus.org/th/api/answer?session=" + SessionID  +  "&answer=" + answer )
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {
            let CheckForError = jsonObject.correct;


            if (CheckForError === false){

                document.getElementById("Incorrectquestion").innerHTML="Wrong answer, try again!"+"<br/>";
            }else {
                document.getElementById("Incorrectquestion").innerText=" ";

            }
            console.log(jsonObject);

            document.getElementById("PlaceForButtons").innerHTML = "<div class='lds-spinner'>"+"<div>"+"</div>"+"<div>"+"</div>"+"<div>"+"</div>"+"<div>"+"</div>"+"<div>"+"</div>"+"<div>"+"</div>"+"<div>"+"</div>"+"<div>"+"</div>"+"<div>"+"</div>"+"<div>"+"</div>"+"<div>"+"</div>"+"<div>"+"</div>"+"</div>";



            Questions();
            Score(GameScore);



        });







}
function AnswerMCQ(i)
{

        let answerMCQ = document.getElementsByClassName('button')[i].value;

    fetch("https://codecyprus.org/th/api/answer?session=" + SessionID  +  "&answer=" + answerMCQ )
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {



            let CheckForError = jsonObject.correct;


            if (CheckForError === false){

                document.getElementById("Incorrectquestion").innerHTML="Wrong answer, try again!"+"<br/>";
            }else {
                document.getElementById("Incorrectquestion").innerText=" ";

            }

            console.log(jsonObject);

            document.getElementById("PlaceForButtons").innerHTML ="<div class='lds-spinner'>"+"<div>"+"</div>"+"<div>"+"</div>"+"<div>"+"</div>"+"<div>"+"</div>"+"<div>"+"</div>"+"<div>"+"</div>"+"<div>"+"</div>"+"<div>"+"</div>"+"<div>"+"</div>"+"<div>"+"</div>"+"<div>"+"</div>"+"<div>"+"</div>"+"</div>";

            Questions();
            Score(GameScore);



        });
}
function AnswerQuestion() {



    let answer =  document.getElementById("textfiled").value;

    fetch("https://codecyprus.org/th/api/answer?session=" + SessionID  +  "&answer=" + answer )
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {


            let CheckForError = jsonObject.correct;


            if (CheckForError === false){

                document.getElementById("Incorrectquestion").innerHTML="Wrong answer, try again!"+"<br/>";
            }else {
                document.getElementById("Incorrectquestion").innerText=" ";

            }

            console.log(jsonObject);

            document.getElementById("PlaceForButtons").innerHTML ="<div class='lds-spinner'>"+"<div>"+"</div>"+"<div>"+"</div>"+"<div>"+"</div>"+"<div>"+"</div>"+"<div>"+"</div>"+"<div>"+"</div>"+"<div>"+"</div>"+"<div>"+"</div>"+"<div>"+"</div>"+"<div>"+"</div>"+"<div>"+"</div>"+"<div>"+"</div>"+"</div>";


            Questions();
            Score(GameScore);





        });



}



function SkipQuestion() {


let result =confirm("Are you really want to skip this question");
if (result===true) {
    fetch("https://codecyprus.org/th/api/skip?session=" + SessionID)
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {

            console.log(jsonObject);

            Questions();
            Score(GameScore);

            document.getElementById("Incorrectquestion").innerText = " ";
        });
}
else{}
}



function Score() {


    let TreasureHuntslist = document.getElementById("Error");

    fetch("https://codecyprus.org/th/api/score?session="+SessionID)
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(ScoreObject => {

            if (ScoreObject.status==="OK") {

                console.log(ScoreObject);

                GameScore = ScoreObject.score;

                setCookie("SetScoreCookie", GameScore ,1);
            }
            else{

                TreasureHuntslist.innerHTML = "<a>"+ScoreObject.errorMessages+"</a>";
                console.log(ScoreObject);


            }



        });


}
//test

//leaders
function LeaderBoard() {

    let LeadersHeader = document.getElementById("PlaceForButtons");
    LeadersHeader.innerHTML = "<div class='lds-spinner'>"+"<div>"+"</div>"+"<div>"+"</div>"+"<div>"+"</div>"+"<div>"+"</div>"+"<div>"+"</div>"+"<div>"+"</div>"+"<div>"+"</div>"+"<div>"+"</div>"+"<div>"+"</div>"+"<div>"+"</div>"+"<div>"+"</div>"+"<div>"+"</div>"+"</div>";
    document.getElementById("Score").innerText="";
    document.getElementById("Player").innerText="";

    let Time;
    let Player;
    let LeadersScore;

    fetch("https://codecyprus.org/th/api/leaderboard?session=" + SessionID + "&sorted&limit=10")
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {


            let LeaderBoard = jsonObject.leaderboard;
            console.log(LeaderBoard);
            let LeaderBoardlist = document.getElementById("Leaders");
            console.log(LeaderBoardlist);


            LeadersHeader.innerHTML = User +  "<br/>"  + "Your Score: " + GameScore +   "<br/>"  +   "<br/>" + "Top 10";



            for (let i = 0; i < LeaderBoard.length; i++) {


                Time  = LeaderBoard[i].completionTime;
                Player=LeaderBoard[i].player;
                LeadersScore = LeaderBoard[i].score;

              let Date= timeConverter(Time);




                let OutPutLeadersTime = document.createElement("li");
                let OutPutLeadersPlayer = document.createElement("li");
                let OutPutLeadersScore = document.createElement("li");
                let Space  = document.createElement("li");




                OutPutLeadersPlayer.innerHTML = "<a> Player: </a>"+" " + Player+ "<br/>" ;
                OutPutLeadersScore.innerHTML = "<a> Leaders Score: </a>"+" " + LeadersScore;
                OutPutLeadersTime.innerHTML = "<a> Time: </a>" + Date;

                Space.innerHTML = "</br>" ;

                LeaderBoardlist.appendChild(OutPutLeadersTime);
                LeaderBoardlist.appendChild(OutPutLeadersPlayer);
                LeaderBoardlist.appendChild(OutPutLeadersScore);
                LeaderBoardlist.appendChild(Space);







        }
})


}
function timeConverter(timestamp){
    let a = new Date(timestamp);
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    let sec = a.getSeconds();
    return date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
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

        fetch("https://codecyprus.org/th/api/location?session=" +   SessionID  +   "&latitude=" +position.coords.latitude+ "&longitude=" + position.coords.longitude)
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

function setCookie(cname,cvalue,exdays)
{
    var d = new Date();
    d.setTime(d.getTime() + (exdays*30*60*1000));
    var expires = "expires=" + d.toLocaleString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname)
{
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++)
    {
        var c = ca[i];
        while (c.charAt(0) === ' ')
        {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0)
        {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


function checkCookie() {

    var SessionIDCookie = getCookie("SessionID");
    var UserCookie = getCookie("User");
    var GameScoreCookie = getCookie("SetScoreCookie");

    if (SessionIDCookie !== "") {
        let result = confirm("Do you want to continue?");

        if (result === true) {
            document.location.href="Question.html";
            SessionID = SessionIDCookie;
            User = UserCookie;
            GameScore = GameScoreCookie;
            console.log(SessionID, User, GameScore, "test");


            Questions();


        }else{
            deleteCookie();
            SessionGet();
        }
    }

    else
    {
        SessionGet ();
        console.log("Session pusto")
    }

}


function reStart(){

    var SessionIDCookie = getCookie("SessionID");
    var UserCookie = getCookie("User");
    var GameScoreCookie = getCookie("SetScoreCookie");

    if (SessionIDCookie !== "")
    {
        SessionID = SessionIDCookie ;
        User=UserCookie;
        GameScore=GameScoreCookie;

        console.log( SessionID, User,GameScore ,"test");
        Questions();

    }else {

        SessionGet ();

    }


}

function IFrame() {
    var x = document.getElementById("QR");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

