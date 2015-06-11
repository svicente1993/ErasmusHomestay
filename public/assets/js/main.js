/*
$.tablesorter.themes.bootstrap = {
    // these classes are added to the table. To see other table classes available,
    // look here: http://getbootstrap.com/css/#tables
    table        : 'table table-bordered table-striped',
    caption      : 'caption',
    // header class names
    header       : 'bootstrap-header', // give the header a gradient background (theme.bootstrap_2.css)
    sortNone     : '',
    sortAsc      : '',
    sortDesc     : '',
    active       : '', // applied when column is sorted
    hover        : '', // custom css required - a defined bootstrap style may not override other classes
    // icon class names
    icons        : '', // add "icon-white" to make them white; this icon class is added to the <i> in the header
    iconSortNone : 'fa fa-sort', // class name added to icon when column is not sorted
    iconSortAsc  : 'fa fa-angle-up', // class name added to icon when column has ascending sort
    iconSortDesc : 'fa fa-angle-down', // class name added to icon when column has descending sort
    filterRow    : '', // filter row class
    footerRow    : '',
    footerCells  : '',
    even         : '', // even row zebra striping
    odd          : ''  // odd row zebra striping
  };

  // call the tablesorter plugin and apply the uitheme widget
$("table").tablesorter({
    theme: "bootstrap",
    widthFixed: true,
    headers: { 5: { sorter: false, filter: false }, 7: { sorter: false, filter: false } },
    headerTemplate: '{content} {icon}',
    widgets: ["uitheme", "filter", "zebra"],
    widgetOptions: {
        zebra: ["even", "odd"],
        filter_reset: ".reset"
    }
});
*/
