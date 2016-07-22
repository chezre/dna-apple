
var app = {
    
    // user details
    myId: '',
    first_name: '',
    last_name: '',
    phone: '',
    birth_date: '',
    school_university: '',
    grade_year: '',
    moola: '',
	internetOk: false,
    
    announcements:{},
    
    // Application Constructor
    initialize: function() {
		
        this.bindEvents();
        this.setFooter();
        this.getAnnouncements();
		
		if (window.localStorage['myId']) {
			this.loadMyDeets();
			window.location="#announcements-page";
		} else {
			window.location="#register-page";
		}
		
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
		$("#btnSave").bind("click",saveRegistration);
        $("#btnCheck").click(function(){
            if (app.myId>0) {
                var postTo = 'http://dna.netninja.co.za/dna-admin/get.contact.php';
                console.log('starting post');
                $.post(postTo,{id:app.myId}).done(function(data) {
                    console.log(data);
                    var json = $.parseJSON(data);
                    app.moola = json.custom_3;
                    $("#moola").empty().append(app.moola);
                    
                }).error(function(err){
                    console.log(err);
                    alert('an error occurred retrieving your moola');
                });
                 
            } else {
                window.location="#register-page";
            }
            
        });
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.loadMyDeets();
    },
    loadMyDeets: function() {
        if (window.localStorage['myId']) app.myId = window.localStorage['myId'];
        if (window.localStorage['first_name']) app.first_name = window.localStorage['first_name'];
        if (window.localStorage['last_name']) app.last_name = window.localStorage['last_name'];
		if (window.localStorage['phone']) app.phone = window.localStorage['phone'];
        if (window.localStorage['birth_date']) app.birth_date = window.localStorage['birth_date'];
        if (window.localStorage['school_university']) app.school_university = window.localStorage['school_university'];
        if (window.localStorage['grade_year']) app.grade_year = window.localStorage['grade_year'];
        if (window.localStorage['moola']) app.moola = window.localStorage['moola'];
		
		$("#myId").val(app.myId);
		$("#first_name").val(app.first_name);
		$("#last_name").val(app.last_name);
		$("#phone").val(app.phone);
		$("#birth_date").val(app.birth_date);
		$("#school_university").val(app.school_university);
		$("#grade_year").val(app.grade_year);
		$("#moola").empty().append(app.moola);
    },
	fetchAllDeets: function() {
		if (!app.myId) {
			window.location="#register-page";
			return;
		}
		var postTo = 'http://dna.netninja.co.za/dna-admin/get.contact.php';
        $.post(postTo,{id:app.myId}).done(function(data) {
            var json = $.parseJSON(data);

            app.first_name = json.first_name;
            app.last_name = json.last_name;
            app.phone = json.phone;
            app.birth_date = json.birth_date;
            app.school_university = json.custom_1;
            app.grade_year = json.custom_2;
            app.moola = json.custom_3;
			
			$("#myId").val(app.myId);
			$("#first_name").val(app.first_name);
			$("#last_name").val(app.last_name);
			$("#phone").val(app.phone);
			$("#birth_date").val(app.birth_date);
			$("#school_university").val(app.school_university);
			$("#grade_year").val(app.grade_year);
			$("#moola").empty().append(app.moola);

        }).error(function(err){
            console.log(err);
            alert('an error occurred loading your deets');
        });	
	},
    insertMyDeets: function() {
        window.localStorage.setItem('myId', this.myId);
		window.localStorage.setItem('first_name', this.first_name);
		window.localStorage.setItem('last_name', this.last_name);
		window.localStorage.setItem('phone', this.phone);
		window.localStorage.setItem('birth_date', this.birth_date);
		window.localStorage.setItem('school_university', this.school_university);
		window.localStorage.setItem('grade_year', this.grade_year);
		window.localStorage.setItem('moola', this.moola);
    },
    getAnnouncements: function() {
		$.get("http://dna.netninja.co.za/dna-admin/announcements.php").done(function(data){
		  var json = $.parseJSON(data);
			app.announcements = json.announcements;
			for (var i=0;i<app.announcements.length;i++) $("#ulAnnouncements").append('<li aid="'+app.announcements[i].id+'">'+app.announcements[i].subject+'</li>');
            $("#announcementsDiv").empty().html(app.announcements[0].text);
            app.bindAnnouncementClick();
		}).fail(function(data){
			console.log('error: ' + data);
		});
	},
    bindAnnouncementClick: function() {
        $("#ulAnnouncements li").click(function(){
			$("#ulAnnouncements li").removeClass('liSelected');
            var aid = $(this).attr('aid');
            for (var i=0;i<app.announcements.length;i++) if (aid==app.announcements[i].id) {
				if (app.announcements[i].isAudio=='Y') playAudio(app.announcements[i].text);
				$("#announcementsDiv").empty().append(app.announcements[i].text);
				$(this).addClass('liSelected')
			}
        });
    },
	setFooter: function() {

		$('div[data-role="page"]').each(function(){
			if ($(this).attr('id')!='home-page') {
				var f = $("#footer").html();
				var ft = f.replace('#'+$(this).attr('id')+'"', '#'+$(this).attr('id')+'" data-theme="b"');
				$(this).find("div[data-role='footer']").append(ft);
			}
		});
	},
    updateMoola: function(){
        
        if (app.myId>0) {
            var postTo = 'http://dna.netninja.co.za/dna-admin/get.contact.php';
            console.log('starting post');
            $.post(postTo,{id:app.myId}).done(function(data) {
                var json = $.parseJSON(data);
                app.moola = json.custom_3;
                $("#moola").empty().append(app.moola);
            }).error(function(err){
                console.log(err);
                alert('an error occurred retrieving your moola');
            });
             
        }
    }
    
};
function saveRegistration() {
	var postTo = 'http://dna.netninja.co.za/dna-admin/save.contact.php';
    $("#frmDiv").hide();
	$("#msg").show();
    $.post(postTo,$("#register-form").serialize()).done(function(data) {
		
		var json = $.parseJSON(data);
        app.myId = json.id;
        app.first_name = json.first_name;
        app.last_name = json.last_name;
        app.phone = json.phone;
        app.birth_date = json.birth_date;
        app.school_university = json.custom_1;
        app.grade_year = json.custom_2;
        app.moola = json.custom_3;
		
        $("#moola").empty().append(app.moola);
        app.insertMyDeets();
		app.loadMyDeets();
		
        $("#msg").hide();
        $("#welcome").empty().append('Thank you<br />' + app.first_name + '<br /><br />Your deets have been saved.');
        $("#resultOk").show();
		
		
		function complete() {
			window.location="#announcements-page";
		    $("#resultOk").hide();
			$("#frmDiv").show();
		}
		$("#resultOk").fadeOut( 3000, complete );
		
		
		return true;
		
    }).error(function(err){
        console.log(err);
        $("#msg").hide();
        $("#resultNotOk").show();
    }); 
}
/*function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}*/