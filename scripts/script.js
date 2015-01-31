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
  		var url = "https://en.wikipedia.org/w/api.php?format=json&action=query&titles=" + $("#searchInput").val() + "&prop=revisions&rvprop=content&callback=?";
  		console.log(url);

  		$.ajax({
  			type : "GET",
  			url : url,
  			dataType : "jsonp",
  			success : function(data) {
  				$("#information").slideDown("fast");
  			}
  		});

    	return false;
  	});

  	$('.ui.accordion').accordion();
});