jQuery(document).ready(function(){

	// toogle-mnu
	$(".toggle-mnu").click(function() {
		$(this).toggleClass("on");
		$(".top-mnu").slideToggle();
		$("body").toggleClass("ovh");
		return false;
	});
	$(".hidden-mnu li a").click(function(){
		$(".toggle-mnu").click();
	});
	// end toogle-mnu
	// pageScroll2id.min.js
	$(".top-line li a, .top").mPageScroll2id({
		ofset : 0,
		scrollSpeed : 500
	});
	// end pageScroll2id.min.js
	//popup jquery.magnific-popup.min.js
	$(".open-popup").magnificPopup({
		mainClass: 'my-mfp-zoom-in',
		removalDelay: 300,
		type: 'inline',
	});
	//end popup jquery.magnific-popup.min.js
	//Галерея jquery.magnific-popup.min.js
	$('.mfp-gallery').magnificPopup({
		mainClass: 'mfp-zoom-in',
		type: 'image',
		tLoading: '',
		gallery:{
			enabled:true,
		},
		removalDelay: 300,
		callbacks: {
			beforeChange: function() {
				this.items[0].src = this.items[0].src + '?=' + Math.random(); 
			},
			open: function() {
				$.magnificPopup.instance.next = function() {
					var self = this;
					self.wrap.removeClass('mfp-image-loaded');
					setTimeout(function() { $.magnificPopup.proto.next.call(self); }, 120);
				}
				$.magnificPopup.instance.prev = function() {
					var self = this;
					self.wrap.removeClass('mfp-image-loaded');
					setTimeout(function() { $.magnificPopup.proto.prev.call(self); }, 120);
				}
			},
			imageLoadComplete: function() { 
				var self = this;
				setTimeout(function() { self.wrap.addClass('mfp-image-loaded'); }, 16);
			}
		}
	});
	// Форма отправки
	$("#form-header,  #form-popup-gallery,  #form-popup-my-boat, #form-popup-your-boat, #form-sign-us").submit(function() {
		var th = $(this);
		th.children().hide();
		th.children('button.mfp-close').show();
		th.append('<p class="otpravka-zayavki">Отправка данных...</p>');
		$.ajax({
			type: "POST",
			url: "mail.php",
			data: th.serialize()
		}).done(function() {
			$(this).find("input").val("");
			setTimeout(function() {
				th.children().hide();
				th.children('button.mfp-close').show();
				th.append('<p class="zayavka-otpravlena">Спасибо! Ваша заявка успешно отправлена!</p>');
			}, 500);
		});
		return false;
	});
	// Конец Форма отправки	 
	//Табы
	$(".tab-item").not(":first").hide();
	$(".tab-wrap").click(function() {
		$(".tab-wrap").removeClass("tab-active").eq($(this).index()).addClass("tab-active");
		$(".tab-item").hide().eq($(this).index()).fadeIn(1000);
	}).eq(0).addClass("tab-active");
	
}); // end ready