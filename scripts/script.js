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
  $('.checkbox').checkbox('attach events', '.check.button', 'check');
  $('.checkbox').checkbox('attach events', '.uncheck.button', 'uncheck');

	$("#searchButton").click(function() {
		$("#searchForm").submit();
	});

  	$("#searchForm").submit(function(e) {
  		// Fix sql injection threat;
  		var url = "https://api.sqoot.com/v2/deals?api_key=6vc2ns&query="+$('#searchInput').val();
  		console.log(url);

      //iteratate through all all checkboxes
      $.each($("[type=checkbox]"), function() {
        console.log($(this).is(':checked'));
      });

  		$.ajax({
  			type : "GET",
  			url : url,
  			dataType : "jsonp",
  			success : function(data) {
          $("#information").empty();
  				$("#information").slideDown("fast");
          var deals = data.deals;

          deals.forEach(function (deal) {
            console.log(deal); //helps to see what results the query brings back

            if($("#location").is(':checked')){
              console.log("check location");
              //return results based on location
            }

            $("#information").append("<div class='active title'><i class='dropdown icon'></i>"+deal.deal.title+"</div><div class='active content'><div id='"+deal.deal.url+"' class='ui teal basic button'>"+deal.deal.provider_name+"</div></div>");

            var link = document.getElementById(deal.deal.url);
            link.addEventListener('click', function() {
              newTab(deal.deal.url);
            });

          
          });
  		  }


      });
    	
      return false;
  	});
  

  function newTab(url) {
    chrome.tabs.create({ url: url });
  }

  $('.ui.accordion').accordion();
  $(".collapse").collapse();
});