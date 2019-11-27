// JS is done here ↓
 //function Cookies(UUID,NameOfHunts) {

//for(let i = 0;i<UUID.length;i++){

 //document.cookie="UUID"+ i + "=" + UUID[i] + ";";
 //document.cookie="NameOfHunts"+ i + "=" + NameOfHunts[i] + ";";

//}
// console.log(document.cookie);
// }


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






                document.getElementById("Skip").innerHTML =  "<a href='#'> <input type='button' class='button' value='Skip' onclick='SkipQuestion( session)'  /> </a>";


            }else {

                document.getElementById("Notes").innerHTML = "Sorry this question can't be skipped !!! ";
            }


            if (CheckLocation === true){

                document.getElementById("Location").innerHTML =  "<input type='button' class='button' value='UpDate Location' id='UpDateLocationButton'  />";


            }









            console.log(jsonObject);

        });


        }






        function SkipQuestion( session) {



            fetch( "https://codecyprus.org/th/api/skip?session=" +  session )
                .then(response => response.json()) //Parse JSON text to JavaScript object
                .then(jsonObject => {

                    console.log(jsonObject);

                });







        }



