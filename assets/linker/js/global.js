$(document).ready(function() {
  $('a[data-toggle="tooltip"]').tooltip();
  $('div[role="navigation"] ul.nav.navbar-nav li > a[href="' + document.location.pathname + '"]').parent().addClass('active');
});
