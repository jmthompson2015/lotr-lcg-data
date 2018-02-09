"use strict";

define(function()
{
   var ParseUtilities = {};

   ParseUtilities.extract = function(fragment, startDelimiter, endDelimiter, startInclusive, endInclusive)
   {
      var answer;

      if (fragment !== undefined && fragment !== null)
      {
         var startIndex = fragment.indexOf(startDelimiter);

         if (startIndex >= 0)
         {
            var endIndex = fragment.indexOf(endDelimiter, startIndex + startDelimiter.length);

            if (endIndex >= 0)
            {
               var start = startIndex + (startInclusive ? 0 : startDelimiter.length);
               var end = endIndex + (endInclusive ? endDelimiter.length : 0);

               answer = fragment.substring(start, end);
            }
         }
      }

      return answer;
   };

   ParseUtilities.extractAttribute = function(fragment, attributeName)
   {
      var fragment2 = fragment.replace(/'/g, "\"");
      var startDelimiter = attributeName + "=\"";
      var endDelimiter = "\"";

      return this.extract(fragment2, startDelimiter, endDelimiter, false, false);
   };

   ParseUtilities.extractContent = function(fragment)
   {
      var index = fragment.indexOf(">");
      var index2 = fragment.lastIndexOf("</");

      var answer = fragment.substring(index + 1, index2);

      if (answer.startsWith("<b><i>"))
      {
         answer = answer.substring("<b><i>".length);
      }

      if (answer.endsWith("</i></b>"))
      {
         answer = answer.substring(0, answer.length - "</i></b>".length);
      }

      return answer;
   };

   ParseUtilities.extractExclusive = function(fragment, startDelimiter, endDelimiter)
   {
      return this.extract(fragment, startDelimiter, endDelimiter, false, false);
   };

   ParseUtilities.extractInclusive = function(fragment, startDelimiter, endDelimiter)
   {
      return this.extract(fragment, startDelimiter, endDelimiter, true, true);
   };

   ParseUtilities.removeImg = function(fragment)
   {
      var answer = fragment;

      var index = fragment.indexOf("<img");

      if (index >= 0)
      {
         var fragment2 = this.extractInclusive(fragment, "<img", "/>");
         var src = this.extractAttribute(fragment2, "src");
         var content = "";

         switch (src)
         {
            case "/Images/attack-small.png":
               content = "Attack";
               break;
            case "/Images/defense-small.png":
               content = "Defense";
               break;
            case "/Images/threat-small.png":
               content = "Threat";
               break;
            case "/Images/willpower-small.png":
               content = "Willpower";
               break;
            default:
               console.warn("Unknown img fragment2 = " + fragment2);
               console.warn("Unknown img src = " + src);
         }

         answer = fragment.substring(0, index) + content + fragment.substring(index + fragment2.length);
      }

      return answer;
   };

   ParseUtilities.removeTag = function(fragment, tag)
   {
      var answer = fragment;

      var index = fragment.indexOf("<" + tag);

      if (index >= 0)
      {
         var fragment2 = this.extractInclusive(fragment, "<" + tag, "</" + tag + ">");
         var content = this.extractContent(fragment2);

         answer = fragment.substring(0, index) + content + fragment.substring(index + fragment2.length);
      }

      return answer;
   };

   return ParseUtilities;
});