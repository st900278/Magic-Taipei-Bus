$(document).ready(function{
	var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB;
	var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || { READ_WRITE: 'readwrite' } ;

	var bus = {};
	bus.indexedDB = {};
	bus.indexedDB.openDB = function(){
		var request = indexedDB.open('BusDB',1);
		request.onerror = function(event){
			console.log("Something Wrong");
		}
		requeset.onsuccess = function(event){
			bus.indexedDB.db = request.result;
		}
		request.onupgradeneeded = function(event){
			var dataStore = event.currentTarget.result.createObjectStore("favorPath",{keyPath : "PathName"});
			dataStore.createIndex("PathName", "PathName", { unique: false });
		}
	}
	bus.indexedDB.listPath = function(){
		var trans = favoriteDB.db.transaction(['Path'], 'readwrite');
		var store = trans.objectStore("favorPath");
		var crequest = store.openCursor() ;
		crequest.onsuccess = function (event) {
				var cursor = event.target.result;
				if (cursor) {                        
					// cursor.key  ,  cursor.value
					var getreq = store.get(cursor.key);

					getreq.onsuccess = function(event){
						for (var x in getreq.result.bus){
							console.log('key:', cursor.key, 'value:', getreq.result.bus[x]);
						}
						// OK, now move the cursor to the next item. 
						cursor.continue();
					}
				}                    
		};     
	}
	bus.indexedDB.addPath = function(key, value){
		var trans = favoriteDB.db.transaction(['Path'], 'readwrite');
		var store = trans.objectStore("favorPath");
		var req_put = store.put(bus_list[i]);
		req_put.onsuccess = function(event){
			console.log("success");
		}
	}
	bus.indexedDB.modifyPath
});
