"use strict";

define(["js/HoBSummaryFetcher"],

   function(HoBSummaryFetcher)
   {
      function HoBImageFetcher(summaryFile, startIndexIn, limitIn)
      {
         this.summaryFile = () => summaryFile;

         var startIndex = (startIndexIn !== undefined ? startIndexIn : 0);

         this.startIndex = () => startIndex;

         var limit = (limitIn !== undefined ? limitIn : 1000);

         this.limit = () => limit;

         var summaryIndex = startIndex;

         this.summaryIndex = () => summaryIndex;

         this.incrementSummaryIndex = () =>
         {
            summaryIndex++;
         };

         var summaries;

         this.summaries = (summariesIn) =>
         {
            if (summariesIn !== undefined)
            {
               summaries = summariesIn;
            }

            return summaries;
         };

         var loadedImages = [];

         this.loadedImages = () => loadedImages;
      }

      HoBImageFetcher.prototype.fetch = function(summaryCallback, detailCallback)
      {
         var mySummaryCallback = this.mySummaryCallback.bind(this);
         var callback = function(summariesIn)
         {
            mySummaryCallback(summaryCallback, detailCallback, summariesIn);
         };

         HoBSummaryFetcher.fetch(this.summaryFile(), callback);
      };

      HoBImageFetcher.prototype.mySummaryCallback = function(summaryCallback, detailCallback, summariesIn)
      {
         var summaries = this.summaries(summariesIn);
         summaryCallback(summaries);

         this.fetchDetails(detailCallback);
      };

      HoBImageFetcher.prototype.myDetailCallback = function(detailCallback, detailIn)
      {
         var loadedImages = this.loadedImages();
         loadedImages.push(detailIn);

         detailCallback(loadedImages);

         this.fetchDetails(detailCallback);
      };

      HoBImageFetcher.prototype.fetchDetails = function(detailCallback)
      {
         var summaryIndex = this.summaryIndex();
         var summaries = this.summaries();
         var startIndex = this.startIndex();
         var limit = this.limit();

         if (summaryIndex < summaries.length && summaryIndex < startIndex + limit)
         {
            var src = summaries[summaryIndex].src;
            var file = src.replace("&#39;", "'");
            console.log(summaryIndex + " Downloading image for " + file);
            this.incrementSummaryIndex();
            var myDetailCallback = this.myDetailCallback.bind(this);
            var callback = function(detailIn)
            {
               myDetailCallback(detailCallback, detailIn);
            };

            saveFile(file, callback);
         }
      };

      HoBImageFetcher.TYPES = ["enemy", "location", "objective", "quest", "treachery"];

      // Download a file from a url.
      // see https://ausdemmaschinenraum.wordpress.com/2012/12/06/how-to-save-a-file-from-a-url-with-javascript/
      function saveFile(url, callback)
      {
         // Get file name from url.
         var filename = url.substring(url.lastIndexOf("/") + 1).split("?")[0];
         var xhr = new XMLHttpRequest();
         xhr.responseType = 'blob';
         xhr.onload = function()
         {
            var a = document.createElement('a');
            a.href = window.URL.createObjectURL(xhr.response); // xhr.response is a blob
            a.download = filename; // Set the file name.
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            // delete a;
            callback(url);
         };
         xhr.open('GET', url);
         xhr.send();
      }

      return HoBImageFetcher;
   });