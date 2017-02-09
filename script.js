$(document).ready(function(){

  var request = $.ajax({
    url: "search",
    method: "POST",
    query: { input : searchInput },
    dataType: "json"
  });


  // data: JSON.stringify( this.pyscho )

  var searchInput = $("#searchInput")
  //.attr( "name" )


  request.done(function( msg ) {
    console.log( msg );
  });



  $("#searchSubmit").

  $("#searchSubmit").click(function(){
      $.post("search",
    { input : searchInput },
      function(data, status){
          alert("Data: " + data + "\nStatus: " + status);
      });
  });

  $("#searchSubmit").click(function(){
      $.get("search", function(data, status){
          alert("Data: " + data + "\nStatus: " + status);
      });
  });

});
