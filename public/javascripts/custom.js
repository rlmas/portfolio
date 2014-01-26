$(window).ready(function(){
	
	//datetime
	var datetime = new Date();
	var day_array = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
	var month_array = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var date = day_array[datetime.getDay()]+", "+month_array[datetime.getMonth()]+" "+datetime.getDate()+", "+datetime.getFullYear();
	$("#date").html(date);


	//image carousel
	var main_img_counter = 1;
	var main_img_max = 4;
	var main_img_opacity = 0;
	var main_img2_opacity = 1;

	$("#main-img").attr("src", "./images/"+main_img_counter+".jpg");
	main_img_counter++;
	$("#main-img2").attr("src", "./images/"+main_img_counter+".jpg");


	setInterval(function(){

		//this switches opacity and all that
		$("#main-img").css("opacity", main_img_opacity);
		if (main_img_opacity == 0){
			main_img_counter++;
			main_img_counter > main_img_max ? main_img_counter = 1 : main_img_counter; 
			$("#main-img").attr("src", "./images/"+main_img_counter+".jpg");
			main_img_opacity = 1;
		}else{
			main_img_opacity = 0;
		}

		$("#main-img2").css("opacity", main_img2_opacity);
		if (main_img2_opacity == 0){
			main_img_counter++;
			main_img_counter > main_img_max ? main_img_counter = 1 : main_img_counter; 
			$("#main-img2").attr("src", "./images/"+main_img_counter+".jpg");
			main_img2_opacity = 1;
		}else{
			main_img2_opacity = 0;
		}
			
	}, 10000);


	//parallax front-page
	var parallax_counter = 0;
	var direction_delta = 0;
	var initialscrollposition = $(window).scrollTop();

	$(window).scroll(function(){
		direction_delta = $(window).scrollTop() - initialscrollposition;
		parallax_counter = parallax_counter-(direction_delta/2);
		if ($("#main-img").css("opacity")==1){
			$("#main-img").css("top", parallax_counter);
		}else{
			$("#main-img2").css("top", parallax_counter);
		}
			initialscrollposition = $(window).scrollTop();
	});

	//scroll to appropriate section
	$("#per-link").click(function(event){
		scroll_to(event, "#per-link");
	});

	$("#pro-link").click(function(event){
		scroll_to(event, "#pro-link");
	});

	$("#personal-pro-link").click(function(event){
		scroll_to(event, "#personal-pro-link");
	});

	$("#professional-per-link").click(function(event){
		scroll_to(event, "#professional-per-link");
	});

	$(".main-link").click(function(event){
		scroll_to(event, ".main-link");
	});

	//rotate cube
	var cube_vectorx = [20, 180, 10, 10, -70, 100];
	var cube_vectory = [10, -10, -90, 100, 0, 0];

	//reset cube + get rid of radio buttons with JS
	$("#radio-front").css("display", "none");
	$("#radio-back").css("display", "none");
	$("#radio-right").css("display", "none");
	$("#radio-left").css("display", "none");
	$("#radio-top").css("display", "none");
	$("#radio-bottom").css("display", "none");

	$("#per-cube .face").click(function(){

		if ($("body").width() > 685){
			if ($(this).css("opacity")!="1" || ($(".front").css("opacity")=="1" && $(".back").css("opacity")=="1")){

				reset_cube();
				$(this).css("opacity", "1");
				$(this).css("height", "300px");
				$(this).css("width", "300px");
				$(this).css("margin", "0px");
				$(this).find(".face-description").css("opacity", "1");
				//$(this).find(".face-description").css("height", "auto");
				//$(this).find(".face-description").css("width", "600px");
				$(this).find(".face-description").css("font-size", "20px");
				$(this).find(".face-description").css("display", "block");

				var cube_face = $(this).attr("class");
				if (cube_face == "face front"){
					cube_face = 0;
				}else if (cube_face == "face back"){
					cube_face = 1;
				}else if (cube_face == "face right"){
					cube_face = 2;
				}else if (cube_face == "face left"){
					cube_face = 3;
				}else if (cube_face == "face top"){
					cube_face = 4;
				}else if (cube_face == "face bottom"){
					cube_face = 5;
				}
				x_rotate = cube_vectorx[cube_face];
				y_rotate = cube_vectory[cube_face];

				setTimeout(function(){
					$("#per-cube").css("transform", "rotateX("+x_rotate+"deg) rotateY("+y_rotate+"deg)");
					$("#per-cube").css("-webkit-transform", "rotateX("+x_rotate+"deg) rotateY("+y_rotate+"deg)");
				}, 200);

			}else{
				reset_cube();
				$("#per-cube").css("transform", "rotateX(30deg) rotateY(30deg)");
				$("#per-cube").css("-webkit-transform", "rotateX(30deg) rotateY(30deg)");
			}
		}

	});
	

	//timer
	var timer_interval;

	$('#timer').click(function(){
		clearInterval(timer_interval);

		var h = 0;var m = 0;var s = 0;var ms = 0;
		var h_text;var m_text;var s_text;

		timer_interval = setInterval(function(){
			ms = ms + 1;
			if (ms > 8){
				ms = 0;
				s = s + 1;
				if (s > 59){
					s = 0;
					m = m + 1;
					if (m > 59){
						 m = 0;
						 h = h + 1;
					}
				}
			}
			s_text = padstr(s, 2);m_text = padstr(m, 2);h_text = padstr(h, 2);

			var time = h_text+':'+m_text+':'+s_text+'.'+ms;
			$('#timer').html(time);
		}, 100);
	});

	//coast blinker
	var color1 = "rgb(115, 246, 121)";
	var color2 = "rgb(0, 206, 52)";
	setInterval(function(){
		if ($("#coast-pin span").css("background-color") == color1){
			$("#coast-pin span").css("background-color", color2);
		}else{
			$("#coast-pin span").css("background-color", color1);
		}
	}, 600);

});

//datetime
function update_time(){
	var datetime = new Date();
	var time = (datetime.getHours() < 10 ? "0" : "") + datetime.getHours()+":"+(datetime.getMinutes() < 10 ? "0" : "") + datetime.getMinutes();
	var seconds = (datetime.getSeconds() < 10 ? "0" : "") + datetime.getSeconds()
	/*+":"+(datetime.getSeconds() < 10 ? "0" : "") + datetime.getSeconds()*/
	$("#time").html(time);
	$("#seconds").html(seconds);
}

function scroll_to(event, elemid){
	event.preventDefault();
	var elementtoaccess = $(elemid).attr("href");
	var destination = $(elementtoaccess).offset().top+20;
	$("html, body").animate({scrollTop: destination}, 200);
}

function reset_cube(){
	$("#per-cube .face").css("opacity", "0.8");
	$("#per-cube .face").css("height", "150px");
	$("#per-cube .face").css("width", "150px");
	$("#per-cube .face").css("margin", "75px");
	$("#per-cube .face .face-description").css("opacity", "0");
	//$("#per-cube .face .face-description").css("height", "0");
	//$("#per-cube .face .face-description").css("width", "0");
	$("#per-cube .face .face-description").css("font-size", "0");
	$("#per-cube .face .face-description").css("display", "none");
}

function padstr(str, padcount){
	str == 0 ? str='' : str=str.toString();
	var count = 0;
	var pad = '';
	var padcount = padcount - str.length;
	while (count < padcount){
		pad = '0'+pad;
		count++;
	}
	return '<span>'+pad+'</span>'+str;
}
