/* Author: Zhang Xin */

/* For jsHint */
/* global jQuery: false*/
/* jshint devel: true */

;(function($) {"use strict";
    var pluginName = 'restoreForm';

    var pluginController = function(element, theOptions) {
        var $container = $(element);
        var $restoreLink;
        var $restoreLinkContainer;
        
        var defaults = {
            restoreLinkSelector : "#restore-form",
            restoreLinkContainerSelector : "#restore-form-container",
            storagePerfix : "form_storage_for_",
            testDataKey : "test_storage_data"
        };

        // Get options saved within $container's data attributes
        var meta = $container.data(pluginName + '-options');
        var options = $.extend(defaults, meta, theOptions);

        var saveTolocal = function() {
            var data = $container.serializeArray();
            var storageKey = getStorageKey();

            localStorage[storageKey] = JSON.stringify(data);
        };

        var restoreFromLocal = function() {
            var storageKey = getStorageKey();
            var storageValue = localStorage[storageKey] || localStorage[options.testDataKey];
            var data = JSON.parse(storageValue);
            var $element;
            var i = 0;

            if (!data) {
                return;
            }

            for (i = 0; i < data.length; i++) {
                $element = $container.find("[name=\"" + data[i].name + "\"]");
                if ($element) {
                    if ($element.is(":radio")) {
                        $element.filter("[value=\"" + data[i].value + "\"]").prop("checked", true);
                    } else if ($element.is(":checkbox") && data[i].value) {
                        $element.prop("checked", true);
                    } else if ($element.is("select")) {
                        $element.find("[value=\"" + data[i].value + "\"]").prop("selected", true);
                    } else {
                        $element.val(data[i].value);
                    }
                    $element.change();
                }
            }
        };

        var getStorageKey = function() {
            var currentUrl = $(location).attr('href');
            return options.storagePerfix + $container.attr("id") + "_in_"  + currentUrl.slice(0, currentUrl.lastIndexOf("/"));
        };

        var init = function() {
            if (!window.localStorage) {
                console.log("Browser not support localStorage");
                return;
            }

            if (!window.JSON) {
                console.log("Browser not support JSON");
                return;
            }

            if (!$container.is("form")) {
                console.log("Element not a form");
                return;
            }

            $(window).on("unload." + pluginName, function() {
                saveTolocal();
            });
            
            $restoreLink = $(options.restoreLinkSelector);
            $restoreLinkContainer = $(options.restoreLinkContainerSelector);
            
            $restoreLink.click(function(){
                restoreFromLocal();
                $restoreLinkContainer.fadeOut();
            });
            
            $restoreLinkContainer.fadeIn();
        };

        // Destroy the warp object without removing elements
        var destroy = function() {
            // Unbind events
            $container.off('.' + pluginName);
            $container.find('*').off('.' + pluginName);
            // Remove data
            $container.removeData(pluginName);
            $container = null;
        };

        // Wapper object
        var that = {};
        that.options = options;
        that.destroy = destroy;

        // Initialize the wrapper object to generate elements of the widget
        init();

        //
        // Store wrapper object in $container using jQuery's $.data function.
        // Usage: console.log($('#theListener').data('jqListener'));
        $container.data(pluginName, that);
    };

    //
    // jQuery function
    //
    $.fn[pluginName] = function(options) {
        this.each(function() {
            pluginController(this, options);
        });
        // Chain-ability of jQuery objects
        return this;
    };
})(jQuery);

