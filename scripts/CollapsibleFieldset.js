/**
  * jquery.CollapsibleFieldset
  * 
  * Michael Dillon
  *
  * Creates collapsible fieldsets for div objects that are targeted
  * by anchors. The fieldset anchors display or hide the div they are
  * targeting when clicked. At initialization time the anchors can 
  * specify whether they are collapsed or uncollapsed.
  *
  * Standard usage:
  *  html:
  *    <div target="#div1" class="collapsible">Field Set 1</div>
  *    <div id="div1"> blah blah blah</div>
  *  script:
  *     $('.collapsible').collapsibleFieldset (); 
  *  result:
  *     Standard collapsible fieldset which is default uncollapsed.
  *
  * Passing options:
  *  html:
  *    <div target="#div1" class="collapsible">Field Set 1</div>
  *    <div id="div1"> blah blah blah</div>
  *  script:
  *     $('.collapsible').collapsibleFieldset ({collapsed: true, speed: 100}); 
  *  result:
  *     All targeted divs are collapsed.
  *
  * Per Anchor Collapsed / Uncollapsed:
  *  html:
  *    <div target="#div1" class="collapsible" collapsedintially="false">Field Set 1</div>
  *    <div id="div1"> blah blah blah</div>
  *  script:
  *     $('.collapsible').collapsibleFieldset ({collapsed: true, speed: 100}); 
  *  result:
  *     The fieldset is uncollapsed because its collapsed declaration takes
  *     priority over the global option.
  *
  */
(function ($) {
   
    // internal data objects     
    var _fieldsetAttributes = {
        targetField : 'target',
        collapsedInitially : 'collapsedintially',
    };

    var _options = {
        speed : 300,
        collapsed : false,
    };

    var _css = {
        mainLink : 'collapsible-fieldset',
        uncollapsed : 'collapsible-fieldset-uncollapsed',
        collapsed : 'collapsible-fieldset-collapsed',
    };
    
    // Helper functions

    /**
      * Deals with changing css classes for displaying a Collapsed
      * fieldset. This also decorates the link with the [-] or [+]
      * extras.
      */
    var displayCollapsedFieldset = function (link, targetDiv) {
        if ($(targetDiv).hasClass (_css.uncollapsed)) {
            $(targetDiv).removeClass (_css.uncollapsed);
            $(link).html ($(link).html ().replace ("[-] ", ""));
        }
        $(link).html ('[+] ' + $(link).html ());
        $(targetDiv).addClass(_css.collapsed);
    };
    
    /**
      * Deals with changing css classes for displaying an Uncollapsed
      * fieldset. This also decorates the link with the [-] or [+]
      * extras.
      */
    var displayUncollapsedFieldset = function (link, targetDiv) {
        if ($(targetDiv).hasClass (_css.collapsed)) {
            $(targetDiv).removeClass (_css.collapsed);
            $(link).html ($(link).html ().replace ("[+] ", ""));
        }
        $(link).html ('[-] ' + $(link).html ());
        $(targetDiv).addClass(_css.uncollapsed);
    };
    
    /**
      * Actually collapses a fieldset, this animates the
      * movement and then makes sure the action is displayed
      * correctly.
      */
    var collapseFieldset = function (link, targetDiv) {
        $(targetDiv).slideUp (_options.speed, function () {
            displayCollapsedFieldset (link, targetDiv);
        });
    };
    
    /**
      * Actually uncollapses a filedset, this animates the
      * movement and then makes sure the action is displayed
      * correctly.
      */
    var uncollapseFieldset = function (link, targetDiv) {
        displayUncollapsedFieldset (link, targetDiv);
        $(targetDiv).slideDown (_options.speed);
    };

    var methods = {
        
        /**
          * Sets up any dom objec that the selector matches.
          * First we apply css styles if they are needed. Then
          * we collapse or uncollapse any objects that need to be
          * collapsed.
          */
        init: function (options) {
            // merge the options with the internal options
            $.extend(_options, options);

            return this.each(function () {
                var link = this;
                var targetDiv = $(link).attr(_fieldsetAttributes.targetField);
                
                // add the mainLink class if needed
                if (!$(link).hasClass (_css.mainLink)) {
                    $(link).addClass (_css.mainLink);
                }
                
                // Bind the link click action to the click method
                $(link).bind ('click.collapsibleFie', methods.click);
                
                var collapsed = $(link).attr (_fieldsetAttributes.collapsedInitially);
                // check if an individual collapsed statement is there.
                if (!collapsed) { 
                    // now check the options to setup fieldsets appropriately
                    if (!_options.collapsed) {
                        // fieldsets are uncollapsed.
                        displayUnCollapsedFieldset (link, targetDiv);
                    }
                    else {
                        // fieldsets are collapsed.
                        displayCollapsedFieldset (link, targetDiv);
                        $(targetDiv).hide ();
                    }
                }
                else {
                    if (collapsed == "true") {
                        // collapse this fieldset 
                        displayCollapsedFieldset (link, targetDiv);
                        $(targetDiv).hide ();
                    }
                    else if (collapsed == "false") {
                        // this fieldset is uncollapsed
                        displayUncollapsedFieldset (link, targetDiv);
                    }
                    else {
                        $.error ('jquery.collapsibleField collapsed attribute requires true or false');
                    }
                }
            });
        },
        
        /**
          * Collapses or uncollapses a fieldset when the link
          * is clicked.
          */ 
        click: function (event) {
            var link = this;
            var targetDiv = $(link).attr(_fieldsetAttributes.targetField);
            
            if (!$(targetDiv).hasClass (_css.collapsed)) {
                collapseFieldset (link, targetDiv);    
            }
            else {
                uncollapseFieldset (link, targetDiv);
            }
        },
        
        /**
          * Programmatically closes a fieldset.
          */ 
        collapse: function () {
            return this.each(function () {
                var link = this;
                var targetDiv = $(link).attr(_fieldsetAttributes.targetField);   
                collapseFieldset (link, targetDiv);
            });
        },
        
        /**
          * Programmatically opens a fieldset.
          */
        uncollapse: function () {
            return this.each(function () {
                var link = this;
                var targetDiv = $(link).attr(_fieldsetAttributes.targetField);   
                uncollapseFieldset (link, targetDiv);
            });
        },

        /**
          * Toggles a fieldset between collapsed or uncollapsed
          */
        toggle: function () {
            return this.each (function () {
                var link = this;
                var targetDiv = $(link).attr (_fieldsetAttributes.targetField);
                
                if ($(targetDiv).hasClass (_css.collapsed)) {
                    uncollapseFieldset (link, targetDiv); 
                }
                else {
                    collapseFieldset (link, targetDiv); 
                } 
            }); 
        } 
    };
    
    /**
      * Registers the plugin namespace and a method for handling method calls
      * and error handling when a method called doesn't exist.
      */
    $.fn.collapsibleFieldset = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
        else {
            $.error('Method ' + method + ' does not exist for jquery.collapsibleFieldset');
        }
    };
})(jQuery);
