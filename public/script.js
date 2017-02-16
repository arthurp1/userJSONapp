$(document).ready(function(){
// autocomlete
var ajaxTimer = 0

  $('input').on('input', function(e){
    if ((ajaxTimer + 1000) < Date.now()) {
        $.ajax({
          type: "POST",
          url: '/search',
          data: $(this).serialize(),
          success: function(data) {
            ajaxTimer = Date.now()
            var options = ''
            for (var i = 0; i < data.length; i++) {
              options += '<option value="'+ data[i] +'"/>'
            }
            $('#suggestions').html(options)
            }
        })
      } else {
        console.log('Jammer Gijs, beter wacht je ff ' + ((ajaxTimer + 1000) - Date.now()) + ' ms')
      }
  })

  // post on button click
  $('#searchSubmit').on('click', function(e){
    query = $('input')
    e.preventDefault()
    $.post({
      url: '/searchresult',
      data: query,
      success: function (data) {
        $('div.results').html(data)
      }
    })
  })

})
