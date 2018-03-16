"use strict";

define(function()
{
   var SpecialCharacterConverter = {};

   SpecialCharacterConverter.htmlToUnicode = function(text)
   {
      let answer = text;

      if (text !== undefined)
      {
         answer = answer.replace(/&#39;/g, "'"); // apostrophe

         answer = answer.replace(/&#193;/g, "\u00C1"); // Á
         answer = answer.replace(/&#194;/g, "\u00C2"); // Â
         answer = answer.replace(/&#196;/g, "\u00C4"); // Ä
         answer = answer.replace(/&#201;/g, "\u00C9"); // É
         answer = answer.replace(/&#202;/g, "\u00CA"); // Ê
         answer = answer.replace(/&#203;/g, "\u00CB"); // Ë
         answer = answer.replace(/&#205;/g, "\u00CD"); // Í
         answer = answer.replace(/&#206;/g, "\u00CE"); // Î
         answer = answer.replace(/&#207;/g, "\u00CF"); // Ï
         answer = answer.replace(/&#211;/g, "\u00D3"); // Ó
         answer = answer.replace(/&#212;/g, "\u00D4"); // Ô
         answer = answer.replace(/&#214;/g, "\u00D6"); // Ö
         answer = answer.replace(/&#218;/g, "\u00DA"); // Ú
         answer = answer.replace(/&#219;/g, "\u00DB"); // Û
         answer = answer.replace(/&#220;/g, "\u00DC"); // Ü

         answer = answer.replace(/&#225;/g, "\u00E1"); // á
         answer = answer.replace(/&#226;/g, "\u00E2"); // â
         answer = answer.replace(/&#228;/g, "\u00E4"); // ä
         answer = answer.replace(/&#233;/g, "\u00E9"); // é
         answer = answer.replace(/&#234;/g, "\u00EA"); // ê
         answer = answer.replace(/&#235;/g, "\u00EB"); // ë
         answer = answer.replace(/&#237;/g, "\u00ED"); // í
         answer = answer.replace(/&#238;/g, "\u00EE"); // î
         answer = answer.replace(/&#239;/g, "\u00EF"); // ï
         answer = answer.replace(/&#243;/g, "\u00F3"); // ó
         answer = answer.replace(/&#244;/g, "\u00F4"); // ô
         answer = answer.replace(/&#246;/g, "\u00F6"); // ö
         answer = answer.replace(/&#250;/g, "\u00FA"); // ú
         answer = answer.replace(/&#251;/g, "\u00FB"); // û
         answer = answer.replace(/&#252;/g, "\u00FC"); // ü
      }

      return answer;
   };

   return SpecialCharacterConverter;
});