//加载场景代码
var app = new THING.App({ 
    // 场景地址
    "url": "http://www.thingjs.com/./client/ThingJS/50544/505441563507393211",
    //背景设置
    "skyBox" : "BlueSky"
});
app.on('load',function(ev){
    app.level.change(ev.campus);
})
var heatMap = app.create({
	type: "Heatmap",
	width: 80, // 宽度 单位米
	height: 180, // 长度 单位米
	minValue: 20,
	maxValue: 27,
	radius: 2, // 单个点的热力影响半径
	alpha: true // 未插值区域是否透明（默认为 false ）
    
});
heatMap.rotateX(90);
setInterval(function () {
	// 数据格式为
	// [x坐标,y坐标,热力值]
	// 坐标系以热力图平面中心为原点
	heatMap.setData([
        [17.5, 71, THING.Math.randomFloat(24.0, 28.0)],
        [17.5, 71, THING.Math.randomFloat(24.0, 28.0)],
        [17.5, 71, THING.Math.randomFloat(24.0, 28.0)],
        [18.5, 71, THING.Math.randomFloat(4.0, 18.0)],
        [19.5, 71, THING.Math.randomFloat(4.0, 28.0)],
        [20.5, 71, THING.Math.randomFloat(24.0, 28.0)],
        [21.5, 71, THING.Math.randomFloat(8.0, 18.0)],
        [22.5, 71, THING.Math.randomFloat(8.0, 18.0)],
        [23.5, 71, THING.Math.randomFloat(8.0, 18.0)],
        [24.5, 71, THING.Math.randomFloat(8.0, 18.0)],
        [25.5, 71, THING.Math.randomFloat(8.0, 18.0)],
        [26.5, 71, THING.Math.randomFloat(8.0, 18.0)],
        [27.5, 71, THING.Math.randomFloat(8.0, 18.0)],
        [28.5, 71, THING.Math.randomFloat(8.0, 18.0)],
        [29.5, 71, THING.Math.randomFloat(8.0, 18.0)],
        [29.5, 75.2, THING.Math.randomFloat(18.0, 28.0)],
        [29.5, 75.2, THING.Math.randomFloat(18.0, 28.0)],
        [29.5, 75.2, THING.Math.randomFloat(18.0, 28.0)],
        [28.5, 75.2, THING.Math.randomFloat(18.0, 28.0)],
        [27.5, 75.2, THING.Math.randomFloat(18.0, 28.0)],
        [26.5, 75.2, THING.Math.randomFloat(18.0, 28.0)],
        [28.5, 75.2, THING.Math.randomFloat(18.0, 28.0)],
        [27.5, 75.2, THING.Math.randomFloat(18.0, 28.0)],
        [26.5, 75.2, THING.Math.randomFloat(18.0, 28.0)],
        [17.5, 86, THING.Math.randomFloat(24.0, 28.0)],
        [17.5, 86, THING.Math.randomFloat(24.0, 28.0)],
        [17.5, 86, THING.Math.randomFloat(24.0, 28.0)],
        [18.5, 86, THING.Math.randomFloat(4.0, 18.0)],
        [19.5, 86, THING.Math.randomFloat(4.0, 28.0)],
        [20.5, 86, THING.Math.randomFloat(24.0, 28.0)],
        [21.5, 86, THING.Math.randomFloat(8.0, 18.0)],
        [22.5, 86, THING.Math.randomFloat(8.0, 18.0)],
        [23.5, 86, THING.Math.randomFloat(8.0, 18.0)],
        [24.5, 86, THING.Math.randomFloat(8.0, 18.0)],
        [25.5, 86, THING.Math.randomFloat(8.0, 18.0)],
        [26.5, 86, THING.Math.randomFloat(8.0, 18.0)],
        [27.5, 86, THING.Math.randomFloat(8.0, 18.0)],
        [28.5, 86, THING.Math.randomFloat(8.0, 18.0)],
        [29.5, 86, THING.Math.randomFloat(8.0, 18.0)],
	]);
}, 1000);
heatMap.translate([0,0,-0.3])//移动地图
