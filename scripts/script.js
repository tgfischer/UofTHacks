$(document).ready(function() {
	/*var validationRules = {
    	value: {
      		identifier  : 'value',
      		value: [
      			{
        			type   : 'empty',
        			prompt : 'Please enter something!'
      			}
      		]
    	}
	};

	$("#searchForm").form(validationRules, { 
    	on: 'submit' 
  	});*/

	$("#searchButton").click(function() {
		$("#searchForm").submit();
	});

  	$("#searchForm").submit(function(e) {
  		// Fix sql injection threat
  		var url = "https://api.sqoot.com/v2/deals?api_key=6vc2ns&query="+$('#searchInput').val();
  		console.log(url);

  		$.ajax({
  			type : "GET",
  			url : url,
  			dataType : "jsonp",
  			success : function(data) {
  				$("#information").slideDown("fast");
          var result = JSON.parse(data);
          console.log(result);
  			}
  		});

    	return false;
  	});

  	$('.ui.accordion').accordion();
});