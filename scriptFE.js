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
		theme: null
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
			var themeNumber = $(".dropdown-menu li a:eq(" + (key - 1) + ")").text().substring(0, 3);
			$(".dropdown-menu li a:eq(" + (key - 1) + ")").text(themeNumber + " (0" + myValue + ")");
		});
	};

	//Possible get the current selected/active -> more robust (by index)!
	$("#lang :input").change(function() {
		var lang = this.id;
		updateConfig("lang", lang);
	});

	$("#cat :input").change(function() {
		var cat = this.id;
		updateConfig("cat", cat);
		updateQuestionsCount();
	});

	var updateConfig = function(property, value) {
		currentThemeReal = [];
		config.theme = null;

		config[property] = value;

		if(config.lang != null && config.cat != null) {		
			$("#dropdown .dropdown-toggle").removeClass("disabled");			
		}

		$("#my-btn").addClass("disabled");
		if(config.theme != null) {
			$("#my-btn").removeClass("disabled");
		}

		// Reset 
		correct = wrong = 0;
		$("#mid>.question").remove();
		$(".dropdown-toggle").empty();
		$(".dropdown-toggle").append($.parseHTML('<span class="glyphicon glyphicon-menu-hamburger" aria-hidden="true"></span>'));
		$("#my-btn").empty().append("[0/0][0%}");
	};

	//TODO: unused;
	var resetConfig = function(){
		config.lang = config.cat = config.theme = null; 
	};

	/* Dropdown */
	var currentTheme;
    var currentThemeReal;
	var currentQuestion;
	
	$(".dropdown-menu li").click(function(event){
		/*TODO: reset everything here after showing results*/
		$('.container').css("max-height", "1600px");
		$('.container').css("height", "100vh");

		$("#mid>.question").remove();
        $("#wrong").empty().hide();
    	$("#correct").empty().hide();
		$("#results").empty().hide();

		currentTheme = $(".dropdown-menu li").index(this);
		/*
		$(".dropdown-menu li").removeClass("active");
		$(this).toggleClass("active");
		*/
		updateConfig("theme", currentTheme);
		
        $(".dropdown-toggle").text($(this).text());
		
		currentQuestion = 0;

		flipflop = 1;

		if(currentTheme != 19) { /* Assemble a theme from 1 to 19 */
			currentThemeReal = themesDB[currentTheme];

			var sixPack = [1, 6, 9, 11, 16 , 19];
			//currentTheme--
			/* fancy StackOverflow to save some LoC */ 
			function filterByCat(element) {
				//console.log(element[1] + this.toUpperCase());
    			return element[1] == this.toUpperCase() || element[1] == ' ';
			}
			
			if(sixPack.indexOf((currentTheme + 1)) > -1) {
				currentThemeReal = config.cat != "b" ? currentThemeReal.filter(filterByCat, config.cat) : currentThemeReal;
			}
		} else { /* Assemble theme 20 */
			var startClock;
			/* THEME 20 assemble */
			startClock = new Date(); 
			var themesDBCopy = themesDB.slice(0);
			/* Redo this in clever way */
		  	var sixPack = [1, 6, 9, 11, 16 , 19];
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
				});
				/* console.log(bufferM); console.log(bufferA); console.log(bufferB); console.log(bufferT); */
				$.each(sixPack, function(key, value) {
						themesDBCopy[value-1] = bufferM[value];
				});

				currentThemeReal = [];
				var buffer1 = [];
				/* maybe revers and foreach on the look-up */
				var lookUp = [1, 2, 2, 5, 2, 2, 5, 6, 0, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1];
				/*
				$.each(lookUp, function(key, value){
					currentThemeReal[key] = [];
					for(i=0;  i < value; i++) {
						var randomKey = Math.floor((Math.random() * (currentThemeReal[key].length - 1)) + 1);
						currentThemeReal[key].push(randomKey);
					}
		
				});
				*/
				$.each(themesDBCopy, function(key, value){
					currentThemeReal[key] = [];
					for(i=0;  i < lookUp[key]; i++) {
						var randomKey = Math.floor((Math.random() * (value.length - 1)) + 1);
						currentThemeReal[key].push(randomKey);
					}
				});
		
				//console.log(currentThemeReal);
			
				var currentThemeRealReal = [];
				$.each(currentThemeReal, function(key, value){	
					currentThemeRealReal[key] = [];
					$.each(value, function(index, el) {
						//console.log(el);
						//currentThemeRealReal.push(themesDB[key][el]); TODO: why not work?
						buffer1.push(themesDBCopy[key][el]);
					});
				
				});
				/* TODO: waring check for 0-based index ! Check two random numbers are not identical TODO */
				//console.log(buffer1);
				//alert(config.cat);

				function addQuestions(count, category) {
					//console.log(category.length); 
					for(i=0; i<count; i++) {
						var randomNumber = Math.floor((Math.random() * category.length) + 1);
						buffer1.push(category[randomNumber]);
						//console.log(randomNumber);
					}
				}

				if(config.cat == "a" || config.cat == "b") {
					addQuestions(3, bufferA);
				}
				if(config.cat == "t" || config.cat == "b") {
					addQuestions(2, bufferT);
				}
				if(config.cat == "b") {
					addQuestions(3, bufferB);
				}

				//console.log(buffer1);	
				//console.log(currentThemeRealReal);
				currentThemeReal = buffer1;

				themesDBCopy = null; /* destroy big and no longer needed */ 
				//TODO: points
				/*
				var pts = 0;
				$.each(currentThemeReal, function(key, value){
					pts += value[0];
				});
				*/
				//console.log(pts);
				//Math.floor((Math.random() * 100) + 1);
				//currentThemeReal.push(); 	
		}

		renderQuestion();
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

		if(currentTheme == 19) {
			
			if(currentQuestion >= currentThemeReal.length) {
				$('#wrong').show();
				$('#wrong').css("display", "block");
				$('#correct').show();
				$('#correct').css("display", "block");
				$('#results').show();
				$('#results').css("display", "block");

				$('.container').css("max-height", "none");
				$('.container').css("height", "auto");
				$('#mid').css("max-height", "none");
			} else {

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
				$.each(currentThemeReal[currentQuestion][myLang], function(key, value){
					//console.log(value[0]);		
					if(value[0] == 1) {		
						$("#mid>.question .h4:eq(" + key +")").css("color","blue");
						answersDB.push(key); 
						//$(".question img:eq(" + key +")").css("border","2px solid red");
					}	
				});
				//JSON.stringify();

				if(currentThemeReal[currentQuestion][Q_IMG].length > 2) {
					$.each(currentThemeReal[currentQuestion][Q_IMG], function(key, value){
					//console.log(value[0]);		
					if(value[0] == 1) {				
						$("#mid>.question>.qzone .img_ctl:eq(" + key +")").css("border","2px solid blue");
						answersDB.push(key); 
						//$("#mid>.question img:eq(" + key +")").css("border","2px solid blue");
						//$(".question img:eq(" + key +")").css("border","2px solid red");
					}	
				});
				}

				checkQuestion = userInput.toString() === answersDB.toString() ? true : false; 


				var testQuestion = $("#mid>.question").detach();
				testQuestion.css("border"," 2px solid red");
				//testQuestion.css("margin-top","10px");
				//console.log(checkQuestion);
				if(checkQuestion){
					correct++;
					testQuestion.css("border","2px solid green");
					//correctA.push(testQuestion);
				 	//testQuestion.appendTo('#correct');
				
				} else {
					wrong++;
					testQuestion.css("border-color","red");
					//wrongA.push(testQuestion);
					//testQuestion.appendTo('#wrong');
				}
				testQuestion.appendTo('#results');
			
				currentQuestion++;
				renderQuestion();
			
			}	
		} else {
			if(flipflop == 1) {
				if(config.lang == "bg") {
					myLang = 6;
				}
				if(config.lang == "en") {
					myLang = 8;
				}
				var userInput = [];
				 
				var myquestion = $("#mid>.question");
			  	$(".qzone .btn", myquestion ).each(function( index , element) {
			        if ($(this).hasClass( "active" )) {                    
			            userInput.push(index);
			          // currentQuestionAnswers.push($(this).index(".active"));
			        }	
			    }); 

				var answersDB = [];
				$.each(currentThemeReal[currentQuestion][myLang], function(key, value){
					//console.log(value[0]);		
					if(value[0] == 1) {		
						$("#mid>.question .h4:eq(" + key +")").css("color","blue");
						answersDB.push(key); 
						//$(".question img:eq(" + key +")").css("border","2px solid red");
					}	
				});
				//JSON.stringify();

				if(currentThemeReal[currentQuestion][Q_IMG].length > 2) {
					$.each(currentThemeReal[currentQuestion][Q_IMG], function(key, value){
					//console.log(value[0]);		
					if(value[0] == 1) {				
						$("#mid>.question>.qzone .img_ctl:eq(" + key +")").css("border","2px solid blue");
						answersDB.push(key); 
						//$("#mid>.question img:eq(" + key +")").css("border","2px solid blue");
						//$(".question img:eq(" + key +")").css("border","2px solid red");
					}	
				});
				}

				checkQuestion = userInput.toString() === answersDB.toString() ? true : false; 

				//console.log(checkQuestion);
				if(checkQuestion){
					correct++;
				} else {
					wrong++;
				}

			} else if(flipflop == 2) {
				$("#mid>.question").remove();
				currentQuestion++;

				renderQuestion();

			}


			flipflop = flipflop  == 1 ? 2 : 1;	
			
		}

	});	


	function renderQuestion() {	

		var img_count = currentThemeReal[currentQuestion][Q_IMG].length;
		//console.log(currentQuestion);
		//console.log(currentThemeReal);
		var qtitle;
		var qanswers;
		/* TODO: use "switch" for clarity */
		if(config.lang == "bg") {
			myLang = [5,6]; 
		}
		if(config.lang == "en") {
			myLang = [7,8];
		}

		qtitle  = currentThemeReal[currentQuestion][myLang[0]]; 
			
		/* shuffle either the text or the img answers */
		if(img_count > 2) {
			shuffleArray(currentThemeReal[currentQuestion][Q_IMG]);	
		} else { 
			shuffleArray(currentThemeReal[currentQuestion][myLang[1]]); 
		}
		qanswers = currentThemeReal[currentQuestion][myLang[1]]; 
		
		//console.log(qanswers);
		//var qtitle = currentThemeReal[currentQuestion][5]; 

		//alert(currentThemeReal[currentQuestion][1]);
		var catType ="";
		//TODO: turn into switch 
		if(currentThemeReal[currentQuestion][Q_CAT] == "A"){
			catType = "bike";
		}
		if(currentThemeReal[currentQuestion][Q_CAT] == "T"){
			catType = "transport";
		}
		if(currentThemeReal[currentQuestion][Q_CAT] == "B"){
			catType = "car";
		} 
	/*	
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
		title += '\n\t\t<div>' + currentThemeReal[currentQuestion][Q_PTS] + '/' + currentThemeReal[currentQuestion][Q_ANSW].length + '</div>';
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
			//imgSrc += currentThemeReal[currentQuestion][4][0]; /* this not neeed I kept it for reference */					
	
			if(img_count > 0) {
				var imgSrc = "img/" + ("0" + (currentTheme+1)).slice(-2) + "/";
				
				/*	Temporary before merging of signs in common dir TODO: distinguish between fig and sign
					var imgSrc = "img/"; 
					var dirName = 
					var prefix = isNaN(currentThemeReal[currentQuestion][4][0].charAt(0)) ? "" : dirName + "/"; 
					imgSrc += prefix; 
				*/
				/* consolidate with img_ctl" */
				string += '\n\t<div class="img_ctl thumbnail">';
				string += '\n\t\t<div class="figure">';
				
				$.each(currentThemeReal[currentQuestion][Q_IMG], function(key, value){
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
			$.each(currentThemeReal[currentQuestion][Q_IMG], function(key, value) {
				var imgSrc = "img/"; 				
				var dirName = ("0" + (currentTheme+1)).slice(-2);
				//var prefix = isNaN(value[1].charAt(0)) ? "" : dirName + "/"; 
				var prefix = dirName + "/"; 
				imgSrc += prefix; 								

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
		/* TODO: consider spliting this into separate function */
		var progress = (((currentQuestion+1) / currentThemeReal.length) * 100); 
		$("#my-btn").empty().append("[" + (currentQuestion+1) + "/" + currentThemeReal.length + "][" + progress.toFixed(0) + "%]");
		
		/* TODO: round to 2 decimal */		
		//alert(progress); 			90deg, grey 40%, lightgrey 0%
		//$("#my-btn").css("background", `linear-gradient(90deg, grey ${progress}, lightgrey 0%)`);
		//$("#mid>.question").empty();
		//$("#my-btn").css("background", linear-gradient(90deg, rgb(51, 122, 183) ${progress}%, rgb(40, 96, 144) 0%)`);
		$("#my-btn").css("background", "linear-gradient(90deg, rgb(51, 122, 183)" + progress + "%, rgb(40, 96, 144) 0%)");
		var type = "question " + catType;  
		var questionContainer = '<div class="' + type + '"> </div>'; 
		$("#mid").append($.parseHTML( questionContainer ));
			
		$("#mid>.question").append($.parseHTML( title )); 
		$("#mid>.question").append($.parseHTML( string )); 
	}
});
