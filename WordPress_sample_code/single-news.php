<?php
/*
Template Name: archive-news
Template Post Type: post
*/
?>


<?php get_header(); ?>
<section  id="area-2" class="subpage-main-visual">
      <div class="subpage-visual-image">
        <img class="subpage-visual-img sp-note-overlay"  src="<?php echo $uri = get_template_directory_uri(); ?>/img/news.png" aria-hidden="true">
        <img class="subpage-visual-img pc-note-overlay"  src="<?php echo $uri = get_template_directory_uri(); ?>/img/sp-news.png" aria-hidden="true">
      </div>
    </section>
<div class="breadcrumbs">

    <main class="container">
      <article class="article">
        <div class="inner">
          <h2 class="article-title">
            <?php the_title(); ?>
          </h2>
          <div class="article-data">
            <div class="article-day" >投稿日時：<?php echo get_the_date('Y-m-d'); ?></div>
            <div class="article-category"><?php the_category(); ?></div>
          </div>
          <div class="article-body">
            <?php the_content(); ?>
          </div>
          <div class="auther article-body">
            <div class="auther-body">
            </div>
          </div>
          <div class="btns-2">
          <a class="btn" href="<?php echo home_url('/'); ?>/archive/">記事一覧に戻る</a>
          </div>
        </div>
        <aside class="sidebar tablet-note-overlay" aria-label="補足情報">
          <div class="sidebar-module">
            <h3>最近の記事</h3>
			   <?php
            $args = array(
                'post_type' => 'news',
                'posts_per_page' => 4,
                "paged" => 1,
                'post_status' => array('publish', 'private'),
            );
            $the_query = new WP_Query($args);
            ?>

            <?php if ($the_query->have_posts()) : // 投稿がある場合のみ表示 
            ?>

            <ul class="sidebar-list">
                  <?php
                    while ($the_query->have_posts()) :
                        $the_query->the_post(); // ループ内のお決まりの呪文
                    ?>
                        <li class="sidebar-item">
                            <a href="<?php the_permalink(); ?>">
                                        <?php the_title(); ?>
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

          </div>
        </aside>
      </article>
    </main>
<?php get_footer(); ?>