"use strict";

var FileLoader = {};

FileLoader.loadFile = function(file, callback)
{
   var xhr = new XMLHttpRequest();
   xhr.onreadystatechange = function()
   {
      if (xhr.readyState === 4 /* && xhr.status === 200 */ )
      {
         callback(xhr.responseText);
      }
   };
   xhr.open('GET', file, true);
   xhr.send(null);
};

var JSONFileLoader = {};

JSONFileLoader.loadFile = function(filepath, callback)
{
   var finishCallback = function(response)
   {
      finishConvert(response, callback);
   };

   FileLoader.loadFile(filepath, finishCallback);
};

function finishConvert(response, callback)
{
   var content = JSON.parse(response);

   callback(content);
}