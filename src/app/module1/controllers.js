/* global moment */
'use strict';

function StatAddController(StatService) {
    var that = this;
    that.newValue = '';
    that.order = {
        value: '',
        reverse: false
    };
    that.stats = {};


    function updateChartDataPoints(stats) {
        that.chart.data.length = 0;
        stats.forEach(function(stat) {
            that.chart.data.push(ChartDataPoint(stat));
        });
    }

    function ChartDataPoint(stat) {
        return {
            'date': parseInt(moment(stat.date).format('X'), 10),
            'meters': stat.value
        };
    }

    StatService.query().then(function(response) {
        that.stats = response;
        updateChartDataPoints(response);
    });

    this.chart = {
        data: []
    };

    this.addValue = function(newValue) {
        StatService.create(new Date(), newValue).then(function(stat) {
            that.newValue = '';
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
