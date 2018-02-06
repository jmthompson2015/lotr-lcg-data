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
         assert.equal(detail.scenario_name, undefined, "scenario_name");
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
         assert.equal(detail.scenario_name, undefined, "scenario_name");
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
         assert.equal(detail.scenario_name, undefined, "scenario_name");
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
});