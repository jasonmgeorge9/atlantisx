/*
Project Name: Atlantis-X
Author: Jason M George
Website: http://www.atlantis-x.com
    ------------------------------------------------
			Atlantis Apps CONTENT TABLE
    ------------------------------------------------

    <!-- ======== GLOBAL FUNCTIONS ============= -->
    1.1 Get Random Key
    1.2 Format Me
    1.3 Is Date, Number, or String?
    1.4 Is Date, Attribute, or Metric?
    1.5 Sort Array Regardless of Type
    1.6 Get URL Parameters
    1.7 Calculate Number of Isotope Items Across
    1.8 Update Icon Picker Button
    1.9 Update Color Picker Button
    1.10 Toggle Atlantean
    1.11 Session Storage
    1.12 Translate Friendly Date
    
    <!-- ======== GLOBAL SCRIPT SETTING ======== -->
    2.1 Handle checkBoxes
    2.2 Handle Parsley
    2.3 Handle Isotope Gallery

    <!-- ======== DATA ========================= -->
    3.1 Mongo Data
    3.2 Connections Data
    3.3 Build SQL Statements
    3.4 Build Union Statement
    
    <!-- ======== GLOBAL PAGE SETUP ============ -->
    4.1 Add Background
    4.2 Add Header
    4.3 Add Sidebar
    4.4 Add User Nav
    4.5 Add Site Nav
    4.6 Add Content Container
    4.7 Add Footer


    <!-- ======== GLOBAL FACTORY =============== -->
    5.1 Regular Button
    5.2 Icon Button
    5.3 Search Box
    5.4 Tables
    5.5 Header Notifications
    5.6 Gritter Notifications
    5.7 JS Tree
    5.8 HighCharts
	

    <!-- ======== APPLICATION SETTING ========== -->
    Atlantis Application Controller


    <!-- ======== Global Objects =============== -->
	Global Objects


*/


/* 1.1 Get Random Key
------------------------------------------------- */
var getRandomKey = function(){

	var k='';
		var d = (new Date().getTime()).toString();
		var alphaList = {1:'a', 2:'b', 3:'c', 4:'d', 5:'e', 6:'f', 7:'g', 8:'h', 9:'i', 10:'j', 11:'k', 12:'l', 13:'m', 14:'n', 15:'o', 16:'p', 17:'q', 18:'r', 19:'s', 20:'t', 21:'u', 22:'v', 23:'w', 24:'x', 25:'y', 26:'z'};
		for (var i=0;i<13;i++){
	    k += alphaList[Math.floor(Math.random() * 26) + 1] + d[i];
	  }
	return k.substring(2);

};


/* 1.2 Format Me
------------------------------------------------- */
var formatMe = function(){

	return {

		none: function(nStr){
			return nStr;
		},
		generalFormat: function(item){

			if (!isNaN(item)) {

				if (Number(item) >= 1000 || Number(item) == Math.round(Number(item))){
					return formatMe.numberComma(item);
				}
				else if (Number(item) < 10){
					return formatMe.numberCommaTwo(item);
				}

			}
			else if (!isNaN(Date.parse(item))){

				return item;

			}
			else {

				return item;

			}

		},
		toTitleCase: function(nStr){
			
	        return nStr.replace(/_/g,' ').replace(/\w\S*/g, function(txt){
	        	return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	        });

	    },
		numberFun: function(nStr) {

	        nStr = Number(nStr);

	        if (nStr>1000000000) {
	            nStr = nStr/1000000000;
	            nStr= nStr.toFixed(2)+"B";
	        }
	        else if (nStr>1000000) {
	                nStr = nStr/1000000;
	                nStr= nStr.toFixed(1)+"M";
	        }
	        else if (nStr>1000) {
	                nStr = nStr/1000;
	                nStr= nStr.toFixed(1)+"K";
	        }
	        else {
	                nStr = nStr/1;
	                nStr= nStr.toFixed(0);
	        }
	        
	        return nStr;

	    },
	    dateMD: function(nStr) {
	    	return Number(nStr.substr(5,2)) + '/' + Number(nStr.substr(8,2))
	    },
	    dateMDY: function(nStr) {
	    	return Number(nStr.substr(5,2)) + '/' + Number(date.substr(8,2)) + '/' + Number(date.substr(2,2))
	    },
	    dateYYYYMMDD: function(nStr) {
	    	return nStr.substr(0,10)
	    },
	    dateYYYYMM: function(nStr) {
	    	return nStr.substr(0,4) + '-' +  date.substr(5,2)
	    },
	    secondsHMS: function(nStr) {
	    	var s = Math.floor(nStr%60);
	        var m = Math.floor((nStr%3600)/60);
	        var h = Math.floor((nStr%86400)/3600);

	        (s < 10) ? s ='0' + s : s = s;
	        (m < 10) ? m = '0' + m : m = m;
	        (h < 10) ? h = '0' + h : h = h;

	        if (h > 0){
	        	return h+":"+m+":"+s;
	        }
	        else {
	        	return Number(m)+":"+s;
	        }	        

	    },
	    numberComma: function(nStr) {

	        nStr = Number(nStr).toFixed(0);

	        nStr += '';
	        var x = nStr.split('.');
	        var x1 = x[0];
	        var x2 = x.length > 1 ? '.' + x[1] : '';
	        var rgx = /(\d+)(\d{3})/;
	        while (rgx.test(x1)) {
	            x1 = x1.replace(rgx, '$1' + ',' + '$2');
	        }

	        return  x1 + x2;

	    },
	    numberCommaTwo: function(nStr) {

	        nStr = Number(nStr).toFixed(2);

	        nStr += '';
	        var x = nStr.split('.');
	        var x1 = x[0];
	        var x2 = x.length > 1 ? '.' + x[1] : '';
	        var rgx = /(\d+)(\d{3})/;
	        while (rgx.test(x1)) {
	            x1 = x1.replace(rgx, '$1' + ',' + '$2');
	        }

	        return  x1 + x2;

	    },
	    numberCommaDollar: function(nStr) {

	    	nStr = Number(nStr).toFixed(0);

	        nStr += '';
	        var x = nStr.split('.');
	        var x1 = x[0];
	        var x2 = x.length > 1 ? '.' + x[1] : '';
	        var rgx = /(\d+)(\d{3})/;
	        while (rgx.test(x1)) {
	            x1 = x1.replace(rgx, '$1' + ',' + '$2');
	        }

	        return '$' + x1 + x2;

	    },
	    numberCommaDollarTwo: function(nStr) {

	    	nStr = Number(nStr).toFixed(2);

	        nStr += '';
	        var x = nStr.split('.');
	        var x1 = x[0];
	        var x2 = x.length > 1 ? '.' + x[1] : '';
	        var rgx = /(\d+)(\d{3})/;
	        while (rgx.test(x1)) {
	            x1 = x1.replace(rgx, '$1' + ',' + '$2');
	        }

	        return '$' + x1 + x2;

	    },
	    numberPct: function(nStr) {

	    	nStr = Number(nStr);
	        nStr = nStr *100;
	        nStr = (nStr.toFixed(0))+"%"
	        return nStr;

	    },
	    numberPctTwo: function(nStr) {

	    	nStr = Number(nStr);
	        nStr = nStr *100;
	        nStr = (nStr.toFixed(2))+"%"
	        return nStr;

	    },
	    vsCompLabel: function(nStr) {

	    	nStr = Number(nStr);
	        nStr = nStr *100;
	        nStr = nStr.toFixed(0)
	        var color = 'default';
	        var p = 0;

	        if (nStr < -5){
	        	color = 'danger'
	        }
	        else if(nStr > 5){
	        	color = 'success'
	        }

	        if (nStr.toString().length == 1){
	        	p = 21;
	        }
	        else if (nStr.toString().length == 2){
	        	p = 18;
	        }
	        else {
	        	p = 15;
	        }

	        if (nStr > 0){
	        	nStr = '+'+(nStr)+"%"
	        }
	        else {
	        	nStr = (nStr)+"%"
	        }
	        nStr = '<span class="label label-' + color + '" style="font-size: 12px; padding: 1px ' + p + 'px;">' + nStr + '</span>'
	        return nStr;

	    },

	}

}();


/* 1.3 Is Date, Number, or String?
------------------------------------------------- */
var isDateNumberString = function(item){

	if (!isNaN(item)) {

		return 'number';

	}
	else if (!isNaN(Date.parse(item))){

		return 'date';

	}
	else {

		return 'string';

	}

};


/* 1.4 Is Date, Attribute, or Metric?
------------------------------------------------- */
var isDateAttrMetric = function(item){

	if (!isNaN(item)) {

		return 'metric';

	}
	else if (!isNaN(Date.parse(item))){

		return 'date';

	}
	else {

		return 'attribute';

	}

};


/* 1.5 Sort Array Regardless of Type
------------------------------------------------- */
var sortArray = function(arr){

	var chk = arr[0];

	if (!isNaN(chk)) {

		arr.sort(function (a, b) {
		    return a - b;
		});

	}
	else if (!isNaN(Date.parse(chk))){

		arr.sort(function (a, b) {
			if (Date.parse(a) > Date.parse(b)) return 1;
			if (Date.parse(a) < Date.parse(b))return -1;
			return 0;
		});

	}
	else {

		arr.sort(function (a, b) {
		    var x = a.toUpperCase(),
		        y = b.toUpperCase();
		    if (x > y) {
		        return 1;
		    }
		    if (x < y) {
		        return -1;
		    }
		    return 0;
		});

	}

	return arr;

};


/* 1.6 Get Url Parameters
------------------------------------------------- */
var getURLParam = function(param){
	var urlParams = new URLSearchParams(window.location.search);
	return urlParams.get(param);
}


/* 1.7 Calculate Number of Isotope Items Across
------------------------------------------------- */
var calcIsotopeAcross = function() {

    var dividerValue = 4;
    if ($(this).width() <= 480) {
        dividerValue = 1;
    }
    else if ($(this).width() <= 767) {
        dividerValue = 2;
    }
    else if ($(this).width() <= 980) {
        dividerValue = 3;
    }
    return dividerValue;
}


/* 1.8 Update Icon Picker Button
------------------------------------------------- */
var updateIconPicker = function(btn, startValue){

	var startValue = startValue || 0;
	var currIcon = Number(btn.attr('icon-picker'));
    var newIcon = currIcon + 1;

	btn.find('i').removeClass(function(index, className){
        return (className.match (/fa-.*/g) || []).join(' ');
    });

    if (newIcon >= iconPickerArray.length){
        newIcon = startValue;
    }
    btn.attr('icon-picker', newIcon);
    btn.find('i').addClass(iconPickerArray[newIcon]);

    return newIcon;
};


/* 1.9 Update Color Picker Button
------------------------------------------------- */
var updateColorPicker = function(btn, startValue){

	var startValue = startValue || 0;
	var currColor = Number(btn.attr('color-picker'));
	var newColor = currColor + 1;

	btn.removeClass(function(index, className){
        return (className.match (/btn-.*/g) || []).join(' ');
    });

    if (newColor >= colorPickerArray.length){
	    newColor = startValue;
	}
    btn.attr('color-picker', newColor);
    btn.addClass('btn-' + colorPickerArray[newColor] + ' btn-icon btn-lg');

    return newColor;
};


/* 1.10 Toggle Atlantean
------------------------------------------------- */
var toggleAtlantean = function(btn, startValue){
	$('#sidebar').toggleClass('atlantean');
	$('#content_container').toggleClass('atlantean');
};


/* 1.11 Session Storage
------------------------------------------------- */
var storeSessionInfo = function(){

	return {
		add: function(id, infoObj){
			window.sessionStorage.setItem(id, JSON.stringify(infoObj));
		},
		get: function(id){
			var infoObj = JSON.parse(window.sessionStorage.getItem(id));
			return infoObj;
		},
		remove: function(id){
			window.sessionStorage.removeItem(id);
		},

	}

}();


/* 1.12 Translate Friendly Date
------------------------------------------------- */
var translateFriendlyDate = function(crit){

	var critWordArray = crit.toLowerCase().split(' ')
	var dateRangeObj = {startDate: moment().format("YYYY-MM-DD"), endDate: moment().format("YYYY-MM-DD")};

	if (critWordArray.indexOf('yesterday') != -1){
		var startDate = moment().subtract(1, 'days').format("YYYY-MM-DD");
		var endDate = moment().subtract(1, 'days').format("YYYY-MM-DD");
		dateRangeObj = {startDate: startDate, endDate: endDate};
	}
	else if (critWordArray.indexOf('last') != -1) {
		if (critWordArray.length == 2 && critWordArray.indexOf('last') == 0 && isAcceptableItem(critWordArray[1])){
			var startDate = moment().subtract(1, critWordArray[1]).startOf(critWordArray[1]).format("YYYY-MM-DD");
			var endDate = moment().subtract(1, critWordArray[1]).endOf(critWordArray[1]).format("YYYY-MM-DD");
			dateRangeObj = {startDate: startDate, endDate: endDate};
		}
		else if (critWordArray.length == 3 && critWordArray.indexOf('last') == 0 && !isNaN(critWordArray[1]) && isAcceptableItem(critWordArray[2])){
			var startDate = moment().subtract(critWordArray[1], critWordArray[2]).startOf(critWordArray[2]).format("YYYY-MM-DD");
			var endDate = moment().subtract(1, critWordArray[2]).endOf(critWordArray[2]).format("YYYY-MM-DD");
			dateRangeObj = {startDate: startDate, endDate: endDate};
		}
	}
	else if (critWordArray.indexOf('prior') != -1) {
		if (critWordArray.length == 2 && critWordArray.indexOf('prior') == 0 && isAcceptableItem(critWordArray[1])){
			var startDate = moment().subtract(2, critWordArray[1]).startOf(critWordArray[1]).format("YYYY-MM-DD");
			var endDate = moment().subtract(2, critWordArray[1]).endOf(critWordArray[1]).format("YYYY-MM-DD");
			dateRangeObj = {startDate: startDate, endDate: endDate};
		}
	}
	else if (critWordArray.indexOf('ago') != -1) {
		if (critWordArray.length == 3 && !isNaN(critWordArray[0]) && isAcceptableItem(critWordArray[1]) && critWordArray.indexOf('ago') == 2){
			var startDate = moment().subtract(critWordArray[0], critWordArray[1]).startOf(critWordArray[1]).format("YYYY-MM-DD");
			var endDate = moment().subtract(critWordArray[0], critWordArray[1]).endOf(critWordArray[1]).format("YYYY-MM-DD");
			dateRangeObj = {startDate: startDate, endDate: endDate};
		}
		else if (critWordArray.length == 6 && !isNaN(critWordArray[0]) && isAcceptableItem(critWordArray[1]) && critWordArray.indexOf('ago') == 2 && critWordArray.indexOf('for') == 3 && !isNaN(critWordArray[4]) && isAcceptableItem(critWordArray[5])){
			var startDate = moment().subtract(critWordArray[0], critWordArray[1]).startOf(critWordArray[1]).format("YYYY-MM-DD");
			var endDate = moment(startDate).add(critWordArray[4] - 1, critWordArray[5]).endOf(critWordArray[5]).format("YYYY-MM-DD");
			dateRangeObj = {startDate: startDate, endDate: endDate};
		}
	}

	if (dateRangeObj == {startDate: moment().format("YYYY-MM-DD"), endDate: moment().format("YYYY-MM-DD")}){
		return "Could Not Be Derived";
	}

	return dateRangeObj;

	function isAcceptableItem(item){
		var acceptableItemsArray = ['day', 'week', 'month', 'year', 'days', 'weeks', 'months', 'years'];
		return acceptableItemsArray.indexOf(item) != -1 ? true : false;
	}

}

/* 2.1 Handle Check Boxes
------------------------------------------------- */
var handleCheckBoxes = function() {
    "use strict";
    $('.checkbox-css input[type="checkbox"]').each(function() {

    	$(this).click(function(){
    		var chk = $(this).attr('data-checked') == 'true' ? 'false' : 'true';
    		$(this).attr('data-checked', chk);
    	});

    });
};


/* 2.2 Handle Parsley
------------------------------------------------- */
var handleParsleyValidation = function(){
	if ($('form').length !== 0){
		$('form').parsley();
	}
};


var handlePasswordErrors = function() {
    "use strict";
    
    $('#pass').focus(function() {
        $('#pass').parent().find('.parsley-icorrectPassword').remove();
    });

};


var handleDuplicateEmailWarning = function(){

	$('#email').focus(function() {
        $('#email').parent().find('.parsley-duplicateEmail').remove();
    });

};



/* 2.3 Handle Isotope Gallery
------------------------------------------------- */
var handleIsotopeItems = function(){

	var itemsContainer = $('[data-isotope-items]');
	var filtersContainer = $('[data-isotope-filters]');
	var dividerValue = calcIsotopeAcross();
	var containerWidth = $(itemsContainer).width();
	var columnWidth = containerWidth / dividerValue;
	if ($(itemsContainer).length !== 0){

		$(itemsContainer).isotope({
			resizable: true,
			masonry: {
				columnWidth: columnWidth
			}
		});
		
		$(window).smartresize(function() {
			var dividerValue = calcIsotopeAcross();
			var containerWidth = $(itemsContainer).width();
			var columnWidth = containerWidth / dividerValue;
			$(itemsContainer).isotope({
				masonry: { 
					columnWidth: columnWidth 
				}
			});
		});

	};
	

};

var handleIsotopeFilters = function(){

	var itemsContainer = $('[data-isotope-items]');
	var filtersContainer = $('[data-isotope-filters]');

	$(filtersContainer).find('a').click( function(){
		$(this).toggleClass('active');

		if($(filtersContainer).find('[data-search-box] input').val() == ''){
			$(filtersContainer).find('[data-search-box] .btn').removeClass('active');
		}

		var options = {};
		var value = '';
		$(filtersContainer).find('a.active').each(function(){
			value += $(this).attr('data-option-value');
		})
		value = value === 'false' ? false : value;
		options['filter'] = value;
		$(itemsContainer).isotope(options);
		$(window).smartresize();
		return false;
	});

};


/* 3.1 Mongo Data
------------------------------------------------- */
var mongo = function() {
    "use strict";
    
    return {
		
		get: function (collection, data, sort, callback){

			var request = $.post("assets/php/connections/Kida.php"
		        , { 
		        	action:'read'
		        	, collection: collection
		        	, data: data
		        	, sort: sort 
		        }
		        , function(results, status){
		            callback(results, status);
		        }
		        , "json"
		    );

			return request;
		
		},
		write: function (collection, id, data, callback){

			var request = $.post("assets/php/connections/Kida.php"
		        , { 
		        	action:'write'
		        	, collection: collection
		        	, id: id 
		        	, data: data
		        }
		        , function(results, status){
		            callback(results, status)
		        }
		        , "json"
		    );
		    
			return request;
		
		},
		delete: function (collection, id, callback){

			var request = $.post("assets/php/connections/Kida.php"
		        , { 
		        	action:'delete'
		        	, collection: collection
		        	, id: id
		        }
		        , function(results, status){
		            callback(results, status)
		        }
		        , "json"
		    );
		    
			return request;
		
		},
		update: function (){
		
		},
		
  	};
    
}();


/* 3.2 Connections Data
------------------------------------------------- */
var sqlData = function(){

	return {
		get: function(connection, sql, sqlFlavor, limit, callback){

			var postUrl = 'assets/php/connections/' + connection + '.php';
			var sql = limit != 'none' ? this.insertLimitStatement(sql, sqlFlavor, limit) : sql;

			var request = $.post(postUrl
		        , { 
		        	sql: sql
		        }
		        , function(results, status){
		        	var goodToGo = true;
		        	// Check for Errors
					if(results.error) {
						headerNotification('danger' ,'Error!' , results.error , true);
						goodToGo = false;
					}

					if(results.info) {
						headerNotification('info' ,'Hmmm...' , results.info , true);
						goodToGo = false;
					}

		            callback(results, status, goodToGo)
		        }
		        , "json"
		    );

			return request;
			
		},
		download: function(connection, fileName, sql, callback){

			var postUrl = 'assets/php/connections/' + connection + '_csv.php';

			var postItems = {
		      sql : sql
		      , fileName: fileName + '.csv'
		    }

			var queryString = serialize(postItems);

		    var xhr = new XMLHttpRequest(),

		    a = document.createElement("a"),file;

		    xhr.open("POST", postUrl, true);
		    xhr.responseType = "blob";
		    xhr.onload = function (data) {
		      file = new Blob([xhr.response], { type : "application/octet-stream" });
		      var objUrl = window.URL.createObjectURL(file);
		      a.href = objUrl;
		      a.download = fileName + '.csv';
		      a.click();
		      window.URL.revokeObjectURL(objUrl);
		      callback(data);
		    };
		    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		    xhr.send(queryString);

		    return xhr;

			function serialize (obj) {
		       var encodedItems = [];
		       for(var key in obj){
		           if (obj.hasOwnProperty(key)) {
		               encodedItems.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]));
		           }
		       }
		       return encodedItems.join("&");
		    }
			
		},
		insertLimitStatement: function(sql, sqlFlavor, limit){

			var sqlFlavorLimiter = sqlFlavorObj[sqlFlavor].limitCheck || 'limit';

			if(sqlFlavorLimiter = 'limit'){

				var chkSql = /limit (\d+)/.exec(sql);

				if (chkSql != null) {

					if(chkSql[1] <= sqlRowLimit){

						return sql

					}

					return sql.replace(/limit (\d+)/, ' Limit ' + limit);
				}

				return sql + ' Limit ' + limit;

			}

		},

	}

}();


/* 3.3 Build SQL Statement
------------------------------------------------- */
var buildSqlStatement = function(dataSetObj, reportItems, filterItems, friendlyHeaders){

    var s = [];
    var f = '(\n\t' + dataSetObj.sql.replace('\n','\n\t') + '\n) as ' + dataSetObj._id;
    var w = [];
    var g = [];
    var h = [];
    var o = 1;
    var orderByDateSet = false;
    var orderByMetricSet = false;
    var headers = [];

    reportItems.map(function(item, index){
        var itemID = item;
        var itemTitle = dataSetObj.dataItems[itemID].itemTitle;
        var itemType = dataSetObj.dataItems[itemID].itemType;
        var itemSQL = dataSetObj.dataItems[itemID].itemSQL;

        s.push(itemSQL + ' as ' + (friendlyHeaders ? '\'' + itemTitle + '\'' : itemID));
        itemType != 'metric' ? g.push(itemSQL) : null;

        if (itemType == 'date' && !orderByDateSet){
            o = reportItems.indexOf(item) + 1;
            orderByDateSet = true;
        }
        else if (itemType == 'metric' && !orderByDateSet && !orderByMetricSet){
            o = reportItems.indexOf(item) + 1 + ' desc ';
            orderByMetricSet = true;
        }

    });

    filterItems.map(function(item, index){
    	var itemID = item.itemID;
        var itemSQL = dataSetObj.dataItems[itemID].itemSQL;
        var itemType = dataSetObj.dataItems[itemID].itemType;
        var oppr = item.oppr;
        var crit = item.crit;

        if (itemType == 'metric'){
        	h.push(filterSelectOptionsObj[itemType][oppr].opprSQL(itemSQL, crit))
        } 
        else {
        	w.push(filterSelectOptionsObj[itemType][oppr].opprSQL(itemSQL, crit))
        }

    })

    return 'SELECT ' + s.join('\n, ') + '\nFROM ' + f + (w.length > 0 ? '\nWHERE ' + w.join('\nAND ') : '') + (g.length > 0 ? '\nGROUP BY ' + g.join('\n, ') : '') + (h.length > 0 ? '\nHAVING ' + h.join(' AND ') : '') + '\nORDER BY ' + o;

};


/* 3.4 Build Union Statement
------------------------------------------------- */
var buildUnionStatement = function(sqlArray, sqlFlavor){
	var unionType = sqlFlavorObj[sqlFlavor].unionType;
	var unionStatement = '';

	if (unionType == 'Union All'){
		unionStatement = sqlArray.join(' UNION ALL ');
	}

	return unionStatement;
}


/* 4.1 Add Background
------------------------------------------------- */
var addBackground = function(){

	$('.page-cover').attr('style', 'background-image: url(assets/img/page-cover.jpg)');

};


/* 4.2 Add Header
------------------------------------------------- */
var addHeader = function(){

	var elem = $(' \
		<div id="header" class="header navbar-default"> \
			<div class="navbar-header"> \
				<a href="javascript:toggleAtlantean();" class="navbar-brand"><span class="atlantisHeaderLogo">a </span><b>Atlantis</b> - X</a> \
				<button type="button" class="navbar-toggle" data-click="sidebar-toggled"> \
					<span class="icon-bar"></span> \
					<span class="icon-bar"></span> \
					<span class="icon-bar"></span> \
				</button> \
			</div> \
		</div>'
	);

	$('#page-container').append(elem);

};


/* 4.3 Add Sidebar
------------------------------------------------- */
var addSidebar = function(){

	var elem = $(' \
		<div class="sidebar"><div id="sidebar" data-scrollbar="true" data-height="100%"></div></div> \
		<div class="sidebar-bg"></div> \
	');

	$('#page-container').append(elem);

};


/* 4.4 Add User Nav
------------------------------------------------- */
var addUserNav = function(){

	var userObj = getUserInfo();

	var elem = $(' \
		<ul class="nav"> \
			<li class="nav-profile"> \
				<a href="javascript:;" data-toggle="nav-profile"> \
					<div class="image"> \
						<img src="assets/img/users/' + userObj.userImg + '" alt="" /> \
					</div> \
					<div class="info"> \
						' + userObj.name + ' \
						<small class="atlantean">Knowledge is power</small> \
					</div> \
				</a> \
			</li> \
		</ul> \
	');

	$('#sidebar').append(elem);

};


/* 4.5 Add Site Nav
------------------------------------------------- */
var addSiteNav = function(){

	var insertNavItem = function(navItem){

		var s = navItem.subnav != null ? true : false;
		var b = navItem.badge != null ? true : false;

		var li = ' \
		<li class="' + (s == true ? 'has-sub': ' ') + (navItem.href === getCurrUrl() ? 'active': ' ') + '"> \
			<a href="' + navItem.href + '"> \
				' + (s == true ? '<b class="caret"></b>' : '') + ' \
				' + (b == true ? '<span class="badge pull-right">' + navItem.badge + '</span>' : '') + ' \
				<i class="fa ' + navItem.icon + '"></i> \
				<span>' + navItem.title + '</span> \
			</a> \
			' + (s == true ? insertSubNavItem(navItem.subnav) : '') + ' \
		</li>';

			return li;

	};

	var insertSubNavItem = function(subNavItems){

		var subNavItem = '';

		for (var item in subNavItems){
			var s = subNavItems[item].subnav != null ? true : false;
			subNavItem += ' \
				<li class="' + (s == true ? 'has-sub': ' ') + (subNavItems[item].href === getCurrUrl() ? 'active': ' ') + '"> \
					<a  href="' + subNavItems[item].href + '"> \
					' + (s == true ? '<b class="caret"></b>' : '') + ' \
					' + subNavItems[item].title + ' \
					</a> \
					' + (s == true ? insertSubNavItem(subNavItems[item].subnav) : '') + ' \
				</li>';
		}

		return '<ul class="sub-menu">' + subNavItem + '</ul>'


	};

	var navItems = siteNavObj;
	var elem = $('<ul class="nav"></ul>');

	for (var item in navItems) {
		if (navItems[item].header != null){
			elem.append('<li class="nav-header">' + navItems[item].header + '</li>');
		}
		else {
			elem.append(insertNavItem(navItems[item]));
		}
	}

	elem.find('.has-sub .active').parents('li').addClass('active');
	elem.find('.has-sub .active').parents('li').addClass('active');

	// Minimizer
	elem.append('<li><a href="javascript:;" class="sidebar-minify-btn" data-click="sidebar-minify"><i class="fa fa-angle-double-left"></i></a></li>');

	$('#sidebar').append(elem);

};


/* 4.6 Add Content Container
------------------------------------------------- */
var addContentContainer = function(){

	var elem = $(' \
		<div id="content_container" class="content"> \
			<h1 id="page_header" class="page-header"> \
			</h1> \
		</div> \
	');

	$('#page-container').append(elem);
};


/* 4.7 Add Footer
------------------------------------------------- */
var addFooter = function() {

	var elem = $(' \
		<div id="footer" class="footer atlantean"> \
			There is no knowledge that is not power! \
		</div> \
		<a href="javascript:;" class="btn btn-icon btn-circle btn-success btn-scroll-to-top fade" data-click="scroll-top"><i class="fa fa-angle-up"></i></a> \
	');

	$('#page-container').append(elem);
};


/* 4.8 Clean Up Session Storage
------------------------------------------------- */
var cleanUpSessionStorage = function(){

	storeSessionInfo.remove('sqlPreviewResults');
	storeSessionInfo.remove('dataSetItemsObj');
	storeSessionInfo.remove('dataSetObj');
	storeSessionInfo.remove('dashWidgets');

};


/* 5.1 Regular Button
------------------------------------------------- */
var regularButton = function(options){

	var txt = options.txt;
	var icon = '<i class="fa ' + options.icon + ' fa-lg m-r-5"></i>' || '';
	var href = options.href || 'javascript:;';
	var color = options.color || 'default';
	var addClass = options.addClass || '';
	var data = options.data || '';

	var btn = $('<a href="' + href + '" class="btn btn-' + color + ' ' + addClass + '" ' + data + '>' + icon + txt + '</a>');

	btn.click(options.clickFunction);

	return btn;

};


/* 5.2 Icon Button
------------------------------------------------- */
var iconButton = function(options){

	var icon = options.icon;
	var href = options.href || 'javascript:;';
	var color = options.color || 'default';
	var addClass = options.addClass || '';
	var data = options.data || '';

	var btn = $('<a href="' + href + '" class="btn btn-' + color + ' btn-icon btn-lg ' + addClass + '" ' + data + '><i class="fa ' + icon + '"></i></a>');

	btn.click(options.clickFunction);

	return btn;

};


/* 5.3 Search Box
------------------------------------------------- */
var searchBox = function(options){

	var icon = options.icon || 'fa-search';
	var href = options.href || 'javascript:;';
	var addClass = options.addClass || '';
	var data = options.data || '';

	var btn = $(' \
		<div class="input-group" data-search-box> \
			<input type="text" class="form-control" /> \
			<div class="input-group-append"> \
				<a href="' + href + '" class="btn btn-default' + addClass + '" ' + data + '><i class="fa ' + icon + '"></i></a> \
			</div> \
		</div> \
	');

	btn.find('a').click(options.clickFunction);

	// When the user hits the Enter Button, click the button
	btn.find('input').keydown(function (e) {
		var key = e.which;
		if(key == 13) {
			btn.find('.btn').click();
			return false;
		}
	});

	return btn;

};


/* 5.4 Tables
------------------------------------------------- */
var tableSimple = function(results){

	var tableID = getRandomKey();
	var elem = $('<table id="' + tableID + '" class="table"></table>');

	var headerRowItems = '';
	for (var h=0;h<results[0].length;h++){

		headerRowItems += '<th>' + formatMe.toTitleCase(results[0][h]) +'</th>';

	}
	elem.append('<thead>' + headerRowItems + '</tr</thead>');


	var tableRowItems = '';
	for (var r=1;r<results.length;r++){

		var columnItems = '';

		for (var c=0;c<results[r].length;c++){

			columnItems += '<td>' + results[r][c] + '</td>';

		}

		tableRowItems += '<tr>' + columnItems +'</tr>';

	}
	elem.append('<tbody>' + tableRowItems + '</tbody>');

	return elem;
};

var tableSQLRunner = function(results, options){

	var tableID = getRandomKey();
	var elem = $('<table id="' + tableID + '" class="table ' + options + '"></table>');

	var headerRowItems = '';
	for (var h=0;h<results[0].length;h++){

		headerRowItems += '<th>' + formatMe.toTitleCase(results[0][h]) +'</th>';

	}
	elem.append('<thead>' + headerRowItems + '</tr</thead>');


	var tableRowItems = '';
	for (var r=1;r<results.length;r++){

		var columnItems = '';

		for (var c=0;c<results[r].length;c++){

			columnItems += '<td>' + results[r][c] + '</td>';

		}

		tableRowItems += '<tr>' + columnItems +'</tr>';

	}
	elem.append('<tbody>' + tableRowItems + '</tbody>');

	return elem;
};


var tableReportBuilder = function(results, dataSetObj, options){

	var tableID = getRandomKey();
	var elem = $('<table id="' + tableID + '" class="table ' + options + '"></table>');

	var headerRowItems = '';
	var formatArray = [];
	for (var h=0;h<results[0].length;h++){

		headerRowItems += '<th>' + dataSetObj.dataItems[results[0][h]].itemTitle +'</th>';
		formatArray.push(dataSetObj.dataItems[results[0][h]].itemFormat);
	}
	elem.append('<thead>' + headerRowItems + '</tr</thead>');


	var tableRowItems = '';
	for (var r=1;r<results.length;r++){

		var columnItems = '';

		for (var c=0;c<results[r].length;c++){
			columnItems += '<td>' + formatMe[formatArray[c]](results[r][c]) + '</td>';
		}

		tableRowItems += '<tr>' + columnItems +'</tr>';

	}
	elem.append('<tbody>' + tableRowItems + '</tbody>');

	return elem;
};


/* 5.5 Header Notification
------------------------------------------------- */
var headerNotification = function(type, title, message, sticky){

	var sticky = sticky || false;

	var elem = $(' \
		<div class="alert alert-' + type + ' fade"> \
			<span class="close" data-dismiss="alert">×</span> \
			<i class="fa ' + alertIconsObj[type] + '"></i> \
			<strong>' + title + '</strong> \
			' + message + '  \
		</div> \
	')

	window.setTimeout(function () {
	    elem.addClass('show');
	}, 250);

	if(!sticky){

		window.setTimeout(function () {
			elem.find('[data-dismiss="alert"]').click()
		}, 3000);
	}

	$('#content_container').prepend(elem);

};


/* 5.6 Gritter Notification
------------------------------------------------- */
var gritterNotification = function(options){
	options.class_name = options.color ? options.class_name + ' gritter-' + options.color : options.class_name;
	options.class_name = options.text ? options.class_name : options.class_name + ' gritter-title-only';

	$.gritter.add(options);
	return false;

	/*  Gritter Options
	{
		title: 'This is a sticky notice!'
		, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus lacus ut lectus rutrum placerat. '
		, image: '../assets/img/user/user-2.jpg'
		, sticky: true
		, time: ''
		, class_name: 'my-sticky-class'
		, before_open: function(){
			
		},
		after_open: function(e){
			console.log(e);
		},
		before_close: function(manual_close) {
			
		},
		after_close: function(manual_close){
			
		},

	}
	*/
};


/* 5.7 JS Tree
------------------------------------------------- */
var jsTree = function(){

	return {

		create: function(container, data, clickFunction){

			var jsTreeObj = {
		        "core": {
		            "data": data,
		            "check_callback": true          
		        },
		        
		        "types": {
		            "default": {
		                "icon": "fa fa-folder text-warning fa-lg"
		            },
		            "file": {
		                "icon": "fa fa-file text-inverse fa-lg"
		            },
		            "link": {
		                "icon" : "fa fa-link text-primary fa-lg "
		            },
		            "schema": {
		                "icon" : "fa fa-sitemap text-default fa-lg "
		            },
		            "table": {
		                "icon" : "fa fa-table text-default fa-lg "
		            },
		            "column_date": {
		                "icon" : "fa fa-circle text-warning"
		            },
		            "column_attribute": {
		                "icon" : "fa fa-circle text-success"
		            },
		            "column_metric": {
		                "icon" : "fa fa-circle text-primary"
		            },
		            "column_unknown": {
		                "icon" : "fa fa-circle text-default"
		            }
		        },
		        "plugins": ["types"]
		    };

		    var jsTreeElem = $(container).jstree(jsTreeObj);
		    jsTreeElem.on("changed.jstree", function (e, data) {
		    	clickFunction(data.instance.get_selected(true)[0].text);
			});

		},
		add: function(container, parentNode, id, txt, postion){
			var postion = postion || 'last';
			$(container).jstree('create_node', $(parentNode), { "id":id , "text":txt}, postion);	
		},
		delete: function(container){
			$(container).jstree("destroy").empty();
		}

	};
	
}();


/* 5.8 Highcharts
------------------------------------------------- */
var buildHighChartsSeries = function(chartData, dataSetObj, yTitle){

	var seriesArray = [];
	for(var s = 1;s<chartData[0].length;s++){

		var seriesObj = {};
		seriesObj.name = chartData[0].length == 2 ? yTitle : !dataSetObj.dataItems[chartData[0][s]] ? chartData[0][s] : dataSetObj.dataItems[chartData[0][s]].itemTitle;
		seriesObj.data = chartData
			        	.filter(function(arr, index){
			        		return index == 0 ? false : arr;
				        }).map(function(arr, index){
				        	return arr[s];
				        })

        seriesArray.push(seriesObj);

	}

	return seriesArray;

};


var createHighChartsResults = function(sqlResults, xItem, yItem, pItem){

	var pItem = pItem || null;
	var keyArray = sqlResults[0];
	var dataArray = sqlResults.map(function(arr){
	    return arr
	});

	dataArray.shift()

	var dataObj = dataArray.map(function(arr){

	    var itemObj = {};
	    keyArray.map(function(key, index){
	    	itemObj[key] = arr[index];
	    });
	    return itemObj;
	});

	var xItems = [];
	dataObj.map(function (obj) {

	    var newX = obj[xItem];
	    if(xItems.indexOf(newX) == -1){
	        xItems.push(newX);
	    }
	    
	});
		
	var pItems = [];
	dataObj.map(function (obj) {

	    var newP = obj[pItem];
	    if(pItems.indexOf(newP) == -1){
	        pItems.push(newP);
	    }
	    
	});

	// Create the Header Row
	var headerArr = [xItem];
	pItems.map(function (item) {

	    headerArr.push(
	    	pItem != null ? item : yItem
    	)

	});

	// Create Pivoted Rows
	var chartResults = [headerArr];
	xItems.map(function(x){

		var rowArray = [x];
		if (pItems.length !=0){

			pItems.map(function (p) {

		        rowArray.push(
		            dataObj.filter(function (f) {
		                return f[xItem] == x  && f[pItem] == p;
		              })
		              .map(function (m) {
		                return m[yItem];
		              })
		              .reduce(function (t, r) {
		                return t + r;
		              }, 0)
		        )

		    });

		}
		else {

			rowArray.push(
	            dataObj.filter(function (f) {
	                return f[xItem] == x;
	              })
	              .map(function (m) {
	                return m[yItem];
	              })
	              .reduce(function (t, r) {
	                return t + r;
	              }, 0)
	        )

		}
		

	    chartResults.push(rowArray)

	});

	return chartResults;

};


var buildHighChart = function(container, chartType, chartData, chartTitle, dataSetObj, yTitle, stacked){

	var stacked = stacked || 'no';

	var chartOptions = {

	    colors: ['#006cff', '#50B432', '#DDDF00','#9800ff', '#ED561B', '#24CBE5', '#64E572', 
	             '#FF9655', '#FFF263', '#6AF9C4'],
	    chart: {
	        backgroundColor: 'transparent',
	        type: chartType
	    },
	    title: {
	        text: chartTitle,
	        style: {
	            color: '#fff',
	            font: 'bold 14px "Trebuchet MS", Verdana, sans-serif'
	        }

	    },
	    subtitle: {
	    	text: '',
	        style: {
	            color: '#666666',
	            font: 'bold 12px "Trebuchet MS", Verdana, sans-serif'
	        }
	    },
	    legend: {
	    	enabled: chartData[0].length > 2 ? true : false,
	        align: 'center',
	        verticalAlign: 'bottom',
	        itemStyle: {
                color: 'rgba(255,255,255,.50)',
            },
            itemHoverStyle: {
	            color: 'rgba(255,255,255,.70)'
	        }
	       
	    },
	    credits: {
	        enabled: false
	    },
	    plotOptions: {
	    	series: {
	    		marker: {
	    			symbol: "circle"
	    		},
	    		stacking: stacked == 'no' ? '' : 'normal'
	    	},
	    	column: {
	    		borderWidth: 0
	    	},
	    	bar: {
	    		borderWidth: 0
	    	}

	    },
	    yAxis: [{
	        gridLineWidth: 0,
            minorGridLineWidth: 0,
            title: {
            	text: yTitle,
	            style: {
	                color: 'rgba(255,255,255,.50)'
	            },
	            margin: 20
	        },
            labels: {
	            style: {
	                color: 'rgba(255,255,255,.50)'
	            }
	        },
	        reversedStacks: false
	    }],
	    xAxis: {
	    	categories: chartData
	        	.filter(function(arr, index){
	        		return index == 0 ? false : arr;
		        }).map(function(arr, index){
		        	return isDateNumberString(arr[0]) == 'date' ? formatMe.dateMD(arr[0]) : arr[0];
		        })
	    	,
	        lineColor: 'rgba(255,255,255,.50)',
	        tickColor: 'rgba(255,255,255,.50)',
	        labels: {
	            style: {
	                color: 'rgba(255,255,255,.50)',
	            },

	        }
	    },

	    series: buildHighChartsSeries(chartData, dataSetObj, yTitle)

	};

	var chart = Highcharts.chart(container, chartOptions);

}


/* Application Controller
------------------------------------------------- */
var atlantisApp = function () {
	"use strict";
	
	var setting;
	
	return {
		//main function
		init: function (option){
			if (option) {
				setting = option;
			}

			this.initExtentions();
			this.initCheckBoxes();
			this.initParsley();
			this.initIsotopeGallery();		 	

		},
		initExtentions: function(){

			// Contains Extension for Search Results
			$.extend($.expr[":"], {
				"containsIN": function(elem, i, match, array) {
					return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
				},
				
			});

		},
		initCheckBoxes: function(options){
			handleCheckBoxes();
		},
		initParsley: function(options){
			handleParsleyValidation();
			handlePasswordErrors();
			handleDuplicateEmailWarning();
		},
		initIsotopeGallery(){
			handleIsotopeItems();
			handleIsotopeFilters();
		},
		pageSetup: function(){
			addBackground();
			addHeader()
			addSidebar();
			addUserNav();
			addSiteNav();
			addContentContainer();
			addFooter();
			cleanUpSessionStorage();
		},
		
  	};

}();


/* Global Objects
------------------------------------------------- */
var sqlRowLimit = 500;

var siteNavObj = {

	home: {
		icon: 'fa-home'
		, title: 'Home'
		, href: 'index.html'
	},
	documents: {
		icon: 'fa-envelope'
		, title: 'Documents'
		, badge: 10
		, href: 'javascript:;'
	},
	profile: {
		icon: 'fa-cog'
		, title: 'Profile'
		, href: 'javascript:;'
	},
	logOut: {
		icon: 'fa-sign-out'
		, title: 'Log Out'
		, href: 'javascript:logOut();'
	},
	dashboards: {
		header: 'Dashboards'
	},
	websties: {
		icon: 'fa-globe'
		, title: 'Websites'
		, href: 'javascript:;'
	},
	mobileapps: {
		icon: 'fa-mobile'
		, title: 'Mobile Apps'
		, href: 'javascript:;'
	},
	video: {
		icon: 'fa-video-camera'
		, title: 'Video'
		, href: 'javascript:;'
	},
	facebook: {
		icon: 'fa-facebook-square'
		, title: 'Facebook'
		, href: 'javascript:;'
	},
	twitter: {
		icon: 'fa-twitter'
		, title: 'Twitter'
		, href: 'javascript:;'
	},
	youTube: {
		icon: 'fa-youtube'
		, title: 'YouTube'
		, href: 'javascript:;'
	},
	tools: {
		header: 'Tools'
	},
	customdashboards: {
		icon: 'fa-th-large'
		, title: 'Custom Dashboards'
		, href: 'object-browser.html?objectType=dashboard'
	},
	reports: {
		icon: 'fa-table'
		, title: 'Report Builder'
		, href: 'object-browser.html?objectType=report'
	},
	sql: {
		icon: 'fa-magic'
		, title: 'SQL Runner'
		, href: 'object-browser.html?objectType=sql_runner'
	},
	datasets: {
		icon: 'fa-key'
		, title: 'Data Sets'
		, href: 'object-browser.html?objectType=dataset'
	},
	documentation: {
		icon: 'fa-question-circle'
		, title: 'Documentation'
		, href: 'javascript:;'
	},
	
};


var atlantisObjectTypeObj = {
	sql_runner: {
		"icon": "fa-magic"
		, "title": "SQL Runner"
		, "href": 'sql-runner.html'
	},
	report: {
		"icon": "fa-table"
		, "title": "Report Builder"
		, "href": 'report-builder.html'
	},
	dashboard: {
		"icon": "fa-th-large"
		, "title": "Custom Dashboards"
		, "href": 'custom-dashboard.html'
	},
	datamodel: {
		"icon": "fa-cubes"
		, "title": "Data Models"
		, "href": 'data-model-builder.html'
	},
	dataset: {
		"icon": "fa-key"
		, "title": "Data Sets"
		, "href": 'data-set-builder.html'
	},
};


var iconPickerArray = [
	'fa-asterisk'
	, 'fa-globe'
	, 'fa-mobile'
	, 'fa-video-camera'
	, 'fa-facebook-square'
	, 'fa-twitter-square'
	, 'fa-youtube-square'
];


var colorPickerArray = [
	'default'
	, 'purple'
	, 'pink'
	, 'primary'
	, 'success'
	, 'warning'
	, 'danger'
];


var widgetColorsObj = {
	"bg-blue": "Blue"
	, "bg-purple": "Purple"
	, "bg-aqua": "Aqua"
	, "bg-green": "Green"
	, "bg-lime": "Lime"
	, "bg-orange": "Orange"
	, "bg-yellow": "Yellow"
	, "bg-red": "Red"
	, "bg-inverse": "Black"
	, "bg-grey": "Grey" 
};


var alertIconsObj = {
	"danger": "fa-exclamation-circle"
	, "warning": "fa-exclamation-triangle"
	, "success": "fa-check-circle"
	, "info": "fa-info-circle"
};


var formatOptionsObj = {
    none : "No Format",
    dateMD : "Date M/D",
    dateMDY : "Date M/D/Y",
    dateYYYYMMDD : "Date YYYY-MM-DD",
    dateYYYYMM : "Month YYYY-MM",
    secondsHMS : "H:M:S",
    numberComma : "#,###",
    numberCommaTwo : "#.##",
    numberCommaDollar : "$#,###",
    numberCommaDollarTwo : "$#.##",
    numberPct : "##%",
    numberPctTwo : "#.##%",
}

var sqlFlavorObj = {

	mySql: {
		limitCheck: 'limit'
		, unionType: 'Union All'

	},

};

var filterSelectOptionsObj = {

    date: {
		dynamic: {
			friendly: "Dynamic"
			, opprSQL: function(itemSQL, crit){
				var dateRangeObj = translateFriendlyDate(crit);
				var dynamicDateRange = itemSQL + " between '" + dateRangeObj.startDate + "' and '" + dateRangeObj.endDate + "'";

				return dynamicDateRange;
			}
		},
		fixed: {
			friendly: "Fixed"
			, opprSQL: function(itemSQL, crit){
				return itemSQL + " between '" + crit.startDate + "' and '" + crit.endDate + "'";
			}
		},
    },
    attribute: {
		equals: {
			friendly: "Equals"
			, opprSQL: function(itemSQL, crit){
				return itemSQL + ' IN (' + crit.map(function(item, index){return "'" + item + "'"}).join() + ')';
			}
		},
		not_equals: {
			friendly: "Does Not Equal"
			, opprSQL: function(itemSQL, crit){
				return itemSQL + ' NOT IN (' + crit.map(function(item, index){return "'" + item + "'"}).join() + ')';
			}
		},
		contains: {
			friendly: "Contains"
			, opprSQL: function(itemSQL, crit){
				return crit.map(function(item, index){
					return "(" + itemSQL + " LIKE '%" + item + "%')";
				});
			}
		},
		not_contains: {
			friendly: "Doesn't Contain"
			, opprSQL: function(itemSQL, crit){
				return crit.map(function(item, index){
					return "(" + itemSQL + " NOT LIKE '%" + item + "%')";
				});
			}
		},
		starts_with: {
			friendly: "Starts With"
			, opprSQL: function(itemSQL, crit){
				return crit.map(function(item, index){
					return "(" + itemSQL + " LIKE '" + item + "%')";
				});
			}
		},
		ends_with: {
			friendly: "Ends With"
			, opprSQL: function(itemSQL, crit){
				return crit.map(function(item, index){
					return "(" + itemSQL + " LIKE '%" + item + "')";
				});
			}
		},
    },
    metric: {
		equals: {
			friendly: "="
			, opprSQL: function(itemSQL, crit){
				return itemSQL + ' = ' + crit;
			}
		},
		not_equals: {
			friendly: "!="
			, opprSQL: function(itemSQL, crit){
				return itemSQL + ' != ' + crit;
			}
		},
		greater_than: {
			friendly: ">"
			, opprSQL: function(itemSQL, crit){
				return itemSQL + ' > ' + crit;
			}
		},
		greater_than_equal: {
			friendly: ">="
			, opprSQL: function(itemSQL, crit){
				return itemSQL + ' >= ' + crit;
			}
		},
		less_than: {
			friendly: "<"
			, opprSQL: function(itemSQL, crit){
				return itemSQL + ' < ' + crit;
			}
		},
		less_than_equal: {
			friendly: "<="
			, opprSQL: function(itemSQL, crit){
				return itemSQL + ' <= ' + crit;
			}
		},
    },
     
};

var faIconPickerIconsArray = [
	{title: "fa fa-address-book", searchTerms: ['web']},
	{title: "fa fa-address-book-o", searchTerms: ['web']},
	{title: "fa fa-address-card", searchTerms: ['web']},
	{title: "fa fa-address-card-o", searchTerms: ['web']},
	{title: "fa fa-adjust", searchTerms: ['web']},
	{title: "fa fa-align-center", searchTerms: ['text','editor']},
	{title: "fa fa-align-justify", searchTerms: ['text','editor']},
	{title: "fa fa-align-left", searchTerms: ['text','editor']},
	{title: "fa fa-align-right", searchTerms: ['text','editor']},
	{title: "fa fa-amazon", searchTerms: ['brand','brands']},
	{title: "fa fa-american-sign-language-interpreting", searchTerms: ['web']},
	{title: "fa fa-anchor", searchTerms: ['web']},
	{title: "fa fa-android", searchTerms: ['brand','brands']},
	{title: "fa fa-angle-double-down", searchTerms: ['arrows','directional']},
	{title: "fa fa-angle-double-left", searchTerms: ['arrows','directional']},
	{title: "fa fa-angle-double-right", searchTerms: ['arrows','directional']},
	{title: "fa fa-angle-double-up", searchTerms: ['arrows','directional']},
	{title: "fa fa-angle-down", searchTerms: ['arrows','directional']},
	{title: "fa fa-angle-left", searchTerms: ['arrows','directional']},
	{title: "fa fa-angle-right", searchTerms: ['arrows','directional']},
	{title: "fa fa-angle-up", searchTerms: ['arrows','directional']},
	{title: "fa fa-apple", searchTerms: ['brand','brands']},
	{title: "fa fa-archive", searchTerms: ['web']},
	{title: "fa fa-area-chart", searchTerms: ['web']},
	{title: "fa fa-arrow-circle-down", searchTerms: ['arrows','directional']},
	{title: "fa fa-arrow-circle-left", searchTerms: ['arrows','directional']},
	{title: "fa fa-arrow-circle-o-down", searchTerms: ['arrows','directional']},
	{title: "fa fa-arrow-circle-o-left", searchTerms: ['arrows','directional']},
	{title: "fa fa-arrow-circle-o-right", searchTerms: ['arrows','directional']},
	{title: "fa fa-arrow-circle-o-up", searchTerms: ['arrows','directional']},
	{title: "fa fa-arrow-circle-right", searchTerms: ['arrows','directional']},
	{title: "fa fa-arrow-circle-up", searchTerms: ['arrows','directional']},
	{title: "fa fa-arrow-down", searchTerms: ['arrows','directional']},
	{title: "fa fa-arrow-left", searchTerms: ['arrows','directional']},
	{title: "fa fa-arrow-right", searchTerms: ['arrows','directional']},
	{title: "fa fa-arrow-up", searchTerms: ['arrows','directional']},
	{title: "fa fa-arrows", searchTerms: ['arrows','directional']},
	{title: "fa fa-arrows-alt", searchTerms: ['arrows','directional']},
	{title: "fa fa-arrows-h", searchTerms: ['arrows','directional']},
	{title: "fa fa-arrows-v", searchTerms: ['arrows','directional']},
	{title: "fa fa-asl-interpreting", searchTerms: ['web']},
	{title: "fa fa-assistive-listening-systems", searchTerms: ['web']},
	{title: "fa fa-asterisk", searchTerms: ['web']},
	{title: "fa fa-at", searchTerms: ['web']},
	{title: "fa fa-audio-description", searchTerms: ['web']},
	{title: "fa fa-automobile", searchTerms: ['web']},
	{title: "fa fa-balance-scale", searchTerms: ['web']},
	{title: "fa fa-ban", searchTerms: ['web']},
	{title: "fa fa-bank", searchTerms: ['web']},
	{title: "fa fa-bar-chart", searchTerms: ['web']},
	{title: "fa fa-bar-chart-o", searchTerms: ['web']},
	{title: "fa fa-barcode", searchTerms: ['web']},
	{title: "fa fa-bars", searchTerms: ['web']},
	{title: "fa fa-bath", searchTerms: ['web']},
	{title: "fa fa-bathtub", searchTerms: ['web']},
	{title: "fa fa-battery", searchTerms: ['web']},
	{title: "fa fa-battery-0", searchTerms: ['web']},
	{title: "fa fa-battery-1", searchTerms: ['web']},
	{title: "fa fa-battery-2", searchTerms: ['web']},
	{title: "fa fa-battery-3", searchTerms: ['web']},
	{title: "fa fa-battery-4", searchTerms: ['web']},
	{title: "fa fa-battery-empty", searchTerms: ['web']},
	{title: "fa fa-battery-full", searchTerms: ['web']},
	{title: "fa fa-battery-half", searchTerms: ['web']},
	{title: "fa fa-battery-quarter", searchTerms: ['web']},
	{title: "fa fa-battery-three-quarters", searchTerms: ['web']},
	{title: "fa fa-bed", searchTerms: ['web']},
	{title: "fa fa-beer", searchTerms: ['web']},
	{title: "fa fa-bell", searchTerms: ['web']},
	{title: "fa fa-bell-o", searchTerms: ['web']},
	{title: "fa fa-bell-slash", searchTerms: ['web']},
	{title: "fa fa-bell-slash-o", searchTerms: ['web']},
	{title: "fa fa-bicycle", searchTerms: ['web']},
	{title: "fa fa-binoculars", searchTerms: ['web']},
	{title: "fa fa-birthday-cake", searchTerms: ['web']},
	{title: "fa fa-bitcoin", searchTerms: ['currency', 'money', 'dollar']},
	{title: "fa fa-blind", searchTerms: ['web']},
	{title: "fa fa-bluetooth", searchTerms: ['brand','brands']},
	{title: "fa fa-bluetooth-b", searchTerms: ['brand','brands']},
	{title: "fa fa-bold", searchTerms: ['text','editor']},
	{title: "fa fa-bolt", searchTerms: ['web']},
	{title: "fa fa-bomb", searchTerms: ['web']},
	{title: "fa fa-book", searchTerms: ['web']},
	{title: "fa fa-bookmark", searchTerms: ['web']},
	{title: "fa fa-bookmark-o", searchTerms: ['web']},
	{title: "fa fa-braille", searchTerms: ['web']},
	{title: "fa fa-briefcase", searchTerms: ['web']},
	{title: "fa fa-btc", searchTerms: ['brand','brands']},
	{title: "fa fa-bug", searchTerms: ['web']},
	{title: "fa fa-building", searchTerms: ['web']},
	{title: "fa fa-building-o", searchTerms: ['web']},
	{title: "fa fa-bullhorn", searchTerms: ['web']},
	{title: "fa fa-bullseye", searchTerms: ['web']},
	{title: "fa fa-bus", searchTerms: ['web']},
	{title: "fa fa-buysellads", searchTerms: ['brand','brands']},
	{title: "fa fa-cab", searchTerms: ['web']},
	{title: "fa fa-calculator", searchTerms: ['web']},
	{title: "fa fa-calendar", searchTerms: ['web']},
	{title: "fa fa-calendar-check-o", searchTerms: ['web']},
	{title: "fa fa-calendar-minus-o", searchTerms: ['web']},
	{title: "fa fa-calendar-o", searchTerms: ['web']},
	{title: "fa fa-calendar-plus-o", searchTerms: ['web']},
	{title: "fa fa-calendar-times-o", searchTerms: ['web']},
	{title: "fa fa-camera", searchTerms: ['web']},
	{title: "fa fa-camera-retro", searchTerms: ['web']},
	{title: "fa fa-car", searchTerms: ['web']},
	{title: "fa fa-caret-down", searchTerms: ['arrows','directional']},
	{title: "fa fa-caret-left", searchTerms: ['arrows','directional']},
	{title: "fa fa-caret-right", searchTerms: ['arrows','directional']},
	{title: "fa fa-caret-square-o-down", searchTerms: ['arrows','directional']},
	{title: "fa fa-caret-square-o-left", searchTerms: ['arrows','directional']},
	{title: "fa fa-caret-square-o-right", searchTerms: ['arrows','directional']},
	{title: "fa fa-caret-square-o-up", searchTerms: ['arrows','directional']},
	{title: "fa fa-caret-up", searchTerms: ['arrows','directional']},
	{title: "fa fa-cart-arrow-down", searchTerms: ['web']},
	{title: "fa fa-cart-plus", searchTerms: ['web']},
	{title: "fa fa-cc", searchTerms: ['web']},
	{title: "fa fa-cc-amex", searchTerms: ['brand','brands']},
	{title: "fa fa-cc-diners-club", searchTerms: ['brand','brands']},
	{title: "fa fa-cc-discover", searchTerms: ['brand','brands']},
	{title: "fa fa-certificate", searchTerms: ['web']},
	{title: "fa fa-chain", searchTerms: ['text','editor']},
	{title: "fa fa-chain-broken", searchTerms: ['text','editor']},
	{title: "fa fa-check", searchTerms: ['web']},
	{title: "fa fa-check-circle", searchTerms: ['web']},
	{title: "fa fa-check-circle-o", searchTerms: ['web']},
	{title: "fa fa-check-square", searchTerms: ['check']},
	{title: "fa fa-check-square-o", searchTerms: ['check']},
	{title: "fa fa-chevron-circle-down", searchTerms: ['arrows','directional']},
	{title: "fa fa-chevron-circle-left", searchTerms: ['arrows','directional']},
	{title: "fa fa-chevron-circle-right", searchTerms: ['arrows','directional']},
	{title: "fa fa-chevron-circle-up", searchTerms: ['arrows','directional']},
	{title: "fa fa-chevron-down", searchTerms: ['arrows','directional']},
	{title: "fa fa-chevron-left", searchTerms: ['arrows','directional']},
	{title: "fa fa-chevron-right", searchTerms: ['arrows','directional']},
	{title: "fa fa-chevron-up", searchTerms: ['arrows','directional']},
	{title: "fa fa-child", searchTerms: ['web']},
	{title: "fa fa-chrome", searchTerms: ['brand','brands']},
	{title: "fa fa-circle", searchTerms: ['circle']},
	{title: "fa fa-circle-o", searchTerms: ['circle']},
	{title: "fa fa-circle-o-notch", searchTerms: ['web']},
	{title: "fa fa-circle-thin", searchTerms: ['web']},
	{title: "fa fa-clipboard", searchTerms: ['text','editor']},
	{title: "fa fa-clock-o", searchTerms: ['web']},
	{title: "fa fa-clone", searchTerms: ['web']},
	{title: "fa fa-close", searchTerms: ['web']},
	{title: "fa fa-cloud", searchTerms: ['web']},
	{title: "fa fa-cloud-download", searchTerms: ['web']},
	{title: "fa fa-cloud-upload", searchTerms: ['web']},
	{title: "fa fa-code", searchTerms: ['web']},
	{title: "fa fa-code-fork", searchTerms: ['web']},
	{title: "fa fa-codepen", searchTerms: ['brand','brands']},
	{title: "fa fa-coffee", searchTerms: ['web']},
	{title: "fa fa-cog", searchTerms: ['web']},
	{title: "fa fa-cogs", searchTerms: ['web']},
	{title: "fa fa-columns", searchTerms: ['text','editor']},
	{title: "fa fa-comment", searchTerms: ['web']},
	{title: "fa fa-comment-o", searchTerms: ['web']},
	{title: "fa fa-commenting", searchTerms: ['web']},
	{title: "fa fa-commenting-o", searchTerms: ['web']},
	{title: "fa fa-comments", searchTerms: ['web']},
	{title: "fa fa-comments-o", searchTerms: ['web']},
	{title: "fa fa-compass", searchTerms: ['web']},
	{title: "fa fa-copy", searchTerms: ['text','editor']},
	{title: "fa fa-copyright", searchTerms: ['web']},
	{title: "fa fa-creative-commons", searchTerms: ['web']},
	{title: "fa fa-credit-card", searchTerms: ['web']},
	{title: "fa fa-credit-card-alt", searchTerms: ['web']},
	{title: "fa fa-crop", searchTerms: ['web']},
	{title: "fa fa-crosshairs", searchTerms: ['web']},
	{title: "fa fa-css3", searchTerms: ['brand','brands']},
	{title: "fa fa-cube", searchTerms: ['web']},
	{title: "fa fa-cubes", searchTerms: ['web']},
	{title: "fa fa-cut", searchTerms: ['text','editor']},
	{title: "fa fa-cutlery", searchTerms: ['web']},
	{title: "fa fa-dashboard", searchTerms: ['web']},
	{title: "fa fa-database", searchTerms: ['web']},
	{title: "fa fa-deaf", searchTerms: ['web']},
	{title: "fa fa-deafness", searchTerms: ['web']},
	{title: "fa fa-dedent", searchTerms: ['text','editor']},
	{title: "fa fa-desktop", searchTerms: ['web']},
	{title: "fa fa-diamond", searchTerms: ['web']},
	{title: "fa fa-dollar", searchTerms: ['currency', 'money', 'dollar']},
	{title: "fa fa-dot-circle-o", searchTerms: ['circle']},
	{title: "fa fa-download", searchTerms: ['web']},
	{title: "fa fa-drivers-license", searchTerms: ['web']},
	{title: "fa fa-drivers-license-o", searchTerms: ['web']},
	{title: "fa fa-dropbox", searchTerms: ['brand','brands']},
	{title: "fa fa-drupal", searchTerms: ['brand','brands']},
	{title: "fa fa-edge", searchTerms: ['brand','brands']},
	{title: "fa fa-edit", searchTerms: ['web']},
	{title: "fa fa-ellipsis-h", searchTerms: ['web']},
	{title: "fa fa-ellipsis-v", searchTerms: ['web']},
	{title: "fa fa-empire", searchTerms: ['starwars', 'star wars']},
	{title: "fa fa-envelope", searchTerms: ['web']},
	{title: "fa fa-envelope-o", searchTerms: ['web']},
	{title: "fa fa-envelope-open", searchTerms: ['web']},
	{title: "fa fa-envelope-open-o", searchTerms: ['web']},
	{title: "fa fa-envelope-square", searchTerms: ['web']},
	{title: "fa fa-eraser", searchTerms: ['text','editor']},
	{title: "fa fa-etsy", searchTerms: ['brand','brands']},
	{title: "fa fa-euro", searchTerms: ['currency', 'money', 'dollar']},
	{title: "fa fa-exchange", searchTerms: ['arrows','directional']},
	{title: "fa fa-exclamation", searchTerms: ['web']},
	{title: "fa fa-exclamation-circle", searchTerms: ['web']},
	{title: "fa fa-exclamation-triangle", searchTerms: ['web']},
	{title: "fa fa-external-link", searchTerms: ['web']},
	{title: "fa fa-external-link-square", searchTerms: ['web']},
	{title: "fa fa-eye", searchTerms: ['web']},
	{title: "fa fa-eye-slash", searchTerms: ['web']},
	{title: "fa fa-eyedropper", searchTerms: ['web']},
	{title: "fa fa-facebook", searchTerms: ['brand','brands']},
	{title: "fa fa-facebook-square", searchTerms: ['brand','brands']},
	{title: "fa fa-fax", searchTerms: ['web']},
	{title: "fa fa-feed", searchTerms: ['web']},
	{title: "fa fa-female", searchTerms: ['web']},
	{title: "fa fa-fighter-jet", searchTerms: ['web']},
	{title: "fa fa-file", searchTerms: ['text','editor']},
	{title: "fa fa-file-archive-o", searchTerms: ['web']},
	{title: "fa fa-file-audio-o", searchTerms: ['web']},
	{title: "fa fa-file-code-o", searchTerms: ['web']},
	{title: "fa fa-file-excel-o", searchTerms: ['web']},
	{title: "fa fa-file-image-o", searchTerms: ['web']},
	{title: "fa fa-file-movie-o", searchTerms: ['web']},
	{title: "fa fa-file-o", searchTerms: ['text','editor']},
	{title: "fa fa-file-pdf-o", searchTerms: ['web']},
	{title: "fa fa-file-photo-o", searchTerms: ['web']},
	{title: "fa fa-file-picture-o", searchTerms: ['web']},
	{title: "fa fa-file-powerpoint-o", searchTerms: ['web']},
	{title: "fa fa-file-sound-o", searchTerms: ['web']},
	{title: "fa fa-file-text", searchTerms: ['text','editor']},
	{title: "fa fa-file-text-o", searchTerms: ['text','editor']},
	{title: "fa fa-file-video-o", searchTerms: ['web']},
	{title: "fa fa-video-camera", searchTerms: ['web']},
	{title: "fa fa-file-word-o", searchTerms: ['web']},
	{title: "fa fa-file-zip-o", searchTerms: ['web']},
	{title: "fa fa-files-o", searchTerms: ['text','editor']},
	{title: "fa fa-film", searchTerms: ['web']},
	{title: "fa fa-filter", searchTerms: ['web']},
	{title: "fa fa-fire", searchTerms: ['web']},
	{title: "fa fa-fire-extinguisher", searchTerms: ['web']},
	{title: "fa fa-firefox", searchTerms: ['brand','brands']},
	{title: "fa fa-first-order", searchTerms: ['starwars', 'star wars']},
	{title: "fa fa-flag", searchTerms: ['web']},
	{title: "fa fa-flag-checkered", searchTerms: ['web']},
	{title: "fa fa-flag-o", searchTerms: ['web']},
	{title: "fa fa-flash", searchTerms: ['web']},
	{title: "fa fa-flask", searchTerms: ['web']},
	{title: "fa fa-floppy-o", searchTerms: ['text','editor']},
	{title: "fa fa-folder", searchTerms: ['web']},
	{title: "fa fa-folder-o", searchTerms: ['web']},
	{title: "fa fa-folder-open", searchTerms: ['web']},
	{title: "fa fa-folder-open-o", searchTerms: ['web']},
	{title: "fa fa-font", searchTerms: ['text','editor']},
	{title: "fa fa-fort-awesome", searchTerms: ['brand','brands']},
	{title: "fa fa-frown-o", searchTerms: ['web']},
	{title: "fa fa-futbol-o", searchTerms: ['web']},
	{title: "fa fa-gamepad", searchTerms: ['web']},
	{title: "fa fa-gavel", searchTerms: ['web']},
	{title: "fa fa-gbp", searchTerms: ['currency', 'money', 'dollar']},
	{title: "fa fa-gear", searchTerms: ['web']},
	{title: "fa fa-gears", searchTerms: ['web']},
	{title: "fa fa-gift", searchTerms: ['web']},
	{title: "fa fa-github", searchTerms: ['brand','brands']},
	{title: "fa fa-github-square", searchTerms: ['brand','brands']},
	{title: "fa fa-glass", searchTerms: ['web']},
	{title: "fa fa-globe", searchTerms: ['web']},
	{title: "fa fa-google", searchTerms: ['brand','brands']},
	{title: "fa fa-google-plus", searchTerms: ['brand','brands']},
	{title: "fa fa-graduation-cap", searchTerms: ['web']},
	{title: "fa fa-group", searchTerms: ['web']},
	{title: "fa fa-hand-grab-o", searchTerms: ['web']},
	{title: "fa fa-hand-lizard-o", searchTerms: ['web']},
	{title: "fa fa-hand-o-down", searchTerms: ['arrows','directional']},
	{title: "fa fa-hand-o-left", searchTerms: ['arrows','directional']},
	{title: "fa fa-hand-o-right", searchTerms: ['arrows','directional']},
	{title: "fa fa-hand-o-up", searchTerms: ['arrows','directional']},
	{title: "fa fa-hand-paper-o", searchTerms: ['web']},
	{title: "fa fa-hand-peace-o", searchTerms: ['web']},
	{title: "fa fa-hand-pointer-o", searchTerms: ['web']},
	{title: "fa fa-hand-rock-o", searchTerms: ['web']},
	{title: "fa fa-hand-scissors-o", searchTerms: ['web']},
	{title: "fa fa-hand-spock-o", searchTerms: ['web']},
	{title: "fa fa-hand-stop-o", searchTerms: ['web']},
	{title: "fa fa-handshake-o", searchTerms: ['web']},
	{title: "fa fa-hard-of-hearing", searchTerms: ['web']},
	{title: "fa fa-hashtag", searchTerms: ['web']},
	{title: "fa fa-hdd-o", searchTerms: ['web']},
	{title: "fa fa-header", searchTerms: ['text','editor']},
	{title: "fa fa-headphones", searchTerms: ['web']},
	{title: "fa fa-heart", searchTerms: ['web']},
	{title: "fa fa-heart-o", searchTerms: ['web']},
	{title: "fa fa-heartbeat", searchTerms: ['web']},
	{title: "fa fa-history", searchTerms: ['web']},
	{title: "fa fa-home", searchTerms: ['web']},
	{title: "fa fa-hotel", searchTerms: ['web']},
	{title: "fa fa-hourglass", searchTerms: ['web']},
	{title: "fa fa-hourglass-1", searchTerms: ['web']},
	{title: "fa fa-hourglass-2", searchTerms: ['web']},
	{title: "fa fa-hourglass-3", searchTerms: ['web']},
	{title: "fa fa-hourglass-end", searchTerms: ['web']},
	{title: "fa fa-hourglass-half", searchTerms: ['web']},
	{title: "fa fa-hourglass-o", searchTerms: ['web']},
	{title: "fa fa-hourglass-start", searchTerms: ['web']},
	{title: "fa fa-html5", searchTerms: ['brand','brands']},
	{title: "fa fa-i-cursor", searchTerms: ['web']},
	{title: "fa fa-id-badge", searchTerms: ['web']},
	{title: "fa fa-id-card", searchTerms: ['web']},
	{title: "fa fa-id-card-o", searchTerms: ['web']},
	{title: "fa fa-image", searchTerms: ['web']},
	{title: "fa fa-imdb", searchTerms: ['brand','brands']},
	{title: "fa fa-inbox", searchTerms: ['web']},
	{title: "fa fa-indent", searchTerms: ['text','editor']},
	{title: "fa fa-industry", searchTerms: ['web']},
	{title: "fa fa-info", searchTerms: ['web']},
	{title: "fa fa-info-circle", searchTerms: ['web']},
	{title: "fa fa-instagram", searchTerms: ['brand','brands']},
	{title: "fa fa-institution", searchTerms: ['web']},
	{title: "fa fa-internet-explorer", searchTerms: ['brand','brands']},
	{title: "fa fa-italic", searchTerms: ['text','editor']},
	{title: "fa fa-jpy", searchTerms: ['currency', 'money', 'dollar']},
	{title: "fa fa-key", searchTerms: ['web']},
	{title: "fa fa-keyboard-o", searchTerms: ['web']},
	{title: "fa fa-language", searchTerms: ['web']},
	{title: "fa fa-laptop", searchTerms: ['web']},
	{title: "fa fa-leaf", searchTerms: ['web']},
	{title: "fa fa-legal", searchTerms: ['web']},
	{title: "fa fa-lemon-o", searchTerms: ['web']},
	{title: "fa fa-level-down", searchTerms: ['web']},
	{title: "fa fa-level-up", searchTerms: ['web']},
	{title: "fa fa-life-bouy", searchTerms: ['web']},
	{title: "fa fa-life-buoy", searchTerms: ['web']},
	{title: "fa fa-life-ring", searchTerms: ['web']},
	{title: "fa fa-life-saver", searchTerms: ['web']},
	{title: "fa fa-lightbulb-o", searchTerms: ['web']},
	{title: "fa fa-line-chart", searchTerms: ['web']},
	{title: "fa fa-link", searchTerms: ['text','editor']},
	{title: "fa fa-linkedin", searchTerms: ['brand','brands']},
	{title: "fa fa-linkedin-square", searchTerms: ['brand','brands']},
	{title: "fa fa-linux", searchTerms: ['brand','brands']},
	{title: "fa fa-list", searchTerms: ['text','editor']},
	{title: "fa fa-list-alt", searchTerms: ['text','editor']},
	{title: "fa fa-list-ol", searchTerms: ['text','editor']},
	{title: "fa fa-list-ul", searchTerms: ['text','editor']},
	{title: "fa fa-location-arrow", searchTerms: ['web']},
	{title: "fa fa-lock", searchTerms: ['web']},
	{title: "fa fa-long-arrow-down", searchTerms: ['arrows','directional']},
	{title: "fa fa-long-arrow-left", searchTerms: ['arrows','directional']},
	{title: "fa fa-long-arrow-right", searchTerms: ['arrows','directional']},
	{title: "fa fa-long-arrow-up", searchTerms: ['arrows','directional']},
	{title: "fa fa-low-vision", searchTerms: ['web']},
	{title: "fa fa-magic", searchTerms: ['web']},
	{title: "fa fa-magnet", searchTerms: ['web']},
	{title: "fa fa-mail-forward", searchTerms: ['web']},
	{title: "fa fa-mail-reply", searchTerms: ['web']},
	{title: "fa fa-mail-reply-all", searchTerms: ['web']},
	{title: "fa fa-male", searchTerms: ['web']},
	{title: "fa fa-map", searchTerms: ['web']},
	{title: "fa fa-map-marker", searchTerms: ['web']},
	{title: "fa fa-map-o", searchTerms: ['web']},
	{title: "fa fa-map-pin", searchTerms: ['web']},
	{title: "fa fa-map-signs", searchTerms: ['web']},
	{title: "fa fa-meh-o", searchTerms: ['web']},
	{title: "fa fa-microchip", searchTerms: ['web']},
	{title: "fa fa-microphone", searchTerms: ['web']},
	{title: "fa fa-microphone-slash", searchTerms: ['web']},
	{title: "fa fa-minus", searchTerms: ['web']},
	{title: "fa fa-minus-circle", searchTerms: ['web']},
	{title: "fa fa-minus-square", searchTerms: ['math', 'minus']},
	{title: "fa fa-minus-square-o", searchTerms: ['math', 'minus']},
	{title: "fa fa-mobile", searchTerms: ['web']},
	{title: "fa fa-mobile-phone", searchTerms: ['web']},
	{title: "fa fa-money", searchTerms: ['currency', 'money', 'dollar']},
	{title: "fa fa-moon-o", searchTerms: ['web']},
	{title: "fa fa-mortar-board", searchTerms: ['web']},
	{title: "fa fa-motorcycle", searchTerms: ['web']},
	{title: "fa fa-mouse-pointer", searchTerms: ['web']},
	{title: "fa fa-music", searchTerms: ['web']},
	{title: "fa fa-navicon", searchTerms: ['web']},
	{title: "fa fa-newspaper-o", searchTerms: ['web']},
	{title: "fa fa-object-group", searchTerms: ['web']},
	{title: "fa fa-object-ungroup", searchTerms: ['web']},
	{title: "fa fa-outdent", searchTerms: ['text','editor']},
	{title: "fa fa-paint-brush", searchTerms: ['web']},
	{title: "fa fa-paper-plane", searchTerms: ['web']},
	{title: "fa fa-paper-plane-o", searchTerms: ['web']},
	{title: "fa fa-paperclip", searchTerms: ['text','editor']},
	{title: "fa fa-paragraph", searchTerms: ['text','editor']},
	{title: "fa fa-paste", searchTerms: ['text','editor']},
	{title: "fa fa-paw", searchTerms: ['web']},
	{title: "fa fa-pencil", searchTerms: ['web']},
	{title: "fa fa-pencil-square", searchTerms: ['web']},
	{title: "fa fa-pencil-square-o", searchTerms: ['web']},
	{title: "fa fa-percent", searchTerms: ['web']},
	{title: "fa fa-phone", searchTerms: ['web']},
	{title: "fa fa-phone-square", searchTerms: ['web']},
	{title: "fa fa-photo", searchTerms: ['web']},
	{title: "fa fa-picture-o", searchTerms: ['web']},
	{title: "fa fa-pie-chart", searchTerms: ['web']},
	{title: "fa fa-pied-piper", searchTerms: ['brand','brands']},
	{title: "fa fa-pied-piper-pp", searchTerms: ['brand','brands']},
	{title: "fa fa-pinterest", searchTerms: ['brand','brands']},
	{title: "fa fa-pinterest-p", searchTerms: ['brand','brands']},
	{title: "fa fa-pinterest-square", searchTerms: ['brand','brands']},
	{title: "fa fa-plane", searchTerms: ['web']},
	{title: "fa fa-plug", searchTerms: ['web']},
	{title: "fa fa-plus", searchTerms: ['web']},
	{title: "fa fa-plus-circle", searchTerms: ['web']},
	{title: "fa fa-plus-square", searchTerms: ['math', 'plus']},
	{title: "fa fa-plus-square-o", searchTerms: ['math', 'plus']},
	{title: "fa fa-podcast", searchTerms: ['web']},
	{title: "fa fa-power-off", searchTerms: ['web']},
	{title: "fa fa-print", searchTerms: ['web']},
	{title: "fa fa-puzzle-piece", searchTerms: ['web']},
	{title: "fa fa-qrcode", searchTerms: ['web']},
	{title: "fa fa-question", searchTerms: ['web']},
	{title: "fa fa-question-circle", searchTerms: ['web']},
	{title: "fa fa-question-circle-o", searchTerms: ['web']},
	{title: "fa fa-quora", searchTerms: ['brand','brands']},
	{title: "fa fa-quote-left", searchTerms: ['web']},
	{title: "fa fa-quote-right", searchTerms: ['web']},
	{title: "fa fa-random", searchTerms: ['web']},
	{title: "fa fa-rebel", searchTerms: ['starwars', 'star wars']},
	{title: "fa fa-recycle", searchTerms: ['web']},
	{title: "fa fa-reddit", searchTerms: ['brand','brands']},
	{title: "fa fa-reddit-alien", searchTerms: ['brand','brands']},
	{title: "fa fa-reddit-square", searchTerms: ['brand','brands']},
	{title: "fa fa-refresh", searchTerms: ['web']},
	{title: "fa fa-registered", searchTerms: ['web']},
	{title: "fa fa-remove", searchTerms: ['web']},
	{title: "fa fa-renren", searchTerms: ['brand','brands']},
	{title: "fa fa-reorder", searchTerms: ['web']},
	{title: "fa fa-repeat", searchTerms: ['text','editor']},
	{title: "fa fa-reply", searchTerms: ['web']},
	{title: "fa fa-reply-all", searchTerms: ['web']},
	{title: "fa fa-retweet", searchTerms: ['web']},
	{title: "fa fa-road", searchTerms: ['web']},
	{title: "fa fa-rocket", searchTerms: ['web']},
	{title: "fa fa-rotate-left", searchTerms: ['text','editor']},
	{title: "fa fa-rotate-right", searchTerms: ['text','editor']},
	{title: "fa fa-rss", searchTerms: ['web']},
	{title: "fa fa-rss-square", searchTerms: ['web']},
	{title: "fa fa-s15", searchTerms: ['web']},
	{title: "fa fa-save", searchTerms: ['text','editor']},
	{title: "fa fa-scissors", searchTerms: ['text','editor']},
	{title: "fa fa-search", searchTerms: ['web']},
	{title: "fa fa-search-minus", searchTerms: ['web']},
	{title: "fa fa-search-plus", searchTerms: ['web']},
	{title: "fa fa-send", searchTerms: ['web']},
	{title: "fa fa-send-o", searchTerms: ['web']},
	{title: "fa fa-server", searchTerms: ['web']},
	{title: "fa fa-share", searchTerms: ['web']},
	{title: "fa fa-share-alt", searchTerms: ['web']},
	{title: "fa fa-share-alt-square", searchTerms: ['web']},
	{title: "fa fa-share-square", searchTerms: ['web']},
	{title: "fa fa-share-square-o", searchTerms: ['web']},
	{title: "fa fa-shield", searchTerms: ['web']},
	{title: "fa fa-ship", searchTerms: ['web']},
	{title: "fa fa-shopping-bag", searchTerms: ['web']},
	{title: "fa fa-shopping-basket", searchTerms: ['web']},
	{title: "fa fa-shopping-cart", searchTerms: ['web']},
	{title: "fa fa-shower", searchTerms: ['web']},
	{title: "fa fa-sign-in", searchTerms: ['web']},
	{title: "fa fa-sign-language", searchTerms: ['web']},
	{title: "fa fa-sign-out", searchTerms: ['web']},
	{title: "fa fa-signal", searchTerms: ['web']},
	{title: "fa fa-signing", searchTerms: ['web']},
	{title: "fa fa-sitemap", searchTerms: ['web']},
	{title: "fa fa-skype", searchTerms: ['brand','brands']},
	{title: "fa fa-slack", searchTerms: ['brand','brands']},
	{title: "fa fa-sliders", searchTerms: ['web']},
	{title: "fa fa-smile-o", searchTerms: ['web']},
	{title: "fa fa-snowflake-o", searchTerms: ['web']},
	{title: "fa fa-soccer-ball-o", searchTerms: ['web']},
	{title: "fa fa-sort", searchTerms: ['web']},
	{title: "fa fa-sort-alpha-asc", searchTerms: ['web']},
	{title: "fa fa-sort-alpha-desc", searchTerms: ['web']},
	{title: "fa fa-sort-amount-asc", searchTerms: ['web']},
	{title: "fa fa-sort-amount-desc", searchTerms: ['web']},
	{title: "fa fa-sort-asc", searchTerms: ['web']},
	{title: "fa fa-sort-desc", searchTerms: ['web']},
	{title: "fa fa-sort-down", searchTerms: ['web']},
	{title: "fa fa-sort-numeric-asc", searchTerms: ['web']},
	{title: "fa fa-sort-numeric-desc", searchTerms: ['web']},
	{title: "fa fa-sort-up", searchTerms: ['web']},
	{title: "fa fa-space-shuttle", searchTerms: ['web']},
	{title: "fa fa-spinner", searchTerms: ['web']},
	{title: "fa fa-spoon", searchTerms: ['web']},
	{title: "fa fa-square", searchTerms: ['square']},
	{title: "fa fa-square-o", searchTerms: ['square']},
	{title: "fa fa-star", searchTerms: ['web']},
	{title: "fa fa-star-half", searchTerms: ['web']},
	{title: "fa fa-star-half-empty", searchTerms: ['web']},
	{title: "fa fa-star-half-full", searchTerms: ['web']},
	{title: "fa fa-star-half-o", searchTerms: ['web']},
	{title: "fa fa-star-o", searchTerms: ['web']},
	{title: "fa fa-sticky-note", searchTerms: ['web']},
	{title: "fa fa-sticky-note-o", searchTerms: ['web']},
	{title: "fa fa-street-view", searchTerms: ['web']},
	{title: "fa fa-strikethrough", searchTerms: ['text','editor']},
	{title: "fa fa-subscript", searchTerms: ['text','editor']},
	{title: "fa fa-suitcase", searchTerms: ['web']},
	{title: "fa fa-sun-o", searchTerms: ['web']},
	{title: "fa fa-superscript", searchTerms: ['text','editor']},
	{title: "fa fa-support", searchTerms: ['web']},
	{title: "fa fa-table", searchTerms: ['text','editor']},
	{title: "fa fa-tablet", searchTerms: ['web']},
	{title: "fa fa-tachometer", searchTerms: ['web']},
	{title: "fa fa-tag", searchTerms: ['web']},
	{title: "fa fa-tags", searchTerms: ['web']},
	{title: "fa fa-tasks", searchTerms: ['web']},
	{title: "fa fa-taxi", searchTerms: ['web']},
	{title: "fa fa-television", searchTerms: ['web']},
	{title: "fa fa-terminal", searchTerms: ['web']},
	{title: "fa fa-text-height", searchTerms: ['text','editor']},
	{title: "fa fa-text-width", searchTerms: ['text','editor']},
	{title: "fa fa-th", searchTerms: ['text','editor']},
	{title: "fa fa-th-large", searchTerms: ['text','editor']},
	{title: "fa fa-th-list", searchTerms: ['text','editor']},
	{title: "fa fa-thermometer", searchTerms: ['web']},
	{title: "fa fa-thermometer-0", searchTerms: ['web']},
	{title: "fa fa-thermometer-1", searchTerms: ['web']},
	{title: "fa fa-thermometer-2", searchTerms: ['web']},
	{title: "fa fa-thermometer-3", searchTerms: ['web']},
	{title: "fa fa-thermometer-4", searchTerms: ['web']},
	{title: "fa fa-thermometer-empty", searchTerms: ['web']},
	{title: "fa fa-thermometer-full", searchTerms: ['web']},
	{title: "fa fa-thermometer-half", searchTerms: ['web']},
	{title: "fa fa-thermometer-quarter", searchTerms: ['web']},
	{title: "fa fa-thermometer-three-quarters", searchTerms: ['web']},
	{title: "fa fa-thumb-tack", searchTerms: ['web']},
	{title: "fa fa-thumbs-down", searchTerms: ['web']},
	{title: "fa fa-thumbs-o-down", searchTerms: ['web']},
	{title: "fa fa-thumbs-o-up", searchTerms: ['web']},
	{title: "fa fa-thumbs-up", searchTerms: ['web']},
	{title: "fa fa-ticket", searchTerms: ['web']},
	{title: "fa fa-times", searchTerms: ['web']},
	{title: "fa fa-times-circle", searchTerms: ['web']},
	{title: "fa fa-times-circle-o", searchTerms: ['web']},
	{title: "fa fa-times-rectangle", searchTerms: ['web']},
	{title: "fa fa-times-rectangle-o", searchTerms: ['web']},
	{title: "fa fa-tint", searchTerms: ['web']},
	{title: "fa fa-toggle-down", searchTerms: ['arrows','directional']},
	{title: "fa fa-toggle-left", searchTerms: ['arrows','directional']},
	{title: "fa fa-toggle-off", searchTerms: ['web']},
	{title: "fa fa-toggle-on", searchTerms: ['web']},
	{title: "fa fa-toggle-right", searchTerms: ['arrows','directional']},
	{title: "fa fa-toggle-up", searchTerms: ['arrows','directional']},
	{title: "fa fa-trademark", searchTerms: ['web']},
	{title: "fa fa-trash", searchTerms: ['web']},
	{title: "fa fa-trash-o", searchTerms: ['web']},
	{title: "fa fa-tree", searchTerms: ['web']},
	{title: "fa fa-trophy", searchTerms: ['web']},
	{title: "fa fa-truck", searchTerms: ['web']},
	{title: "fa fa-tty", searchTerms: ['web']},
	{title: "fa fa-tumblr", searchTerms: ['brand','brands']},
	{title: "fa fa-tumblr-square", searchTerms: ['brand','brands']},
	{title: "fa fa-tv", searchTerms: ['web']},
	{title: "fa fa-twitch", searchTerms: ['brand','brands']},
	{title: "fa fa-twitter", searchTerms: ['brand','brands']},
	{title: "fa fa-twitter-square", searchTerms: ['brand','brands']},
	{title: "fa fa-umbrella", searchTerms: ['web']},
	{title: "fa fa-underline", searchTerms: ['text','editor']},
	{title: "fa fa-undo", searchTerms: ['text','editor']},
	{title: "fa fa-universal-access", searchTerms: ['web']},
	{title: "fa fa-university", searchTerms: ['web']},
	{title: "fa fa-unlink", searchTerms: ['text','editor']},
	{title: "fa fa-unlock", searchTerms: ['web']},
	{title: "fa fa-unlock-alt", searchTerms: ['web']},
	{title: "fa fa-unsorted", searchTerms: ['web']},
	{title: "fa fa-upload", searchTerms: ['web']},
	{title: "fa fa-user", searchTerms: ['web']},
	{title: "fa fa-user-circle", searchTerms: ['web']},
	{title: "fa fa-user-circle-o", searchTerms: ['web']},
	{title: "fa fa-user-o", searchTerms: ['web']},
	{title: "fa fa-user-plus", searchTerms: ['web']},
	{title: "fa fa-user-secret", searchTerms: ['web']},
	{title: "fa fa-user-times", searchTerms: ['web']},
	{title: "fa fa-windows", searchTerms: ['brand','brands']},
	{title: "fa fa-yelp", searchTerms: ['brand','brands']},
	{title: "fa fa-youtube", searchTerms: ['brand','brands']},
	{title: "fa fa-youtube-square", searchTerms: ['brand','brands']},
]


/*  Demo Items
------------------------------------------------- */

function createUyssesConnectionObject(){

	var sql = 'select * from information_schema.columns where table_schema = "Ulysses" order by table_name,ordinal_position';

	var typeObj = {
		"int": "metric"
		, "date": "date"
		, "varchar": "attribute"
	};

	sqlData.get('Ulysses', sql, 'mySql', 'none', function(sqlResults, status){


		var connectionObj = {
			"_id": "y5u3j2m5u5e9r7m6q4h0w1l9",
		    "name": "Ulysses",
		    "sqlFlavor": "mySql",
		    "schemas": {
		        //"Ulysses": {},
			}
		};

		sqlResults
    	.filter(function(arr, index){
    		return index == 0 ? false : arr;
        }).map(function(arr, index){

    		var s = 'Web Summary Schema';//arr[1];
    		var t = arr[2];
    		var c = arr[3];
    		var type = arr[7];

    		if(!connectionObj.schemas[s]){connectionObj.schemas[s] = {}};
    		if(!connectionObj.schemas[s][t]){connectionObj.schemas[s][t] = []};

    		connectionObj.schemas[s][t].push({"column": c, "type": typeObj[type] || "unknown"});
    	
        })

        mongo.write('data_connections', connectionObj._id, JSON.stringify(connectionObj), function(){})

	});

}



