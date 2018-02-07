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

      var index0 = content.indexOf(key0);
      var index1 = content.indexOf(key1);
      var titleBoxFragment = content.substring(index0, index1);

      var index2 = content.indexOf(key2);
      var statBoxFragment = content.substring(index1, index2);

      var index3 = content.indexOf(key3);
      var statValueBoxFragment = content.substring(index2, index3);

      var index4 = content.indexOf(key4);
      var statTextBoxFragment = content.substring(index3, index4);

      var statBoxData = processStatBox(statBoxFragment);
      var type_code = (Array.isArray(statBoxData) ? statBoxData[0].type_code : statBoxData.type_code);
      var titleBoxData = processTitleBox(titleBoxFragment, type_code);
      var statValueBoxData = processStatValueBox(statValueBoxFragment, type_code);
      var statTextBoxData = processStatTextBox(statTextBoxFragment, type_code);
      var detail;

      if (type_code === "quest")
      {
         var details = [];

         for (var i = 0; i < 2; i++)
         {
            detail = createDetailObject(titleBoxData[i], statBoxData[i], statTextBoxData[i], statValueBoxData[i]);
            details.push(detail);
         }

         callback(details);
      }
      else
      {
         detail = createDetailObject(titleBoxData, statBoxData, statTextBoxData, statValueBoxData);
         callback(detail);
      }
   };

   function processStatBox(fragment)
   {
      // console.log("processStatBox() fragment = " + fragment);

      var fragment1 = extractBetween(fragment, "<div style=\"font-weight", "</div>", undefined, true);
      var type_name = extractContent(fragment1);
      var type_code = type_name.toLowerCase();
      console.log("type_code = " + type_code);
      console.log("type_name = " + type_name);

      fragment1 = extractBetween(fragment, "<a title=", "</a>", undefined, true);
      var encounter_set = extractAttribute(fragment1, "title");
      console.log("encounter_set = " + encounter_set);

      var encounter_sets;
      if (type_code === "quest")
      {
         var parts = fragment.split("<a title=\"");
         encounter_sets = [];

         for (var i = 2; i < parts.length; i++)
         {
            var part = parts[i];
            encounter_sets.push(part.substring(0, part.indexOf("\"")));
         }

         console.log("encounter_sets = " + encounter_sets);
      }

      var data0 = {
         "encounter_set": encounter_set,
         "type_code": type_code,
         "type_name": type_name,
         "encounter_sets": encounter_sets,
      };

      var data1 = {
         "encounter_set": encounter_set,
         "type_code": type_code,
         "type_name": type_name,
         "encounter_sets": encounter_sets,
      };

      return (type_code === "quest" ? [data0, data1] : data0);
   }

   function processStatTextBox(fragment, type_code)
   {
      // console.log("processStatTextBox() fragment = " + fragment);

      var key1 = "<p class='main-text'>";
      var key2 = "<p class='shadow-text'>";
      var key3 = "<p class='flavor-text'>";
      var key4 = "<div class='victory-text'>";
      var index1 = fragment.indexOf(key1);

      if (index1 < 0)
      {
         index1 = fragment.indexOf(key2);
      }

      var fragment2 = fragment.substring(0, index1);
      var startKey = "<a";
      var endKey = "</a>";
      index1 = fragment2.indexOf(startKey);
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

      if (traits.length === 0)
      {
         traits = undefined;
      }
      console.log("traits = " + traits);

      fragment2 = extractBetween(fragment, key1, key2, undefined, true);
      if (fragment2 === undefined || fragment2.length === 0)
      {
         fragment2 = extractBetween(fragment, key1, key3, undefined, true);
      }
      if (fragment2 === undefined || fragment2.length === 0)
      {
         fragment2 = extractBetween(fragment, key1, key4, undefined, true);
      }
      if (fragment2 === undefined || fragment2.length === 0)
      {
         fragment2 = extractBetween(fragment, key1, "</div>", undefined, true);
      }

      var text = (fragment2 !== undefined ? extractContent(fragment2) : undefined);
      text = text.replace(/<\/p>/g, "");
      text = text.replace(/<p>/g, "<br/>");

      while (text !== undefined && text.indexOf("<a") >= 0)
      {
         text = (text !== undefined ? removeAnchor(text) : undefined);
      }

      if (text !== undefined)
      {
         text = text.trim();
      }
      console.log("text = " + text);

      fragment2 = extractBetween(fragment, key3, "</p>", undefined, true);
      if (fragment2 === undefined || fragment2.length === 0)
      {
         fragment2 = extractBetween(fragment, key3, key4, undefined, true);
      }
      if (fragment2 === undefined || fragment2.length === 0)
      {
         fragment2 = extractBetween(fragment, key3, "</div>", undefined, true);
      }
      var flavor = (fragment2 !== undefined ? extractContent(fragment2) : undefined);
      if (flavor !== undefined)
      {
         flavor = flavor.trim();
         if (flavor.endsWith("</p>"))
         {
            flavor = flavor.substring(0, flavor.length - "</p>".length);
         }
      }
      console.log("flavor = " + flavor);

      fragment2 = extractBetween(fragment, key2, "</p>", undefined, true);
      var shadow = (fragment2 !== undefined ? extractContent(fragment2) : undefined);
      console.log("shadow = " + shadow);

      var data1;

      if (type_code === "quest")
      {
         index1 = fragment.indexOf("<div class=\"statTextBox\"", 1);
         var fragment1 = fragment.substring(index1);
         fragment1 = fragment1.replace("<p>", "<p class='main-text'>");

         data1 = processStatTextBox(fragment1, "enemy");
      }

      var data0 = {
         "traits": traits,
         "text": text,
         "shadow": shadow,
         "flavor": flavor,
      };

      return (type_code === "quest" ? [data0, data1] : data0);
   }

   function processStatValueBox(fragment, type_code)
   {
      // console.log("processStatValueBox() fragment = " + fragment);

      var engagement_cost, threat, attack, defense, hit_points, quest_points, quest_points1;
      var parts = fragment.split(">");
      parts.forEach(function(part, i)
      {
         part = part.trim();

         if (part.indexOf(")") === 0)
         {
            if (i - 2 >= 0)
            {
               if (type_code === "quest")
               {
                  quest_points1 = parseInt(parts[i - 2].substring(0, parts[i - 2].indexOf("<")));
                  if (Number.isNaN(quest_points1))
                  {
                     quest_points1 = undefined;
                  }
                  console.log("quest_points1 = " + quest_points1);
               }
               else if (threat !== undefined)
               {
                  quest_points = parseInt(parts[i - 2].substring(0, parts[i - 2].indexOf("<")));
                  if (Number.isNaN(quest_points))
                  {
                     quest_points = undefined;
                  }
                  console.log("quest_points = " + quest_points);
               }
               else
               {
                  engagement_cost = parseInt(parts[i - 2].substring(0, parts[i - 2].indexOf("<")));
                  if (Number.isNaN(engagement_cost))
                  {
                     engagement_cost = undefined;
                  }
                  console.log("engagement_cost = " + engagement_cost);
               }
            }
         }
         else if (part.indexOf("threat-med.png") >= 0)
         {
            threat = parseInt(parts[i - 1].substring(0, parts[i - 1].indexOf("<")));
            console.log("threat = " + threat);
         }
         else if (part.indexOf("attack-med.png") >= 0)
         {
            attack = parseInt(parts[i - 1].substring(0, parts[i - 1].indexOf("<")));
            console.log("attack = " + attack);
         }
         else if (part.indexOf("defense-med.png") >= 0)
         {
            defense = parseInt(parts[i - 1].substring(0, parts[i - 1].indexOf("<")));
            console.log("defense = " + defense);
         }
         else if (part.indexOf("heart-med.png") >= 0)
         {
            hit_points = parseInt(parts[i - 1].substring(0, parts[i - 1].indexOf("<")));
            console.log("hit_points = " + hit_points);
         }
      });

      var data0 = {
         "engagement_cost": engagement_cost,
         "threat": threat,
         "attack": attack,
         "defense": defense,
         "hit_points": hit_points,
         "quest_points": quest_points,
      };

      var data1 = {
         "quest_points": quest_points1,
      };

      return (type_code === "quest" ? [data0, data1] : data0);
   }

   function processTitleBox(fragment, type_code)
   {
      // console.log("processTitleBox() fragment = " + fragment);

      var startKey = "<div";
      var endKey = "</div>";
      var index = fragment.indexOf(startKey, 1);
      index = fragment.indexOf(startKey, index + 1);
      var index2 = fragment.indexOf(endKey, index + 1);
      var fragment1 = fragment.substring(index, index2 + endKey.length);
      var name = extractContent(fragment1);
      var name1;
      if (type_code === "quest")
      {
         index = fragment.indexOf(startKey, index + 1);
         var index22 = fragment.indexOf(endKey, index + 1);
         fragment1 = fragment.substring(index, index22 + endKey.length);
         name1 = extractContent(fragment1);
         if (name1 === undefined || name1.indexOf("<") >= 0)
         {
            name1 = name;
         }

         console.log("name1 = " + name1);
      }
      var is_unique = false;

      if (name.indexOf("unique-card.png") >= 0)
      {
         is_unique = true;
         name = name.substring(name.lastIndexOf(">") + 1);
      }

      console.log("name = " + name);

      startKey = "<a";
      endKey = "</a>";
      index = fragment.indexOf(startKey, index2);
      index2 = fragment.indexOf(endKey, index + 1);
      fragment1 = fragment.substring(index, index2 + endKey.length);
      var pack_name = extractContent(fragment1);
      console.log("pack_name = " + pack_name);

      fragment1 = extractBetween(fragment, "<span", "</span>", index2, true);
      var positionQuantities = extractContent(fragment1);
      var index3 = positionQuantities.indexOf(" ");
      var position = parseInt(positionQuantities.substring(1, index3));
      console.log("position = " + position);

      var quantities = extractBetween(positionQuantities, "(", ")");
      var quantity_easy = 0;
      var quantity = 0;
      console.log("quantities = " + quantities);

      if (quantities.indexOf("/") >= 0)
      {
         var parts = quantities.split("/");
         quantity_easy = parseInt(parts[1].substring(1));
         quantity = parseInt(parts[0].substring(1)) - quantity_easy;
      }
      else
      {
         quantity_easy = parseInt(quantities.substring(1));
      }

      console.log("quantity_easy = " + quantity_easy);
      console.log("quantity = " + quantity);

      fragment1 = extractBetween(fragment, "<img", "/>", index2, true);
      var src = extractAttribute(fragment1, "src");
      var imageFile = src.substring(src.lastIndexOf("/") + 1);
      console.log("imageFile = " + imageFile);

      var imageFile1;

      if (type_code === "quest")
      {
         index2 += fragment1.length;
         fragment1 = extractBetween(fragment, "<img", "/>", index2, true);
         src = extractAttribute(fragment1, "src");
         imageFile1 = src.substring(src.lastIndexOf("/") + 1);
         console.log("imageFile1 = " + imageFile1);
      }

      var sequence, sequence1;

      if (type_code === "quest")
      {
         sequence = imageFile.substring(imageFile.lastIndexOf("-") + 1, imageFile.lastIndexOf("."));
         console.log("sequence = " + sequence);
         sequence1 = imageFile1.substring(imageFile1.lastIndexOf("-") + 1, imageFile1.lastIndexOf("."));
         console.log("sequence1 = " + sequence1);
      }

      var data0 = {
         "pack_name": pack_name,
         "position": position,
         "name": name,
         "is_unique": is_unique,
         "sequence": sequence,
         "quantity_easy": quantity_easy,
         "quantity": quantity,
         "imageFile": imageFile,
      };

      var data1 = {
         "pack_name": pack_name,
         "position": position,
         "name": name1,
         "sequence": sequence1,
         "quantity_easy": 1,
         "quantity": 0,
         "imageFile": imageFile1,
      };

      return (type_code === "quest" ? [data0, data1] : data0);
   }

   function createDetailObject(titleBoxData, statBoxData, statTextBoxData, statValueBoxData)
   {
      var detail = {};

      maybeAddData(detail, "pack_name", titleBoxData.pack_name);
      maybeAddData(detail, "encounter_set", statBoxData.encounter_set);
      maybeAddData(detail, "type_code", statBoxData.type_code);
      maybeAddData(detail, "type_name", statBoxData.type_name);
      maybeAddData(detail, "position", titleBoxData.position);
      maybeAddData(detail, "name", titleBoxData.name);
      maybeAddData(detail, "is_unique", titleBoxData.is_unique);
      maybeAddData(detail, "sequence", titleBoxData.sequence);
      maybeAddData(detail, "traits", statTextBoxData.traits);
      maybeAddData(detail, "text", statTextBoxData.text);
      maybeAddData(detail, "shadow", statTextBoxData.shadow);
      maybeAddData(detail, "flavor", statTextBoxData.flavor);
      maybeAddData(detail, "engagement_cost", statValueBoxData.engagement_cost);
      maybeAddData(detail, "threat", statValueBoxData.threat);
      maybeAddData(detail, "attack", statValueBoxData.attack);
      maybeAddData(detail, "defense", statValueBoxData.defense);
      maybeAddData(detail, "hit_points", statValueBoxData.hit_points);
      maybeAddData(detail, "quest_points", statValueBoxData.quest_points);
      maybeAddData(detail, "encounter_sets", statBoxData.encounter_sets);
      maybeAddData(detail, "quantity_easy", titleBoxData.quantity_easy);
      maybeAddData(detail, "quantity", titleBoxData.quantity);

      if (titleBoxData.imageFile !== undefined)
      {
         var type_code = statBoxData.type_code;
         var prefix = (type_code === "quest" ? "quest-card/" : "encounter-card/");
         var image = prefix + statBoxData.encounter_set + "/" + titleBoxData.imageFile;
         console.log("image = " + image);
         detail.image = image;
      }

      return detail;
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