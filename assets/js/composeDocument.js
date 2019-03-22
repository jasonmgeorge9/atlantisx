/*
Project Name: Atlantis-X
Author: Jason M George
Website: http://www.atlantis-x.com
    ------------------------------------------------
			COMPOSE DOCUMENT CONTENT TABLE
    ------------------------------------------------
    
    <!-- ======== COMPOSE DOCUMENT FUNCTIONS ===== -->

    
    <!-- ======== COMPOSE DOCUMENT PAGE SETUP ==== -->
    2.1 Update Content Container
    2.2 Add Document Body
    2.3 Add Explore Chart


    <!-- ======== COMPOSE DOCUMENT FACTORY ======= -->


    <!-- ======== APPLICATION SETTING ========== -->
    Compose Document Application Controller

*/


/* 2.1 Update Content Container
------------------------------------------------- */
var updateContentContainer = function(){
    $('#page_header').remove();
    $('#content_container').addClass('content-full-width').addClass('inbox');
    $('#footer').remove();
}


/* 2.2 Add Document Body
------------------------------------------------- */
var addDocumentBody = function(atlantisObj){

    var elem = $(' \
        <div class="vertical-box with-grid"> \
            <div class="vertical-box-column bg-black-transparent-2"> \
                <div class="vertical-box"> \
                    <div class="vertical-box-row bg-black-transparent-2"> \
                        <div class="vertical-box-cell"> \
                            <div class="vertical-box-inner-cell"> \
                                <div data-scrollbar="true" data-height="100%" class="p-15"> \
                                    <div> \
                                        <div class="email-to"> \
                                            <label class="control-label">To:</label> \
                                            <ul id="email-to" class="primary line-mode"> \
                                                <li>bootstrap@gmail.com</li> \
                                                <li>google@gmail.com</li> \
                                            </ul> \
                                        </div> \
                                        <div class="email-subject"> \
                                            <input type="text" class="form-control form-control-lg" placeholder="Subject" /> \
                                        </div> \
                                        <div class="email-content p-t-15"> \
                                            <div class="row"><div class="col-md-6"><div id="explore_chart_container"></div></div></div> \
                                            <textarea class="summernote" name="content"></textarea> \
                                        </div> \
                                    </div> \
                                </div> \
                            </div> \
                        </div> \
                    </div> \
                    <div class="wrapper bg-black-transparent-2 text-right"> \
                        <button class="btn btn-default p-l-40 p-r-40 m-r-5"><i class="fa fa-trash"></i>Discard</button> \
                        <button class="btn btn-primary p-l-40 p-r-40"><i class="fa fa-paper-plane"></i>Send</button> \
                    </div> \
                </div> \
            </div> \
        </div> \
    ');

    elem.find('.email-to ul').tagit({
        availableTags: ["jason.george@atlantis.com", "test.user@atlantis.com"]
    });

    elem.find('.summernote').summernote({
        toolbar: [
            ['para', ['style']],
            ['misc', ['undo', 'redo']],
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']],
            ['insert', ['table']]
        ],
        styleTags: [
            { title: 'Blockquote', tag: 'blockquote', className: 'blockquote', value: 'blockquote' }, 
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'
        ]
    });
    

    $('#content_container').append(elem);

};


/* 2.3 Add Explore Chart
------------------------------------------------- */
var addExploreChart = function(){
    var container = 'explore_chart_container';
    var chartOptions = storeSessionInfo.get('tempChartOptions');
    var chart = Highcharts.chart(container, chartOptions);

}

/* Application Controller
------------------------------------------------- */
var composeDocument = function () {
    "use strict";
    
    var setting;
    
    return {
        //main function
        pageSetup: function(){
            updateContentContainer();
            addDocumentBody();
            addExploreChart();


            atlantisApp.init();
            App.init();

        },
        
    };

}();