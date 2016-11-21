// Katherine Lin EagleDream Blizzard Web App Javascript
$(document).ready(function(){

	// hide results div until form1 is submitted
	$(".results").hide();
	// hide error message unless it's called
	$("#errorMsg").hide();

	// spinner loading icon hide first, then display while loading
	$(".spinny").hide();
	$(document).ajaxStart(function(){
        $(".spinny").css("display", "block");
    });
    $(document).ajaxComplete(function(){
        $(".spinny").css("display", "none");
    });

	$("#form1").submit(function(){

		var characterName = $("#characterName").val();
		var realmName = $("#realmName").val();
		//var itemID = null;
		var statsUrl = "https://us.api.battle.net/wow/character/" + realmName + "/" + characterName + "?fields=stats&locale=en_US&jsonp=showStats&apikey=5u4rvmar9eaqsm9ffx8hwfqqdtfkddrj";
		var itemsUrl = "https://us.api.battle.net/wow/character/" + realmName + "/" + characterName + "?fields=items&locale=en_US&jsonp=showItems&apikey=5u4rvmar9eaqsm9ffx8hwfqqdtfkddrj";
		// var itemInfoUrl = "https://us.api.battle.net/wow/item/" + itemID + "?locale=en_US&apikey=5u4rvmar9eaqsm9ffx8hwfqqdtfkddrj";
		var type = "GET";
		var dataType = "jsonp";
		var contentType = "application/json";
		var callbackStats = "showStats";
		var callbackItems = "showItems";

		// When form is submitted, request data from API and display data in specified elements
		// request for character stats
		$.ajax({
  			url: statsUrl,
  			type: type,
  			dataType: dataType,
  			contentType: contentType,
  			jsonpCallback: callbackStats,
        	success: function(data){
        		console.log(data);
        		$("#strength").text(data.stats.str);
        		$("#agility").text(data.stats.agi);
        		$("#intellect").text(data.stats.int);
        		$("#stamina").text(data.stats.sta);
        		$("#mindamage").text(data.stats.mainHandDmgMin + " - ");
        		$("#maxdamage").text(data.stats.mainHandDmgMax);
        		$("#speed").text(data.stats.mainHandSpeed);
        		$("#manaregen").text(data.stats.mana5);
        		$("#armor").text(data.stats.armor);
        		$("#dodge").text(data.stats.dodge + "%");
        		$("#parry").text(data.stats.parry + "%");
        		$("#block").text(data.stats.block + "%");
        		$("#crit").text(data.stats.crit + "%");
        		$("#haste").text(data.stats.haste + "%");
        		$("#mastery").text(data.stats.mastery + "%");
        		$("#leech").text(data.stats.leech + "%");
        		$("#versatility").text(data.stats.versatility + "%");
        		// display results div
        		$(".results").slideDown();
        		$("#errorMsg").hide();
        		return false;
        	},
        	error: function (request, status, error) {
        		console.log(error);
        		$("#errorMsg").text("Looks like the Character or Realm Name does not exist!");
        		$("#errorMsg").show();
        		$(".results").hide();
        		return false;
    		}
		});

		// request for character's equipped items
		$.ajax({
  			url: itemsUrl,
  			type: type,
  			dataType: dataType,
  			contentType: contentType,
  			jsonpCallback: callbackItems,
        	success: function(data){
        		console.log(data);
        		$("#helmN").text(data.items.head.name);
        		$("#chestN").text(data.items.chest.name);
        		$("#shouldersN").text(data.items.shoulder.name);
        		$("#legsN").text(data.items.legs.name);
        		$("#feetN").text(data.items.feet.name);
        		$("#trinketN").text(data.items.trinket1.name);
        		$("#backN").text(data.items.back.name);
        		//$("#helmP").text("22222 ").append("<img src='media/wowcurrency.png' alt=''/>");
        		// var helmID = $.get(data.items.head.id);
        		// itemID = helmID;
        		//$("#helmP").text(data.buyPrice);
        		return false;
        	},
        	error: function (request, status, error) {
        		console.log(error);
        		$("#errorMsg").text("Looks like the Character or Realm Name does not exist!");
        		$("#errorMsg").show();
        		$(".results").hide();
        		return false;
    		}
		});
		

		// // request for item info
		// $.ajax({
  // 			url: itemInfoUrl,
  // 			type: type,
  // 			dataType: dataType,
  // 			contentType: contentType,
  // 			jsonpCallback: callbackItems,
  //       	success: function(data){
  //       		console.log(data);
  //       		$("#helmP").text(data.buyPrice);

  //       		return false;
  //       	},
  //       	error: function (request, status, error) {
  //       		console.log(error);
  //       		return false;
  //   		}
		// });

		// show results div

		return false;

	});

	$("#close").click(function(){
		$(".results").slideUp();
	});

});