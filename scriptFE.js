$(document).ready(function() {
	var Q_PTS 	= 0; 
	var Q_CAT 	= 1; 
	var Q_ID  	= 2; 
	var Q_ANSW	= 3;
	var Q_IMG	= 4;
	var Q_BG	= 5;
	var Q_BG_A	= 6;
	var Q_EN	= 7;
	var Q_EN_A	= 8;

	var themesDB = [t01, t02, t03, t04, t05, t06, t07, t08, t09, t10, t11, t12, t13, t14, t15, t16, t17, t18, t19]; 

	var config = {
		lang: null, 
		cat: null,
		themeID: null
	};

	/* this can be populated ONCE at runtime but is not needed */ /* harcoded changes once per year */
	var complexThemes = {
		1: 	{m: 70,  a: 16, b:10, t:1},
		6: 	{m: 70,  a:  2, b:10, t:0},
		9: 	{m:  0,  a: 66, b:11, t:0}, 
		11: {m: 23,  a:  0, b: 0, t:36},
		16: {m: 20,  a:  0, b:30, t:11},
		19: {m: 18,  a:  0, b:24, t:12},
		20: {m: 37,  a:  3, b:3, t:2}
	};

	var updateQuestionsCount = function(){
		/* Quirk Theme 9 has only categories A and B, no T and M TODO: properly disable the button*/ 
		$(".dropdown-menu li:eq(8)").removeClass("disabled");
		if(config.cat == "m" || config.cat == "t") {
			$(".dropdown-menu li:eq(8)").addClass("disabled");
		}
		$.each(complexThemes, function(key, value){
				var myValue = value.m;
				if(config.cat == "a") { myValue += value.a; }
				if(config.cat == "b") { myValue += value.a + value.t + value.b;	}
				if(config.cat == "t") { myValue += value.t; }
				var test = $(".dropdown-menu li a:eq(" + (key - 1) + ")").contents().length
				var value = $(".dropdown-menu li a:eq(" + (key - 1) + ")").contents()[test-1].nodeValue; 
				myValue = myValue == 0 ? "00" : myValue; /* TODO */
				$(".dropdown-menu li a:eq(" + (key - 1) + ")").contents()[test-1].nodeValue = value.replace(value.slice(-3), (myValue + ")") );
				/*
				var themeNumber = $(".dropdown-menu li a:eq(" + (key - 1) + ")").text().substring(0, 3)
				$(".dropdown-menu li a:eq(" + (key - 1) + ")").text(themeNumber + " (0" + myValue + ")");
				*/
		});
	};

	//Possible get the current selected/active -> more robust (by index)!
	$("#lang :input").change(function() {
		updateConfig("lang", this.id);
	});

	$("#cat :input").change(function() {
		updateConfig("cat", this.id);
		updateQuestionsCount();
	});

	var updateConfig = function(property, value) {
		currentTheme = [];
		config.themeID = null;

		config[property] = value;

		if(config.lang != null && config.cat != null) {		
			$("#dropdown .dropdown-toggle").removeClass("disabled");			
		}

		$("#my-btn").addClass("disabled");
		if(config.themeID != null) {
			$("#my-btn").removeClass("disabled");
		}

		// Reset 
		correct = wrong = 0;
		$("#mid>.question").remove();
		$(".dropdown-toggle").empty();
		$(".dropdown-toggle").append($.parseHTML('<span class="glyphicon glyphicon-menu-hamburger" aria-hidden="true"></span>'));
		updateButton(0,0);
	/*
		$("#my-btn").empty().append("[0/0][0%}");
		$("#my-btn").css("background", "linear-gradient(90deg, rgb(51, 122, 183)" + 0 + "%, rgb(40, 96, 144) 0%)");
	*/	
	};

	//TODO: unused;
	var resetConfig = function(){
		config.lang = config.cat = config.themeID = null; 
	};

	/* Dropdown */
    //var currentTheme;
	var currentQuestion;
	var startClock;
	
	$(".dropdown-menu li").click(function(event){
		/*TODO: reset everything here after showing results*/
		/* TODO: turn into css classes */
		$('.container').css("max-height", "1600px");
		$('.container').css("height", "100vh");

		$("#mid>.question").remove();
        $("#wrong").empty().hide();
    	$("#correct").empty().hide();
		$("#results").empty().hide();

		/* TODO:
		$(".dropdown-menu li").removeClass("active");
		$(this).toggleClass("active");
		*/
		//config.themeID = $(".dropdown-menu li").index(this);
		updateConfig("themeID", $(".dropdown-menu li").index(this));

        $(".dropdown-toggle").empty().append($(this).find('a').html());
		
		currentQuestion = 0;

		flipflop = 1;

		var sixPack = [1, 6, 9, 11, 16, 19];

		if(config.themeID != 19) { /* Assemble a theme from 1 to 19 */
			//config.themeID--
 			/* fancy StackOverflow to save some LoC */ 
			function filterByCat(element) {
				//console.log(element[1] + this.toUpperCase());
    			return element[1] == this.toUpperCase() || element[1] == ' ';
			}
			
			currentTheme = themesDB[config.themeID];

			if(sixPack.indexOf((config.themeID + 1)) > -1 && config.cat != "b") {
				currentTheme = currentTheme.filter(filterByCat, config.cat);
			}			
			/*
			if(sixPack.indexOf((config.themeID + 1)) > -1) {
				currentTheme = config.cat != "b" ? currentTheme.filter(filterByCat, config.cat) : currentTheme;
			}
			 currentTheme = config.cat != "b" && sixPack.indexOf((config.themeID + 1)) > -1 ? themesDB[config.themeID].filter(filterByCat, config.cat) : themesDB[config.themeID]; */
		} else { 
			/* Assemble theme 20 *//* THEME 20 assemble */

			
			startClock = new Date(); 
			var themesDBCopy = themesDB.slice(0);
			/* Redo this in clever way */
		  	
			var bufferM = [];
			var bufferA = [];
			var bufferB = [];
			var bufferT = []; 

			$.each(sixPack, function(key, value1) {
				bufferM[value1] = [];
				$.each(themesDBCopy[value1-1], function(key1, value) {
					switch(value[1]) {
						case "A": 
							bufferA.push(value);
							break;
						case "B": 
							bufferB.push(value);
							break;
						case "T": 
							bufferT.push(value);
							break;
						default: 
							bufferM[value1].push(value);
					}	
				});
				themesDBCopy[value1-1] = bufferM[value1];
			});

			currentTheme = [];
			//var buffer1 = [];
			/* maybe revers and foreach on the look-up */
			var lookUp = [1, 2, 2, 5, 2, 2, 5, 6, 0, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1];

			/* TODO: random numbers  */
			$.each(themesDBCopy, function(key, value){
				//currentTheme[key] = [];
				for(i=0;  i < lookUp[key]; i++) {
					//var randomKey = Math.floor((Math.random() * (value.length - 1)) + 1); //random*(max - min) + min
					var randomKey = Math.floor(Math.random() * value.length);
					//currentTheme[key].push(randomKey);
					currentTheme.push(themesDBCopy[key][randomKey]);
				}
			});			
			/* TODO: make sure  random includes 0 (zero) TODO:*/
			function addQuestions(count, category) {
				for(i=0; i<count; i++) {		/* TODO off by one :( */
					//var randomNumber = Math.floor((Math.random() * (category.length-1)) + 1); //random*(max - min) + min
					var randomNumber = Math.floor(Math.random() * category.length);
					currentTheme.push(category[randomNumber]);
				}
			}


			if(config.cat == "t" || config.cat == "b") {
				addQuestions(2, bufferT);
			}
			if(config.cat == "a" || config.cat == "b") {
				addQuestions(3, bufferA);
			}
			if(config.cat == "b") {
				addQuestions(3, bufferB);
			}

			themesDBCopy = null; /* destroy big and no longer needed */ 
			//TODO: points
		}

		renderQuestion();
		updateButton(currentQuestion+1, currentTheme.length);
		//currentQuestion++
	});
	
	function shuffleArray(array) {
		for (var i = array.length -1; i > 0; i--){
			var j = Math.floor(Math.random() * (i+1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}	
		//return array;
	}

	var flipflop = 1; 
	var checkQuestion;
	var wrong = 0;
	var correct = 0;
	var correctA = [];
	var wrongA = [];

	$("#my-btn").click(function(event) { 
		/* TODO: mod !! */
	
		//console.log(currentQuestion + " _ " +  currentTheme.length + " _ " + flipflop);
			//if((config.themeID == 19 || flipflop == 1) || (currentQuestion == currentTheme.length - 1 && flipflop == 2)) {
			if(config.themeID == 19 || flipflop == 1) {

				if(config.lang == "bg") { myLang = 6; }
				if(config.lang == "en") { myLang = 8; }

				var userInput = [];
				 
				var myquestion = $("#mid>.question");
			  	$(".qzone .btn", myquestion ).each(function( index , element) {
			        if ($(this).hasClass( "active" )) {                    
			            userInput.push(index);
			          // currentQuestionAnswers.push($(this).index(".active"));
			        }	
			    }); 
				var answersDB = [];
				
				if(currentTheme[currentQuestion][Q_IMG].length < 3) {
					$.each(currentTheme[currentQuestion][myLang], function(key, value){
					//console.log(value[0]);		
						if(value[0] == 1) {		
							$("#mid>.question .h4:eq(" + key +")").css("color","blue");
							answersDB.push(key); 
							//$(".question img:eq(" + key +")").css("border","2px solid red");
						}	
					});	
				} else { 
					$.each(currentTheme[currentQuestion][Q_IMG], function(key, value){
						//console.log(value[0]);		
						if(value[0] == 1) {				
							$("#mid>.question>.qzone .img_ctl:eq(" + key +")").css("border","2px solid blue");
							answersDB.push(key); 
							//$("#mid>.question img:eq(" + key +")").css("border","2px solid blue");
							//$(".question img:eq(" + key +")").css("border","2px solid red");
						}	
					});
				}
				//JSON.stringify();
				checkQuestion = userInput.toString() === answersDB.toString() ? true : false; 
			var color = checkQuestion ? "green" : "red";
				$("#mid>.question").css("border-left", "2px solid " + color);

			
			}
			//if((config.themeID == 19 || flipflop == 2) || (currentQuestion == currentTheme.length - 1 && flipflop == 2)) {
			if(config.themeID == 19 || flipflop == 2) {

				var testQuestion = $("#mid>.question").detach();
				testQuestion.css("margin", "5px 0px");
				//testQuestion.css("margin-top","10px");
				//console.log(checkQuestion);
				if(checkQuestion){
					correct++;
					testQuestion.css("border-left","2px solid green");
					//correctA.push(testQuestion);
				 	//testQuestion.appendTo('#correct');
			
				} else {
					wrong++;
					testQuestion.css("border-left","2px solid red");
					//wrongA.push(testQuestion);
					//testQuestion.appendTo('#wrong');
				}
				testQuestion.appendTo('#results');

				if(currentQuestion < currentTheme.length - 1) {
					currentQuestion++;
					renderQuestion();
					updateButton(currentQuestion+1, currentTheme.length);
				} else {

			var stopClock = new Date();
			/*
			var progress = ((correct / (correct+wrong)) * 100); 
			$("#my-btn").empty().append("[" + correct + "/" + wrong + "][" + progress.toFixed(0) + "%]");

			//$("#my-btn").css("background", `linear-gradient(90deg, grey ${progress}, lightgrey 0%)`); 90deg, grey 40%, lightgrey 0%
			//$("#mid>.question").empty();
			//$("#my-btn").css("background", linear-gradient(90deg, rgb(51, 122, 183) ${progress}%, rgb(40, 96, 144) 0%)`);
			$("#my-btn").css("background", "linear-gradient(90deg, rgb(51, 122, 183)" + progress.toFixed(0) + "%, rgb(40, 96, 144) 0%)");
			*/
		updateButton(correct, currentTheme.length);

					console.log('here');
					$('#wrong').show();
					$('#wrong').css("display", "block");
					$('#correct').show();
					$('#correct').css("display", "block");
					$('#results').show();
					$('#results').css("display", "block");

					$('.container').css("max-height", "none");
					$('.container').css("height", "auto");
					$('#mid').css("max-height", "none");
				}
			}	
		flipflop = flipflop  == 1 ? 2 : 1;				
	});	
	

	function updateButton(fraction, whole) {
		/* TODO: consider spliting this into separate function */
		var progress = ((fraction / whole) * 100).toFixed(0); 
		//console.log(progress);
		progress = progress == 'NaN' ? 0 : progress;
		//console.log(progress);
		$("#my-btn").empty().append("[" + fraction + "/" + whole + "][" + progress + "%]");
		$("#my-btn").css("background", "linear-gradient(90deg, rgb(51, 122, 183)" + progress + "%, rgb(40, 96, 144) 0%)");
	};

	function renderQuestion() {	
		var cQuestion = currentTheme[currentQuestion];
		var img_count = cQuestion[Q_IMG].length;
		/* TODO: use "switch" for clarity */
		if(config.lang == "bg") {
			myLang = [5,6]; 
		}
		/* title[config.lang] title = {bg = 5; en = 7); answers[config.lang] answers = {bg = 6; en = 8} */
		/* TODO:  offset approach base_title = 5; base_answers = 7; offset = 0/1;  currentQuestion[base_title+offset] currentQuestion[base_answers+offset]*/
		if(config.lang == "en") {
			myLang = [7,8];
		}
/*
		var testtitle = config.lang == "bg" ? 5 : 7; 
		var testanswers = config.lang == "bg" ? 6 : 8; 
*/ 
		var qtitle = cQuestion[myLang[0]]; 
			
		/* shuffle either the text or the img answers */
		if(img_count > 2) {
			shuffleArray(cQuestion[Q_IMG]);	
		} else { 
			shuffleArray(cQuestion[myLang[1]]); 
		}
		var qanswers = cQuestion[myLang[1]]; 
		
		//console.log(qanswers);
		//var qtitle = currentTheme[currentQuestion][5]; 

		//alert(currentTheme[currentQuestion][1]);
		
		var catType ="q-cat-" + cQuestion[Q_CAT].toLowerCase();
		/* TODO: for removal keep the error for reference
		TypeError: cQuestion is undefined[Learn More]  scriptFE.js:352:7
		TypeError: currentTheme[currentQuestion] is undefined[Learn More] scriptFE.js:257:1
		but not with:
		var catType = "";		
		
		// turn into switch 
		if(cQuestion[Q_CAT] == "A"){ catType = "bike"; }
		if(cQuestion[Q_CAT] == "T"){ catType = "transport"; }
		if(cQuestion[Q_CAT] == "B"){ catType = "car"; } 

			$(".question").removeClass("bike");
			$(".question").removeClass("transport");
			$(".question").removeClass("car");
			$(".question").addClass(catType);
		*/
		//alert(catType);
		/* <div style="display: flex;  justify-content: center; flex-direction: column;">  */


		/* Pre <ES6 way for backward compatability */ 
		var title = '';
		title += '\n<h3>';
		title += '\n\t<p>' + qtitle + '</p>';
		title += '\n\t<div>';
		title += '\n\t\t<div>' + (currentQuestion + 1) + '.</div>';
		title += '\n\t\t<div>' + currentTheme[currentQuestion][Q_PTS] + '/' + currentTheme[currentQuestion][Q_ANSW].length + '</div>';
		title += '\n\t</div>';
		title += '\n</h3>';

		/*TODO if img starts with digit is figure ad theme dir */
		if(img_count < 3) {
			var string = ""; 
			string += '\n<div class="qzone">';
			string += '\n\t<div class="answers" data-toggle="buttons-checkbox">';
			for(i=0; i < qanswers.length; i++) {
				var img01 = '';
				img01 += '\n\t\t<button type="button" class="btn btn-link btn-block btn-lg text-left" aria-label="">';
				img01 += '\n\t\t\t<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>';
				img01 += '\n\t\t\t<span class="h4">' + qanswers[i][1] + '</span>'; 				
				img01 += '\n\t\t</button>'; 
	
				string += img01;		
			}
			string += '\n\t</div>';
			//imgSrc += currentTheme[currentQuestion][4][0]; /* this not neeed I kept it for reference */					
	
			if(img_count > 0) {
				var imgSrc = "img/" + ("0" + (config.themeID+1)).slice(-2) + "/";
				
				/*	Temporary before merging of signs in common dir TODO: distinguish between fig and sign
					var imgSrc = "img/"; 
					var dirName = 
					var prefix = isNaN(currentTheme[currentQuestion][4][0].charAt(0)) ? "" : dirName + "/"; 
					imgSrc += prefix; 
				*/

				/* primitive signs are png (for transperancy) , figures are jpg/jpeg */
				/* TODO: this is all messed up */
				var imgExt = currentTheme[currentQuestion][4][0].split('.')[1];
				if(imgExt == "png") {
					imgSrc = "img/png/";
				}

				/* consolidate with img_ctl" */
				string += '\n\t<div class="img_ctl thumbnail">';
				string += '\n\t\t<div class="figure">';
				
				$.each(currentTheme[currentQuestion][Q_IMG], function(key, value){
					/* Second image of 2-part images */ //if(key == 1) { var custom = "custom"; } 
					var custom = key == 1 ? 'custom' : '';
					string += '\n\t\t\t<img class="' + custom + '" alt="img" src="' + (imgSrc + value) + '">';
				});
				string +='\n\t\t</div>';
				string +='\n\t</div>';
			}
			
			string += '\n</div>';

		} else {	
			var string = ""; 
			string += '\n<div class="qzone" data-toggle="buttons-checkbox">'; 
			var start;
			if(img_count == 4) { start = "group1";}
			if(img_count == 3) { start = "group3";}
			string += '\n\t<div class="' + start + '">';
			$.each(currentTheme[currentQuestion][Q_IMG], function(key, value) {
				/*
				var imgSrc = "img/"; 				
				var dirName = ("0" + (config.themeID+1)).slice(-2);
				//var prefix = isNaN(value[1].charAt(0)) ? "" : dirName + "/"; 
				var prefix = dirName + "/"; 
				imgSrc += prefix; 								
				*/
				var imgSrc = "img/png/"; 
				/* TODO: set alts on img */
				string += '\n\t\t<div class="btn btn-link" aria-label="">';
				string += '\n\t\t\t<div class="img_ctl thumbnail">';
				string += '\n\t\t\t\t<img alt="" src="' + (imgSrc + value[1]) + '">';	
				string += '\n\t\t\t</div>';												
				string += '\n\t\t\t<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>';			
				string += '\n\t\t</div>'; 
				if(key==1 && img_count == 4) {
				// Add second div;
					string += '\n\t</div>';
					string += '\n\t<div class="group2">';
				}     							
			});
			string += '\n\t</div>';
			string += '\n</div>';
		}
		//console.log(title);
		//console.log(string);
		
		var type = "question " + catType;  
		var questionContainer = '<div class="' + type + '"> </div>'; 
		$("#mid").append($.parseHTML( questionContainer ));
		$("#mid>.question").append($.parseHTML( title  + string)); 
	}
});
