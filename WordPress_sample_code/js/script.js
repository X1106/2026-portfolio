//ローディング
(function ($) {
  function end_loader() {
    $(".loader").fadeOut(800);
  }
  $(function () {
    setTimeout(function () {
      end_loader();
    }, 3000);
  });
})(jQuery);

// ハンバーガーメニュー
$(function () {
  $(".hamburger").click(function () {
    $(".menu").toggleClass("open");
  });
});

// ヘッダー上下
let beforePos = 0;
function ScrollAnime() {
  let elemTop = $("#area-2").offset().top;
  let scroll = $(window).scrollTop();
  if (scroll == beforePos) {
  } else if (elemTop > scroll || 0 > scroll - beforePos) {
    $(".header").removeClass("UpMove");
    $(".header").addClass("DownMove");
  } else {
    $(".header").removeClass("DownMove");
    $(".header").addClass("UpMove");
  }
  beforePos = scroll;
}
$(window).scroll(function () {
  ScrollAnime();
});
$(window).on("load", function () {
  ScrollAnime();
});
let headerH = $(".header").outerHeight(true);
$("#g-navi li a").click(function () {
  let elmHash = $(this).attr("href");
  let pos = $(elmHash).offset().top - headerH;
  $("body,html").animate({ scrollTop: pos }, 1000);
  return false;
});

// 画像アニメーション（右）
$(window).on("scroll", function () {
  // #top-pageが存在する場合のみ、すべての処理を実行
  if ($("#top-page").length) {
    // スクロール位置とウィンドウの高さを一度だけ取得
    const scrollPos = $(window).scrollTop();
    const wh = $(window).height();

    // --- 1つ目のアニメーション処理 ---
    const backgroundAnimations = [
      { elements: $(".staff-background-left"), className: "zoom_leftin" },
      { elements: $(".staff-background-middle"), className: "zoom_middlein" },
      { elements: $(".staff-background-right"), className: "zoom_rightin" },
    ];

    backgroundAnimations.forEach(({ elements, className }) => {
      elements.each(function () {
        const offsetTop = $(this).offset().top;
        if (scrollPos > offsetTop - wh + wh / 2) {
          $(this).addClass(className);
        }
      });
    });

    // --- 2つ目のアニメーション処理 ---
    const cardItems = $(".card-item");
    const zoomInClass = "zoom_bottom";

    cardItems.each(function () {
      const animateOffset = $(this).offset().top;
      // 画面の7分の1に表示されたら、クラスを追加する
      if (scrollPos > animateOffset - wh + wh / 7) {
        $(this).addClass(zoomInClass);
      }
    });
  }
});








/*
// ファーストビュー画面いっぱい
$(function () {
  let hH = $(window).height();
  $("#mv2").css("height", hH + "px");
});
$(window).resize(function () {
  lethsize = $(window).height();
  $("#mv2").css("height", hsize + "px");
});
*/
/*
$(window).on("scroll", function () {
  let animate = $(".content__img--right");
  let zoomIn = "animate__zoomIn";

  animate.each(function () {
    let animateOffset = $(this).offset().top;
    let scrollPos = $(window).scrollTop();
    let wh = $(window).height();

    // 画面の半分に表示されたら、クラスを追加する
    if (scrollPos > animateOffset - wh + wh / 2) {
      $(this).addClass(zoomIn);
    }
  });
});
*/
