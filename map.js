/**
 * Created by Caihm on 2017/5/10.
 */

var map;
var view;
var s;
var test;
var layer;

require([
    "dojo/parser",
    "dojo/dom-class",
    "dojo/dom-construct",
    "dojo/on",
    'dojo/_base/lang',
    "esri/Map",
    "esri/views/MapView",
    "esri/request",
    "esri/geometry/Point",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleFillSymbol",
    "esri/geometry/support/webMercatorUtils",
    'esri/Graphic',
    "esri/geometry/support/jsonUtils",
    "widgets/MyPopup",
    "dojo/domReady!"
], function (parser,domClass, domConstruct, on, lang, Map, MapView, esriRequest, Point, SimpleMarkerSymbol, SimpleFillSymbol, webMercatorUtils, Graphic, geometryUtils, MyPopup) {
    parser.parse();

    // mapManager = MapManager.getInstance({     appConfig: appConfig },
    // 'mapishere'); mapManager.showMap();

    map = new Map({basemap: "streets"});
    view = new MapView({
        container: "mapishere", // Reference to the scene div created in step 5
        map: map, // Reference to the map object created before the scene
        zoom: 4, // Sets zoom level based on level of detail (LOD)
        center: [15, 65]
    });

    view.then(function () {
        console.log('view loaded');
        view.popup = new MyPopup();

        var dom = domConstruct.create('div', {innerHTML: 'customPopup, click me to trigger Action'});
        var title  =  domConstruct.create('div', {innerHTML: 'customPopup title, click me to trigger Action'});

        on(dom, "click", function (evt) {
            alert('hello');
        });

        on(title, "click", function (evt) {
            alert('hello');
        })

        view
            .popup
            .open({title: title, content: dom, location: view.extent.center})

    })

});
