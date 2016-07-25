"use strict";

define([
    'jquery',
    'underscore',
    'mira/helper'
], function ($, _, Helper) {

    var template = '<div><p style="float:center;">Copyright &copy; TecWeb 2014 -- <a href="javascript:{};" style="color:blue">JSON</span> </a></div>';

    var template_script = ' \
var footer_show_json = function (options) { \
      var uri = decodeURIComponent(options.$env.request.hash.substring(6)); \
	var myWindow = window.open(uri, "_blank"); \
};';

var events = { click: 'footer_show_json' };

    return function($parent, name, $context, options, callback){
        //alert (JSON.stringify(options,null,2));
        var hr = document.createElement('hr');
        $parent.append(hr);
        var element = document.createElement('footer');
        element.id = name;
        element.innerHTML = template;
        $parent.append(hr);
        $parent.append(element);        

        var s = document.createElement('script');
        s.type = 'text/javascript';   
        var code = template_script;

        try {
            s.appendChild(document.createTextNode(code));
            document.body.appendChild(s);
        } catch (e) {
            s.text = code;
            document.body.appendChild(s);
        }

        var $element = $(element);
        var context = Helper.build_context($context, options);
        Helper.build_events($element, events, context);

        if(callback){
            callback({
                $children: $parent,
                html: element.outerHTML
            })
        }
    };
});