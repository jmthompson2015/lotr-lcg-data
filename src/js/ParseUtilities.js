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
      let answer;

      if (fragment !== undefined)
      {
         let fragment2 = fragment.replace(/'/g, "\"");
         const startDelimiter = attributeName + "=\"";
         const endDelimiter = "\"";

         answer = this.extract(fragment2, startDelimiter, endDelimiter, false, false);
      }

      return answer;
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

   ParseUtilities.parseTree = function(fragment, tag)
   {
      var startTag = "<" + tag;
      var endTag = "</" + tag + ">";
      var children = [];

      var index1 = fragment.indexOf(startTag, 1);
      var index2 = fragment.indexOf(endTag, index1);

      if (index1 >= 0 && index2 > index1)
      {
         var fragment0 = fragment.substring(index1, index2 + endTag.length).trim();
         children.push(ParseUtilities.parseTree(fragment0, tag));

         var fragment1 = fragment.substring(index2 + endTag.length).trim();
         children.push(ParseUtilities.parseTree(fragment1, tag));
      }

      return (
      {
         node: fragment,
         children: children,
      });
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
            case "/Images/Baggins.png":
               content = "Baggins";
               break;
            case "/Images/defense-small.png":
               content = "Defense";
               break;
            case "/Images/heading-cloudy.png":
               content = "Cloudy Heading";
               break;
            case "/Images/heading-rainy.png":
               content = "Rainy Heading";
               break;
            case "/Images/heading-stormy.png":
               content = "Stormy Heading";
               break;
            case "/Images/heading-sunny.png":
               content = "Sunny Heading";
               break;
            case "/Images/sailing-success.png":
               content = "Sailing Test Success";
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