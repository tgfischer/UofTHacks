$(document).ready(function() {
	var currentPage;
	var totalPages;

	$(".hide").hide();

	$("#searchButton").click(function() {
		$("#information").hide();
		$("#search-results").hide();
		$(".pagination.menu").hide();
		$("#searchForm").submit(); 
	});

	$('#searchItem').keydown(function(event) {
		if (event.keyCode == 13) {
			$("#searchForm").submit(); 
			return false;
		}
	});

	$('#searchCity').keydown(function(event) {
		if (event.keyCode == 13) {
			$("#searchForm").submit(); 
			return false;
		}
	});

	$("#searchForm").submit(function(e) {
		var city = capitaliseFirstLetter($('#searchCity').val().toLowerCase());
		var url = "https://api.sqoot.com/v2/deals?api_key=6vc2ns&query=" + $('#searchItem').val() + "&location=" + city;
		currentPage = 1;

		pageLoad(url, city, currentPage);

		return false;
	});

	function pageLoad (url, city, currentPage) {
		$("#spinner").show();
		scrollToAnchor("anchor");

		$.ajax({
			type : "GET",
			url : url,
			dataType : "jsonp",
			success : function(data) {
        var deals = data.deals;
        var query = data.query;

        totalPages = Math.ceil(Number(query.total) / 10);

				$("#spinner").hide();
				$("#information").empty();
				//$("#information").slideUp("fast");
				$("#no-results").slideUp("fast");

				if (deals.length == 0 || (city && !query.location.locality)) {
					$("#no-results").slideDown("fast");
					$(".hide").slideUp("fast");
					return;
				}

				$(".hide").slideDown("fast");

				$("#page-number").empty();
				$("#page-number").append(currentPage + " / " + totalPages);

				$("#search-results").empty();
				$("#search-results").append("Deals: "+ query.total + " results found");

				if (currentPage == totalPages) {
					$("#next-page").addClass("disabled");
				} else {
					$("#next-page").removeClass("disabled");
				}

				if (currentPage == 1) {
					$("#prev-page").addClass("disabled");
				} else {
					$("#prev-page").removeClass("disabled");
				} 

				deals.forEach(function (deal) {
        			$("#information").append("<div class='title'> \
          										<i class='dropdown icon'></i>" + 
          										deal.deal.title + 
          									"</div> \
          									<div class='content'> \
          										<div class='ui middle aligned grid'>" +
          											(deal.deal.description == null ? "" : 
          											"<div class='row'> \
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
          																		(deal.deal.merchant.address == null ? "None Provided" : 
          																		deal.deal.merchant.address + "<br>" + 
          																		deal.deal.merchant.locality + " " + deal.deal.merchant.region + ", " + deal.deal.merchant.country_code + "<br>" +
          																		deal.deal.merchant.postal_code) + " \
          																	</addr> \
          																</td> \
          															</tr> \
          															<tr> \
          																<td class='collapsing'>Phone</td> \
          																<td>" + (deal.deal.merchant.phone_number == null ? "None Provided" : deal.deal.merchant.phone_number) + "</td> \
          															</tr> \
          														</tbody> \
          													</table> \
          												</div> \
          											</div>" + 
          											(deal.deal.fine_print == null ? "" :
          											"<div class='row'> \
          												<div class='column'> \
          													<i>" + deal.deal.fine_print + "</i> \
          												</div> \
          											</div>") +
          											"<div class='row'> \
          												<div class='column'> \
          													<div id='" + deal.deal.id + "' class='ui fluid teal button'>" + 
          														deal.deal.provider_name + " \
          													</div> \
          												</div> \
          											</div> \
          										</div> \
          									</div>");

					$("#"+deal.deal.id).click(function() {
            newTab(deal.deal.url);
					});
          
				}); //end of loop

				$('html').css({ height : "auto" });
	      	} //end of success
	    }); //end of ajax
	}

	$("#next-page").click(function() {
		$(this).removeClass("disabled");

		if (currentPage == totalPages) {
			$(this).addClass("disabled");
			return;
		}

		go(1);
	});

	$("#prev-page").click(function() {
		$(this).removeClass("disabled");

		if (currentPage == 1) {
			$(this).addClass("disabled");
			return;
		}

		go(-1);
	});

	$('.ui.accordion').accordion();

	$('.title').click(function() {
		$('html').css({ height : "auto" });
	});

	function newTab(url) {
		chrome.tabs.create({ url: url });
	}

	function capitaliseFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	function go(n) {
		currentPage = currentPage + n
		var city = capitaliseFirstLetter($('#searchCity').val().toLowerCase());
		var url = "https://api.sqoot.com/v2/deals?api_key=6vc2ns&query=" + $('#searchItem').val() + "&location=" + city + "&page=" + currentPage;

		pageLoad(url, city, currentPage);
	}

	function scrollToAnchor(anchor) {
    	var tag = $("a[name='" + anchor + "']");
    	$('html, body').animate({ scrollTop : tag.offset().top }, "fast");
	}
});