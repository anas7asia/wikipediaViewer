angular.module('wikiApp')
    .factory('WikiFactory', ['$http', function($http) {

        var wikiApiStart = 'https://';
        var wikiApiMiddle = '.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
        var wikiApiEnd = '&callback=JSON_CALLBACK';

        function getWikipediaArticles(lang, keyword) {


            return $http.jsonp(wikiApiStart + lang + wikiApiMiddle + keyword + wikiApiEnd)
                .success(function(response) {
                    return response;
                });
        }

        function getWikipediaTitles(lang, keyword) {
            // intitle added in order to search by titles only
            return $http.jsonp(wikiApiStart + lang + wikiApiMiddle + 'intitle:' + keyword + wikiApiEnd)
                .success(function(response) {
                    return response;
                })
        }

        function getLanguages() {
            var langs = [
                {
                    shortcut: 'en',
                    full: 'English'
                },
                {
                    shortcut: 'fr',
                    full: 'Français'
                },
                {
                    shortcut: 'ru',
                    full: 'Русский'
                },
                {
                    shortcut: 'es',
                    full: 'Español'
                },
                {
                    shortcut: 'zh',
                    full: '中文'
                }
            ];

            return langs;
        }

        return {
            getWikipediaArticles: getWikipediaArticles,
            getWikipediaTitles: getWikipediaTitles,
            getLanguages: getLanguages
        }
    }]);