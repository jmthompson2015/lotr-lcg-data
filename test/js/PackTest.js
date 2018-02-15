"use strict";

define(["qunit", "js/Pack"], function(QUnit, Pack)
{
   QUnit.module("Pack");

   QUnit.test("findByName() Core Set", function(assert)
   {
      // Setup.
      var name = "Core Set";

      // Run.
      var result = Pack.findByName(name);

      // Verify.
      assert.ok(result);
      assert.equal(result.name, "Core Set");
      assert.equal(result.code, "Core");
   });

   QUnit.test("findByName() Khazad-dûm", function(assert)
   {
      // Setup.
      var name = "Khazad-d\u00fbm";

      // Run.
      var result = Pack.findByName(name);

      // Verify.
      assert.ok(result);
      assert.equal(result.name, "Khazad-d\u00fbm");
      assert.equal(result.code, "KD");
   });

   QUnit.test("findByName() The Drúadan Forest", function(assert)
   {
      // Setup.
      var name = "The Dr\u00faadan Forest";

      // Run.
      var result = Pack.findByName(name);

      // Verify.
      assert.ok(result);
      assert.equal(result.name, "The Dr\u00faadan Forest");
      assert.equal(result.code, "TDF");
   });

   QUnit.test("findByName() The Dungeons of Cirith Gurat", function(assert)
   {
      // Setup.
      var name = "The Dungeons of Cirith Gurat";

      // Run.
      var result = Pack.findByName(name);

      // Verify.
      assert.ok(result);
      assert.equal(result.name, "The Dungeons of Cirith Gurat");
      assert.equal(result.code, "DoCG");
   });
});