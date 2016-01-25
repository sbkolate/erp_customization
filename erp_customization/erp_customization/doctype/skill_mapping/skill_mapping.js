frappe.require("assets/erp_customization/js/slick/lib/firebugx.js");
frappe.require("assets/erp_customization/js/slick/plugins/slick.cellrangedecorator.js");
frappe.require("assets/erp_customization/js/slick/plugins/slick.cellrangeselector.js");
frappe.require("assets/erp_customization/js/slick/plugins/slick.cellselectionmodel.js");



frappe.require("assets/erp_customization/js/slick/slick.formatters.js");
frappe.require("assets/erp_customization/js/slick/slick.editors.js");
frappe.require("assets/erp_customization/js/slick/slick.grid.js");
frappe.require("assets/erp_customization/js/slick/slick.core.js");



frappe.require("assets/erp_customization/js/slick/slick.groupitemmetadataprovider.js");
frappe.require("assets/erp_customization/js/slick/slick.dataview.js");
frappe.require("assets/erp_customization/js/slick/controls/slick.pager.js");
frappe.require("assets/erp_customization/js/slick/controls/slick.columnpicker.js");

frappe.require("assets/frappe/js/lib/slickgrid/plugins/slick.checkboxselectcolumn.js");
frappe.require("assets/frappe/js/lib/slickgrid/plugins/slick.rowselectionmodel.js");
frappe.require("assets/frappe/js/lib/slickgrid/plugins/slick.autotooltips.js");
frappe.require("assets/frappe/js/lib/slickgrid/plugins/slick.cellcopymanager.js");
frappe.require("assets/frappe/js/lib/slickgrid/plugins/slick.cellexternalcopymanager.js");
frappe.require("assets/frappe/js/lib/slickgrid/plugins/slick.rowselectionmodel.js");





frappe.ui.form.on("Skill Mapping", "onload", function(frm,doctype,name) {

    // $().appendTo($(wrapper).find('.layout-main-section'));

    $(cur_frm.fields_dict.mygrid.wrapper).append( "<table width='100%>\
  <tr>\
    <td valign='top' width='50%'>\
      <div id='myGrid' style='width:100%;height:300px;''></div>\
    </td>\
  </tr>\
</table>" );

});

frappe.ui.form.on("Skill Mapping", "render", function(frm,doctype,name) {

  function requiredFieldValidator(value) {
    if (value == null || value == undefined || !value.length) {
      return {valid: false, msg: "This is a required field"};
    } else {
      return {valid: true, msg: null};
    }
  }

  var grid;
  var columns = [
    {id: "sel", name: "#", field: "num", cssClass: "cell-selection", width: 40, resizable: false, selectable: false, focusable: false },
    {id: "title", name: "Title", field: "title", width: 120, cssClass: "cell-title", editor: Slick.Editors.Text, validator: requiredFieldValidator},
    {id: "duration", name: "Duration", field: "duration",editor: Slick.Editors.Text},
    {id: "%", name: "% Complete", field: "percentComplete",editor: Slick.Editors.Text,},
    {id: "start", name: "Start", field: "start", minWidth: 60, editor: Slick.Editors.Date},
    {id: "finish", name: "Finish", field: "finish", minWidth: 60, editor: Slick.Editors.Date},
    {id: "effort-driven", name: "Effort Driven", field: "effortDriven",editor: Slick.Editors.Text,}
  ];
  var columnFilters = {};
  var options = {
    showHeaderRow: true,
    headerRowHeight: 30,
    editable: true,
    enableAddRow: true,
    asyncEditorLoading: false,
    enableCellNavigation: true,
    enableColumnReorder: false,
    explicitInitialization: true,
    editable: true,
  };


  $(function () {
    var data = [];
    for (var i = 0; i < 100; i++) {
      data[i] = {
        id: i,
        title: "Task " + i,
        duration: "5 days",
        percentComplete: Math.round(Math.random() * 100),
        start: "01/01/2009",
        finish: "01/05/2009",
        effortDriven: (i % 5 == 0)
      };
    }
      var columnFilters = {};
          dataView = new Slick.Data.DataView();
          //call to create grid report
        grid = new Slick.Grid("#myGrid", dataView, columns, options);

//Start filter in slick grid
        function filter(item) {
        // Regex pattern to validate numbers
        var patRegex_no = /^[$]?[-+]?[0-9.,]*[$%]?$/; // a number negative/positive with decimals with/without $, %

        for (var columnId in columnFilters) {
            if (columnId !== undefined && columnFilters[columnId] !== "") {
                var c = grid.getColumns()[grid.getColumnIndex(columnId)];
                var filterVal = columnFilters[columnId].toString().toLowerCase();
                var filterChar1 = filterVal.substring(0, 1); // grab the 1st Char of the filter field, so we could detect if it's a condition or not

                if(item[c.field] == null)
                    return false;

                // First let see if the user supplied a condition (<, <=, >, >=, !=, <>, =, ==)
                // Substring on the 1st Char is enough to find out if it's a condition or not
                // if a condition is supplied, we might have to transform the values (row values & filter value) before comparing
                // for a String (we'll do a regular indexOf), for a number (parse to float then compare), for a date (create a Date Object then compare)
                if( filterChar1 == '<' || filterChar1 == '>' || filterChar1 == '!' || filterChar1 == '=') {
                    // We found a Condition filter, find the white space index position of the condition substring (should be index 1 or 2)
                    var idxFilterSpace = filterVal.indexOf(" ");

                    if( idxFilterSpace > 0 ) {
                        // Split the condition & value of the full filter String
                        var condition = filterVal.substring(0, idxFilterSpace);
                        filterNoCondVal = columnFilters[columnId].substring(idxFilterSpace+1);

                        // Which type are the row values? We'll convert to proper format before applying the condition
                        // Then apply the condition comparison: String (we'll do a regular indexOf), number (parse to float then compare)
                        if( patRegex_no.test(item[c.field]) ) {                             
                            if( testCondition(condition, parseFloat(item[c.field]), parseFloat(filterNoCondVal)) == false ) 
                                return false;
                        // whatever is remain will be tested as a regular String format     
                        }else {                             
                            if ( testCondition(condition, item[c.field].toString().toLowerCase(), filterNoCondVal.toString().toLowerCase()) == false )
                                return false;
                        }
                    } 
                }else{
                    if (item[c.field].toString().toLowerCase().indexOf(columnFilters[columnId].toString().toLowerCase()) == -1)
                        return false;
                }
            }
        }
        return true;
    }
//end of filter
    dataView.onRowCountChanged.subscribe(function (e, args) {
      grid.updateRowCount();
      grid.render();
    });
    dataView.onRowsChanged.subscribe(function (e, args) {
      grid.invalidateRows(args.rows);
      grid.render();
    });
    $(grid.getHeaderRow()).delegate(":input", "change keyup", function (e) {
      var columnId = $(this).data("columnId");
      if (columnId != null) {
        columnFilters[columnId] = $.trim($(this).val());
        dataView.refresh();
      }
    });
    grid.onHeaderRowCellRendered.subscribe(function(e, args) {
        $(args.node).empty();
        $("<input type='text'>")
           .data("columnId", args.column.id)
           .val(columnFilters[args.column.id])
           .appendTo(args.node);
    });
    grid.setSelectionModel(new Slick.RowSelectionModel({selectActiveRow: false}));
    // grid.registerPlugin(checkboxSelector);
    grid.init();
    dataView.beginUpdate();
    dataView.setItems(data);
    dataView.setFilter(filter);
    dataView.endUpdate();

    // grid.onAddNewRow.subscribe(function (e, args) {
    //   var item = args.item;
    //   grid.invalidateRow(data.length);
    //   data.push(item);
    //   grid.updateRowCount();
    //   grid.render();
    // });


    grid.onAddNewRow.subscribe(function (e, args) {
      var item = args.item;
      item.id =1;
      grid.invalidateRow(data.length);
      dataView.addItem(item);
      grid.updateRowCount();
      grid.render();
    });

  })
});

