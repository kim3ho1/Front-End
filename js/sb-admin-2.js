(function($) {
  "use strict"; // Start of use strict

  // Toggle the side navigation
  $("#sidebarToggle, #sidebarToggleTop").on('click', function(e) {
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
    if ($(".sidebar").hasClass("toggled")) {
      $('.sidebar .collapse').collapse('hide');
    };
  });

  // Close any open menu accordions when window is resized below 768px
  $(window).resize(function() {
    if ($(window).width() < 768) {
      $('.sidebar .collapse').collapse('hide');
    };
    
    // Toggle the side navigation when window is resized below 480px
    if ($(window).width() < 480 && !$(".sidebar").hasClass("toggled")) {
      $("body").addClass("sidebar-toggled");
      $(".sidebar").addClass("toggled");
      $('.sidebar .collapse').collapse('hide');
    };
  });

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function(e) {
    if ($(window).width() > 768) {
      var e0 = e.originalEvent,
        delta = e0.wheelDelta || -e0.detail;
      this.scrollTop += (delta < 0 ? 1 : -1) * 30;
      e.preventDefault();
    }
  });

  // Scroll to top button appear
  $(document).on('scroll', function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Smooth scrolling using jQuery easing
  $(document).on('click', 'a.scroll-to-top', function(e) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top)
    }, 1000, 'easeInOutExpo');
    e.preventDefault();
  });

})(jQuery);// End of use strict

// Document ready function
$(document).ready(function() {
  // Update icon progress
  function updateIconProgress(percentage) {
    var progressIcon = document.getElementById('progressIcon');
    var iconHeight = progressIcon.offsetHeight; // 아이콘의 전체 높이
    var clipHeight = iconHeight * (1 - (percentage / 100)); // 클리핑 높이 계산

    // 클리핑 영역 업데이트
    progressIcon.style.clip = `rect(${clipHeight}px, auto, auto, 0)`;
  }

  // 평균 단백질 섭취량 계산 및 업데이트
  function updateAverageProteinIntake() {
    var data = [40, 80, 95, 35, 55, 72, 48]; // 더미 데이터
    var sum = data.reduce(function(a, b) { return a + b; }, 0);
    var average = sum / data.length;
    $('#averageProteinIntake').text(average.toFixed(1) + 'g');
  }

  updateIconProgress(70); // 아이콘 프로그레스 업데이트
  updateAverageProteinIntake(); // 평균 단백질 섭취량 업데이트
});

// End of file
