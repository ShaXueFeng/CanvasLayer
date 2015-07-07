/**
 * 一直覆盖在当前地图视野的Canvas对象
 *
 * @author nikai (@胖嘟嘟的骨头, nikai@baidu.com)
 *
 * @param 
 * {
 *     map 地图实例对象
 * }
 */ 
    
function CanvasLayer(options){
    this.options = options || {};
    this.paneName = this.options.paneName || 'labelPane';
    this._map = options.map;
    this.show();
}

CanvasLayer.prototype = new BMap.Overlay();

CanvasLayer.prototype.initialize = function(map){
    this._map = map;
    var canvas = this.canvas = document.createElement("canvas");
    var size = map.getSize();
    canvas.width = size.width;
    canvas.height = size.height;
    canvas.style.cssText = "position:absolute;"
                            + "left:0;" 
                            + "top:0;"
                            + "width:" + size.width + "px;"
                            + "height:" + size.height + "px";
    map.getPanes()[this.paneName].appendChild(canvas);
    return this.canvas;
}

CanvasLayer.prototype.draw = function(){
    var map = this._map;
    var bounds = map.getBounds();
    var sw = bounds.getSouthWest();
    var ne = bounds.getNorthEast();
    var pixel = map.pointToOverlayPixel(new BMap.Point(sw.lng, ne.lat));
    this.canvas.style.left = pixel.x + "px";
    this.canvas.style.top = pixel.y + "px";
    this.dispatchEvent('draw');
    this.options.update && this.options.update.call(this);
}

CanvasLayer.prototype.getContainer = function(){
    return this.canvas;
}

CanvasLayer.prototype.show = function(){
    this._map.addOverlay(this);
}

CanvasLayer.prototype.hide = function(){
    this._map.removeOverlay(this);
}
