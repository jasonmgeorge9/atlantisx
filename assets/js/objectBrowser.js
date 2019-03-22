/*
Project Name: Atlantis-X
Author: Jason M George
Website: http://www.atlantis-x.com
    ------------------------------------------------
			OBJECT BROWSER CONTENT TABLE
    ------------------------------------------------
    
    <!-- ======== OBJECT BROWSER FUNCTIONS ===== -->
    

    <!-- ======== OBJECT BROWSER PAGE SETUP ==== -->
    2.1 Determine Object Type
    2.2 Add Page Title
    2.3 Add Isotope Filters Container
    2.4 Add Isotope Items Container
    2.5 Add New Object Button
    2.6 Add Filter Buttons
    2.7 Add Filter Search
	

    <!-- ======== OBJECT BROWSER FACTORY ======= -->
    3.1 Object Browser Item
    3.2 Veiw Object Button
    3.3 Favorite Object Button
    3.4 Copy Object Button
    3.5 Delete Object Button


    <!-- ======== APPLICATION SETTING ========== -->
    Object Browser Application Controller

*/


/* 2.1 Determine Object Type
------------------------------------------------- */
var getObjectType = function(){
    var objectType = getURLParam('objectType');
    return objectType;
};


/* 2.2 Add Page Title
------------------------------------------------- */
var addPageTitle = function(objectType){
    var elem = $(' \
        <i class="fa ' + atlantisObjectTypeObj[objectType].icon + '"></i> \
        <span class="title">' + atlantisObjectTypeObj[objectType].title + '</span> \
    ');

    $('#page_header').append(elem);
};


/* 2.3 Add Object Browser Filters Container
------------------------------------------------- */
var addFiltersContainer = function(){
    var elem = $(' \
        <div id="object_browser_filters_containter" class="row m-b-20" data-option-key="filter" data-isotope-filters> \
        </div> \
    ');

    $('#content_container').append(elem);
};


/* 2.4 Add Object Browser Items Container
------------------------------------------------- */
var addItemsContainer = function(){

    var elem = $(' \
        <div class="row"> \
            <div class="col-md-12"> \
                <div id="object_browser_items_containter" class="gallery" data-isotope-items> \
                </div> \
            </div> \
        </div> \
    ');

    $('#content_container').append(elem);
};


/* 2.5 Add New Object Button
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


/* 2.6 Add Filter Buttons
------------------------------------------------- */
var addFilterButtons = function(){

    var elem = $('<div class="col-md-6 btn-row"></div>');

    elem.append(
        iconButton({
            href: '#isotope-group-favorite'
            , icon: 'fa-heart'
            , data: 'data-option-value=".isotope-group-favorite"'
            , clickFunction: function(){
                
            }
        })
    );

    elem.append(
        iconButton({
            href: '#isotope-group-owned'
            , icon: 'fa-user'
            , data: 'data-option-value=".isotope-group-owned"'
            , clickFunction: function(){
                
            }
        })
    );

    elem.append(
        iconButton({
            href: '#isotope-group-icon'
            , icon: 'fa-asterisk'
            , data: 'icon-picker=0 data-option-value=".isotope-group-icon"'
            , clickFunction: function(){

                $(this).removeClass('active');
                $('#object_browser_items_containter [data-atlantis-object]').removeClass('isotope-group-icon');

                newIcon = updateIconPicker($(this));
                if (newIcon == 0){
                    $(this).addClass('active');
                }

                $('#object_browser_items_containter [data-atlantis-object] .image-header i.' + iconPickerArray[newIcon]).each(function(e) {
                    $(this).parents('[data-atlantis-object]').addClass('isotope-group-icon'); 
                });
   
            } 
        })
    );

    elem.append(
        iconButton({
            href: '#isotope-group-color'
            , icon: 'fa-tint'
            , data: 'color-picker=0 data-option-value=".isotope-group-color"'
            , clickFunction: function(){

                $(this).removeClass('active');
                $('#object_browser_items_containter [data-atlantis-object]').removeClass('isotope-group-color');

                newColor = updateColorPicker($(this));
                if (newColor == 0){
                    $(this).addClass('active');
                }

                $('#object_browser_items_containter [data-atlantis-object] .image-header.bg-' + colorPickerArray[newColor]).each(function(e) {
                    $(this).parents('[data-atlantis-object]').addClass('isotope-group-color'); 
                });
                
            }
        })
    );

    $('#object_browser_filters_containter').append(elem);

};


/* 2.7 Add Filter Search
------------------------------------------------- */
var addFilterSearch = function(){

    var elem = $('<div class="col-md-6"></div>');

    elem.append(
        searchBox({
            href: '#isotope-group-search'
            , data: 'data-option-value=".isotope-group-search"'
            , clickFunction: function(){
                var q = $(this).parents('.input-group').find('input').val();
                $(this).removeClass('active');
                $('#object_browser_items_containter [data-atlantis-object]').removeClass('isotope-group-search');
                $('[data-atlantis-object] .title:containsIN("'+ q +'")').each(function() {
                    $(this).parents('[data-atlantis-object]').addClass('isotope-group-search'); 
                });
            }
        })
    );

    $('#object_browser_filters_containter').append(elem);

};


/* 3.1 Object Browser Item
------------------------------------------------- */
var objectBrowserItem = function(atlantisObj){

    var userInfoObj = getUserInfo();
    var isOwned = atlantisObj.ownedByID == userInfoObj._id ? true : false;
    var isFavorite = userInfoObj.favObjects.indexOf(atlantisObj._id) != -1 ? atlantisObj.color : false;

    var item = $(' \
        <div class="image ' + (isOwned == true ? 'isotope-group-owned ': ' ') + (isFavorite != false ? 'isotope-group-favorite ': ' ') + '" data-atlantis-object="' + atlantisObj._id + '"> \
            <div class="image-header bg-' + atlantisObj.color + '"><i class="fa ' + atlantisObj.icon + '"></i></div> \
            <div class="image-info"> \
                <h5 class="title">' + atlantisObj.title + '</h5> \
                <div class="desc">' + atlantisObj.desc + '</div> \
                <div class="owner"> \
                    <small><i class="fa fa-user m-r-10"></i>' + atlantisObj.ownedByName + '</small> \
                </div> \
                <div class="db"> \
                    <small><i class="fa fa-database m-r-10"></i>' + atlantisObj.connection + '</small> \
                </div> \
                <div> \
                    <div class="btn-row"> \
                    </div> \
                </div> \
            </div> \
        </div> \
    ');

    item.find('.btn-row').append(viewObjectButton(atlantisObj));
    item.find('.btn-row').append(favoriteObjectButton(atlantisObj, isFavorite));
    item.find('.btn-row').append(copyObjectButton(atlantisObj));
    if(isOwned == true){item.find('.btn-row').append(deleteObjectButton(atlantisObj, item));}

    return item;

};


/* 3.2 Veiw Object Button
------------------------------------------------- */
var viewObjectButton = function(atlantisObj){

    var btn = iconButton({
        icon: 'fa-eye'
        , clickFunction: function(){
            window.location.href = atlantisObjectTypeObj[atlantisObj.objectType].href + '?objID=' + atlantisObj._id;
        }
    });

    return btn;

};


/* 3.3 Favorite Object Button
------------------------------------------------- */
var favoriteObjectButton = function(atlantisObj, isFavorite){

    var btn = iconButton({
        icon: 'fa-heart'
        , data: 'data-favorite-object="' + isFavorite + '"'
        , clickFunction: function(){
            var userObj = getUserInfo();
            var index = userObj.favObjects.indexOf(atlantisObj._id);

            // Delete it from the User's Favorite Objects
            if (index > -1) {
                userObj.favObjects.splice(index, 1);
            }

            if ($(this).attr('data-favorite-object') == 'false'){
                var color =  $(this).parents('[data-atlantis-object]').find('.image-header').attr('class').replace('image-header bg-', '');
                $(this).attr('data-favorite-object', color);
                $(this).parents('[data-atlantis-object]').addClass('isotope-group-favorite');
                userObj.favObjects.push(atlantisObj._id);
            }
            else {
                $(this).attr('data-favorite-object', false);
                $(this).parents('[data-atlantis-object]').removeClass('isotope-group-favorite');
            }

            updateUserInfo(userObj);
        }
    });

    return btn;

};

/* 3.4 Copy Object Button
------------------------------------------------- */
var copyObjectButton = function(atlantisObj){

    var btn = iconButton({
        icon: 'fa-copy'
        , clickFunction: function(){
            var userInfoObj = getUserInfo();
            var newAtlantisObj = JSON.parse(JSON.stringify(atlantisObj));
            newAtlantisObj._id = getRandomKey();
            newAtlantisObj.ownedByID = userInfoObj._id;
            newAtlantisObj.ownedByName = userInfoObj.name;

            mongo.write('objects', newAtlantisObj._id, JSON.stringify(newAtlantisObj), function(){});
            $('#object_browser_items_containter').isotope('insert', objectBrowserItem(newAtlantisObj));
            
        }
    });

    return btn;

};



/* 3.5 Delete Object Button
------------------------------------------------- */
var deleteObjectButton = function(atlantisObj, item){

    var btn = iconButton({
        icon: 'fa-trash'
        , clickFunction: function(){
            mongo.delete('objects', atlantisObj._id, function(){});
            $('#object_browser_items_containter').isotope('remove', item);
        }
    });

    return btn;

};




/* Application Controller
------------------------------------------------- */
var objectBrowser = function () {
    "use strict";
    
    var setting;
    
    return {
        //main function
        pageSetup: function(){
            var objectType = getObjectType();
            addPageTitle(objectType);
            addFiltersContainer();
            addItemsContainer();
            addNewButton(objectType);
            addFilterButtons();
            addFilterSearch();

            // Add the Isotope Items
            mongo.get('objects', '{"objectType":"' + objectType + '"}', 'title', function(mongoResults, status){

                for (var i=0;i<mongoResults.length;i++){
                    $('#object_browser_items_containter').append(
                        objectBrowserItem(mongoResults[i])
                    );
                }

                atlantisApp.init();
                App.init();
                
                // Call The Resize for stubborn Isototpes
                $(window).smartresize();

            });

        },
        
    };

}();