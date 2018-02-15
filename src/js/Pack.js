"use strict";

define(["js/JSONFileLoader"], function(JSONFileLoader)
{
   var Pack = {};
   var packData;
   var filepath = "../../data/packs.js";
   var callback = (content) =>
   {
      packData = content;
      console.log("file loader callback packData.length = " + packData.length);
   };
   JSONFileLoader.loadFile(filepath, callback);

   Pack.findByName = function(name)
   {
      var answer;

      packData.some(pack =>
      {
         answer = (pack.name === name ? pack : undefined);
         return (answer === pack);
      });

      return answer;
   };

   return Pack;
});