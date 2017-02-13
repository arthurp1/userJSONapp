$(document).ready(function(){

  //
  // $("#searchSubmit").click( () => {
  //   $.post("search",  $("#searchInput").serialize(), (data, status) => {
  //     alert("Post data: " + data "\nStatus: " + status)
  //     })
  // })


  console.log("javascript is working ")
    $(document).on('submit', '#searchForm', function(e) {
      console.log('submit is pressed')
      $.ajax({
        url: $(this).attr('action'),
        type: "POST",
        data: $(this).serialize(),
        success: function(html) {
        console.log('ok');
      }
      });
      e.preventDefault();
      })

    // $('input').on('input', function(e){
    //   console.log('key change')
    // $.post({
    //   url: '/search',
    //   data: $(this).serialize(),
    //   success: function(matchData) {
    //     console.log('matches found: ' + matchData)
    //     }
    //   })
    //
    // })

  // request.done(function( msg ) {
  //   console.log( msg );
  // });


  // $("button").click( function() {
  //   var searchInput = $("#searchInput").val()
  //   $.post("search", searchInput, function(data, status) {
  //     alert("postData :" + data + "\nStatus:" + status)
  //   })

    // })//cick
    //

  // $("button").click( function() {
  //   var searchInput = $("#searchInput").val()
  //   $.ajax({
  //       url: "/search",
  //       type: "POST",
  //       dataType: "json",
  //       data: {objectData: searchInput },
  //       contentType: "application/json",
  //       cache: false,
  //       timeout: 5000,
  //       complete: function() {
  //         //called when complete
  //         console.log('process complete');
  //       },
  //
  //       success: function(data) {
  //         console.log(data);
  //         console.log('process sucess');
  //      },
  //
  //       error: function() {
  //         console.log('process error');
  //       }
  //     })//ajax
  //   })


  // $.post("search", {objectData: searchInput}, function(data, status) {
  //   alert("Post data :" + data "\nStatus: " + status)
  //



  // console.log(request.query.input)

  // data: JSON.stringify( this.pyscho )

  //.attr( "name" )




// $("#searchSubmit").click(function(){
//       $.get("search", function(data, status){
//           console.log("Get data: " + data + "\nStatus: " + status);
//       });
//   });
//
// });

// $("#searchSubmit").click(function(){
//     $.get("search", function(data, status){
//         console.log("Get data: " + data + "\nStatus: " + status);
//     });
// });*/
//
// $("#searchSubmit").click(function(){
//   $.ajax({
//     url: "search",
//     method: "POST",
//     dataType: "json"
//   });
//
// $("#searchForm").ajaxForm({url: 'search', type: 'post'})

})
