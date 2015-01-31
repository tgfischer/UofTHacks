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
  var link;

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
            //console.log(deal);
            $("#information").append("<div class='active title'><i class='dropdown icon'></i>"+deal.deal.title+"</div><div class='active content'><div id='"+deal.deal.url+"' class='ui teal basic button'>"+deal.deal.provider_name+"</div></div>");

            link = document.getElementById(deal.deal.url);
            link.addEventListener('click', function() {
              newTab(deal.deal.url);
            });
          
          });
  		  }

      });
    	return false;
  	});
  

  function newTab(url) {
    //console.log(url);
    chrome.tabs.create({ url: url });
  }

  $('.ui.accordion').accordion();

});