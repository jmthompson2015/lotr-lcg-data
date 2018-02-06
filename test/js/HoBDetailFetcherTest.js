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
         assert.equal(detail.pack_name, "\"Khazad-d&#251;m\"", "pack_name");
         assert.equal(detail.encounter_set, "\"Into the Pit\"", "encounter_set");
         assert.equal(detail.type_code, "\"enemy\"", "type_code");
         assert.equal(detail.type_name, "\"Enemy\"", "type_name");
         assert.equal(detail.position, 14, "position");
         assert.equal(detail.name, "\"Patrol Leader\"", "name");
         assert.equal(detail.traits, "\"Goblin. Orc.\"", "traits");
         assert.equal(detail.text, "\"<b>Forced:</b> Before Patrol Leader is dealt damage, discard the top card of the encounter deck. If the discarded card is an enemy, cancel that damage.\"", "text");
         assert.equal(detail.shadow, "\"<b>Shadow:</b> Cancel all damage dealt to this enemy.\"", "shadow");
         assert.equal(detail.engagement_cost, 30, "engagement_cost");
         assert.equal(detail.threat, 3, "threat");
         assert.equal(detail.attack, 4, "attack");
         assert.equal(detail.defense, 3, "defense");
         assert.equal(detail.hit_points, 4, "hit_points");
         assert.equal(detail.quantity_easy, 1, "quantity_easy");
         assert.equal(detail.quantity, 1, "quantity");
         assert.equal(detail.image, "\"encounter-card/Into the Pit/Patrol-Leader.jpg\"", "image");

         done();
      };

      // Run.
      var done = assert.async();
      HoBDetailFetcher.fetch(file, callback);
   });
});