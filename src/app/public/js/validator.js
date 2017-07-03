var data = {};
$(document).ready(function() {
  $('input[type="submit"]').on('click', function() {
      resetErrors();
      var url = 'process.php';
      $.each($('form input, form select'), function(i, v) {
          if (v.type !== 'submit') {
              data[v.name] = v.value;
          }
      }); //end each
      $.ajax({
          dataType: 'json',
          type: 'POST',
          url: url,
          data: data,
          success: function(resp) {
              if (resp === true) {
                  	//successful validation
                      $('form').submit();
                  	return false;
              } else {
                  $.each(resp, function(i, v) {
	        console.log(i + " => " + v); // view in console for error messages
                      var msg = '<label class="error" for="'+i+'">'+v+'</label>';
                      $('input[name="' + i + '"], select[name="' + i + '"]').addClass('inputTxtError').after(msg);
                  });
                  var keys = Object.keys(resp);
                  $('input[name="'+keys[0]+'"]').focus();
              }
              return false;
          },
          error: function() {
              console.log('there was a problem checking the fields');
          }
      });
      return false;
  });
});
function resetErrors() {
    $('form input, form select').removeClass('inputTxtError');
    $('label.error').remove();
}