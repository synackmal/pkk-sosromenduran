// include.js — memuat header.html dan footer.html ke semua halaman secara otomatis.
// Cukup edit header.html/footer.html + header.css sekali, semua halaman ikut berubah.
(function () {
  var HERO_PAGES = ['index.html', 'pokja-1.html', 'pokja-2.html', 'pokja-3.html', 'pokja-4.html', 'sekretariat.html', 'keuangan.html'];
  var currentFile = location.pathname.split('/').pop() || 'index.html';

  if (HERO_PAGES.indexOf(currentFile) !== -1) {
    document.body.classList.add('has-hero');
  }

  fetch('header.html')
    .then(function (res) {
      if (!res.ok) throw new Error('header.html tidak ditemukan (status ' + res.status + ')');
      return res.text();
    })
    .then(function (html) {
      var placeholder = document.getElementById('header-placeholder');
      if (!placeholder) return;
      placeholder.outerHTML = html;

      // Tandai menu yang aktif sesuai halaman saat ini
      var links = document.querySelectorAll('#site-header .nav-link');
      links.forEach(function (link) {
        if (link.getAttribute('href') === currentFile) {
          link.setAttribute('aria-current', 'page');
          link.classList.add('border-b-2', 'border-secondary', 'font-bold', 'pb-1');
        }
      });

      // Efek header berubah pas discroll
      var header = document.getElementById('site-header');
      function onScroll() {
        if (window.scrollY > 60) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
      }
      window.addEventListener('scroll', onScroll);
      onScroll();
    })
    .catch(function (err) {
      console.error('Gagal memuat header:', err);
    });

  fetch('footer.html')
    .then(function (res) {
      if (!res.ok) throw new Error('footer.html tidak ditemukan (status ' + res.status + ')');
      return res.text();
    })
    .then(function (html) {
      var placeholder = document.getElementById('footer-placeholder');
      if (!placeholder) return;
      placeholder.outerHTML = html;
    })
    .catch(function (err) {
      console.error('Gagal memuat footer:', err);
    });
})();
