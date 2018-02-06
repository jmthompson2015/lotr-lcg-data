"use strict";

define(["qunit", "js/HoBSummaryFetcher"], function(QUnit, HoBSummaryFetcher)
{
   QUnit.module("HoBSummaryFetcher");

   QUnit.test("fetch()", function(assert)
   {
      // Setup.
      var file = "http://hallofbeorn.com/LotR/Browse/Khazad-dum";
      var callback = function(summaries)
      {
         // Verify.
         assert.ok(true, "test resumed from async operation");
         assert.ok(summaries);
         assert.equal(summaries.length, 76);

         var summary0 = summaries[0];
         assert.ok(summary0);
         assert.equal(summary0.title, "Dwalin");
         assert.equal(summary0.href, "/Cards/Details/Dwalin-KD");
         assert.equal(summary0.src, "https://s3.amazonaws.com/hallofbeorn-resources/Images/Cards/Khazad-dum/Dwalin.jpg");

         var summary75 = summaries[75];
         assert.ok(summary75);
         assert.equal(summary75.title, "Search for an Exit");
         assert.equal(summary75.href, "/Cards/Details/Search-for-an-Exit-Escape-from-Darkness-KD");
         assert.equal(summary75.src, "https://s3.amazonaws.com/hallofbeorn-resources/Images/Cards/Khazad-dum/Search-for-an-Exit-Escape-from-Darkness-2A.jpg");

         done();
      };

      // Run.
      var done = assert.async();
      HoBSummaryFetcher.fetch(file, callback);
   });
});