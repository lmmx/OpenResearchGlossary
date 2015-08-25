(function($){
  $(function(){

    $('.button-collapse').sideNav();

  }); // end of document ready
})(jQuery); // end of jQuery name space

function toggleStuck(){
  var stuck_body = document.querySelector('body.nav-stuck');
  var is_stuck = !(stuck_body === null && typeof stuck_body === "object");
  if (is_stuck) {
    stuck_body.classList.remove('nav-stuck');
  }
  else {
    document.querySelector('body').classList.add("nav-stuck");
  }
}

function scrollchecker() {
	  if (document.body.scrollTop > 50) {
		      if (!document.body.classList.contains("nav-stuck")) {toggleStuck()}
		        }
	    else if (document.body.scrollTop < 50) {
		         if (document.body.classList.contains("nav-stuck")) {toggleStuck()}
			   }
}

document.body.onscroll = scrollchecker
