Ajax Markup
===========

Provides an API for generating filtered markup using ajax. It supports BBCode, Markdown, Textile, HTML, PHP, and any other markup system provided as a Backdrop module. It provides an ajaxified version of check_markup(). Ajax Markup also fully integrated into BUEditor.

INSTALLATION
------------

- Install this module using the official Backdrop CMS instructions at
  https://backdropcms.org/guide/modules

USE
---

1. Load the API by calling ajax_markup_on() at server side.

if (module_invoke('ajax_markup', 'on')) {
  drupal_add_js(YOUR_SCRIPT.js);
}

2. Inside YOUR_SCRIPT.js call $.ajaxMarkup

$.ajaxMarkup(INPUT, INPUT_FORMAT, CALLBACK);

function CALLBACK(OUTPUT, SUCCESS, REQUEST) {
  if (SUCCESS) $('div#preview').html(OUTPUT);
  else alert(OUTPUT);
}

INPUT: String of which you want to get a filtered version.
INPUT_FORMAT: Integer representing one of the drupal input formats. Provide 0 for the default.
CALLBACK: Function to send the output after the request.
OUTPUT: String that is the filtered INPUT. Content depends on the INPUT_FORMAT and SUCCESS state.
SUCCESS: Boolean representing the status of the request.
REQUEST: XmlHttpRequest. Not available when the OUTPUT is retrieved from the cache.

ALSO:
API provides a function that tries to get the INPUT_FORMAT of a textarea.

$.ajaxMarkup.getFormat('#edit-body'); //returns 0 (the default format) when there is no input format for the element.

ACCESS
------

Users must have "access ajax markup" permission.
Users must have access to the supplied INPUT_FORMAT, otherwise the default format is used.

License
-------

This project is GPL v2 software. See the LICENSE.txt file in this directory for
complete text.

Current Maintainers
-------------------

This module is currently seeking maintainers.

Credits
-------

Ported to Backdrop by Herb v/d Dool (https://github.com/herbdool/)

This module was originally written for Drupal (https://drupal.org/project/ajax_markup). Drupal maintainers are: [ufku](https://www.drupal.org/u/ufku).
