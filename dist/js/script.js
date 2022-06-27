const slider = tns({
  container: '.carousel_inner',
  items: 1,
  slideBy: 'page',
  autoplay: false,
  controls: false,
  nav: false
});

document.querySelector('.prev').addEventListener('click', function () {
  slider.goTo('prev');
});

document.querySelector('.next').addEventListener('click', function () {
  slider.goTo('next');
});

$(document).ready(function() {
  $('ul.catalog_tabs').on('click', 'li:not(.catalog_tab_active)', function() {
    $(this)
      .addClass('catalog_tab_active').siblings().removeClass('catalog_tab_active')
      .closest('div.container').find('div.catalog_content').removeClass('catalog_content_active').eq($(this).index()).addClass('catalog_content_active');
  });  

  function toggleSlide(item) {
    $(item).each(function(i) {
      $(this).on('click', function(e) {
          e.preventDefault();
          $('.catalog-item_content').eq(i).toggleClass('catalog-item_content_active');
          $('.catalog-item_list').eq(i).toggleClass('catalog-item_list_active');
      });
    });
  }

  toggleSlide('.catalog-item_link');
  toggleSlide('.catalog-item_back');

  // Modal

  $('[data-modal=consultation]').on('click', function(){
      $('.overlay, #consultation').fadeIn('slow'); 
  });

  $('.modal_close').on('click', function() {
      $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
  });

  $('.button_mini').each(function(i) {
      $(this).on('click', function() {
          $('#order .modal_descr').text($('.catalog-item_subtitle').eq(i).text());
          $('.overlay, #order').fadeIn('slow'); 
      });
  });

  function valideForms(form) {
      $(form).validate({
        rules: {
            name: {
              required: true,
              minlength: 2
            },
            phone: "required",
            email: {
                required: true,
                email: true
            } 
            
        },
        messages: {
          name: {       
              required: "We need your email address to contact you",
              minlength: jQuery.validator.format("At least {0} characters required!")
          },
          phone: "Please specify your phone",
          email: {
            required: "We need your email address to contact you",
            email: "Your email address must be in the format of name@domain.com"
          }
        }
      });
  }

  valideForms('#consultation_form');
  valideForms('#consultation form');
  valideForms('#order form');

  $('input[name=phone]').mask("+7 (999) 999-99-99");

  $('form').submit(function(e) {
    e.preventDefault();

    if(!$(this).valid()) {
      return;
    }
    
    $.ajax({
        type: "POST",
        url: 'mailer/smart.php',
        data: $(this).serialize()
    }).done(function() {
        $(this).find('input').val('');
        $('#consultation, #order').fadeOut();
        $('.overlay, #thanks').fadeIn();

        $('form').trigger('reset');
    });
    return false;
  });

  // Smooth scroll

  $(window).scroll(function() {
        if($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();    
        } else {
            $('.pageup').fadeOut();
        }
  });

  $("a[href='#up']").click(function() {
        const _href = $(this).attr("href");
        $('html, body').animate({scrollTop: $(_href).offset().top+"px"});
        return false; 
  });

  new WOW().init();
});

