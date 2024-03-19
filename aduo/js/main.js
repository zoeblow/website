$(window).load(function () {
  $(".preloader").fadeOut("slow");
});

var hostname = window.location.hostname;
var protocol = window.location.protocol;
//非https 强制跳转到https
var ignorePath =
  ["localhost", "127.0.0.1", "172.30.5.37"].indexOf(hostname) == -1;
// console.log(ignorePath)
if (ignorePath && protocol == "http:") {
  window.location.href = "https://" + hostname;
}

/* =Main INIT Function
-------------------------------------------------------------- */
function initializeSite() {
  "use strict";

  //OUTLINE DIMENSION AND CENTER
  (function () {
    function centerInit() {
      var sphereContent = $(".sphere"),
        sphereHeight = sphereContent.height(),
        parentHeight = $(window).height(),
        topMargin = (parentHeight - sphereHeight) / 2;

      sphereContent.css({
        "margin-top": topMargin + "px",
      });

      var heroContent = $(".hero"),
        heroHeight = heroContent.height(),
        heroTopMargin = (parentHeight - heroHeight) / 2;

      heroContent.css({
        "margin-top": heroTopMargin + "px",
      });
    }

    $(document).ready(centerInit);
    $(window).resize(centerInit);
  })();

  // Init effect
  $("#scene").parallax();
}
/* END ------------------------------------------------------- */

/* =Document Ready Trigger
-------------------------------------------------------------- */
$(window).load(function () {
  initializeSite();
  (function () {
    setTimeout(function () {
      window.scrollTo(0, 0);
    }, 0);
  })();
});
/* END ------------------------------------------------------- */

const now = new Date();
let BabyYearOld = now.getFullYear();
const targetDate = new Date(BabyYearOld, 10, 6, 11, 0, 0, 0); // 月份从0开始，所以2代表3月

// 如果今天的日期已经过了3月2日8:00，我们将年份加1
if (now > targetDate) {
  BabyYearOld += 1;
}

$("#getYear").text(BabyYearOld - 2017);

$("#countdown").countdown({
  date: "November 06, " + BabyYearOld + " 11:00:00",
  render: function (data) {
    var el = $(this.el);
    el.empty()
      //.append("<div>" + this.leadingZeros(data.years, 4) + "<span>years</span></div>")
      .append(
        "<div>" + this.leadingZeros(data.days, 2) + " <span>days</span></div>"
      )
      .append(
        "<div>" + this.leadingZeros(data.hours, 2) + " <span>hrs</span></div>"
      )
      .append(
        "<div>" + this.leadingZeros(data.min, 2) + " <span>min</span></div>"
      )
      .append(
        "<div>" + this.leadingZeros(data.sec, 2) + " <span>sec</span></div>"
      );
  },
});
