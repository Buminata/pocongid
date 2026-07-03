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
  <div aria-hidden='true' id='loading-screen' role='status'><div class='loader-logo'>POCONG.ID</div><div class='loader-bar'><div class='loader-bar-fill'/></div></div>
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
