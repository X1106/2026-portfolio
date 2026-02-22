<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex" />
	<meta name="robots" content="noindex">
    <link rel="stylesheet" href="<?php echo $uri = get_template_directory_uri(); ?>/style.css">
    <script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
    <script type="text/javascript" src="<?php echo get_template_directory_uri() . '/js/script.js'; ?>"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="icon" href="img/favicon.png" type="image/png" />
    <link
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=BIZ+UDGothic&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=BIZ+UDGothic&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined"
      rel="stylesheet"
    />
<?php wp_head(); ?>
</head>
<script>
$(function() {
  // id="icon" の要素がクリックされたときの処理
  $('#icon').on('click', function() {
    // 現在のアイコンのテキストを取得
    const currentIcon = $(this).text().trim();
    
    // アイコンのテキストを条件に応じて変更
    if (currentIcon === 'apps') {
      $(this).text('close');
    } else {
      $(this).text('apps');
    }
  });
});
</script>
<body id="top-page" class="<?php echo ( ! is_front_page() && ! is_page('doctor') ) ? 'subpage-bg-color' : ''; ?>">
    <header class="header DownMove">
      <div class="inner">
        <h1 class="text-h1">
          <img class="header-logo" src="<?php echo $uri = get_template_directory_uri(); ?>/img/logo.svg" alt="クローバー歯科クリニックのロゴ">
        </h1>
        <nav class="menu nav-text-body" aria-label="グローバルナビゲーション">
          <div class="hamburger">
            <span id="icon" class="material-icons"> apps </span>
          </div>
			
          <ul aria-label="グローバルナビゲーション" class="menu-list">
            <li><a class="<?php echo is_front_page()  ? 'nav-color' : 'nav-second-color'; ?>" href="<?php echo home_url('/'); ?>">当院について</a></li>
            <li><a class="<?php echo is_page('doctor') ? 'nav-color' : 'nav-second-color'; ?>" href="<?php echo home_url('/'); ?>/doctor/">スタッフ紹介</a></li>
            <li><a id="tooltipButton" class="<?php echo is_front_page()  ? 'nav-second-color' : 'nav-second-color'; ?>" href="<?php echo home_url('/'); ?>/about/">治療科目</a></li>
            <li><a class="<?php echo is_page('archive') ? 'nav-color' : 'nav-second-color'; ?>" href="<?php echo home_url('/'); ?>/archive/">お知らせ</a></li>
            <li><a class="<?php echo is_page('contact') ? 'nav-color' : 'nav-second-color'; ?>" href="<?php echo home_url('/'); ?>/contact/">お問い合わせ</a></li>
          </ul>
        </nav>
      </div>
    </header>