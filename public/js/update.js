$(function(){
	$('.form-holder').delegate("input", "focus", function(){
		$('.form-holder').removeClass("active");
		$(this).parent().addClass("active");
	})
})

$(document).ready(function() {
	const Toast = Swal.mixin({
		toast: true,
		position: 'top-end',
		showConfirmButton: false,
		timer: 3000
	  });
	$("#register").click(function(e){
	
		e.preventDefault();
		//When users click in register button send a post request with data
		//entered if data sent is ok, redirects to authentication and creates
		//a new user in DB, else show error.
		$.post("/clients/updateClient", { newName: $("#name").val(),
		 cc: $("#cc").val(),}).done(function(res) {
		  if(res.status === "success"){
		
			Toast.fire({
				type: 'success',
				title: 'Se ha generado un nuevo evento'
			  })
		  }else{
			Toast.fire({
				type: 'error',
				title: 'Ha ocurrido un error...'
			  })
		  }
		  })
		
		error: (error) => {
		  console.log(JSON.stringify(error));
		}
	  });
	});
	
	