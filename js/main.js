/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 */
var dateFormat = function () {
	var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (val, len) {
			val = String(val);
			len = len || 2;
			while (val.length < len) val = "0" + val;
			return val;
		};

	// Regexes and supporting functions are cached through closure
	return function (date, mask, utc) {
		var dF = dateFormat;

		// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
		if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date;
		if (isNaN(date)) throw SyntaxError("invalid date");

		mask = String(dF.masks[mask] || mask || dF.masks["default"]);

		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var	_ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
				d:    d,
				dd:   pad(d),
				ddd:  dF.i18n.dayNames[D],
				dddd: dF.i18n.dayNames[D + 7],
				m:    m + 1,
				mm:   pad(m + 1),
				mmm:  dF.i18n.monthNames[m],
				mmmm: dF.i18n.monthNames[m + 12],
				yy:   String(y).slice(2),
				yyyy: y,
				h:    H % 12 || 12,
				hh:   pad(H % 12 || 12),
				H:    H,
				HH:   pad(H),
				M:    M,
				MM:   pad(M),
				s:    s,
				ss:   pad(s),
				l:    pad(L, 3),
				L:    pad(L > 99 ? Math.round(L / 10) : L),
				t:    H < 12 ? "a"  : "p",
				tt:   H < 12 ? "am" : "pm",
				T:    H < 12 ? "A"  : "P",
				TT:   H < 12 ? "AM" : "PM",
				Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
				o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
				S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
}();
// Some common format strings
dateFormat.masks = {
	"default":      "ddd mmm dd yyyy HH:MM:ss",
	shortDate:      "m/d/yy",
	mediumDate:     "mmm d, yyyy",
	longDate:       "mmmm d, yyyy",
	fullDate:       "dddd, mmmm d, yyyy",
	shortTime:      "h:MM TT",
	mediumTime:     "h:MM:ss TT",
	longTime:       "h:MM:ss TT Z",
	isoDate:        "yyyy-mm-dd",
	isoTime:        "HH:MM:ss",
	isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
	isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};
// Internationalization strings
dateFormat.i18n = {
	dayNames: [
		"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	],
	monthNames: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	]
};
// For convenience...
Date.prototype.format = function (mask, utc) {
	return dateFormat(this, mask, utc);
};

if (typeof language === 'undefined'){
	language = '';
}


svg4everybody();

$(window).on('load', function(){
	$('body').removeClass('loaded');
});

// минимальная сумма заказа
if (typeof(sumMin)!= 'undefined' && sumMin!==null){
	sumMin = parseFloat(sumMin, 10);
}
else{
	sumMin = 20.0;	
}

var validate;

$(function(){

	/**
	* Проверка наличия значения по ключам
	* @param a
	* @param p[]
	* @returns bool
	*/
	var findKeyIn = function(a, ...p){
		
		//var v = a;
		for(var i in p){
			var pv = p[i];
			
			
			
			if (typeof(a[pv])=='undefined' || a[pv]==undefined ){
				return false;
			}
			
			a = a[pv];
		}
		return true;
	}
	/**
	* получаем значение по ключам доступа
	* @param a
	* @param p[]
	* @returns mixed
	*/
	var getByKey = function(a, ...p){

		for(var i in p){
			var pv = p[i];
			if (typeof(a[pv])=='undefined' || a[pv]==undefined ){
				return '';
			}
			
			a = a[pv];
		}
		return a.toString();
	}
	
	// Mobile Menu 
	// ---------------------------------------------- 
	function mobileMenu() {
		var mmNavbar = $('.mobile-navbar'),
			mmClose = $('.mobile-navbar__close'),
			mmContainer = $('.mobile-navbar__container');

		$('.mm-toggle').on('click', function(){
			$('.mm-toggle.burger').toggleClass('is-active')
			mmNavbar.toggleClass('is-open');
			$('body').toggleClass('lock')
			return false;
		})

	}
	mobileMenu();

	// Mobile Filter 
	// ---------------------------------------------- 
	function mobileFilter() {
		var mmfilter = $('.mobile-filter'),
			mmClose = $('.mobile-filter__close'),
			mmContainer = $('.mobile-filter__container');

		$('.mf-toggle').on('click', function(){
			$('.mf-toggle.burger').toggleClass('is-active')
			mmfilter.toggleClass('is-open');
			$('body').toggleClass('lock')
			return false;
		})

	}
	mobileFilter();

	function ctMenu() {
		$('.ct-item > a').on('click', function(){
			$('.ct-item').not($(this).parent()).removeClass('is-active')
			$(this).parent().toggleClass('is-active')
			
			return false;
		})
	}
	ctMenu();
	function ctFilter() {
		$('.ct-item-filter').on('click', function(){
			$(this).toggleClass('is-active').next('.ct-item-block').slideToggle(0)
			return false;
		})
	}
	ctFilter();
	
	var loadBasketVar;
	
	function openSearch() {
		$('.open-search').on('click', function(){
			
			
			
			$(this).toggleClass('is-active').parents('.search-int').toggleClass('is-open')
			return false;
		})
		
		$('.basket').hover(
			function(){
				
				if (loadBasketVar != undefined){
					loadBasketVar.abort();
				}
				loadBasket(language);
			}
			, function(){
				
			}
		);

		$(document).click( function(event){
			if( $(event.target).closest(".search-int").length ) 
				return;
				
			$(".search-int").removeClass('is-open')
			$('.open-search').removeClass('is-active')
			event.stopPropagation();
		});
	}
	openSearch();
	
	$('input[name=typePayment]').click(function () {
		var paymentMethod = $('input[name=typePayment]:checked').val();
		if (paymentMethod=='Card on delivery' || paymentMethod == 'Paypal') {
			$("#pay-credit-message").show();
		} else {
			$("#pay-credit-message").hide();
		}
	});

	
	function loadBasket(language=''){
		
		if (language.length>0){
			language = '/'+language;
		}
		
		loadBasketVar = $.getJSON(language + './ajax/carts/getbasket', (data)=>{
			updateDocument(data);
		});
		
	}
	
	function openNavAndFilter() {
		$('.open-nav').on('click', function(){
			
			$(this).toggleClass('is-active')
			$('.fix-filter').slideUp('200')
			$('.open-filter').removeClass('is-active')
			$('.fix-nav').slideToggle('200')
			return false;
		})
		$('.open-filter').on('click', function(){
			$('.fix-nav').slideUp('200')
			$('.open-nav').removeClass('is-active')
			$(this).toggleClass('is-active')
			$('.fix-filter').slideToggle('200')
			return false;
		})
	}
	openNavAndFilter();

	/**
	* обновитть документ
	* 
	* @param data{} 'show' 'hide' 'delete' 'add' 'update' 'updhtml'
	*/
	var updateDocument = function(data){
		if (data !== null && typeof(data)=='object'){
			if (data['show']!=undefined){
				for(var i in data['show']){
					$(i).show();
				}
			}
			if (data['hide']!=undefined){
				for(var i in data['hide']){
					$(i).hide();
				}
			}
			if (data['update']!=undefined){
				for(var i in data['update']){
					/*
					console.log(i);
					console.log(data['update'][i]);
					*/
					$(i).text(data['update'][i]);
				}
			}
			if (data['updhtml']!=undefined){
				for(var i in data['updhtml']){
					
					$(i).html(data['updhtml'][i]);
					/*
					
					[
						i
						, data['updhtml'][i]
					]);
					*/
				}
			}
			// ('item').data('name', 'val')
			if (data['upddata']!=undefined){
				for(var i in data['upddata']){
					
					for (var name in data['upddata'][i]){
						
						$(i).data(name, data['upddata'][i][name]);
					}
				}
			}			
			if (data['updval']!=undefined){
				for(var i in data['updval']){
					
					$(i).val(data['updval'][i]);
				}
			}
			if (data['delete']!=undefined){
				for(var i in data['delete']){
					$(i).remove();
				}
			}
			if (data['append']!=undefined){
				for(var i in data['append']){
					$(i).append(data['append'][i]);
				}
			}
			// click, ...
			if (data['trigger']!=undefined){
				for(var i in data['trigger']){
					$(i).trigger(data['trigger'][i]);
				}
			}
			if (data['magnificpopup']!=undefined){
				$.magnificPopup.close();
				$.magnificPopup.open({
					items: {
						src: data['magnificpopup']
						, type: 'inline'
					}
				});
			}
			if (data['removeClass']!=undefined){
				for(var i in data['removeClass']){
					$(i).removeClass(data['removeClass'][i]);
				}
			}
			if (data['addClass']!=undefined){
				for(var i in data['addClass']){
					if (!$(i).hasClass(data['addClass'][i])){
						$(i).addClass(data['addClass'][i]);	
					}
				}
			}
			if (data['propAdd']!=undefined){
				for(var i in data['propAdd']){
					// добавить и удалить	
					$(i).prop(data['propAdd'][i], true);
				}
			}
			if (data['propRemove']!=undefined){
				for(var i in data['propRemove']){
					// добавить и удалить	
					$(i).prop(data['propRemove'][i], false);
					//$(i).removeProp(data['propRemove'][i]);
					
					
				}
			}
			if (data['offsetTop']){
				for(var i in data['offsetTop']){
					$('html, body').animate({
						scrollTop:$(i).offset().top
					})
				}
			}
			if (data['location']!=undefined){
				
				$('.icon-load').css('display', 'flex');
				document.location.href = data['location'];
			}
			
		}
		
	}
	
	/**
	* Выводим Дату в значение+название недели
	* 
	* @param Date dateTime
	* @param String text
	* @returns String
	*/
	var convertDate =  function(dateTime, text){
		
		var daysOfWeek= {1:'Monday', 2:'Tuesday', 3:'Wednesday', 4:'Thursday', 5:'Friday', 6:'Saturday', 7:'Sunday', 0:'Sunday'};
		var text = 
			('0'+dateTime.getDate()).slice(-2)
			+'/'
			+('0'+(dateTime.getMonth()+1)).slice(-2)
			+(' '+daysOfWeek[dateTime.getDay()])
			+(text.length!=0?', '+text:'');

		return  text
	}
	
	/**
	* просчет даты
	* 
	* @param cityLink
	* @param dateTime
	* 
	* @returns {Object}
	*/
	var getDataDateTimeDelivery = function(cityLink, dateTime){
		
		var listData = {};
		
		
		// не все данные есть, ошибки
		if (typeof(listCityLinkId[cityLink])=='undefined'){
			
			return  listData;
		}
		if (typeof(deliveryNumberDaysTime[listCityLinkId[$('[name=city]').val()]]) == 'undefined'){
			
			return listData;
		}
		if ( typeof( deliveryNumberDaysTime[listCityLinkId[$('[name=city]').val()]][dateTime.getDay()] )=='undefined' ){
			
			
			return listData;
		}
		if ( typeof( deliveryNumberDaysTime[listCityLinkId[$('[name=city]').val()]][dateTime.getDay()][dateTime.getHours() < 10?'am':'pm']) == 'undefined' ){
			
			return listData;
		}
		if ( typeof( deliveryNumberDaysTime[listCityLinkId[$('[name=city]').val()]][dateTime.getDay()][dateTime.getHours() < 10?'am':'pm']['nd']) == 'undefined' ){
			
			return listData;
		}
		
		/** время оренды */
		var nd = deliveryNumberDaysTime[listCityLinkId[$('[name=city]').val()]][dateTime.getDay()][dateTime.getHours() < 10?'am':'pm']
		
		for (var i in nd['nd']){
			
			if (nd['nd'][i].length==0){

				break;
			}
			
			nd['nd'][i] = parseInt(nd['nd'][i], 10);
			
			if (typeof(nd['time']) == 'undefined' || typeof(nd['time'][i]) == 'undefined' || nd['time'][i].length==0){
				
				if ( typeof(listData[1])=='undefined' ){
					listData[1] = [];
				}
				
				var dateTimeT = new Date(dateTime);
				dateTimeT.setDate(dateTimeT.getDate()+nd['nd'][i]);
				listData[1].push(convertDate(dateTimeT, ''));
			}
			else{
				
				if ( typeof(listData[0])=='undefined' ){
					listData[0] = [];
				}
				
				var dateTimeT = new Date(dateTime);
				dateTimeT.setDate(dateTime.getDate()+nd['nd'][i]);
				listData[0].push(convertDate(dateTimeT, nd['time'][i]));
			}
		}
		
		return listData;
	}
	
	/**
	* просчет даты для  особых товаров
	* 
	* @param cityLink
	* @param dateTime
	* @param type
	* 
	* @returns {Object}
	*/
	var getListDateSpecialGoods = function(cityLink, dateTime, type){
		

		// day-dispatch[cityId][keyDay][type][view|in-time|out-data] out-data=>[0|1][day|time]
		var listData = {};
		
		if (typeof(listCityLinkId[cityLink])=='undefined'){
			return  listData;
		}
		var cityId = parseInt(listCityLinkId[cityLink], 10);
		
		// проверка наличия галочки доставки в этот город на таком товаре deliveryType[cityId][type: preorder, fruit_veg, sg][view]
		if (!findKeyIn(deliveryType, cityId, type, 'view') || parseInt(deliveryType[cityId][type]['view'], 10)!=1){
			
			
			return listData;
		}
		
		if (findKeyIn(deliveryType, cityId, type, 'gdate') && parseInt(deliveryType[cityId][type]['gdate'], 10)==1){
			
			return getDataDateTimeDelivery(cityLink, dateTime);
		}
		
		if (!findKeyIn(deliveryType, cityId, type, 'date') || parseInt(deliveryType[cityId][type]['date'], 10)!=1){
			
			
			return listData;
		}
		
		
		
		
		// day-dispatch[1][1][sg][view]
		// deliveryDayDispatch [cityId][keyDay][type][view|in-time|out-data] out-data=>[0|1][day|time]
		
		
		
		// доставка по курьерке по городу
		// day-dispatch[1][1][sg][view]
		var day = dateTime.getDay(), dayOut;
		var weekDay = [0,1,2,3,4,5,6,7];
		var inTime = 0; // время забора
		var dw;// день недели int
		var timeText;
		
		for (dw=0; dw<7; dw++){
			
			//console.log(dw);
			//console.log('поиск доставки');
			/*
			console.table({
				"getByKey(deliveryDayDispatch, cityId, (dw+day % 7), type, 'view')=='1'":getByKey(deliveryDayDispatch, cityId, (dw+day % 7), type, 'view')=='1'
				, "getByKey(deliveryDayDispatch, cityId, (dw+day % 7), type,'in-time').length !=0":getByKey(deliveryDayDispatch, cityId, (dw+day % 7), type,'in-time').length !=0
				, 'dw==0':dw==0
				, "parseInt(getByKey(deliveryDayDispatch, cityId, (dw+day % 7), type, 'in-time'), 10) > dateTime.getHours()":parseInt(getByKey(deliveryDayDispatch, cityId, (dw+day % 7), type, 'in-time'), 10) > dateTime.getHours()
				, '|| dw!=0':dw!=0
				, 'all':getByKey(deliveryDayDispatch, cityId, (dw+day % 7), type, 'view')=='1' // есть доставка
					&& getByKey(deliveryDayDispatch, cityId, (dw+day % 7), type,'in-time').length !=0 // есть время
					&& (
						dw==0 
						&& parseInt(getByKey(deliveryDayDispatch, cityId, (dw+day % 7), type, 'in-time'), 10) > dateTime.getHours() // и время больше чем сейчас
						|| dw!=0 
					)
			});
			*/
			// поиска первого времени
			if (
				getByKey(deliveryDayDispatch, cityId, (dw+day % 7), type, 'view')=='1' // есть доставка
				&& getByKey(deliveryDayDispatch, cityId, (dw+day % 7), type,'in-time').length !=0 // есть время
				&& (
					dw==0 
					&& parseInt(getByKey(deliveryDayDispatch, cityId, (dw+day % 7), type, 'in-time'), 10) > dateTime.getHours() // и время больше чем сейчас
					|| dw!=0 
				)
				
			){
				
				//console.log('есть доставка');
				//console.log(dw);
				
				var dateTimeT = new Date(dateTime);
				// время количествод ней
				if (( countDay = getByKey(deliveryDayDispatch, cityId, (dw+day % 7),type,'out-data', 0, 'day') ).length!=0){
					
					
					
					listData[0] = [];
					dateTimeT.setDate(dateTime.getDate() + dw + parseInt(countDay,10));
					
					dateTimeT.getDay()
					timeText = getByKey(deliveryDayDispatch, cityId, (dw+day % 7), type, 'out-data', 0, 'time');
					
					if (timeText.length==0){
						timeText = '9:00 - 18:00';
					}
					
					listData[0] = [];
					listData[0].push(convertDate(dateTimeT, timeText));
					
					if ( ( countDay = getByKey(deliveryDayDispatch, cityId, (dw+day % 7),type,'out-data', 1, 'day') ).length!=0){
						
						
						
						dateTimeT = new Date(dateTime);
						dateTimeT.setDate(dateTime.getDate() + dw + parseInt(countDay,10));
						
						timeText = getByKey(deliveryDayDispatch, cityId, (dw+day % 7), type, 'out-data', 1, 'time');
						if (timeText.length==0){
							timeText = '9:00 - 18:00';
						}
						
						listData[0].push(convertDate(dateTimeT, timeText));
						
						//console.log("%s "+dateTimeT, 'color:red');
					}
					
					
					//console.log(listData);
					
					return listData;
				}
				// не указано количество дней
				else{
					
					listData[0] = [];
					dateTimeT.setDate(dateTime.getDate() + dw + 1);
					listData[0].push(convertDate(dateTimeT, '9:00 - 18:00'));
				}
				
				
				
				getByKey(deliveryDayDispatch, cityId, dateTime.getDay(),type,'out-data', 1, 'day')
				
				// если нет ничего ТО следующий день и время 9-18
				
				break;
				if (getByKey(deliveryDayDispatch, cityId, day,type,'in-time').length !=0 
					&& parseInt(getByKey(deliveryDayDispatch, cityId, dateTime.getDay(),type,'in-time'), 10) > dateTime.getHours()
				){
						
					inTime = parseInt(getByKey(deliveryDayDispatch, cityId, dateTime.getDay(),type,'in-time'), 10);
				}
				
				
				// оформляе доставку
				if (
					dateTime.getHours() < inTime 
					&& (
						(dayOut = getByKey(deliveryDayDispatch, cityId, dateTime.getDay(),type,'out-data', 0, 'day')).length!=0 
						|| (dayOut = getByKey(deliveryDayDispatch, cityId, dateTime.getDay(),type,'out-data', 0, 'day')).length!=0
					)
				){
					
				}
				// опять косяк
				else{
					
				}
				
				break;
			}
		}
		
		return listData;
		
		
		//console.log(deliveryDayDispatch[cityId][dateTime.getDay()][ type][ 'view']);
		
		// время для оформления по курьерке по городу
		
		
		// 0 количество дней
		//console.log(deliveryDayDispatch[cityId][dateTime.getDay()][type]['out-data'][0]['day']);
		
		// 0 время
		//console.log(deliveryDayDispatch[cityId][dateTime.getDay()][type]['out-data'][0]['time']);
		
		// 1 количество дней
		//console.log(deliveryDayDispatch[cityId][dateTime.getDay()][type]['out-data'][1]['day']);
		
		// 1 время
		//console.log(deliveryDayDispatch[cityId][dateTime.getDay()][type]['out-data'][1]['time']);
		
		//deliveryDayDispatch
		return listData;
	}

	// Fixed up
	// ---------------------------------------------- 
	$(".up").removeClass("fixed");
	$(window).on('scroll load', function(){

		if ($(this).scrollTop() > 400) {
			$(".up").addClass("fixed");
		} else {
			 $(".up").removeClass("fixed");
		};

		
	});

	/**
	* функции плюс минус, для обработки догруженных
	*/
	let fMinus, fPlus;
	$('.js-minus').click( fMinus = function () {
		var $input = $(this).parent().find('.counter__input');
		var $inputHidden = $(this).closest('form').find('[name=count]');
		var count = parseInt($input.text()) - 1;
		count = count < 0 ? 0 : count;
		$input.text(count);
		
		$inputHidden.val(count);
		sendGoodsToCarts($inputHidden);
		
		$input.change();
		return false;
	});
	$('.js-plus').click( fPlus = function () {
		var $input = $(this).parent().find('.counter__input');
		
		var $inputHidden = $(this).closest('form').find('[name=count]');
		
		var count = parseInt($input.text()) + 1;
		$input.text(count);
		
		$inputHidden.val(count);
		sendGoodsToCarts($inputHidden);
		
		$input.change();
		
		
		
		
		return false;
	});
	

	$('.form-placeholder .form-input').focus(function(){
		var value = $(this).val();
		if(value == ''){
			$(this).parent().addClass('focus')
		}
	}).blur(function(){
		var value = $(this).val();
		if(value == ''){
			$(this).parent().removeClass('focus')
		} 
	});

	$('#country-select').change(function(){
		$('.city-option').hide();
		$('#' + $(this).val()).show();
	});


	if($('.range-slider').length){
		$( ".range-slider" ).slider({
			range: true,
			min: 1,
			max: 100,
			values: [ 4, 52 ],
			slide: function( event, ui ) {
				$( ".rangefrom" ).val(ui.values[ 0 ].toLocaleString());
				$( ".rangeto" ).val(ui.values[ 1 ].toLocaleString());

			}
		});
		$(".rangefrom").on('change', function() {
			$(".range-slider").slider('values',0,$(this).val());
		});
		$(".rangeto").on('change', function() {
			$(".range-slider").slider('values',1,$(this).val());
		});
	};

	$('a.anchor').bind('click.smoothscroll',function () {
		var target = $(this).attr('href'),
			bl_top = $(target).offset().top;
		$('body,html').animate({scrollTop: bl_top}, 600);
		return false;
	});


	
	// magnificPopup, popUp, обновление при создании эллементов
	$(document).magnificPopup({
		type: 'inline'
		, midClick: true
		, callbacks: {
			open: function() {
				// Will fire when this exact popup is opened
				// this - is Magnific Popup object

				if ($.magnificPopup.instance.st.el[0]!=undefined){
					var url = $($.magnificPopup.instance.st.el[0]).data('url');

					if (url!=undefined && $.magnificPopup.instance.content.find('form input[name=url]')!=undefined){
						$.magnificPopup.instance.content.find('form input[name=url]').val(url);
					}
				}
				
			}
		}
		// обновление подсказок при добавлении эллементов
		, delegate: '.open-popup' // https://github.com/dimsemenov/Magnific-Popup/issues/985
		
	});
	
	if ($(".gallery-container").length > 0) {
		$('.gallery-container').each(function () {
			$(this).magnificPopup({
				delegate: '.open-gallery-img'
				, type: 'image'
				, gallery: {
					enabled: true
				}				
			});
		});
	}
	/**
	* Загрузка при клике на фильтры
	*/
	function filterLoad(load=1){
		if ( load && $('#popup-filter-load').length){
			$.magnificPopup.open({
				items: {
					// can be a HTML string, jQuery object, or CSS selector
					src: '#popup-filter-load'
					, type: 'inline'
				}
			});	
		}
		else{ 
			$.magnificPopup.close();
		}
			
	}
	
	
	/*
	$.magnificPopup.open({
		items: {
			src: '<div class="white-popup">Dynamically created popup</div>'
			, type: 'inline'
		}
	})
	*/

	// Scrollbars
	// Свой скроллинг
	// ---------------------------------------------- 
	$(".scrollbars").overlayScrollbars({ });
	
	// Form Styler 
	// ---------------------------------------------- 
	if($('.styler').length){
		$('.styler').styler({
			singleSelectzIndex: '5'
			, selectVisibleOptions: '7'
			, fileBrowse: ''
			, filePlaceholder: 'Attach file'
			
		});
		setTimeout(function() {
			$('.styler').trigger('refresh');
		}, 2);
	};

	// Slick Slider
	// ---------------------------------------------- 
	if($('.about-slider').length){
		$('.about-slider').slick({
			slidesToShow:1,
			slidesToScroll: 1,
			dots: true,
			appendArrows: '.about-slider-nav', 
			appendDots: '.about-slider-nav',
			fade: true,
			autoplay: true,
			autoplaySpeed: 5000,
		});
	};
	if($('.banner-slider').length){
		$('.banner-slider').slick({
			slidesToShow:1,
			slidesToScroll: 1,
			adaptiveHeight: true,
			dots: true,
			appendArrows: '.banner-slider-nav', 
			appendDots: '.banner-slider-nav',
			fade: true,
			autoplay: true,
			autoplaySpeed: 3000,
		});
	};
	
	if($('.card-slider').length){
		$('.card-slider').slick({
			slidesToShow: 6,
			slidesToScroll: 1,
			dots: true,
			appendArrows: '.card-slider-nav', 
			appendDots: '.card-slider-nav',
			autoplay: true,
			autoplaySpeed: 1500,
			responsive: [
				{
					breakpoint: 1260,
					settings: {
						slidesToShow: 5,
						slidesToScroll: 5,
					}
				},
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
					}
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
					}
				},
				{
					breakpoint: 575,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
					}
				}
			]
		});
	};

	if($('.news-slider').length){
		$('.news-slider').slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			dots: true,
			appendArrows: '.news-slider-nav', 
			appendDots: '.news-slider-nav',
			responsive: [
				
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
					}
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
					}
				},
				{
					breakpoint: 575,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
					}
				}
			]
		});
	};

	if($('.reviews-slider').length){
		$('.reviews-slider').slick({
			slidesToShow: 3,
			slidesToScroll: 3,
			dots: true,
			appendArrows: '.reviews-slider-nav', 
			appendDots: '.reviews-slider-nav',
			responsive: [
				
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
					}
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
					}
				},
				{
					breakpoint: 575,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
					}
				}
			]
		});
	};

	if($('.card-gallery').length){
		$('.card-gallery').slick({
			fade: true,
			dots: true,
			adaptiveHeight: true,
			autoplay: true,
			appendArrows: '.card-gallery-nav', 
			appendDots: '.card-gallery-nav',
			
		});
	};

	

	//------------------------
	var listSendGoodsToCarts = {};
	function sendGoodsToCarts(e){
		//var $form = $(e).parents().find('form');
		var $form = $(e).closest('form');
		var action = $form.data('action');
			
		//console.log($form.find('[name=gid]').val());
				
		var dt = $form.serialize()/*+'&h=setgoods'*/;
		
		listSendGoodsToCarts[$form.find('[name=gid]').val()] != undefined?listSendGoodsToCarts[$form.find('[name=gid]').val()].abort():'';
		
		listSendGoodsToCarts[$form.find('[name=gid]').val()] = $.getJSON(action, dt, function(data){
			delete listSendGoodsToCarts[$form.find('[name=gid]').val()];
			updateDocument(data);
			
			// опа в обработке
			if ($('.formpuy [name=city]').length){
				$('.formpuy [name=city]').trigger('refresh');
			}
		});
		
	}
	
	/**
	* По клику по фильтам обновляется страница
	*/
	if ($('form.ct-filter').length){
		$('form.ct-filter [type=checkbox], form.ct-filter [type=radio]').on('change', function(){
			
			var url = $('form.ct-filter').data('url'), link='', linkArr = {};
			url = url==undefined?'':url;
			
			$('form.ct-filter [type=checkbox], form.ct-filter [type=radio]').each(function (i, val){
				
				if ($(val).attr('type')=='radio' ){
					if ($(val).prop("checked")){
						link+=$(val).attr('name')+'='+$(val).val()+';';
					}
				}
				else{
					
					if ($(val).prop("checked")){
						if (linkArr[$(val).attr('name')]==undefined){
							linkArr[$(val).attr('name')] = [];
						}
						
						linkArr[$(val).attr('name')].push($(val).val());
					}
				}
				
			});
			
			if (linkArr.length!=0){
				
				for(var key in linkArr){
					link+= key+'='+linkArr[key].join(',')+';';
				}
			}
			
			
			link = link.length>0?url+'/filter/'+link:url;
			
			$('.ct-filter a').attr('href', link);
			
			filterLoad();
			document.location.href = link;
			
		});
	}
	
	// отправка по адресу формы action
	if ($('.send-ajax').length){
		
		$('body').on('submit', '.send-ajax', function (e){
			e.preventDefault();
			
			var action = $(this).attr('action');
			
			$.get(action, $(this).serializeArray(), function(data){
			});
			
			return false;
		});
	}
	
	if ($('.sidebar li.ct-menu__item.ct-item').not('.is-active').find('.ct-menu__link').length){
		$('.sidebar li.ct-menu__item.ct-item').not('.is-active').find('.ct-menu__link').on('click', function(e){
			
			e.preventDefault();
			
			$('html,body').stop().animate({ scrollTop: $(this).offset().top>90?$(this).offset().top-90:0}, 800);
		});
	}

	/**
	* наличие можоженного товара в конзине
	* @type Number
	*/
	var goodsSG = 0, goodsFV = 0, goodsPR = 0;
	
	/**
	* способ оплаты
	*/
	var cardOnDelivery = function(){
		
		/*
		goodsSG;
		goodsFV;
		goodsPR;
		*/
		
		
		
		$('.typePaymentList').hide();
		
		// $('.typePaymentСard').show() // выводим 
		// $('.typePaymentCash').show();  //проверка
		// $('.typePaymentCardOnDelivery') //другое
		
		$('.typePaymentСard').show();
		$('.typePaymentCash').show();
		
		// Овощи, предзаказ
		if (goodsSG || goodsFV || goodsPR){
			if ($('.formpuy [name=city]').val() == 'paphos' && $('[name=typeDelivery][value=delivery]:checked').length){
				// :checked
				$('.typePaymentCash').show()
				// Cash on delivery
				$('.typePaymentCash').show();
				//Card on delivery
				$('.typePaymentCardOnDelivery').show();
			}
			else if ($('.formpuy [name=city]').val() != 'paphos' && $('[name=typeDelivery][value=delivery]:checked').length){
				// Cash on delivery
				//$('.typePaymentCash').show();
				$('.typePaymentСard').show();
				//$('[name=typePayment][value=Сard]').prop('checked', true);
				$('[name=typePayment][value=Cash]').prop('checked', true);
			}
			else if (!$('[name=typeDelivery][value=delivery]:checked').length){
				$('.typePaymentСard').show();
				//$('[name=typePayment][value=Сard]').prop('checked', true);
				$('[name=typePayment][value=Cash]').prop('checked', true);
			}

		}
		else{
			if ($('[name=typeDelivery][value=delivery]:checked').length ){
				
				if ($('.formpuy [name=city]').val() == 'paphos'){
					
					$('.typePaymentCash').show();
					$('.typePaymentCardOnDelivery').show();
					$('.typePaymentСard').show();	
				}
				else{
					
					//Cash on delivery
					$('.typePaymentCash').show();
					
					//Pay online by credit card
					$('.typePaymentСard').show();
				}
			}
			else{

				/*
				Cash on delivery
				Pay online by credit card
				*/
				$('.typePaymentCash').show();
				$('.typePaymentСard').show();
			}
			
		}
		
		// если ничего не выбрано, хоть чтото выбираем из оплаты
		if (!$('.typePaymentList:visible [name=typePayment]:checked').length){

			$('.typePaymentList [name=typePayment]').parents('.typePaymentList:visible').filter( ':first' ).find('[name=typePayment]').click();
		}
		
		
		
		if ($('.formpuy [name=city]').val() == 'paphos'){
			$('.pick-up-gap-akis-express').hide();
		}
		else{
			$('.pick-up-gap-akis-express').show();	
		}
	}
	
	// выбор города, вывод цен по товару, и названия блоков меняем
	if ($('.formpuy [name=city]').length){
		$('.formpuy [name=city]').on('change', function(){
			
			// вывод название "Delivery Date & Time:" и "Home Delivery"
			/*
			if ($('.formpuy [name=city]').val() == 'paphos'){
				
				$('.delivery-type-delivery-name').html('Home Delivery');
			}
			else{

				$('.delivery-type-delivery-name').html('Home delivery'); //  1-2 working days
				
			}
			*/
			

			// прячем все
			for(var i=0;i<5;i++){
				
								
				$('.'+'delivery-type-'+i).hide();
				
				
				//console.log('.'+'delivery-type-'+i);
			}
			// выводим формы курьерки для вывода
			for(var i in deliveryCouriersDataView[listCityLinkId[$('.formpuy [name=city]').val()]]){
				if (deliveryCouriersDataView[listCityLinkId[$('.formpuy [name=city]').val()]][i]==1){
					$('.'+'delivery-type-'+i).show();
					
					
				}
			}
			// $('.formpuy [name=typeDelivery]:visible:checked')
			// $('.formpuy [name=typeDelivery]:checked')
			//$('.formpuy [name=typeDelivery]:visible:checked').click();
			
			//$('.formpuy [name=typeDelivery]').parents('.justify-content-between').filter(':visible').find('[name=typeDelivery]').filter(':first').trigger('click').click();
			$('.formpuy [name=typeDelivery]').parent().filter(':visible:first').find('[name=typeDelivery]').trigger('click');
			
			// вывод цен по городу
			var $item = $(this);
			
			if (listDeliveryData!=undefined){
				
				var free_delivery, free_pickup, typeDelivery, free_pute;
				
				//free_delivery = listDeliveryData[$('.formpuy [name=country]').val()]['c'][$('.formpuy [name=city]').val()]['free_delivery'];
				free_delivery = Number(getByKey(listDeliveryData, $('.formpuy [name=country]').val(), 'c', $('.formpuy [name=city]').val(), 'free_delivery'), 10);
				
				//free_pickup = listDeliveryData[$('.formpuy [name=country]').val()]['c'][$('.formpuy [name=city]').val()]['free_pickup'];
				free_pickup = Number(getByKey(listDeliveryData, $('.formpuy [name=country]').val(), 'c', $('.formpuy [name=city]').val(), 'free_pickup'), 10);
				
				//free_pute = listDeliveryData[$('.formpuy [name=country]').val()]['c'][$('.formpuy [name=city]').val()]['free_pute'];
				free_pute = Number(getByKey(listDeliveryData, $('.formpuy [name=country]').val(), 'c', $('.formpuy [name=city]').val(), 'free_pute'), 10);
				
				//free_acs = listDeliveryData[$('.formpuy [name=country]').val()]['c'][$('.formpuy [name=city]').val()]['free_acs'];
				free_acs = Number(getByKey(listDeliveryData, $('.formpuy [name=country]').val(), 'c', $('.formpuy [name=city]').val(), 'free_acs'), 10);
				
				//free_ke = listDeliveryData[$('.formpuy [name=country]').val()]['c'][$('.formpuy [name=city]').val()]['free_ke'];
				free_ke = Number(getByKey(listDeliveryData, $('.formpuy [name=country]').val(), 'c', $('.formpuy [name=city]').val(), 'free_ke'), 10);
				
				//var priceDelivery = listDeliveryData[$('.formpuy [name=country]').val()]['c'][$('.formpuy [name=city]').val()][$('.formpuy  [name=typeDelivery]:checked').val()];
				var priceDelivery = Number(getByKey(listDeliveryData, $('.formpuy [name=country]').val(), 'c', $('.formpuy [name=city]').val(), $('.formpuy  [name=typeDelivery]:checked').val()));
				typeDelivery = $('.formpuy  [name=typeDelivery]:checked').val();
				
				var sum = parseFloat( $('.formpuy  .subtotal').text().replace(/[^\.\d]/, '') , 10);
				
				let countryLink = $('.formpuy [name=country]').val();
				let cityLink = $('.formpuy [name=city]').val();
				
				//let 
				//priceDelivery = 0.0;
				// .formpuy .delivery
				if (free_delivery!=0 && free_delivery<=sum){// нулевая доставка
					priceDelivery = 0;
				} else if ( // проверка на скидочную доставку
					getByKey(listDeliveryData, countryLink, 'c', cityLink, 'cost_dd_min') <= sum
					&& getByKey(listDeliveryData, countryLink, 'c', cityLink, 'cost_dd') != 0
				){
					priceDelivery = getByKey(listDeliveryData, countryLink, 'c', cityLink, 'cost_dd')
				} else{ // обычная доставка
					priceDelivery = getByKey(listDeliveryData, countryLink, 'c', cityLink, 'delivery')
				}
				$('.formpuy  .delivery').text('€'+priceDelivery);
					/*(
						(free_delivery!=0 && free_delivery<=sum)?0:
							getByKey(listDeliveryData, countryLink, 'c', cityLink, 'delivery')
								getByKey(listDeliveryData, $('.formpuy [name=country]').val(), 'c', $('.formpuy [name=city]').val(), 'delivery')
					)*/
						//:listDeliveryData[$('.formpuy [name=country]').val()]['c'][$('.formpuy [name=city]').val()]['delivery'])
				
				
				//.formpuy .self_delivery
				//priceDelivery = 0.0;
				if (free_pickup!=0 && free_pickup<=sum){// нулевая доставка
					priceDelivery = 0;
				} else if ( // проверка на скидочную доставку
					getByKey(listDeliveryData, countryLink, 'c', cityLink, 'cost_d_pickup_min_self') <= sum
					&& getByKey(listDeliveryData, countryLink, 'c', cityLink, 'cost_d_pickup_self') != 0
				){
					priceDelivery = getByKey(listDeliveryData, countryLink, 'c', cityLink, 'cost_d_pickup_self')
				} else{ // обычная доставка
					priceDelivery = getByKey(listDeliveryData, countryLink, 'c', cityLink, 'self_delivery')
				}
				$('.formpuy .self_delivery').text('€'+priceDelivery);
				
				/*
				$('.formpuy .self_delivery').text('€'+((free_pickup!=0 && free_pickup<=sum)?0
					:getByKey(listDeliveryData, $('.formpuy [name=country]').val(), 'c', $('.formpuy [name=city]').val(), 'self_delivery')));
					//listDeliveryData[$('.formpuy [name=country]').val()]['c'][$('.formpuy [name=city]').val()]['self_delivery']));
				*/
				
				
				//.formpuy  .pute
				//priceDelivery = 0.0;
				if (free_pute!=0 && free_pute<=sum){// нулевая доставка
					priceDelivery = 0;
				} else if ( // проверка на скидочную доставку
					getByKey(listDeliveryData, countryLink, 'c', cityLink, 'cost_d_pickup_min_pute') <= sum
					&& getByKey(listDeliveryData, countryLink, 'c', cityLink, 'cost_d_pickup_pute') != 0
				){
					priceDelivery = getByKey(listDeliveryData, countryLink, 'c', cityLink, 'cost_d_pickup_pute')
				} else{ // обычная доставка
					priceDelivery = getByKey(listDeliveryData, countryLink, 'c', cityLink, 'pute')
				}
				$('.formpuy .pute').text('€'+priceDelivery);
				
				/*
				$('.formpuy  .pute').text('€'+((free_pute!=0 && free_pute<=sum)?0
					:getByKey(listDeliveryData, $('.formpuy [name=country]').val(), 'c', $('.formpuy [name=city]').val(), 'pute')));
					//listDeliveryData[$('.formpuy [name=country]').val()]['c'][$('.formpuy [name=city]').val()]['pute']));
				*/
				
				
				//.formpuy  .acs
				//priceDelivery = 0.0;
				if (free_pute!=0 && free_pute<=sum){// нулевая доставка
				
					priceDelivery = 0;
				} else if ( // проверка на скидочную доставку
					getByKey(listDeliveryData, countryLink, 'c', cityLink, 'cost_d_pickup_min_acs') <= sum
					&& getByKey(listDeliveryData, countryLink, 'c', cityLink, 'cost_d_pickup_acs') != 0
				){
					
					priceDelivery = getByKey(listDeliveryData, countryLink, 'c', cityLink, 'cost_d_pickup_acs')
				} else{ // обычная доставка
				
					priceDelivery = getByKey(listDeliveryData, countryLink, 'c', cityLink, 'acs')
				}
				$('.formpuy .acs').text('€'+priceDelivery);
				/*
				$('.formpuy  .acs').text('€'+((free_acs!=0 && free_acs<=sum)?0
					:getByKey(listDeliveryData, $('.formpuy [name=country]').val(), 'c', $('.formpuy [name=city]').val(), 'acs')));
					//:listDeliveryData[$('.formpuy [name=country]').val()]['c'][$('.formpuy [name=city]').val()]['acs']));
				*/
				
				
				//.formpuy  .ke
				//priceDelivery = 0.0;
				if (free_pute!=0 && free_pute<=sum){// нулевая доставка
					
					priceDelivery = 0;
				} else if ( // проверка на скидочную доставку
					getByKey(listDeliveryData, countryLink, 'c', cityLink, 'cost_d_pickup_min_ke') <= sum
					&& getByKey(listDeliveryData, countryLink, 'c', cityLink, 'cost_d_pickup_ke') != 0
				){
					
					priceDelivery = getByKey(listDeliveryData, countryLink, 'c', cityLink, 'cost_d_pickup_ke')
				} else{ // обычная доставка
					
					priceDelivery = getByKey(listDeliveryData, countryLink, 'c', cityLink, 'ke')
				}
				$('.formpuy .ke').text('€'+priceDelivery);
				
				/*
				$('.formpuy  .ke').text('€'+((free_ke!=0 && free_ke<=sum)?0
					:getByKey(listDeliveryData, $('.formpuy [name=country]').val(), 'c', $('.formpuy [name=city]').val(), 'ke')));
					//:listDeliveryData[$('.formpuy [name=country]').val()]['c'][$('.formpuy [name=city]').val()]['ke']));
				*/
				
			}
			
			// пересчет списка самовывоза
			var pickupPointName = {};
			var name = $('.formpuy [name=country]').val()+' '+$('.formpuy [name=city]').val(), subName='';
			for (var i=1; i<6; i++){
				subName = name+' '+i;
				pickupPointName[subName] = subName;
			}
			
			// чистка списокв
			$('.formpuy [name=pickupPoint] option').remove();
			$('.formpuy [name=pickupTravelExpress] option').remove();
			$('.formpuy [name=pickup_acs] option').remove();
			$('.formpuy [name=pickupKronosExpress] option').remove();
			var cityNameVal = $('.formpuy [name=city]').val();
			// заполнение пустыми полями
			var optionText = [];
			optionText.push('<option></option>'); // 0
			optionText.push('<option></option>'); // 1
			optionText.push('<option></option>'); // 2
			optionText.push('<option></option>'); // 3
			optionText.push('<option></option>'); // 3
			//console.log(listPickup);
			// заполняем select-ы доставок
			if ( typeof listPickup !== 'undefined' && listPickup[cityNameVal] !== undefined){
				for( var skey  in listPickup[cityNameVal]){
					
					for( var key in listPickup[cityNameVal][skey]){
						
						optionText[skey]+='<option value="'+listPickup[cityNameVal][skey][key]+'">'+listPickup[cityNameVal][skey][key]+'</option>';
					}
				}
				// все самовывозы грузим по курьерке
				if (optionText[0]!=undefined){
					$('.formpuy [name=pickupPoint]').append( optionText[0] ).trigger('refresh');	
				}
				//$('.formpuy [name=pickupPoint]').change();
				
				if (optionText[1]!=undefined){
					$('.formpuy [name=pickupTravelExpress]').append( optionText[1] ).trigger('refresh');	
				}
				//$('.formpuy [name=pickupTravelExpress]').change();
				
				if (optionText[3]!=undefined){
					
					$('.formpuy [name=pickup_acs]').append( optionText[3] ).trigger('refresh');	
				}
				
				if (optionText[4]!=undefined){
					
					$('.formpuy [name=pickupKronosExpress]').append( optionText[4] ).trigger('refresh');	
				}
			}
			
			// для paphos есть курьер и самовывоз для всего товара
			// остальные есть доставка самовывоза, НО без самовывоза!! иначе НЕТ ДОСТАВКИ
			
			goodsSG = 0;
			$('.goods-sg').each(function(key, val){
				goodsSG = $(val).val()==0?goodsSG:$(val).val();
			});
			goodsFV = 0;
			$('.goods-fv').each(function(key, val){
				goodsFV = $(val).val()==0?goodsFV:$(val).val();
			});
			
			goodsPR = 0;
			$('.goods-pr').each(function(key, val){
				goodsPR = $(val).val()==0?goodsPR:$(val).val();
			});
			
			if ($('.formpuy [name=city]').val() == 'paphos'){
				$('.delivery-type-1wd').hide();
			}
			else{
				$('.delivery-type-1wd').show();
				//$('.delivery-type-1wd').hide();
			}
			
			var cityId=0; 
			if (typeof(listCityLinkId)!='undefined'){
				cityId = Number(getByKey(listCityLinkId, $('[name=city]').val()));
			}
			var preorder = parseInt($('.formpuy .preorder').val(), 10);
			var fruitVeg = parseInt($('.formpuy .fruitVeg').val(), 10);
			var frozen = parseInt($('.formpuy .frozen').val(), 10);
			
			if (preorder && Number(getByKey(deliveryCouriersDataDo, cityId, getByKey(listCouriersNameKey, $('.formpuy [name=typeDelivery]:checked').val()), 'preorder'))==0){
				
				$('[name=typeDelivery]').each(function(key, val){

					var keyCouriersNameKey = getByKey(listCouriersNameKey, $(val).val());
					
					if (Number(getByKey(deliveryCouriersDataDo, cityId, keyCouriersNameKey, 'preorder'))==0){
						$('.delivery-type-'+keyCouriersNameKey).hide();
					}
					else{
						//console.table({'key':key, 'val':$(val).val(), 'show':keyCouriersNameKey});	
					}
					
				});
			}
			if (fruitVeg && Number(getByKey(deliveryCouriersDataDo, cityId, getByKey(listCouriersNameKey, $('.formpuy [name=typeDelivery]:checked').val()), 'fruit_veg'))==0){
				
				$('[name=typeDelivery]').each(function(key, val){

					var keyCouriersNameKey = getByKey(listCouriersNameKey, $(val).val());
					
					if (Number(getByKey(deliveryCouriersDataDo, cityId, keyCouriersNameKey, 'fruit_veg'))==0){
						$('.delivery-type-'+keyCouriersNameKey).hide();
					}
					else{
						//console.table({'key':key, 'val':$(val).val(), 'show':keyCouriersNameKey});	
					}
				});
			}
			if (frozen && Number(getByKey(deliveryCouriersDataDo, cityId, getByKey(listCouriersNameKey, $('.formpuy [name=typeDelivery]:checked').val()), 'sg'))==0){
				
				$('[name=typeDelivery]').each(function(key, val){

					
					
					var keyCouriersNameKey = getByKey(listCouriersNameKey, $(val).val());
					
					/*
					console.table({
							'key':key
							, 'keyCouriersNameKey':keyCouriersNameKey
							, "Number(getByKey(deliveryCouriersDataDo, cityId, keyCouriersNameKey, 'sg'))":Number(getByKey(deliveryCouriersDataDo, cityId, keyCouriersNameKey, 'sg'))
							, "Number(getByKey(deliveryCouriersDataDo, cityId, keyCouriersNameKey, 'sg'))==0":Number(getByKey(deliveryCouriersDataDo, cityId, keyCouriersNameKey, 'sg'))==0
					});
					*/
					
					if (Number(getByKey(deliveryCouriersDataDo, cityId, keyCouriersNameKey, 'sg'))==0){
						$('.delivery-type-'+keyCouriersNameKey).hide();
						//console.log("$('.delivery-type-'"+keyCouriersNameKey+").hide();")
					}
					else{
						//console.table({'key':key, 'val':$(val).val(), 'show':keyCouriersNameKey});	
					}
				});
			}
			
			$('.formpuy [name=typeDelivery]').parent().filter(':visible:first').find('[name=typeDelivery]').click();
			$('.formpuy [name=typeDelivery]').parent().filter(':visible:first').find('[name=typeDelivery]').trigger('click');
			
			//$('.formpuy [name=typeDelivery]').parent().filter(':visible:first').find('[name=typeDelivery]').trigger('chech');
			
			$(this).val()!=''?$('.delivery-method').show():'';
			
			cardOnDelivery();
			
			
			
			
		})
		
		$('.formpuy [name=city]').change();
	}
	
	// пересчет цен доставки в общй цене
	if ($('.formpuy [name=typeDelivery]').length){
		
		$('.formpuy [name=typeDelivery]').on('click', function(){
			
			var typeDelivery = $('.formpuy  [name=typeDelivery]').parent().filter(':visible').find('[name=typeDelivery]:checked').val();
			if (typeDelivery==undefined){
				typeDelivery = '';
			}
			
			
			var free_delivery, free_pickup, free_pute, free_acs, free_ke;
			
			// отображение выбора пункта доставки
			
			$('.type-delivery').not('.var-'+typeDelivery).hide();
			$('.type-delivery.var-'+typeDelivery).show();
			
			
			var sumCostGoods = parseFloat( $('.formpuy  .subtotal').text().replace(/[^\.\d]/, '') , 10);
			
			var priceDelivery = getByKey(listDeliveryData, $('.formpuy [name=country]').val(), 'c', $('.formpuy [name=city]').val(), $('.formpuy  [name=typeDelivery]:checked').val());
			if (priceDelivery==''){
				priceDelivery = 0;
			}
			
			free_delivery = free_pickup = free_pute = free_acs = free_ke = 0;
			
			let listDeliveryDataCity =[]
			if ($('.formpuy [name=city]').val()!=''){
				listDeliveryDataCity = listDeliveryData[$('.formpuy [name=country]').val()]['c'][$('.formpuy [name=city]').val()];
				
				free_delivery = listDeliveryDataCity['free_delivery'];
				free_pickup = listDeliveryDataCity['free_pickup'];
				free_pute = listDeliveryDataCity['free_pute'];
				free_acs = listDeliveryDataCity['free_acs'];
				free_ke = listDeliveryDataCity['free_ke'];
				
				//listDeliveryDataCity['free_ke']
			}
			
			
			
			
			// доставка
			if (typeDelivery=='delivery'){
				if (free_delivery!=0 && sumCostGoods >= free_delivery){
					priceDelivery = 0;
				} else if (listDeliveryDataCity['cost_dd_min'] <= sumCostGoods && listDeliveryDataCity['cost_dd']!=0){
					priceDelivery = listDeliveryDataCity['cost_dd']
				}
			}
			// самовывозы
			else if (typeDelivery=='self_delivery'){
				if (free_pickup!=0 && sumCostGoods >= free_pickup){
					priceDelivery = 0;
				} else if (listDeliveryDataCity['cost_d_pickup_min_self'] <= sumCostGoods && listDeliveryDataCity['cost_d_pickup_self']!=0){
					priceDelivery = listDeliveryDataCity['cost_d_pickup_self']
				}
			}
			else if (typeDelivery=='pute'){
				if (free_pute!=0 && sumCostGoods >= free_pute){
					priceDelivery = 0;
				} else if (listDeliveryDataCity['cost_d_pickup_min_pute'] <= sumCostGoods && listDeliveryDataCity['cost_d_pickup_pute']!=0){
					priceDelivery = listDeliveryDataCity['cost_d_pickup_pute']
				}
			}
			else if (typeDelivery=='ke'){
				if (free_ke!=0 && sumCostGoods >= free_ke){
					priceDelivery = 0;
				} else if (listDeliveryDataCity['cost_d_pickup_min_ke'] <= sumCostGoods && listDeliveryDataCity['cost_d_pickup_ke']!=0){
					priceDelivery = listDeliveryDataCity['cost_d_pickup_ke']
				}
			}
			else{
				if (free_acs!=0 && sumCostGoods >= free_acs){
					priceDelivery = 0;
				} else if (listDeliveryDataCity['cost_d_pickup_min_acs'] <= sumCostGoods && listDeliveryDataCity['cost_d_pickup_acs']!=0){
					priceDelivery = listDeliveryDataCity['cost_d_pickup_acs']
				}
			}
			
			var sum = parseFloat( $('.formpuy  .subtotal').text().replace(/[^\.\,\d]+/, '').replace(/\,/, '.') , 10);
			
			var promocode = parseFloat( $('.formpuy  [name=promocode]').data('promocode'), 10) / 100.0;

			promocode = isNaN(promocode)?0:promocode;
			
			
			var sumTotal = parseFloat( (sum * (1.0-promocode)) + parseFloat(0+priceDelivery));
			
			if ($('.vat').data('vat')==undefined){
				$('.vat').data('vat', parseFloat($('.vat').text().replace(/\,/, '.')));
			}
			$('.vat').html( ( parseFloat($('.vat').data('vat')) * (1.0-promocode)).toFixed(2) );
			
			$('.formpuy  .total_sum').data('sum', parseFloat(sumTotal.toFixed(2)));
			$('.formpuy  .total_sum').text('€'+sumTotal.toFixed(2));
			
			// делаем поля не проверяемые для $('form').validate()
			if ($('.formpuy  [name=typeDelivery]:checked').val() == 'delivery'){
				$('[name=addressDelivery]').attr('required', true);
				$('[name=indexDelivery]').attr('required', true);
				
				$('[name=addressDelivery]').attr('required', '');
				$('[name=indexDelivery]').attr('required', '');
				
				$('[name=addressDelivery]').parent().find('.ff-star').show();
				$('[name=indexDelivery]').parent().find('.ff-star').show();
				
			}
			else{
				$('[name=addressDelivery]').attr('required', false);
				$('[name=indexDelivery]').attr('required', false);
				
				$('[name=addressDelivery]').removeAttr('required');				
				$('[name=indexDelivery]').removeAttr('required');
				
				$('[name=addressDelivery]').parent().find('.ff-star').hide();
				$('[name=indexDelivery]').parent().find('.ff-star').hide();
				
				$('[name=addressDelivery]').removeClass('error');
				$('[name=indexDelivery]').removeClass('error');
				
			}
			
			var dateTime = new Date();
			
			// оплата блочим не нужную
			// deliveryNumberDaysTime[cityId][dayKey][am|pm][nd|time][$key]
			//deliveryNumberDaysTime
			// deliveryNumberDaysTime[listCityLinkId[$('[name=city]').val()]][dateTime.getDay()][dateTime.getHours()<12?'am':'pm']['nd'][0]
			// deliveryNumberDaysTime[listCityLinkId[$('[name=city]').val()]][dateTime.getDay()][dateTime.getHours()<12?'am':'pm']['time'][0]
			
			var dateTimeText_1 = '', dateTimeText_2 = '', dateTimeText_3 = '';
			
			var preorder = parseInt($('.preorder').val(), 10);
			var fruitVeg = parseInt($('.fruitVeg').val(), 10);
			var frozen = parseInt($('.frozen').val(), 10);
			
			var listDateTimeText;
			///var listType = '';
			var cityId = Number(getByKey(listCityLinkId, $('[name=city]').val()));
			
			if (preorder){
				listDateTimeText = getListDateSpecialGoods( $('[name=city]').val(), (new Date()), 'preorder');
			}
			else if (fruitVeg){
				listDateTimeText = getListDateSpecialGoods( $('[name=city]').val(), (new Date()), 'fruit_veg');
			}
			else if (frozen){
				listDateTimeText = getListDateSpecialGoods( $('[name=city]').val(), (new Date()), 'sg');
			}
			else{
				listDateTimeText = //getListDateSpecialGoods( $('[name=city]').val(), (new Date()), '');
					getDataDateTimeDelivery( $('[name=city]').val(), (new Date()));
			}
			// пересчет под 'Home delivery' кроме 'paphos'

			// поправка дат МЕНЯЕМ вывод дат
			
			// 08/09 - 09/09
			if ($('.formpuy  [name=typeDelivery]:checked').val() != 'delivery' 
				&& $('[name=city]').val() == 'paphos' 
				&& listDateTimeText[0]!=undefined 
				&& listDateTimeText[0][0]!=undefined
			){
				
				if (
					listDateTimeText[0]!=undefined 
					&& listDateTimeText[0][0]!=undefined
				){
					var val = listDateTimeText[0][0].match(/^(\d{1,2})\/(\d{1,2})/iu);
					var dateTime = new Date();
					dateTime.setMonth(val[2]);
					dateTime.setDate( parseInt(val[1], 10) + 1);
					listDateTimeText[0][0] = val[0]+' - '+dateTime.getDate().toString().padStart(2, '0')+'/'+(dateTime.getMonth()==0?12:dateTime.getMonth()).toString().padStart(2, '0');	
					
					if (listDateTimeText[0][1] != undefined){
						listDateTimeText[0].pop();
					}
				}
				else if (
					listDateTimeText[1]!=undefined 
					&& listDateTimeText[1][0]!=undefined
				){
					var val = listDateTimeText[1][0].match(/^(\d{1,2})\/(\d{1,2})/iu);
					var dateTime = new Date();
					dateTime.setMonth(val[2]);
					dateTime.setDate( parseInt(val[1], 10) + 1);
					listDateTimeText[1][0] = val[0]+' - '+dateTime.getDate().toString().padStart(2, '0')+'/'+(dateTime.getMonth()==0?12:dateTime.getMonth()).toString().padStart(2, '0');
					
					if (listDateTimeText[1][1] != undefined){
						listDateTimeText[1].pop();
					}
				}
			}
			// 09/09 - 10/09
			else if ($('.formpuy  [name=typeDelivery]:checked').val()=='delivery' 
				&& $('[name=city]').val()!='paphos' 
				&& listDateTimeText[0]!=undefined 
				&& listDateTimeText[0][0]!=undefined
			){
				
				var val = listDateTimeText[0][0];
				
				var val = listDateTimeText[0][0].match(/^(\d{1,2})\/(\d{1,2})/iu);

				var dateTime = new Date();
				var newDate = dateTime.getDate();

				dateTime.setMonth(val[2]-1);
				dateTime.setDate( parseInt(val[1], 10) + 1);
				
				if (dateTime.getDate()<newDate){
					dateTime.setFullYear(dateTime.getFullYear()+1);
				}
				
				listDateTimeText[0][0] = val[0]+' - '+dateTime.format('dd/mm');
				
				
			}
			
			// поправка дат для пафова, выводим тут несколько дней
			// дата для delivery и Paphos города
			// 08/09 Wednesday, 9:00 - 11:00
			else if ($('.formpuy  [name=typeDelivery]:checked').val()=='delivery' 
				&& $('[name=city]').val()=='paphos' 
				&& listDateTimeText[1]!=undefined 
				&& listDateTimeText[1][0]!=undefined
			){
				
				var val = listDateTimeText[1][0];
				
				var val = listDateTimeText[1][0].match(/^(\d{1,2})\/(\d{1,2})/iu);
				
				var dateTime = new Date();
				var newDate = dateTime.getDate();
				
				dateTime.setMonth(val[2]-1);
				dateTime.setDate( parseInt(val[1], 10) + 2);
				
				if (dateTime.getDate()<newDate){
					dateTime.setFullYear(dateTime.getFullYear()+1);
				}
			
				//listDateTimeText[1][0] = val[0]+' - '+dateTime.getDate().toString().padStart(2, '0')+'/'+(dateTime.getMonth()==0?12:dateTime.getMonth()).toString().padStart(2, '0');	
				listDateTimeText[1][0] = val[0]+' - '+dateTime.format('dd/mm');
				
				//console.log(dateTime.getMonth());
			}
			// дата для delivery и НЕ Paphos города
			// 09/09 - 10/09
			else if (
				$('.formpuy  [name=typeDelivery]:checked').val()=='delivery' 
				&& $('[name=city]').val()!='paphos'
				&& listDateTimeText[1]!=undefined 
				&& listDateTimeText[1][0]!=undefined
			){
			
				var val = listDateTimeText[1][0];
				
				var val = listDateTimeText[1][0].match(/^(\d{1,2})\/(\d{1,2})/iu);
				
				var dateTime = new Date();
				var newDate = dateTime.getDate();
				
				dateTime.setMonth(val[2]-1);
				dateTime.setDate( parseInt(val[1], 10) + 2);
				
				if (dateTime.getDate()<newDate){
					dateTime.setFullYear(dateTime.getFullYear()+1);
				}
				
				//listDateTimeText[1][0] = val[0]+' - '+dateTime.getDate().toString().padStart(2, '0')+'/'+(dateTime.getMonth()==0?12:dateTime.getMonth()).toString().padStart(2, '0');
				listDateTimeText[1][0] = val[0]+' - '+dateTime.format('dd/mm');
				
								
			}
			// выводим даты постоянно
			// 08/09 - 10/09
			// delivery and paphos
			else /*if ($('.formpuy  [name=typeDelivery]:checked').val()=='delivery' 
				&& $('[name=city]').val()=='paphos' 
				//&& listDateTimeText[0]==undefined
			)*/{

				dateTime = new Date();
				var nd = [];
				if (findKeyIn(deliveryNumberDaysTime, listCityLinkId[$('[name=city]').val()], dateTime.getDay(), dateTime.getHours() < 10?'am':'pm')){
					nd = deliveryNumberDaysTime[listCityLinkId[$('[name=city]').val()]][dateTime.getDay()][dateTime.getHours() < 12?'am':'pm'];
					//console.log(nd);
				}
				if (nd['nd']!=undefined && nd['nd'].length>0){
					for (var i in nd['nd']){
						//console.log()						
						nd['nd'][i] = parseInt(nd['nd'][i], 10);
						dateTime.setDate(dateTime.getDate() + nd['nd'][i]);
						
						break;
					}
				}
				else{
					dateTime.setDate(dateTime.getDate() + 1);
				}
				
				//var nd = deliveryNumberDaysTime[listCityLinkId[$('[name=city]').val()]][dateTime.getDay()][dateTime.getHours() < 10?'am':'pm'];
				listDateTimeText[0] = [];
				//listDateTimeText[0][0] = dateTime.getDate().toString().padStart(2, '0')+'/'+(dateTime.getMonth()+1).toString().padStart(2, '0');
				listDateTimeText[0][0] = dateTime.format('dd/mm');
				dateTime.setDate(dateTime.getDate()+2);
				//listDateTimeText[0][0] += ' - '+dateTime.getDate().toString().padStart(2, '0')+'/'+(dateTime.getMonth()+1).toString().padStart(2, '0');
				listDateTimeText[0][0] += ' - '+dateTime.format('dd/mm');
				
			}
			
			// вывод оплат
			if (typeof(listDateTimeText[0]) != 'undefined'){

				$('.delivery-date-time').show();
				
				$('.pick-up-delivery').hide();
				$('.pick-up-delivery input[type=radio]').prop('checked', false);
				
				
				$('.delivery-date-time-1').val(listDateTimeText[0][0]);
				$('.delivery-date-time-1').parent().find('.delivery-date-time-text').html(listDateTimeText[0][0]);
				
				if (typeof(listDateTimeText[0][1]) != 'undefined'){
					
					
					
					$('.delivery-date-time-2').val(listDateTimeText[0][1]);
					$('.delivery-date-time-2').parent().find('.delivery-date-time-text').html(listDateTimeText[0][1]);
					
					$('.delivery-date-time-parent-2').show();
				}
				else{
					
					$('.delivery-date-time-parent-2').hide();
				}
				
				//$('.delivery-date-time input[type=radio]').prop('checked', true);
				
				// .is(':visible')
				// :first

				if (!$('.delivery-date-time .radio:visible input[type=radio]:checked').length){
					$('.delivery-date-time .radio:visible:first').trigger('click');	
				}
				
				
				
			}
			else if (typeof(listDateTimeText[1]) != 'undefined'){
				
				
				
				$('.delivery-date-time-3').val(listDateTimeText[1][0]);
				$('.delivery-date-time-3').parent().find('.delivery-date-time-text').html(listDateTimeText[1][0]);
				
				$('.pick-up-delivery').show();
				
				$('.delivery-date-time').hide();
				$('.delivery-date-time input[type=radio]').prop('checked', false);
				
				$('.formpuy [name=pick-up-delivery]').parent().filter(':visible:first').find('[name=pick-up-delivery]').trigger('click');
			}
			else{
				
				$('.delivery-date-time').hide();
				$('.delivery-date-time input[type=radio]').prop('checked', false);
				
				$('.pick-up-delivery').hide();
				$('.pick-up-delivery input[type=radio]').prop('checked', false);
			}
			
			
			// вывод "Delivery Date & Time:" или "Estimate Delivery Date:"
			if ($('.formpuy [name=city]').val() == 'paphos' && $('.formpuy [name=typeDelivery]:checked').val() == 'delivery'){
				$('.delivery-date-time-name').html('Delivery Date:'); // Delivery Date & Time:
			}
			else if ($('.formpuy [name=city]').val() == 'paphos' && $('.formpuy [name=typeDelivery]:checked').val() != 'delivery'){
				$('.delivery-date-time-name').html('Delivery Date:'); //  & Time
			}
			else{
				$('.delivery-date-time-name').html('Estimate Delivery Date:');
			}
			
			cardOnDelivery();
			
		});
		
		
		
		if ($('.formpuy [name=typeDelivery]').length>0){
			//$('.formpuy [name=typeDelivery]')[0].click();	
			//$('.formpuy [name=typeDelivery]')[0].trigger('click');	
			//$('.formpuy [name=typeDelivery]').parent().find(':visible').find('[name=typeDelivery]')
			
			if ( !$('.formpuy [name=typeDelivery]').parent().filter(':visible').length){
				$('.delivery-date-time').hide();
				$('.pick-up-delivery').hide();
			}
			
			//console.log('клик');
			$('.formpuy [name=typeDelivery]').parent().filter(':visible:first').find('[name=typeDelivery]').trigger('click');
		}
		
		$('.formpuy [name=typeDelivery]').prop('click');
	}
	
	/**
	* отправка формы заказа, с обработкой
	*/
	if ($('.formpuy').length){
		/*
		$('.formpuy').on('submit', function(){
			var $form = $('.formpuy');
			
			$.get($form.data('action'), $(this).serializeArray(), function(data){
				console.log(data);
			});
			
			
			return false;
		});
		*/
	}
	
	
	// оброботки формы online
	if ($('.send-form').length){
		
		$('body').on('submit', '.send-form', function(e){
			
			var $form = $(this);
			
			e.preventDefault();
			
			$('body').on('mousemove', '.g-recaptcha', function(){
				
				if ($form.find('[name=g-recaptcha-response]').val()==''){
					
					$form.find('.g-recaptcha>div').addClass('error');
				}
				else{
					
					$form.find('.g-recaptcha>div').removeClass('error');
				}
			});
			// если стоит .recaptcha то проверка иначе отправка
			if ($form.hasClass('recaptcha') && $form.find('[name=g-recaptcha-response]').val()==''){
				
				if ($form.find('[name=g-recaptcha-response]').val()==''){
					
					$form.find('.g-recaptcha>div').addClass('error');
				}
				else{
					
					$form.find('.g-recaptcha>div').removeClass('error');
				}
				
				//return false;
			}
			
			if (!$form.valid()){
				return false;
			}
			
			if ($form.hasClass('recaptcha') && $form.find('[name=g-recaptcha-response]').val()==''){
			
				return false;	
			}
			
			if ($form.data('action') == undefined){
				//return true;
			}
			
			if ($.magnificPopup.instance.isOpen){
				$.magnificPopup.close();
				$.magnificPopup.open({
					items: {
						src: '<div class="popup"></div>'
						, type: 'inline'
					}
				});	
			}
			
			
			
			if ($form.hasClass('make-load-icon')){
				$('.icon-load').css('display', 'flex');	
			}
			
			var dataOut = $form.serializeArray();
			
			$form.find("input[type=text], input[type=email], input[type=tel], textarea").val("");
			
			$.getJSON($form.data('action'), dataOut, function(data){
					
				if ($form.hasClass('make-load-icon')){
					$('.icon-load').css('display', 'none');
				}
				
				//console.log(data);
				updateDocument(data);
			});
			
			return false;
			
		});
	}
	
	
	// перемешение на собщение по типу товара
	if ($('#formpay [type="submit"]')){
		$('#formpay [type="submit"]').click(function(){

			/**
			* мороженные товары
			* @type Number
			*/
			/*
			goodsSG = 0;
			$('.goods-sg').each(function(key, val){
				goodsSG = $(val).val()==0?goodsSG:$(val).val();
			});
			*/
			
			var preorder = parseInt($('.formpuy .preorder').val(), 10);
			var fruitVeg = parseInt($('.formpuy .fruitVeg').val(), 10);
			var frozen = parseInt($('.frozen').val(), 10);
			
			
			var cityId=0; 
			if (typeof(listCityLinkId)!='undefined'){
				cityId = Number(getByKey(listCityLinkId, $('[name=city]').val()));
			}
			
			// скрол при запрете выбора
			if (preorder && Number(getByKey(deliveryCouriersDataDo, cityId, getByKey(listCouriersNameKey, $('.formpuy [name=typeDelivery]:checked').val()), 'preorder'))==0){
				
				$('body,html').animate({scrollTop: $('.preorder-goods').offset().top-100}, 900);
				return false;
			}
			
			if (fruitVeg && Number(getByKey(deliveryCouriersDataDo, cityId, getByKey(listCouriersNameKey, $('.formpuy [name=typeDelivery]:checked').val()), 'fruit_veg'))==0){
				$('body,html').animate({scrollTop: $('.fruit-veg-goods').offset().top-100}, 900);
				return false;
			}
			
			if (frozen && Number(getByKey(deliveryCouriersDataDo, cityId, getByKey(listCouriersNameKey, $('.formpuy [name=typeDelivery]:checked').val()), 'sg'))==0){
				
				$('body,html').animate({scrollTop: $('.chilled-goods').offset().top-100}, 900);
				return false;
			}
			
			if (Number($('.subtotal').html().replace('€', '')) < sumMin){
				$('body,html').animate({scrollTop: $('.small-cost-basket').offset().top - 100}, 900);
				return false;
			}
			console.log('Обрабоотка');
			
			/*
			if (Number($('.subtotal').html().replace('€', '')) < 25){
				$('body,html').animate({scrollTop: $('.text-small-price-basket').offset().top - 100}, 900);
				return false;
			}
			*/

		});
	}
	
	if ($('input[type=text][required], input[type=tel][required]').length){
		$('input[type=text][required], input[type=tel][required]').on('blur', function(e){
			$(this).val($.trim($(this).val()));
		});
	}
	
	//var validate;
	if ($('form').length){
		
		validate = $('form').validate({
			focusInvalid: true
			, focusCleanup: true
			
			, submitHandler: function (form){
				
				setTimeout(function() {
					$('.styler').trigger('refresh');
					
					if ($('.error').length){
						// :first
						
						//console.log($('.error').filter(':visible:first').offset().top);
						if ($('.error').filter(':visible:first').offset()!=undefined){
							$('html, body').animate({
								scrollTop: $('.error').filter(':visible:first').offset().top - 100
							}, 1000);	
						}
						
					}
						
				}, 1);
				
				return true;
			}
			
			, invalidHandler: function(event, validator) {

				setTimeout(function() {
					//$('input, select').trigger('refresh');
					$('.styler').trigger('refresh');
					
					var errors = validator.numberOfInvalids();
					if (errors) {
						
						//console.log(event);
						
						//$("div.error span").html(message);
					}
					else{
						 //$("div.error span").hide();
					}
					
				}, 1);
			}
			
			, onfocusout: function (element, event) {
				
				if (element.tagName === "TEXTAREA" || (element.tagName === "INPUT" && element.type !== "password")) {
					element.value = $.trim(element.value);
				}
				if (!this.checkable(element) && (element.name in this.submitted || !this.optional(element))) {
					this.element(element);
				}
			}
		});
		
		setTimeout(function() {
			$('.styler').trigger('refresh');
		}, 100);
		
	}
	

	
	// promocode
	if ($('.promocode-button').length){
		$('.promocode-button').on('click', function(){
			$.getJSON('/ajax/carts/promocode/'+$('.formpuy  [name=promocode]').val(), function (data){
				var discount = data['discount']!=undefined?data['discount']:0;
				$('.formpuy  [name=promocode]').data('promocode',  discount);
				$('.formpuy [name=typeDelivery]:checked').click();
				if (discount==0){
					$('.promocode-block').hide();
					if ($('.formpuy  [name=promocode]').val().length>0){
						$('.promocode-block-error').show(200);	
					}
					else{
						$('.promocode-block-error').hide(200);	
					}
					
				}
				else{
					$('.promocode-block').show();
					$('.promocode-block-error').hide();
					var sum = parseFloat( $('.formpuy  .subtotal').text().replace(/[^\.\d]/, '') , 10);
					
					$('.promocode').html( '€'+(sum * (discount/100.0)).toFixed(2) );
					$('.promocode').data('promocode', discount);
				}
				
			});
			//$('.formpuy  [name=promocode]').data('promocode');
		})
	}
	
	if($("#instagram-feed5" ).length>0){
		new InstagramFeed({
			'username': 'greenmonday.cy',
			'container': document.getElementById("instagram-feed5"),
			'display_profile': false,
			'display_biography': false,
			'display_gallery': true,
			'callback': null,
			'styling': false,
			'items': 10,
		});
	}
	
	// отображение характеристики
	function openAllNavFilter() {
		$('.i-link').on('click', function(){
			
			var iTitle = $(this).data('title')
				, iSecondTitle = $(this).data('second-title');
			
			iThisTitle = $(this).find('span').html();
			if(iTitle == iThisTitle){
				$(this).find('span').html(iSecondTitle);
				$(this).parents('.i-block').find('.i-hidden').removeClass('i-hidden').addClass('i-visible')
			}else{
				$(this).find('span').html(iTitle);
				$(this).parents('.i-block').find('.i-visible').removeClass('i-visible').addClass('i-hidden')
			}
			
			return false;
		});

	}
	openAllNavFilter();

	
	// делаем кнопку для нажатия загрузки всего
	/**
	* догружаем элемент скролла
	* 
	*/
	var loadAllFunc = function (){
		
		if ($('.load-all').length==0){
			return false;
		}
		
		var $element = $('.load-all');
		let counter = 0;
		
		$(window).scroll(function() {
			
			var scroll = $(window).scrollTop() + $(window).height();
			//Если скролл до конца елемента
			//var offset = $element.offset().top + $element.height();
			//Если скролл до начала елемента
			var offset = $element.offset().top;
			
			if (scroll > offset && counter == 0) {
				
				var url = $('.load-all').data('url')
				
				//console.log('доползли '+url);
				
				// скрываем элемент
				$('.load-all').fadeIn(500, function (){
					// скрываем пагинацию
					filterLoad();
					// загрузка и обновление страницы если есть что то
					$.ajax({
						url:'/ajax/load-all'
						, data:{'url':url}
							
					})
					.done(function (data){
						
						let htmlBlock = $(data)
						
						htmlBlock.find('.js-minus').click(fMinus)
						htmlBlock.find('.js-plus').click(fPlus);
						//var $el = $('.load-all').replaceWith(data)
						var $el = $('.load-all').replaceWith(htmlBlock)
					
						loadAllFunc();
						
						filterLoad(0);
					})
					.fail(()=>{
						
						filterLoad(0);
					})
					;
					
					//$(this).remove();
				});
				
				counter = 1;
			}
		});
		
		$(window).trigger('scroll');
	};
	
	// догрузка контента списка товаров по клику
	if ($('.load-all-b a').length){
		
		$('.load-all-b a').click(function(e){
			e.preventDefault();
			
			//console.log(123321);
			
			
			$(this).parents('.block-load-all-b').fadeIn(1000, function (){
				
				var url = $(this).find('.load-all-b').data('url');
				//$(this).remove();
				
				$(this).replaceWith('<div class="load-all" data-url="'+url+'"></div>');
				
				loadAllFunc();
			});
			
			
		});
	}
	// если смартфон, то грузим новы страницы без кнопки пагинаци
	if ($(window).width() < 992 && $('.load-all-b a').parents('.block-load-all-b').find('.load-all-b').length != 0 ){ // 575
		
		var b=$('.load-all-b a').parents('.block-load-all-b');
		// url
		var url = b.find('.load-all-b').data('url');
		b.replaceWith('<div class="load-all" data-url="'+url+'"></div>');
		loadAllFunc();
	}
	
});
