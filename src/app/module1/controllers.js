/* global moment */
'use strict';

function StatAddController(StatService) {
    var that = this;
    that.newMeters = '';
    that.newDuration = '';
    that.order = {
        value: '',
        reverse: false
    };
    that.stats = {};


    function updateChartDataPoints(stats) {
        that.chart.data.length = 0;
        stats
            .sort(function(a, b) {
                a = new Date(a.date);
                b = new Date(b.date);
                return a > b ? -1 : a < b ? 1 : 0;
            })
            .forEach(function(stat) {
                that.chart.data.push(ChartDataPoint(stat));
            });
    }

    function ChartDataPoint(stat) {
        return {
            date: new Date(stat.date),
            meters: parseFloat(stat.meters),
            duration: parseInt(stat.duration, 10) || 0
        };
    }

    StatService.query().then(function(response) {
        that.stats = response;
        updateChartDataPoints(response);
    });

    this.chart = {
        data: [],
        options: {
            axes: {
                x: {
                    key: 'date',
                    labelFunction: function(value) {
                        return moment(value).format('L');
                    },
                    type: 'linear'
                },
                y: {
                    type: 'linear'
                }
            },
            series: [{
                y: 'meters',
                color: 'steelblue',
                thickness: '2px',
                type: 'area',
                striped: true,
                label: 'Meters'
            },{
                y: 'duration',
                color: '#FF6161',
                thickness: '2px',
                type: 'area',
                striped: true,
                label: 'Minutes'
            }],
            tooltip: {
                mode: 'scrubber',
                formatter: function(x, y, series) {
                    return y + ' ' + series.label;
                }
            },
            // drawLegend: true,
            // drawDots: true,
            // columnsHGap: 5
        }
    };

    this.addValue = function(newMeters, newDuration) {
        StatService.create(new Date(), newMeters, newDuration).then(function(stat) {
            debugger
            that.newMeters = '';
            that.newDuration = '';
            updateChartDataPoints(that.stats);
        });
    };
    this.clearStats = function() {
        StatService.clear().then(function(response) {
            updateChartDataPoints(that.stats);
        });
    };
    this.removeStat = function(stat) {
        StatService.remove(stat).then(function(response) {
            updateChartDataPoints(that.stats);
        }, function(error) {
            alert(error);
        });
    };
    this.updateStat = function(stat) {
        StatService.update(stat).then(function(respons) {
            updateChartDataPoints(that.stats);
        });
    };
    this.changeOrder = function(newOrder) {
        if (that.order.value === newOrder) {
            that.order.reverse = !that.order.reverse;
        } else {
            that.order.value = newOrder;
            that.order.reverse = false;
        }
        console.log(that.order);
    };

}

// StatAddController.resolve = {
//     some_array: function() {
//         return ['some here', 'some there'];
//     }
// };
