let imgSelected = false;
let imgSelectId = -1;
let prevMouseX = -1;
let prevMouseY = -1;

let mobileMode = isMobile();

window.onload = function() {

  let stickers = $('.sticker').not('#content-kellyli');
  stickers.each( function (i) {
    $(this).css(
      {
        'top': Math.floor(Math.random() * (window.innerHeight-200)).toString() + 'px',
        'left': Math.floor(Math.random() * (window.innerWidth-200)).toString() + 'px',
        'z-index': i
      });
  });

  // Set up event listeners for sticker class elements
  if(!mobileMode) {
    let stickers = $('.sticker');
    stickers.each(function(index) {
      $(this).bind( {
        mousedown: function (e) {
          e.preventDefault();
          imgSelected = true;
          imgSelectId = index;
          prevMouseX = e.clientX - this.offsetLeft;
          prevMouseY = e.clientY - this.offsetTop;

          // Sort depth of images
          let zz = $(this).css('z-index');
          if(imgSelectId > 0) {
            $('.sticker').each( function(index) {
              if(index === imgSelectId) {
                $(this).css('z-index', '7');
              } else if ( $(this).css('z-index') > zz ) {
                let z = $(this).css('z-index')-1;
                $(this).css('z-index', z.toString());
              }
            });
          }
        },
        mousemove: function(e) {
          e.preventDefault();
          if(imgSelected && imgSelectId === index) {
            let currMouseX = e.clientX;
            let currMouseY = e.clientY;
            let transformX = currMouseX - prevMouseX;
            let transformY = currMouseY - prevMouseY;
            $(this).css({
              'left': transformX,
              'top' : transformY
            });
          }
        },
        mouseup: function(e) {
          e.preventDefault();
          imgSelected = false;
          imgSelectId = -1;
        },
        mouseleave: function(e) {
          e.preventDefault();
          imgSelected = false;
          imgSelectId = -1;
        }
      });
    });
  } else {

    let stickers = document.getElementsByClassName('sticker');
    for(let i = 0; i < stickers.length; i++) {
      let sticker = stickers[i];

      // touchstart
      sticker.addEventListener('touchstart', (event) => {
        event.preventDefault();
        let target = event.target;
        imgSelected = true;
        imgSelectId = target.id;
        let touch = event.targetTouches[0];
        prevMouseX = touch.clientX - target.offsetLeft;
        prevMouseY = touch.clientY - target.offsetTop;

        // Sort depth of images
        if(imgSelectId != 'content-kellyli') {
          let stickerSelectZ = target.style.zIndex;
          let selectZ = $('#' + imgSelectId).css('z-index');
          let selectNum = Number(imgSelectId.substring(imgSelectId.length-1, imgSelectId.length));
          $('.sticker').each( function(index) {
            if(index === selectNum) {
              $(this).css('z-index', '7');
            } else if ( $(this).css('z-index') > stickerSelectZ ) {
              let z = $(this).css('z-index')-1;
              $(this).css('z-index', z.toString());
            }
          });
        }
      }, false);

      // touchmove
      sticker.addEventListener('touchmove', (event) => {
        event.preventDefault();
        if(imgSelected && imgSelectId === event.target.id) {
          let touch = event.targetTouches[0];
          let currMouseX = touch.clientX;
          let currMouseY = touch.clientY;
          let transformX = currMouseX - prevMouseX;
          let transformY = currMouseY - prevMouseY;
          $('#'+imgSelectId).css({
            'left': transformX,
            'top' : transformY
          });
        }
      }, false);

      // touchend
      sticker.addEventListener('touchend', (event) => {
        event.preventDefault();
        imgSelected = false;
        imgSelectId = -1;
      }, false);
    }
  }

  // Set up event listeners for menu buttons
  let menuitems = $('.menu-item');
  menuitems.each( function(i) {
    $(this).click( () => {
      $('.active').removeClass('active');
      $(this).addClass('active');
      let elem = $(this).attr('id').substring(6);
      let elemclass = '#content-' + elem;
      $(elemclass).addClass('active');
    });
  });
}

document.addEventListener("DOMContentLoaded", function() {
  let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
  let active = false;

  const lazyLoad = function() {
    console.log('triggered');
    if (active === false) {
      active = true;

      setTimeout(function() {
        lazyImages.forEach(function(lazyImage) {
          if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0)) {
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.classList.remove("lazy");

            lazyImages = lazyImages.filter(function(image) {
              return image !== lazyImage;
            });

            if (lazyImages.length === 0) {
              document.getElementsByClassName("content")[0].removeEventListener("scroll", lazyLoad);
              window.removeEventListener("resize", lazyLoad);
              window.removeEventListener("orientationchange", lazyLoad);
            }
          }
        });

        active = false;
      }, 200);
    }
  };

  document.getElementsByClassName("content")[0].addEventListener("scroll", lazyLoad);
  window.addEventListener("resize", lazyLoad);
  window.addEventListener("orientationchange", lazyLoad);
});

function isMobile() {
  let md = new MobileDetect(window.navigator.userAgent);
  if(md.mobile()){
    return true;
  } else {
    return false;
  }
}
