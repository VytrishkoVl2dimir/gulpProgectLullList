// $(document).ready(function(){ }) Альтернативний запис -ТРЕБА ПЕРЕВІРИТИ
$(function () {
	$('.header__btn').on('click', function () {
		$('.rightside-menu').removeClass('rightside-menu--close');
	});
	$('.rightside-menu__close').on('click', function () {
		$('.rightside-menu').addClass('rightside-menu--close');
	});


	$('.header__btn-menu').on('click', function () {
		$('.menu').toggleClass('menu--open');
	});

	if ($(window).width() < 651) {
		$('.works-path__item--measuring').appendTo($('.works-path__items-box'));
	};


	$('.top__slider').slick({
		dots: true,
		arrows: false,
		fade: true,
		// autoplay: true
	});

	$('.contact-slider').slick({
		slidesToShow: 10,
		slidesToScroll: 10,
		dots: true,
		arrows: false
	});

	$('.article-slider__box').slick({
		prevArrow: '<button type="button" class="article-slider__arrow article-slider__arrow-left"><img src="images/arrow-slider-left.svg" alt="arrow-slider-left"></button>',
		nextArrow: '<button type="button" class="article-slider__arrow article-slider__arrow-right"><img src="images/arrow-slider-right.svg" alt="arrow-slider-right"></button>'
	});

	var mixer = mixitup('.galery__inner', {
		load: {
			filter: '.living'
		}
	});
})