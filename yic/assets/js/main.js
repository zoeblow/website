(function ($) {
  "use strict";

  $(window).on("load", function () {
    /* Page Loader active
    ========================================================*/
    $("#preloader").fadeOut();

    // Sticky Nav
    $(window).on("scroll", function () {
      if ($(window).scrollTop() > 200) {
        $(".scrolling-navbar").addClass("top-nav-collapse");
      } else {
        $(".scrolling-navbar").removeClass("top-nav-collapse");
      }
    });

    const now = new Date();
    let BabyYearOld = now.getFullYear();
    const targetDate = new Date(BabyYearOld, 2, 2, 8, 0, 0, 0); // 月份从0开始，所以2代表3月

    // 如果今天的日期已经过了3月2日8:00，我们将年份加1
    if (now > targetDate) {
      BabyYearOld += 1;
    }

    $("#getYear").text(BabyYearOld - 2022);

    const years = new Date().getFullYear() + 1;

    /* ==========================================================================
    countdown timer
    ========================================================================== */
    jQuery("#clock").countdown(`${BabyYearOld}/3/2 8:54:00`, function (event) {
      var $this = jQuery(this).html(
        event.strftime(
          "" +
            '<div class="time-entry days"><span>%-D</span> Days</div> ' +
            '<div class="time-entry hours"><span>%H</span> Hours</div> ' +
            '<div class="time-entry minutes"><span>%M</span> Minutes</div> ' +
            '<div class="time-entry seconds"><span>%S</span> Seconds</div> '
        )
      );
    });

    // one page navigation
    $(".onepage-nev").onePageNav({
      currentClass: "active",
    });

    /* Back Top Link active
    ========================================================*/
    var offset = 200;
    var duration = 500;
    $(window).scroll(function () {
      if ($(this).scrollTop() > offset) {
        $(".back-to-top").fadeIn(400);
      } else {
        $(".back-to-top").fadeOut(400);
      }
    });

    $(".back-to-top").on("click", function (event) {
      event.preventDefault();
      $("html, body").animate(
        {
          scrollTop: 0,
        },
        600
      );
      return false;
    });
  });
})(jQuery);
