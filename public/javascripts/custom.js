$(window).ready(function(){
	

	//set landing page size
	var window_height = $(window).height();
	$("#main").css("height", window_height+"px");
	$("#personal").css("height", window_height+"px");
	$("#professional").css("height", window_height+"px");


	//datetime
	var datetime = new Date();
	var day_array = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
	var month_array = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var date = day_array[datetime.getDay()]+", "+month_array[datetime.getMonth()]+" "+datetime.getDate()+", "+datetime.getFullYear();
	$("#date").html(date);


	//image carousel
	var main_img_counter = 1;
	var main_img_max = 4;
	$("#main-img").attr("src", "./images/"+main_img_counter+".jpg");
	setInterval(function(){
		main_img_counter++;
		main_img_counter > main_img_max ? main_img_counter = 1 : main_img_counter; 
		$("#main-img").attr("src", "./images/"+main_img_counter+".jpg");
	}, 10000);


	//parallax front-page
	var parallax_counter = 0;
	var direction_delta = 0;
	var initialscrollposition = $(window).scrollTop();

	$(window).scroll(function(){
		direction_delta = $(window).scrollTop() - initialscrollposition;
		parallax_counter = parallax_counter+(direction_delta/2);
		$("#main-img").css("bottom", parallax_counter);
		initialscrollposition = $(window).scrollTop();
	});

	//scroll to appropriate section
	$("#per-link").click(function(event){
		event.preventDefault();
		var elementtoaccess = $(this).attr("href");
		var destination = $(elementtoaccess).offset().top+20;
		$("html, body").animate({scrollTop: destination}, 3000);


	});

	$("#pro-link").click(function(event){
		event.preventDefault();
		var elementtoaccess = $(this).attr("href");
		var destination = $(elementtoaccess).offset().top+20;
		$("html, body").animate({scrollTop: destination}, 3000);
	});

	//rotate cube
	var cube_vectorx = [30, 210, 30, 30, -60, 120];
	var cube_vectory = [30, -30, -60, 120, 0, -0];

	$("#per-cube .face").mouseover(function(){
		$("#per-cube .face").css("opacity", "0.5");
		$("#per-cube .face").css("height", "150px");
		$("#per-cube .face").css("width", "150px");
		$("#per-cube .face").css("margin", "25px");

		$(this).css("opacity", "0.9");
		$(this).css("height", "200px");
		$(this).css("width", "200px");
		$(this).css("margin", "0px");

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
		}, 500);

	});

	$("#per-cube .face").mouseout(function(){
	});	

	


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

