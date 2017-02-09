var menuId = $( "ul.nav" ).first().attr( "id" );
var request = $.ajax({
  url: "script.php",
  method: "POST",
  data: { id : menuId },
  dataType: "html"
});

request.done(function( msg ) {
  $( "#log" ).html( msg );
});

request.fail(function( jqXHR, textStatus ) {
  alert( "Request failed: " + textStatus );
});

$("button").click(function(){
    $.get("demo_test.asp", function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
    });
});

$("button").click(function(){
    $.post("demo_test_post.asp",
    {
        name: "Donald Duck",
        city: "Duckburg"
    },
    function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
    });
});
