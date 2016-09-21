angular.module('wikiApp')
    .directive('autocomplete', ['$document', function($document) {
        return {
            templateUrl: 'directives/autocomplete.html',
            replace: false,
            scope: {
                titles: '=',
                isVisible: '=',
                chooseTitle: '&'
            },
            link: function(scope, element, attr){
                
                // function to tranmit title to $parent scope and make it #keyword input value
                scope.chooseWikiTitle = function(title) {
                    scope.chooseTitle({keyword: title});
                }

                $document.bind('click', function(event) {
                    var isClickedElementChildOfPopup = element
                    .find(event.target)
                    .length > 0;
                    
                    if (isClickedElementChildOfPopup) {
                        console.log('Same element');
                        return;

                    }
                    else {
                        scope.isVisible = false;
                        scope.$apply();
                    }            
                });
            }
        };
    }]);