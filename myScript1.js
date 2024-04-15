let timemarker = 0; // o means closed 1 means opened

function preventKeyboardInput(event) {
      event.preventDefault();
    }

let element_id_tracker;

function convertSecondsToMinutes(seconds) {
  let minutes = Math.floor(seconds / 60);
   seconds = seconds % 60;

  let minutesString = minutes.toString();
  let secondsString = seconds.toString();

  if (minutes < 10) {
    minutesString =  minutesString;
  }

  if (seconds < 10) {
    secondsString = "0"+ secondsString;
  }

  return minutesString + ":" + secondsString;
};


function element_time_fill(left_right) {
let audio_element = document.getElementById('myAudio');

	if (left_right == "left"){
			let left_timestapp=convertSecondsToMinutes(Math.floor(audio_element.currentTime));
			document.getElementById(element_id_tracker).value=left_timestapp;
			audio_element.pause();
	}
	else if (left_right == "right"){
			let right_timestapp="-"+convertSecondsToMinutes(Math.floor(audio_element.currentTime));
			document.getElementById(element_id_tracker).value+=right_timestapp;
			audio_element.pause();
		}

		};
	function validation(input_field){
		let user_input=document.getElementById(input_field).value;
		switch(input_field) {
			case 'start_':
				if (/^[0-9]+:[0-9]{2}$/.test(user_input)==false || user_input<0 ||  user_input>document.getElementById("myAudio").duration){
					document.getElementById("start_").value="Invalid";
					break;
				}
			case '_end':
				if (/^[0-9]+:[0-9]{2}$/.test(user_input)==false || user_input<0 ||  user_input>document.getElementById("myAudio").duration){
					document.getElementById("_end").value="Invalid";
					break;
				}
		}
	}
function ProcessError(num)
	{
	//0 process success , 1 process fail
	//controls animation of process button
	switch(num){
		case 0: //sucesss
			document.getElementById('proccess').style=" \
			background-image: linear-gradient(144deg,#AF40FF, #5B42F3 50%,#00DDEB);";
			document.getElementById('startTimestamp').removeAttribute('disabled');
			document.getElementById('save_button').removeAttribute('disabled');
			document.getElementById('endTimestamp').removeAttribute('disabled');
			document.getElementById('startTimestamp').style.cursor ="pointer";
			document.getElementById('endTimestamp').style.cursor ="pointer";
			document.getElementById('save_button').style.cursor ="pointer";

			break;
		case 1: // fail
			document.getElementById('proccess').style="background: #e52d27;\
			background: -webkit-linear-gradient(to right, #b31217, #e52d27);";
			setTimeout(function(){
   				document.getElementById('proccess').style=" \
				background-image: linear-gradient(144deg,#AF40FF, #5B42F3 50%,#00DDEB);"
			}, 1000);
			error_sound1.play();
			break;
		}
	}
	function checking(){
		let num_verses= Number(document.getElementById('num_verses').value);
		if (!num_verses){
			ProcessError(1);
			//incase user did not input valid
		}			
		else if (document.getElementById('verses_section').innerHTML.length>5){
				ProcessError(1);
				//In case user has already processed some verse numbers
		}
		else{
		ProcessError(0);
		const element = document.getElementById("verses_section");
		for (let i =1; i<=document.getElementById("num_verses").value; i++){
			const div = document.createElement("div");
			/* Label creation                                                                       */
			const label = document.createElement("label");
			label.for="verse_"+i
			label.classList.add("verse_text_label");
			const node = document.createTextNode("Verse "+i);
			label.appendChild(node);
/*----------------------------------------------------------------------------------------*/
/*Input text creation                                                                    */
			const input = document.createElement("input");
			input.id="verse_"+i
			input.onchange=function(){
				if (this.value==""){this.value=""}
				else if (/^[0-9]+:[0-9]{2}-[0-9]+:[0-9]+$/.test(this.value)==false){
					this.value="Invalid"
				}
			}
			input.classList.add("verse_text");
			input.onclick=function () {element_id_tracker=this.id}
			input.pattern="^[0-9]+:[0-9]+-[0-9]+:[0-9]+$"
/*----------------------------------------------------------------------------------------*/
/*line break creation                                                                    */

			const line_break = document.createElement("br");
/*----------------------------------------------------------------------------------------*/
/*input number creation                                                                    */
			const input_number = document.createElement("input");
			input_number.type="number";
			input_number.id="verse_"+i+"_repitition";
			input_number.classList.add("verse_num_loop");
			input_number.onchange=function(){if ((this.value)>20 ||  (this.value)<1 ){this.value="1"}}
			input_number.onclick=function () {element_id_tracker=this.id}
/*----------------------------------------------------------------------------------------*/
			/*
			element.appendChild(label);
			element.appendChild(input);
			element.appendChild(input_number);
			element.appendChild(line_break);
			*/
			div.appendChild(label);
			div.appendChild(input);
			div.appendChild(input_number);
			element.appendChild(div)
			//element.appendChild(line_break);

			}
		/*Start button                                                                           */
			const start_button = document.createElement("button");
			const node = document.createTextNode("Play");
			start_button.appendChild(node);
			start_button.onclick=function() { 
				current_verse = 1
				player(1);
			}
			start_button.classList.add("start_reset");
		/*----------------------------------------------------------------------------------------*/
		/*Reset                                                                                   */
		/*	const reset_button = document.createElement("button");
			const node_1 = document.createTextNode("Reset");
			reset_button.appendChild(node_1);
			reset_button.classList.add("start_reset");
			reset_button.onclick=function() { 
				element.innerHTML=" "
				//document.getElementById("start_").value="";
				//document.getElementById("_end").value=""
				document.getElementById("num_verses").value=""
				document.getElementById('startTimestamp').setAttribute('disabled',false);
				document.getElementById('endTimestamp').setAttribute('disabled' , false);
				document.getElementById('startTimestamp').style.cursor ="no-drop";
				document.getElementById('endTimestamp').style.cursor ="no-drop";

			}
		*/
		/*----------------------------------------------------------------------------------------*/
			element.appendChild(start_button);
			//element.appendChild(reset_button);
		}
	}
function toSeconds(time) {
  // Split the time string into hours, minutes, and seconds.
  const [minutes, seconds] = time.split(':');

  // Convert the minutes to seconds.
  const minutesInSeconds = minutes * 60;

  // Add the minutes and seconds together.
  return minutesInSeconds + seconds/1;
}
let countering=1;
let num_verses;
let current_verse = 1;
	function player(i) {
		let audio_element = document.getElementById('myAudio');
		num_verses = document.getElementById("num_verses").value;
		let time_stap=document.getElementById("verse_"+i).value;
		let time_stap_array=time_stap.split("-");
		let start_time=toSeconds(time_stap_array[0]);
		let end_time=toSeconds(time_stap_array[1]);
		let num_loop=document.getElementById("verse_"+i+"_repitition").value;//Number of loops for each verse
		audio_element.currentTime=start_time;
		audio_element.play();	
		stop_adio_after_specific_time(audio_element,end_time,num_loop)
		 }



function stop_adio_after_specific_time(audio_element, stop_time_in_seconds, num_loop) {
  const timerID = setInterval(() => {
    if (audio_element.currentTime > (stop_time_in_seconds - 0.5)) {
      audio_element.pause();
      clearInterval(timerID);

      if (countering < num_loop) {
        countering += 1;
         player(current_verse);
      } else {
        countering = 1; // resets for next verse to play
        if (num_verses > current_verse) {
          current_verse += 1;
          player(current_verse);
        } else if (num_verses == current_verse) {
          current_verse = 1;
        }
      }
    } else {
    }
  }, 1000);
};

function on() {
	//document.getElementById("overlay").style.display = "flex";
	document.getElementById("overlay").style.opacity= 1;
}

function off() {
	document.getElementById("overlay").style.opacity= 0;
	setTimeout(function(){
   		document.getElementById("overlay").style.display = "none";
	}, 200);
}
