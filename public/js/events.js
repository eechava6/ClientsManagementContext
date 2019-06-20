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


    $.get("/clients/events").done(function(res) {
        Toast.fire({
            type: 'success',
            title: 'Se han cargado los datos exitosamente'
            })

              // EXTRACT VALUE FOR HTML HEADER. 
        var col = [];
        for (var i = 0; i < res.result.length; i++) {
            for (var key in res.result[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }
                 console.log(col)
            var table = document.createElement("table");

                // ADD JSON DATA TO THE TABLE AS ROWS.
                for (var i = 0; i < res.result.length; i++) {

                    tr = table.insertRow(-1);

                    for (var j = 0; j < col.length; j++) {
                        if(col[j] === "data"){
                            var tabCell = tr.insertCell(-1);
                            tabCell.innerHTML = res.result[i][col[j]].name;
                        }	else if(col[j] !== "_id" && col[j] !== "__v"){
                            var tabCell = tr.insertCell(-1);
                            tabCell.innerHTML = res.result[i][col[j]];
                        }						
                    }
            }

            var divContainer = document.getElementById("data");
        divContainer.innerHTML = " <div class='table-responsive'>"+
                '<table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">'+
                    '<thead>'+
                    '	<tr>'+
                            '<th>CC</th>'+
                            '<th>Tipo de evento</th>'+
                            '<th>Contenido</th>'+
                            '<th>Timestamp</th>'+
                        '</tr>'+
                    '</thead>'+table.innerHTML
                +"</table>"+
            "</div>"

            console.log(table.innerHTML)
            $('#dataTable').DataTable();
            })



 });


