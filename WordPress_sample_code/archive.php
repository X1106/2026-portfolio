<?php
/*
* Template Name: archive
*/
?>
<?php get_header(); ?>
<section  id="area-2" class="subpage-main-visual">
      <div class="subpage-visual-image">
        <img class="subpage-visual-img sp-note-overlay"  src="<?php echo $uri = get_template_directory_uri(); ?>/img/news.png" aria-hidden="true">
        <img class="subpage-visual-img pc-note-overlay"  src="<?php echo $uri = get_template_directory_uri(); ?>/img/sp-news.png" aria-hidden="true">
      </div>
    </section>

<div class="breadcrumbs sp-note-overlay ">
  <div class="breadcrumbs-inner">
		<?php
if ( function_exists( 'bcn_display' ) ) {
	bcn_display();
}
?>
  </div>
</div>


<?php
// 1. 現在のページのURLを取得
$current_url = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];

// 2. WordPressの関数でパラメータ付きの新しいURLを生成
// WordPress環境でない場合は http_build_query を使います
$blog_url = add_query_arg('key', 'blog', $current_url);
$news_url = add_query_arg('key', 'news', $current_url);

?>
<?php
$key_param = isset($_GET['key']) ? $_GET['key'] : null;
if ($key_param === 'blog') {
    $category = 'blog';
} else if ($key_param === 'news') {
    $category = 'news';
} else {
    $category = array('news', 'blog');
}
?>

    <section class="subpage-heading">

      <div class="inner">
        <h2 class="heading-title heading-text-title">お知らせ</h2>
        <p class="subpage-visual-imags">
          <img class="subpage-visual-img pc-note-overlay"  src="<?php echo $uri = get_template_directory_uri(); ?>/img/heading-logo.png" aria-hidden="true">
        </p>
        <p class="heading-subtitle subpage-lead">
          当院からのお知らせとスタッフのブログ記事を掲載しております。
        </p>
        <div class="heading-filter">
          <div class="filter-btns">
          <a class="filter-btn heading-btn-text" href="<?php echo esc_url($news_url); ?>">NEWS</a>

          </div>
          <div class="filter-btns">
          <a class="filter-btn heading-btn-text" href="<?php echo esc_url($blog_url); ?>">BLOG</a>

          </div>
        </div>
      </div>
    </section>
    <main class="container">
      <section class="news-list">
        <div class="inner">
<?php
$paged = get_query_var('paged', 1);
$args = array(
    'post_type' => 'news',
    'posts_per_page' => 5,
	"paged" => $paged, 
    'tax_query' => array(
        array(
            'taxonomy' => 'category',
            'field'    => 'slug',
            'terms'    => $category,
        ),
    ),
    'post_status' => array('publish', 'private'),
);
$the_query = new WP_Query($args);
?>
			<?php if ($the_query->have_posts()) : ?>
          <ul class="news-card">
            <?php while ($the_query->have_posts()) : $the_query->the_post(); ?>

            <li class="news-card-item">

					

                <div class="news-card-data">
<div class="news-card-img sp-note-overlay">
    <?php if ( has_post_thumbnail() ) : ?>
        <?php the_post_thumbnail(); ?>
    <?php else : ?>
        <?php // なければデフォルトの画像を表示 ?>
        <img src="<?php echo esc_url( get_template_directory_uri() . '/img/card_img.png' ); ?>" alt="記事のアイキャッチ画像">
    <?php endif; ?>
</div> 
                  <div class="news-card-description">
                    <div class="card-tag-wrap">        
                      <div class="card-tag-day" ><?php echo get_the_date('Y-m-d'); ?></div>
                      <div class="card-tag"><?php the_category(); ?></div>	
                    </div>
					  						<a class="news-card-link" href="<?php the_permalink(); ?>">
                    <h3 class="news-card-title card-title">

                    <?php the_title(); ?>

                    </h3>
												
                    <div class="news-card-text card-body">
                    <?php the_content(); ?>
                    </div>
												</a>
                  </div>
                  <div class="news-card-navigation">
					  <a class="news-card-link" href="<?php the_permalink(); ?>">
                    <span class="material-symbols-outlined"> arrow_right </span>
						  </a>
                  </div>		
                </div>
								
            </li>

        <?php endwhile; 
			  ?>
          </ul>
			    <?php wp_reset_postdata(); ?>
<?php else : ?>
    <p>現在、お知らせはありません。</p>
<?php endif; ?>	


<?php if ($the_query->max_num_pages > 1) : ?>
	<nav class="pagination" aria-label="投稿のページネーション">
		<?php
		echo paginate_links(array(
			'base'      => str_replace(999999999, '%#%', esc_url(get_pagenum_link(999999999))),
			'current'   => max(1, $paged),
			'total'     => $the_query->max_num_pages,
			'end_size'  => 1, // 数値にするのが一般的
			'mid_size'  => 2, // 数値にするのが一般的
			'prev_next' => true,
			'prev_text' => __('前のページ', 'wp-template'), // 国際化対応
			'next_text' => __('次のページ', 'wp-template'), // 国際化対応
			'type'      => 'list'
		));
		?>
	</nav>
<?php endif; ?>

        </div>
      </section>
<?php get_footer(); ?>