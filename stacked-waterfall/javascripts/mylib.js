$.fn.stackedWaterfallChart = function(options) {
	var element = $(this),
			chartOptions = {},
			barCount = options.series[0].data.length,
			firstBarData = options.series[0].data,
			seriesOptions = [];		
	
	$.each(options.series, function(i, v){
		seriesOptions.push({
			type: 'column',
			cursor: 'pointer',
			point: {events: {click: function() { 
						alert(this.series.name+" --- "+this.category);
						alert(this.x+" - "+this.y)
					}
				}
			},
		  borderColor: 'black',
			name: options.series[i].name,
			data: options.series[i].data// ,
			// 			dataLabels: [50, 1, 2, 3, 5, 7, 90, 76]
		});
	});
	
	// loop through all except the last one - last one is Total
	for (var i=0; i < barCount-1; i++) {
		yPoint = firstBarData[i].low+firstBarData[i].y
		seriesOptions.push($.lineConnector([[i, yPoint], [i+1, yPoint]]));
	};
		
	chartOptions = {
		chart: { renderTo: element.attr("id")},
		credits: {enabled: false},
		title: { text: ''},
		xAxis: {
			categories: options.categories,
			lineWidth: 2,
			lineColor: 'black'
		},
		yAxis: {
			min: 0,
			max: 600,
			title: {text: null},
			labels: {enabled: false},
			gridLineColor: null
		},
		legend: {enabled: false},
		tooltip: {enabled: false},
		plotOptions: {
			column: {
				stacking: 'normal',
				dataLabels: {
					enabled: true,
					formatter: function() {
						return this.point.stackTotal;
					}
				}
			}
		},
		series: seriesOptions
	};
	
	return new Highcharts.Chart(chartOptions);
};

$.lineConnector = function(lineData) {
	var lineConnectorOptions = {
		data: [],
		color: 'black',
		dashStyle: 'dash',
		marker: {enabled: false},
		lineWidth: 1,
		shadow: false,
		enableMouseTracking: false
	}
	return $.extend(lineConnectorOptions, {data: lineData});
};