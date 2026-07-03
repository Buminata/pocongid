#!/usr/bin/env python3
"""Generate Blogger theme XML and patch article pages."""
import os
import re

ROOT = os.path.dirname(os.path.abspath(__file__))
BLOGGER_DIR = os.path.join(ROOT, 'blogger')

def patch_articles_reading_progress():
    for i in range(1, 6):
        path = os.path.join(ROOT, f'artikel{i}.html')
        with open(path, 'r', encoding='utf-8') as f:
            c = f.read()
        bar = (
            '  <div id="reading-progress" role="progressbar" '
            'aria-label="Kemajuan membaca artikel" aria-valuemin="0" '
            'aria-valuemax="100" aria-valuenow="0"></div>\n'
        )
        if 'reading-progress' not in c:
            c = c.replace('  </header>\n\n  <main', '  </header>\n\n' + bar + '  <main', 1)
            with open(path, 'w', encoding='utf-8') as f:
                f.write(c)
            print('Reading bar:', path)

def generate_theme():
    os.makedirs(BLOGGER_DIR, exist_ok=True)
    with open(os.path.join(ROOT, 'css', 'style.css'), 'r', encoding='utf-8') as f:
        css = f.read()
    with open(os.path.join(ROOT, 'js', 'script.js'), 'r', encoding='utf-8') as f:
        js = f.read()
    with open(os.path.join(ROOT, 'js', 'config.js'), 'r', encoding='utf-8') as f:
        config = f.read()

    # Blogger-hosted images use data:blog.homepageUrl in template; CSS uses relative paths fixed in panduan
    css = css.replace("url('../images/", "url('IMAGE_BASE_URL")

    theme = '''<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE html>
<html b:version='2' class='v2' expr:dir='data:blog.languageDirection' xmlns='http://www.w3.org/1999/xhtml' xmlns:b='http://www.google.com/2005/gml/b' xmlns:data='http://www.google.com/2005/gml/data' xmlns:expr='http://www.google.com/2005/gml/expr'>
<head>
  <meta charset='UTF-8'/>
  <meta content='width=device-width, initial-scale=1' name='viewport'/>
  <meta content='#050505' name='theme-color'/>
  <title><data:blog.pageTitle/></title>
  <b:include data='blog' name='all-head-content'/>
  <link href='https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&amp;family=Poppins:wght@400;500;600&amp;display=swap' rel='stylesheet'/>
  <b:skin><![CDATA[
''' + css + '''
  ]]></b:skin>
  <script>//<![CDATA[
''' + config + '''
window.POCONG_CONFIG.isBlogger = true;
window.POCONG_CONFIG.blogUrl = '<data:blog.homepageUrl/>';
''' + js + '''
  //]]></script>
</head>
<body>
  <b:section class='header' id='header' maxwidgets='1' showaddelement='yes'>
    <b:widget id='Header1' locked='false' title='Header' type='Header' visible='true'/>
  </b:section>
  <a class='skip-link' href='#main-content'>Lompat ke konten utama</a>
  <div aria-hidden='true' id='loading-screen' role='status'><svg class='loader-icon' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='50' cy='50' r='45' stroke='rgba(139, 0, 0, 0.2)' stroke-width='2' /><circle cx='50' cy='50' r='45' stroke='#ff0000' stroke-width='2' stroke-dasharray='283' stroke-dashoffset='75' stroke-linecap='round'><animateTransform attributeName='transform' type='rotate' from='0 50 50' to='360 50 50' dur='2s' repeatCount='indefinite' /></circle><path d='M50 25C40.6 25 33 32.6 33 42C33 47.3 35.4 52 39.2 55.2V63H44.6V58H55.4V63H60.8V55.2C64.6 52 67 47.3 67 42C67 32.6 59.4 25 50 25ZM43.6 42.9C42.3 42.9 41.3 41.9 41.3 40.6C41.3 39.3 42.3 38.3 43.6 38.3C44.9 38.3 45.9 39.3 45.9 40.6C45.9 41.9 44.9 42.9 43.6 42.9ZM56.4 42.9C55.1 42.9 54.1 41.9 54.1 40.6C54.1 39.3 55.1 38.3 56.4 38.3C57.7 38.3 58.7 39.3 58.7 40.6C58.7 41.9 57.7 42.9 56.4 42.9Z' fill='#ff0000'><animate attributeName='opacity' values='0.5;1;0.5' dur='1.5s' repeatCount='indefinite' /></path></svg><div class='loader-logo'>POCONG.ID</div><div class='loader-bar'><div class='loader-bar-fill'/></div></div>
  <div aria-hidden='true' id='rain-container'/>
  <div aria-hidden='true' id='lightning-flash'/>

  <header>
    <nav aria-label='Navigasi utama' class='navbar' role='navigation'>
      <div class='navbar-inner'>
        <a class='navbar-logo' expr:href='data:blog.homepageUrl'>
          <b:if cond='data:blog.logo'>
            <img expr:src='data:blog.logo' alt='POCONG.ID' class='navbar-logo-img'/>
          </b:if>
          <span class='navbar-logo-text' style='font-family: &quot;Cinzel&quot;, serif; font-size: 1.5rem; font-weight: 700; color: #ff0000; letter-spacing: 2px;'>POCONG.ID</span>
        </a>
        <ul class='navbar-nav'>
          <li><a expr:href='data:blog.homepageUrl'>Home</a></li>
          <li><a href='/p/tentang.html'>Tentang</a></li>
          <li><a href='/p/kontak.html'>Kontak</a></li>
        </ul>
        <button aria-expanded='false' aria-label='Menu' class='hamburger'><span/><span/><span/></button>
      </div>
    </nav>
  </header>

  <div aria-label='Berita terbaru' class='news-ticker' role='region'>
    <div class='news-ticker-inner'>
      <span class='ticker-label'>Terbaru</span>
      <div class='ticker-wrap'><div class='news-ticker-track'><span>Cerita Horor Nusantara — Pocong.id</span></div></div>
    </div>
  </div>

  <main id='main-content'>
    <b:section class='main-content' id='main' maxwidgets='1' showaddelement='yes'>
      <b:widget id='Blog1' locked='true' title='Postingan Blog' type='Blog' version='2' visible='true'>
        <b:includable id='main' var='top'>
          <b:if cond='data:view.isMultipleItems'>
            <section class='section'><div class='container'>
              <div class='article-grid'>
                <b:loop values='data:posts' var='post'>
                  <article class='article-card fade-in visible'>
                    <b:if cond='data:post.featuredImage'>
                      <div class='article-card-image'><a expr:href='data:post.url'><img expr:alt='data:post.title' expr:src='data:post.featuredImage'/></a></div>
                    </b:if>
                    <div class='article-card-body'>
                      <span class='article-category'>
                        <b:if cond='data:post.labels'>
                          <b:loop values='data:post.labels' var='label'>
                            <data:label.name/>
                            <b:if cond='!data:label.isLast'>, </b:if>
                          </b:loop>
                        </b:if>
                      </span>
                      <h3><a expr:href='data:post.url'><data:post.title/></a></h3>
                      <p class='article-excerpt'><data:post.snippets.short/></p>
                      <div class='article-meta'><data:post.timestamp/></div>
                    </div>
                  </article>
                </b:loop>
              </div>
            </div></section>
          </b:if>
          <b:if cond='data:view.isSingleItem'>
            <b:loop values='data:posts' var='post'>
              <div id='reading-progress' role='progressbar' aria-valuemin='0' aria-valuemax='100'/>
              <article class='section'><div class='container'>
                <div class='page-header'><div class='article-header'>
                  <h1><data:post.title/></h1>
                  <div class='article-header-meta'><data:post.author/> | <data:post.timestamp/></div>
                </div></div>
                <div class='article-content'><data:post.body/></div>
              </div></article>
            </b:loop>
          </b:if>
        </b:includable>
      </b:widget>
    </b:section>
  </main>

  <footer class='footer' role='contentinfo'>
    <div class='container'>
      <div class='footer-bottom'>
        <p>&#169; 2026 Pocong.id</p>
      </div>
    </div>
  </footer>
  <button aria-label='Kembali ke atas' id='back-to-top'>&#8593;</button>
</body>
</html>'''

    out = os.path.join(BLOGGER_DIR, 'pocongid-blogger-theme.xml')
    with open(out, 'w', encoding='utf-8') as f:
        f.write(theme)
    print('Theme written:', out, 'size:', os.path.getsize(out))

if __name__ == '__main__':
    patch_articles_reading_progress()
    generate_theme()
