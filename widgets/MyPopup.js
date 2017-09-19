/**
 * Created by Caihm on 2017/9/14.
 */
define([
    'dojo/_base/lang',
    'dojo/touch',
    'dojo/dom-construct',
    'dojo/on',
    "dojo/aspect",
    'esri/widgets/Popup',
    'dojo/dom-attr',
    "dojo/dom-class",
    'dojo/topic'
], function (lang, touch, domConstruct, on, aspect, Popup, domAttr, domClass, topic) {

    var dict = {
        hidden: "esri-hidden",
        invisible: "esri-invisible",
        iconText: "esri-icon-font-fallback-text",
        iconLeftTriangleArrow: "esri-icon-left-triangle-arrow",
        iconRightTriangleArrow: "esri-icon-right-triangle-arrow",
        iconDockToTop: "esri-icon-maximize",
        iconDockToBottom: "esri-icon-dock-bottom",
        iconDockToLeft: "esri-icon-dock-left",
        iconDockToRight: "esri-icon-dock-right",
        iconClose: "esri-icon-close",
        iconUndock: "esri-icon-minimize",
        iconPaginationMenu: "esri-icon-layer-list",
        iconCheckMark: "esri-icon-check-mark",
        iconLoading: "esri-rotating esri-icon-loading-indicator",
        iconZoom: "esri-icon-zoom-in-magnifying-glass",
        base: "esri-popup",
        container: "esri-popup__position-container",
        main: "esri-popup__main-container",
        loadingContainer: "esri-popup__loading-container",
        shadow: "esri-popup--shadow",
        showDock: "esri-popup--dock-button-visible",
        showContent: "esri-popup--content-visible",
        showFooter: "esri-popup--footer-visible",
        showTitle: "esri-popup--title-visible",
        showPagination: "esri-popup--pagination-visible",
        hasPopupRenderer: "esri-popup--has-popup-renderer",
        hasPromiseFeatures: "esri-popup--has-promise-features",
        isDocked: "esri-popup--is-docked",
        isDockedTopLeft: "esri-popup--is-docked-top-left",
        isDockedTopCenter: "esri-popup--is-docked-top-center",
        isDockedTopRight: "esri-popup--is-docked-top-right",
        isDockedBottomLeft: "esri-popup--is-docked-bottom-left",
        isDockedBottomCenter: "esri-popup--is-docked-bottom-center",
        isDockedBottomRight: "esri-popup--is-docked-bottom-right",
        canDockToLeft: "esri-popup--can-dock-to-left",
        canDockToRight: "esri-popup--can-dock-to-right",
        canDockToTop: "esri-popup--can-dock-to-top",
        canDockToBottom: "esri-popup--can-dock-to-bottom",
        hasPaginationMenuOpen: "esri-popup--feature-menu-open",
        alignTop: "esri-popup--top-aligned",
        alignBottom: "esri-popup--bottom-aligned",
        alignLeftTop: "esri-popup--left-top-aligned",
        alignLeftBottom: "esri-popup--left-bottom-aligned",
        alignRightTop: "esri-popup--right-top-aligned",
        alignRightBottom: "esri-popup--right-bottom-aligned",
        hasPendingPromises: "esri-popup--has-pending-promises",
        isPendingPromisesResult: "esri-popup--is-pending-promises-result",
        hasFeatureUpdated: "esri-popup--feature-updated",
        header: "esri-popup__header",
        headerButtons: "esri-popup__header-buttons",
        headerTitle: "esri-popup__header-title",
        content: "esri-popup__content",
        footer: "esri-popup__footer",
        button: "esri-popup__button",
        buttonDock: "esri-popup__button--dock",
        icon: "esri-popup__icon",
        iconDock: "esri-popup__icon--dock-icon",
        actions: "esri-popup__actions",
        action: "esri-popup__action",
        actionImage: "esri-popup__action-image",
        actionText: "esri-popup__action-text",
        pointer: "esri-popup__pointer",
        pointerDirection: "esri-popup__pointer-direction",
        pagination: "esri-popup__pagination",
        paginationPrevious: "esri-popup__pagination-previous",
        paginationNext: "esri-popup__pagination-next",
        paginationPreviousIconLTR: "esri-popup__pagination-previous-icon",
        paginationPreviousIconRTL: "esri-popup__pagination-previous-icon--rtl",
        paginationNextIconLTR: "esri-popup__pagination-next-icon",
        paginationNextIconRTL: "esri-popup__pagination-next-icon--rtl",
        paginationText: "esri-popup__pagination-page-text",
        paginationDocked: "esri-popup__pagination-docked",
        paginationDockedButtons: "esri-popup__pagination-docked-buttons",
        featureMenu: "esri-popup__feature-menu",
        featureMenuList: "esri-popup__feature-menu-list",
        featureMenuItem: "esri-popup__feature-menu-item",
        featureMenuViewport: "esri-popup__feature-menu-viewport",
        featureMenuHeader: "esri-popup__feature-menu-header",
        featureMenuNote: "esri-popup__feature-menu-note",
        featureMenuSelected: "esri-popup__feature-menu-item--selected",
        featureMenuButton: "esri-popup__feature-menu-button",
        featureMenuTitle: "esri-popup__feature-menu-title"
    }

    return Popup.createSubclass([], {
        declaredClass: "caihm.myPopup",
        constructor: function (options) {

            this.myEvents = [];

            this.myEvents.push(aspect.after(this, "close", function () {
                console.log('%ctopic:map/popup/close ', 'color: green');
                topic.publish('map/popup/close',{
                    type:'method'
                });
            }));

        },

        postCreate: function () {
            this.inherited(arguments);

            this.myEvents.push(on(this._closeNode, touch.press, lang.hitch(this, function () {
                console.log('%ctopic:map/popup/close ', 'color: green');
                topic.publish('map/popup/close',{
                    type:'manual'
                });
            })));


        },

        open: function (options, refresh) {
            this.inherited(arguments);
        },

        _updateTitle: function (param) {

            param = param || '';
            if (lang.isString(param)) {
                domAttr.set(this._titleNode, "innerHTML", param);
                domClass.toggle(this._containerNode, dict.showTitle, !!param);
                domClass.remove(this._containerNode, dict.hasPaginationMenuOpen)
            } else if (lang.exists('nodeName', param)) {
                domConstruct.place(param, this._titleNode);
                domClass.toggle(this._containerNode, dict.showTitle, !!param);
                domClass.remove(this._containerNode, dict.hasPaginationMenuOpen)
            }

        },

        destroy: function () {
            this.inherited(arguments);

            try {
                while (this.myEvents.length > 0) {
                    this.myEvents.pop().remove();
                }
            } catch (e) {
                console.log('%c' + e, 'color: red');
            }

        }
    });

});