window.jQuery(function ($) {
  // Global
  var conditions = {
    togglerCopyType: null,
    togglerDeviceType: {
      target_option: "device_type",
      target_class: "emojicon",
      prev_selected: ".apple",
    },
    togglerCategoryType: {
      target_option: "category",
      target_class: "section",
      prev_selected: "#all",
    },
  };

  new ClipboardJS(".ecs-list ._item", {
    text: function (trigger) {
      $(trigger).addClass("copied");

      setTimeout(function () {
        $(trigger).removeClass("copied");
      }, 1500);

      var textCopy = "";

      if (jQuery('input[name="click_to_copy"]:checked').val() == "shortcode") {
        textCopy = $(trigger).find("._tips .shortcode").text();
      } else {
        if ($(trigger).find(".windows.emojicon img").length) {
          textCopy = $(trigger).find(".windows.emojicon img").attr("alt");
        } else {
          textCopy = $(trigger).find(".windows.emojicon").html();
        }
      }
      console.log(textCopy);
      return textCopy;
    },
  });

  $("img.lazy").lazyload();

  $(window).scroll(() => {
    //获取当前滚动条的高度
    if ($(window).scrollTop() > 400) {
      $(".ecs_main-filter").css({
        position: "fixed",
        top: "20px",
        width: "237px",
      });
    } else {
      $(".ecs_main-filter").css({ position: "static" });
    }
  });

  $('input[type="radio"]').on("click", function () {
    var searchText = $(".ecs_hero-search .search-criteria").val();

    for (const key in conditions) {
      if (Object.hasOwnProperty.call(conditions, key)) {
        const obj = conditions[key];

        if (obj != null) {
          var id = `#${key}`;
          var option = obj.target_option;
          var div_class = obj.target_class;
          var targetOptionValue = $(id)
            .find(`input[name="${option}"]:checked`)
            .val();

          conditions[key].prev_selected = targetOptionValue;

          if (searchText != "") {
            processEmojiSearchText(searchText, "Radio");
          } else {
            $(`.${div_class}`).hide();
            $(`.${div_class}${targetOptionValue}`).show();
          }

          if (targetOptionValue == "#all") {
            $(`.${div_class}`).show();
          }
        }
      }
    }
  });

  function processEmojiSearchText(searchText = "", type = "") {
    var section = conditions.togglerCategoryType.prev_selected;
    var item = conditions.togglerDeviceType.prev_selected;

    if (searchText != "") {
      $(`._item`).hide();

      if (section == "#all") {
        $("div.section").show();
        $("div.section .emojicon").hide();
        $(`div.section ._item[data-alt-name*="${searchText}"]`)
          .show()
          .find(`${item}`)
          .show();
      } else {
        $("div.section .emojicon").hide();
        $(`${section} .emojicon`).hide();
        $(`${section} ._item`).hide();
        $(`${section} ._item[data-alt-name*="${searchText}"]`)
          .show()
          .find(`${item}`)
          .show();
      }
    } else {
      $(`._item`).show();

      for (const key in conditions) {
        if (Object.hasOwnProperty.call(conditions, key)) {
          const obj = conditions[key];

          if (obj != null) {
            var id = `#${key}`;
            var option = obj.target_option;
            var div_class = obj.target_class;
            var targetOptionValue = $(id)
              .find(`input[name="${option}"]:checked`)
              .val();

            $(id).find(`input[value="${obj.prev_selected}"]`).click();

            if (targetOptionValue == "#all") {
              $(`.${div_class}`).show();
            }
          }
        }
      }
    }
  }

  $(".ecs_hero-search .search-criteria").on("keyup", function (event) {
    var obj = $(this);
    var searchText = obj.val();

    processEmojiSearchText(searchText, "Type");
  });

  $(".ecs_hero-search").submit(function () {
    return false;
  });

  // TODO: to optimize
  $(".ecs_acc ._panel-head a").click(function () {
    if ($(this).parents("._panel").hasClass("active")) {
      $(this).parents("._panel").removeClass("active");

      return false;
    }

    $(this).parents(".ecs_acc").find(" ._panel").removeClass("active");
    $(this).parents("._panel").addClass("active");

    return false;
  });

  $(".ecs_hero-tips ._act a").click(function () {
    var target = $(this).attr("href");

    $("html,body").animate(
      {
        scrollTop: $(target).offset().top,
      },
      1000
    );

    return false;
  });

  $(".ecs_main-filter ._group ._label").click(function () {
    $(this).parent().toggleClass("_hide");
  });

  $(".ecs-list ._item").hover(function () {
    if ($(this).find("._tips").length <= 0) {
      $(this).append(
        '<div class="_tips">' + $(this).attr("data-title") + "</div>"
      );
    }

    if ($(this).offset().left > $(window).width() - 250)
      $(this).addClass("_r_tips");
    else $(this).removeClass("_r_tips");
  });
});
