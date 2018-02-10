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
            var href = extractAttribute(anchor, "href");
            href = href.replace("Cards/Details/The-Mountains&#39;-Roots-KD", "LotR/Details/The-Mountains'-Roots-KD");
            href = href.replace("Cards/Details/The-Mountains&#39;-Peaks-TRG", "LotR/Details/The-Mountains'-Peaks-TRG");
            href = href.replace("Cards/Details/Durin&#39;s-Greaves-TLD", "LotR/Details/Durin's-Greaves-TLD");
            href = href.replace("Cards/Details/The-Water&#39;s-Edge-FoS", "LotR/Details/The-Water's-Edge-FoS");
            href = href.replace("Cards/Details/Durin&#39;s-Axe-FoS", "LotR/Details/Durin's-Axe-FoS");
            href = href.replace("Cards/Details/Durin&#39;s-Helm-FoS", "LotR/Details/Durin's-Helm-FoS");
            href = href.replace("Cards/Details/Durin&#39;s-Bane-SaF", "LotR/Details/Durin's-Bane-SaF");

            var data = {
               "title": extractAttribute(anchor, "title"),
               "href": href,
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