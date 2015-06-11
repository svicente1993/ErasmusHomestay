<!-- Compatibity from ng-grid for tables on IE8 -->
Turns out the answer was not so obvious. There was a bug in ng-grid 2.0.5 where the devs were using the Javascript forEach method in one spot instead of angular.forEach. This is not supported by IE8 and was causing the error. I submitted it to the group and they'll fix it, but for now I just made the change.

Source:
http://stackoverflow.com/questions/16367791/ng-grid-not-working-in-ie8
