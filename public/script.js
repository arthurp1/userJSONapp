$(document).ready(function(){


// Modify your form again so that AJAX requests happen at most once every 300 milliseconds.

  $('input').on('input', function(e){
    $.post({
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
