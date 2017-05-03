function ImagePreviewInputController(e,t,n){var r=this,o=t[0].querySelectorAll("input")[0],a=t[0].querySelectorAll("img")[0];o.addEventListener("change",function(e){var t=URL.createObjectURL(o.files[0]);a.setAttribute("src",t)}),r.$onChanges=function(e){e.item&&(o.value="",e.item.currentValue&&!e.item.currentValue.pic&&a.setAttribute("src",""))}}ImagePreviewInputController.$inject=["$scope","$element","$attrs"],angular.module("gccweb-admin",["ngRoute","ngResource"]).controller("documentController",["$scope",function(e){}]),angular.module("gccweb-admin").config(["$routeProvider","$locationProvider",function(e,t){t.hashPrefix(""),e.when("/",{templateUrl:"assets/templates/main.html"}).when("/mainAnnouncements",{templateUrl:"assets/templates/main.html",controller:"mainAnnouncementsController"}).when("/smallAnnouncements",{templateUrl:"assets/templates/main.html",controller:"smallAnnouncementsController"}).when("/memoryVerses",{templateUrl:"assets/templates/main.html",controller:"memoryVersesController"})}]),angular.module("gccweb-admin").component("imagePreviewInput",{templateUrl:"assets/templates/imagePreviewInput.html",controller:ImagePreviewInputController,bindings:{label:"@",item:"<",name:"@"}}),angular.module("gccweb-admin").directive("adminNav",function(){return{restrict:"E",templateUrl:"assets/templates/adminNav.html"}}),angular.module("gccweb-admin").controller("headerController",["$scope","$location",function(e,t){e.isActive=function(e){return e===t.path()}}]),angular.module("gccweb-admin").controller("mainAnnouncementsController",["$scope","MainAnnouncement",function(e,t){e.title="Main Announcements",e.route="mainAnnouncement",e.categories=["title","description"],e.data=t.query(),e.editForm="assets/templates/maForm.html",e.setItem=function(t){e.activeItem=t},e.create=function(){e.activeItem={title:"",description:""},e.data.unshift(e.activeItem)}}]),angular.module("gccweb-admin").controller("memoryVersesController",["$scope","MemoryVerse",function(e,t){e.title="Memory Verses",e.route="memoryVerse",e.categories=["reference","verse"],e.data=t.query(),e.editForm="assets/templates/mvForm.html",e.setItem=function(t){e.activeItem=t},e.create=function(){e.activeItem={reference:"",verse:""},e.data.unshift(e.activeItem)}}]),angular.module("gccweb-admin").controller("smallAnnouncementsController",["$scope","SmallAnnouncement",function(e,t){e.title="Small Announcements",e.route="smallAnnouncement",e.categories=["text"],e.data=t.query(),e.editForm="assets/templates/saForm.html",e.setItem=function(t){e.activeItem=t},e.create=function(){e.activeItem={text:"",new:!0},e.data.unshift(e.activeItem)}}]),angular.module("gccweb-admin").factory("MainAnnouncement",["$resource",function(e){return e("/mainAnnouncement",{},{})}]).factory("SmallAnnouncement",["$resource",function(e){return e("/smallAnnouncement",{},{})}]).factory("MemoryVerse",["$resource",function(e){return e("/memoryVerse",{},{})}]);