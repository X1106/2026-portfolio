<?php
function post_has_archive($args,$post_type){
    if( 'post'== $post_type ) {
    	$args[ 'rewrite' ] = true;
    	$args[ 'has_archive'] = 'news';
    	$args[ 'label'] = 'お知らせ';
	}
    return $args;
}
add_filter( 'register_post_type_args', 'post_has_archive' ,10,2);

function create_post_type_news(){
 register_post_type( 
  'news',
  array(
	  
   'labels' => array(
    'name' => 'カスタム投稿'
   ),
   'public' => true,
   'has_archive' => true,
   'supports' => array('title','editor','thumbnail','author'),
	'taxonomies'    => array( 'category', 'post_tag' ),
   'show_in_rest' => true,
  )
 );
}
add_action( 'init', 'create_post_type_news' );
add_theme_support( 'post-thumbnails' );
add_image_size( 'card-thumbnail', 300, 300, true );






function my_front_page_scripts() {
    // もし現在表示しているのがフロントページなら
    if ( is_front_page() ) {
        // front-page.cssというファイルを読み込む
        wp_enqueue_style( 
            'front-page-style', 
            get_template_directory_uri() . '/css/front-page.css' 
        );
    }
}
// WordPressの標準的なアクションフックに登録
add_action( 'wp_enqueue_scripts', 'my_front_page_scripts' );













if ( is_page('archive-news') ) {
    $category_slug = 'news'; // 「ニュース一覧」ページなら 'news' カテゴリ
} elseif ( is_page('archive-blog') ) {
    $category_slug = 'blog'; // 「ブログ一覧」ページなら 'blog' カテゴリ
} else {
    $category_slug = array('news', 'blog'); // それ以外のページでは両方を表示（任意で変更可）
}


$category_count = 5;

$args = array(
  'post_type'      => 'news',         // カスタム投稿タイプ 'news' を指定
  'posts_per_page' => $category_count ,              // 1ページに表示する件数
  'category_name'  => $category_slug, 
  'post_status'    => array('publish', 'private')       // 公開済みの投稿のみ
);
  //'paged'          => $paged,         // 現在のページ番号
// 設定した条件で、新しいクエリを作成
$the_query = new WP_Query($args);


function get_current_link() {
	return (is_ssl() ? 'https' : 'http') . '://' . $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"];
}

function get_the_my_permalink($post = 0, $leavename = false)
{
	$parse_url = parse_url(get_the_permalink($post, $leavename));
	$url = "{$parse_url['scheme']}://{$parse_url['host']}/{$parse_url['path']}";
	$query = isset($_GET) ? $_GET : array();
	$parseQuery = isset($parse_url['query']) ? $parse_url['query'] : array();
	$queryString = http_build_query(array_replace($parseQuery, $query));
	$url .= $queryString ? '?' . $queryString : '';
	
	return $url;
}


/**
 * Google Fonts (BIZ UDGothic) を読み込む関数
 */
function my_theme_enqueue_google_fonts() {
    // Google FontsのCSSファイルを登録
    wp_enqueue_style(
        'my-google-font-bizudgothic', // ハンドル名（任意）
        'https://fonts.googleapis.com/css2?family=BIZ+UDGothic&display=swap', // フォントのURL
        array(), // 依存関係
        null // バージョン
    );
}
// wp_enqueue_scriptsアクションフックで上記の関数を実行
add_action( 'wp_enqueue_scripts', 'my_theme_enqueue_google_fonts' );

/**
 * Google Fontsの読み込みを高速化するためのpreconnect設定
 */
function my_theme_add_google_fonts_preconnect( $urls, $relation_type ) {
    if ( 'preconnect' === $relation_type ) {
        // preconnectを追加したいドメインを配列に追加
        $urls[] = 'https://fonts.googleapis.com';
        $urls[] = 'https://fonts.gstatic.com';
    }
    return $urls;
}
// wp_resource_hintsフィルターフックで上記の関数を実行
add_filter( 'wp_resource_hints', 'my_theme_add_google_fonts_preconnect', 10, 2 );

