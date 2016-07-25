"use strict";

//*******************************************
var autor = "";
var non_default_interface = true;

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
    name: 'Index_Events',
    validate: '($data.id == "EventsIdx") && non_default_interface'
  },
  {
    name: 'ContextNodeDefault',
    validate: '$data.type == "context_node"'
  },
  {
    name: 'ContextNode_Events',
    validate: '($data.id == "Events") && non_default_interface'
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

        {name: "app", 
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

            {name: "app", class:'container', style: "margin-top:50px"},
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

        {name: "footer"},
        {name: "change_interface", bind: '"Change to particular interface"', when:'$data.id == "EventsIdx"'}

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


            {name: "footer", widget: "BootstrapFooterJson"},
            {name: "change_interface", tag:'a', href:'javascript:{};', value:'$bind', events: { click: 'change_interface' } },

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

        {name: "footer"},
        {name: "change_interface", bind: '"Change to particular interface"', when:'$data.id == "Events"'}

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


            {name: "footer", widget: "BootstrapFooterJson"},
            {name: "change_interface", tag:'a', href:'javascript:{};', value:'$bind', events: { click: 'change_interface' } },

        ]
    };

//******************************************************************************************************************
// INDEX_EVENTS - SELECTION
//******************************************************************************************************************
var index_events_s = {
	when: 'Index_Events',
	abstract: 'index_events',
	concrete: 'index_events'
};

//******************************************************************************************************************
// INDEX_EVENTS - ABSTRACT
//******************************************************************************************************************
var index_events_a =
    {name: "index_events",
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



                             {name: "event", bind:'[$data.link[0].label, $data.link[0].value[0].target_url]'}, 
                             {name: "when-item",
                              children: [
                                  {name: "when-label", bind:'$data.link[1].label'}, 
                                  {name: "when-text", bind:'$data.link[1].value[0].label'}
                              ]},
                             {name: "where-item",
                              children: [
                                  {name: "where-label", bind:'$data.link[2].label'}, 
                                  {name: "where-text", bind:'$data.link[2].value[0].label'}
                              ]}




                        ]}
                   ]}
              ]}
         ]},

        {name: "footer"},
        {name: "change_interface", bind: '"Change to default interface"'}

     ]};

//******************************************************************************************************************
// INDEX_EVENTS - CONCRETE
//******************************************************************************************************************
var index_events_c = 
    {   name: "index_events",
        head: general_head,
        maps: [
            {name: "navigation", widget: "BootstrapNavigation"},
              {name: "navigation-list", widget: "BootstrapNavigationList"},
                {name: "navigation-list-item", widget: "BootstrapNavigationListItem", value:'$data.label', href:'navigate(encodeURIComponent($data.target_url))'},

            {name: "container", class:'container', style: "margin-top:50px"},
              {name: "head-title", class:'panel-body', alert:'danger' },
                {name: "title", tag:'h2', text:'center', value:'$bind'},
                {name: "description", tag:'h2', text:'center', value:'$bind' },
                {name: "parameter", tag:'h3', text:'center'},
                  {name: "parameter-item"},
                    {name: "parameter-item-name", tag:'span', value:'$bind + ": "'},
                    {name: "parameter-item-value", tag:'span', value:'$bind'},

              {name: "content", widget: "BootstrapSimple"},
                {name: "item-panel"},
                  {name: 'item',  class:'panel-body', alert:'danger'},

                    {name: "event", tag:'a', class:'lead', text:'left',  value:'$bind[0]', 
                      href: 'navigate(encodeURIComponent($bind[1]))' },

                    {name: "when-item", tag:'p'},
                    {name: "when-label", tag:'span', text:'left', value:'$bind + ": "' },
                    {name: "when-text", tag:'span', value:'$bind' },

                    {name: "where-item", tag:'p'},
                    {name: "where-label", tag:'span', text:'left', value:'$bind + ": "' },
                    {name: "where-text", tag:'span', value:'$bind'},

            {name: "footer", widget: "BootstrapFooterJson"},
            {name: "change_interface", tag:'a', href:'javascript:{};', value:'$bind', events: { click: 'change_interface' } },

        ]
    };

//******************************************************************************************************************
// CONTEXT_NODE_EVENTS - SELECTION
//******************************************************************************************************************
var context_node_events_s = {
	when: 'ContextNode_Events',
	abstract: 'context_node_events',
	concrete: 'context_node_events'
};

//******************************************************************************************************************
// CONTEXT_NODE_EVENTS - ABSTRACT
//******************************************************************************************************************
var context_node_events_a =
    {name: "context_node_events",
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



                            {name: "event-item",
                             children: [
                                 {name: "event-label", bind:'$data.content.item.datatype[0].label'}, 
                                 {name: "event-text", bind:'$data.content.item.datatype[0].value'}
                             ]},
                            {name: "event-start-item",
                             children: [
                                 {name: "event-start-label", bind:'$data.content.item.datatype[1].label'}, 
                                 {name: "event-start-text", bind:'$data.content.item.datatype[1].value'}
                             ]},
                            {name: "event-stop-item",
                             children: [
                                 {name: "event-stop-label", bind:'$data.content.item.datatype[2].label'}, 
                                 {name: "event-stop-text", bind:'$data.content.item.datatype[2].value'}
                             ]},
                            {name: "event-summary-item",
                             children: [
                                 {name: "event-summary-label", bind:'$data.content.item.datatype[3].label'}, 
                                 {name: "event-summary-text", bind:'$data.content.item.datatype[3].value'}
                             ]},
                            {name: "event-when-item",
                             children: [
                                 {name: "event-when-label", bind:'$data.content.item.computed[0].label'}, 
                                 {name: "event-when-text", bind:'$data.content.item.computed[0].value.label'}
                             ]},
                            {name: "event-where-item",
                             children: [
                                 {name: "event-where-label", bind:'$data.content.item.computed[1].label'},
                                 {name: "event-where-text", bind:'$data.content.item.computed[1].value.label'}
                             ]},
                            {name: "presenters-item",
                             children: [
                                 {name: "presenters-label", bind:'$data.content.item.index[0].label'}, 
                                 {name: "presenters-list",
                                  children: [
                                      {name: "presenters-list-label"}, 
                                      {name: "presenters-list-item",
                                       datasource:"$data.content.item.index[0].value.item",
                                       children: [
                                           {name: "presenters-list-item-link", bind:'[$data.label, $data.target_url]'}, 
                                       ]}
                                  ]}
                             ]},
                            {name: "organizations-item",
                             children: [
                                 {name: "organizations-label", bind:'$data.content.item.index[1].label'}, 
                                 {name: "organizations-list",
                                  children: [
                                      {name: "organizations-list-label"}, 
                                      {name: "organizations-list-item",
                                       datasource:"$data.content.item.index[1].value.item",
                                       children: [
                                           {name: "organizations-list-item-link", bind:'[$data.label, $data.target_url]'}, 
                                       ]}
                                  ]}
                             ]}





                        ]}
                   ]}
              ]}
         ]},

        {name: "footer"},
        {name: "change_interface", bind: '"Change to default interface"'}

     ]};

//******************************************************************************************************************
// CONTEXT_NODE_EVENTS - CONCRETE
//******************************************************************************************************************
var context_node_events_c = 
    {   name: "context_node_events",
        head: general_head,
        maps: [
            {name: "navigation", widget: "BootstrapNavigation"},
              {name: "navigation-list", widget: "BootstrapNavigationList"},
               {name: "navigation-list-item", widget: "BootstrapNavigationListItem", value:'$data.label', href:'navigate(encodeURIComponent($data.target_url))'},

            {name: "container", class:'container', style: "margin-top:50px"},
              {name: "head-title", class:'panel-body', alert:'danger' },
                {name: "title", tag:'h2', text:'center', value:'$bind'},
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
                  {name: 'item',  class:'panel-body', alert:'danger'},



                    {name: "event-item", tag:'p'},
                    {name: "event-label", tag:'span', text:'left',  value:'$bind + ": "' },
                    {name: "event-text", tag:'span', value:'$bind' },

                    {name: "event-start-item", tag:'p'},
                    {name: "event-start-label", tag:'span', text:'left',  value:'$bind + ": "' },
                    {name: "event-start-text", tag:'span', value:'$bind' },

                    {name: "event-stop-item", tag:'p'},
                    {name: "event-stop-label", tag:'span', text:'left',  value:'$bind + ": "' },
                    {name: "event-stop-text", tag:'span', value:'$bind' },

                    {name: "event-summary-item", tag:'p'},
                    {name: "event-summary-label", tag:'span', text:'left',  value:'$bind + ": "' },
                    {name: "event-summary-text", tag:'span', value:'$bind' },

                    {name: "event-when-item", tag:'p'},
                    {name: "event-when-label", tag:'span', text:'left', value:'$bind + ": "' },
                    {name: "event-when-text", tag:'span', value:'$bind' },

                    {name: "event-where-item", tag:'p'},
                    {name: "event-where-label", tag:'span', text:'left', value:'$bind + ": "' },
                    {name: "event-where-text", tag:'span', value:'$bind' },

                    {name: "presenters-item", tag:'p'},
                    {name: "presenters-label", tag:'span', text:'left', value:'$bind + ": "' },
                    {name: "presenters-list"},
                      {name: "presenters-list-item"},
                        {name: "presenters-list-item-link", tag:'a', style:'margin-left:15px;', value:'$bind[0] + "<br/>"', 
                             href: 'navigate( encodeURIComponent($bind[1]))' },

                    {name: "organizations-item", tag:'p'},
                    {name: "organizations-label", tag:'span', text:'left', value:'$bind + ": "' },
                    {name: "organizations-list"},
                      {name: "organizations-list-item"},
                        {name: "organizations-list-item-link", tag:'a', style:'margin-left:15px;', value:'$bind[0] + "<br/>"', 
                             href: 'navigate( encodeURIComponent($bind[1]))' },

            {name: "footer", widget: "BootstrapFooterJson"},
            {name: "change_interface", tag:'a', href:'javascript:{};', value:'$bind', events: { click: 'change_interface' } },

        ]
    };


//******************************************************************************************************************
// INTERFACE LIST
//******************************************************************************************************************
var abstract_interface = [
	landing_a, 
	index_default_a,
	context_node_default_a,
	index_events_a,
	context_node_events_a
];

var concrete_interface = [
	landing_c, 
	index_default_c,
	context_node_default_c,
	index_events_c,
	context_node_events_c
];

//*******************************************
// SELECTION
//*******************************************
var select_interface = [
	index_default_s,
	index_events_s,
	context_node_default_s,
	context_node_events_s
];

//*******************************************
// CONFIG
//*******************************************
var conf = {
    events: {show_json: 
                 function (options) {
                     var uri = decodeURIComponent(options.$env.request.hash.substring(6));
                     var myWindow = window.open(uri, "_blank");
                 },
             change_interface:
                 function (options) {
                     document.body.innerHTML = '<div style="text-align:center"><br/><img src="/imgs/loading.gif" alt="Loading" height="42" width="42"></div>';
                     non_default_interface = !non_default_interface;
                     mira.selection(options.$env.request.params);
                     options.$event.stopPropagation();
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
