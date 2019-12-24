// **header style-1**
// 
$(function () {

  // Переменные для работы с меню
  var $menuToggle = $('.menu-button'),
    $menuWrap = $('.menu-wrap');

  // Тогл меню при нажатии на кнопку
  $menuToggle.on('click', function () {
    $(this).toggleClass('active');
    $menuWrap.fadeToggle(150);
  });

  // Закрыть при клике вне меню
  $(this).on('click', function (e) {
    var $menu = $('.menu');

    if (!$menu.is(e.target) && $menu.has(e.target).length === 0) {
      $menuToggle.removeClass('active');
      $menuWrap.fadeOut(150);
    }
  });
  
});