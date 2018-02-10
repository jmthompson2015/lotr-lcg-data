"use strict";

define(["qunit", "js/HoBDetailFetcher"], function(QUnit, HoBDetailFetcher)
{
   QUnit.module("HoBDetailFetcher");

   QUnit.test("fetch() Enemy Patrol Leader", function(assert)
   {
      // Setup.
      var file = "http://hallofbeorn.com/Cards/Details/Patrol-Leader-KD";
      var callback = function(detail)
      {
         // Verify.
         assert.ok(true, "test resumed from async operation");
         assert.ok(detail);
         // console.log("Enemy detail: " + JSON.stringify(detail));

         assert.equal(detail.pack_name, "Khazad-d&#251;m", "pack_name");
         assert.equal(detail.encounter_set, "Into the Pit", "encounter_set");
         assert.equal(detail.type_code, "enemy", "type_code");
         assert.equal(detail.type_name, "Enemy", "type_name");
         assert.equal(detail.position, 14, "position");
         assert.equal(detail.name, "Patrol Leader", "name");
         assert.equal(detail.is_unique, undefined, "is_unique");
         assert.equal(detail.sequence, undefined, "sequence");
         assert.equal(detail.traits, "Goblin. Orc.", "traits");
         assert.equal(detail.text, "<b>Forced:</b> Before Patrol Leader is dealt damage, discard the top card of the encounter deck. If the discarded card is an enemy, cancel that damage.", "text");
         assert.equal(detail.shadow, "<b>Shadow:</b> Cancel all damage dealt to this enemy.", "shadow");
         assert.equal(detail.flavor, undefined, "flavor");
         assert.equal(detail.engagement_cost, 30, "engagement_cost");
         assert.equal(detail.threat, 3, "threat");
         assert.equal(detail.attack, 4, "attack");
         assert.equal(detail.defense, 3, "defense");
         assert.equal(detail.hit_points, 4, "hit_points");
         assert.equal(detail.quest_points, undefined, "quest_points");
         assert.equal(detail.victory, undefined, "victory");
         assert.equal(detail.encounter_sets, undefined, "encounter_sets");
         assert.equal(detail.quantity_easy, 1, "quantity_easy");
         assert.equal(detail.quantity, 1, "quantity");
         assert.equal(detail.image, "encounter-card/Into the Pit/Patrol-Leader.jpg", "image");

         done();
      };

      // Run.
      var done = assert.async();
      HoBDetailFetcher.fetch(file, callback);
   });

   QUnit.test("fetch() Enemy The Nameless Fear", function(assert)
   {
      // Setup.
      var file = "http://hallofbeorn.com/LotR/Details/The-Nameless-Fear-KD";
      var callback = function(detail)
      {
         // Verify.
         assert.ok(true, "test resumed from async operation");
         assert.ok(detail);
         // console.log("Enemy detail: " + JSON.stringify(detail));

         assert.equal(detail.pack_name, "Khazad-d&#251;m", "pack_name");
         assert.equal(detail.encounter_set, "Flight from Moria", "encounter_set");
         assert.equal(detail.type_code, "enemy", "type_code");
         assert.equal(detail.type_name, "Enemy", "type_name");
         assert.equal(detail.position, 25, "position");
         assert.equal(detail.name, "The Nameless Fear", "name");
         assert.equal(detail.is_unique, true, "is_unique");
         assert.equal(detail.sequence, undefined, "sequence");
         assert.equal(detail.traits, "Flame. Shadow.", "traits");
         assert.equal(detail.text, "Immune to player card effects.<br/>The Nameless Fear cannot engage or be engaged.<br/>X is the number of victory points in the victory display.", "text");
         assert.equal(detail.shadow, undefined, "shadow");
         assert.equal(detail.flavor, undefined, "flavor");
         assert.equal(detail.engagement_cost, 50, "engagement_cost");
         assert.equal(detail.threat, undefined, "threat");
         assert.equal(detail.attack, undefined, "attack");
         assert.equal(detail.defense, undefined, "defense");
         assert.equal(detail.hit_points, 27, "hit_points");
         assert.equal(detail.quest_points, undefined, "quest_points");
         assert.equal(detail.victory, undefined, "victory");
         assert.equal(detail.encounter_sets, undefined, "encounter_sets");
         assert.equal(detail.quantity_easy, 1, "quantity_easy");
         assert.equal(detail.quantity, 0, "quantity");
         assert.equal(detail.image, "encounter-card/Flight from Moria/The-Nameless-Fear.jpg", "image");

         done();
      };

      // Run.
      var done = assert.async();
      HoBDetailFetcher.fetch(file, callback);
   });

   QUnit.test("fetch() Location East-gate", function(assert)
   {
      // Setup.
      var file = "http://hallofbeorn.com/LotR/Details/East-gate-KD";
      var callback = function(detail)
      {
         // Verify.
         assert.ok(true, "test resumed from async operation");
         assert.ok(detail);
         // console.log("Location detail: " + JSON.stringify(detail));

         assert.equal(detail.pack_name, "Khazad-d&#251;m", "pack_name");
         assert.equal(detail.encounter_set, "Into the Pit", "encounter_set");
         assert.equal(detail.type_code, "location", "type_code");
         assert.equal(detail.type_name, "Location", "type_name");
         assert.equal(detail.position, 16, "position");
         assert.equal(detail.name, "East-gate", "name");
         assert.equal(detail.is_unique, true, "is_unique");
         assert.equal(detail.sequence, undefined, "sequence");
         assert.equal(detail.traits, "Gate.", "traits");
         assert.equal(detail.text, "Immune to card effects.<br/>Players cannot optionally engage enemies and no engagement checks are made.<br/><b>Forced:</b> After East-gate leaves play as an explored location, add First Hall to the staging area.", "text");
         assert.equal(detail.shadow, undefined, "shadow");
         assert.equal(detail.flavor, undefined, "flavor");
         assert.equal(detail.engagement_cost, undefined, "engagement_cost");
         assert.equal(detail.threat, 7, "threat");
         assert.equal(detail.attack, undefined, "attack");
         assert.equal(detail.defense, undefined, "defense");
         assert.equal(detail.hit_points, undefined, "hit_points");
         assert.equal(detail.quest_points, 7, "quest_points");
         // victory missing
         assert.equal(detail.encounter_sets, undefined, "encounter_sets");
         assert.equal(detail.quantity_easy, 1, "quantity_easy");
         assert.equal(detail.quantity, 0, "quantity");
         assert.equal(detail.image, "encounter-card/Into the Pit/East-gate.jpg", "image");

         done();
      };

      // Run.
      var done = assert.async();
      HoBDetailFetcher.fetch(file, callback);
   });

   QUnit.test("fetch() Location Barren Hills", function(assert)
   {
      // Setup.
      var file = "http://hallofbeorn.com/LotR/Details/Barren-Hills-RtR";
      var callback = function(detail)
      {
         // Verify.
         assert.ok(true, "test resumed from async operation");
         assert.ok(detail);
         // console.log("Location detail: " + JSON.stringify(detail));

         assert.equal(detail.pack_name, "Road to Rivendell", "pack_name");
         assert.equal(detail.encounter_set, "Road to Rivendell", "encounter_set");
         assert.equal(detail.type_code, "location", "type_code");
         assert.equal(detail.type_name, "Location", "type_name");
         assert.equal(detail.position, 45, "position");
         assert.equal(detail.name, "Barren Hills", "name");
         assert.equal(detail.is_unique, undefined, "is_unique");
         assert.equal(detail.sequence, undefined, "sequence");
         assert.equal(detail.traits, "Hills.", "traits");
         assert.equal(detail.text, "While Barren Hills is the active location, ignore ambush.", "text");
         assert.equal(detail.shadow, "<b>Shadow:</b> Return attacking enemy to the staging area after it attacks.", "shadow");
         assert.equal(detail.flavor, undefined, "flavor");
         assert.equal(detail.engagement_cost, undefined, "engagement_cost");
         assert.equal(detail.threat, 2, "threat");
         assert.equal(detail.attack, undefined, "attack");
         assert.equal(detail.defense, undefined, "defense");
         assert.equal(detail.hit_points, undefined, "hit_points");
         assert.equal(detail.quest_points, 4, "quest_points");
         assert.equal(detail.victory, undefined, "victory");
         assert.equal(detail.encounter_sets, undefined, "encounter_sets");
         assert.equal(detail.quantity_easy, 2, "quantity_easy");
         assert.equal(detail.quantity, 0, "quantity");
         assert.equal(detail.image, "encounter-card/Road to Rivendell/Barren-Hills.jpg", "image");

         done();
      };

      // Run.
      var done = assert.async();
      HoBDetailFetcher.fetch(file, callback);
   });

   QUnit.test("fetch() Objective Book of Mazarbul", function(assert)
   {
      // Setup.
      var file = "http://hallofbeorn.com/LotR/Details/Book-of-Mazarbul-KD";
      var callback = function(detail)
      {
         // Verify.
         assert.ok(true, "test resumed from async operation");
         assert.ok(detail);
         // console.log("Objective detail: " + JSON.stringify(detail));

         assert.equal(detail.pack_name, "Khazad-d&#251;m", "pack_name");
         assert.equal(detail.encounter_set, "The Seventh Level", "encounter_set");
         assert.equal(detail.type_code, "objective", "type_code");
         assert.equal(detail.type_name, "Objective", "type_name");
         assert.equal(detail.position, 24, "position");
         assert.equal(detail.name, "Book of Mazarbul", "name");
         assert.equal(detail.is_unique, true, "is_unique");
         assert.equal(detail.sequence, undefined, "sequence");
         assert.equal(detail.traits, "Item. Artifact.", "traits");
         assert.equal(detail.text, "Restricted.<br/><b>Action:</b> Exhaust a hero to claim this objective. Then, attach Book of Mazarbul to that hero. (If detached, return Book of Mazarbul to the staging area.)<br/>Attached hero cannot attack and does not exhaust to commit to a quest.", "text");
         assert.equal(detail.shadow, undefined, "shadow");
         assert.equal(detail.flavor, undefined, "flavor");
         assert.equal(detail.engagement_cost, undefined, "engagement_cost");
         assert.equal(detail.threat, undefined, "threat");
         assert.equal(detail.attack, undefined, "attack");
         assert.equal(detail.defense, undefined, "defense");
         assert.equal(detail.hit_points, undefined, "hit_points");
         assert.equal(detail.quest_points, undefined, "quest_points");
         assert.equal(detail.victory, undefined, "victory");
         assert.equal(detail.encounter_sets, undefined, "encounter_sets");
         assert.equal(detail.quantity_easy, 1, "quantity_easy");
         assert.equal(detail.quantity, 0, "quantity");
         assert.equal(detail.image, "encounter-card/The Seventh Level/Book-of-Mazarbul.jpg", "image");

         done();
      };

      // Run.
      var done = assert.async();
      HoBDetailFetcher.fetch(file, callback);
   });

   QUnit.test("fetch() Quest Entering the Mines", function(assert)
   {
      // Setup.
      var file = "http://hallofbeorn.com/LotR/Details/Entering-the-Mines-KD";
      var callback = function(details)
      {
         // Verify.
         assert.ok(true, "test resumed from async operation");
         assert.ok(details);
         assert.equal(Array.isArray(details), true);
         assert.equal(details.length, 2);
         // console.log("Quest detail A: " + JSON.stringify(details[0]));

         var detail = details[0];
         assert.equal(detail.pack_name, "Khazad-d&#251;m", "pack_name");
         assert.equal(detail.encounter_set, "Into the Pit", "encounter_set");
         assert.equal(detail.type_code, "quest", "type_code");
         assert.equal(detail.type_name, "Quest", "type_name");
         assert.equal(detail.position, 64, "position");
         assert.equal(detail.name, "Entering the Mines", "name");
         assert.equal(detail.is_unique, undefined, "is_unique");
         assert.equal(detail.sequence, "1A", "sequence");
         assert.equal(detail.traits, undefined, "traits");
         assert.equal(detail.text, "<b>Setup:</b> Search the encounter deck for East-gate and Cave Torch. Put East-gate into play as the active location, and have the first player attach Cave Torch to a hero of his choice. Set First Hall and Bridge of Khazad-dûm aside, out of play. Shuffle the encounter deck.", "text");
         assert.equal(detail.shadow, undefined, "shadow");
         assert.equal(detail.flavor, "You have been sent by the White Council to Moria, to deliver a message to Balin and his Dwarven colony. No one has heard from him in a while.", "flavor");
         assert.equal(detail.engagement_cost, undefined, "engagement_cost");
         assert.equal(detail.threat, undefined, "threat");
         assert.equal(detail.attack, undefined, "attack");
         assert.equal(detail.defense, undefined, "defense");
         assert.equal(detail.hit_points, undefined, "hit_points");
         assert.equal(detail.quest_points, undefined, "quest_points");
         assert.equal(detail.victory, undefined, "victory");
         assert.equal(detail.quantity_easy, 1, "quantity_easy");
         assert.equal(detail.quantity, 0, "quantity");
         assert.equal(detail.image, "quest-card/Into the Pit/Entering-the-Mines-1A.jpg", "image");

         var encounter_sets = ["Twists and Turns", "Hazards of the Pit", "Goblins of the Deep"];
         assert.equal(detail.encounter_sets.length, encounter_sets.length, "encounter_sets.length");
         var i;
         for (i = 0; i < encounter_sets.length; i++)
         {
            assert.equal(detail.encounter_sets[i], encounter_sets[i], "encounter_sets[" + i + "]");
         }

         // console.log("Quest detail B: " + JSON.stringify(details[1]));
         detail = details[1];
         assert.equal(detail.pack_name, "Khazad-d&#251;m", "pack_name");
         assert.equal(detail.encounter_set, "Into the Pit", "encounter_set");
         assert.equal(detail.type_code, "quest", "type_code");
         assert.equal(detail.type_name, "Quest", "type_name");
         assert.equal(detail.position, 64, "position");
         assert.equal(detail.name, "Entering the Mines", "name");
         assert.equal(detail.is_unique, undefined, "is_unique");
         assert.equal(detail.sequence, "1B", "sequence");
         assert.equal(detail.traits, undefined, "traits");
         assert.equal(detail.text, "<b>When Revealed:</b> Reveal 1 encounter card per player, and add it to the staging area.<br/>Player cannot advance to the next stage of the scenario unless Bridge of Khazad-dûm is in their victory display.", "text");
         assert.equal(detail.shadow, undefined, "shadow");
         assert.equal(detail.flavor, "The doors of the East&ndash;gate hang crooked on their henges. The darkness inside the doorway is still and impenetrable, shutting out the last beams of a sinking sun.", "flavor");
         assert.equal(detail.engagement_cost, undefined, "engagement_cost");
         assert.equal(detail.threat, undefined, "threat");
         assert.equal(detail.attack, undefined, "attack");
         assert.equal(detail.defense, undefined, "defense");
         assert.equal(detail.hit_points, undefined, "hit_points");
         // quest_points missing
         assert.equal(detail.victory, undefined, "victory");
         assert.equal(detail.quantity_easy, 1, "quantity_easy");
         assert.equal(detail.quantity, 0, "quantity");
         assert.equal(detail.image, "quest-card/Into the Pit/Entering-the-Mines-1B.jpg", "image");

         assert.equal(detail.encounter_sets.length, encounter_sets.length, "encounter_sets.length");
         for (i = 0; i < encounter_sets.length; i++)
         {
            assert.equal(detail.encounter_sets[i], encounter_sets[i], "encounter_sets[" + i + "]");
         }

         done();
      };

      // Run.
      var done = assert.async();
      HoBDetailFetcher.fetch(file, callback);
   });

   QUnit.test("fetch() Quest Search for an Exit", function(assert)
   {
      // Setup.
      var file = "http://hallofbeorn.com/LotR/Details/Search-for-an-Exit-Heading-Down-KD";
      var callback = function(details)
      {
         // Verify.
         assert.ok(true, "test resumed from async operation");
         assert.ok(details);
         assert.equal(Array.isArray(details), true);
         assert.equal(details.length, 2);
         // console.log("Quest detail A: " + JSON.stringify(details[0]));

         var detail = details[0];
         assert.equal(detail.pack_name, "Khazad-d&#251;m", "pack_name");
         assert.equal(detail.encounter_set, "Flight from Moria", "encounter_set");
         assert.equal(detail.type_code, "quest", "type_code");
         assert.equal(detail.type_name, "Quest", "type_name");
         assert.equal(detail.position, 70, "position");
         assert.equal(detail.name, "Search for an Exit", "name");
         assert.equal(detail.is_unique, undefined, "is_unique");
         assert.equal(detail.sequence, "2A", "sequence");
         assert.equal(detail.traits, undefined, "traits");
         assert.equal(detail.text, "While Search for an Exit is the active quest card, only flip it to side 2B at the beginning of the staging step.", "text");
         assert.equal(detail.shadow, undefined, "shadow");
         assert.equal(detail.flavor, "As the presence draws near, doubt and fear surround you like a vast shadow. You must find daylight, you must escape from the Black Pit...", "flavor");
         assert.equal(detail.engagement_cost, undefined, "engagement_cost");
         assert.equal(detail.threat, undefined, "threat");
         assert.equal(detail.attack, undefined, "attack");
         assert.equal(detail.defense, undefined, "defense");
         assert.equal(detail.hit_points, undefined, "hit_points");
         assert.equal(detail.quest_points, undefined, "quest_points");
         assert.equal(detail.victory, undefined, "victory");
         assert.equal(detail.quantity_easy, 1, "quantity_easy");
         assert.equal(detail.quantity, 0, "quantity");
         assert.equal(detail.image, "quest-card/Flight from Moria/Search-for-an-Exit-Heading-Down-2A.jpg", "image");

         var encounter_sets = ["Hazards of the Pit", "Deeps of Moria", "Plundering Goblins"];
         assert.equal(detail.encounter_sets.length, encounter_sets.length, "encounter_sets.length");
         var i;
         for (i = 0; i < encounter_sets.length; i++)
         {
            assert.equal(detail.encounter_sets[i], encounter_sets[i], "encounter_sets[" + i + "]");
         }

         // console.log("Quest detail B: " + JSON.stringify(details[1]));
         detail = details[1];
         assert.equal(detail.pack_name, "Khazad-d&#251;m", "pack_name");
         assert.equal(detail.encounter_set, "Flight from Moria", "encounter_set");
         assert.equal(detail.type_code, "quest", "type_code");
         assert.equal(detail.type_name, "Quest", "type_name");
         assert.equal(detail.position, 70, "position");
         assert.equal(detail.name, "Heading Down", "name");
         assert.equal(detail.is_unique, undefined, "is_unique");
         assert.equal(detail.sequence, "2B", "sequence");
         assert.equal(detail.traits, undefined, "traits");
         assert.equal(detail.text, "<b>Forced:</b> If Heading Up is in the player's victory display at the end of any quest phase, shuffle Heading Up back into the quest deck.<br/><b>Players may bypass this quest card at the end of the combat phase.", "text");
         assert.equal(detail.shadow, undefined, "shadow");
         // flavor missing
         assert.equal(detail.engagement_cost, undefined, "engagement_cost");
         assert.equal(detail.threat, undefined, "threat");
         assert.equal(detail.attack, undefined, "attack");
         assert.equal(detail.defense, undefined, "defense");
         assert.equal(detail.hit_points, undefined, "hit_points");
         assert.equal(detail.quest_points, 5, "quest_points");
         assert.equal(detail.victory, undefined, "victory");
         assert.equal(detail.quantity_easy, 1, "quantity_easy");
         assert.equal(detail.quantity, 0, "quantity");
         assert.equal(detail.image, "quest-card/Flight from Moria/Search-for-an-Exit-Heading-Down-2B.jpg", "image");

         assert.equal(detail.encounter_sets.length, encounter_sets.length, "encounter_sets.length");
         for (i = 0; i < encounter_sets.length; i++)
         {
            assert.equal(detail.encounter_sets[i], encounter_sets[i], "encounter_sets[" + i + "]");
         }

         done();
      };

      // Run.
      var done = assert.async();
      HoBDetailFetcher.fetch(file, callback);
   });

   QUnit.test("fetch() Treachery New Devilry", function(assert)
   {
      // Setup.
      var file = "http://hallofbeorn.com/LotR/Details/New-Devilry-KD";
      var callback = function(detail)
      {
         // Verify.
         assert.ok(true, "test resumed from async operation");
         assert.ok(detail);
         // console.log("Treachery detail: " + JSON.stringify(detail));

         assert.equal(detail.pack_name, "Khazad-d&#251;m", "pack_name");
         assert.equal(detail.encounter_set, "Flight from Moria", "encounter_set");
         assert.equal(detail.type_code, "treachery", "type_code");
         assert.equal(detail.type_name, "Treachery", "type_name");
         assert.equal(detail.position, 26, "position");
         assert.equal(detail.name, "New Devilry", "name");
         assert.equal(detail.is_unique, undefined, "is_unique");
         assert.equal(detail.sequence, undefined, "sequence");
         assert.equal(detail.traits, undefined, "traits");
         assert.equal(detail.text, "<b>When Revealed:</b> If the players are not on stage 1, shuffle the current quest card into the quest deck, then reveal a new quest card. Otherwise, New Devilry gains Surge.", "text");
         assert.equal(detail.shadow, "<b>Shadow:</b> If this attack is undefended, raise your threat by The Nameless Fear's Threat", "shadow");
         // flavor missing
         assert.equal(detail.engagement_cost, undefined, "engagement_cost");
         assert.equal(detail.threat, undefined, "threat");
         assert.equal(detail.attack, undefined, "attack");
         assert.equal(detail.defense, undefined, "defense");
         assert.equal(detail.hit_points, undefined, "hit_points");
         assert.equal(detail.quest_points, undefined, "quest_points");
         assert.equal(detail.victory, undefined, "victory");
         assert.equal(detail.encounter_sets, undefined, "encounter_sets");
         assert.equal(detail.quantity_easy, 3, "quantity_easy");
         assert.equal(detail.quantity, 0, "quantity");
         assert.equal(detail.image, "encounter-card/Flight from Moria/New-Devilry.jpg", "image");

         done();
      };

      // Run.
      var done = assert.async();
      HoBDetailFetcher.fetch(file, callback);
   });

   QUnit.test("fetch() Treachery Shadow of Fear", function(assert)
   {
      // Setup.
      var file = "http://hallofbeorn.com/LotR/Details/Shadow-of-Fear-KD";
      var callback = function(detail)
      {
         // Verify.
         assert.ok(true, "test resumed from async operation");
         assert.ok(detail);
         // console.log("Treachery detail: " + JSON.stringify(detail));

         assert.equal(detail.pack_name, "Khazad-d&#251;m", "pack_name");
         assert.equal(detail.encounter_set, "Flight from Moria", "encounter_set");
         assert.equal(detail.type_code, "treachery", "type_code");
         assert.equal(detail.type_name, "Treachery", "type_name");
         assert.equal(detail.position, 27, "position");
         assert.equal(detail.name, "Shadow of Fear", "name");
         assert.equal(detail.is_unique, undefined, "is_unique");
         assert.equal(detail.sequence, undefined, "sequence");
         assert.equal(detail.traits, undefined, "traits");
         assert.equal(detail.text, "<b>When Revealed:</b> The first player attaches Shadow of Fear to one of his heroes. Counts as a Condition attachment with the text:Limit 1 per hero. Attached hero cannot exhaust or ready and its text box is treated as if it were blank.<br><b>Action:</b> Pay 3 resources from attached hero's pool to discard this card.", "text");
         assert.equal(detail.shadow, undefined, "shadow");
         // flavor missing
         assert.equal(detail.engagement_cost, undefined, "engagement_cost");
         assert.equal(detail.threat, undefined, "threat");
         assert.equal(detail.attack, undefined, "attack");
         assert.equal(detail.defense, undefined, "defense");
         assert.equal(detail.hit_points, undefined, "hit_points");
         assert.equal(detail.quest_points, undefined, "quest_points");
         assert.equal(detail.victory, undefined, "victory");
         assert.equal(detail.encounter_sets, undefined, "encounter_sets");
         assert.equal(detail.quantity_easy, 1, "quantity_easy");
         assert.equal(detail.quantity, 2, "quantity");
         assert.equal(detail.image, "encounter-card/Flight from Moria/Shadow-of-Fear.jpg", "image");

         done();
      };

      // Run.
      var done = assert.async();
      HoBDetailFetcher.fetch(file, callback);
   });

   QUnit.test("fetch() Treachery Signs of Conflict", function(assert)
   {
      // Setup.
      var file = "http://hallofbeorn.com/LotR/Details/Signs-of-Conflict-KD";
      var callback = function(detail)
      {
         // Verify.
         assert.ok(true, "test resumed from async operation");
         assert.ok(detail);
         // console.log("Treachery detail: " + JSON.stringify(detail));

         assert.equal(detail.pack_name, "Khazad-d&#251;m", "pack_name");
         assert.equal(detail.encounter_set, "Into the Pit", "encounter_set");
         assert.equal(detail.type_code, "treachery", "type_code");
         assert.equal(detail.type_name, "Treachery", "type_name");
         assert.equal(detail.position, 15, "position");
         assert.equal(detail.name, "Signs of Conflict", "name");
         assert.equal(detail.is_unique, undefined, "is_unique");
         assert.equal(detail.sequence, undefined, "sequence");
         assert.equal(detail.traits, undefined, "traits");
         assert.equal(detail.text, "Doomed 2. Surge.", "text");
         assert.equal(detail.shadow, "<b>Shadow:</b> Defending player raises his threat by 2.", "shadow");
         // flavor missing
         assert.equal(detail.engagement_cost, undefined, "engagement_cost");
         assert.equal(detail.threat, undefined, "threat");
         assert.equal(detail.attack, undefined, "attack");
         assert.equal(detail.defense, undefined, "defense");
         assert.equal(detail.hit_points, undefined, "hit_points");
         assert.equal(detail.quest_points, undefined, "quest_points");
         assert.equal(detail.victory, undefined, "victory");
         assert.equal(detail.encounter_sets, undefined, "encounter_sets");
         assert.equal(detail.quantity_easy, 2, "quantity_easy");
         assert.equal(detail.quantity, 3, "quantity");
         assert.equal(detail.image, "encounter-card/Into the Pit/Signs-of-Conflict.jpg", "image");

         done();
      };

      // Run.
      var done = assert.async();
      HoBDetailFetcher.fetch(file, callback);
   });

   QUnit.test("processStatTextBox() Quest Up the Pass", function(assert)
   {
      // Setup.
      var statTextBox = "<div class=\"statTextBox\" style=\"margin:2px;padding-top:0px;padding-left:6px;padding-right:6px;border: 1px solid gray;border-radius:4px;max-width:500px;min-height:180px;min-width:200px;position:relative;background-color:#d3d3d3;\">" +
         "<p class='flavor-text'>Celeborn has bid you to visit her father in Rivendell. Your journey takes you though the Redhorn Gate...</p><p><b>Setup:</b> Add <a title='Caradhras (The Redhorn Gate)' target='_blank' href='/Cards/Details/Caradhras-TRG'>Caradhras</a> to the staging area. Remove all copies of <a title='Snowstorm (The Redhorn Gate)' target='_blank' href='/Cards/Details/Snowstorm-TRG'>Snowstorm</a> from the encounter deck and set them aside, out of play. Put <a target='_blank' title='Arwen Undomiel (The Redhorn Gate)' href='/Cards/Details/Arwen-Undomiel-TRG'>Arwen Undómiel</a> into play under the control of the first player.</p>            </div>" +
         "<div class=\"statTextBox\" style=\"margin:6px 2px 2px 2px;padding-top:0px;padding-left:6px;padding-right:6px;border: 1px solid gray;border-radius:4px;max-width:500px;min-height:200px;min-width:200px;min-height:100px;position:relative;overflow:;background-color:#d3d3d3;\">" +
         "<p><b>When Revealed:</b> Reveal 1 card from the encounter deck per player, and add it to the staging area.</p>                </div>" +
         "</div>";
      var type_code = "quest";

      // Run.
      var result = HoBDetailFetcher.processStatTextBox(statTextBox, type_code);

      // Verify.
      assert.ok(result);
      assert.equal(Array.isArray(result), true);
      assert.equal(result.length, 2);
      var data0 = result[0];
      assert.ok(data0);
      assert.equal(data0.traits, undefined, "traits");
      assert.equal(data0.text, "<b>Setup:</b> Add Caradhras to the staging area. Remove all copies of Snowstorm from the encounter deck and set them aside, out of play. Put Arwen Undómiel into play under the control of the first player.", "text");
      assert.equal(data0.shadow, undefined, "shadow");
      assert.equal(data0.flavor, "Celeborn has bid you to visit her father in Rivendell. Your journey takes you though the Redhorn Gate...", "flavor");
      var data1 = result[1];
      assert.ok(data1);
      assert.equal(data1.traits, undefined, "traits");
      assert.equal(data1.text, "<b>When Revealed:</b> Reveal 1 card from the encounter deck per player, and add it to the staging area.", "text");
      assert.equal(data1.shadow, undefined, "shadow");
      assert.equal(data1.flavor, undefined, "flavor");
   });
});