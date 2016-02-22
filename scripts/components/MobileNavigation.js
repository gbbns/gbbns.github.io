/* global jQuery */
//module.exports =  function ($) {
Gbbns = Gbbns || {};
Gbbns.Nav = (function(Gbbns, window, $, undefined) {
    "use strict";

    var $overlayBg;
    var container = '[data-page-wrapper]';
    var navigationContainer = '.site__navigation';
    var nav = '[data-nav]', navBtn = '[data-nav-btn]';
    var dataNavState = 'data-nav-state';

    //var overlayBg = '.overlay-bg';

    var CLASS_ISACTIVE = 'is-active';

    var NAV_OPEN = 'open';
    var NAV_CLOSED = 'closed';

    function init() {
        $(navBtn).on('click', function (e) {
          toggleActive(e);
        });
    }

    function toggleActive(e) {
        e.preventDefault();
        var action = $(nav).hasClass(CLASS_ISACTIVE);
        toggleAction(!action);
    }

    function toggleAction(open) {
        if (open) {
          addClass($(navigationContainer));
          addClass($(nav));
          addClass($(navBtn));
          setNavState(NAV_OPEN);
        }
        else {
          removeClass($(navigationContainer));
          removeClass($(nav));
          removeClass($(navBtn));
          setNavState(NAV_CLOSED);
        }
    }

    function setNavState(navState) {
        $(container).attr(dataNavState, navState);
    }

    function addClass($elem) {
        if($elem) $elem.addClass(CLASS_ISACTIVE);
    }

    function removeClass($elem) {
        if($elem) $elem.removeClass(CLASS_ISACTIVE);
    }

    return {
        init: init,
        toggle: toggleAction
    };
}(Gbbns, window, jQuery));

Gbbns.Nav.init();
