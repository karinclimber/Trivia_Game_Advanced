$(document).ready(function() {
    // Create a function that creates the start button and initial screen
    
    function openingPage() {
        openScreen = "<p class='text-center main-button-container'><a class='btn btn-warning btn-md btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
        $("#mainArea").append(openScreen);
    }
    
    openingPage();
    
    //on-click event for start button to begin name
    
    $("#mainArea").on("click", ".start-button", function(event){
        event.preventDefault();  // added line to test issue on GitHub Viewer
        clickSound.play();
        $('.jumbotron').hide();
            
        generateQuestions();
    
        timerWrapper();
    
    }); // Closes start-button click
    
    $("body").on("click", ".answer", function(event){
        //answeredQuestion = true;
        clickSound.play();
        selectedAnswer = $(this).text();
        if(selectedAnswer === correctAnswers[questionCounter]) {
            //alert("correct");
    
            clearInterval(theClock);
            generateWin();
        }
        else {
            //alert("wrong answer!");
            clearInterval(theClock);
            generateLoss();
        }
    }); // Close .answer click
    
    $("body").on("click", ".reset-button", function(event){
        clickSound.play();
        resetGame();
    }); // Closes reset-button click
    
    });  //  Closes jQuery wrapper
    
    function timeoutLoss() {
        unansweredTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='/Users/karinhermann/Desktop/code/CodingBootcamp/2.2External CSS Styles/Trivia_Game_Advanced/assets/images/x.gif'>";
        $("#mainArea").html(gameHTML);
        setTimeout(wait, 3000);  //  change to 4000 or other amount
    }
    
    function generateWin() {
        correctTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
        $("#mainArea").html(gameHTML);
        // $("#mainArea").append(imageArray[questionCounter])
        setTimeout(wait, 3000);  //  change to 4000 or other amount
    }
    
    function generateLoss() {
        incorrectTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='/Users/karinhermann/Desktop/code/CodingBootcamp/2.2External CSS Styles/Trivia_Game_Advanced/assets/images/x.gif'>";
        $("#mainArea").html(gameHTML);
        setTimeout(wait, 3000); //  change to 4000 or other amount
    }
    
    function generateQuestions() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
        $("#mainArea").html(gameHTML);
    }
    
    function wait() {
        if (questionCounter < 7) {
        questionCounter++;
        generateQuestions();
        counter = 30;
        timerWrapper();
        }
        else {
            finalScreen();
        }
    }
    
    function timerWrapper() {
        theClock = setInterval(thirtySeconds, 1000);
        function thirtySeconds() {
            if (counter === 0) {
                clearInterval(theClock);
                timeoutLoss();
            }
            if (counter > 0) {
                counter--;
            }
            $(".timer").html(counter);
        }
    }
    
    function finalScreen() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-warning btn-md btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
        $("#mainArea").html(gameHTML);
    }
    
    function resetGame() {
        questionCounter = 0;
        correctTally = 0;
        incorrectTally = 0;
        unansweredTally = 0;
        counter = 30;
        generateQuestions();
        timerWrapper();
    }
    
    var openScreen;
    var gameHTML;
    var counter = 30;
    var questionArray = 
    [ "This beer used croaking frogs in their advertisement. What beer is it?", 
    "This beer, though often thought to be German, is actually Dutch. What beer is it?", 
    "What beer has the slogan 'It can't get any better than this.'?", 
    "What beer uses the 'communist star' on their label?", 
    "What beer incorporated their often won award as the central graphic of their label?", 
    "'Probably the best beer in the world,' or so the slogan says. Who is it?", 
    "During the Middle Ages, which country did most of the Trappist beer come from?", 
    "What American brew is known as 'The Champagne of Bottled Beers'?" ];

    var answerArray = [
        ["Busch", "PBR", "Budweiser", "Corona"], 
        ["Stella Artois","Corona","Heineken","Dos Equis"], 
        ["Budweiser", "Old Milwaukee", "Corona", "Pabst Blue Ribbon"], 
        ["Budweiser", "Heineken", "Corona", "Bud Light"], 
        ["Corona", "Pabst Blue Ribbon", "Budweiser", "Busch"], 
        ["Budweiser","Corona","Carlsburg","Busch"], 
        ["Spain", "Amsterdam", "Belgium", "Germany"], 
        ["Miller High Life","Bud Light","Budweiser","Busch"], ];

    var imageArray = new Array(); 
    imageArray[0] = "<img class='center-block' src='/Users/karinhermann/Desktop/code/CodingBootcamp/2.2External CSS Styles/Trivia_Game_Advanced/assets/images/budweiser.jpg'>";
    imageArray[1] = "<img class='center-block' src='/Users/karinhermann/Desktop/code/CodingBootcamp/2.2External CSS Styles/Trivia_Game_Advanced/assets/images/heineken.jpeg'>"; 
    imageArray[2] = "<img class='center-block' src='/Users/karinhermann/Desktop/code/CodingBootcamp/2.2External CSS Styles/Trivia_Game_Advanced/assets/images/milwaukee.jpg'>"; 
    imageArray[3] = "<img class='center-block' src='/Users/karinhermann/Desktop/code/CodingBootcamp/2.2External CSS Styles/Trivia_Game_Advanced/assets/images/heineken.jpeg'>";  
    imageArray[4] = "<img class='center-block' src='/Users/karinhermann/Desktop/code/CodingBootcamp/2.2External CSS Styles/Trivia_Game_Advanced/assets/images/pbr.gif'>"; 
    imageArray[5] = "<img class='center-block' src='/Users/karinhermann/Desktop/code/CodingBootcamp/2.2External CSS Styles/Trivia_Game_Advanced/assets/images/carlsburg.jpg'>"; 
    imageArray[6] = "<img class='center-block' src='/Users/karinhermann/Desktop/code/CodingBootcamp/2.2External CSS Styles/Trivia_Game_Advanced/assets/images/trappist.jpeg'>"; 
    imageArray[7] = "<img class='center-block' src='/Users/karinhermann/Desktop/code/CodingBootcamp/2.2External CSS Styles/Trivia_Game_Advanced/assets/images/miller.jpg'>"; 

    var correctAnswers = 
    [ "C. Budweiser", 
    "C. Heineken", 
    "B. Old Milwaukee", 
    "B. Heineken", 
    "B. Pabst Blue Ribbon", 
    "C. Carlsburg", 
    "C. Belgium", 
    "A. Miller High Life"];

    var questionCounter = 0;
    var selecterAnswer;
    var theClock;
    var correctTally = 0;
    var incorrectTally = 0;
    var unansweredTally = 0;
    var clickSound = new Audio("assets/sounds/click-sound.mp3");