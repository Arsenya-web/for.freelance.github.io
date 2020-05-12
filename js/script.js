function burgerMenu(selector) {
	let menu = $(selector);
	let button = menu.find('.burger-menu__button');
	let links = menu.find('.burger-menu__list');
	let overlay = menu.find('.burger-menu__overlay');

	button.on('click', (e) => {
		e.preventDefault();
		toggleMenu();
	});

	links.on('click', () => toggleMenu());
	overlay.on('click', () => toggleMenu());

	function toggleMenu() {
		menu.toggleClass('active');

		if (menu.hasClass('active')) {
			$('body').css('overflow', 'hidden')
		} else {
			$('body').css('overflow', 'visible')
		}
	}
}

burgerMenu('.burger-menu');

// Slider

'use strict';
var multiItemSlider = (function () {
  return function (selector, config) {
  var
    _mainElement = document.querySelector(selector), 
    _sliderWrapper = _mainElement.querySelector('.slider__wrapper'), 
    _sliderItems = _mainElement.querySelectorAll('.slider__item'), 
    _sliderControls = _mainElement.querySelectorAll('.slider__control'), 
    _sliderControlLeft = _mainElement.querySelector('.slider__control_left'), 
    _sliderControlRight = _mainElement.querySelector('.slider__control_right'), 
    _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width), 
    _itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width),    
    _positionLeftItem = 0,
    _transform = 0,
    _step = _itemWidth / _wrapperWidth * 100,
    _items = [];

  
  _sliderItems.forEach(function (item, index) {
    _items.push({ item: item, position: index, transform: 0 });
  });

  var position = {
    getItemMin: function () {
      var indexItem = 0;
      _items.forEach(function (item, index) {
        if (item.position < _items[indexItem].position) {
          indexItem = index;
        }
      });
      return indexItem;
    },
    getItemMax: function () {
      var indexItem = 0;
      _items.forEach(function (item, index) {
        if (item.position > _items[indexItem].position) {
          indexItem = index;
        }
      });
      return indexItem;
    },
    getMin: function () {
      return _items[position.getItemMin()].position;
    },
    getMax: function () {
      return _items[position.getItemMax()].position;
    }
  }

  var _transformItem = function (direction) {
    var nextItem;
    if (direction === 'right') {
      _positionLeftItem++;
      if ((_positionLeftItem + _wrapperWidth / _itemWidth - 1) > position.getMax()) {
        nextItem = position.getItemMin();
        _items[nextItem].position = position.getMax() + 1;
        _items[nextItem].transform += _items.length * 100;
        _items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
      }
      _transform -= _step;
    }
    if (direction === 'left') {
      _positionLeftItem--;
      if (_positionLeftItem < position.getMin()) {
        nextItem = position.getItemMax();
        _items[nextItem].position = position.getMin() - 1;
        _items[nextItem].transform -= _items.length * 100;
        _items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
      }
      _transform += _step;
    }
    _sliderWrapper.style.transform = 'translateX(' + _transform + '%)';
  }


  var _controlClick = function (e) {
    if (e.target.classList.contains('slider__control')) {
      e.preventDefault();
      var direction = e.target.classList.contains('slider__control_right') ? 'right' : 'left';
      _transformItem(direction);
    }
  };

  var _setUpListeners = function () {
    _sliderControls.forEach(function (item) {
      item.addEventListener('click', _controlClick);
    });
  }

  
  _setUpListeners();

  return {
    right: function () {
      _transformItem('right');
    },
    left: function () {
      _transformItem('left');
    }
  }

  }
}());

var slider = multiItemSlider('.slider')


// SLIDER BREND

$(document).ready(function () {

var timeList = 300;
var TimeView = 5000;
var RadioBut = true;

$('.slide').hide().eq(0).show();
var slideNum = 0;
var slideTime;
slideCount = $("#slider-brend .slide").length;

var animSlide = function(arrow){
  clearTimeout(slideTime); 
      
  function slideDirectionHide(slideFloatNum, directTo){
          $('.slide').eq(slideFloatNum).fadeOut(timeList); 
  }

  function slideDirectionShow(slideFloatNum, directTo, pause){
          $('.slide').eq(slideFloatNum).fadeIn(timeList, function() {
              if(pause == true) { rotator(); }
          }); 
  }
  
  var old_slideNum = slideNum;
      
  if(arrow == "next"){
          slideDirectionHide(slideNum, "left");
          if(slideNum == (slideCount-1)){slideNum=0;}
          else{slideNum++}
          slideDirectionShow(slideNum, "right", true);
          }
  else if(arrow == "prew")
  {
          slideDirectionHide(slideNum, "right");
          if(slideNum == 0){slideNum=slideCount-1;}
          else{slideNum-=1}
          slideDirectionShow(slideNum, "left", true);
  }else{
          if(arrow !== old_slideNum)
          { 
              if(arrow > old_slideNum)
              {
                  slideDirectionHide(slideNum, "left");
                  slideNum = arrow;
                  slideDirectionShow(slideNum, "right", true);
              }else if(arrow < old_slideNum) {
                  slideDirectionHide(slideNum, "right");
                  slideNum = arrow;
                  slideDirectionShow(slideNum, "left", true);
              }

          }
  }

  $(".ctrl-select.active").removeClass("active");
  $('.ctrl-select').eq(slideNum).addClass('active');
}


  if(RadioBut){
  var linkArrow = $()
  }
      var addSpan ='';
      $('.slide').each(function(index) {
             addSpan += '<span class = "ctrl-select">' + index + '</span>';
         });
      $('<div class ="Radio-But">' + addSpan +'</div>').appendTo('#slider-wrap');
      $(".ctrl-select:first").addClass("active");
      $('.ctrl-select').click(function(){
      var goToNum = parseFloat($(this).text());
      animSlide(goToNum);
      });
      var pause = false;
      var rotator = function(){
             if(!pause){slideTime = setTimeout(function(){animSlide('next')}, TimeView);}
             }
      $('#slider-wrap').hover(
         function(){clearTimeout(slideTime); pause = true;},
         function(){pause = false; rotator();
         });
      
  var clicking = false;
  var prevX;
  $('.slide').mousedown(function(e){
      clicking = true;
      prevX = e.clientX;
  });

  $('.slide').mouseup(function() {
   clicking = false;
  });

  $(document).mouseup(function(){
      clicking = false;
  });

  $('.slide').mousemove(function(e){
      if(clicking == true)
       {
           if(e.clientX < prevX) { animSlide("next"); clearTimeout(slideTime); }
           if(e.clientX > prevX) { animSlide("prew"); clearTimeout(slideTime); }
         clicking = false;
      }
  });
  $('.slide').hover().css('cursor', 'pointer');
  rotator();  

});

AOS.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
  initClassName: 'aos-init', // class applied after initialization
  animatedClassName: 'aos-animate', // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
  

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 500, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});