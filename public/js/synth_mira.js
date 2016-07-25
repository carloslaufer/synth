"use strict";

//*******************************************
var autor = ""
//*******************************************

//*******************************************
// CONDITION
//*******************************************
var condition = [
  {
    name: 'IndexDefault',
    validate: '$data.type == "index"'
  },
  {
    name: 'ContextNodeDefault',
    validate: '$data.type == "context_node"'
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

        {name: "navigation",
         datasource:'url:<%= "/rest2/landmark" %>', 
         children: [
             {name: "navigation-list", datasource:"$data.content", 
              children: [
                  {name: "navigation-list-item"}
              ]},
         ]},

        {name: "container", 
         datasource:'url:<%= "/rest2/app" %>', 
         children: [
             {name: "head-title",
              children : [
                  {name: "title", bind:'$data.app_name'}
              ]}
         ]},

        {name: "footer"}
     ]};

//******************************************************************************************************************
// LANDING - CONCRETE
//******************************************************************************************************************
var landing_c= 
    {name: "landing",
        head: general_head,
        maps: [
            {name: "navigation", widget: "BootstrapNavigation"},
              {name: "navigation-list", widget: "BootstrapNavigationList"},
                {name: "navigation-list-item", widget: "BootstrapNavigationListItem", value:'$data.label', href:'navigate(encodeURIComponent($data.target_url))'},

            {name: "container", class:'container', style: "margin-top:50px"},
              {name: "head-title", class:'panel-body', alert:'success' },
                {name: "title", tag:'h2', text:'center', value:'document.title=$bind'},

            {name: "footer", widget: "BootstrapFooterJson"}
          ]
    };



//******************************************************************************************************************
// INDEX_DEFAULT - SELECTION
//******************************************************************************************************************
var index_default_s = {
	when: 'IndexDefault',
	abstract: 'index_default',
	concrete: 'index_default'
};

//******************************************************************************************************************
// INDEX_DEFAULT - ABSTRACT
//******************************************************************************************************************
var index_default_a =
    {name: "index_default",
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

                            {name: "link", datasource:'$data.link',
                             children: [
                                 {name: "link-item",
                                  children: [
                                      {name: "link-label", bind:'$data.label', 
                                                      when:'$data.label != $data.value[0].label'},
                                      {name: "link-link", bind:'[$data.value[0].label, $data.value[0].target_url]'}, 
                                  ]}
                             ]},

                            {name: "index", datasource:'$data.index',
                             children: [
                                 {name: "index-item",
                                  children: [
                                      {name: "index-label", bind:'$data.label'}, 
                                      {name: "index-value",
                                       children: [
                                          {name: "index-value-label", bind:'$data.value.label'}, 
                                          {name: "index-value-item", datasource:'$data.value.item',
                                           children: [
                                               {name: "index-value-item-item",
                                                children: [
                                                   {name: "index-value-item-link", bind:'[$data.label, $data.target_url]'}
                                                ]}
                                           ]}
                                       ]}
                                  ]}
                             ]},

                            {name: "array", datasource:'$data.array',
                             children: [
                                 {name: "array-item",
                                  children: [
                                      {name: "array-label", bind:'$data.label'}, 
                                      {name: "array-value", datasource:'$data.value',
                                       children: [
                                           {name: "array-value-item",
                                            children: [
                                                {name: "array-value-item-link", bind:'[$data.label, $data.target_url]'}

                                            ]}
                                       ]}
                                  ]}
                             ]},


                        ]}
                   ]}
              ]}
         ]},

        {name: "footer"}
     ]};

//******************************************************************************************************************
// INDEX_DEFAULT - CONCRETE
//******************************************************************************************************************
var index_default_c = 
    {   name: "index_default",
        head: general_head,
        maps: [
            {name: "navigation", widget: "BootstrapNavigation"},
              {name: "navigation-list", widget: "BootstrapNavigationList"},
              {name: "navigation-list-item", widget: "BootstrapNavigationListItem", value:'$data.label', href:'navigate(encodeURIComponent($data.target_url))'},

            {name: "container", class:'container', style: "margin-top:50px"},
              {name: "head-title", class:'panel-body', alert:'success' },
                {name: "title", tag:'h2', text:'center', value:'$bind' },

                {name: "index"},
                {name: "description", tag:'h2', text:'center', value:'$bind' },
                {name: "parameter", tag:'h3', text:'center'},
                  {name: "parameter-item"},
                    {name: "parameter-item-name", tag:'span', value:'$bind + ": "'},
                    {name: "parameter-item-value", tag:'span', value:'$bind'},

              {name: "content", widget: "BootstrapSimple"},
                {name: "item-panel"},
                  {name: 'item',  class:'panel-body', alert:'success'},

                    {name: "link"},
                      {name: "link-item", tag:'p'},
                        {name: "link-label", tag:'span', text:'left',  value:'$bind + ": "' },
                        {name: "link-link", tag:'a', text:'right', value:'$bind[0]', 
                                     href: 'navigate( encodeURIComponent($bind[1]))',
                                     when:'$bind[1] != ""'}, 
                        {name: "link-link", tag:'span', text:'right', value:'$bind[0]',
                                     when:'$bind[1] == ""'}, 

                    {name: "index"},
                      {name: "index-item", tag:'p'},
                        {name: "index-label", tag:'p', text:'left',  value:'$bind' },
                        {name: "index-value"},
                          {name: "index-value-item"},
                            {name: "index-value-item-item", tag:'p'},
                              {name: "index-value-item-link", tag:'a', style:'margin-left:15px;', value:'$bind[0]', 
                                     href: 'navigate( encodeURIComponent($bind[1]))'}, 

                    {name: "array"},
                      {name: "array-item", tag:'p'},
                        {name: "array-label", text:'left',  value:'$bind' },
                        {name: "array-value"},
                          {name: "array-value-item"},
                            {name: "array-value-item-item", tag:'p'},
                              {name: "array-value-item-link", tag:'a', style:'margin-left:15px;', value:'$bind[0]', 
                                     href: 'navigate( encodeURIComponent($bind[1]))'},

            {name: "footer", widget: "BootstrapFooterJson"}
        ]
    };

//******************************************************************************************************************
// CONTEXT_NODE_DEFAULT - SELECTION
//******************************************************************************************************************
var context_node_default_s = {
	when: 'ContextNodeDefault',
	abstract: 'context_node_default',
	concrete: 'context_node_default'
};

//******************************************************************************************************************
// CONTEXT_NODE_DEFAULT - ABSTRACT
//******************************************************************************************************************
var context_node_default_a =
    {name: "context_node_default",
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
                                 {name: "parameter-item-value", bind:'$data.value'},
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

                            {name: "datatype", datasource:'$data.content.item.datatype',
                             children: [
                                 {name: "datatype-item",
                                  children: [
                                      {name: "datatype-label", bind:'$data.label'},
                                      {name: "datatype-value", bind:'$data.value'}
                                  ]}
                             ]},

                            {name: "computed", datasource:'$data.content.item.computed',
                             children: [
                                 {name: "computed-item",
                                  children: [
                                      {name: "computed-label", bind:'$data.label'}, 
                                      {name: "computed-link", bind:'[$data.value.label, $data.value.target_url]'}, 
                                  ]}
                             ]},

                            {name: "index", datasource:'$data.content.item.index',
                             children: [
                                 {name: "index-item",
                                  children: [
                                      {name: "index-label", bind:'$data.label'}, 
                                      {name: "index-value",
                                       children: [
                                          {name: "index-value-label", bind:'$data.value.label'}, 
                                          {name: "index-value-item", datasource:'$data.value.item',
                                           children: [
                                               {name: "index-value-item-item",
                                                children: [
                                                   {name: "index-value-item-link", bind:'[$data.label, $data.target_url]'}
                                                ]}
                                           ]}
                                       ]}
                                  ]}
                             ]}
                        ]}
                   ]}
              ]}
         ]},

        {name: "footer"}

     ]};

//******************************************************************************************************************
// CONTEXT_NODE_DEFAULT - CONCRETE
//******************************************************************************************************************
var context_node_default_c = 
    {   name: "context_node_default",
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

                    {name: "datatype"},
                      {name: "datatype-item", tag:'p'},
                        {name: "datatype-label", tag:'span', text:'left',  value:'$bind + ": "' },
                        {name: "datatype-value", tag:'span', value:'$bind' },

                    {name: "computed"},
                      {name: "computed-item", tag:'p'},
                        {name: "computed-label", tag:'span', text:'left',  value:'$bind + ": " ' },
                        {name: "computed-link", tag:'span', value:'$bind[0]' },

                    {name: "index"},
                      {name: "index-item", tag:'p'},
                        {name: "index-label", tag:'span', text:'left',  value:'$bind' },
                        {name: "index-value"},
                          {name: "index-value-item"},
                            {name: "index-value-item-item"},
                              {name: "index-value-item-link", tag:'a', style:'margin-left:15px;', value:'$bind[0] + "<br/>"', 
                                     href: 'navigate( encodeURIComponent($bind[1]))'}, 

            {name: "footer", widget: "BootstrapFooterJson"}
        ]
    };

//******************************************************************************************************************
// INTERFACE LIST
//******************************************************************************************************************
var abstract_interface = [
	landing_a, 
	index_default_a,
	context_node_default_a
];

var concrete_interface = [
	landing_c, 
	index_default_c,
	context_node_default_c
];

//*******************************************
// SELECTION
//*******************************************
var select_interface = [
	index_default_s,
	context_node_default_s
];

//*******************************************
// CONFIG
//*******************************************
var conf = {
    events: {show_json: 
                 function (options) {
                     var uri = decodeURIComponent(options.$env.request.hash.substring(6));
                     var myWindow = window.open(uri, "_blank");
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
