
var map; 

$(document).ready(function() {
    //When user clicks in another tab inactive, unactive actual tab
    //and activates selected tab
    $("div.bhoechie-tab-menu>ul.list-group>a").click(function(e) {
        e.preventDefault();
        $(this).siblings('a.active').removeClass("active");
        $(this).addClass("active");
        var index = $(this).index();
        //If selected tab is Tracking history updates history with DB
        if(index == 2)
        {
            updateTable();
        }else if(index == 4){
        //If selected tab is Log Out, deletes user cookie and redirects
        // him to authentication.
            $.post("/users/logoutUser",{}).
            done(function(res) {
            if(res.status === "success"){
                window.location.assign('/users/authenticateUser')}})
        }
        $("div.bhoechie-tab>div.bhoechie-tab-content").removeClass("active");
        $("div.bhoechie-tab>div.bhoechie-tab-content").eq(index).addClass("active");
    });
    //When users click in tracking button starts/stops autoUpdate service
    $("#tracking").click(autoUpdate)
    //When users click in delete button clear history from DB
    //and restarts map (To delete markers)
    $("#clearHistory").click(function(){
        $.post("/locations/clearLocations",{})
        updateTable()
        initMap()
    })

    $("#tomap").click(CoordsToMap)
    //Once the window is loaded inits GoogleMaps
    $(window).load(function(){
        initMap()
    });
    
    
});

//Google maps inicialization
function initMap() {
    map = new google.maps.Map(document.getElementById('map'));
    //Determines and center Map into user location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude}
    
    map.setCenter(pos);
    map.setZoom(20);
    
    ;});}
    //Adds a listener when uses clicks map
    //adds a new marker
    map.addListener('click', function(e) {
        placeMarker(e.latLng, map,true);
    });
      
   }

//Calls for a track name and converts longitudes and latitudes into
//map markers
function CoordsToMap(){
    if($("#trackname").val() === ""){
        $("#trackname").attr("placeholder","WRITE A VALID TRACK NAME")
        $("#failed").show();
        $("#found").hide();
        return;
    }
    $.post("/locations/mapLocations",{trackId:$("#trackname").val()}).
    done(function(res) {
      if(res.status === "success" && res.data.length > 0){
        $("#failed").hide();
        $("#found").show();
        initMap();
        //If sucess add pointers to map
        trackArray = JSON.parse(JSON.stringify(res.data));
        console.log(trackArray)
        for (trackLine in trackArray) {
                console.log(trackArray[trackLine])
                var pos = new google.maps.LatLng(trackArray[trackLine].latitude
                ,trackArray[trackLine].longitude);  
                placeMarker(pos,map,false)  
        }
      }else{
        $("#trackname").attr("placeholder","WRITE A VALID TRACK NAME")
        $("#found").hide();
        $("#failed").show();
      }
      });
}

//AutoUpdate function
function autoUpdate() {
    //If state is Start Tracking: Starts tracking every 
    //5 seconds and adds marker where user is, also
    //adds to DB
    if($("#track").val() === ""){
        $("#track").val("NoLocationName")
    }
    if($("#tracking").text() === "Start Tracking"){
        $("#track").prop('disabled',true)
        $("#tracking").text("Stop Tracking")
        var index = 0;
        interval = setInterval(function () {
    
            navigator.geolocation.getCurrentPosition(function(position) {  
                var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                placeMarker(pos,map,true)
                index++;
                $('#count').text(index)
                updateTable()
            }); 
        }, 5000);
//If State is Stop Tracking, stops interval.
    }else{ 
        clearInterval(interval);
        $("#tracking").text("Start Tracking")
        $("#track").val("")
        $("#track").prop('disabled',false)
    }
    
  }

//Function to place a Marker in map and add history to DB
function placeMarker(position, map, save) {
    console.log(position);
    var marker = new google.maps.Marker({
        position: position,
        map: map
    });
    map.panTo(position);
    if(save){
    $.post("../locations/saveLocation", {latitude:position.lat,longitude:position.lng,trackId: $("#track").val()})
    }
    }

//Function to update table
function updateTable(){
    //Send a get request to DB to bring all user history
    $.get("/locations/searchLocations",function(data, status){
    }).
    done(function(res) {
      if(res.status === "success"){
        //If sucess add data as a HTML table
        txt = "";
        myObj = JSON.parse(JSON.stringify(res.data));
        txt += "<table  id='tripsTable'>"+
        "<tr><th>Track Name</th>"+
        "<th>Latitude</th>"+
        "<th>Longitude</th>"+
        "<th>Date</th>"+
        "<th>Hour</th></tr>"

        for (x in myObj) {
          txt += "<tr><td>"+myObj[x].trackId +
          "</td><td>"+myObj[x].latitude + 
          "</td><td>"+myObj[x].longitude+
          "</td><td>"+myObj[x].date+
          "</td><td>"+myObj[x].hour+
          "</td></tr>";
        }
        txt += "</table>"    
        $('#tripsData').html(txt);
      }

      });
}

