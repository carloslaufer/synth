"use strict";

//*******************************************
var autor = "PUT HERE THE AUTHOR'S NAME"
//*******************************************

//*******************************************
// CONDITION
//*******************************************
var condition = [
  {
    name: 'Index',
    validate: '$data.id == "EventsIdx"'
  },
  {
    name: 'ContextNode',
    validate: '$data.id == "Events"'
  }
];

//*******************************************
// INCLUDES
//*******************************************
var general_head = [
            {name: 'main_css', widget:'Head', href:'css/bootstrap.css', tag: 'style'},
            {name: 'viewport', widget:'Meta', content:'width=device-width, initial-scale=1'},
            {name: 'title', widget:'Title', value: '$data.app_name'}
];

//******************************************************************************************************************
// LANDING - ABSTRACT
//******************************************************************************************************************
var landing_a =
    {name: "landing",
     widgets: [

        {name: "navigation", datasource:'url:<%= "/rest2/landmark" %>', 
         children: [
             {name: "navigation-list", datasource:"$data.content", 
              children: [
                  {name: "navigation-list-item"}
              ]}
         ]},


        {name: "app", 
         datasource:'url:<%= "/rest2/app" %>', 
         children: [
             {name: "head-title",
              children : [
                  {name: "title", bind:'$data.app_name'},
              ]}
         ]},

        {name: "footer"},

        {name: "author", bind:'autor'},

        {name: "hide"}

     ]};

//******************************************************************************************************************
// LANDING - CONCRETE
//******************************************************************************************************************
var landing_c= 
    {name: "landing",
        head: general_head,
        maps: [
            {name: "navigation", widget: "BootstrapNavigation", when: 'muda'},
              {name: "navigation-list", widget: "BootstrapNavigationList"},
                {name: "navigation-list-item", widget: "BootstrapNavigationListItem", value:'$data.label', href:'navigate(encodeURIComponent($data.target_url))'},

            {name: "app", class:'container', style: "margin-top:50px", when: 'muda'},
              {name: "head-title", class:'panel-body', alert:'success' },
                {name: "title", tag:'h2', text:'center', value:'document.title=$bind'},

            {name: "footer", widget: "BootstrapFooterJson", when: 'muda'},

            {name: "author", tag:'p', value: '$bind', when: 'muda'},

            {name: "hide", tag:'a', value: '"Hide"', href: 'javascript:{}', events: { click: 'show_hide' }, when: 'muda'},
            {name: "hide", tag:'a', value: '"Show"', href: 'javascript:{}', events: { click: 'show_hide' }, when: '!muda'}



        ]
    };

//******************************************************************************************************************
// NOT FOUND - ABSTRACT
//******************************************************************************************************************
var not_found_a =
    {name: "not_found",
     widgets: [

        {name: "navigation", datasource:'url:<%= "/rest2/landmark" %>', 
         children: [
             {name: "navigation-list", datasource:"$data.content", 
              children: [
                  {name: "navigation-list-item"}
              ]}
         ]},


        {name: "app", 
         datasource:'url:<%= "/rest2/app" %>', 
         children: [
             {name: "head-title",
              children : [
                  {name: "title", bind:'$data.app_name'}
              ]}
         ]},

        {name: "footer"},

        {name: "author", bind:'autor'}

     ]};

//******************************************************************************************************************
// NOT_FOUND - CONCRETE
//******************************************************************************************************************
var not_found_c= 
    {name: "not_found",
        head: general_head,
        maps: [
            {name: "navigation", widget: "BootstrapNavigation"},
              {name: "navigation-list", widget: "BootstrapNavigationList"},
                {name: "navigation-list-item", widget: "BootstrapNavigationListItem", value:'$data.label', href:'navigate(encodeURIComponent($data.target_url))'},

            {name: "app", class:'container', style: "margin-top:50px"},
              {name: "head-title", class:'panel-body', alert:'success' },
                {name: "title", tag:'h2', text:'center', value:'$bind + "<br/><br/><span style=color:red;>No interface was selected!</span>" '},

            {name: "footer", widget: "BootstrapFooterJson"},

            {name: "author", tag:'p', value: '$bind'}

        ]
    };

//******************************************************************************************************************
// INDEX - SELECTION
//******************************************************************************************************************
var index_s = {
	when: 'Index',
	abstract: 'index',
	concrete: 'index'
};

//******************************************************************************************************************
// INDEX - ABSTRACT
//******************************************************************************************************************
var index_a =
    {name: "index",
     widgets: [
        {name: "navigation", datasource:'url:<%= "/rest2/landmark" %>', 
         children: [
             {name: "navigation-list", datasource:"$data.content", 
              children: [
                  {name: "navigation-list-item"}
              ]}
         ]},

        {name: "container", 
         children: [
             {name: "head-title", 
              children: [
                  {name: "title", bind:'$data.app_name'}, 
                  {name: "description", bind:'$data.label'},
                  {name: "parameter", datasource:'$data.parameter',
                   children: [
                       {name: "parameter-item",
                        children: [
                            {name: "parameter-item-name", bind:'$data.name'},
                            {name: "parameter-item-value", bind:'$data.value'}
                       ]}
                   ]}
              ]},

             {name: "content", datasource:'$data.content',
              children: [
                 {name: "item-panel", 
                   children: [
                       {name: "item",
                        children: [





                        ]}
                   ]}
              ]}
         ]},

        {name: "footer"},

        {name: "author", bind:'autor'}

     ]};

//******************************************************************************************************************
// INDEX - CONCRETE
//******************************************************************************************************************
var index_c = 
    {   name: "index",
        head: general_head,
        maps: [
            {name: "navigation", widget: "BootstrapNavigation"},
              {name: "navigation-list", widget: "BootstrapNavigationList"},
                {name: "navigation-list-item", widget: "BootstrapNavigationListItem", value:'$data.label', href:'navigate(encodeURIComponent($data.target_url))'},

            {name: "container", class:'container', style: "margin-top:50px"},
              {name: "head-title", class:'panel-body', alert:'success' },
                {name: "title", tag:'h2', text:'center', value:'$bind' },
                {name: "description", tag:'h2', text:'center', value:'$bind' },
                {name: "parameter", tag:'h3', text:'center'},
                  {name: "parameter-item"},
                    {name: "parameter-item-name", tag:'span', value:'$bind + ": "'},
                    {name: "parameter-item-value", tag:'span', value:'$bind'},

              {name: "content", widget: "BootstrapSimple"},
                {name: "item-panel"},
                  {name: 'item',  class:'panel-body', alert:'success'},





            {name: "footer", widget: "BootstrapFooterJson"},

            {name: "author", tag:'p', value: '$bind'}

        ]
    };

//******************************************************************************************************************
// CONTEXT_NODE - SELECTION
//******************************************************************************************************************
var context_node_s = {
	when: 'ContextNode',
	abstract: 'context_node',
	concrete: 'context_node'
};

//******************************************************************************************************************
// CONTEXT_NODE - ABSTRACT
//******************************************************************************************************************
var context_node_a =
    {name: "context_node",
     widgets: [
        {name: "navigation", datasource:'url:<%= "/rest2/landmark" %>', 
         children: [
             {name: "navigation-list", datasource:"$data.content", 
              children: [
                  {name: "navigation-list-item"}
              ]}
         ]},

        {name: "container", 
         children: [
             {name: "head-title", 
              children: [
                  {name: "title", bind:'$data.app_name'}, 
                  {name: "context",
                   children: [
                       {name: "context-label", bind:'$data.label'},
                       {name: "parameter", datasource:'$data.parameter',
                        children: [
                            {name: "parameter-item",
                             children: [
                                 {name: "parameter-item-name", bind:'$data.name'},
                                 {name: "parameter-item-value", bind:'$data.value'}
                            ]}
                        ]}
                   ]},
                  {name: "description", bind:'$data.content.label'},
                  {name: "node-navigation",
                   children: [
                      {name: "previous"}, 
                      {name: "next"}
                   ]}
              ]},

             {name: "content",
              children: [
                 {name: "item-panel", 
                   children: [
                       {name: "item",
                        children: [





                        ]}
                   ]}
              ]}
         ]},

        {name: "footer"},

        {name: "author", bind:'autor'}

     ]};

//******************************************************************************************************************
// CONTEXT_NODE - CONCRETE
//******************************************************************************************************************
var context_node_c = 
    {   name: "context_node",
        head: general_head,
        maps: [
            {name: "navigation", widget: "BootstrapNavigation"},
              {name: "navigation-list", widget: "BootstrapNavigationList"},
                {name: "navigation-list-item", widget: "BootstrapNavigationListItem", value:'$data.label', href:'navigate(encodeURIComponent($data.target_url))'},

            {name: "container", class:'container', style: "margin-top:50px"},
              {name: "head-title", class:'panel-body', alert:'success' },
                {name: "title", tag:'h2', text:'center', value:'$bind' },
                {name: "context", tag:'h3', text:'center',},
                  {name: "context-label", value:'$bind'},
                  {name: "parameter"},
                    {name: "parameter-item", tag:'span', text:'center'},
                      {name: "parameter-item-name", tag:'span', text:'center', value:'$bind + ": "'},
                      {name: "parameter-item-value", tag:'span', text:'center', value:'$bind'},
                {name: "description", tag:'h2', text:'center', value:'$bind' },

                {name: "node-navigation", tag:'p', text:'center'},
                  {name: "previous", tag:'span', style:'float:left;', value:'"<<"', when:'$data.content.navigation.previous == null' }, 
                  {name: "previous", tag:'a', style:'float:left;', value:'" << " + $data.content.navigation.previous.label', 
                             href: 'navigate( encodeURIComponent($data.content.navigation.previous.target_url))', when:'$data.content.navigation.previous != null' }, 
                  {name: "next", tag:'span', style:'float:right;', value:'">>"', when:'$data.content.navigation.next == null' }, 
                  {name: "next", tag:'a', style:'float:right;', value:'$data.content.navigation.next.label + " >>"',
                             href: 'navigate( encodeURIComponent($data.content.navigation.next.target_url))', when:'$data.content.navigation.next != null' }, 

              {name: "content", widget: "BootstrapSimple"},
                {name: "item-panel"},
                  {name: 'item',  class:'panel-body', alert:'success'},





            {name: "footer", widget: "BootstrapFooterJson"},

            {name: "author", tag:'p', value: '$bind'}

        ]
    };

//******************************************************************************************************************
// INTERFACE LIST
//******************************************************************************************************************
var abstract_interface = [
	landing_a, 
	not_found_a, 
	index_a,
	context_node_a
];

var concrete_interface = [
	landing_c, 
	not_found_c, 
	index_c,
	context_node_c
];

//*******************************************
// SELECTION
//*******************************************
var select_interface = [
	index_s,
	context_node_s
];

//*******************************************
// CONFIG
//*******************************************

var muda = true;

var conf = {
    events: {show_json: 
                 function (options) {
                     var uri = decodeURIComponent(options.$env.request.hash.substring(6));
                     var myWindow = window.open(uri, "_blank");
                 },
             show_hide:
                 function(options) {
	               muda = !muda;
	               options.$dataObj.trigger('change');
                 }
    }
};

var ajaxSetup = {
};

if(typeof define === 'function') {
    define([
        "jquery",
        "bootstrap",
        'mira/init',
        'underscore',
        'mira/helper'
    ], function ($, $bootstrap, Mira, _, Helper) {

        return function App() {
            var app = new Mira.Application(abstract_interface, concrete_interface, condition, select_interface, conf);
            Mira.Widget.setDefault('BootstrapSimple')

            Mira.Widget.register({
                BootstrapFooterJson: function($parent, name, $context, options, callback){
                    var template = '<div><p style="float:center;">Copyright &copy; TecWeb 2014 -- ' ;
                    template += '<a href="javascript:{};" style="color:blue">JSON</span> </a></div>';

                    var events = { click: 'show_json' };

                    var hr = document.createElement('hr');
                    $parent.append(hr);
                    var element = document.createElement('footer');
                    element.id = name;
                    element.innerHTML = template;
                    $parent.append(hr);
                    $parent.append(element);        

                    var $element = $(element);
                    var context = Helper.build_context($context, options);
                    Helper.build_events($element, events, context);

                    if(callback){
                        callback({
                            $children: $parent,
                            html: element.outerHTML
                        })
                    }
                }
            });

        };
    });

} else {
    exports.ajaxSetup = ajaxSetup;
    exports.abstracts = abstract_interface;
    exports.mapping = concrete_interface;
    exports.selection = select_interface;
    exports.rules = condition;
}
