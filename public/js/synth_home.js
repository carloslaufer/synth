"use strict";

//*******************************************
// CONDITION
//*******************************************
var condition = [
];

//*******************************************
// INCLUDES
//*******************************************
var general_head = [
            {name: 'aqueous_css', widget:'Head', href:'/css/aqueous.css', tag: 'style',  media: "screen,projection"},
            {name: 'title', widget:'Title', value: '"Synth"'}
];

//******************************************************************************************************************
// LANDING - ABSTRACT
//******************************************************************************************************************
var landing_a =
    {name: "landing",
     widgets: [
        {name: "wrapper",
         children: [
             {name: "innerwrapper",
              children: [
                  {name: "header",
                   children: [
                       {name: "app", datasource:'url:<%= "/rest2/app" %>', 
                        children: [
                            {name: "title", bind:'[$data.app_name, "/mira.html?app=synth_home"]'}
                        ]},
                       {name: "nav", datasource:'url:<%= "/rest2/landmark" %>', 
                        children: [
                            {name: "li", datasource:"$data.content", 
                             children: [
                                 {name: "a"}
                             ]}
                        ]}
                   ]}
              ]}
         ]}
     ]};

//******************************************************************************************************************
// LANDING - CONCRETE
//******************************************************************************************************************
var landing_c= 
    {name: "landing",
        head: general_head,
        maps: [
        {name: "wrapper", class:"wrapper"},
          {name: "innerwrapper", class: "innerwrapper"},
            {name: "header", class: "header"},
              {name: "app", tag: 'span'},
                {name: "title", tag:'span', value:'"<h1><a href=" + $bind[1] + ">" + $bind[0] + "</a></h1><h2 style=float:right>Synth - Semantic Web application development environment</h2>"'},
              {name: "nav", tag: 'ul', class: "nav"},
                {name: "li", tag:'li'},
                  {name: "a", tag:'a', style:'padding:13px;', value:'$data.label', href:'$data.target_url.replace("/rest2/","/execute/")'}
        ]
    };

//******************************************************************************************************************
// INTERFACE LIST
//******************************************************************************************************************
var abstract_interface = [
	landing_a
];

var concrete_interface = [
	landing_c
];

//*******************************************
// SELECTION
//*******************************************
var select_interface = [
];

//*******************************************
// CONFIG
//*******************************************

var conf = {
    events: {
    }
};

var ajaxSetup = {
};

if(typeof define === 'function') {
    define([
        "jquery",
        "bootstrap",
        'mira/init',
        'mira/helper'
    ], function ($, $bootstrap, Mira, Helper) {

        return function App() {
            var app = new Mira.Application(abstract_interface, concrete_interface, condition, select_interface, conf);
            Mira.Widget.setDefault('BootstrapSimple')

        };
    });

} else {
    exports.ajaxSetup = ajaxSetup;
    exports.abstracts = abstract_interface;
    exports.mapping = concrete_interface;
    exports.selection = select_interface;
    exports.rules = condition;
}
