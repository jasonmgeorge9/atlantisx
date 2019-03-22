/*
Project Name: Atlantis-X
Author: Jason M George
Website: http://www.atlantis-x.com
    ------------------------------------------------
			DATA SETS CONTENT TABLE
    ------------------------------------------------
    
    <!-- ======== DATA SETS FUNCTIONS ===== -->
    1.1 Create Data Set Object
    1.2 Create Data Set Save Object
    1.3 Activate ACE Editor
    1.4 Check Connection
    1.5 Set Edit Mode
    1.6 Activate Data Items Sortable
    1.7 Add New Data Item
    1.7 Remove Data Item
    1.9 Move Data Item To Create Form
    1.10 Update Data Object Sort Array
    1.11 Reset Create Item Form
    1.12 Activate Item Type Select
    1.13 Activate Primary Date Filter Checkbox
    1.14 Activate Icon Picker


    <!-- ======== DATA SETS PAGE SETUP ==== -->
    2.1 Get Object ID
    2.2 Set Altantis Obj Header and Initial Edit Mode
    2.3 Add Page Title
    2.4 Add Description / Action Buttons Container
    2.5 Add Data Set Container
    2.6 Add New Object Button
    2.7 Add Connection Selector
    2.8 Add SQL Buttons
    2.9 Add Data Set Items
    2.0 Add Create Item Buttons
    2.11 Add Options to Format Select


    <!-- ======== DATA SETS FACTORY ======= -->
    3.1 Data Set Item


    <!-- ======== APPLICATION SETTING ========== -->
    Data Sets Application Controller

*/


/* 1.1 Create New Data Set Object
------------------------------------------------- */
var createNewDataSetObj = function(){
    var userInfoObj = getUserInfo();
    var objID = getRandomKey();

    return {
        "_id": objID
        , "objectType": "dataset"
        , "ownedByID": userInfoObj._id
        , "ownedByName": userInfoObj.name
        , "color": "primary"
        , "icon": "fa-globe"
        , "connectionID": "none"
        , "connection": "Please Select Connection..."
        , "sqlFlavor": "none"
        , "title": "New Data Set"
        , "desc": "Please describe the function of this Data Set..."
        , "sql": ""
        , "dataItems": {}
        , "sortArray": []
        , "primaryDateFilter": ""
    };
};


var createDataSetObjFromSQL = function(){

    if (!storeSessionInfo.get('tempSQLObj')){
        return createNewDataSetObj();
    }

    var userInfoObj = getUserInfo();
    var tempSQLObj = storeSessionInfo.get('tempSQLObj');
    storeSessionInfo.remove('tempSQLObj');

    var objID = getRandomKey();

    return {
        "_id": objID
        , "objectType": "dataset"
        , "ownedByID": userInfoObj._id
        , "ownedByName": userInfoObj.name
        , "color": tempSQLObj.color
        , "icon": tempSQLObj.icon
        , "connectionID": tempSQLObj.connectionID
        , "connection": tempSQLObj.connection
        , "sqlFlavor": tempSQLObj.sqlFlavor
        , "title": "New Data Set"
        , "desc": "Please describe the function of this Data Set..."
        , "sql": tempSQLObj.sql
        , "dataItems": {}
        , "sortArray": []
        , "primaryDateFilter": ""
    };
};


/* 1.2 Create Data Set Save Object
------------------------------------------------- */
var createDataSetSaveObj = function(){

    var dataSetItemsObj = storeSessionInfo.get('dataSetItemsObj');
    var userInfoObj = getUserInfo();
    var editor = ace.edit('sql_statement');
    var sql = editor.getValue();
    var dataItems = dataSetItemsObj.dataItems;
    var sortArray = dataSetItemsObj.sortArray;
    var primaryDateFilter = dataSetItemsObj.primaryDateFilter

    return {
        "_id": $('[data-atlantis-object]').attr('data-atlantis-object')
        , "objectType": "dataset"
        , "ownedByID": userInfoObj._id
        , "ownedByName": userInfoObj.name
        , "color": $('[data-atlantis-object]').attr('data-atlantis-object-color')
        , "icon": $('[data-atlantis-object]').attr('data-atlantis-object-icon')
        , "connectionID": $('[data-selected-connection-id]').attr('data-selected-connection-id')
        , "connection": $('[data-selected-connection-name]').attr('data-selected-connection-name')
        , "sqlFlavor": $('[data-selected-sql-flavor]').attr('data-selected-sql-flavor')
        , "title": $('#object_title').text().trim()
        , "desc": $('#object_desc').text().trim()
        , "sql": sql
        , "dataItems": dataItems
        , "sortArray": sortArray
        , "primaryDateFilter": primaryDateFilter
    };
};


/* 1.3 Activate ACE Editor
------------------------------------------------- */
var activateAceEditor = function(atlantisObj){
    var editMode = $('#content_container').attr('edit-mode') == "true";
    var editor = ace.edit("sql_statement");
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
        maxLines: Infinity,
        minLines: 15,
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true,
        showGutter: false,
        showPrintMargin: false,
        fontSize: 13,
    });

    editor.getSession().on('change', function() {
        $('[data-results-dependent]').addClass('hidden');
        storeSessionInfo.remove('sqlPreviewResults');
    });

    editor.setValue(atlantisObj.sql);
    editor.clearSelection();

    if(editMode) {
        editor.setOptions({readOnly: false});
        editor.renderer.$cursorLayer.element.style.display = "inherit";
        editor.focus();
    }
    else {
        editor.setOptions({readOnly: true});
        editor.renderer.$cursorLayer.element.style.display = "none";
    }

    return editor;
};


/* 1.3 Activate Item SQL Editor
------------------------------------------------- */
var activateItemSQLEditor = function(){
    var editor = ace.edit("item_sql");
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode({
       path: "ace/mode/sql"
       , v: Date.now() // Chache Buster
    })
    editor.setHighlightActiveLine(false);
    editor.setAutoScrollEditorIntoView(true);
    editor.session.setUseWrapMode(true);
    editor.setOptions({
        maxLines: Infinity,
        minLines: 3,
        showGutter: false,
        showPrintMargin: false,
        fontSize: 12,
    });

    return editor;
};



/* 1.4 Check Connection
------------------------------------------------- */
var checkConnection = function(connection){

    if(connection == 'Please Select Connection...'){

        var alert = {"color":"danger", "title":"Uh Oh!", "text":"Please Select a Data Connection."};
        gritterNotification(alert);

        return false;

    }

    return true

};


/* 1.5 Set Edit Mode
------------------------------------------------- */
var setEditMode = function(editMode){
    var editor = ace.edit('sql_statement');
    var cursorObj = {
        true: "inherit"
        , false: "none"
    }

    $('#content_container').attr('edit-mode', editMode);
    editor.setOptions({readOnly:!editMode});
    editor.renderer.$cursorLayer.element.style.display = cursorObj[editMode];
    editor.focus();
    $('#object_title').attr('contenteditable', editMode);
    $('#object_desc').attr('contenteditable', editMode);
    resetCreateItemForm();

    if (editMode){
        $('#data_items_container').sortable('enable');
        
    }
    else {
        $('#data_items_container').sortable('disable');

    }

};


/* 1.6 Activate Data Set Items Sortable
------------------------------------------------- */
var activateSortable = function(){

    $('#data_items_container').sortable({
        helper: 'clone'
       , items: '>div'
       , stop: function( event, ui ) {
            updateSortArray($(this).sortable('toArray'));
       },       

    });

    $('.data-set-item').draggable({
        helper: 'clone'
       , stop: function( event, ui ) {
            
       },       

    });

    $('.data-set-item-edit-zone').droppable({
        helper: 'clone',
        drop: function (event, ui) {
            moveItemToCreateForm(ui.draggable.attr('id'));
        }      

    });
    
};


/* 1.7 Add New Data Item
------------------------------------------------- */
var addNewDataItem = function(itemTitle, itemType, itemSQL, itemFormat, itemIcon, itemID, position){
    var dataSetItemsObj = storeSessionInfo.get('dataSetItemsObj');
    $('#' + itemID).remove();

    if (position =='0'){
        $('#data_items_container').prepend(
            dataSetItem(itemID, itemTitle, itemType, itemIcon)
        );
    }
    else if (position =='last'){
        $('#data_items_container').append(
            dataSetItem(itemID, itemTitle, itemType, itemIcon)
        );
    }
    else {
        $('#data_items_container > div:nth-child(' + Number(position) + ')').after(
            dataSetItem(itemID, itemTitle, itemType, itemIcon)
        );
    }

    dataSetItemsObj.dataItems[itemID] = {
        "itemTitle": itemTitle
        , "itemType": itemType
        , "itemSQL": itemSQL
        , "itemFormat": itemFormat
        , "itemIcon": itemIcon
    }

    storeSessionInfo.add('dataSetItemsObj', dataSetItemsObj);
    updateSortArray($('#data_items_container').sortable('toArray'));
};


/* 1.8 Remove Data Item
------------------------------------------------- */
var removeDataItem = function(itemID){
    var dataSetItemsObj = storeSessionInfo.get('dataSetItemsObj');
    
    $('#' + itemID).remove();
    delete dataSetItemsObj.dataItems[itemID];
    if(itemID == dataSetItemsObj.primaryDateFilter){
        dataSetItemsObj.primaryDateFilter = '';
    }
    storeSessionInfo.add('dataSetItemsObj', dataSetItemsObj);
    updateSortArray($('#data_items_container').sortable('toArray'));
};


/* 1.9 Move Data Item To Create Form
------------------------------------------------- */
var moveItemToCreateForm = function(itemID){
    var dataSetItemsObj = storeSessionInfo.get('dataSetItemsObj');
    var currSortArray = $('#data_items_container').sortable('toArray');
    $('#create-item-btn').html('<i class="fa fa-check-square fa-lg m-r-5"></i>Update Item');
    $('.data-set-item .btn-default').addClass('hidden');
    $('#create_items_container').attr('data-item-id', itemID);
    $('#create_items_container').attr('data-add-position', currSortArray.indexOf(itemID));
    $('#itemTitle').val(dataSetItemsObj.dataItems[itemID].itemTitle)
    $('#itemType').val(dataSetItemsObj.dataItems[itemID].itemType).trigger('change');
    $('#itemFormat').val(dataSetItemsObj.dataItems[itemID].itemFormat);

    if(itemID == dataSetItemsObj.primaryDateFilter){
        $('#primary_date_filter_checkbox').click()
    }

    $('.icp-dd').data('iconpicker').update('fa '+ dataSetItemsObj.dataItems[itemID].itemIcon || 'fa-circle', true);

    var editor = ace.edit('item_sql');
    editor.setValue(dataSetItemsObj.dataItems[itemID].itemSQL);

};


/* 1.10 Update Data Object Sort Array
------------------------------------------------- */
var updateSortArray = function(newArray){
    var dataSetItemsObj = storeSessionInfo.get('dataSetItemsObj');
    dataSetItemsObj.sortArray = newArray;
    storeSessionInfo.add('dataSetItemsObj', dataSetItemsObj);
};


/* 1.11 Reset Create Item Form
------------------------------------------------- */
var resetCreateItemForm = function(){
    $('#itemTitle').val('')
    $('#itemType').val('attribute').trigger('change');
    $('#itemFormat').val('none');
    var editor = ace.edit('item_sql');
    editor.setValue('');
    $('#create_items_container form').find('.parsley-success').removeClass('parsley-success');
    $('#create_items_container form').find('.parsley-error').removeClass('parsley-error');
    $('#create_items_container').attr('data-item-id', getRandomKey());
    $('#create_items_container').attr('data-add-position', 'last');
    $('.data-set-item .btn-default').removeClass('hidden');
    $('#create-item-btn').html('<i class="fa fa-plus fa-lg m-r-5"></i>Create Item')

    if($('#primary_date_filter_checkbox').attr('data-checked') == 'true'){
        $('#primary_date_filter_checkbox').click();
    }

    $('.icp-dd').data('iconpicker').update('fa fa-circle', true);

    

};


/* 1.12 Activate Item Type Select
------------------------------------------------- */
var activateItemTypeSelect = function(){
    $('#itemType').on('change', function(){

        var dataSetItemsObj = storeSessionInfo.get('dataSetItemsObj');

        if ($(this).val() == 'date') {
            if (dataSetItemsObj.primaryDateFilter == '' || dataSetItemsObj.primaryDateFilter == $('#create_items_container').attr('data-item-id')){
                $('#primary_date_filter_checkbox').parent().removeClass('hidden');
            }
            $('#itemIconContainer').addClass('hidden');
        }
        else if ($(this).val() == 'metric') {
            $('#primary_date_filter_checkbox').parent().addClass('hidden');
            $('#itemIconContainer').removeClass('hidden');
        }
        else {
            $('#primary_date_filter_checkbox').parent().addClass('hidden');
            $('#itemIconContainer').addClass('hidden');
        }


    })
}

/* 1.13 Activate Primary Date Filter Checkbox
------------------------------------------------- */
var activatePrimaryDateFilterCheckbox = function(){
    $('#primary_date_filter_checkbox').click(function(){
        var primaryDateFilter = $(this).attr('data-checked');
        var dataSetItemsObj = storeSessionInfo.get('dataSetItemsObj');
        var itemID = $('#create_items_container').attr('data-item-id');

        if (primaryDateFilter == 'false' && itemID == dataSetItemsObj.primaryDateFilter){
            dataSetItemsObj.primaryDateFilter = '';
        }

        if (primaryDateFilter == 'true'){
            dataSetItemsObj.primaryDateFilter = itemID;
        }

        storeSessionInfo.add('dataSetItemsObj', dataSetItemsObj);
    })
}


/* 1.14 Activate Icon Picker
------------------------------------------------- */
var activateIconPicker = function(){

    $('.icp-dd').iconpicker({
        title: 'Please Select An Icon'
        //, component:'.btn > i'
        , icons: faIconPickerIconsArray

    });

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

    if (editMode){
        $('#data_items_container').sortable('enable');    
    }
    else {
        $('#data_items_container').sortable('disable');
    }

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
                    var saveObj = createDataSetSaveObj();

                    if (!checkConnection(saveObj.connection)){
                        return false;
                    }

                    if (saveObj.primaryDateFilter == ''){
                        gritterNotification({"color":"danger", "title":"Uh Oh!", "text":"Please assign a Primary Date Filter."});
                        return false;
                    }

                    btn.addClass('refreshing');
                    mongo.write('objects', saveObj._id, JSON.stringify(saveObj), function(results, status){
                                        
                        if(status == 'success'){
                            btn.removeClass('refreshing');
                            setEditMode(false);
                            gritterNotification({"color":"success", "title":"Success!", "text":"Your Data Set was successfully saved."});
                            window.history.replaceState({},window.location.pathname, window.location.pathname + '?objID=' + saveObj._id);
                        }
                        else {
                            gritterNotification({"color":"danger", "title":"Error!", "text":"Something went wrong. Your Data Set was not saved."});
                        }

                    });
                }
            })
        );

    }

    $('#content_container').append(elem);
};


/* 2.5 Add Data Set Container
------------------------------------------------- */
var addDataSetContainer = function(atlantisObj){

    var elem = $(' \
        <div class="row"> \
            <div class="col-md-9"> \
                <div class="row"> \
                    <div id="sql_panel" class="col-md-8"> \
                        <div class="panel panel-100" data-sortable="false"> \
                            <div class="panel-heading panel-content-heading"> \
                                <div class="panel-heading-btn"> \
                                <a href="#" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"> \
                                    <i class="fa fa-expand"></i> \
                                </a> \
                                </div> \
                                <h4 class="panel-title"><i class="fa fa-code"></i>Base SQL</h4> \
                            </div> \
                            <div class="panel-body"> \
                                    <div id="connection_selector" class="connection-selector"></div> \
                                    <div class="sql-container"> \
                                        <pre id="sql_statement" style="width:100%;height: 100px;" class="autosize sql-pre m-t-10"></pre> \
                                    </div> \
                                    <div id="sql_buttons" class="btn-row"></div> \
                            </div> \
                        </div> \
                    </div> \
                    <div id="create_items_panel" class="col-md-4"> \
                        <div class="panel panel-100" data-sortable="false"> \
                            <div class="panel-heading panel-content-heading"> \
                                <div class="panel-heading-btn"> \
                                <a href="#" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"> \
                                    <i class="fa fa-expand"></i> \
                                </a> \
                                </div> \
                                <h4 class="panel-title"><i class="fa fa-wrench"></i>Create Data Set Item</h4> \
                            </div> \
                            <div class="panel-body data-set-item-edit-zone"> \
                                <div id="create_items_container" class="m-t-15" edit-mode-show data-add-position="0"> \
                                    <form action="" autocomplete="off"> \
                                        <fieldset> \
                                            <div class="form-group"> \
                                                <label for="itemTitle">Title</label> \
                                                <input id="itemTitle" type="text" class="form-control" data-parsley-required/> \
                                            </div> \
                                            <div class="form-group"> \
                                                <label for="itemType">Type</label> \
                                                <select id="itemType" class="form-control"> \
                                                    <option value="date">Date/Time</option> \
                                                    <option value="attribute" selected="selected">Attribute</option> \
                                                    <option value="metric">Metric</option> \
                                                </select> \
                                                <div class="checkbox checkbox-css m-b-10 hidden"> \
                                                    <input type="checkbox" id="primary_date_filter_checkbox" name="primary_date_filter_checkbox" data-checked="false" /> \
                                                    <label for="primary_date_filter_checkbox"> \
                                                        Primary Date Filter \
                                                    </label> \
                                                </div> \
                                            </div> \
                                            <div class="row"> \
                                                <div class="col-md-6"> \
                                                    <div class="form-group"> \
                                                        <label for="itemFormat">Format</label> \
                                                        <select id="itemFormat" class="form-control"> \
                                                        </select> \
                                                    </div> \
                                                </div> \
                                                <div id="itemIconContainer" class="col-md-6 hidden"> \
                                                    <div class="form-group pull-right text-center"> \
                                                        <label for="itemIcon">Icon</label> \
                                                        <div> \
                                                            <div class="btn-group"> \
                                                                <a href="#" class="btn btn-default btn-icon btn-lg iconpicker-component"><i class="fa fa-circle"></i></a> \
                                                                <a href="#" class="btn btn-default icp icp-dd dropdown-toggle" data-toggle="dropdown"></a> \
                                                                <div class="dropdown-menu pull-right"> \
                                                                </div> \
                                                            </div> \
                                                        </div> \
                                                    </div> \
                                                </div> \
                                            </div> \
                                            <div class="form-group"> \
                                                <label for="itemSQL">Syntax</label> \
                                                    <div class="sql-container"> \
                                                        <pre id="item_sql" style="width:100%;height: 20px;" class="autosize sql-pre m-t-10"></pre> \
                                                    </div> \
                                            </div> \
                                            <div id="create_item_buttons" class="btn-row"></div> \
                                        </fieldset> \
                                    </form> \
                                </div> \
                            </div> \
                        </div> \
                    </div> \
                </div> \
                <div class="row"> \
                    <div id="results_panel" class="col-md-12 m-t-20 " edit-mode-show> \
                        <div class="panel panel-100" data-sortable="false"> \
                            <div class="panel-heading panel-content-heading"> \
                                <div class="panel-heading-btn"> \
                                <a href="#" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"> \
                                    <i class="fa fa-expand"></i> \
                                </a> \
                                </div> \
                                <h4 class="panel-title"><i class="fa fa-table"></i>Preview</h4> \
                            </div> \
                            <div class="panel-body"> \
                                <div id="results_table_container" class="m-t-15"> \
                                </div> \
                            </div> \
                        </div> \
                    </div> \
                </div> \
            </div> \
            <div class="col-md-3"> \
                <div class="row row-100"> \
                    <div id="data_items_panel"  class="col-md-12"> \
                        <div class="panel panel-100" data-sortable="false"> \
                            <div class="panel-heading panel-content-heading"> \
                                <h4 class="panel-title"><i class="fa fa-key"></i>Data Set Items</h4> \
                            </div> \
                            <div class="panel-body"> \
                                <div id="data_items_container" class="m-t-15 data-set-item-list sortable"> \
                                </div> \
                            </div> \
                        </div> \
                    </div> \
                </div> \
            </div> \
        </div> \
    ');

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


/* 2.7 Add Connection Selector
------------------------------------------------- */
var addConnectionSelector = function(atlantisObj){
    mongo.get('data_connections', '{}', 'name', function(mongoResults){
        var conli = '';
        for (var i=0;i<mongoResults.length;i++){
            conli += '<li><a href="javascript:;" data-connection-id="' + mongoResults[i]._id +'" data-connection-name="' + mongoResults[i].name +'" data-sql-flavor="' + mongoResults[i].sqlFlavor +'">' + mongoResults[i].name +'</a></li>';
        }
        var elem = $(' \
            <h5 class="" data-selected-connection-id="' + atlantisObj.connectionID + '" data-selected-connection-name="' + atlantisObj.connection + '" data-selected-sql-flavor="' + atlantisObj.sqlFlavor + '"> \
                <a href="javascript:;" data-toggle="dropdown" class="btn btn-default" edit-mode-show><i class="fa fa-database"></i><i class="fa fa-caret-down"></i></a> \
                </a> \
                <ul class="dropdown-menu"> \
                    ' + conli + ' \
                </ul> \
                <i class="fa fa-database" edit-mode-hide></i> \
                <span>' + atlantisObj.connection + '</span> \
            </h5> \
        ');

        elem.find('[data-connection-name]').click(function(){

            var selectedConnectionID = $(this).attr('data-connection-id');
            var selectedConnection = $(this).attr('data-connection-name');
            var selectedSqlFlavor = $(this).attr('data-sql-flavor');
            $('[data-selected-connection-id]').attr('data-selected-connection-id', selectedConnectionID);
            $('[data-selected-connection-name]').attr('data-selected-connection-name', selectedConnection);
            $('[data-selected-connection-name]').find('span').text(selectedConnection);
            $('[data-selected-sql-flavor]').attr('data-selected-sql-flavor', selectedSqlFlavor);

        });

        $('#connection_selector').append(elem);
    });

};


/* 2.8 Add SQL Buttons
------------------------------------------------- */
var addSqlButtons = function(){

    $('#sql_buttons').append(
        regularButton({
            txt: 'Preview'
            , icon: 'fa-bolt'
            , addClass: 'active'
            , data: 'edit-mode-show'
            , clickFunction: function(){
                var btn = $(this);
                var editor = ace.edit('sql_statement');
                var connection = $('[data-selected-connection-name]').attr('data-selected-connection-name');
                var sqlFlavor = $('[data-selected-sql-flavor]').attr('data-selected-sql-flavor');
                var sql = editor.getValue();

                if (!checkConnection(connection)){
                    return false;
                }

                btn.addClass('refreshing');
                sqlData.get(connection, sql, sqlFlavor, 10, function(sqlResults, status, goodToGo){

                    btn.removeClass('refreshing');
                    $('#results_table_container').html('')
                    if(!goodToGo){return false};

                    //  Add the Results to the Results Table
                    $('#results_table_container').append(tableSQLRunner(sqlResults, 'table-bordered table-striped'))
                        .parents('#results_panel').removeClass('hidden')
                        .find('td').each(function() {
                            $(this).text(formatMe.generalFormat($(this).text()));
                        });
                    $('#results_table_container table').DataTable({responsive:true});

                    $('[data-results-dependent]').removeClass('hidden');

                    storeSessionInfo.add('sqlPreviewResults', sqlResults);

                });

            }
        })
    );


    $('#sql_buttons').append(
        regularButton({
            txt: 'Bulk Create'
            , icon: 'fa-wrench'
            , addClass: 'hidden pull-right active'
            , data: 'edit-mode-show data-results-dependent'
            , clickFunction: function(){
                var sqlPreviewResults = storeSessionInfo.get('sqlPreviewResults');
                var currDataItemsArray = [];
                $('.data-set-item').each(function(){
                    currDataItemsArray.push($(this).text().trim())
                });

                sqlPreviewResults[0].map(function(arr, index){
                    var itemTitle = formatMe.toTitleCase(arr).trim();
                    var itemType = isDateAttrMetric(sqlPreviewResults[1][index]);
                    var itemSQL = itemType == 'metric' ? 'sum(' + arr.trim() + ')' : arr.trim();
                    var itemFormat = itemType == 'metric' ? 'numberComma' : itemType == 'date' ? 'dateYYYYMMDD' : 'none';

                    if(currDataItemsArray.indexOf(itemTitle) == -1) {
                        addNewDataItem(itemTitle, itemType, itemSQL, itemFormat, 'fa-circle', getRandomKey(), 'last')
                    }

                }); 
            }
        })
    );

};


/* 2.9 Add Data Set Items
------------------------------------------------- */
var addDataSetItemsToContainer = function(atlantisObj){
    atlantisObj.sortArray.map(function(item){
        var itemID = item;
        var itemTitle = atlantisObj.dataItems[item].itemTitle;
        var itemType = atlantisObj.dataItems[item].itemType;
        var itemIcon = atlantisObj.dataItems[item].itemIcon;
        $('#data_items_container').append(dataSetItem(itemID, itemTitle, itemType, itemIcon));
    });
}


/* 2.10 Add Create Item Buttons
------------------------------------------------- */
var addCreateItemButtons = function(){

    $('#create_item_buttons').append(
        regularButton({
            txt: 'Create Item'
            , icon: 'fa-plus'
            , addClass: 'active'
            , data: 'id="create-item-btn"'
            , clickFunction: function(){
                var editor = ace.edit('item_sql');
                var itemSQL = editor.getValue();
                var goodToGo = $('#create_items_container form').parsley().validate();
                $('#item_sql').parents('.form-group').find('.parsley-required').remove();
                $('#item_sql').parents('.form-group').find('.parsley-error').removeClass('parsley-error');
                

                if (itemSQL ==''){
                    $('#item_sql').parent().parsley().addError('required', {message: 'This value is required', updateClass: true});
                    return false
                }
                if (!goodToGo){
                    return false
                }

                var itemTitle = $('#itemTitle').val();
                var itemType = $('#itemType').val();
                var itemFormat = $('#itemFormat').val();
                var itemIcon = $('.iconpicker-selected').attr('title').replace('.fa ','');
                var itemID = $('#create_items_container').attr('data-item-id');
                var position = $('#create_items_container').attr('data-add-position');
                addNewDataItem(itemTitle, itemType, itemSQL, itemFormat, itemIcon, itemID, position);

                resetCreateItemForm();

            }
        })
    );

}


/* 2.11 Add Options to Format Select
------------------------------------------------- */
var addFormatOptionsSelect = function(){
    var formatOptions = '';
    for (o in formatOptionsObj){
        formatOptions += '<option value="' + o + '">' + formatOptionsObj[o] + '</option>';
    };

    $('#itemFormat').append(formatOptions);

}




/* 3.1 Data Set Item
------------------------------------------------- */
var dataSetItem = function(itemID, itemTitle, itemType, itemIcon){
    var i = itemType == 'metric' ? '<i class="fa ' + itemIcon + ' m-r-5"></i>' : '';

    var elem = $(' \
        <div id="' + itemID + '" class="data-set-item" data-set-item-type="' + itemType + '"> \
            ' + i + ' \
            <span>' + itemTitle + '</span> \
                <i class="fa fa-times-circle fa-lg fa-x pull-right" style="padding-top: 3px;" edit-mode-show></i> \
        </div> \
    ');

    elem.find('.fa-x').click(function(){
        removeDataItem($(this).parents('.data-set-item').attr('id'));
    });

    return elem;

};


/* Application Controller
------------------------------------------------- */
var dataSets = function () {
    "use strict";
    
    var setting;
    
    return {
        //main function
        pageSetup: function(){
            var objectID = getObjectID();
            var editMode = objectID == 'SQL' || objectID == 'new' ? true : false;

            // Get the Atlantis Object
            mongo.get('objects', '{"_id":"' + objectID + '"}', 'title', function(mongoResults){
                var atlantisObj = objectID == 'SQL' ? createDataSetObjFromSQL() : mongoResults[0] || createNewDataSetObj();
                storeSessionInfo.add('dataSetItemsObj', {"dataItems": atlantisObj.dataItems, "sortArray": atlantisObj.sortArray, "primaryDateFilter": atlantisObj.primaryDateFilter || ''});
                addPageTitle(atlantisObj);
                addDescContainer(atlantisObj);
                addDataSetContainer(atlantisObj);
                addNewButton(atlantisObj.objectType);
                addConnectionSelector(atlantisObj);
                addSqlButtons();
                addFormatOptionsSelect();
                addCreateItemButtons();
                activateSortable();
                var editor = activateAceEditor(atlantisObj);
                activateItemSQLEditor()
                activateItemTypeSelect();
                activateIconPicker();
                addDataSetItemsToContainer(atlantisObj);
                setInitialEditMode(atlantisObj, editMode);
                
                
                atlantisApp.init();
                activatePrimaryDateFilterCheckbox();
                App.init();
            });

        },
        
    };

}();