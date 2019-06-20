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
		$.post("/clients/getClient", {cc: $("#cc").val()}).done(function(res) {
		  if(res){
            
			Toast.fire({
				type: 'success',
				title: 'Se ha encontrado el usuario'
              })
            var divContainer = document.getElementById("products");
            console.log(res)
            var toShow = res[0].products
            console.log(toShow)
            $('#name').val(res[0].name)
            $('#date').val(res[0].createdAt)
            divContainer.innerHTML = "";
            for(product in res[0].products){
                divContainer.innerHTML += '<input type="text" class="form-control" style="margin-left: auto;margin-right: auto;" value="'+toShow[product]+'" disabled></input>'
            }
            
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
	
	