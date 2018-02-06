"use strict";

define(["js/FileLoader"], function(FileLoader)
{
   var HoBDetailFetcher = {};

   HoBDetailFetcher.fetch = function(file, callback)
   {
      var receiveResponse = function(response)
      {
         HoBDetailFetcher.receiveResponse(response, callback);
      };

      FileLoader.loadFile(file, receiveResponse);
   };

   HoBDetailFetcher.receiveResponse = function(response, callback)
   {
      var content = response;

      // Advance to the main content section.
      content = extractFromTo(content, "<body>", "</body>");
      content = extractFromTo(content, "<section", "</section>");
      // console.log("section: " + content);

      var key0 = "<div class=\"titleBox\"";
      var key1 = "<div class=\"statBox\"";
      var key2 = "<div class=\"statValueBox\"";
      var key3 = "<div class=\"statTextBox\"";
      var key4 = "<div class=\"extraBox\"";

      // Process the title name box.
      var index0 = content.indexOf(key0);
      var index1 = content.indexOf(key1);
      var fragment0 = content.substring(index0, index1);
      var data0 = processTitleBox(fragment0);

      // Process the stat box.
      var index2 = content.indexOf(key2);
      var fragment1 = content.substring(index1, index2);
      var data1 = processStatBox(fragment1);

      // Process the stat value box.
      var index3 = content.indexOf(key3);
      var fragment2 = content.substring(index2, index3);
      var data2 = processStatValueBox(fragment2);

      // Process the stat text box.
      var index4 = content.indexOf(key4);
      var fragment3 = content.substring(index3, index4);
      var data3 = processStatTextBox(fragment3);

      var detail = {
         "pack_name": data0.pack_name,
         "encounter_set": data1.encounter_set,
         "type_code": data1.type_code,
         "type_name": data1.type_name,
         "position": data0.position,
         "name": data0.name,
      };

      maybeAddData(detail, "is_unique", data0.is_unique);
      maybeAddData(detail, "traits", data3.traits);
      maybeAddData(detail, "text", data3.text);
      maybeAddData(detail, "shadow", data3.shadow);
      maybeAddData(detail, "engagement_cost", data2.engagement_cost);
      maybeAddData(detail, "threat", data2.threat);
      maybeAddData(detail, "attack", data2.attack);
      maybeAddData(detail, "defense", data2.defense);
      maybeAddData(detail, "hit_points", data2.hit_points);
      maybeAddData(detail, "quest_points", data2.quest_points);
      maybeAddData(detail, "quantity_easy", data0.quantity_easy);
      maybeAddData(detail, "quantity", data0.quantity);

      if (data0.imageFile !== undefined)
      {
         var image = "encounter-card/" + data1.encounter_set.replace(/\"/g, "") + "/" + data0.imageFile;
         console.log("image = " + image);
         detail.image = quote(image);
      }

      callback(detail);
   };

   function processStatBox(fragment)
   {
      // console.log("processStatBox() fragment = " + fragment);

      var fragment1 = extractBetween(fragment, "<div style=\"font-weight", "</div>", undefined, true);
      var type_name = quote(extractContent(fragment1));
      var type_code = type_name.toLowerCase();
      console.log("type_code = " + type_code);
      console.log("type_name = " + type_name);

      fragment1 = extractBetween(fragment, "<a title=", "</a>", undefined, true);
      var encounter_set = quote(extractAttribute(fragment1, "title"));
      console.log("encounter_set = " + encounter_set);

      return (
      {
         "encounter_set": encounter_set,
         "type_code": type_code,
         "type_name": type_name,
      });
   }

   function processStatTextBox(fragment)
   {
      // console.log("processStatTextBox() fragment = " + fragment);

      var fragment2 = extractBetween(fragment, "<div", "</div>", undefined, true);
      var startKey = "<a";
      var endKey = "</a>";
      var index1 = fragment2.indexOf(startKey);
      var anchor, index2;
      var traits = "";

      while (index1 >= 0)
      {
         index2 = fragment2.indexOf(endKey, index1 + 1);
         anchor = fragment2.substring(index1, index2 + endKey.length);
         var trait = extractContent(anchor);
         // console.log("trait = " + trait);
         traits += trait;
         index1 = fragment2.indexOf(startKey, index2);
      }

      traits = quote(traits);
      console.log("traits = " + traits);

      fragment2 = extractBetween(fragment, "<p class='main-text'>", "</p>", undefined, true);
      var text = (fragment2 !== undefined ? quote(extractContent(fragment2)) : undefined);
      text = (text !== undefined ? removeAnchor(text) : undefined);
      console.log("text = " + text);

      fragment2 = extractBetween(fragment, "<p class='shadow-text'>", "</p>", undefined, true);
      var shadow = (fragment2 !== undefined ? quote(extractContent(fragment2)) : undefined);
      console.log("shadow = " + shadow);

      return (
      {
         "traits": traits,
         "text": text,
         "shadow": shadow,
      });
   }

   function processStatValueBox(fragment)
   {
      // console.log("processStatValueBox() fragment = " + fragment);

      var engagement_cost, threat, attack, defense, hit_points, quest_points;
      var parts = fragment.split(">");
      parts.forEach(function(part, i)
      {
         part = part.trim();

         if (part.indexOf(")") === 0)
         {
            if (i - 2 >= 0)
            {
               if (threat !== undefined)
               {
                  quest_points = parts[i - 2].substring(0, parts[i - 2].indexOf("<"));
                  console.log("quest_points = " + quest_points);
               }
               else
               {
                  engagement_cost = parts[i - 2].substring(0, parts[i - 2].indexOf("<"));
                  console.log("engagement_cost = " + engagement_cost);
               }
            }
         }
         else if (part.indexOf("threat-med.png") >= 0)
         {
            threat = parts[i - 1].substring(0, parts[i - 1].indexOf("<"));
            console.log("threat = " + threat);
         }
         else if (part.indexOf("attack-med.png") >= 0)
         {
            attack = parts[i - 1].substring(0, parts[i - 1].indexOf("<"));
            console.log("attack = " + attack);
         }
         else if (part.indexOf("defense-med.png") >= 0)
         {
            defense = parts[i - 1].substring(0, parts[i - 1].indexOf("<"));
            console.log("defense = " + defense);
         }
         else if (part.indexOf("heart-med.png") >= 0)
         {
            hit_points = parts[i - 1].substring(0, parts[i - 1].indexOf("<"));
            console.log("hit_points = " + hit_points);
         }
      });

      return (
      {
         "engagement_cost": engagement_cost,
         "threat": threat,
         "attack": attack,
         "defense": defense,
         "hit_points": hit_points,
         "quest_points": quest_points,
      });
   }

   function processTitleBox(fragment)
   {
      console.log("processTitleBox() fragment = " + fragment);

      var startKey = "<div";
      var endKey = "</div>";
      var index = fragment.indexOf(startKey, 1);
      index = fragment.indexOf(startKey, index + 1);
      var index2 = fragment.indexOf(endKey, index + 1);
      var fragment1 = fragment.substring(index, index2 + endKey.length);
      var name = extractContent(fragment1);
      var is_unique = false;

      if (name.indexOf("unique-card.png") >= 0)
      {
         is_unique = true;
         name = name.substring(name.lastIndexOf(">") + 1);
      }

      name = quote(name);
      console.log("name = " + name);

      startKey = "<a";
      endKey = "</a>";
      index = fragment.indexOf(startKey, index2);
      index2 = fragment.indexOf(endKey, index + 1);
      fragment1 = fragment.substring(index, index2 + endKey.length);
      var pack_name = quote(extractContent(fragment1));
      console.log("pack_name = " + pack_name);

      fragment1 = extractBetween(fragment, "<span", "</span>", index2, true);
      var positionQuantities = extractContent(fragment1);
      var index3 = positionQuantities.indexOf(" ");
      var position = positionQuantities.substring(1, index3);
      console.log("position = " + position);

      var quantities = extractBetween(positionQuantities, "(", ")");
      var quantity_easy = 0;
      var quantity = 0;

      if (quantities.indexOf("/") >= 0)
      {
         var parts = quantities.split("/");
         quantity_easy = parts[1].substring(1);
         quantity = parts[0].substring(1) - quantity_easy;
      }
      else
      {
         quantity = quantities.substring(1);
      }

      console.log("quantity_easy = " + quantity_easy);
      console.log("quantity = " + quantity);

      fragment1 = extractBetween(fragment, "<img", "/>", index2, true);
      var src = extractAttribute(fragment1, "src");
      var imageFile = src.substring(src.lastIndexOf("/") + 1);
      console.log("imageFile = " + imageFile);

      return (
      {
         "pack_name": pack_name,
         "position": position,
         "name": name,
         "is_unique": is_unique,
         "quantity_easy": quantity_easy,
         "quantity": quantity,
         "imageFile": imageFile,
      });
   }

   function extractAttribute(anchor, attributeName)
   {
      var index = anchor.indexOf(attributeName + "=\"") + attributeName.length + 2;
      var index2 = anchor.indexOf("\"", index + 1);

      return anchor.substring(index, index2);
   }

   function extractBetween(fragment, startString, endString, startIndexIn, isInclusive)
   {
      var answer;
      var startIndex = (startIndexIn !== undefined ? startIndexIn : 0);
      var index = fragment.indexOf(startString, startIndex);

      if (index >= 0)
      {
         var index2 = fragment.indexOf(endString, index + 1);

         if (index2 >= 0)
         {
            var start = (isInclusive === true ? index : index + startString.length);
            var end = (isInclusive === true ? index2 + endString.length : index2);
            answer = fragment.substring(start, end);
         }
      }

      return answer;
   }

   function extractContent(fragment)
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
   }

   function extractFromTo(fragment, startString, endString)
   {
      var answer;
      var index = fragment.indexOf(startString);

      if (index >= 0)
      {
         var index2 = fragment.lastIndexOf(endString);

         if (index2 >= 0)
         {
            answer = fragment.substring(index, index2 + endString.length);
         }
      }

      return answer;
   }

   function maybeAddData(detail, key, value)
   {
      if (value !== undefined && (key !== "is_unique" || value === true))
      {
         detail[key] = value;
      }
   }

   function quote(value)
   {
      var answer = "";

      if (value !== undefined)
      {
         answer = "\"" + value + "\"";
      }

      return answer;
   }

   function removeAnchor(text)
   {
      var answer = text;

      var index2 = text.indexOf("<a");

      if (index2 >= 0)
      {
         var anchor = extractBetween(text, "<a", "</a>", undefined, true);
         var content = extractContent(anchor);
         answer = text.substring(0, index2) + content + text.substring(index2 + anchor.length);
      }

      return answer;
   }

   return HoBDetailFetcher;
});