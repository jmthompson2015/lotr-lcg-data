"use strict";

define(["js/FileLoader", "js/Pack", "js/ParseUtilities"],
   function(FileLoader, Pack, ParseUtilities)
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
         content = ParseUtilities.extractInclusive(content, "<body>", "</body>");
         content = ParseUtilities.extractInclusive(content, "<section", "</section>");

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

         var statBoxData = this.processStatBox(statBoxFragment);
         var type_code = (Array.isArray(statBoxData) ? statBoxData[0].type_code : statBoxData.type_code);
         var titleBoxData = this.processTitleBox(titleBoxFragment, type_code);
         var statValueBoxData = this.processStatValueBox(statValueBoxFragment, type_code);
         var statTextBoxData = this.processStatTextBox(statTextBoxFragment, type_code);
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

      HoBDetailFetcher.processStatBox = function(fragment)
      {
         // console.log("processStatBox() fragment = " + fragment);

         var fragment1 = ParseUtilities.extractInclusive(fragment, "<div style=\"font-weight", "</div>");
         var type_name = ParseUtilities.extractContent(fragment1);
         type_name = type_name.replace("Objective-Ally", "Objective");
         type_name = type_name.replace("Objective-Location", "Objective");
         var type_code = type_name.toLowerCase();
         // console.log("type_code = " + type_code);
         // console.log("type_name = " + type_name);

         fragment1 = ParseUtilities.extractInclusive(fragment, "<a title=", "</a>");
         var encounter_set = ParseUtilities.extractAttribute(fragment1, "title");
         encounter_set = encounter_set.replace("&#39;", "'"); // '
         // console.log("encounter_set = " + encounter_set);

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

            // console.log("encounter_sets = " + encounter_sets);
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
      };

      HoBDetailFetcher.processStatTextBox = function(fragment, type_code)
      {
         // console.log("processStatTextBox() fragment = " + fragment);
         var index = fragment.indexOf("<div class=\"statTextBox\"", 1);
         var fragment0 = (index < 0 ? fragment : fragment.substring(0, index));

         var key1 = "<p class='main-text'>";
         var key2 = "<p class='shadow-text'>";
         var key3 = "<p class='flavor-text'>";
         var key4 = "<div class='victory-text'>";
         var index1 = fragment0.indexOf(key1);

         if (index1 < 0)
         {
            key1 = "<p>";
            index1 = fragment0.indexOf(key1);
         }

         var index2 = fragment0.indexOf(key2);

         if (index2 < 0)
         {
            var key2222 = "ShadowDivider.png";
            var index2222 = fragment0.indexOf(key2222);
            if (index2222 >= 0)
            {
               var key222 = "/>";
               var index222 = fragment0.indexOf(key222, index2222 + key2222.length);
               key2 = "<p>";
               index2 = index222 + key222.length;
            }
         }

         var index3 = fragment0.indexOf(key3);
         var index4 = fragment0.indexOf(key4);
         var indices = [index1, index2, index3, index4];
         indices.sort((a, b) => parseInt(a) - parseInt(b));

         // traits
         var i;
         var myIndex = fragment0.length;
         for (i = 0; i < 4; i++)
         {
            if (indices[i] >= 0)
            {
               myIndex = indices[i];
               break;
            }
         }
         var fragment2 = fragment0.substring(0, myIndex);
         var startKey = "<a";
         var endKey = "</a>";
         var index11 = fragment2.indexOf(startKey);
         var anchor, index22;
         var traits = "";

         while (index11 >= 0)
         {
            index22 = fragment2.indexOf(endKey, index11 + 1);
            anchor = fragment2.substring(index11, index22 + endKey.length);
            var trait = ParseUtilities.extractContent(anchor);
            traits += trait;
            index11 = fragment2.indexOf(startKey, index22);
         }

         if (traits.length === 0)
         {
            traits = undefined;
         }
         // console.log("traits = " + traits);

         // text
         var text, start, end;
         if (index1 >= 0)
         {
            myIndex = fragment0.length;
            for (i = 0; i < 4; i++)
            {
               if (indices[i] >= 0 && index1 < indices[i])
               {
                  myIndex = indices[i];
                  break;
               }
            }

            start = index1 + key1.length;
            end = fragment0.lastIndexOf("</p>", myIndex);
            text = fragment0.substring(start, end);

            if (text !== undefined)
            {
               text = text.trim();
               text = text.replace(/<\/p>/g, "");
               text = text.replace(/<p>/g, "<br/>");

               while (text.indexOf("<a") >= 0)
               {
                  text = ParseUtilities.removeTag(text, "a");
               }

               while (text.indexOf("<blockquote") >= 0)
               {
                  text = ParseUtilities.removeTag(text, "blockquote");
               }

               while (text.indexOf("<img") >= 0)
               {
                  text = ParseUtilities.removeImg(text);
               }

               while (text.indexOf("<span") >= 0)
               {
                  text = ParseUtilities.removeTag(text, "span");
               }
            }

            // console.log("text = " + text);
         }

         // flavor
         var flavor;
         if (index3 >= 0)
         {
            start = index3 + key3.length;
            end = fragment0.indexOf("</p>", index3 + 1);
            flavor = fragment0.substring(start, end);

            if (flavor !== undefined)
            {
               flavor = flavor.trim();
            }

            // console.log("flavor = " + flavor);
         }

         // shadow
         var shadow;
         if (index2 >= 0)
         {
            start = index2 + key2.length;
            end = fragment0.indexOf("</p>", index2 + 1);
            shadow = fragment0.substring(start, end);

            if (shadow !== undefined)
            {
               while (shadow.indexOf("<a") >= 0)
               {
                  shadow = ParseUtilities.removeTag(shadow, "a");
               }

               while (shadow.indexOf("<img") >= 0)
               {
                  shadow = ParseUtilities.removeImg(shadow);
               }
            }

            // console.log("shadow = " + shadow);
         }

         var data1;

         if (type_code === "quest")
         {
            index1 = fragment.indexOf("<div class=\"statTextBox\"", 1);
            var fragment1 = fragment.substring(index1);
            fragment1 = fragment1.replace("<p>", "<p class='main-text'>");

            data1 = this.processStatTextBox(fragment1, "enemy");
         }

         var data0 = {
            "traits": traits,
            "text": text,
            "shadow": shadow,
            "flavor": flavor,
         };

         return (type_code === "quest" ? [data0, data1] : data0);
      };

      HoBDetailFetcher.processStatValueBox = function(fragment, type_code)
      {
         // console.log("processStatValueBox() fragment = " + fragment);

         var engagement_cost, threat, willpower, attack, defense, hit_points, quest_points, quest_points1;
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
                     // console.log("quest_points1 = " + quest_points1);
                  }
                  else if (threat !== undefined)
                  {
                     quest_points = parseInt(parts[i - 2].substring(0, parts[i - 2].indexOf("<")));
                     if (Number.isNaN(quest_points))
                     {
                        quest_points = undefined;
                     }
                     // console.log("quest_points = " + quest_points);
                  }
                  else
                  {
                     engagement_cost = parseInt(parts[i - 2].substring(0, parts[i - 2].indexOf("<")));
                     if (Number.isNaN(engagement_cost))
                     {
                        engagement_cost = undefined;
                     }
                     // console.log("engagement_cost = " + engagement_cost);
                  }
               }
            }
            else if (part.indexOf("threat-med.png") >= 0)
            {
               threat = parseInt(parts[i - 1].substring(0, parts[i - 1].indexOf("<")));
               if (Number.isNaN(threat))
               {
                  threat = undefined;
               }
               // console.log("threat = " + threat);
            }
            else if (part.indexOf("willpower-med.png") >= 0)
            {
               willpower = parseInt(parts[i - 1].substring(0, parts[i - 1].indexOf("<")));
               if (Number.isNaN(willpower))
               {
                  willpower = undefined;
               }
               // console.log("willpower = " + willpower);
            }
            else if (part.indexOf("attack-med.png") >= 0)
            {
               attack = parseInt(parts[i - 1].substring(0, parts[i - 1].indexOf("<")));
               if (Number.isNaN(attack))
               {
                  attack = undefined;
               }
               // console.log("attack = " + attack);
            }
            else if (part.indexOf("defense-med.png") >= 0)
            {
               defense = parseInt(parts[i - 1].substring(0, parts[i - 1].indexOf("<")));
               if (Number.isNaN(defense))
               {
                  defense = undefined;
               }
               // console.log("defense = " + defense);
            }
            else if (part.indexOf("heart-med.png") >= 0)
            {
               hit_points = parseInt(parts[i - 1].substring(0, parts[i - 1].indexOf("<")));
               // console.log("hit_points = " + hit_points);
            }
         });

         var data0 = {
            "engagement_cost": engagement_cost,
            "threat": threat,
            "willpower": willpower,
            "attack": attack,
            "defense": defense,
            "hit_points": hit_points,
            "quest_points": quest_points,
         };

         var data1 = {
            "quest_points": quest_points1,
         };

         return (type_code === "quest" ? [data0, data1] : data0);
      };

      HoBDetailFetcher.processTitleBox = function(fragment, type_code)
      {
         // console.log("processTitleBox() fragment = " + fragment);

         var startKey = "<div";
         var endKey = "</div>";
         var index = fragment.indexOf(startKey, 1);
         index = fragment.indexOf(startKey, index + 1);
         var index2 = fragment.indexOf(endKey, index + 1);
         var fragment1 = fragment.substring(index, index2 + endKey.length);
         var name = ParseUtilities.extractContent(fragment1);
         var name1;
         if (type_code === "quest")
         {
            index = fragment.indexOf(startKey, index + 1);
            var index22 = fragment.indexOf(endKey, index + 1);
            fragment1 = fragment.substring(index, index22 + endKey.length);
            name1 = ParseUtilities.extractContent(fragment1);
            if (name1 === undefined || name1.indexOf("<") >= 0)
            {
               name1 = name;
            }

            // console.log("name1 = " + name1);
         }
         var is_unique = false;

         if (name.indexOf("unique-card.png") >= 0)
         {
            is_unique = true;
            name = name.substring(name.lastIndexOf(">") + 1);
         }

         // console.log("name = " + name);

         startKey = "<a";
         endKey = "</a>";
         index = fragment.indexOf(startKey, index2);
         index2 = fragment.indexOf(endKey, index + 1);
         fragment1 = fragment.substring(index, index2 + endKey.length);
         var pack_name = ParseUtilities.extractContent(fragment1);
         // Prefer unicode.
         pack_name = pack_name.replace("&#39;", "'"); // '
         pack_name = pack_name.replace("&#238;", "\u00ee"); // î
         pack_name = pack_name.replace("&#250;", "\u00fa"); // ú
         pack_name = pack_name.replace("&#251;", "\u00fb"); // û
         // console.log("pack_name = " + pack_name);

         var packData = Pack.findByName(pack_name);
         var pack_code = (packData !== undefined ? packData.code : undefined);

         fragment1 = ParseUtilities.extractInclusive(fragment.substring(index2), "<span", "</span>");
         var positionQuantities = ParseUtilities.extractContent(fragment1);
         var index3 = positionQuantities.indexOf(" ");
         var position = parseInt(positionQuantities.substring(1, index3));
         // console.log("position = " + position);

         var quantities = ParseUtilities.extractExclusive(positionQuantities, "(", ")");
         var quantity_easy = 0;
         var quantity = 0;
         // console.log("quantities = " + quantities);

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

         // console.log("quantity_easy = " + quantity_easy);
         // console.log("quantity = " + quantity);

         fragment1 = ParseUtilities.extractInclusive(fragment.substring(index2), "<img", "/>");
         var src = ParseUtilities.extractAttribute(fragment1, "src");
         var imageFile = src.substring(src.lastIndexOf("/") + 1);
         // console.log("imageFile = " + imageFile);

         var imageFile1;

         if (type_code === "quest")
         {
            index2 += fragment1.length;
            fragment1 = ParseUtilities.extractInclusive(fragment.substring(index2), "<img", "/>");
            src = ParseUtilities.extractAttribute(fragment1, "src");
            imageFile1 = src.substring(src.lastIndexOf("/") + 1);
            // console.log("imageFile1 = " + imageFile1);
         }

         var sequence, sequence1;

         if (type_code === "quest")
         {
            sequence = imageFile.substring(imageFile.lastIndexOf("-") + 1, imageFile.lastIndexOf("."));
            // console.log("sequence = " + sequence);
            sequence1 = imageFile1.substring(imageFile1.lastIndexOf("-") + 1, imageFile1.lastIndexOf("."));
            // console.log("sequence1 = " + sequence1);
         }

         var data0 = {
            "pack_code": pack_code,
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
            "pack_code": pack_code,
            "pack_name": pack_name,
            "position": position,
            "name": name1,
            "sequence": sequence1,
            "quantity_easy": 1,
            "quantity": 0,
            "imageFile": imageFile1,
         };

         return (type_code === "quest" ? [data0, data1] : data0);
      };

      function createDetailObject(titleBoxData, statBoxData, statTextBoxData, statValueBoxData)
      {
         var detail = {};

         maybeAddData(detail, "pack_code", titleBoxData.pack_code);
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
         maybeAddData(detail, "willpower", statValueBoxData.willpower);
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
            // console.log("image = " + image);
            detail.image = image;
         }

         return detail;
      }

      function maybeAddData(detail, key, value)
      {
         if (value !== undefined && value !== null && (key !== "is_unique" || value === true))
         {
            detail[key] = value;
         }
      }

      return HoBDetailFetcher;
   });