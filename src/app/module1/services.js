'use strict';

function Stat(date, meters, duration) {
    return {
        id: Math.random(),
        date: date || new Date(),
        meters: meters || '',
        duration: duration || 0
    };
}

function StatService($http, $q) {
    var stats = loadStats();

    function persistStats(stats) {
        localStorage.stats = JSON.stringify(stats);
        console.log('stats', stats);
    }

    function loadStats() {
        var stats = [];
        try {
            stats = JSON.parse(localStorage.getItem('stats'));
        } catch (e) {
            console.error(e);
        }

        return stats;
    }

    return {
        query: function() {
            var deferred = $q.defer();

            stats = stats || [];

            stats.forEach(function(stat) {
                stat.date = new Date(stat.date);
            });

            deferred.resolve(stats);

            return deferred.promise;
        },
        create: function(date, meters, duration) {
            var deferred = $q.defer();
            debugger

            var newStat = Stat(date, meters, duration);

            stats.push(newStat);

            persistStats(stats);

            deferred.resolve(newStat);

            return deferred.promise;
        },
        clear: function() {
            var deferred = $q.defer();

            localStorage.setItem('backup-stats', JSON.stringify(stats));

            stats.length = 0;
            persistStats(stats);

            deferred.resolve(stats);

            return deferred.promise;
        },
        remove: function(stat) {
            var deferred = $q.defer();

            var index = stats.indexOf(stat);

            if (index >= 0) {
                stats.splice(index, 1);
                deferred.resolve(stat);
            } else {
                deferred.reject('Not found');
            }

            persistStats(stats);

            return deferred.promise;

        },
        update: function(stat) {
            var deferred = $q.defer();
            
            deferred.resolve(stats);
           
            persistStats(stats);
            
            return deferred.promise;
        }
    };
}
