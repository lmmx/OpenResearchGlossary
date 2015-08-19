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
	  if (document.body.scrollTop > 150) {
		      if (!document.body.classList.contains("nav-stuck")) {toggleStuck()}
		        }
	    else if (document.body.scrollTop < 50) {
		         if (document.body.classList.contains("nav-stuck")) {toggleStuck()}
			   }
}

document.body.onscroll = scrollchecker

function FilterGlossary(val) {
  
        var gloss_terms = document.querySelectorAll('li[gloss-term], li.declaration, li.resource, ul#oad-listings li');
        // All words in the glossary (renew list per character typed)

        for (i=0; i<gloss_terms.length; i++) {
          var termmatch = gloss_terms[i].textContent.toLowerCase().match(val.toLowerCase());
          if (termmatch === null && typeof termmatch === "object") {
            // if the term has no match to search value, i.e. per-item match(val) returns null, remove entry from DOM
            gloss_terms[i].classList.add("search-hidden");
          } else {
            // else it's a potential match so leave it in the DOM, or add back into the DOM if removed
            gloss_terms[i].classList.remove("search-hidden");
          }
        }

        if (document.querySelector('ul#oad-listings li:not(.search-hidden)')) {
          // there's at least one open access directory listing, ensure the OAD preamble is shown
          document.querySelector('li#oad-listings-preamble').classList.remove('search-hidden');
        }

        // Remove and/or reinstate section headers dependent on search results

        var has_declarations = document.querySelector('li.declaration:not(.search-hidden)');
        if (has_declarations === null && typeof has_declarations === "object") {
          // all declarations are hidden, so also hide the "Declarations and principles" header
          document.querySelector('#declarations').classList.add('search-hidden');
        } else {
          document.querySelector('#declarations').classList.remove('search-hidden');
        }

        var has_sources = document.querySelector('li.source:not(.search-hidden)');
        if (has_sources === null && typeof has_sources === "object") {
          // all sources are hidden, so also hide the "Sources" header
          document.querySelector('#sources').classList.add('search-hidden');
        } else {
          document.querySelector('#sources').classList.remove('search-hidden');
        }

        var has_resources = document.querySelector('li.resource:not(.search-hidden)');
        if (has_resources === null && typeof has_resources === "object") {
          // all resources are hidden, so also hide the "Resources" header
          document.querySelector('#resources').classList.add('search-hidden');
        } else {
          document.querySelector('#resources').classList.remove('search-hidden');
        }

        // Check if there were no search results

        var has_results = document.querySelector('li[gloss-term]:not(.search-hidden), li.declaration:not(.search-hidden), li.resource:not(.search-hidden), ul#oad-listings li:not(.search-hidden)');
        var not_found_panel = document.querySelector('#search-fail-panel');
        if (has_results === null && typeof has_results === "object") {
          // there are no search results, so show a message
          var not_found_link = not_found_panel.querySelector('a');
          not_found_link.setAttribute('href', String(not_found_link.getAttribute('data-href-prefix')+val));
          not_found_panel.classList.add('search-fail');
        } else {
          // there are search results, hide the message
          not_found_panel.classList.remove('search-fail');
        }
}

function clearSearch() {
      var search_bar = document.getElementById('search')
      search_bar.value = '';
      FilterGlossary('');
}
