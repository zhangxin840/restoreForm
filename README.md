restoreForm
===========

A jQuery plugin to restore form fields using localStorage.

### Live Demo:

http://jsbin.com/okucAjA/2#

### Highlights:

* jQuery plugin best practice from jqSeed. (jqSeed is an unpublished jQuery plugin template project, also made by Zhang Xin).

* If browser does not support localStorage, it will fall back gracefully.

*	Support all kinds of form elements: select, radio button, drop down list, textarea, check box and more. 

*	Organized storage key to prevent conflict. 

*	JSHint code quality.


## Usage:

    $(document).ready(function() {
        var $targetForm = $("#test-form");
        $targetForm.restoreForm();
    });


