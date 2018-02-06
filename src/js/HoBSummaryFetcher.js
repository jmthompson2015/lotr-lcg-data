"use strict";

define(["js/FileLoader"], function(FileLoader)
{
   var HoBSummaryFetcher = {};

   HoBSummaryFetcher.fetch = function(file, callback)
   {
      var receiveResponse = function(response)
      {
         HoBSummaryFetcher.receiveResponse(response, callback);
      };

      FileLoader.loadFile(file, receiveResponse);
   };

   HoBSummaryFetcher.receiveResponse = function(response, callback)
   {
      // console.log(response);

      var summaries = [];
      var startKey = "<a title=";
      var endKey = "</a>";
      var content = response;

      var index = content.indexOf("<section");
      index = content.indexOf(startKey, index);

      while (index >= 0)
      {
         var index2 = content.indexOf(endKey, index + 1);
         var anchor = content.substring(index + 3, index2);

         if (anchor.indexOf("title=") >= 0 && anchor.indexOf("href=") >= 0 && anchor.indexOf("src=") >= 0)
         {
            var data = {
               "title": extractAttribute(anchor, "title"),
               "href": extractAttribute(anchor, "href"),
               "src": extractAttribute(anchor, "src")
            };
            summaries.push(data);
         }

         index = content.indexOf(startKey, index2 + 1);
      }

      console.log("summaries.length = " + summaries.length);

      callback(summaries);
   };

   function extractAttribute(anchor, attributeName)
   {
      var index = anchor.indexOf(attributeName + "=\"") + attributeName.length + 2;
      var index2 = anchor.indexOf("\"", index + 1);

      return anchor.substring(index, index2);
   }

   return HoBSummaryFetcher;
});