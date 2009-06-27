// $Id$

jQuery.ajaxMarkup = {
  cache: {},//store recent output

  //string hashing used for creating cache ids. Prof. Daniel J. Bernstein's algorithm.
  hash: function(str) {
    for(var c, i = 0, h = 5381; c = str.charCodeAt(i); i++) {
      h = (h << 5) + h + c;
    }
    return h & 0x7FFFFFFF;
  },

  //get markup after processing the input by the format..
  //The "calblack" is called with 3 parameters: output, status(true|false), xmlHttpRequest
  get: function(input, format, callback) {
    var hash = this.hash, cache = this.cache;
    //check if complete function exists.
    if (!$.isFunction(callback)) {
      return;
    }
    //check input
    var input = $.trim(input);
    //return empty output for empty input.
    if (!input) {
      return callback('', true);
    }
    //check cache
    var cid = format + ':' + hash(input);
    if (typeof cache[cid] != 'undefined') {
      return callback(cache[cid], true);
    }
    //check required parameters for ajax request.
    if (!this.url || !this.token) {
      return callback(Drupal.t('Some required parameters are missing for an ajax request.'), false);
    }
    //request filtered output.
    var output = '', status = false;
    $.ajax({
      url: Drupal.settings.ajaxMarkup.url,
      data: {input: input, format: format, token: Drupal.settings.ajaxMarkup.token},
      type: 'POST',
      dataType: 'json',
      success: function(response) {
        output = cache[cid] = response.output || '';
        status = true;
      },
      error: function(request) {
        output = Drupal.ahahError(request, this.url);
      },
      complete: function(request) {
        callback.call(this, output, status, request);
      }
    });
  }
};

//Helper function to find the input format of a given textarea. defaults to 0 when there is no format.
jQuery.fn.inputFormat = function() {
  if (!this[0]) {
    return 0;
  }
  var i, format = 0, T = this[0], name = T.name || '';
  if (name == 'body' || name == 'teaser_js' || name == 'comment') {//node body, teaser and comment fields
    format = $('input[name=format]:checked', T.form).val() || 0;
  }
  else if ((i = name.indexOf('[value]')) > 0) {//cck fields
    format = $('input[name="'+ name.substring(0, i) +'[format]"]:checked', T.form).val() || 0;
  }
  return format;
};

//set dynamic parameters(url & token).
$(document).ready(function() {
  $.extend($.ajaxMarkup, Drupal.settings.ajaxMarkup);
});