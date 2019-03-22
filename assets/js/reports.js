/*
Project Name: Atlantis-X
Author: Jason M George
Website: http://www.atlantis-x.com
    ------------------------------------------------
			REPORT CONTENT TABLE
    ------------------------------------------------
    
    <!-- ======== REPORT FUNCTIONS ===== -->
    1.1 Create New Report Object
    1.2 Create Report Save Object
    1.3 Set Edit Mode
    1.4 Get Filter Criteria Element
    1.5 Get Filter Friendly Verbiage
    1.6 Get Filter Items
    1.7 Activate ACE Editor
    

    <!-- ======== REPORT PAGE SETUP ==== -->
    2.1 Get Object ID
    2.2 Set Altantis Obj Header and Initial Edit Mode
    2.3 Add Page Title
    2.4 Add Description / Action Buttons Container
    2.5 Add Reports Container
    2.6 Add New Object Button
    2.7 Add Data Set Selector
    2.8 Add Data Set Items



    <!-- ======== REPORT FACTORY ======= -->
    3.1 Report Item
    3.1 Filter Item

    <!-- ======== APPLICATION SETTING ========== -->
    Reports Application Controller

*/


/* 1.1 Create New Report Object
------------------------------------------------- */
var createNewReportObj = function(){
    var userInfoObj = getUserInfo();
    var objID = getRandomKey();

    return {
        "_id": objID
        , "objectType": "report"
        , "ownedByID": userInfoObj._id
        , "ownedByName": userInfoObj.name
        , "color": "primary"
        , "icon": "fa-globe"
        , "title": "New Report"
        , "desc": "Please describe the function of this Report..."
        , "dataSetID": "none"
        , "connection": "none"
        , reportItems : []
        , filterItems: []
        , exploreChartTitle: 'New Report'
        
    };
};


/* 1.2 Create Report Save Object
------------------------------------------------- */
var createReportSaveObj = function(){

    var userInfoObj = getUserInfo();
       
    return {
        "_id": $('[data-atlantis-object]').attr('data-atlantis-object')
        , "objectType": "report"
        , "ownedByID": userInfoObj._id
        , "ownedByName": userInfoObj.name
        , "color": $('[data-atlantis-object]').attr('data-atlantis-object-color')
        , "icon": $('[data-atlantis-object]').attr('data-atlantis-object-icon')
        , "title": $('#object_title').text().trim()
        , "desc": $('#object_desc').text().trim()
        , "dataSetID": $('[selected-data-set-id]').attr('selected-data-set-id')
        , "connection": $('[selected-data-set-id]').attr('selected-data-set-connection')
        , reportItems : $('.report-items-dropzone').sortable('toArray', {attribute: 'data-set-item-id'})
        , filterItems: getFilterItems()
        , exploreChartTitle: $('#chartTitle').val() || $('#object_title').text().trim()
        
    };

};



/* 1.3 Set Edit Mode
------------------------------------------------- */
var setEditMode = function(editMode){

    $('#content_container').attr('edit-mode', editMode);
    $('#object_title').attr('contenteditable', editMode);
    $('#object_desc').attr('contenteditable', editMode);

    if (editMode){
        $('.report-items-dropzone').sortable('enable');
        $('#report-filter-rule-verbiage-container').html('');
        
    }
    else {
        $('.report-items-dropzone').sortable('disable');
        buildFilterFreindlyVerbiage();
    }

};


/* 1.4 Get Filter Criteria Element
------------------------------------------------- */
var getFilterCriteriaElem = function(itemType, oppr, crit){

    if (itemType == 'date' && oppr == 'dynamic') {
        var crit = crit || 'Last Week';
        var elem = $(' \
            <div class="input-group"> \
                <input type="text" class="form-control form-control-sm text-center"/> \
                <span class="input-group-append"> \
                    <span class="input-group-text"><i class="fa fa-info-circle"></i></span> \
                </span> \
            </div> \
        '); 
        elem.find('input').val(crit);

    }
    else if (itemType == 'date' && oppr == 'fixed') {
        var crit = crit || {startDate: moment().subtract(7 , 'days').format('YYYY-MM-DD'), endDate: moment().subtract(1 , 'days').format('YYYY-MM-DD')};
        var elem = $(' \
            <div class="input-group"> \
                <input type="text" name="default-daterange" class="form-control form-control-sm text-center" value="" placeholder="click to select the date range" /> \
                <span class="input-group-append"> \
                    <span class="input-group-text"><i class="fa fa-calendar"></i></span> \
                </span> \
            </div> \
        ');

        elem.daterangepicker({
            opens: 'right',
            format: 'MM/DD/YYYY',
            separator: ' to ',
            startDate: moment(crit.startDate),
            endDate: moment(crit.endDate),
            minDate: '01/01/2016',
            maxDate: '12/31/2018',
            autoApply: true
        },
        function (start, end) {
            elem.find('input').val(start.format('M/DD/YYYY') + ' - ' + end.format('M/DD/YYYY'));
        });

        elem.find('input').val(moment(crit.startDate).format('M/DD/YYYY') + ' - ' + moment(crit.endDate).format('M/DD/YYYY'));

    } else if (itemType == 'attribute') {

        var crit = crit || [];
        var li = '';
        crit.map(function(item, index){
            li += '<li>' + item + '</li>';
        })
        var elem = $(' \
            <div class="input-group"> \
                <ul class="inverse form-control form-control-sm"> \
                    ' + li + ' \
                </ul> \
                <span class="input-group-append"> \
                    <span class="input-group-text"><i class="fa fa-tag"></i></span> \
                </span> \
            </div> \
        '); 
        elem.find('ul').tagit({
            allowSpaces: true,
        });

    } else if (itemType == 'metric') {

        var crit = crit || '';
        elem = $(' \
            <div class="input-group"> \
                <input type="text" class="form-control form-control-sm"/> \
                <span class="input-group-append"> \
                    <span class="input-group-text"><i class="fa fa-hashtag"></i></span> \
                </span> \
            </div> \
        '); 
        elem.find('input').val(crit);

    }

    return elem

};


/* 1.5 Build Filter Friendly Verbiage
------------------------------------------------- */
var buildFilterFreindlyVerbiage = function(){

    var filterItems = getFilterItems();

    filterItems.map(function(item, index){

        var elem = $('<span class="report-filter-rule-verbiage" data-set-item-type="' + item.itemType + '"><i class="fa fa-circle m-r-5"></i></span>')

        if (item.itemType == 'date'){
            if (item.oppr == 'dynamic'){
                elem.append(item.itemTitle + ' is Dynamic and set to "' + item.crit + '"');
            } else if (item.oppr == 'fixed'){
                elem.append(item.itemTitle + ' is Fixed between ' + moment(item.crit.startDate).format('M/DD/YYYY') + ' and ' + moment(item.crit.endDate).format('M/DD/YYYY'));
            }

        } else if (item.itemType == 'attribute') {
            elem.append(item.itemTitle + ' ' + filterSelectOptionsObj[item.itemType][item.oppr].friendly + ' ' + item.crit.map(function(i){return '"' + i + '"'}).join(' or '));
        } else if (item.itemType == 'metric') {
            elem.append(item.itemTitle + ' ' + filterSelectOptionsObj[item.itemType][item.oppr].friendly + ' ' + item.crit);
        }

        $('#report-filter-rule-verbiage-container').append(elem);

    })

};


/* 1.6 Get Filter Items
------------------------------------------------- */
var getFilterItems = function(){

    var filterItems = [];

    $('.report-filter-rule').each(function(){
        var filterObj = {};
        filterObj.itemID = $(this).attr('data-set-item-id');
        filterObj.itemTitle = $(this).find('.report-filter-rule-label').text().trim();
        filterObj.itemType = $(this).attr('data-set-item-type');
        filterObj.oppr = $(this).find('.report-filter-rule-oppr').val();

        if (filterObj.itemType == 'date'){
            if (filterObj.oppr == 'dynamic'){
                filterObj.crit = $(this).find('.report-filter-rule-criteria input').val();
            } else if (filterObj.oppr == 'fixed'){
                filterObj.crit = {};
                filterObj.crit.startDate = $(this).find('.report-filter-rule-criteria .input-group').data('daterangepicker').startDate.format('YYYY-MM-DD');
                filterObj.crit.endDate = $(this).find('.report-filter-rule-criteria .input-group').data('daterangepicker').endDate.format('YYYY-MM-DD');
            }

        } else if (filterObj.itemType == 'attribute') {
            filterObj.crit = $(this).find('.report-filter-rule-criteria ul').tagit('assignedTags');
        } else if (filterObj.itemType == 'metric') {
            filterObj.crit = $(this).find('.report-filter-rule-criteria input').val();
        };

        filterItems.push(filterObj);

    })

    return filterItems;

};


/* 1.7 Activate ACE Editor
------------------------------------------------- */
var activateAceEditor = function(){
    var editor = ace.edit("report_sql");
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode({
       path: "ace/mode/sql"
       , v: Date.now() // Chache Buster
    })
    editor.selection.moveCursorToPosition({row: 1, column: 0});
    editor.setHighlightActiveLine(false);
    editor.setAutoScrollEditorIntoView(true);
    editor.session.setUseWrapMode(true);
    editor.setOptions({
        readOnly: true,
        maxLines: Infinity,
        minLines: 10,
        showGutter: false,
        showPrintMargin: false,
        fontSize: 13,
    });
    editor.clearSelection();
    editor.renderer.$cursorLayer.element.style.display = 'none';

    return editor;
};


/* 2.1 Get Object ID
------------------------------------------------- */
var getObjectID = function(){
    var objectID = getURLParam('objID');
    return objectID;
};


/* 2.2 Set Altantis Obj Header and Initial Edit Mode
------------------------------------------------- */
var setInitialEditMode = function(atlantisObj, editMode){
    $('#content_container')
    .attr('edit-mode', editMode)
    .attr('data-atlantis-object', atlantisObj._id)
    .attr('data-atlantis-object-color', atlantisObj.color)
    .attr('data-atlantis-object-icon', atlantisObj.icon)

    setEditMode(editMode);
};


/* 2.3 Add Page Title
------------------------------------------------- */
var addPageTitle = function(atlantisObj){

    // Title
    $('#page_header').append('<i id="object_icon" class="fa ' + atlantisObj.icon + ' fa-lg" edit-mode-hide></i>');

    // Icon Picker Button
    $('#page_header').append(
        iconButton({
            icon: atlantisObj.icon
            , color: atlantisObj.color
            , data: 'style="vertical-align: 3px;margin-right:5px;" icon-picker="' + iconPickerArray.indexOf(atlantisObj.icon) + '" edit-mode-show'
            , clickFunction: function(){
                var newIcon = updateIconPicker($(this), 1);
                $('#content_container').attr('data-atlantis-object-icon', iconPickerArray[newIcon]);
                $('#object_icon').removeClass(function(index, className){
                    return (className.match (/fa-.*/g) || []).join(' ');
                });
                $('#object_icon').addClass(iconPickerArray[newIcon] + ' fa-lg');

            } 
        })
    );

    // Color Picker Button
    $('#page_header').append(
        iconButton({
            icon: 'fa-tint'
            , color: atlantisObj.color
            , data: 'style="vertical-align: 3px;margin-right:5px;" color-picker="' + colorPickerArray.indexOf(atlantisObj.color) + '" edit-mode-show'
            , clickFunction: function(){
                var newColor = updateColorPicker($(this), 1);
                $('#content_container').attr('data-atlantis-object-color', colorPickerArray[newColor]);
                $('[icon-picker]').removeClass(function(index, className){
                    return (className.match (/btn-.*/g) || []).join(' ');
                });
                $('[icon-picker]').addClass('btn-' + colorPickerArray[newColor] + ' btn-icon btn-lg');

            } 
        })
    );
    $('#page_header').append('<span id="object_title" class="title">' + atlantisObj.title + '</span>');
};


/* 2.4 Add Description / Action Buttons Container
------------------------------------------------- */
var addDescContainer = function(atlantisObj){
    var elem = $(' \
        <div class="row m-b-20"> \
            <div class="col-md-6"> \
                <p id="object_desc"> \
                ' + atlantisObj.desc + ' \
                </p> \
            </div> \
            <div class="col-md-6"> \
                <div class="btn-row pull-right"> \
                </div> \
            </div> \
        </div> \
    ');

    elem.find('.btn-row').append(
        iconButton({
            icon: 'fa-bolt'
            , clickFunction: function(){
                var btn = $(this);
                var dataSetObj = storeSessionInfo.get('dataSetObj');
                var reportItems = $('.report-items-dropzone').sortable('toArray', {attribute: 'data-set-item-id'});
                var filterItems = getFilterItems();
                var sql = buildSqlStatement(dataSetObj, reportItems, filterItems, false);
                var sqlFriendly = buildSqlStatement(dataSetObj, reportItems, filterItems, true);
                var connection = dataSetObj.connection;
                var sqlFlavor = dataSetObj.sqlFlavor;
                var chartContainer = 'explore_chart_container';

                // Add the SQL Statement to the SQL Tab
                $('#results_table_container').removeClass('hidden');
                var editor = ace.edit('report_sql');
                editor.setValue(sqlFriendly);
                editor.clearSelection();

                // Clean Up
                $('.alert').alert('close');
                $('#results_table').html('');
                $('#explore_chart_options_container').html('');
                var chart = $('#' + chartContainer).highcharts();
                if(chart) {
                    chart.destroy()
                }
                $('#' + chartContainer).html('')
                btn.addClass('refreshing');

                sqlData.get(connection, sql, sqlFlavor, sqlRowLimit, function(sqlResults, status, goodToGo){

                    btn.removeClass('refreshing');
                    if(!goodToGo){return false};

                    //  Add the Results to the Results Table
                    
                    $('#results_table').append(tableReportBuilder(sqlResults, dataSetObj, 'table-bordered table-striped'));
                    $('#results_table  table').DataTable({
                        "responsive": true,
                        "pageLength": 50,
                        "aaSorting": []
                    });

                    //  Check for Too Many Results
                    if (sqlResults.length > sqlRowLimit) {

                        headerNotification('warning' ,'Row limit reached.' ,'Results diplayed here are limited.  Please Download for the full Results set.', true);

                    }

                    // Build the Explore Chart Options
                    var reportItemTypesArray = $('.report-items-dropzone').sortable('toArray', {attribute: 'data-set-item-type'});
                    var reportItemTypesObj = {
                        date: 0,
                        attribute: 0,
                        metric: 0
                    };
                    reportItemTypesArray.map(function(item, index){
                        reportItemTypesObj[item] ++
                    })

                    if (
                        (reportItemTypesObj.date == 0 && reportItemTypesObj.attribute == 0)
                        || (reportItemTypesObj.metric == 0)
                        || (reportItemTypesObj.date != 0 && reportItemTypesObj.date > 1)
                        || (reportItemTypesObj.date == 1 && reportItemTypesObj.attribute > 1)
                        || (reportItemTypesObj.date == 0 && reportItemTypesObj.attribute > 2)
                    ) {
                        return false;
                    }

                    var elem = $(' \
                        <div> \
                            <legend class="m-b-15">Chart Options</legend> \
                            <div class="form-group"> \
                                <label for="chartTitle">Chart Title</label> \
                                <input id="chartTitle" type="text" class="form-control form-control-sm"/> \
                            </div> \
                            <div class="form-group"> \
                                <label for="yAxis">Y-Axis</label> \
                                <select id="yAxis" class="form-control form-control-sm"> \
                                </select> \
                            </div> \
                            <div style="position: absolute; bottom: 20px;"> \
                                <a href="javascript:;" class="btn btn-default active"> \
                                    <i class="fa fa-envelope"></i> \
                                    Create Document \
                                </a> \
                            </div> \
                        </div> \
                    ');

                    elem.find('#chartTitle').val(atlantisObj.exploreChartTitle).change(function(){
                        var chart = $('#explore_chart_container').highcharts();
                        chart.update({title: {text: $(this).val()}})
                    });

                    var yOptions = '';
                    var cOptions = '';
                    reportItemTypesArray.map(function(item, index){
                        item == 'attribute' ? cOptions = '<option value="' + sqlResults[0][index] + '">' + dataSetObj.dataItems[sqlResults[0][index]].itemTitle + '</option>' + cOptions : false;
                        item == 'metric' ? yOptions += '<option value="' + sqlResults[0][index] + '">' + dataSetObj.dataItems[sqlResults[0][index]].itemTitle + '</option>' : false;
                    })
                    elem.find('#yAxis').append(yOptions);

                    if (reportItemTypesObj.attribute == 2){

                        var stackedCheckBox = $(' \
                            <div class="form-group"> \
                                <label for="colorBy">Color By</label> \
                                <select id="colorBy" class="form-control form-control-sm"> \
                                ' + cOptions + ' \
                                </select> \
                            </div> \
                            <div class="checkbox checkbox-css m-b-30"> \
                                <input type="checkbox" id="stacked_checkbox" value="" > \
                                <label for="stacked_checkbox"> \
                                    Stacked \
                                </label> \
                            </div> \
                        ');

                        stackedCheckBox.find('input').click(function () {

                            var chk = $(this).attr('data-checked') == 'true' ? 'false' : 'true';
                            $(this).attr('data-checked', chk);

                            var chart = $('#' + chartContainer).highcharts();
                            var newStacking = chart.options.plotOptions.series.stacking == 'normal' ? '' : 'normal';

                            chart.update({
                                plotOptions: {
                                    series: {
                                        stacking: newStacking
                                    },
                                },
                            });

                        });

                        elem.append(stackedCheckBox);
                    }

                    elem.find('select').change(function(){

                        var chart = $('#' + chartContainer).highcharts();
                        if(chart) {
                            chart.destroy()
                        }
                        $('#' + chartContainer).html('')

                        var chartWidth = $('#' + chartContainer).parents('.tab-content').width();
                        $('#' + chartContainer).attr('style', 'height:' + chartWidth * .75 *.6 + 'px;');

                        var chartTitle = $('#chartTitle').val();
                        var chartType = reportItemTypesObj.date == 1 ? 'spline' : 'column';
                        var yItem = $('#yAxis').val();
                        var yTitle = dataSetObj.dataItems[yItem].itemTitle;

                        if (reportItemTypesObj.date == 1){
                            var xItem = sqlResults[0][reportItemTypesArray.indexOf('date')];
                            var pItem = sqlResults[0][reportItemTypesArray.indexOf('attribute')] || false;
                        }
                        else {
                            var reportAttributesArray = sqlResults[0].filter(function(item, index){
                                return reportItemTypesArray[index] == 'attribute' ? item : false;
                            })
                            var xItem = reportAttributesArray.length == 1 || reportAttributesArray.indexOf($('#colorBy').val()) == 1 ? reportAttributesArray[0] : reportAttributesArray[1];
                            var pItem = $('#colorBy').val() || false;
                        };


                        var chartData = createHighChartsResults(sqlResults, xItem, yItem, pItem);
                        buildHighChart(chartContainer, chartType, chartData, chartTitle, dataSetObj, yTitle);

                        // Keep The Chosen Stacking
                        var chart = $('#' + chartContainer).highcharts();
                        var stacked = $('#stacked_checkbox').attr('data-checked') == 'true' ? 'normal' : '';

                        chart.update({
                            plotOptions: {
                                series: {
                                    stacking: stacked
                                },
                            },
                        });

                    });

                    $('#explore_chart_options_container').append(elem);
                    $('#yAxis').trigger('change');

                    elem.find('.btn').click(function(){

                        var chart = $('#' + chartContainer).highcharts();
                        storeSessionInfo.add('tempChartOptions', chart.options);
                        window.location.href = "compose-document.html";

                    });

                });
                
            }
        })
    );
    

    elem.find('.btn-row').append(
        iconButton({
            icon: 'fa-download'
            , clickFunction: function(){
                var btn = $(this);
                var dataSetObj = storeSessionInfo.get('dataSetObj');
                var reportItems = $('.report-items-dropzone').sortable('toArray', {attribute: 'data-set-item-id'});
                var filterItems = getFilterItems();
                var sql = buildSqlStatement(dataSetObj, reportItems, filterItems, true);
                var connection = dataSetObj.connection;
                var fileName = $('#object_title').text().trim();

                btn.addClass('refreshing');
                sqlData.download(connection, fileName, sql, function(sqlResults, status){

                    btn.removeClass('refreshing');

                });
                
            }
        })
    );


    var userInfoObj = getUserInfo();

    if (userInfoObj._id == atlantisObj.ownedByID){

        elem.find('.btn-row').append(
            iconButton({
                icon: 'fa-edit'
                , data: 'edit-mode-hide'
                , clickFunction: function(){
                    setEditMode(true);
                }
            })
        );

        elem.find('.btn-row').append(
            iconButton({
                icon: 'fa-save'
                , addClass: 'active'
                , data: 'edit-mode-show'
                , clickFunction: function(){
                    var btn = $(this);
                    var saveObj = createReportSaveObj();

                    if (saveObj.dataSetID == 'none'){
                        var alert = {"color":"danger", "title":"Uh Oh!", "text":"Please Select a Data Set."};
                        gritterNotification(alert);

                        return false;
                    }

                    if (saveObj.reportItems.length == 0){
                        gritterNotification({"color":"danger", "title":"Uh Oh!", "text":"Please add some Report Items."});
                        return false;
                    }

                    $('.alert').alert('close')
                    btn.addClass('refreshing');
                    mongo.write('objects', saveObj._id, JSON.stringify(saveObj), function(results, status){
                                        
                        if(status == 'success'){
                            btn.removeClass('refreshing');
                            setEditMode(false);
                            gritterNotification({"color":"success", "title":"Success!", "text":"Your Report was successfully saved."});
                            window.history.replaceState({},window.location.pathname, window.location.pathname + '?objID=' + saveObj._id);
                        }
                        else {
                            gritterNotification({"color":"danger", "title":"Error!", "text":"Something went wrong. Your Report was not saved."});
                        }

                    });
                }
            })
        );

    }
    

    $('#content_container').append(elem);
};


/* 2.5 Add Report Container
------------------------------------------------- */
var addReportsContainer = function(atlantisObj){

    var elem = $(' \
        <div class="row"> \
            <div id="data_set_panel" class="col-md-3"> \
                <div class="panel panel-100" data-sortable="false"> \
                    <div class="panel-heading panel-content-heading"> \
                        <h4 class="panel-title"><i class="fa fa-key"></i>Data Set</h4> \
                    </div> \
                    <div class="panel-body"> \
                        <div id="data_set_selector" class="data-set-selector"></div> \
                        <div id="data_set_items_container" class="data-set-items-container"> \
                        </div> \
                    </div> \
                </div> \
            </div> \
            <div class="col-md-9"> \
                <div class="panel panel-100" data-sortable="false"> \
                    <div class="panel-heading panel-content-heading"> \
                        <div class="panel-heading-btn"> \
                        <a href="#" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"> \
                            <i class="fa fa-expand"></i> \
                        </a> \
                        </div> \
                        <h4 class="panel-title"><i class="fa fa-wrench"></i>Report Builder</h4> \
                    </div> \
                    <div class="panel-body"> \
                            <div id="report_builder_filters_container"> \
                                <div class="form-group"> \
                                    <label>Filter Items</label> \
                                    <div id="report-filter-rule-verbiage-container"> \
                                    </div> \
                                    <div class="filter-items-sortable"> \
                                    </div> \
                                    <div class="filter-items-dropzone"> \
                                    </div> \
                                </div> \
                            </div> \
                            <div id="report_builder_items_container" class="m-b-30"> \
                                <div class="form-group"> \
                                    <label>Report Items</label> \
                                    <div class="report-items-dropzone"> \
                                    </div> \
                                </div> \
                            </div> \
                            <div id="results_table_container" class="hidden"> \
                                <ul class="nav nav-tabs"> \
                                    <li class="nav-items"> \
                                        <a href="#results-table-tab" data-toggle="tab" class="nav-link active"> \
                                            <span class="d-sm-none">Tab 1</span> \
                                            <span class="d-sm-block d-none"><i class="fa fa-table"></i>Results</span> \
                                        </a> \
                                    </li> \
                                    <li class="nav-items"> \
                                        <a href="#results-sql-tab" data-toggle="tab" class="nav-link"> \
                                            <span class="d-sm-none">Tab 2</span> \
                                            <span class="d-sm-block d-none"><i class="fa fa-code"></i>SQL</span> \
                                        </a> \
                                    </li> \
                                    <li class=""> \
                                        <a href="#results-explore-tab" data-toggle="tab" class="nav-link"> \
                                            <span class="d-sm-none">Tab 3</span> \
                                            <span class="d-sm-block d-none"><i class="fa fa-bar-chart"></i>Explore</span> \
                                        </a> \
                                    </li> \
                                </ul> \
                                <div class="tab-content"> \
                                    <div id="results-table-tab" class="tab-pane fade active show"> \
                                        <div id="results_table"> \
                                        </div> \
                                    </div> \
                                    <div  id="results-sql-tab" class="tab-pane fade"> \
                                        <div class="sql-container"> \
                                            <pre id="report_sql" style="width:100%;height: 20px;" class="autosize sql-pre m-t-10"></pre> \
                                        </div> \
                                    </div> \
                                    <div id="results-explore-tab" class="tab-pane fade"> \
                                        <div class="row"> \
                                            <div id="explore_chart_options_container" class="col-md-4"> \
                                            </div> \
                                            <div class="col-md-8"> \
                                                <div id="explore_chart_container"> \
                                                </div> \
                                            </div> \
                                        </div> \
                                    </div>\
                                </div> \
                            </div> \
                    </div> \
                </div> \
            </div> \
        </div> \
    ');

    elem.find('.filter-items-dropzone').droppable({
        accept: '.report-data-set-item-info',
        helper: 'clone',
        drop: function (event, ui) {
            var itemID = ui.draggable.attr('data-set-item-id');
            var itemTitle = ui.draggable.attr('data-set-item-title');
            var itemType = ui.draggable.attr('data-set-item-type');

            $('.filter-items-sortable').append(filterItem(itemID, itemTitle, itemType));
            $('#' + itemID).attr('data-filter-item', 'true');
        } 
    });

    elem.find('.filter-items-sortable').sortable({
        axis: 'y',
        handle: '.sortable-handle',
    });

    elem.find('.report-items-dropzone').sortable({
        helper: 'clone',
        items: '.label',
        start: function( event, ui ) {
            ui.placeholder.text(ui.item.text().trim());
        }
    });

    elem.find('.report-items-dropzone').droppable({
        accept: '.report-data-set-item-info',
        helper: 'clone',
        drop: function (event, ui) {
            var itemID = ui.draggable.attr('data-set-item-id');
            var itemTitle = ui.draggable.attr('data-set-item-title');
            var itemType = ui.draggable.attr('data-set-item-type');
            if($('.report-items-dropzone').find('[data-set-item-id="'+ itemID +'"]').length !== 0){
                return false;
            }

            if($(this).find(".placeholder").length > 0){
                $(this).append(reportItem(itemID, itemTitle, itemType));
            }
            else {

                var isEmpty = true;

                $(this).children('span').each(function(){
                    if($(this).offset().left>=ui.offset.left){
                        $(reportItem(itemID, itemTitle, itemType)).insertBefore($(this));
                        isEmpty = false;   
                        return false;
                    }
                })

                if(isEmpty){
                    $(this).append(reportItem(itemID, itemTitle, itemType));
                }

            }

            $('#' + itemID).attr('data-report-item', 'true');

        } 
    })

    $('#content_container').append(elem);

};


/* 2.6 Add New Object Button
------------------------------------------------- */
var addNewButton = function(objectType){

    var elem = $('<div class="pull-right"></div>');

    elem.append(
        iconButton({
            icon: 'fa-plus'
            , clickFunction: function(){
                window.location.href = atlantisObjectTypeObj[objectType].href + '?objID=new';
            }
        })
    );

    $('#page_header').append(elem);

};


/* 2.7 Add Data Set Selector
------------------------------------------------- */
var addDataSetSelector = function(atlantisObj){
    mongo.get('objects', '{"objectType":"dataset"}', 'title', function(mongoResults){

        var selectedDataSetID = 'none';
        var selectedDataSetTitle = 'Please Select a Data Set...';
        var selectedDataSetIcon = 'fa-globe';
        var selectedDataSetConnection = 'none';

        var li = '';
        for (var i=0;i<mongoResults.length;i++){
            li += '<li><a href="javascript:;" data-set-id="' + mongoResults[i]._id +'" data-set-title="' + mongoResults[i].title +'" data-set-icon="' + mongoResults[i].icon +'" data-set-connection="' + mongoResults[i].connection +'">' + mongoResults[i].title +'</a></li>';
            if (mongoResults[i]._id == atlantisObj.dataSetID){
                selectedDataSetID = mongoResults[i]._id;
                selectedDataSetTitle = mongoResults[i].title;
                selectedDataSetIcon = mongoResults[i].icon;
                selectedDataSetConnection = mongoResults[i].connection;
            }
        }
        var elem = $(' \
            <h5 class="" selected-data-set-id="' + selectedDataSetID + '" selected-data-set-title="' + selectedDataSetTitle +'" selected-data-set-icon="' + selectedDataSetIcon +'" selected-data-set-connection="' + selectedDataSetConnection + '"> \
                <a href="javascript:;" data-toggle="dropdown" class="btn btn-default" edit-mode-show><i class="fa fa-key"></i><i class="fa fa-caret-down"></i></a> \
                </a> \
                <ul class="dropdown-menu"> \
                    ' + li + ' \
                </ul> \
                <i class="fa ' + selectedDataSetIcon + '" edit-mode-hide></i> \
                <span>' + selectedDataSetTitle + '</span> \
            </h5> \
        ');

        elem.find('li a').click(function(){

            selectedDataSetID = $(this).attr('data-set-id');
            selectedDataSetTitle = $(this).attr('data-set-title');
            selectedDataSetIcon = $(this).attr('data-set-icon');
            selectedDataSetConnection = $(this).attr('data-set-connection');
            $('[selected-data-set-id]').attr('selected-data-set-id', selectedDataSetID);
            $('[selected-data-set-title]').attr('selected-data-set-title', selectedDataSetTitle);
            $('[selected-data-set-title]').find('span').text(selectedDataSetTitle);
            $('[selected-data-set-icon]').attr('selected-data-set-icon', selectedDataSetIcon);
            $('[selected-data-set-connection]').attr('selected-data-set-connection', selectedDataSetConnection);
            addDataSetItems(selectedDataSetID);

        });

        $('#data_set_selector').append(elem);
    });

};


/* 2.8 Add Data Set Items
------------------------------------------------- */
var addDataSetItems = function(dataSetID){

    if(dataSetID == 'none'){
        return false
    };

    mongo.get('objects', '{"_id":"' + dataSetID + '"}', 'title', function(mongoResults){

        storeSessionInfo.add('dataSetObj', mongoResults[0]);
        
        $('#data_set_items_container').html('');

        var dataItems = mongoResults[0].dataItems;
        var elem = $('<div data-scrollbar="true" data-height="100%"></div>')

        mongoResults[0].sortArray.map(function(item, index){

            var icon = dataItems[item].itemType == 'metric' ? '<i class="fa ' + dataItems[item].itemIcon + ' m-r-5"></i>' : '';

            elem.append(' \
                <div id="' + item + '" class="report-data-set-item" data-report-item="false" data-filter-item="false"> \
                    <div class="report-data-set-item-info" data-set-item-id="' + item + '" data-set-item-title="' + dataItems[item].itemTitle + '" data-set-item-type="' + dataItems[item].itemType + '" > \
                        ' + icon + ' \
                        ' + dataItems[item].itemTitle + ' \
                    </div> \
                    <div class="report-data-set-item-icons"> \
                        <i class="fa fa-filter filter-item"></i> \
                        <i class="fa fa-table report-item"></i> \
                    </div> \
                </div> \
            ');

        })
            

        elem.find('.report-data-set-item-info').draggable({
            helper: 'clone',
            start: function( event, ui ) {
                var editMode = $('#content_container').attr('edit-mode');
                if (editMode == "false") {return false}
            }, 
        })

        $('#data_set_items_container').append(elem);

    });

};


/* 2.9 Add Report Items
------------------------------------------------- */
var addReportItems = function(atlantisObj){

    if(atlantisObj.dataSetID == 'none'){
        return false
    };

    mongo.get('objects', '{"_id":"' + atlantisObj.dataSetID + '"}', 'title', function(mongoResults){
        var dataSetObj = mongoResults[0];

        atlantisObj.reportItems.map(function(item){
            var itemID = item;
            var itemTitle = dataSetObj.dataItems[item].itemTitle;
            var itemType = dataSetObj.dataItems[item].itemType;
            var itemIcon = dataSetObj.dataItems[item].itemIcon;
            $('.report-items-dropzone').append(reportItem(itemID, itemTitle, itemType));
            $('#' + item).attr('data-report-item', 'true');
        });

        atlantisObj.filterItems.map(function(item){
            var itemID = item.itemID;
            var itemTitle = dataSetObj.dataItems[itemID].itemTitle;
            var itemType = dataSetObj.dataItems[itemID].itemType;
            var oppr = item.oppr;
            var crit = item.crit;
            $('.filter-items-sortable').append(filterItem(itemID, itemTitle, itemType, oppr, crit));
            $('#' + itemID).attr('data-filter-item', 'true');
        });

        buildFilterFreindlyVerbiage();

    });

};



/* 3.1 Report Item
------------------------------------------------- */
var reportItem = function(itemID, itemTitle, itemType){

    var elem = $('<span class="label" data-set-item-id="' + itemID + '" data-set-item-type="' + itemType + '">' + itemTitle + '<i class="fa fa-times"  edit-mode-show></i></span>');

    elem.find('i').click(function(){
        var itemID  = $(this).parents('[data-set-item-id]').attr('data-set-item-id')
        $(this).parent().remove();
        $('#' + itemID).attr('data-report-item', 'false');
    });

    return elem;

}


/* 3.2 Filter Item
------------------------------------------------- */
var filterItem = function(itemID, itemTitle, itemType, oppr, crit){
    var oppr = oppr || (itemType == 'date' ? 'dynamic' : 'equals');

    var selectOptions = '';
    for (s in filterSelectOptionsObj[itemType]){
        selectOptions += '<option value="' + s + '">' + filterSelectOptionsObj[itemType][s].friendly + '</option>'
    }

    var elem = $(' \
        <div class="report-filter-rule" data-set-item-id="' + itemID + '" data-set-item-type="' + itemType + '"> \
            <div class="form-group row"> \
                <div class="col-md-2"> \
                    <div class="report-filter-rule-label"> \
                        <i class="fa fa-bars sortable-handle"></i> \
                        ' + itemTitle + ' \
                    </div> \
                </div> \
                <div class="col-md-3"> \
                    <select class="form-control form-control-sm report-filter-rule-oppr"> \
                        ' + selectOptions + ' \
                    </select> \
                </div> \
                <div class="col-md-6"> \
                    <div class="report-filter-rule-criteria"> \
                    </div> \
                </div> \
                <div class="col-md-1 text-center"><i class="fa fa-times-circle fa-lg fa-x p-t-10"></i></div> \
            </div> \
        </div> \
    ');

    elem.find('select').val(oppr);

    elem.find('.report-filter-rule-criteria').append(getFilterCriteriaElem(itemType, oppr, crit));

    elem.find('.report-filter-rule-oppr').on('change', function(){
        var itemType = $(this).parents('[data-set-item-type]').attr('data-set-item-type');
        var oppr = $(this).val();
        $(this).parents('.report-filter-rule').find('.report-filter-rule-criteria').html('').append(getFilterCriteriaElem(itemType, oppr));

    });

    elem.find('.fa-x').click(function(){
        $(this).parents('.report-filter-rule').remove();
        $('#' + itemID).attr('data-filter-item', 'false');
    });

    return elem



}


/* Application Controller
------------------------------------------------- */
var reports = function () {
    "use strict";
    
    var setting;
    
    return {
        //main function
        pageSetup: function(){
            var objectID = getObjectID();
            var editMode = objectID == 'new' ? true : false;

            // Get the Atlantis Object
            mongo.get('objects', '{"_id":"' + objectID + '"}', 'title', function(mongoResults){
                var atlantisObj = mongoResults[0] || createNewReportObj();
                addPageTitle(atlantisObj);
                addDescContainer(atlantisObj);
                addReportsContainer(atlantisObj);
                addNewButton(atlantisObj.objectType);
                addDataSetSelector(atlantisObj);
                addDataSetItems(atlantisObj.dataSetID);
                addReportItems(atlantisObj);
                var editor = activateAceEditor();
               
                setInitialEditMode(atlantisObj, editMode);
                atlantisApp.init();
                App.init();
            });

        },
        
    };

}();