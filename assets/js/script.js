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
          imgSelected = false;
          imgSelectId = -1;
        },
        mouseleave: function(e) {
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
        let target = event.target;
        imgSelected = true;
        imgSelectId = target.id.substring(target.id.length-1, target.id.length)-1;
        let touch = event.targetTouches[0];
        prevMouseX = touch.clientX - target.offsetLeft;
        prevMouseY = touch.clientY - target.offsetTop;

        // Sort depth of images
        if(imgSelectId > 0) {
          let stickerSelectZ = target.style.zIndex;
          let selectZ = $('#sticker-' + (imgSelectId+1).toString()).css('z-index');
          $('.sticker').each( function(index) {
            if(index === imgSelectId) {
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
        if(imgSelected && imgSelectId === event.target.id.substring(event.target.id.length-1, event.target.id.length)-1) {
          let touch = event.targetTouches[0];
          let currMouseX = touch.clientX;
          let currMouseY = touch.clientY;
          let transformX = currMouseX - prevMouseX;
          let transformY = currMouseY - prevMouseY;
          $('#sticker-' + (imgSelectId+1).toString()).css({
            'left': transformX,
            'top' : transformY
          });
        }
        console.log('touch move');
      }, false);

      // touchend
      sticker.addEventListener('touchend', (event) => {
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

function isMobile() {
  let md = new MobileDetect(window.navigator.userAgent);
  if(md.mobile()){
    return true;
  } else {
    return false;
  }
}
