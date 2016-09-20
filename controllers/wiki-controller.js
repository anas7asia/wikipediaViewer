angular.module('wikiApp')
    .controller('WikiController', ['$scope', '$log', '$window', 'WikiFactory', function($scope, $log, $window, wikiFactory) {

        $scope.searchForm = {
            keyword: ''
        };
        // array of retrieved articles after form submit
        $scope.wikiArticles = [];
        $scope.articlesLoading = false;
        $scope.autocompleteIsShown = false;
        // use it to hide autocomlete propositions field when clicked outside
        $scope.$window = $window;

        // search an entire article
        $scope.searchWikiArticles = function() {
            $scope.autocompleteIsShown = false;
            $scope.articlesLoading = true;
            wikiFactory.getWikipediaArticles($scope.searchForm.keyword)
                .then(function(data) {
                    $scope.wikiArticles = data.data.query.pages;
                    $scope.articlesLoading = false;
                });
        }

        // search for article titles to use them in autocomplete
        $scope.searchTitles = function(keyword) {
            // filtering input: if input.length is bigger then 3 and only after 1.5 seconds
            if(keyword.length >= 3) {
                setTimeout(function() {
                    wikiFactory.getWikipediaTitles(keyword)
                        .then(function(data) {
                            // $log.log(data)
                            $scope.wikiTitles = data.data.query.pages;
                            $scope.autocompleteIsShown = true;
                        });
                }, 1500);
            }
        }

        // use autocomplete proposition as #keyword input value
        $scope.showAutocompleteTitles = function(word) {
            $scope.searchForm.keyword = word;
            $scope.autocompleteIsShown = false;
        }
     
    }]);