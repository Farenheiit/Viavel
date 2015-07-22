// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.controller('MapController', function($scope, $ionicSideMenuDelegate) {
        'use strict';
        // declaração de variaveis globais
        var geocoder;
        var map;
        var markers = []
        var marker; 
        var login = true;
        
        // inicio função initialize
        function initialize () { 
            var options = {
              zoom: 17,
            };

            // adiciona o map como as opcoes carregadas na id = "map" in index.html  
            map = new google.maps.Map(document.getElementById("map"), options);

            // evento de clique no map atraves do evento addListener  
            google.maps.event.addListener(map, 'click', function(event){
                    // inicio função statusLogin  
                    function statusLogin () {
                        if(login)
                         addMarker(event.latLng);
                        else
                           alert('É necessario está logado para fazer a marcação'); 
                    } // fim função statusLogin
                    
                    statusLogin();
              });

            // pegar a posição do ator principal do sistema.
            if(navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(function(position) {
                        var pos = new google.maps.LatLng(position.coords.latitude,
                                                         position.coords.longitude);
                        map.setCenter(pos);  
                     
                  marker = new google.maps.Marker({
                      map: map,
                      draggable: false,
                      visible: false
                  });

                  marker.setPosition(pos);

                  function ativarLocalizacao(){  
                     if(login)  
                          marker.visible = true;
                  }
                  
                  ativarLocalizacao();

                  geocoder = new google.maps.Geocoder();


              var styles = [
              {
                  stylers: [
                  { hue: "#00ffe6" },
                  { saturation: -20 }
                  ]
              },{
                  featureType: "road",
                  elementType: "geometry",
                  stylers: [
                  { lightness: 100 },
                  { visibility: "simplified" }
                  ]
              },{
                  featureType: "road",
                  elementType: "labels",
                  stylers: [
                  { visibility: "off" }
                  ]
              }
              ];

              map.setOptions({styles: styles});

              // Responsive
              google.maps.event.addDomListener(window, "resize", function() {
                   var center = map.getCenter();
                   google.maps.event.trigger(map, "resize");
                   map.setCenter(center); 
              });


                }, function() {
                    handleNoGeolocation(true);
                });

              } else {
                  // Browser doesn't support Geolocation
                  handleNoGeolocation(false);
              }

              // inicio função addMarker  
              function addMarker(location) {
                    marker = new google.maps.Marker({
                      map: map,
                      icon: {
                            path: google.maps.SymbolPath.CIRCLE,
                            scale: 8
                      },
                      position:location, 
                      draggable: true,
                      visible: true
                    });

                    markers.push(marker);
                    console.log(markers.length);
              } // fim da função addMarker

              // inicio função handleNoGeolocation  
              function handleNoGeolocation(errorFlag) {
                    if (errorFlag) {
                      var content = 'Error: The Geolocation service failed.';
                    } else {
                      var content = 'Error: Your browser doesn\'t support geolocation.';
                    }
              } // fim da função handleNoGeolocation

             


        } // fim funcao initialize
        
        $scope.map = map;

        // cria evento no clique do botão 
        $scope.toggleLeft = function() {
                  $ionicSideMenuDelegate.toggleLeft();
        } 

        
        $scope.marcadores = [ 
             {title : 'marker_01'},
             {title : 'marker_02'},
             {title : 'marker_03'},
             {title : 'marker_04'}, 
             {title : 'marker_05'},
             {title : 'marker_06'},
             {title : 'marker_07'},
             {title : 'marker_08'},
             {title : 'marker_09'},
             {title : 'marker_10'},      
        ];
        

        google.maps.event.addDomListener(window, 'load', initialize);
});
