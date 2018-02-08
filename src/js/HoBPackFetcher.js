"use strict";

define(["js/HoBDetailFetcher", "js/HoBSummaryFetcher"],

   function(HoBDetailFetcher, HoBSummaryFetcher)
   {
      function HoBPackFetcher(summaryFile, startIndexIn, limitIn)
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

         var typeDetailMap = {};
         HoBPackFetcher.TYPES.forEach((type) =>
         {
            typeDetailMap[type] = [];
         });

         this.typeDetailMap = () => typeDetailMap;
      }

      HoBPackFetcher.prototype.fetch = function(summaryCallback, detailCallback)
      {
         var mySummaryCallback = this.mySummaryCallback.bind(this);
         var callback = function(summariesIn)
         {
            mySummaryCallback(summaryCallback, detailCallback, summariesIn);
         };

         HoBSummaryFetcher.fetch(this.summaryFile(), callback);
      };

      HoBPackFetcher.prototype.mySummaryCallback = function(summaryCallback, detailCallback, summariesIn)
      {
         var summaries = this.summaries(summariesIn);
         summaryCallback(summaries);

         this.fetchDetails(detailCallback);
      };

      HoBPackFetcher.prototype.myDetailCallback = function(detailCallback, detailIn)
      {
         var typeDetailMap = this.typeDetailMap();

         if (Array.isArray(detailIn))
         {
            typeDetailMap[detailIn[0].type_code].push(detailIn[0]);
            typeDetailMap[detailIn[1].type_code].push(detailIn[1]);
         }
         else
         {
            typeDetailMap[detailIn.type_code].push(detailIn);
         }

         detailCallback(typeDetailMap);

         this.fetchDetails(detailCallback);
      };

      HoBPackFetcher.prototype.fetchDetails = function(detailCallback)
      {
         var summaryIndex = this.summaryIndex();
         var summaries = this.summaries();
         var startIndex = this.startIndex();
         var limit = this.limit();

         if (summaryIndex < summaries.length && summaryIndex < startIndex + limit)
         {
            var href = summaries[summaryIndex].href;
            var file = "http://hallofbeorn.com" + href;
            console.log(summaryIndex + " Fetching details for " + file);
            this.incrementSummaryIndex();
            var myDetailCallback = this.myDetailCallback.bind(this);
            var callback = function(detailIn)
            {
               myDetailCallback(detailCallback, detailIn);
            };

            HoBDetailFetcher.fetch(file, callback);
         }
         else
         {
            var typeDetailMap = this.typeDetailMap();
            HoBPackFetcher.TYPES.forEach((type) =>
            {
               console.log(type + "\n" + JSON.stringify(typeDetailMap[type], null, 4));
            });
         }
      };

      HoBPackFetcher.TYPES = ["enemy", "location", "objective", "quest", "treachery"];

      return HoBPackFetcher;
   });