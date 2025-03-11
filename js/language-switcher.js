// Language switching functionality
document.addEventListener('DOMContentLoaded', function () {
  // Get all language selector links
  const languageLinks = document.querySelectorAll('.language-selector a');

  // Add click event listener to each language link
  languageLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const lang = this.getAttribute('data-lang');

      // Redirect to the appropriate language version
      if (lang === 'en') {
        window.location.href = 'index.html';
      } else {
        window.location.href = `index-${lang}.html`;
      }
    });
  });
});