var myApp = angular.module("app",["ngRoute"]);

myApp.config(function($routeProvider){
        $routeProvider
        .when("/",{
            templateUrl:"src/partial/main.html",
            controller:"mainController"
        })
        .when("/setting",{
            templateUrl:"src/partial/setting.html",
            controller:"settingController"
	     })
	     .otherwise({redirectTo:'/'});
});

function download(filename, text) {
	
	 "use strict";
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);
    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}

function  upperStr(obj){  
    /// Make the first letter of the text capital letter
    "use strict";
     var firstLatter = obj[0].toUpperCase();
     return firstLatter + obj.slice(1);
}

function upperArray(array){
     /// Make the first character of each element in the array capital
    "use strict";
     var finalArray = [];
     for(var i in array){
         var firstLatter = array[i][0].toUpperCase();
         finalArray.push(firstLatter + array[i].slice(1));
     }
     return finalArray ;
}

function toUppSort(array){ 
    /* Make the first character of each element in the array capital
     and sort array */
    "use strict";
     var finalArray= upperArray(array);
     return finalArray.sort() ;
} 

var  itemsJs =  ["test 1","Test 2","Test 3"]; /// default items 
itemsJs = toUppSort(itemsJs);  /// sort and make each element of array capital    
if(store){ ///  if storeJs loaded
    var array =store.get("data");  /// get stored data
	 if(array){ /// if stored data is not empty
        itemsJs = array;
    }
}
else{
    alert("Proplem while loading store.js library please try to reload the page or open this page from another browser ");
} 

function searchInItems(txt){
        "use strict";
        var obj = document.getElementsByClassName("itemsP"),
            value=txt.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
            value = new RegExp(value.trim(),"i");
        for (var i = 0; i<obj.length; i++){
            var ma =obj[i].innerText.trim().match(value);
            if (ma != null){
                if(ma == obj[i].innerText.trim()){
                    return obj[i];   
                }
            }
        }
 }

function light(obj){  
	  /// Scroll to the element and make the background green for 1.1 sec
    "use strict";
    obj.scrollIntoView(); 
    obj.style.backgroundColor ="#97ff80";
    setTimeout(function(){
	      /// return background to white
        obj.style.backgroundColor="white";
    },1100);
}

function arrayUpt(es){ /// es must to be $scope
    /// Update the items array and store it 
    "use strict";
     itemsJs=toUppSort(itemsJs); /// Make first letter for each element of array capital and sort 
     es.items=itemsJs; /// Update items 
     if(store){ 
         store.set("data",itemsJs); /// Store items
     }
}

myApp.controller("mainController",function($scope){
    "use strict";
     $scope.items = toUppSort(itemsJs); 
     $scope.edit = function(itemTxt){ /// Edit function
         var obj = searchInItems(itemTxt), /// Found item user need to edit by item text (come from index.html )
              arrayInd= itemsJs.indexOf(itemTxt), /// Found itemsJs array index 
              userEnter = prompt("Edit Value",itemTxt);
         if(userEnter == "" || userEnter== null){} /// If user left prompt empty or click cancel
         else{ 
             itemsJs[arrayInd] = userEnter;  /// Replace old value to new value
             arrayUpt($scope); 
             setTimeout(function(){
                 var newObj = searchInItems(userEnter);
                 light(newObj);
             },100);
         }
    };
    $scope.del = function(txt){
        "use strict";
         if(confirm(" Delete : (" + txt+ ")?")){ /// Get confirm from user , txt come from index.html 
             var arrayIndexDel= itemsJs.indexOf(txt); /// Found index of item in itemsJs array
             itemsJs.splice(arrayIndexDel,1); /// Delete the item from array
             arrayUpt($scope);            
         }
     };
     $scope.add = function(){
         "use strict";
          var userAdd = prompt("Enter a text:");
          if(userAdd=="" || userAdd == null){} /// If user left the prompt empty or click cancel
          else{
	           itemsJs.push(userAdd);   /// Push user text need to add to itemsJs Array
              arrayUpt($scope);
              setTimeout(function(){
	               var newObj = searchInItems(userAdd);
                  light(newObj);
              },150);
              
          }
      };
      $scope.export = function(){  
      /// Make a txt has items each item in a line and download it 
          
          var txt = "";
          for(var i= 0;i<itemsJs.length;i++){
              txt +=itemsJs[i] + "\n";
    	    }
	
	      if(store.get("efn") == 0){
	            var name = store.get("dfn");
	      }    
		    else{
			      store.set("efn",1);
		         var name = prompt("Enter the sfile name ");
		         
			  }
			 if(name!= null && name.length !=0){
			     download(name,txt);
			 }
			 
	       
	   };
}); /// Main controll close

myApp.controller("settingController",function($scope){
	 "use strict";
	  var dfn = document.getElementById("dfnInp"),
          txtSpan =document.getElementById("txt");
     if(store.get("efn")==0){
         $scope.check0=true;       
     }                 
     else{
         $scope.check1=true;        
         dfn.disabled=true;
      }      
      if(store.get("dfn")){
	       $scope.dfn=store.get("dfn");
	   }      
      $scope.efnChange=function(){        
          if($scope.efn ==0){
              dfn.disabled=false; 
              
           }
           else{
                dfn.disabled=true;         
                store.set("efn",1);
            }       
    };    
    dfn.addEventListener("keyup",function(){
        if($scope.dfn != undefined && $scope.dfn.length != 0 ){            
            store.set("efn",0);
            store.set("dfn",$scope.dfn);
           
        }    
        else{
           
       
	     }
     });
     
 });   

window.onload=function(){
    /// Hide loading 
    var loadDiv = document.getElementById("loadDiv");
          
    setTimeout(function(){
        $("#loadDiv").fadeOut(200);
    },500);
  
    /// Nice scroll 
   $("#mainDiv").niceScroll({
       cursorcolor:"#DD0031",
       cursorwidth:"5px"
   });


};