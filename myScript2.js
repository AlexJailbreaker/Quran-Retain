on()
let audio_element = document.getElementById('myAudio');
let error_sound1 = document.getElementById("errorSound1");
let error_sound2 = document.getElementById("errorSound2");


function changer(input){
  let file = input.files[0]; // Get the selected file from the input element
  let url = URL.createObjectURL(file); // Create a URL for the selected file
  document.getElementById('myAudio').src = url; // Set the audio source to the URL
document.getElementById('audioFilepath').value = url
document.getElementById('myAudio').load() // Load the new audio source
  let text = file.name;
  //let pattern = /(سورة\s[\u0600-\u06FF]+)|([Ss][Uu][Rr][Aa][Hh]\s[A-Za-z]+)/g;
	getname(text)
  //let result = text.match(pattern);
  document.getElementById('surahName_Qari').innerHTML=getname(text);
}

function omar (file) {
	let audio_element = document.getElementById('myAudio');
  	audio_element.src=file;
	 }
audio_element.onerror = function () {
		console.log(audio_element.error.code);
		document.getElementById("audioFilepath").value="File Not Found";
		document.getElementById('surahName_Qari').innerHTML=""
		document.getElementById('errormessageoverlay').innerHTML="Invalid File Format"
		error_sound1.play()
		document.getElementById('errormessageoverlay').style='color:red;font-weight:bold;cursor:pointer;';
		document.getElementById('div2').style.backgroundColor='red';
	}
audio_element.onloadeddata = function() {
	document.getElementById('div2').style.backgroundColor='green';
	document.getElementById('errormessageoverlay').style='color:green;font-weight:bold;cursor:pointer;';
	document.getElementById('errormessageoverlay').innerHTML="Success!"
	setTimeout(function(){
   		off()
	}, 500);
	document.getElementById('total_time').innerHTML=convertSecondsToMinutes(Math.floor(audio_element.duration));

}
let slider = document.getElementById("myRange");
let myInterval;
audio_element .onplaying = function() {
document.getElementById('play_button').style.display='none';
document.getElementById('pause_button').style.display='initial'; 
document.getElementById('disc_image').classList.add("rotate");
myInterval = setInterval(function () {document.getElementById("time_progross").innerHTML=convertSecondsToMinutes(Math.floor(audio_element.currentTime));
	slider.value= (Math.floor(audio_element.currentTime) * 100)/ audio_element.duration;
			}, 500 );
};

function forward_backward (seconds){
		if (seconds==5 && audio_element.paused==true){
			audio_element.pause();
			audio_element.currentTime=audio_element.currentTime-5;
			document.getElementById("time_progross").innerHTML=convertSecondsToMinutes(Math.floor(audio_element.currentTime));
			slider.value= (Math.floor(audio_element.currentTime) * 100)/ audio_element.duration;
			}
		else if (seconds==5 && audio_element.paused==false){
			audio_element.pause();
			audio_element.currentTime=audio_element.currentTime-5;
			document.getElementById("time_progross").innerHTML=convertSecondsToMinutes(Math.floor(audio_element.currentTime));
			slider.value= (Math.floor(audio_element.currentTime) * 100)/ audio_element.duration;
			audio_element.play();
			}
			else if (seconds==2 && audio_element.paused==false){
			audio_element.pause();
			audio_element.currentTime=audio_element.currentTime+5;
			document.getElementById("time_progross").innerHTML=convertSecondsToMinutes(Math.floor(audio_element.currentTime));
			slider.value= (Math.floor(audio_element.currentTime) * 100)/ audio_element.duration;
			audio_element.play();
			}
			else if (seconds==2 && audio_element.paused==true){
			audio_element.pause();
			audio_element.currentTime=audio_element.currentTime+5;
			document.getElementById("time_progross").innerHTML=convertSecondsToMinutes(Math.floor(audio_element.currentTime));
			slider.value= (Math.floor(audio_element.currentTime) * 100)/ audio_element.duration;
			}		
	}

function slider_change (value){
	if (audio_element.paused==true){
	audio_element.pause();
	audio_element.currentTime=Math.floor((value * audio_element.duration)/100);
	document.getElementById("time_progross").innerHTML=convertSecondsToMinutes(Math.floor((value * audio_element.duration)/100))}
	else {
			audio_element.pause();
			audio_element.currentTime=Math.floor((value * audio_element.duration)/100);
			document.getElementById("time_progross").innerHTML=convertSecondsToMinutes(Math.floor((value * audio_element.duration)/100));
			audio_element.play();
		}
	}

audio_element .onpause=function () {
	clearInterval(myInterval);
	document.getElementById('play_button').style.display='initial';
	document.getElementById('pause_button').style.display='none'; 
	document.getElementById('disc_image').classList.remove("rotate");
	}


function volume_control(volume_value){
	if (volume_value==0){
		audio_element.volume=0.0
		}
	else {
		audio_element.volume=volume_value/10;
		}
	setTimeout(function () {
	document.getElementById('volume_controler').style.display='none';
	}, 3000);	

	}

function speed_control(){
  const input = document.getElementById("lol");
  const file = input.files[0];
  const fullPath = file.fullPath;
  console.log(fullPath);
	}

function save_upload(variable){
	 if(variable=='s') {
			if (document.getElementById('verses_section').innerHTML.length>20){
				JSobj={}
				JSobj.audio_name=document.getElementById("myFile").files[0].name;
				JSobj.num_verses=document.getElementById("num_verses").value;
				for (let i=0; i < document.getElementById("num_verses").value ; i++){
					JSobj["verse_"+(i+1)+"_repitition"]=document.getElementById("verse_"+(i+1)+"_repitition").value;
					JSobj["verse_"+(i+1)]=document.getElementById("verse_"+(i+1)).value;
					}
				/*console.log(JSobj);*/
				JSONobj=JSON.stringify(JSobj);
				navigator.clipboard.writeText(JSONobj);
				alert("Copied");
				}		
				
		}
	else if (variable=='u'){
		if (document.getElementById("myFile").files.length == 0 )
		{
			document.getElementById("audioFilepath").value = "Error: File not uploaded"
			}
		else{
			if (document.getElementById('upload_textarea').style.display=="initial"){
			document.getElementById('upload_textarea').style.display="none"
			document.getElementById('release').style.border="0px solid red";
			} 
			else {
				document.getElementById('upload_textarea').style.display="initial"
			document.getElementById('release').style.border="3px solid red";

					};
				document.getElementById('upload_textarea')
			}
		}
	}
function upload_func(jsonObj){
let jsobj;
try {
	jsobj=JSON.parse(jsonObj);
	document.getElementById('upload_textarea').style.backgroundColor="white";
	let action_press=false
	for (let key in jsobj){
			if (action_press==true) {action_press=false;checking()}
			if (key=="num_verses"){action_press=true}
			if (key == "audio_name") {continue;}/* This is set by user before upload */
			document.getElementById(key).value=jsobj[key];
			}
	/*omar(document.getElementById("audioFilepath").value);*/
	const myTimeout = setTimeout(document.getElementById('upload_textarea').style.display='none', 5000);
	}
catch(err) {
	document.getElementById('upload_textarea').style.backgroundColor="red";
	document.getElementById('upload_textarea').style.border="2px solid white";
}
	

	}
function quran_image_on(status){
	if (status == 'on'){
		document.getElementById("qurantext").style.opacity=0
		document.getElementById("quranimage").style.opacity=1;

		}
	else{
		document.getElementById("quranimage").style.opacity=0
		document.getElementById("qurantext").style.opacity=1
		}
}
function revealTimeMarker(){
if (timemarker == 0)
	{
		timemarker = 1; 
		document.getElementById("startTimestamp").style.visibility = "visible";
		document.getElementById("endTimestamp").style.visibility = "visible";
		setTimeout(function(){
			document.getElementById("startTimestamp").style.opacity=1;
			document.getElementById("endTimestamp").style.opacity=1;
			document.getElementById("startTimestamp").style.zIndex=0;
			document.getElementById("endTimestamp").style.zIndex=0;
				}, 5);
		
	}
else
	{
			timemarker = 0; 
			document.getElementById("startTimestamp").style.opacity=0;
			document.getElementById("endTimestamp").style.opacity=0;
			document.getElementById("startTimestamp").style.visibility = "hidden";
			document.getElementById("endTimestamp").style.visibility = "hidden";
			document.getElementById("startTimestamp").style.zIndex=-1;
			document.getElementById("endTimestamp").style.zIndex=-1;
	}
	}
function reset() {
		document.getElementById("verses_section").innerHTML=" "
		//document.getElementById("start_").value="";
		//document.getElementById("_end").value=""
		document.getElementById("num_verses").value=""
		document.getElementById('startTimestamp').setAttribute('disabled',false);
		document.getElementById('endTimestamp').setAttribute('disabled' , false);
		document.getElementById('startTimestamp').style.cursor ="no-drop";
		document.getElementById('endTimestamp').style.cursor ="no-drop";
				document.getElementById('save_button').style.cursor ="no-drop";
				document.getElementById('save_button').setAttribute('disabled',false);
	}

