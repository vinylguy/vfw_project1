// Nathan Baker
// Project 2
// VFW - Term 04/2012

//Wait until the DOM is loaded.
window.addEventListener("DOMContentLoaded", function(){

	function $(x){
		var theElement = document.getElementById(x);
		return theElement;
	}

	//Select field element
	function makePar(){
		var formTag = document.getElementsByTagName("form"),
			selectLi = $("select"),
			makeSelect = document.createElement("select");
			makeSelect.setAttribute("id", "par");
		for(var i=0, j=parScore.length; i<j; i++){
			var makeOption = document.createElement("option");
			var optText = parScore[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}
		selectLi.appendChild(makeSelect);
	}
	
	//Find value of radio button
	function getSelectedRadio(){
		var radios = document.forms[0].targets
		for(var i=0; i<radios.length; i++){
			if(radios[i].checked){
				targetsValue = radios[i].value;
			}
		}
	}

	//Im unsure how to add for multiple check box items.	
	/*function getCheckBoxValue(){
		if($().checked)
	};*/

	//Toggle controls.
	function toggleControls(n){
		switch(n){
			case "on":
				$("courseReview").style.display = "none";
				$("clearLink").style.display = "inline";
				$("displayLink").style.display = "none";
				$("addNew").style.display = "inline";
				break;
			case "off":
				$("contactForm").style.display = "block";
				$("clear").style.display = "inline";
				$("displayLink").style.display = "inline";
				$("addNew").style.display = "none";
				$("items").style.display = "none";
				break;
			default:
				return false;
		}
	}
	
	//Store Data
	function storeData(){
		var id 					= Math.floor(Math.random()*10000001);
		//Pull form field values and store inside an object.
		getSelectedRadio();
		var item 				= {};
			item.select	 		= ["Par:", $("select").value];
			item.cname 			= ["Course Name:", $("cname").value];
			item.location		= ["Location:", $("location").value];
			item.totalholes 	= ["Total Holes:", $("totalholes").value];
			item.rname			= ["Reviewer Name:", $("rname").value];
			item.reviewdate		= ["Review Date:", $("reviewdate").value];
			item.targets 		= ["Target Type:", targetsValue];
			item.courseRating 	= ["Course Rating:", $("courseRating").value];
			item.comments		= ["Comments:", $("comments").value];
		//Save data into local storage.
		localStorage.setItem(id, JSON.stringify(item));
		alert("Review Submitted");
	};

	function getData(){
		toggleControls("on");
		if(localStorage.length === 0){
			alert("There is no data in local storage.");
		}
		var makeDiv = document.createElement("div");
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement("ul");
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$("items").style.display = "block";
		for(var i=0, len=localStorage.length; i<len; i++){
			var makeli = document.createElement("li");
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
			var makeSubList = document.createElement("ul");
			makeli.appendChild(makeSubList);
			for(var n in obj){
				var makeSubli = document.createElement("li");
				makeSubList.appendChild(makeSubli);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubli.innerHTML = optSubText;
			}
		}
	}
	
	function clearLocal(){
		if(localStorage.length === 0){
			alert("There is no data to clear.");
		}else{
			localStorage.clear();
			alert("All Reviews are deleted");
			window.location.reload();
			return false;		
		}
	}

	var parScore = ["--Choose Par--", "Par 3", "Par 4", "Par 5"],
		targetsValue
	;
		
	makePar();

	//Set link and Submit click events
	var displayLink = $("displayLink");
	displayLink.addEventListener("click", getData);
	var clearLink = $("clearLink");
	clearLink.addEventListener("click", clearLocal);
	var save = $("submit");
	save.addEventListener("click", storeData);


});