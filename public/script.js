$(document).ready(function(){


// autocomlete
  $('input').on('input', function(e){
    $.ajax({
      type: "POST",
      url: '/search',

      data: $(this).serialize(),
      success: function(data) {
        let options = ''
        for (var i = 0; i < data.length; i++) {
          options += '<option value="'+ data[i] +'"/>'
        }
        $('#suggestions').html(options)
      }
    })
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
