$(function () {
  function animationStart() {}
  setTimeout(animationStart, 250);
  setTimeout(function () {
    window.location.href = "../"; //will redirect to your blog page (an ex: blog.html)
  }, 1000); //will call the function after 2 secs.
});
