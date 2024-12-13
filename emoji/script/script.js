/*
 * Emoji cheat sheet
 */
const FX = {};
FX.version = "0.1.0";
FX.BackToTop = {
  $btn: null,

  init() {
    this.$btn = $(".back-to-top");
    this.$category = $("#category");

    if (this.$btn.length) {
      this.bind();
    }
  },

  bind() {
    $(window).on("scroll load", this.maybeShowButton.bind(this));
    this.$btn.on("click", this.scrollToTop);
  },

  maybeShowButton() {
    if ($(window).scrollTop() > 500) {
      this.$btn.fadeIn();
      this.$category.css({ position: "fixed", top: "20px" });
    } else {
      this.$btn.fadeOut();
      this.$category.css({ position: "static" });
    }
  },

  scrollToTop() {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      "300"
    );
  },
};

$(document).ready(function () {
  try {
    if (document.flashtest && document.flashtest.PercentLoaded() >= 0) {
      // Flash was able to load the test swf and is working
      initZeroClipboard();
    } else {
      initJsClipboard();
    }
  } catch (e) {
    initJsClipboard();
  }

  function initZeroClipboard() {
    ZeroClipboard.config({
      forceHandCursor: true,
      hoverClass: "hover",
    });
    var clipboardclient = new ZeroClipboard();

    clipboardclient.on("ready", function (readyEvent) {
      $("ul").on("mouseover", "div", function () {
        try {
          clipboardclient.clip(this);
        } catch (e) {}
      });

      clipboardclient.on("copy", function (evt) {
        var clipboard = evt.clipboardData;
        clipboard.setData("text/plain", $(evt.target).text().trim());
      });

      clipboardclient.on("aftercopy", function (evt) {
        var highlightedElement = evt.target;
        $(highlightedElement).addClass("copied");
        setTimeout(function () {
          $(highlightedElement).removeClass("copied");
        }, 800);
      });
    });

    clipboardclient.on("error", function (event) {
      ZeroClipboard.destroy();
      initJsClipboard();
    });
  }

  var jsClipboardSupported = true; // we can't check if this is true unless the user tries once
  function initJsClipboard() {
    $("ul").on("click", "div", function () {
      try {
        if (jsClipboardSupported) {
          var selection = getSelection();
          selection.removeAllRanges();

          var range = document.createRange();
          range.selectNodeContents(this);
          selection.addRange(range);

          var highlightedElement = $(this);
          if (document.execCommand("copy") == true) {
            // this will silently fail on IE11 when access is denied
            $(highlightedElement).addClass("copied");
            setTimeout(function () {
              $(highlightedElement).removeClass("copied");
            }, 800);

            // console.log(highlightedElement, "highlightedElement");
          } else {
            // copying was not successfull or denied by the user or browser preferences
            // see Firefox about:config "dom.allow_cut_copy"
            $(highlightedElement).addClass("clipboardError");
            setTimeout(function () {
              $(highlightedElement).removeClass("clipboardError");
            }, 6000);

            jsClipboardSupported = false;
          }
          selection.removeAllRanges();
        }
      } catch (e) {}
    });
  }

  function isElementMatching(element, needle) {
    var alternative = element.attr("data-alternative-name");
    return (
      $(element).text().toLowerCase().indexOf(needle) >= 0 ||
      (alternative != null && alternative.toLowerCase().indexOf(needle) >= 0)
    );
  }

  function highlightElements(needle) {
    if (needle.length == 0) {
      highlightAll();
      return;
    }
    needle = needle.toLowerCase();
    $(".emojis li").each(function (index, el) {
      if (isElementMatching($(".name", el), needle)) {
        $(el).show();
      } else {
        $(el).hide();
      }
    });
  }

  function highlightAll() {
    $(".emojis li").show();
  }

  $("#header .search").keyup(function (e) {
    if (e.keyCode == 27) {
      // ESC
      $(this).val("").blur();
      highlightAll();
    }
  });
  $("#header .search").on("change paste keyup", function () {
    highlightElements($("#header .search").val());
  });
  $("#header .search").focus();

  FX.BackToTop.init();
  console.log(FX, "FX");

  console.log($("img.lazy").length, "images");
  $("img.lazy").lazyload();
});
