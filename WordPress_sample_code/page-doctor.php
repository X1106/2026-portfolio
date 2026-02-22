<?php
/*
* Template Name: doctor
*/
?>
<?php get_header(); ?>

<div class="bg-graphic-right">
    <img src="<?php echo $uri = get_template_directory_uri(); ?>/img/bg.png" aria-hidden="true">
</div>
<div class="bg-graphic-left">
    <img src="<?php echo $uri = get_template_directory_uri(); ?>/img/bg.png" aria-hidden="true">
</div>

<section class="doctor-main-visual">
    <div class="inner">
        <div class="visual-image-1">
            <img class="visual-img-1" src="<?php echo $uri = get_template_directory_uri(); ?>/img/Mask.png" aria-hidden="true">
        </div>
        <div class="visual-image-2">
            <img class="visual-img" src="<?php echo $uri = get_template_directory_uri(); ?>/img/Mask.png" aria-hidden="true">
        </div>
        <div class="visual-image-3">
            <img class="visual-img" src="<?php echo $uri = get_template_directory_uri(); ?>/img/Mask.png" aria-hidden="true">
        </div>
        <div class="visual-description">
            <div class="visual-heading">
                <h2 class="visual-title doctor-h1-title">
                    DOCTOR AND STAFF INTRODUCTION
                </h2>
                <p class="visual-subtitle doctor-p-subtitle">
                    スタッフ紹介
                </p>
            </div>
            <div id="area-2" class="visual-body">
                <h2 class="visual-lead doctor-text-lead ">
                    それぞれの患者さまに合わせた、やさしい治療を心がけています。
                </h2>
                <p class="visual-text doctor-text-body">
                    私たちは患者さま一人ひとりに寄り添い、丁寧でやさしい対応を大切にしています。不安や疑問も丁寧に解消し、安心して治療を受けていただける環境づくりに努めています。
                </p>
            </div>
        </div>
    </div>
</section>

<main id="main" class="container">
    <section class="doctor-detail-profile">
        <div class="inner">
            <div class="heading">
                <h2 class="heading-name profile-title">
                    01｜院長先生
                </h2>
            </div>
            <div class="profile-content ">
                <div class="divider">
                    <div class="img-col">
                        <div class="img-wrap">
                            <img class="profile-img" src="<?php echo $uri = get_template_directory_uri(); ?>/img/doctor.png" alt="院長先生">
                        </div>
                    </div>
                    <div class="profile-col">
                        <h3 class="profile-name profile-text-title">山田 花子</h3>
                        <p class="doctor-text-body profile-actor">ヤマダ <span>ハナコ</span></p>
                        <ul class="profile-detail profile-text-body">
                            <li class="profile-detail-item">
                                <span class="profile-item"><b>略歴</b></span><br>
                                <span class="profile-text">1999年3月 日本○○大学 卒業</span>
                            </li>
                            <li class="profile-detail-item">
                                <span class="profile-item"><b>資格・所属学会</b></span><br>
                                <span class="profile-text">日本歯○○学会</span>
                            </li>
                            <li class="profile-detail-item">
                                <span class="profile-item"><b>ご挨拶</b></span><br>
                                <span class="profile-text">地域の皆様の歯の健康を守るため、私たちは丁寧で安心な診療を心がけています。患者様一人ひとりの声に耳を傾け、納得のいく治療を提供します。</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="doctor-detail-staff">
        <div class="inner">
            <div class="heading">
                <h2 class="heading-name profile-title">02｜スタッフ紹介</h2>
            </div>
            <div class="staff-content">
                <?php
                // テーマの画像フォルダへのパスを変数に保存
                $theme_uri = get_template_directory_uri();

                // スタッフの情報を配列（リスト）にまとめる
                $staff_members = [
                    [
                        'role' => '歯科技工士',
                        'name' => '佐藤 花子',
                        'img' => 'doctor.png',
                    ],
                    [
                        'role' => '歯科衛生士',
                        'name' => '鈴木 花子',
                        'img' => 'doctor.png',
                    ],
                    [
                        'role' => '歯科衛生士',
                        'name' => '田中 花子',
                        'img' => 'doctor.png',
                    ],
                    [
                        'role' => '歯科衛生士',
                        'name' => '今井 花子',
                        'img' => 'doctor.png',
                    ],
                    [
                        'role' => '歯科衛生士',
                        'name' => '工藤 花子',
                        'img' => 'doctor.png',
                    ],
                    [
                        'role' => '受付事務',
                        'name' => '五十嵐 花子',
                        'img' => 'doctor.png',
                    ],
                ];
                ?>

                <ul class="staff-list profile-text-body">
                    <?php // 配列の情報を元に、foreachループで<li>要素を自動生成 
                    ?>
                    <?php foreach ($staff_members as $staff) : ?>
                        <li class="staff-item">
                            <img class="staff-img" src="<?php echo esc_url($theme_uri . '/img/' . $staff['img']); ?>" alt="<?php echo esc_attr($staff['role'] . '(' . $staff['name'] . ')画像'); ?>">
                            <p class="staff-role"><?php echo esc_html($staff['role']); ?></p>
                            <p class="staff-name"><?php echo esc_html($staff['name']); ?></p>
                        </li>
                    <?php endforeach; ?>
                </ul>
            </div>
            <div class="recruit">
                <div class="recruit__inner">
                    <h2 class="recruit__title heading-text-title">求人情報</h2>
                    <p class="recruit__subtitle top-p-subtitle">RECRUIT</p>
                    <p class="recruit__text top-text-body">
                        患者様とスタッフの笑顔が溢れる、温かい職場で、充実した教育体制のもと、安心して長くキャリアを築けます。
                    </p>
                    <div class="btns btns-position-right">
                        <a class="btn" aria-label="求人情報はこちら（外部サイトへ移動します）" href="<?php echo home_url('/'); ?>">求人情報はこちら</a>
                        <p class="warning">※ 他のサイトに遷移いたします。</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</main>

<?php get_footer(); ?>