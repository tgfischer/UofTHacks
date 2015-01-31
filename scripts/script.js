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
    //$('.checkbox').checkbox('attach events', '.check.button', 'check');
    //$('.checkbox').checkbox('attach events', '.uncheck.button', 'uncheck');
    $(".ui.checkbox").checkbox();

	$("#searchButton").click(function() {
		$("#searchForm").submit();
	});

  	$("#searchForm").submit(function(e) {
  		// Fix sql injection threat;
  		var url = "https://api.sqoot.com/v2/deals?api_key=6vc2ns&query=" + $('#searchInput').val();
  		console.log(url);

  		$.ajax({
  			type : "GET",
  			url : url,
  			dataType : "jsonp",
  			success : function(data) {
          		$("#information").empty();
  				$("#information").slideDown("fast");
          		var deals = data.deals;

          		//notification();

          		deals.forEach(function (deal) {
            		console.log(deal); //helps to see what results the query brings back

            		if($("#location").is(':checked')) {
              			console.log("check location");
              			//return results based on location
        			}

        			var finePrint;

        			if (deal.deal.fine_print != null) {
        				finePrint = deal.deal.fine_print.replace("/•/g", ". ");
        			}

            		$("#information").append("<div class='title'> \
            								  	<i class='dropdown icon'></i>" + 
            								  	deal.deal.title + 
            								 "</div> \
            								 <div class='content'> \
            								 	<div class='ui middle aligned grid'>" +
            								 		(deal.deal.description == null ? "" : "<div class='row'> \
            								 			<div class='column'> \
            								 				<p>" + deal.deal.description + "</p> \
            								 			</div> \
            								 		</div>") + 
            								 		"<div class='equal height row'> \
            								 			<div class='six wide column'> \
            								 				<img class='ui rounded image' src='" + deal.deal.image_url + "' /> \
            								 			</div> \
            								 			<div class='ten wide column'> \
												 			<table class='ui unstackable table'> \
												 				<thead> \
												 					<tr> \
												 						<th colspan='2'>Contact Information</th> \
												 					</tr> \
												 				</thead> \
												 				<tbody> \
												 					<tr> \
												 						<td class='collapsing'>Address</td> \
												 						<td> \
												 							<addr>" + 
												 								deal.deal.merchant.address + "<br>" + 
												 								deal.deal.merchant.locality + " " + deal.deal.merchant.region + ", " + deal.deal.merchant.country_code + "<br>" +
												 								deal.deal.merchant.postal_code + " \
												 							</addr> \
												 						</td> \
												 					</tr> \
												 					<tr> \
												 						<td class='collapsing'>Phone</td> \
												 						<td>" + deal.deal.merchant.phone_number + "</td>\
												 					</tr> \
												 				</tbody> \
												 			</table> \
												 		</div> \
            										</div>" + (deal.deal.fine_print == null ? "" :
            										"<div class='row'> \
            											<div class='column'> \
            												<i>" + finePrint + "</i> \
            											</div> \
            										</div>") +
            										"<div class='row'> \
            											<div class='column'> \
            								 				<div id='" + deal.deal.url + "' class='ui fluid teal button'>" + 
            								 					deal.deal.provider_name + " \
            								 				</div> \
            								 			</div> \
            								 		</div> \
            								 	</div> \
            								 </div>");

            		var link = document.getElementById(deal.deal.url);
            		link.addEventListener('click', function() {
              			newTab(deal.deal.url);
            		});
          		});
  			}
      	});
    	
      	return false;
  	});

  	$('.ui.accordion').accordion();

  	$('.title').click(function() {
  		$('html').css({ height : "auto" });
  	});

  	function notification() {
		// Let's check if the browser supports notifications
  		if (!("Notification" in window)) {
    		alert("This browser does not support desktop notification");
  		}

  		// Let's check if the user is okay to get some notification
  		else if (Notification.permission === "granted") {
    		// If it's okay let's create a notification
   		 	var notification = new Notification("Hi there!");
  		}

  		// Otherwise, we need to ask the user for permission
  		// Note, Chrome does not implement the permission static property
  		// So we have to check for NOT 'denied' instead of 'default'
  		else if (Notification.permission !== 'denied') {
    		Notification.requestPermission(function (permission) {
	      		// If the user is okay, let's create a notification
	      		if (permission === "granted") {
	        		var notification = new Notification("Hi there!");
	      		}
	    	});
	  	}

  		// At last, if the user already denied any notification, and you 
  		// want to be respectful there is no need to bother them any more.
  	}

  	function newTab(url) {
    	chrome.tabs.create({ url: url });
  	}
});