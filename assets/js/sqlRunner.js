/*
Project Name: Atlantis-X
Author: Jason M George
Website: http://www.atlantis-x.com
    ------------------------------------------------
			SQL RUNNER CONTENT TABLE
    ------------------------------------------------
    
    <!-- ======== SQL RUNNER FUNCTIONS ===== -->
    1.1 Create New SQL Runner Object
    1.2 Create SQL Runner Save Object
    1.3 Activate ACE Editor
    1.4 Check Connection
    1.5 Set Edit Mode

    <!-- ======== SQL RUNNER PAGE SETUP ==== -->
    2.1 Get Object ID
	2.2 Set Initial Edit Mode
    2.3 Add Page Title
    2.4 Add Description / Action Buttons Container
    2.5 Add SQL Runner Container
    2.6 Add New Object Button
    2.7 Add Connection Selector
    2.8 Add Table Structure


    <!-- ======== SQL RUNNER FACTORY ======= -->



    <!-- ======== APPLICATION SETTING ========== -->
    SQL Runner Application Controller

*/


/* 1.1 Create New SQL Runner Object
------------------------------------------------- */
var createNewSqlRunnerObj = function(){
    var userInfoObj = getUserInfo();
    var objID = getRandomKey();

    return {
        "_id": objID
        , "objectType": "sql_runner"
        , "ownedByID": userInfoObj._id
        , "ownedByName": userInfoObj.name
        , "color": "primary"
        , "icon": "fa-globe"
        , "connectionID": "none"
        , "connection": "Please Select Connection..."
        , "sqlFlavor": "none"
        , "title": "New SQL Runner"
        , "desc": "Please describe the function of this SQL statement..."
        , "sql": ""
    };

};


/* 1.2 Create SQL Runner Save Object
------------------------------------------------- */
var createSqlRunnerSaveObj = function(){
    var userInfoObj = getUserInfo();
    var editor = ace.edit("sql_statement");
    var sql = editor.getValue();

    return {
        "_id": $('[data-atlantis-object]').attr('data-atlantis-object')
        , "objectType": "sql_runner"
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
    var editor = ace.edit("sql_statement");
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

};


/* 2.1 Get Object ID
------------------------------------------------- */
var getObjectID = function(){
    var objectID = getURLParam('objID');
    return objectID;
};


/* 2.2 Set Initial Edit Mode
------------------------------------------------- */
var setInitialEditMode = function(atlantisObj){
    var editMode = atlantisObj.connection == 'Please Select Connection...' ? true : false;
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
                var editor = ace.edit("sql_statement");
                var connection = $('[data-selected-connection-name]').attr('data-selected-connection-name');
                var sqlFlavor = $('[data-selected-sql-flavor]').attr('data-selected-sql-flavor');
                var sql = editor.getValue();

                if (!checkConnection(connection)){
                    return false;
                }

                $('.alert').alert('close')
                btn.addClass('refreshing');
                sqlData.get(connection, sql, sqlFlavor, sqlRowLimit, function(sqlResults, status, goodToGo){

                    btn.removeClass('refreshing');
                    $('#results_table_container').html('')
                    if(!goodToGo){return false};

                    //  Add the Results to the Results Table
                    $('#results_table_container').append(tableSQLRunner(sqlResults, 'table-bordered table-striped'))
                        .parents('#results_panel').removeClass('hidden')
                        .find('td').each(function() {
                            $(this).text(formatMe.generalFormat($(this).text()));
                        });
                    $('#results_table_container table').DataTable({
                        "responsive": true,
                         "aaSorting": []
                    });

                    //  Check for Too Many Results
                    if (sqlResults.length > sqlRowLimit) {

                        headerNotification('warning' ,'Row limit reached.' ,'Results diplayed here are limited.  Please Download for the full Results set.', true);

                    }

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
                    $('#results_table_container').html('')
                    $('#results_panel').addClass('hidden');
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
                    var saveObj = createSqlRunnerSaveObj();

                    if (!checkConnection(saveObj.connection)){
                        return false;
                    }

                    btn.addClass('refreshing');
                    mongo.write('objects', saveObj._id, JSON.stringify(saveObj), function(results, status){
                                        
                        if(status == 'success'){
                            btn.removeClass('refreshing');
                            setEditMode(false);
                            gritterNotification({"color":"success", "title":"Success!", "text":"Your SQL Runner was successfully saved."});
                            window.history.replaceState({},window.location.pathname, window.location.pathname + '?objID=' + saveObj._id);
                        }
                        else {
                            gritterNotification({"color":"danger", "title":"Error!", "text":"Something went wrong. Your SQL Runner was not saved."});
                        }

                    });
                }
            })
        );
    
    }

    elem.find('.btn-row').append(
        iconButton({
            icon: 'fa-download'
            , clickFunction: function(){
                var btn = $(this);
                var editor = ace.edit("sql_statement");
                var connection = $('[data-selected-connection-name]').attr('data-selected-connection-name');
                var fileName = $('#object_title').text().trim();
                var sql = editor.getValue();

                if (!checkConnection(connection)){
                    return false;
                }

                btn.addClass('refreshing');
                sqlData.download(connection, fileName, sql, function(sqlResults, status){

                    btn.removeClass('refreshing');

                });
                
            }
        })
    );

    elem.find('.btn-row').append(
        iconButton({
            icon: 'fa-key'
            , clickFunction: function(){
                var tempSQLObj = createSqlRunnerSaveObj();
                storeSessionInfo.add('tempSQLObj', tempSQLObj);
                window.location.href = atlantisObjectTypeObj['dataset'].href + '?objID=SQL';
            }
        })
    );

    $('#content_container').append(elem);
};


/* 2.5 Add SQL Runner Container
------------------------------------------------- */
var addSQLRunnerContainer = function(atlantisObj){

    var elem = $(' \
        <div class="row"> \
            <div id="connections_panel" class="col-md-3"> \
                <div class="panel panel-100" data-sortable="false"> \
                    <div class="panel-heading panel-content-heading"> \
                        <h4 class="panel-title"><i class="fa fa-plug"></i>Data Connection</h4> \
                    </div> \
                    <div class="panel-body"> \
                        <div id="connection_selector" class="connection-selector"></div> \
                        <div id="connections_tree_container"></div> \
                    </div> \
                </div> \
            </div> \
            <div class="col-md-9"> \
                <div class="row"> \
                    <div id="sql_panel" class="col-md-12"> \
                        <div class="panel panel-100" data-sortable="false"> \
                            <div class="panel-heading panel-content-heading"> \
                                <div class="panel-heading-btn"> \
                                <a href="#" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"> \
                                    <i class="fa fa-expand"></i> \
                                </a> \
                                </div> \
                                <h4 class="panel-title"><i class="fa fa-code"></i>SQL</h4> \
                            </div> \
                            <div class="panel-body"> \
                                <div class="sql-container"> \
                                    <pre id="sql_statement" style="width:100%;height: 100px;" class="autosize sql-pre m-t-10"></pre> \
                                </div> \
                            </div> \
                        </div> \
                    </div> \
                </div> \
                <div class="row"> \
                    <div id="results_panel" class="col-md-12 m-t-20 hidden"> \
                        <div class="panel panel-100" data-sortable="false"> \
                            <div class="panel-heading panel-content-heading"> \
                                <div class="panel-heading-btn"> \
                                <a href="#" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"> \
                                    <i class="fa fa-expand"></i> \
                                </a> \
                                </div> \
                                <h4 class="panel-title"><i class="fa fa-table"></i>Results</h4> \
                            </div> \
                            <div class="panel-body"> \
                                <div id="results_table_container" class="m-t-15"> \
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
            addTableStructure(selectedConnectionID);

        });

        $('#connection_selector').append(elem);
    });

};


/* 2.8 Add Table Structure
------------------------------------------------- */
var addTableStructure = function(connectionID){


    if(connectionID == 'none'){
        return false
    };

    mongo.get('data_connections', '{"_id":"' + connectionID + '"}', 'name', function(mongoResults){
        $('#connections_tree_container').jstree("destroy").empty();

        var schemas = mongoResults[0].schemas;
        var data = [];

        for (s in schemas){

            var schemaObj = {
                "id": getRandomKey()
                , "text": s
                , "type": "schema"
                , "children": []
            };

            for (t in schemas[s]){
                var tableObj = {
                    "id": getRandomKey()
                    , "text": t
                    , "type": "table"
                    , "children": []
                };

                schemas[s][t].map(function(item, index){
                    tableObj.children.push({
                        "id": getRandomKey()
                        , "text": item.column
                        , "type": "column_" + item.type
                    });
                })

                schemaObj.children.push(tableObj);

            }
            data.push(schemaObj);
        };

        jsTree.create('#connections_tree_container', data, function(selected){
            var editor = ace.edit("sql_statement");
            if(!editor.getReadOnly()){
                editor.insert(selected.trim());
                editor.focus();
            }
        });

    });

};

/* Application Controller
------------------------------------------------- */
var sqlRunner = function () {
    "use strict";
    
    var setting;
    
    return {
        //main function
        pageSetup: function(){
            var objectID = getObjectID();

            // Get the Atlantis Object
            mongo.get('objects', '{"_id":"' + objectID + '"}', 'title', function(mongoResults){
                var atlantisObj = mongoResults[0] || createNewSqlRunnerObj();
                addPageTitle(atlantisObj);
                addDescContainer(atlantisObj);
                addSQLRunnerContainer(atlantisObj);
                addNewButton(atlantisObj.objectType);
                addConnectionSelector(atlantisObj);
                addTableStructure(atlantisObj.connectionID);
                var editor = activateAceEditor(atlantisObj);
                setInitialEditMode(atlantisObj);

                atlantisApp.init();
                App.init();
            });

        },

        
    };

}();