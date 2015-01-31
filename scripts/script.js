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
          $("#information").empty();
  				$("#information").slideDown("fast");
          var deals = data.deals;
          deals.forEach(function (deal) {
            $("#information").append("<div class='active title'><i class='dropdown icon'></i>"+deal.deal.short_title+"</div>");
          });
  			}
  		});

    	return false;
  	});

  	$('.ui.accordion').accordion();
});