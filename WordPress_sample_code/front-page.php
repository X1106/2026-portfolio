<?php get_header(); ?>



<div class="right-fixed-banner">
 <a><span class="sp-note-overlay">診療日時・</span>予約確認</a>
</div>


<section class="main-visual">
    <img class="pc-note-overlay" src="<?php echo $uri = get_template_directory_uri(); ?>/img/sp_firstview.png" alt="サンプル歯科医院の受付">
    <img class="sp-note-overlay" src="<?php echo $uri = get_template_directory_uri(); ?>/img/pc_firstview.png" alt="サンプル歯科医院の受付">
    <div class="main-visual-style sp-note-overlay"></div>
</section>

    <section class="page-heading pc-note-overlay">
      <div class="inner">
        <h2 class=" page-lead">よつば歯科</h2>
        <p class="subpage-visual-imags">
          <img class="subpage-visual-img pc-note-overlay"  src="<?php echo $uri = get_template_directory_uri(); ?>/img/heading-logo.png" aria-hidden="true">
        </p>
        <p class="heading-subtitle page-lead">
          新宿駅1分｜日曜も診療<br>お子様連れも安心の歯医者です。
        </p>
      </div>
    </section>

<main id="main" class="container">
    <?php
    $theme_uri = get_template_directory_uri();
    $treatments = [
        [
            'slug' => 'general',
            'title' => '一般歯科',
            'desc' => '痛みを抑え、なるべく削らずに歯を大切にする治療を行います。',
            'img' => 'about_1.jpg',
            'alt' => '一般歯科の画像'
        ],
        [
            'slug' => 'pediatric',
            'title' => '小児歯科',
            'desc' => 'お子さまが安心できる環境で、優しく丁寧な治療を行います。',
            'img' => 'about_2.jpg',
            'alt' => '小児歯科の画像'
        ],
        [
            'slug' => 'preventive',
            'title' => '予防歯科',
            'desc' => '虫歯や歯周病を防ぎ、健康な歯を長く保つサポートをします。',
            'img' => 'about_3.jpg',
            'alt' => '予防歯科の画像'
        ]
    ];
    ?>

    <section id="area-2"  class="treatment">
        <div class="inner">
            <h2 class="treatment-title heading-text-title">診療案内</h2>
            <p class="treatment-subtitle top-p-subtitle">TREATMENT</p>
            <div id="primary" class="content-area">
                <div class="treatment-card">
                    <ul class="card-list">
                        <?php // 配列の情報を元に、foreachループでカードを生成 
                        ?>
                        <?php foreach ($treatments as $treatment) : ?>
                            <li class="card-item">
                                <a class="card-link" href="<?php echo home_url('/'); ?>/about/">
                                    <div class="card-content">
                                        <div class="card-image">
                                            <img src="<?php echo esc_url($theme_uri . '/img/' . $treatment['img']); ?>" alt="<?php echo esc_attr($treatment['alt']); ?>">
                                        </div>
                                        <div class="card-text">
                                            <h3 class="card-title"><?php echo esc_html($treatment['title']); ?></h3>
                                            <p class="card-subtitle card-body"><?php echo esc_html($treatment['desc']); ?></p>
                                            <p class="card-arrow">
                                                <span class="material-symbols-outlined">arrow_right</span>
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <section class="content">
        <img class="content__img--top" src="<?php echo $uri = get_template_directory_uri(); ?>/img/background__img--top.png" role="presentation">
        <img class="content__img--bottom" src="<?php echo $uri = get_template_directory_uri(); ?>/img/background__img--under.png" role="presentation">
        <div class="message">
            <img class="staff-background-left" src="<?php echo $uri = get_template_directory_uri(); ?>/img/backgroundimg-left.png" alt="歯磨き講習の画像">
            <img class="staff-background-middle" src="<?php echo $uri = get_template_directory_uri(); ?>/img/backgroundimg-middle.png" alt="施術画像">
            <img class="staff-background-right" src="<?php echo $uri = get_template_directory_uri(); ?>/img/backgroundimg-right.png" alt="スタッフ画像">
            <h2 class="message__title content-h2-title">
                優しく寄り添い<br />笑顔を引き出す歯科医院。
            </h2>
            <p class="message__text top-text-body">
                「痛いのは苦手」「歯医者がこわい」そんな気持ちにもしっかり寄り添います。しっかり噛める丈夫な歯と、自然に笑える美しい歯を叶えるために、ひとりひとりに合わせた優しい治療を大切にしています。
            </p>
        </div>
        <article>
            <div class="doctor">
                <h2 class="doctor__title content-article-title">医師紹介</h2>
            </div>
            <div class="doctor__body">
                <div class="doctor__col--body">
                    <p class="doctor__text top-text-body">
                        地域の皆様の歯の健康を守るため、私たちは丁寧で安心な診療を心がけています。患者様一人ひとりの声に耳を傾け、納得のいく治療を提供します。お悩みがあれば、どうぞお気軽にご相談ください。あなたの笑顔を大切にします。
                    </p>
                    <div class="btns btns-position-right">
                        <a class="btn" href="<?php echo home_url('/'); ?>/doctor/">スタッフ紹介はこちら</a>
                    </div>
                </div>
                <div class="doctor__col--img">
                    <img class="" src="<?php echo $uri = get_template_directory_uri(); ?>/img/doctor__img.png" alt="院長のお写真">
                </div>
            </div>
        </article>
        <article>
            <div class="features">
                <h2 class="features__title content-article-title">医院の特徴</h2>
            </div>
            <div class="features__body">
                <div class="features__col--img">
                    <div class="features__img">
                        <img class="" src="<?php echo $uri = get_template_directory_uri(); ?>/img/features.png" alt="施術スペースの写真">
                    </div>
                </div>
                <div class="features__col--body">
                    <p class="features__text top-text-body">
                        患者様一人ひとりに寄り添い、安心できる環境で最適な治療を提供します。健康な歯を守るパートナーとしてお手伝いします。
                    </p>
                    <ul class="features__list">
                        <li class="features__list--item list-text-body">
                            <ul class="features__list--text">
                                <li class="features__list--no">1</li>
                                <li class="features__list--title">
                                    清潔でリラックスできる空間
                                </li>
                                <li class="features__list--link">
                                    <span class="material-symbols-outlined">
                                        arrow_right
                                    </span>
                                </li>
                            </ul>
                        </li>
                        <li class="features__list--item list-text-body">
                            <ul class="features__list--text">
                                <li class="features__list--no">２</li>
                                <li class="features__list--title">
                                    最先端機器で正確な診断
                                </li>
                                <li class="features__list--link">
                                    <span class="material-symbols-outlined">
                                        arrow_right
                                    </span>
                                </li>
                            </ul>
                        </li>
                        <li class="features__list--item list-text-body">
                            <ul class="features__list--text">
                                <li class="features__list--no">３</li>
                                <li class="features__list--title">
                                    専門医が行うインプラント治療
                                </li>
                                <li class="features__list--link">
                                    <span class="material-symbols-outlined">
                                        arrow_right
                                    </span>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <p class="features__link top-features-text">
                        <a class="" href="<?php echo home_url('/'); ?>">医院の特徴を確認する&nbsp;＞</a>
                    </p>
                </div>
            </div>
        </article>
        <article>
            <div class="recruit">
                <div class="recruit__inner">
                    <h2 class="recruit__title heading-text-title">求人情報</h2>
                    <p class="recruit__subtitle top-p-subtitle">RECRUIT</p>
                    <p class="recruit__text top-text-body">
                        患者様とスタッフの笑顔が溢れる、温かい職場で、充実した教育体制のもと、安心して長くキャリアを築けます。
                    </p>
                    <div class="btns btns-position-right">
                        <a class="btn" href="<?php echo home_url('/'); ?>/doctor/">求人情報はこちら</a>
                        <p class="warning">※ 他のサイトに遷移いたします。</p>
                    </div>
                </div>
            </div>
        </article>
    </section>

    <section class="update">
        <div class="update-inner">
            <h2 class="update-title heading-text-title">お知らせ</h2>
            <p class="update-subtitle top-p-subtitle">NEWS</p>

            <?php
            $args = array(
                'post_type' => 'news',
                'posts_per_page' => 3,
                "paged" => 1,
                'post_status' => array('publish', 'private'),
            );
            $the_query = new WP_Query($args);
            ?>

            <?php if ($the_query->have_posts()) : // 投稿がある場合のみ表示 
            ?>

                <ul class="update-list">

                    <?php
                    while ($the_query->have_posts()) :
                        $the_query->the_post(); // ループ内のお決まりの呪文
                    ?>
                        <li class="update-list-item">
                            <a href="<?php the_permalink(); ?>">
                                <ul class="update-list-text">
                                    <li class="update-list-no list-text-body">
                                        <time class="news-date" datetime="<?php echo get_the_date('Y-m-d'); ?>">
                                            <?php echo get_the_date('Y.m.d'); ?>
                                        </time>
                                    </li>
                                    <li class="update-list-title">
                                        <?php the_title(); ?>
                                    </li>
                                    <li class="update-list-link">
                                        <span aria-hidden="true" id="arrow" class="material-symbols-outlined">
                                            arrow_right
                                        </span>
                                    </li>
                                </ul>
                            </a>
                        </li>
                    <?php
                    endwhile;
                    ?>
                </ul>
                <?php wp_reset_postdata(); // ループの後に投稿データをリセット 
                ?>
            <?php else : ?>
                <p>現在、お知らせはありません。</p>
            <?php endif; ?>

            <div class="btns-2 btns-position-center">
                <a class="btn" href="<?php echo home_url('/'); ?>/archive/">お知らせを確認する</a>
            </div>
        </div>
    </section>

    <section class="info">
        <div class="info-inner">
            <div class="info-title">
                <div class="info-logo top-logo-title">
                    <img class="" src="<?php echo $uri = get_template_directory_uri(); ?>/img/logo.svg" alt="クローバー歯科クリニックのロゴ">
                </div>
            </div>
            <div class="info-col">
                <h2 class="info-heading-icon">電話</h2>
                <p class="info-telephone info-text-telephone">
                    <a class="" href="tel:031234567">03-123-4567</a>
                </p>
                <h2 class="info-heading-icon">住所</h2>
                <p class="info-address top-text-body">
                    〒101-0000<br />東京都新宿新宿99丁目１１−４１サンプルBLDG 3F<br />新宿駅の南口から歩いて1分
                </p>
            </div>

            <?php
            // 曜日のリストを配列に格納
            $days_of_week = ['月', '火', '水', '木', '金', '土', '日'];

            // aria-labelに設定する共通のテキストを変数に格納
            $aria_label_text = '開院しておりますので、お電話での事前予約をお待ちしております。';
            ?>

            <div class="info-col">
                <div class="">
                    <h2 class="info-heading-icon">診療日</h2>
                    <details class="qa-1 pc-note-overlay">
                        <summary>診療日</summary>
                        <table class="tbl-r05">
                            <tr>
                                <td>9:30~13:00（午前）</td>
                                <?php foreach ($days_of_week as $day) : ?>
                                    <td data-label="<?php echo esc_attr($day); ?>">⚪︎</td>
                                <?php endforeach; ?>
                            </tr>
                            <tr class="last">
                                <td>14:30~18:30（午後）</td>
                                <?php foreach ($days_of_week as $day) : ?>
                                    <td data-label="<?php echo esc_attr($day); ?>">⚪︎</td>
                                <?php endforeach; ?>
                            </tr>
                        </table>
                    </details>
                </div>

                <table class="tbl-r05 sp-note-overlay">
                    <thead>
                        <tr class="thead">
                            <th>/</th>
                            <?php foreach ($days_of_week as $day) : ?>
                                <th><?php echo esc_html($day); ?></th>
                            <?php endforeach; ?>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>9:30~13:00</td>
                            <?php foreach ($days_of_week as $day) : ?>
                                <td aria-label="<?php echo esc_attr($aria_label_text); ?>" data-label="<?php echo esc_attr($day); ?>">
                                    ⚪︎
                                </td>
                            <?php endforeach; ?>
                        </tr>
                        <tr class="last">
                            <td>14:30~18:30</td>
                            <?php foreach ($days_of_week as $day) : ?>
                                <td aria-label="<?php echo esc_attr($aria_label_text); ?>" data-label="<?php echo esc_attr($day); ?>">
                                    ⚪︎
                                </td>
                            <?php endforeach; ?>
                        </tr>
                    </tbody>
                </table>
                <p class="warning">
                    ※WEB・お電話でのご予約をお願いいたします。
                </p>
                <div class="flex">
                    <div class="info-col">
                        <div class="btns">
                            <a href="<?php echo home_url('/'); ?>/about/" class="btn" aria-label="クローバー歯科クリニックのWEB予約ページへ移動します" href="<?php echo home_url('/'); ?>">
                                WEB予約はこちら</a>
                        </div>
                        <p class="warning">※ ご予約サイトに遷移いたします。</p>
                    </div>
                    <div class="info-col">
                        <div class="btns">
                            <a href="<?php echo home_url('/'); ?>/about/" class="btn" aria-label="クローバー歯科クリニックの地図ページへ移動します" href="<?php echo home_url('/'); ?>">
                                地図を確認する</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

</main>

<?php get_footer(); ?>