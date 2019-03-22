/*
Project Name: Atlantis-X
Author: Jason M George
Website: http://www.atlantis-x.com
    ------------------------------------------------
			DASHBOARD CONTENT TABLE
    ------------------------------------------------
    
    <!-- ======== DASHBOARD FUNCTIONS ===== -->
    1.1 Update Date Range in AtlantisObj
    1.2 Create New Dashboard Object
    1.3 Create Dashboard Save Object
    1.4 Set Edit Mode
    1.5 Get Filter Criteria Element
    1.6 Get Filter Items
    1.7 Edit Widget
    1.8 Remove Widget
    1.9 Update Widget Positions
    1.10 Get Date Filter Object

    
    <!-- ======== DASHBOARD PAGE SETUP ==== -->
    2.1 Get Object ID
    2.2 Set Altantis Obj Header and Initial Edit Mode
    2.3 Add Page Title
    2.4 Add Description / Action Buttons Container
    2.5 Add Date Selection Container
    2.6 Add Dashboard Container
    2.7 Widget Modal
    2.8 Add Widgets
    2.9 Refresh Widgets


    <!-- ======== DASHBOARD FACTORY ======= -->
    3.1 Date Range Selector
    3.2 Widget Modal
    3.3 Dashboard Widgets
    3.3 Filter Container
    3.4 Filter Item

    <!-- ======== APPLICATION SETTING ========== -->
    DASHBOARD Application Controller

*/


/* 1.1 Update Date Range in AtlantisObj
------------------------------------------------- */
var updateDateRange = function(tempObj){

    var tempObj = tempObj || false;

    if (tempObj == false){
        return false
    }

    if (tempObj.reportDateRange.type == 'dynamic'){
        var dateRangeObj = translateFriendlyDate(tempObj.reportDateRange.verbiage)
        tempObj.reportDateRange.startDate = dateRangeObj.startDate;
        tempObj.reportDateRange.endDate = dateRangeObj.endDate;
    }

    if (tempObj.compDateRange.type == 'dynamic'){
        var dateRangeObj = translateFriendlyDate(tempObj.compDateRange.verbiage)
        tempObj.compDateRange.startDate = dateRangeObj.startDate;
        tempObj.compDateRange.endDate = dateRangeObj.endDate;
    }

    return tempObj;

};


/* 1.2 Create New Dashboard Object
------------------------------------------------- */
var createNewDashboardObj = function(){
    var userInfoObj = getUserInfo();
    var objID = getRandomKey();
    
    return {
        "_id": objID
        , "objectType": "dashboard"
        , "ownedByID": userInfoObj._id
        , "ownedByName": userInfoObj.name
        , "color": "primary"
        , "icon": "fa-globe"
        , "title": "New Dashboard"
        , "desc": "Please describe the function of this Dashboard..."
        , "reportDateRange" : {
            "type": "dynamic"
            , "verbiage": "Last Week"
            , "startDate": ""
            , "endDate": ""
        }
        , "compDateRange" : {
            "type": "dynamic"
            , "verbiage": "Prior Week"
            , "startDate": ""
            , "endDate": ""
        }
        , "widgets": []
        
    };
};


/* 1.3 Create Dashboard Save Object
------------------------------------------------- */
var createDashboardSaveObj = function(){

    var userInfoObj = getUserInfo();
    var reportDateRangeType = $('[data-date-range-type="reportDateRange"] select').val();
    var compDateRangeType = $('[data-date-range-type="compDateRange"] select').val();
    var dashWidgets = updateWidgetPositions(storeSessionInfo.get('dashWidgets'));

    return {
        "_id": $('[data-atlantis-object]').attr('data-atlantis-object')
        , "objectType": "dashboard"
        , "ownedByID": userInfoObj._id
        , "ownedByName": userInfoObj.name
        , "color": $('[data-atlantis-object]').attr('data-atlantis-object-color')
        , "icon": $('[data-atlantis-object]').attr('data-atlantis-object-icon')
        , "title": $('#object_title').text().trim()
        , "desc": $('#object_desc').text().trim()
        , "reportDateRange" : {
            "type": reportDateRangeType
            , "verbiage": reportDateRangeType == 'dynamic' ? $('[data-date-range-type="reportDateRange"] .date-range input').val() : ""
            , "startDate": reportDateRangeType == 'fixed' ? $('[data-date-range-type="reportDateRange"] .date-range .input-group').data('daterangepicker').startDate.format('YYYY-MM-DD') : ""
            , "endDate": reportDateRangeType == 'fixed' ? $('[data-date-range-type="reportDateRange"] .date-range .input-group').data('daterangepicker').endDate.format('YYYY-MM-DD') : ""
        }
        , "compDateRange" : {
            "type": compDateRangeType
            , "verbiage": compDateRangeType == 'dynamic' ? $('[data-date-range-type="compDateRange"] .date-range input').val() : ""
            , "startDate": compDateRangeType == 'fixed' ? $('[data-date-range-type="compDateRange"] .date-range .input-group').data('daterangepicker').startDate.format('YYYY-MM-DD') : ""
            , "endDate": compDateRangeType == 'fixed' ? $('[data-date-range-type="compDateRange"] .date-range .input-group').data('daterangepicker').endDate.format('YYYY-MM-DD') : ""
        }
        , "widgets": dashWidgets
        
    };

};



/* 1.4 Set Edit Mode
------------------------------------------------- */
var setEditMode = function(editMode){

    $('#content_container').attr('edit-mode', editMode);
    $('#object_title').attr('contenteditable', editMode);
    $('#object_desc').attr('contenteditable', editMode);

    var grid = $('.grid-stack').data('gridstack');
    grid.movable($('.grid-stack-item'), editMode);
    grid.resizable($('.grid-stack-item:not([data-gs-no-resize="true"])'), editMode);
    
};


/* 1.5 Get Filter Criteria Element
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


/* 1.6 Get Filter Items
------------------------------------------------- */
var getFilterItems = function(){

    var filterItems = [];

    $('.report-filter-rule').each(function(){
        var filterObj = {};
        filterObj.itemID = $(this).attr('data-set-item-id');
        filterObj.itemTitle = $(this).attr('data-set-item-title');
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


/* 1.7 Edit Widget
------------------------------------------------- */
var editWidget = function(widgetID){
    var dashWidgets = storeSessionInfo.get('dashWidgets');
    var pos = 0;
    dashWidgets.map(function(item, index){
        if(item.widgetID == widgetID){
            pos = index;
        }
    });

    widgetModal(dashWidgets[pos]);

}


/* 1.8 Remove Widget
------------------------------------------------- */
var removeWidget = function(widgetID){

    var elem = $('.grid-stack-item[data-widget-id="' + widgetID + '"]');

    var dashWidgets = storeSessionInfo.get('dashWidgets');
    var pos = 0;
    dashWidgets.map(function(item, index){
        if(item.widgetID == widgetID){
            pos = index;
        }
    });

    dashWidgets.splice(pos, 1);

    storeSessionInfo.add('dashWidgets', dashWidgets);

    var grid = $('.grid-stack').data('gridstack');
    grid.removeWidget(elem);
}


/* 1.9 Update Widget Positions
------------------------------------------------- */
var updateWidgetPositions = function(widgets){

    updatedPositions = widgets.map(function(item, index){
        item.x = Number($('.grid-stack-item[data-widget-id="' + item.widgetID + '"]').attr('data-gs-x'))
        item.y = Number($('.grid-stack-item[data-widget-id="' + item.widgetID + '"]').attr('data-gs-y'))
        item.w = Number($('.grid-stack-item[data-widget-id="' + item.widgetID + '"]').attr('data-gs-width'))
        item.h = Number($('.grid-stack-item[data-widget-id="' + item.widgetID + '"]').attr('data-gs-height'))

        return item;
    })

    return updatedPositions;
}


/* 1.10 Get Date Filter Object
------------------------------------------------- */
var getDateFilterObj = function(dateRangeType, primaryDateFilter){

    var filterObj = {};
    filterObj.itemID = primaryDateFilter;
    filterObj.itemType = 'date';
    filterObj.oppr = $('[data-date-range-type="' + dateRangeType + '"] select').val();

    if (filterObj.oppr == 'dynamic'){
        filterObj.crit = $('[data-date-range-type="' + dateRangeType + '"] input').val();
    } else if (filterObj.oppr == 'fixed'){
        filterObj.crit = {};
        filterObj.crit.startDate = $('[data-date-range-type="' + dateRangeType + '"] .input-group').data('daterangepicker').startDate.format('YYYY-MM-DD');
        filterObj.crit.endDate = $('[data-date-range-type="' + dateRangeType + '"] .input-group').data('daterangepicker').endDate.format('YYYY-MM-DD');
    }

    return filterObj;

};


/* 1.11 Get General Widget Obj Information
------------------------------------------------- */
var getGeneralWidgetInfo = function(x, y, w, h){
    var widgetObj = {};
    widgetObj.widgetID = $('#modal-widget-picker').attr('data-widget-id');
    widgetObj.dataSetID = $('[select-data-set]').val();
    widgetObj.widget = $('[select-widget]').val();
    widgetObj.title = $('[select-title]').val();
    widgetObj.filterItems = getFilterItems();

    var isNew = $('.grid-stack-item[data-widget-id="' + widgetObj.widgetID + '"]').length == 0 ? true : false;
    widgetObj.x = !isNew ? $('.grid-stack-item[data-widget-id="' + widgetObj.widgetID + '"]').attr('data-gs-x') : x;
    widgetObj.y = !isNew ? $('.grid-stack-item[data-widget-id="' + widgetObj.widgetID + '"]').attr('data-gs-y') : y;
    widgetObj.w = !isNew ? $('.grid-stack-item[data-widget-id="' + widgetObj.widgetID + '"]').attr('data-gs-width') : w;
    widgetObj.h = !isNew ? $('.grid-stack-item[data-widget-id="' + widgetObj.widgetID + '"]').attr('data-gs-height') : h;

    return widgetObj;
}



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
            icon: 'fa-puzzle-piece'
            , addClass: 'active'
            , data: 'edit-mode-show'
            , clickFunction: function(){              
                widgetModal();
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
                    var saveObj = createDashboardSaveObj();

                    $('.alert').alert('close')
                    btn.addClass('refreshing');
                    mongo.write('objects', saveObj._id, JSON.stringify(saveObj), function(results, status){
                                        
                        if(status == 'success'){
                            btn.removeClass('refreshing');
                            setEditMode(false);
                            gritterNotification({"color":"success", "title":"Success!", "text":"Your Dashboard was successfully saved."});
                            window.history.replaceState({},window.location.pathname, window.location.pathname + '?objID=' + saveObj._id);
                        }
                        else {
                            gritterNotification({"color":"danger", "title":"Error!", "text":"Something went wrong. Your Dashboard was not saved."});
                        }

                        //refreshWidgets();

                    });
                }
            })
        );

    }
    

    $('#content_container').append(elem);
};


/* 2.5 Add Date Selection Container
------------------------------------------------- */
var addDateSelectionContainer = function(atlantisObj){

    var elem = $(' \
        <div class="pointer-cursor" data-toggle="modal" data-target="#modal-calendar"> \
            <h4 class="m-b-20"> \
                <i class="fa fa-calendar fa-lg" style="vertical-align: -5%;"></i> \
                ' + moment(atlantisObj.reportDateRange.startDate).format('M/D/YY') + ' - ' + moment(atlantisObj.reportDateRange.endDate).format('M/D/YY') + ' \
            </h4> \
        </div> \
        <div class="modal fade" id="modal-calendar"> \
            <div class="modal-dialog"> \
                <div class="modal-content"> \
                    <div class="modal-header"> \
                        <h4 class="modal-title">Choose Date Ranges:</h4> \
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button> \
                    </div> \
                    <div class="modal-body"> \
                        <div class="form-group row" data-date-range-type="reportDateRange"> \
                            <h6 class="col-md-3" style="padding-top: 7px"> \
                                <div class="">Date Range: </div> \
                            </h6> \
                            <h6 class="col-md-3"> \
                                <select class="form-control form-control-sm"> \
                                    <option value="dynamic" ' + (atlantisObj.reportDateRange.type == 'dynamic' ? 'selected="selected"' : ' ') + '>Dynamic</option> \
                                    <option value="fixed" ' + (atlantisObj.reportDateRange.type == 'fixed' ? 'selected="selected"' : ' ') + '>Fixed</option> \
                                </select> \
                            </h6> \
                            <div class="col-md-6"> \
                                <div class="date-range"> \
                                </div> \
                            </div> \
                        </div> \
                        <div class="form-group row" data-date-range-type="compDateRange"> \
                            <h6 class="col-md-3" style="padding-top: 7px"> \
                                <div class="">Comp Range: </div> \
                            </h6> \
                            <h6 class="col-md-3"> \
                                <select class="form-control form-control-sm"> \
                                    <option value="dynamic" ' + (atlantisObj.compDateRange.type == 'dynamic' ? 'selected="selected"' : ' ') + '>Dynamic</option> \
                                    <option value="fixed" ' + (atlantisObj.compDateRange.type == 'fixed' ? 'selected="selected"' : ' ') + '>Fixed</option> \
                                </select> \
                            </h6> \
                            <div class="col-md-6"> \
                                <div class="date-range"> \
                                </div> \
                            </div> \
                        </div> \
                    </div> \
                    <div class="modal-footer"> \
                        <a href="javascript:;" class="btn btn-default" data-dismiss="modal">Close</a> \
                        <a href="javascript:;" class="btn btn-default active accept" data-dismiss="modal">Accept</a> \
                    </div> \
                </div> \
            </div> \
        </div> \
    ');

    elem.find('[data-date-range-type="reportDateRange"] .date-range').append(dateRangeSelector(atlantisObj.reportDateRange));
    elem.find('[data-date-range-type="compDateRange"] .date-range').append(dateRangeSelector(atlantisObj.compDateRange));

    elem.find('select').on('change', function(){
        var dateRangeObj = {};
        dateRangeObj.type = $(this).val();
        $(this).parents('.form-group').find('.date-range').html('').append(dateRangeSelector(dateRangeObj));
    });

    elem.find('.btn.accept').click(function(){
        var reportDateType = $('[data-date-range-type="reportDateRange"] select').val();
        var reportStartDate = '';
        var reportEndDate = '';

        var compDateType = $('[data-date-range-type="compDateRange"] select').val();
        var compStartDate = '';
        var compEndDate = '';


        if (reportDateType == 'dynamic'){
            var dateObj = translateFriendlyDate($('[data-date-range-type="reportDateRange"] input').val())
            reportStartDate = dateObj.startDate;
            reportEndDate = dateObj.endDate;

        } else if (reportDateType == 'fixed'){
            reportStartDate = $('[data-date-range-type="reportDateRange"] .input-group').data('daterangepicker').startDate.format('YYYY-MM-DD');
            reportEndDate = $('[data-date-range-type="reportDateRange"] .input-group').data('daterangepicker').endDate.format('YYYY-MM-DD');
        }

        elem.find('h4').html(' \
            <i class="fa fa-calendar fa-lg" style="vertical-align: -5%;"></i> \
            ' + moment(reportStartDate).format('M/D/YY') + ' - ' + moment(reportEndDate).format('M/D/YY') + ' \
        ');

        refreshWidgets();
        
    })

    $('#content_container').append(elem);

};


/* 2.6 Add Dashboard Container
------------------------------------------------- */
var addDashboardContainer = function(atlantisObj){

    var elem = $(' \
        <div class="dashboard-container"> \
            <div class="grid-stack"> \
            </div> \
            <div class="modal fade" id="modal-widget-picker"> \
                <div class="modal-dialog"> \
                    <div class="modal-content"> \
                        <div class="modal-header"> \
                            <h4 class="modal-title">Add Widget:</h4> \
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button> \
                        </div> \
                        <div class="modal-body"> \
                        </div> \
                        <div class="modal-footer"> \
                            <a href="javascript:;" class="btn btn-default" data-dismiss="modal">Close</a> \
                            <a href="javascript:;" class="btn btn-default active accept" data-dismiss="modal">Add Widget</a> \
                        </div> \
                    </div> \
                </div> \
            </div> \
        </div> \
    ');


    elem.find('.btn.accept').click(function(){
        var selectedWidget = $('[select-widget').val();
        var widgetObj = widgets[selectedWidget].widgetObj();
        var widgetElem = widgets[selectedWidget].widgetElem(widgetObj);

        var grid = $('.grid-stack').data('gridstack');
        if($('.grid-stack-item[data-widget-id="' + widgetObj.widgetID + '"]').length != 0){
            removeWidget(widgetObj.widgetID);
        }

        var dashWidgets = storeSessionInfo.get('dashWidgets');
        dashWidgets.push(widgetObj);
        storeSessionInfo.add('dashWidgets', dashWidgets);

        grid.addWidget(
            widgetElem,
            widgetObj.x,
            widgetObj.y,
            widgetObj.w,
            widgetObj.h,
            $('#modal-widget-picker .modal-header h4').text() == 'Add Widget' ? true : false
        )

        widgets[selectedWidget].widgetRefresh(widgetObj);

    });


    var options = {
        animate : true, 
        verticalMargin : 20,
        cellHeight: 53.6365,
        scroll : false,
        float: false
    };

    elem.find('.grid-stack').gridstack(options);

    $('#content_container').append(elem);

};


/* 2.7 Widget Modal
------------------------------------------------- */
var widgetModal = function(widgetObj){

    $('#modal-widget-picker .modal-body [widget-options]').remove()

    var widgetObj = widgetObj || {"widgetID": getRandomKey(), "dataSetID": "new", "widget": "new", "x": "new", "y": "new", "w": "new", "h": "new"};
    var newWidget = widgetObj.dataSetID == 'new' ? true : false;

    $('#modal-widget-picker').attr('data-widget-id', widgetObj.widgetID);

    $('#modal-widget-picker .modal-title').text(newWidget ? 'Add Widget' : 'Edit Widget');
    $('#modal-widget-picker .btn.accept').text(newWidget ? 'Add Widget' : 'Accept Changes');

    mongo.get('objects', '{"objectType":"dataset"}', 'title', function(mongoResults){

        $('#modal-widget-picker').modal('show');
        var dataSets = mongoResults;

        var dataSetOptions = '';
        for (var i=0;i<mongoResults.length;i++){
            dataSetOptions += '<option value="' + mongoResults[i]._id + '" ' + (widgetObj.dataSetID == mongoResults[i]._id ? 'selected="selected"' : ' ') + '>' + mongoResults[i].title + '</option>';
        }

        var widgetOptions = '';
        for (w in widgets){
            widgetOptions += '<option value="' + w + '" ' + (widgetObj.widget == w ? 'selected="selected"' : ' ') + '>' + widgets[w].friendly + '</option>';
        }

        var elem = $(' \
            <div class="form-group m-b-15" select-title-container> \
                <label class="col-md-3 col-form-label">Title</label> \
                <div class="col-md-12"><input type="text" class="form-control form-control-sm" select-title/></div> \
            </div> \
            <div class="form-group m-b-15" select-data-set-container> \
                <label class="col-md-3 col-form-label">Data Set</label> \
                <div class="col-md-12"> \
                    <select class="form-control form-control-sm" select-data-set> \
                        ' + dataSetOptions + ' \
                    </select> \
                </div> \
            </div> \
            <div class="form-group m-b-15" select-widget-container> \
                <label class="col-md-3 col-form-label">Widget</label> \
                <div class="col-md-12"> \
                    <select class="form-control form-control-sm" select-widget> \
                        ' + widgetOptions + ' \
                    </select> \
                </div> \
            </div> \
        ');


        $('#modal-widget-picker .modal-body').html('').append(elem);

        elem.find('[select-title]').val(widgetObj.title || ' ')

        elem.find('[select-data-set]').on('change', function(){
            elem.find('[select-widget]').change();
        });

        elem.find('[select-widget]').on('change', function(){
            var selectedWidget = $(this).val();
            var dataSetObj = dataSets.filter(function(obj){
                return obj._id == $('#modal-widget-picker [select-data-set]').val() || false;
            })
            widgets[selectedWidget].modalSelectOptions(widgetObj, dataSetObj[0]);
        }).change();

    });


};


/* 2.8 Add Widgets
------------------------------------------------- */
var addWidgets = function(atlantisObj){

    atlantisObj.widgets.map(function(item, index){

        var selectedWidget = item.widget;
        var widgetObj = item;
        var widgetElem = widgets[selectedWidget].widgetElem(widgetObj);

        var grid = $('.grid-stack').data('gridstack');
        
        grid.addWidget(
            widgetElem,
            widgetObj.x,
            widgetObj.y,
            widgetObj.w,
            widgetObj.h,
            false
        )

    })
}


/* 2.9 Refresh Widgets
------------------------------------------------- */
var refreshWidgets = function(){

    storeSessionInfo.get('dashWidgets').map(function(item, index){
        var widgetObj = item;
        widgets[widgetObj.widget].widgetRefresh(widgetObj);
    })
}

/* 3.1 Date Range Selector
------------------------------------------------- */
var dateRangeSelector = function(dateRangeObj){

    var verbiage = dateRangeObj.verbiage || 'Last Week';
    var startDate = dateRangeObj.startDate || moment().subtract(7 , 'days').format('YYYY-MM-DD');
    var endDate = dateRangeObj.endDate || moment().subtract(1 , 'days').format('YYYY-MM-DD');

    var elem = $('<div class="input-group"></div>'); 
    
    if (dateRangeObj.type == 'dynamic') {

        elem.append(' \
            <input type="text" class="form-control form-control-sm text-center"/> \
            <span class="input-group-append"> \
                <span class="input-group-text"><i class="fa fa-info-circle"></i></span> \
            </span> \
        '); 
        elem.find('input').val(verbiage);

    }
    else if (dateRangeObj.type == 'fixed') {

        elem.append(' \
            <input type="text" name="default-daterange" class="form-control form-control-sm text-center" value="" placeholder="click to select the date range" /> \
            <span class="input-group-append"> \
                <span class="input-group-text"><i class="fa fa-calendar"></i></span> \
            </span> \
        ');

        elem.daterangepicker({
            opens: 'right',
            format: 'MM/DD/YYYY',
            separator: ' to ',
            startDate: moment(startDate),
            endDate: moment(endDate),
            minDate: '01/01/2016',
            maxDate: '12/31/2018',
            autoApply: true
        },
        function (start, end) {
            elem.find('input').val(start.format('M/DD/YYYY') + ' - ' + end.format('M/DD/YYYY'));
        });

        elem.find('input').val(moment(startDate).format('M/DD/YYYY') + ' - ' + moment(endDate).format('M/DD/YYYY'));

    }

    return elem;

};


/* 3.3 Dashboard Widgets
------------------------------------------------- */
var widgets = {

    dashStat: {
        friendly: "Single Metric",
        modalSelectOptions: function(widgetObj, dataSetObj){

            var color = widgetObj.color || "bg-grey";
            var metric = widgetObj.metric || "new";
            var includeComp = widgetObj.includeComp || 'yes';
            var colorOptions = '';
            var metricOptions = '';

            
            for (item in widgetColorsObj){
                colorOptions += '<option value="' + item + '" ' + (color == item ? 'selected="selected"' : ' ') + '><i class="fa fa-square fa-lg"></i>' + widgetColorsObj[item] + '</option>';
            }

            for (item in dataSetObj.dataItems){

                if (dataSetObj.dataItems[item].itemType == 'metric'){
                    metricOptions += '<option value="' + item + '" ' + (metric == item ? 'selected="selected"' : ' ') + '>' + dataSetObj.dataItems[item].itemTitle + '</option>';
                }
                
            }

            var elem = $(' \
                <div widget-options> \
                    <div class="form-group m-b-15"> \
                        <label class="col-md-3 col-form-label">Color</label> \
                        <div class="col-md-12"> \
                            <select class="form-control form-control-sm" select-color> \
                                ' + colorOptions + ' \
                            </select> \
                        </div> \
                    </div> \
                    <div class="form-group m-b-15"> \
                        <label class="col-md-3 col-form-label">Metric</label> \
                        <div class="col-md-12"> \
                            <select class="form-control form-control-sm" select-metric> \
                                ' + metricOptions + ' \
                            </select> \
                        </div> \
                    </div> \
                    <div class="checkbox checkbox-css m-b-20 m-l-15"> \
                        <input type="checkbox" id="include_comp_checkbox" name="include_comp_checkbox" ' + (includeComp == 'yes' ? 'checked' : ' ') + ' data-checked="' + (includeComp == 'yes' ? 'true' : 'false') + '" /> \
                        <label for="include_comp_checkbox">Include Comp Range Comparison</label> \
                    </div> \
                </div> \
            ');

            elem.find('.checkbox-css input[type="checkbox"]').click(function(){
                var chk = $(this).attr('data-checked') == 'true' ? 'false' : 'true';
                $(this).attr('data-checked', chk);
            });

            elem.append(filterContainer(widgetObj, dataSetObj));

            $('#modal-widget-picker .modal-body [widget-options]').remove()
            $('#modal-widget-picker .modal-body [select-widget-container]').after(elem);

        },
        widgetObj: function(){
            var widgetObj = getGeneralWidgetInfo(0, 0, 3, 2);
            widgetObj.color = $('[select-color]').val();
            widgetObj.metric = $('[select-metric]').val();
            widgetObj.includeComp = $('.checkbox-css input[type="checkbox"]').attr('data-checked') == 'true' ? 'yes' : 'no';

            return widgetObj;
        },
        widgetElem: function(widgetObj){    

            var elem = $(' \
                <div class="grid-stack-item widget-dash-stat" data-gs-no-resize="true" data-widget="dashStat" data-widget-id="' + widgetObj.widgetID + '" data-data-set-id="' + widgetObj.dataSetID + '"> \
                <div class="grid-stack-item-content"> \
                    <div class="widget widget-stats ' + widgetObj.color + '"> \
                        <div class="stats-icon"><i class="fa "></i></div> \
                        <div class="stats-info"> \
                            <h4>' + widgetObj.title + '</h4> \
                            <p> \
                            <i class="fa fa-refresh fa-spin fa-lg"></i> \
                            <span class="hidden">0</span> \
                            </p> \
                        </div> \
                        <div class="stats-link"> \
                            ' + (widgetObj.includeComp ? '<span>0%</span> vs. Comp Period' : ' ') + ' \
                            <i class="fa fa-times-circle fa-lg" style="position: absolute; right: 10px; bottom: 9px; cursor: pointer;"  edit-mode-show></i> \
                            <i class="fa fa-edit fa-lg" style="position: absolute; right: 30px; bottom: 9px; cursor: pointer;"  edit-mode-show></i> \
                        </div> \
                    </div> \
                </div> \
                </div> \
            ');

            elem.find('.fa-edit').click(function(){
                editWidget(widgetObj.widgetID)
            });

            elem.find('.fa-times-circle').click(function(){
                removeWidget(widgetObj.widgetID)
            });
            
            return elem;
        },
        widgetRefresh: function(widgetObj){
            var widgetID = widgetObj.widgetID;
            var elem = $('[data-widget-id="' + widgetID + '"]');

            elem.find('.stats-info i').removeClass('hidden');
            elem.find('.stats-info span').addClass('hidden');

            mongo.get('objects', '{"_id":"' + widgetObj.dataSetID + '"}', 'title', function(mongoResults){
                
                var dataSetObj = mongoResults[0];
                var reportItems = [widgetObj.metric];
                var reportDateFilterItems = widgetObj.filterItems.map(function(item, index){
                    return item;
                });
                var reportDateFilterObj = getDateFilterObj('reportDateRange', dataSetObj.primaryDateFilter);
                reportDateFilterItems.push(reportDateFilterObj);

                var sql = buildSqlStatement(dataSetObj, reportItems, reportDateFilterItems, false);

                var connection = dataSetObj.connection;
                var sqlFlavor = dataSetObj.sqlFlavor;

                sqlData.get(connection, sql, sqlFlavor, sqlRowLimit, function(sqlResults, status, goodToGo){
                    var data = sqlResults[1][0];
                    elem.find('.stats-info span').html(formatMe[dataSetObj.dataItems[sqlResults[0][0]].itemFormat](data));
                    elem.find('.stats-icon i').addClass(dataSetObj.dataItems[sqlResults[0][0]].itemIcon)

                    var includeComp = widgetObj.includeComp;
                    if (includeComp == 'yes'){

                        var compDateFilterItems = widgetObj.filterItems.map(function(item, index){
                            return item;
                        });
                        var compDateFilterObj = getDateFilterObj('compDateRange', dataSetObj.primaryDateFilter);
                        compDateFilterItems.push(compDateFilterObj);

                        sql = buildSqlStatement(dataSetObj, reportItems, compDateFilterItems, false);

                        sqlData.get(connection, sql, sqlFlavor, sqlRowLimit, function(compResults, status, goodToGo){
                            var comp = (sqlResults[1][0] / compResults[1][0] - 1) * 100
                            if (comp > 0){
                                elem.find('.stats-link span').html('+' + comp.toFixed(0) + '%');
                            }
                            else {
                                elem.find('.stats-link span').html(comp.toFixed(0) + '%');
                            }
                            
                            elem.find('.stats-info i').addClass('hidden');
                            elem.find('.stats-info span').removeClass('hidden');

                        });

                    }
                    else {
                        elem.find('.stats-info i').addClass('hidden');
                        elem.find('.stats-info span').removeClass('hidden');
                    }

                });

            });
        
        }
    },
    lineChart: {
        friendly: "Line Chart",
        modalSelectOptions: function(widgetObj, dataSetObj){

            var xItem = widgetObj.xItem || "new";
            var yItem = widgetObj.yItem || "new";
            var pItem = widgetObj.pItem || "new";
            var xOptions = '';
            var yOptions = '';
            var pOptions = '<option value="compPeriod" ' + (pItem == 'compPeriod' ? 'selected="selected"' : ' ') + '>Comp Period</option>';

            dataSetObj.sortArray.map(function(item, index){

                if (dataSetObj.dataItems[item].itemType == 'date'){
                    xOptions += '<option value="' + item + '" ' + (xItem == item ? 'selected="selected"' : ' ') + '>' + dataSetObj.dataItems[item].itemTitle + '</option>';
                }

                if (dataSetObj.dataItems[item].itemType == 'metric'){
                    yOptions += '<option value="' + item + '" ' + (yItem == item ? 'selected="selected"' : ' ') + '>' + dataSetObj.dataItems[item].itemTitle + '</option>';
                }

                if (dataSetObj.dataItems[item].itemType == 'attribute'){
                    pOptions += '<option value="' + item + '" ' + (pItem == item ? 'selected="selected"' : ' ') + '>' + dataSetObj.dataItems[item].itemTitle + '</option>';
                }

            });

            var elem = $(' \
                <div widget-options> \
                    <div class="form-group m-b-15"> \
                        <label class="col-md-3 col-form-label">X-Axis</label> \
                        <div class="col-md-12"> \
                            <select class="form-control form-control-sm" select-xItem> \
                                ' + xOptions + ' \
                            </select> \
                        </div> \
                    </div> \
                    <div class="form-group m-b-15"> \
                        <label class="col-md-3 col-form-label">Y-Axis</label> \
                        <div class="col-md-12"> \
                            <select class="form-control form-control-sm" select-yItem> \
                                ' + yOptions + ' \
                            </select> \
                        </div> \
                    </div> \
                    <div class="form-group m-b-15"> \
                        <label class="col-md-3 col-form-label">Color By</label> \
                        <div class="col-md-12"> \
                            <select class="form-control form-control-sm" select-pItem> \
                                ' + pOptions + ' \
                            </select> \
                        </div> \
                    </div> \
                </div> \
            ');

            elem.append(filterContainer(widgetObj, dataSetObj));

            $('#modal-widget-picker .modal-body [widget-options]').remove()
            $('#modal-widget-picker .modal-body [select-widget-container]').after(elem);

        },
        widgetObj: function(){
            var widgetObj = getGeneralWidgetInfo(0, 0, 6, 7);

            widgetObj.xItem = $('[select-xItem]').val();
            widgetObj.yItem = $('[select-yItem]').val();
            widgetObj.pItem = $('[select-pItem]').val();

            return widgetObj;
        },
        widgetElem: function(widgetObj){    

            var elem = $(' \
                <div class="grid-stack-item widget-line-chart" data-widget="lineChart" data-widget-id="' + widgetObj.widgetID + '" data-data-set-id="' + widgetObj.dataSetID + '"> \
                <div class="grid-stack-item-content"> \
                    <div class="panel panel-inverse panel-100" data-sortable="false"> \
                        <div class="panel-heading panel-content-heading"> \
                            <div class="panel-heading-btn"> \
                                <i class="fa fa-times-circle fa-lg" style="position: absolute; right: 10px; top: 9px; cursor: pointer;"  edit-mode-show></i> \
                                <i class="fa fa-edit fa-lg" style="position: absolute; right: 30px; top: 9px; cursor: pointer;"  edit-mode-show></i> \
                            </div> \
                            <h4 class="panel-title"><i class="fa fa-refresh fa-spin"></i><i class="fa fa-line-chart hidden"></i>' + widgetObj.title + '</h4> \
                        </div> \
                        <div class="panel-body"> \
                            <div id="' + widgetObj.widgetID + '-chart-container"></div> \
                        </div> \
                    </div> \
                </div> \
                </div> \
            ');

            elem.find('.fa-edit').click(function(){
                editWidget(widgetObj.widgetID)
            });

            elem.find('.fa-times-circle').click(function(){
                removeWidget(widgetObj.widgetID)
            });
            
            return elem;

        },
        widgetRefresh: function(widgetObj){
            var widgetID = widgetObj.widgetID;
            var xItem = widgetObj.xItem
            var yItem = widgetObj.yItem
            var pItem = widgetObj.pItem

            var elem = $('[data-widget-id="' + widgetID + '"]');

            elem.find('.panel-heading h4 .fa-refresh').removeClass('hidden');
            elem.find('.panel-heading h4 .fa-line-chart').addClass('hidden');

            mongo.get('objects', '{"_id":"' + widgetObj.dataSetID + '"}', 'title', function(mongoResults){
                
                var reportItems = pItem == 'compPeriod' ? [xItem, yItem] : [xItem, yItem, pItem];
                var dataSetObj = mongoResults[0];
                var connection = dataSetObj.connection;
                var sqlFlavor = dataSetObj.sqlFlavor;

                var reportDateFilterItems = widgetObj.filterItems.map(function(item, index){
                    return item;
                });
                var reportDateFilterObj = getDateFilterObj('reportDateRange', dataSetObj.primaryDateFilter);
                reportDateFilterItems.push(reportDateFilterObj);

                var sql = buildSqlStatement(dataSetObj, reportItems, reportDateFilterItems, false);

                sqlData.get(connection, sql, sqlFlavor, sqlRowLimit, function(sqlResults, status, goodToGo){

                    var compDateFilterItems = widgetObj.filterItems.map(function(item, index){
                        return item;
                    });
                    var compDateFilterObj = getDateFilterObj('compDateRange', dataSetObj.primaryDateFilter);
                    compDateFilterItems.push(compDateFilterObj);

                    sql = buildSqlStatement(dataSetObj, reportItems, compDateFilterItems, false);

                    sqlData.get(connection, sql, sqlFlavor, sqlRowLimit, function(compResults, status, goodToGo){
                        
                        /* ************************************************************************************* */
                        var chartContainer = widgetObj.widgetID + '-chart-container';
                        var chart = $('#' + chartContainer).highcharts();
                        if(chart) {
                            chart.destroy()
                        }
                        $('#' + chartContainer).html('')

                        var panelHeight = $('#' + chartContainer).parents('.panel').height();
                        $('#' + chartContainer).attr('style', 'height:' + (panelHeight - 30 - 15 - 15) + 'px;');

                        var chartType = 'spline';
                        var chartTitle = '';
                        var yTitle = dataSetObj.dataItems[yItem].itemTitle;
                        var sqlData = sqlResults;

                        if (pItem == 'compPeriod'){
                            pItem = 'Period';
                            var combinedResults = [[sqlResults[0][0],'Period', sqlResults[0][1]]];
                            sqlResults.map(function(item, index){
                                if (index != 0){
                                    combinedResults.push([item[0],'Report Period', item[1]])
                                }
                            })
                            compResults.map(function(item, index){
                                if (index != 0 && index < sqlResults.length){
                                    combinedResults.push([sqlResults[index][0],'Comp Period', item[1]])
                                }
                            })

                            sqlData = combinedResults;
                        }
                        
                        var chartData = createHighChartsResults(sqlData, xItem, yItem, pItem);

                        buildHighChart(chartContainer, chartType, chartData, chartTitle, dataSetObj, yTitle);

                        /* ************************************************************************************* */

                        elem.find('.panel-heading h4 .fa-refresh').addClass('hidden');
                        elem.find('.panel-heading h4 .fa-line-chart').removeClass('hidden');

                    });

                });

            });
        
        }
    },
    barChart: {
        friendly: "Bar Chart",
        modalSelectOptions: function(widgetObj, dataSetObj){

            var xItem = widgetObj.xItem || "new";
            var yItem = widgetObj.yItem || "new";
            var pItem = widgetObj.pItem || "new";
            var stacked = widgetObj.stacked || 'no';
            var xOptions = '';
            var yOptions = '';
            var pOptions = '<option value="compPeriod" ' + (pItem == 'compPeriod' ? 'selected="selected"' : ' ') + '>Comp Period</option>';

            dataSetObj.sortArray.map(function(item, index){

                if (dataSetObj.dataItems[item].itemType == 'attribute'){
                    xOptions += '<option value="' + item + '" ' + (xItem == item ? 'selected="selected"' : ' ') + '>' + dataSetObj.dataItems[item].itemTitle + '</option>';
                }

                if (dataSetObj.dataItems[item].itemType == 'metric'){
                    yOptions += '<option value="' + item + '" ' + (yItem == item ? 'selected="selected"' : ' ') + '>' + dataSetObj.dataItems[item].itemTitle + '</option>';
                }

                if (dataSetObj.dataItems[item].itemType == 'attribute'){
                    pOptions += '<option value="' + item + '" ' + (pItem == item ? 'selected="selected"' : ' ') + '>' + dataSetObj.dataItems[item].itemTitle + '</option>';
                }

            });

            var elem = $(' \
                <div widget-options> \
                    <div class="form-group m-b-15"> \
                        <label class="col-md-3 col-form-label">X-Axis</label> \
                        <div class="col-md-12"> \
                            <select class="form-control form-control-sm" select-xItem> \
                                ' + xOptions + ' \
                            </select> \
                        </div> \
                    </div> \
                    <div class="form-group m-b-15"> \
                        <label class="col-md-3 col-form-label">Y-Axis</label> \
                        <div class="col-md-12"> \
                            <select class="form-control form-control-sm" select-yItem> \
                                ' + yOptions + ' \
                            </select> \
                        </div> \
                    </div> \
                    <div class="form-group m-b-15"> \
                        <label class="col-md-3 col-form-label">Color By</label> \
                        <div class="col-md-12"> \
                            <select class="form-control form-control-sm" select-pItem> \
                                ' + pOptions + ' \
                            </select> \
                        </div> \
                    </div> \
                    <div class="checkbox checkbox-css m-b-20 m-l-15"> \
                        <input type="checkbox" id="stacked_checkbox" name="stacked_checkbox" ' + (stacked == 'yes' ? 'checked' : ' ') + ' data-checked="' + (stacked == 'yes' ? 'true' : 'false') + '" /> \
                        <label for="stacked_checkbox">Stacked</label> \
                    </div> \
                </div> \
            ');

            elem.find('.checkbox-css input[type="checkbox"]').click(function(){
                var chk = $(this).attr('data-checked') == 'true' ? 'false' : 'true';
                $(this).attr('data-checked', chk);
            });

            elem.append(filterContainer(widgetObj, dataSetObj));

            $('#modal-widget-picker .modal-body [widget-options]').remove()
            $('#modal-widget-picker .modal-body [select-widget-container]').after(elem);

        },
        widgetObj: function(){
            var widgetObj = getGeneralWidgetInfo(0, 0, 6, 7);

            widgetObj.xItem = $('[select-xItem]').val();
            widgetObj.yItem = $('[select-yItem]').val();
            widgetObj.pItem = $('[select-pItem]').val();
            widgetObj.stacked = $('.checkbox-css input[type="checkbox"]').attr('data-checked') == 'true' ? 'yes' : 'no';

            return widgetObj;
        },
        widgetElem: function(widgetObj){    

            var elem = $(' \
                <div class="grid-stack-item widget-bar-chart" data-widget="barChart" data-widget-id="' + widgetObj.widgetID + '" data-data-set-id="' + widgetObj.dataSetID + '"> \
                <div class="grid-stack-item-content"> \
                    <div class="panel panel-inverse panel-100" data-sortable="false"> \
                        <div class="panel-heading panel-content-heading"> \
                            <div class="panel-heading-btn"> \
                                <i class="fa fa-times-circle fa-lg" style="position: absolute; right: 10px; top: 9px; cursor: pointer;"  edit-mode-show></i> \
                                <i class="fa fa-edit fa-lg" style="position: absolute; right: 30px; top: 9px; cursor: pointer;"  edit-mode-show></i> \
                            </div> \
                            <h4 class="panel-title"><i class="fa fa-refresh fa-spin"></i><i class="fa fa-bar-chart hidden"></i>' + widgetObj.title + '</h4> \
                        </div> \
                        <div class="panel-body"> \
                            <div id="' + widgetObj.widgetID + '-chart-container"></div> \
                        </div> \
                    </div> \
                </div> \
                </div> \
            ');

            elem.find('.fa-edit').click(function(){
                editWidget(widgetObj.widgetID)
            });

            elem.find('.fa-times-circle').click(function(){
                removeWidget(widgetObj.widgetID)
            });
            
            return elem;

        },
        widgetRefresh: function(widgetObj){
            var widgetID = widgetObj.widgetID;
            var xItem = widgetObj.xItem
            var yItem = widgetObj.yItem
            var pItem = widgetObj.pItem
            var stacked = widgetObj.stacked

            var elem = $('[data-widget-id="' + widgetID + '"]');

            elem.find('.panel-heading h4 .fa-refresh').removeClass('hidden');
            elem.find('.panel-heading h4 .fa-bar-chart').addClass('hidden');

            mongo.get('objects', '{"_id":"' + widgetObj.dataSetID + '"}', 'title', function(mongoResults){
                
                var reportItems = pItem == 'compPeriod' ? [xItem, yItem] : [xItem, yItem, pItem];
                var dataSetObj = mongoResults[0];
                var connection = dataSetObj.connection;
                var sqlFlavor = dataSetObj.sqlFlavor;

                var reportDateFilterItems = widgetObj.filterItems.map(function(item, index){
                    return item;
                });
                var reportDateFilterObj = getDateFilterObj('reportDateRange', dataSetObj.primaryDateFilter);
                reportDateFilterItems.push(reportDateFilterObj);

                var sql = buildSqlStatement(dataSetObj, reportItems, reportDateFilterItems, false);

                sqlData.get(connection, sql, sqlFlavor, sqlRowLimit, function(sqlResults, status, goodToGo){

                    var compDateFilterItems = widgetObj.filterItems.map(function(item, index){
                        return item;
                    });
                    var compDateFilterObj = getDateFilterObj('compDateRange', dataSetObj.primaryDateFilter);
                    compDateFilterItems.push(compDateFilterObj);

                    sql = buildSqlStatement(dataSetObj, reportItems, compDateFilterItems, false);

                    sqlData.get(connection, sql, sqlFlavor, sqlRowLimit, function(compResults, status, goodToGo){
                        
                        /* ************************************************************************************* */
                        var chartContainer = widgetObj.widgetID + '-chart-container';
                        var chart = $('#' + chartContainer).highcharts();
                        if(chart) {
                            chart.destroy()
                        }
                        $('#' + chartContainer).html('')

                        var panelHeight = $('#' + chartContainer).parents('.panel').height();
                        $('#' + chartContainer).attr('style', 'height:' + (panelHeight - 30 - 15 - 15) + 'px;');

                        var chartType = 'column';
                        var chartTitle = '';
                        var yTitle = dataSetObj.dataItems[yItem].itemTitle;
                        var sqlData = sqlResults;

                        if (pItem == 'compPeriod'){
                            pItem = 'Period';
                            var combinedResults = [[sqlResults[0][0],'Period', sqlResults[0][1]]];
                            sqlResults.map(function(item, index){
                                if (index != 0){
                                    combinedResults.push([item[0],'Report Period', item[1]])
                                }
                            })
                            compResults.map(function(item, index){
                                if (index != 0){
                                    combinedResults.push([sqlResults[index][0],'Comp Period', item[1]])
                                }
                            })

                            sqlData = combinedResults;
                        }
                        
                        var chartData = createHighChartsResults(sqlData, xItem, yItem, pItem);

                        buildHighChart(chartContainer, chartType, chartData, chartTitle, dataSetObj, yTitle, stacked);

                        /* ************************************************************************************* */

                        elem.find('.panel-heading h4 .fa-refresh').addClass('hidden');
                        elem.find('.panel-heading h4 .fa-bar-chart').removeClass('hidden');

                    });

                });

            });
        
        }
    },
    shareWidget: {
        friendly: "Share Widget",
        modalSelectOptions: function(widgetObj, dataSetObj){
            var color = widgetObj.color || "bg-grey"
            var xItem = widgetObj.xItem || "new";
            var yItem = widgetObj.yItem || "new";
            var colorOptions = '';
            var xOptions = '';
            var yOptions = '';

            for (item in widgetColorsObj){
                colorOptions += '<option value="' + item + '" ' + (color == item ? 'selected="selected"' : ' ') + '><i class="fa fa-square fa-lg"></i>' + widgetColorsObj[item] + '</option>';
            }

            dataSetObj.sortArray.map(function(item, index){

                if (dataSetObj.dataItems[item].itemType == 'attribute'){
                    xOptions += '<option value="' + item + '" ' + (xItem == item ? 'selected="selected"' : ' ') + '>' + dataSetObj.dataItems[item].itemTitle + '</option>';
                }

                if (dataSetObj.dataItems[item].itemType == 'metric'){
                    yOptions += '<option value="' + item + '" ' + (yItem == item ? 'selected="selected"' : ' ') + '>' + dataSetObj.dataItems[item].itemTitle + '</option>';
                }

            });

            var elem = $(' \
                <div widget-options> \
                    <div class="form-group m-b-15"> \
                        <label class="col-md-3 col-form-label">Color</label> \
                        <div class="col-md-12"> \
                            <select class="form-control form-control-sm" select-color> \
                                ' + colorOptions + ' \
                            </select> \
                        </div> \
                    </div> \
                    <div class="form-group m-b-15"> \
                        <label class="col-md-3 col-form-label">Attribute</label> \
                        <div class="col-md-12"> \
                            <select class="form-control form-control-sm" select-xItem> \
                                ' + xOptions + ' \
                            </select> \
                        </div> \
                    </div> \
                    <div class="form-group m-b-15"> \
                        <label class="col-md-3 col-form-label">Metric</label> \
                        <div class="col-md-12"> \
                            <select class="form-control form-control-sm" select-yItem> \
                                ' + yOptions + ' \
                            </select> \
                        </div> \
                    </div> \
                </div> \
            ');

            elem.append(filterContainer(widgetObj, dataSetObj));

            $('#modal-widget-picker .modal-body [widget-options]').remove()
            $('#modal-widget-picker .modal-body [select-widget-container]').after(elem);

        },
        widgetObj: function(){
            var widgetObj = getGeneralWidgetInfo(0, 0, 6, 7);
            widgetObj.color = $('[select-color]').val();
            widgetObj.xItem = $('[select-xItem]').val();
            widgetObj.yItem = $('[select-yItem]').val();

            return widgetObj;
        },
        widgetElem: function(widgetObj){    

            var elem = $(' \
                <div class="grid-stack-item widget-share-widget" data-widget="shareWidget" data-widget-id="' + widgetObj.widgetID + '" data-data-set-id="' + widgetObj.dataSetID + '"> \
                <div class="grid-stack-item-content"> \
                    <div class="panel panel-inverse panel-100" data-sortable="false"> \
                        <div class="panel-heading panel-content-heading"> \
                            <div class="panel-heading-btn"> \
                                <i class="fa fa-times-circle fa-lg" style="position: absolute; right: 10px; top: 9px; cursor: pointer;"  edit-mode-show></i> \
                                <i class="fa fa-edit fa-lg" style="position: absolute; right: 30px; top: 9px; cursor: pointer;"  edit-mode-show></i> \
                            </div> \
                            <h4 class="panel-title"><i class="fa fa-refresh fa-spin"></i><i class="fa fa-tasks hidden"></i>' + widgetObj.title + '</h4> \
                        </div> \
                        <div class="panel-body"> \
                        </div> \
                    </div> \
                </div> \
                </div> \
            ');

            elem.find('.fa-edit').click(function(){
                editWidget(widgetObj.widgetID)
            });

            elem.find('.fa-times-circle').click(function(){
                removeWidget(widgetObj.widgetID)
            });
            
            return elem;

        },
        widgetRefresh: function(widgetObj){
            var widgetID = widgetObj.widgetID;
            var xItem = widgetObj.xItem
            var yItem = widgetObj.yItem

            var elem = $('[data-widget-id="' + widgetID + '"]');
            elem.find('.panel-body').html('');

            elem.find('.panel-heading h4 .fa-refresh').removeClass('hidden');
            elem.find('.panel-heading h4 .fa-tasks').addClass('hidden');

            mongo.get('objects', '{"_id":"' + widgetObj.dataSetID + '"}', 'title', function(mongoResults){
                
                var reportItems = [xItem, yItem];
                var dataSetObj = mongoResults[0];
                var connection = dataSetObj.connection;
                var sqlFlavor = dataSetObj.sqlFlavor;

                var reportDateFilterItems = widgetObj.filterItems.map(function(item, index){
                    return item;
                });
                var reportDateFilterObj = getDateFilterObj('reportDateRange', dataSetObj.primaryDateFilter);
                reportDateFilterItems.push(reportDateFilterObj);

                var sql = buildSqlStatement(dataSetObj, reportItems, reportDateFilterItems, false);

                sqlData.get(connection, sql, sqlFlavor, sqlRowLimit, function(sqlResults, status, goodToGo){

                    /* ************************************************************************************* */
                    var total = sqlResults.filter(function (item, index) {
                        return index !=0 ? item : false;
                    }).map(function(item, index){
                        return item[1];
                    }).reduce(function (t, r) {
                        return t + r;
                    }, 0)

                    var maxValue = sqlResults.filter(function (item, index) {
                        return index !=0 ? item : false;
                    }).map(function(item, index){
                        return item[1];
                    }).reduce(function (t, r) {
                        return Math.max(t,r);
                    }, 0)

                    var share = 0;
                    var barWidth = 0;
                    var pElem = ''
                    sqlResults.map(function(item, index){
                        if (index !=0){
                            share = (item[1]/total) * 100 ;
                            barWidth = (item[1]/maxValue) * 100 ;
                            pElem += ' \
                            <div class="form-group m-b-15"> \
                                <label class="col-md-12 col-form-label"> \
                                    ' + formatMe.toTitleCase(item[0]) + ' \
                                    <span style="position: absolute; right:10px;">' + share.toFixed(0) + '%</span> \
                                </label> \
                                <div class="col-md-12" style="height:10px"> \
                                    <div class="progress rounded-corner" style="height:10px; width: ' + barWidth + '%"> \
                                        <div class="progress-bar ' + widgetObj.color + '" style="width: 100%;"></div> \
                                    </div> \
                                </div> \
                            </div> \
                            ';
                        }
                    });

                    elem.find('.panel-body').append(pElem);
                    /* ************************************************************************************* */

                    elem.find('.panel-heading h4 .fa-refresh').addClass('hidden');
                    elem.find('.panel-heading h4 .fa-tasks').removeClass('hidden');

                });

            });
        
        }
    },
    compTable: {
        friendly: "Comp Table",
        modalSelectOptions: function(widgetObj, dataSetObj){

            var xItem = widgetObj.xItem || "new";
            var yItem = widgetObj.yItem || "new";
            var xOptions = '';
            var yOptions = '';

            dataSetObj.sortArray.map(function(item, index){

                if (dataSetObj.dataItems[item].itemType == 'attribute'){
                    xOptions += '<option value="' + item + '" ' + (xItem == item ? 'selected="selected"' : ' ') + '>' + dataSetObj.dataItems[item].itemTitle + '</option>';
                }

                if (dataSetObj.dataItems[item].itemType == 'metric'){
                    yOptions += '<option value="' + item + '" ' + (yItem == item ? 'selected="selected"' : ' ') + '>' + dataSetObj.dataItems[item].itemTitle + '</option>';
                }

            });

            var elem = $(' \
                <div widget-options> \
                    <div class="form-group m-b-15"> \
                        <label class="col-md-3 col-form-label">X-Axis</label> \
                        <div class="col-md-12"> \
                            <select class="form-control form-control-sm" select-xItem> \
                                ' + xOptions + ' \
                            </select> \
                        </div> \
                    </div> \
                    <div class="form-group m-b-15"> \
                        <label class="col-md-3 col-form-label">Y-Axis</label> \
                        <div class="col-md-12"> \
                            <select class="form-control form-control-sm" select-yItem> \
                                ' + yOptions + ' \
                            </select> \
                        </div> \
                    </div> \
                </div> \
            ');

            elem.append(filterContainer(widgetObj, dataSetObj));

            $('#modal-widget-picker .modal-body [widget-options]').remove()
            $('#modal-widget-picker .modal-body [select-widget-container]').after(elem);

        },
        widgetObj: function(){
            var widgetObj = getGeneralWidgetInfo(0, 0, 6, 7);

            widgetObj.xItem = $('[select-xItem]').val();
            widgetObj.yItem = $('[select-yItem]').val();

            return widgetObj;
        },
        widgetElem: function(widgetObj){    

            var elem = $(' \
                <div class="grid-stack-item widget-comp-table" data-widget="compTable" data-widget-id="' + widgetObj.widgetID + '" data-data-set-id="' + widgetObj.dataSetID + '"> \
                <div class="grid-stack-item-content"> \
                    <div class="panel panel-inverse panel-100" data-sortable="false"> \
                        <div class="panel-heading panel-content-heading"> \
                            <div class="panel-heading-btn"> \
                                <i class="fa fa-times-circle fa-lg" style="position: absolute; right: 10px; top: 9px; cursor: pointer;"  edit-mode-show></i> \
                                <i class="fa fa-edit fa-lg" style="position: absolute; right: 30px; top: 9px; cursor: pointer;"  edit-mode-show></i> \
                            </div> \
                            <h4 class="panel-title"><i class="fa fa-refresh fa-spin"></i><i class="fa fa-table hidden"></i>' + widgetObj.title + '</h4> \
                        </div> \
                        <div class="panel-body"> \
                            <div class="table-responsive"> \
                            </div> \
                        </div> \
                    </div> \
                </div> \
                </div> \
            ');

            elem.find('.fa-edit').click(function(){
                editWidget(widgetObj.widgetID)
            });

            elem.find('.fa-times-circle').click(function(){
                removeWidget(widgetObj.widgetID)
            });
            
            return elem;

        },
        widgetRefresh: function(widgetObj){
            var widgetID = widgetObj.widgetID;
            var xItem = widgetObj.xItem
            var yItem = widgetObj.yItem

            var elem = $('[data-widget-id="' + widgetID + '"]');
            elem.find('.panel-body .table-responsive').html('');

            elem.find('.panel-heading h4 .fa-refresh').removeClass('hidden');
            elem.find('.panel-heading h4 .fa-tablet').addClass('hidden');

            mongo.get('objects', '{"_id":"' + widgetObj.dataSetID + '"}', 'title', function(mongoResults){
                
                var reportItems = [xItem, yItem];
                var dataSetObj = mongoResults[0];
                var connection = dataSetObj.connection;
                var sqlFlavor = dataSetObj.sqlFlavor;

                var reportDateFilterItems = widgetObj.filterItems.map(function(item, index){
                    return item;
                });
                var reportDateFilterObj = getDateFilterObj('reportDateRange', dataSetObj.primaryDateFilter);
                reportDateFilterItems.push(reportDateFilterObj);

                var sql = buildSqlStatement(dataSetObj, reportItems, reportDateFilterItems, false);

                sqlData.get(connection, sql, sqlFlavor, sqlRowLimit, function(sqlResults, status, goodToGo){

                    var compDateFilterItems = widgetObj.filterItems.map(function(item, index){
                        return item;
                    });
                    var compDateFilterObj = getDateFilterObj('compDateRange', dataSetObj.primaryDateFilter);
                    compDateFilterItems.push(compDateFilterObj);

                    sql = buildSqlStatement(dataSetObj, reportItems, compDateFilterItems, false);

                    sqlData.get(connection, sql, sqlFlavor, sqlRowLimit, function(compResults, status, goodToGo){
                        
                        /* ************************************************************************************* */

                        var pItem = 'Period';
                        var combinedResults = [[sqlResults[0][0],'Period', sqlResults[0][1]]];
                        sqlResults.map(function(item, index){
                            if (index != 0){
                                combinedResults.push([item[0],'Report Period', item[1]])
                            }
                        })
                        compResults.map(function(item, index){
                            if (index != 0 && index < sqlResults.length){
                                combinedResults.push([sqlResults[index][0],'Comp Period', item[1]])
                            }
                        });
                        
                        // Borrow Chart Data funciton to create the Pivot
                        var chartData = createHighChartsResults(combinedResults, xItem, yItem, pItem);

                        var tableData = [[dataSetObj.dataItems[xItem].itemTitle, dataSetObj.dataItems[yItem].itemTitle, 'vs. Comp']];
                        chartData.map(function(item, index){
                            if (index != 0){
                                tableData.push([item[0], formatMe[dataSetObj.dataItems[yItem].itemFormat](item[1]), formatMe.vsCompLabel(item[1] / item[2] - 1)])
                            }
                        })

                        
                        elem.find('.panel-body .table-responsive').append(tableSimple(tableData, dataSetObj));

                        /* ************************************************************************************* */

                        elem.find('.panel-heading h4 .fa-refresh').addClass('hidden');
                        elem.find('.panel-heading h4 .fa-table').removeClass('hidden');

                    });

                });

            });
        
        }
    },

};


/* 3.3 Filter Container
------------------------------------------------- */
var filterContainer = function(widgetObj, dataSetObj){

    var filterItems = widgetObj.filterItems || [];

    var elem = $(' \
        <div class="form-group m-b-15" filter-container> \
            <label class="col-md-12 col-form-label">Filters</label> \
        </div> \
    ');

    elem.find('label').append(' \
        <a href="javascript:;" class="btn btn-default btn-xs active pull-right"><i class="fa fa-plus"></i></a> \
    ').click(function(){
        var filterItemObj = {};
        $(this).parent().append(filterItem(filterItemObj, dataSetObj))
    });

    
    filterItems.map(function(filterItemObj){
        elem.append(filterItem(filterItemObj, dataSetObj));
    });
    
    return elem;

};


/* 3.4 Filter Item
------------------------------------------------- */
var filterItem = function(filterItemObj, dataSetObj){
    var itemID = filterItemObj.itemID || false;
    var itemTitle = filterItemObj.itemTitle || false;
    var itemType = filterItemObj.itemType || false;
    var oppr = filterItemObj.oppr || 'equals';
    var crit = filterItemObj.crit || '';

    var itemOptions = '';
    for (item in dataSetObj.dataItems){
        if (dataSetObj.dataItems[item].itemType != 'date'){
            if(!itemID){
                itemID = item;
                itemTitle = dataSetObj.dataItems[item].itemTitle;
                itemType = dataSetObj.dataItems[item].itemType;
            }
            itemOptions += '<option value="' + item + '" data-item-type="' + dataSetObj.dataItems[item].itemType + '">' + dataSetObj.dataItems[item].itemTitle + '</option>'
        }
    }

    var selectOptions = '';
    for (s in filterSelectOptionsObj[itemType]){
        selectOptions += '<option value="' + s + '">' + filterSelectOptionsObj[itemType][s].friendly + '</option>'
    }

    var elem = $(' \
        <div class="col-12 report-filter-rule" data-set-item-id="' + itemID + '" data-set-item-type="' + itemType + '" data-set-item-title="' + itemTitle + '"> \
            <div class="m-b-5" style="width: 30%;"> \
                <select class="form-control form-control-sm report-filter-rule-item"> \
                    ' + itemOptions + ' \
                </select> \
            </div> \
            <div class="form-group row"> \
                <div class="col-md-4"> \
                    <select class="form-control form-control-sm report-filter-rule-oppr"> \
                        ' + selectOptions + ' \
                    </select> \
                </div> \
                <div class="col-md-7"> \
                    <div class="report-filter-rule-criteria"> \
                    </div> \
                </div> \
                <div class="col-md-1 text-center"><i class="fa fa-times-circle fa-lg fa-x p-t-10"></i></div> \
            </div> \
        </div> \
    ');

    elem.find('[report-filter-rule-oppr]').val(itemID);
    elem.find('[report-filter-rule-oppr]').val(oppr);

    elem.find('.report-filter-rule-criteria').append(getFilterCriteriaElem(itemType, oppr, crit));

    elem.find('.report-filter-rule-item').on('change', function(){
        var itemID = $(this).val();
        var itemType = $(this).attr('data-item-type');
        $(this).parents('.report-filter-rule').attr('data-set-item-id', itemID);
        $(this).parents('.report-filter-rule').attr('data-set-item-type', itemType);
        $(this).parents('.report-filter-rule').attr('data-set-item-title', itemTitle);

    });

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
var dashboards = function () {
    "use strict";
    
    var setting;
    
    return {
        //main function
        pageSetup: function(){

            var objectID = getObjectID();
            var editMode = objectID == 'new' ? true : false;

            // Get the Atlantis Object
            mongo.get('objects', '{"_id":"' + objectID + '"}', 'title', function(mongoResults){
                var atlantisObj = updateDateRange(mongoResults[0]) || updateDateRange(createNewDashboardObj());
                storeSessionInfo.add('dashWidgets', atlantisObj.widgets);
                addPageTitle(atlantisObj);
                addDescContainer(atlantisObj);
                addDateSelectionContainer(atlantisObj);
                addDashboardContainer(atlantisObj);
                addWidgets(atlantisObj);
                refreshWidgets();
                setInitialEditMode(atlantisObj, editMode);
                atlantisApp.init();
                App.init();
            });

        },
        
    };

}();