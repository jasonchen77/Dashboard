angular
  .module('theme.core.services')
  .service('SensorService',['$timeout', function($timeout) {
    'use strict';

    var self = this;

    this.selectedSensors = [];

    var currentMessageList = [];
    var updateInterval = 5000;

    var fakeMessages = [
        {
          sensor: "Shaft Encoder 1",
          data: "12 rpm",
          id: "1",
          type: "Sensor",
          module: "BPM1",
          location: "Brake Axle"
        },
        {
          sensor: "Limit Switch 1",
          data: "120 F",
          id: "3",
          type: "Sensor",
          module: "BPM1",
          location: "Boggie - Front left"
        },
        {
          sensor: "Pressure Transducer 1",
          data: "98lb",
          id: "104",
          type: "Sensor",
          module: "ECM",
          location: "Cabin"
        },
        {
          sensor: "Thermistor 11",
          data: "128 F",
          id: "115",
          type: "Sensor",
          module: "ECM",
          location: "BPM2 - solid state relay"
        },
        {
          sensor: "Motor Controller 8",
          data: "24mph",
          id: "82",
          type: "Actuator",
          module: "MCM",
          location: "Motor 8 - Middle Right"
        },
        {
          sensor: "Solid State Relay 3",
          data: "1345",
          id: "37",
          type: "Actuator",
          module: "BPM2",
          location: "Linear Actuator"
        },
        {
          sensor: "Drum Brake Electromagnet 1",
          data: "2.34",
          id: "44",
          type: "Actuator",
          module: "BPM2",
          location: "Drum Brake Left Wheel Front"
        }
    ];

    var getMessageList = function() {
      var tempMessage = jQuery.extend({}, fakeMessages[Math.floor(Math.random() * fakeMessages.length)]);
      tempMessage.timeStamp = new Date();
      currentMessageList.unshift(tempMessage);
      return currentMessageList;
    }

    //Check all the selected sensors and add return all the messages from that sensor
    this.selectedSensorMessageList = function(){
      var selectedMessages = [];

      for(var sensor in self.selectedSensors){
        var sensorID = self.selectedSensors[sensor]["SSID"];
        var temp = self.messageList.filter(function(message){
          return message.id === sensorID;
        });
        selectedMessages.push.apply(selectedMessages, temp);
      }

      return selectedMessages; 
    }

    this.messageList = getMessageList();

    var promise;
    this.updateRealtimeData = function() {
      self.messageList = getMessageList();
      $timeout.cancel(promise);
      promise = $timeout(self.updateRealtimeData, updateInterval);
    };

    this.timeSince = function(date){

      var seconds = Math.floor((new Date() - date) / 1000);

      var interval = Math.floor(seconds / 31536000);

      if (interval > 1) {
          return interval + " years";
      }
      interval = Math.floor(seconds / 2592000);
      if (interval > 1) {
          return interval + " months";
      }
      interval = Math.floor(seconds / 86400);
      if (interval > 1) {
          return interval + " days";
      }
      interval = Math.floor(seconds / 3600);
      if (interval > 1) {
          return interval + " hours";
      }
      interval = Math.floor(seconds / 60);
      if (interval > 1) {
          return interval + " minutes";
      }
      return Math.floor(seconds) + " seconds";
    };

  }]);