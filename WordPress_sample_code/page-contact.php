<?php
/*
Template Name: contact
*/
get_header(); ?>

<section class="subpage-main-visual">
      <div class="subpage-visual-image">
        <img class="subpage-visual-img pc-note-overlay" src="<?php echo $uri = get_template_directory_uri(); ?>/img/sp-contact.png" aria-hidden="true">
        <img class="subpage-visual-img sp-note-overlay" src="<?php echo $uri = get_template_directory_uri(); ?>/img/contact.png" aria-hidden="true">
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
    <main class="container">
      <section id="area-2" class="subpage-heading">
        <div class="inner">
          <h2 class="heading-title heading-text-title">お問い合わせ</h2>
          <figure class="subpage-visual-imags pc-note-overlay">
            <img class="subpage-visual-img pc-note-overlay"  src="<?php echo $uri = get_template_directory_uri(); ?>/img/heading-logo.png" aria-hidden="true">
          </figure>
          <p class="heading-subtitle subpage-lead">
            当院へのご相談は、フォームよりお気軽にお問い合わせください。
          </p>
        </div>
      </section>
		<?php echo do_shortcode( '[contact-form-7 id="7eb1a91" title="contact"]' ); ?>

    </main>
<?php get_footer(); ?>