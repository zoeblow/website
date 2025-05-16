var FX = (function (FX, $) {
  $(() => {
    FX.General.init(); // For super general or super short scripts
  });

  $(function () {
    FX.BackToTop.init();
  });

  $(() => {
    FX.StickyHeader.init();
  });

  FX.BackToTop = {
    $btn: null,

    init() {
      this.$btn = $(".back-to-top");

      if (this.$btn.length) {
        this.bind();
      }
    },

    bind() {
      $(window).on("scroll load", this.maybeShowButton.bind(this));
      this.$btn.on("click", this.scrollToTop);
    },

    maybeShowButton() {
      if ($(window).scrollTop() > 100) {
        this.$btn.fadeIn();
      } else {
        this.$btn.fadeOut();
      }
    },

    scrollToTop() {
      $(window).scrollTop(0);
    },
  };

  FX.General = {
    init() {
      this.bind();
    },

    bind() {
      // Input on focus remove placeholder
      $("input,textarea").focus(() => {
        $(this).removeAttr("placeholder");
      });

      // nav search toggle
      // $('.js-search-toggle').on('click', () => {
      // 	$('.desktop-menu__phone, .js-search-toggle, .desktop-menu__search').toggleClass('js-search-active');
      //     $('.desktop-menu__search input[name="s"]').focus();
      // });

      // nav search toggle
      $(".js-search-toggle").on("click", () => {
        $(".js-search-toggle").toggleClass("js-search-active");
        $("html").toggleClass("show-search-bar");
        $('.search-functionality-wrapper input[name="s"]').focus();
      });

      // nav search toggle close
      $(".close-search-link").on("click", () => {
        $("html").removeClass("show-search-bar");
      });

      // Sticky Sidebar

      var navOffset = 190;
      //Sticky Sidebar for the Blog Posts
      if ($(".two-sidebar-template").length) {
        $(".sticky-sidebar").theiaStickySidebar({
          additionalMarginTop: 120,
          updateSidebarHeight: true,
          minWidth: 1200,
        });
      } else {
        if ($(".post-sticky-sidebar").length) {
          $(".post-sticky-sidebar").theiaStickySidebar({
            additionalMarginTop: navOffset,
            updateSidebarHeight: true,
            disableOnResponsiveLayouts: false,
          });

          //Sticky Sidebar for the rest of pages
        } else {
          $(".sticky-sidebar").theiaStickySidebar({
            additionalMarginTop: navOffset,
          });
        }
      }

      // bind change event to select
      $("#category-select").on("change", function () {
        var url = $(this).val(); // get selected value
        if (url) {
          // require a URL
          window.location = url; // redirect
        }
        return false;
      });
    },
  };

  FX.StickyHeader = {
    init: function () {
      this.windowHeight = $(window).height();
      this.bind();
    },

    bind: function (e) {
      $(window).on("scroll", this.scroll);
      $(window).on("resize", this.updateWindowHeight);
    },

    scroll: function () {
      var fromTopPx = 200;
      var scrolledFromtop = $(window).scrollTop();

      // if (scrolledFromtop > 150) {
      // 	$('.page-header').addClass('hideheader');
      // } else {
      // 	$('.page-header').removeClass('hideheader');
      // }
      // if (scrolledFromtop > fromTopPx) {
      // 	$('.page-header').addClass('js-scrolled');
      // 	$('.mastheads').addClass('scrolled');
      // 	$('.masthead-inner').addClass('scrolled');
      // } else {
      // 	$('.page-header').removeClass('js-scrolled');
      // 	$('.masthead').removeClass('scrolled');
      // 	$('.masthead-inner').removeClass('scrolled');
      // }
      if (scrolledFromtop > 150) {
        $(".page-header").addClass("hideheader");
        $(".page-content").addClass("scrolled");
      } else {
        $(".page-header").removeClass("hideheader");
        $(".page-content").removeClass("scrolled");
      }
      if (scrolledFromtop > fromTopPx) {
        $(".page-header").addClass("js-scrolled");
      } else {
        $(".page-header").removeClass("js-scrolled");
      }
    },
  };

  return FX;
})(FX || {}, jQuery);
