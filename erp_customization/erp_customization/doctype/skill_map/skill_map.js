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





frappe.ui.form.on("Skill Map", "onload", function(frm,doctype,name) {

    // $().appendTo($(wrapper).find('.layout-main-section'));

    $(cur_frm.fields_dict.mygrid.wrapper).append( "<table width='100%>\
  <tr>\
    <td valign='top' width='50%'>\
      <div id='myGrid' style='width:100%;height:300px;''></div>\
    </td>\
  </tr>\
</table>" );

});

// frappe.require("assets/frappe/js/slickgrid.min.js");
var selected_grid_data;
var grid_data;
var selectedData;


// erpnext.selling.CustomQueryReport = erpnext.selling.QuotationController.extend({
frappe.ui.form.on("Skill Map", {
  render: function(frm){
        var me=this;
        msgprint(frm.doc.customer)
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

        var data = [];
        for (var i = 0; i < 100; i++) {
          data[i] = {
            id: i,
            title: "Task " + i,
            duration: i,
            percentComplete: i,
            start: i,
            finish: i,
            effortDriven: i
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
        grid.init();
        dataView.beginUpdate();
        dataView.setItems(data);
        dataView.setFilter(filter);
        dataView.endUpdate();
        msgprint(grid.getDataLength())

        // me.grid_data = dataView.getItems()
        // msgprint(me.grid_data)
        var ids = [];
        for (var i=0; i<grid.getDataLength() ; i++) {
          // ids.push(grid.getDataItem(i).id);
          ids.push(grid.getDataItem(i));
        }
        me.selectedData = ids;

        grid.onAddNewRow.subscribe(function (e, args) {
          var item = args.item;
          item.id =1;
          grid.invalidateRow(data.length);
          dataView.addItem(item);
          grid.updateRowCount();
          grid.render();
          // ids.push(grid.getDataItem(i).id);
          me.selectedData.push((item));

        });
  }, //end of render

  // get_columns:function(doc){
  //   var columns = [];
  //   if (doc.item_groups){
  //     columns = [
  //      {id: "0", name: "Sr", field: "0",width:40, sortable: true},
  //      {id: "1", name: "Quote Item", field: "1",width:100, sortable: true},
  //      {id: "2", name: "Brand", field: "2",width:80, sortable: true},
  //      {id: "3", name: "Performance", field: "3",width:120, sortable: true},
  //      {id: "4", name: "Previously Ordered", field: "4",width:70, sortable: true},
  //      {id: "5", name: "Batch", field: "5",width:80, sortable: true},
  //      {id: "6", name: "Rate", field: "6",width:100, sortable: true},
  //      {id: "7", name: "Actual Qty", field: "7",width:100, sortable: true}
  //     ]
  //   }
  //   else {
  //     columns = [
  //      {id: "0", name: "Sr", field: "0",width:40, sortable: true},
  //      {id: "1", name: "Quote Item", field: "1",width:100, sortable: true},
  //      {id: "2", name: "Brand", field: "2",width:80, sortable: true},
  //      {id: "3", name: "Item Group", field: "3",width:120, sortable: true},
  //      {id: "4", name: "Previously Ordered", field: "4",width:70, sortable: true},
  //      {id: "5", name: "Batch", field: "5",width:80, sortable: true},
  //      {id: "6", name: "Rate", field: "6",width:100, sortable: true},
  //      {id: "7", name: "Actual Qty", field: "7",width:100, sortable: true}
  //     ]
  //   }
  //   return columns
  // },
  save_record: function(frm) {
    var me=this;
    msgprint(me.selectedData.length)

    cur_frm.events.update_skill_mapping_details(cur_frm,me.selectedData)
    // msgprint(me.grid_data);

  },
  update_skill_mapping_details: function(frm, data) {
    me = this;
    // me.frm = frm
    // msgprint(data)
    msgprint("Testtttt: hi from update_skill_mapping_details")
    msgprint(data.length)

    // aa = cur_frm.add_child("skill_mapping_details");
    // aa.industry = "sam";
    // refresh_field("skill_mapping_details");

      // frappe.call({
      //     method: "erp_customization.erp_customization.doctype.skill_map.skill_map.update_skill_details",
      //      args: {
      //       "data": data
      //       // "standards": c.standards,
      //       // "selectedData":selectedData
      //      }, 
      //     callback: function(r) {
      //         // location.reload();   
      //              }
      //   });

var args={
  'doc': frm.doc,
  'data': data
}
console.log(args)
  get_server_fields('update_skill_mapping_details', args, '', frm.doc,'','',1, function(r){
    frm.refresh()
  })
  // return frappe.call({  
  //     method: "update_skill_mapping_details",
  //     doc: args,
  //     callback: function(r, rt){
  //       frm.refresh()
  //     }
  //   });
  },

})

