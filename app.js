$(document).ready(function(){
	var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB;
	var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || { READ_WRITE: 'readwrite' } ;

	var bus = {};
	bus.indexedDB = {};
	bus.indexedDB.openDB = function(){
		var request = indexedDB.open('BusDB',1);
		request.onerror = function(event){
			console.log("Creating DB error");
		}
		request.onsuccess = function(event){
			bus.indexedDB.db = request.result;
			console.log("Creating DB complete");
			bus.indexedDB.listPath();
		}
		request.onupgradeneeded = function(event){
			var dataStore = event.currentTarget.result.createObjectStore("favorPath",{keyPath : "PathName"});
			// PathName, BusList
			dataStore.createIndex("PathName", "PathName", { unique: false });
		}
	}
	bus.indexedDB.listPath = function(){
		var trans = bus.indexedDB.db.transaction(['favorPath'], 'readwrite');
		var store = trans.objectStore("favorPath");
		var crequest = store.openCursor() ;
		crequest.onsuccess = function (event) {
			console.log("cursor complete");
			var cursor = event.target.result;
			if (cursor) {                        
				// cursor.key  ,  cursor.value
				var getreq = store.get(cursor.key);
					getreq.onsuccess = function(event){
					for (var x in getreq.result.BusList){
						console.log('key:', cursor.key, 'value:', getreq.result.BusList[x]);
					}
					cursor.continue();
				}
			}                    
		};
		crequest.onerror = function(event){
			console.log("cursor error");
		}
	}
	bus.indexedDB.addPath = function(key){
		var trans = bus.indexedDB.db.transaction(['favorPath'], 'readwrite');
		var store = trans.objectStore("favorPath");
		var req = store.add({PathName:key,BusList:[]});
		req.onsuccess = function(event){
			console.log("Adding Path success");
		}
		req.onerror = function(event){
			console.log("Adding Path error");
		}
	}
	bus.indexedDB.modifyPath = function(key, value){
		var trans = bus.indexedDB.db.transaction(['favorPath'], 'readwrite');
		var store = trans.objectStore("favorPath");
		var req = store.get(key);
		req.onsuccess = function(event){
			console.log("fetch complete");
			var list = req.result.BusList;
			console.log(list);
			list.push(value);
			var req_update = store.put({ PathName:key, BusList:list});
			req_update.onsuccess = function(event){
				console.log("update complete");
			}
			req_update.onerror = function(event){
				console.log("update error");
			}
		}
		req.onerror = function(){
			console.log("can't fetch");
		}
	}
	
	bus.indexedDB.reset = function(){
		indexedDB.deleteDatabase('BusDB');
		console.log("delete BusDB");
	}
	
	
	bus.indexedDB.test = function(){
		console.log("fewfe");
	}
	
	//bus.indexedDB.test();
	//bus.indexedDB.openDB();
	//bus.indexedDB.addPath("go");
	//bus.indexedDB.modifyPath("go","629");
	//bus.indexedDB.listPath();
	//bus.indexedDB.reset();
});









