// JS is done here ↓
 function Cookies(UUID,NameOfHunts) {

for(let i = 0;i<UUID.length;i++){

 document.cookie="UUID"+ i + "=" + UUID[i] + ";";
 document.cookie="NameOfHunts"+ i + "=" + NameOfHunts[i] + ";";

}
 console.log(document.cookie);
 }


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

                    HuntOptions.innerHTML = "<a href='#' onclick='SessionGet(UUID,Name.value,TeamName.value); this.onclick=null' >" + NameOfHunts + "</a>";

                    TreasureHuntslist.appendChild(HuntOptions);

                    // document.location.href = "Question.html?";
// let UUID=[];
               // let NameOfHunts=[];



              //  for (let i = 0; i < TreasureHuntsOBJECT.length; i++) {

                 //   UUID.push(TreasureHuntsOBJECT[i].uuid);

                 //   NameOfHunts.push(TreasureHuntsOBJECT[i].name);

                  //  let HuntOptions = document.createElement("li");

                 //  HuntOptions.innerHTML = "<a href='Question.html' onclick='onStartClick(Name.value, TeamName.value, UUID[i].value )' >" + NameOfHunts[i] + "</a>";

                 //   TreasureHuntslist.appendChild(HuntOptions);

                    // i have to make it, save the name , uuid , teamname, to qustions page!  !!
                    // href='Question.html'


                }
//for(let i = 0;i < TreasureHuntsOBJECT.length;i++)
//{
 //   console.log(UUID[i]);
 //   console.log(NameOfHunts[i]);
//}
//Cookies(UUID,NameOfHunts)

            });

    }else {

            TextOutPut.innerText = "ErEroWr! Refresh the page fill in the fields!";
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

                document.getElementById("Notes").innerHTML = "Sorry this question can't be skipped !!! ";
            }


            if (CheckLocqation === true){

                document.getElementById("Location").innerHTML =  "<input type='button' class='button' value='UpDate Location' id='UpDateLocationButton'  />";


            }









            console.log(jsonObject);

        });


        }



