angular
  .module('theme.core.services')
  .service('TelemetryService',['$timeout', function($timeout) {
    'use strict';

    var self = this;

    this.currentVelocity = 0;
    var dxta = [],
      totalPoints = 10;
    var updateInterval = 1000;

    var time = 0;

    /**
     * Create random data point for velocity. voltage
     * @return {[Int]} list of last totalPoints of velocity 
     */
    var getRandomData = function() {
      if (dxta.length > 0) {
        dxta = dxta.slice(1);
      }

      while (dxta.length < totalPoints) {
        var prev = dxta.length > 0 ? dxta[dxta.length - 1] : 25,
            y =  Math.random() * 160;

        if (y < 0) {
            y = 0;
            // $scope.severeAlert('BATTERY LEVEL ZERO', 'This needs electrical team attention immediately.');
        } else if (y > 160) {
            y = 160;
        }

        self.currentVelocity = Math.round(y);

        dxta.push(y);
      }
      var res = [];

      time++;
      
      for (var i = 0; i < dxta.length; ++i) {
        res.push([time+i, dxta[i]]);
      }
      
      return res;

    }

    /**
     * Graph info. for Accel
     */
    this.plotVelAccelData = [{ data: getRandomData(), label: "Velocity" }];
    this.plotVelAccelOptions = {
        series: {
            shadowSize: 0,
            lines: { 
                show: false,
                lineWidth: 0
            },
            points: { show: true },
            splines: {
                show: true,
                fill: 0.08,
                tension: 0.3,
                lineWidth: 2
            },
        },
        grid: {
            labelMargin: 8,
            hoverable: true,
            clickable: true,
            borderWidth: 0,
            borderColor: '#fafafa'
        },
        legend: {
            backgroundColor: '#fff',
            margin: 8
        },
        yaxis: { 
            min: 0, 
            max: 200, 
            tickColor: '#fafafa', 
            font: {color: '#bdbdbd', size: 12},
        },
        xaxis: { 
            tickColor: 'transparent',
            tickDecimals: 0, 
            font: {color: '#bdbdbd', size: 12}
        },
        colors: ['#9fa8da', '#80deea'],
        tooltip: true,
        tooltipOpts: {
            content: "Time: %x : MPH: %y"
        }
    };

    /**
     * Starts the constant update of fake data for velocity data
     */
    var promise;
    this.updateRealtimeData = function() {
      self.plotVelAccelData = [getRandomData()];
      $timeout.cancel(promise);
      promise = $timeout(self.updateRealtimeData, updateInterval);
    };

    /**
     * @return {Int} current vel./200 -> into percentage
     */
    this.getVelPercentage = function() {
      var perc = self.currentVelocity/200;
      return Math.round(perc*100);
    }

  }]);