"use strict";

define(["qunit", "js/ParseUtilities"], function(QUnit, ParseUtilities)
{
   QUnit.module("ParseUtilities");

   var titleBox = "<div class=\"titleNameBox\">" +
      "<div style=\"font-size:1.75em;font-family:Verdana;\">New Devilry</div>" +
      "<div style=\"margin-top:4px;margin-bottom:2px;\">" +
      "<span style=\"display:inline-block;max-width:154px;\"><a href=\"/Cards/Search?CardSet=Khazad-d&#251;m\" title=\"Search for Khazad-d&#251;m\">Khazad-d&#251;m</a></span><span style=\"margin-left:8px;display:inline-block;\">#26 (x3)</span>" +
      "</div>" +
      "</div>";

   var statTextBox = "<div class=\"statTextBox\" style=\"margin:2px;padding-top:0px;padding-left:6px;padding-right:6px;border: 1px solid gray;border-radius:4px;max-width:500px;min-height:180px;min-width:200px;position:relative;background-color:rgba(0, 0, 0, .1);\">" +
      "<img src='/Images/encounter-card-back.jpg' style=\"pointer-events:none;position: absolute;left:0px;top:0px;width:100%;height:100%;opacity:.08;\" />" +
      "<p class='main-text'><b>When Revealed:</b> If the players are not on stage 1, shuffle the current quest card into the quest deck, then reveal a new quest card. Otherwise, New Devilry gains <a title='Search: Surge. Keyword' href='/LotR/Search?Keyword=Surge.' target='_blank'>Surge.</a></p><img src='/Images/ShadowDivider.png' title='Shadow Effect' style='display:block;margin-left:auto;margin-right:auto;width:285px;'/><p class='shadow-text'><b>Shadow:</b> If this attack is undefended, raise your threat by <a title='Card: The Nameless Fear' href='/LotR/Details/The-Nameless-Fear-KD' target='_blank'>The Nameless Fear</a>'s <img src='/Images/threat-small.png' style='height:16px;margin-left:2px;margin-right:2px;margin-bottom:-2px;' /></p>" +
      "</div>";

   QUnit.test("extract()", function(assert)
   {
      assert.equal(ParseUtilities.extract(titleBox, "<div", "</div>", false, false), " class=\"titleNameBox\">" +
         "<div style=\"font-size:1.75em;font-family:Verdana;\">New Devilry");
      assert.equal(ParseUtilities.extract(titleBox, "<span", "</span>", false, false), " style=\"display:inline-block;max-width:154px;\"><a href=\"/Cards/Search?CardSet=Khazad-d&#251;m\" title=\"Search for Khazad-d&#251;m\">Khazad-d&#251;m</a>");
      assert.equal(ParseUtilities.extract(titleBox, "<a", "</a>", false, false), " href=\"/Cards/Search?CardSet=Khazad-d&#251;m\" title=\"Search for Khazad-d&#251;m\">Khazad-d&#251;m");

      assert.equal(ParseUtilities.extract(titleBox, "<div", "</div>", true, true), "<div class=\"titleNameBox\">" +
         "<div style=\"font-size:1.75em;font-family:Verdana;\">New Devilry</div>");
      assert.equal(ParseUtilities.extract(titleBox, "<span", "</span>", true, true), "<span style=\"display:inline-block;max-width:154px;\"><a href=\"/Cards/Search?CardSet=Khazad-d&#251;m\" title=\"Search for Khazad-d&#251;m\">Khazad-d&#251;m</a></span>");
      assert.equal(ParseUtilities.extract(titleBox, "<a", "</a>", true, true), "<a href=\"/Cards/Search?CardSet=Khazad-d&#251;m\" title=\"Search for Khazad-d&#251;m\">Khazad-d&#251;m</a>");
   });

   QUnit.test("extractAttribute() titleBox", function(assert)
   {
      // Setup.
      var fragment = ParseUtilities.extractInclusive(titleBox, "<a", "</a>");
      assert.equal(fragment, "<a href=\"/Cards/Search?CardSet=Khazad-d&#251;m\" title=\"Search for Khazad-d&#251;m\">Khazad-d&#251;m</a>");

      // Run / Verify.
      assert.equal(ParseUtilities.extractAttribute(fragment, "href"), "/Cards/Search?CardSet=Khazad-d&#251;m");
      assert.equal(ParseUtilities.extractAttribute(fragment, "title"), "Search for Khazad-d&#251;m");
   });

   QUnit.test("extractAttribute() statTextBox", function(assert)
   {
      // Setup.
      var fragment = ParseUtilities.extractInclusive(statTextBox, "<img", "/>");
      assert.equal(fragment, "<img src='/Images/encounter-card-back.jpg' style=\"pointer-events:none;position: absolute;left:0px;top:0px;width:100%;height:100%;opacity:.08;\" />");

      // Run / Verify.
      assert.equal(ParseUtilities.extractAttribute(fragment, "src"), "/Images/encounter-card-back.jpg");
   });

   QUnit.test("extractContent()", function(assert)
   {
      // Setup.
      var fragment = ParseUtilities.extractInclusive(titleBox, "<a", "</a>");
      assert.equal(fragment, "<a href=\"/Cards/Search?CardSet=Khazad-d&#251;m\" title=\"Search for Khazad-d&#251;m\">Khazad-d&#251;m</a>");

      // Run / Verify.
      assert.equal(ParseUtilities.extractContent(fragment), "Khazad-d&#251;m");
   });

   QUnit.test("extractExclusive()", function(assert)
   {
      assert.equal(ParseUtilities.extractExclusive(titleBox, "<div", "</div>"), " class=\"titleNameBox\">" +
         "<div style=\"font-size:1.75em;font-family:Verdana;\">New Devilry");
      assert.equal(ParseUtilities.extractExclusive(titleBox, "<span", "</span>"), " style=\"display:inline-block;max-width:154px;\"><a href=\"/Cards/Search?CardSet=Khazad-d&#251;m\" title=\"Search for Khazad-d&#251;m\">Khazad-d&#251;m</a>");
      assert.equal(ParseUtilities.extractExclusive(titleBox, "<a", "</a>"), " href=\"/Cards/Search?CardSet=Khazad-d&#251;m\" title=\"Search for Khazad-d&#251;m\">Khazad-d&#251;m");

      assert.equal(ParseUtilities.extractExclusive(statTextBox, "<p class='main-text'>", "</p>"), "<b>When Revealed:</b> If the players are not on stage 1, shuffle the current quest card into the quest deck, then reveal a new quest card. Otherwise, New Devilry gains <a title='Search: Surge. Keyword' href='/LotR/Search?Keyword=Surge.' target='_blank'>Surge.</a>");
   });

   QUnit.test("extractInclusive()", function(assert)
   {
      assert.equal(ParseUtilities.extractInclusive(titleBox, "<div", "</div>"), "<div class=\"titleNameBox\">" +
         "<div style=\"font-size:1.75em;font-family:Verdana;\">New Devilry</div>");
      assert.equal(ParseUtilities.extractInclusive(titleBox, "<span", "</span>"), "<span style=\"display:inline-block;max-width:154px;\"><a href=\"/Cards/Search?CardSet=Khazad-d&#251;m\" title=\"Search for Khazad-d&#251;m\">Khazad-d&#251;m</a></span>");
      assert.equal(ParseUtilities.extractInclusive(titleBox, "<a", "</a>"), "<a href=\"/Cards/Search?CardSet=Khazad-d&#251;m\" title=\"Search for Khazad-d&#251;m\">Khazad-d&#251;m</a>");
   });

   QUnit.test("removeImg()", function(assert)
   {
      // Setup.
      var fragment = ParseUtilities.extractExclusive(statTextBox, "<p class='shadow-text'>", "</p>");
      assert.equal(fragment, "<b>Shadow:</b> If this attack is undefended, raise your threat by <a title='Card: The Nameless Fear' href='/LotR/Details/The-Nameless-Fear-KD' target='_blank'>The Nameless Fear</a>'s <img src='/Images/threat-small.png' style='height:16px;margin-left:2px;margin-right:2px;margin-bottom:-2px;' />");

      // Run / Verify.
      assert.equal(ParseUtilities.removeImg(fragment, "a"), "<b>Shadow:</b> If this attack is undefended, raise your threat by <a title='Card: The Nameless Fear' href='/LotR/Details/The-Nameless-Fear-KD' target='_blank'>The Nameless Fear</a>'s Threat");
   });

   QUnit.test("removeTag()", function(assert)
   {
      // Setup.
      var fragment = ParseUtilities.extractExclusive(statTextBox, "<p class='main-text'>", "</p>");

      // Run / Verify.
      assert.equal(ParseUtilities.removeTag(fragment, "a"), "<b>When Revealed:</b> If the players are not on stage 1, shuffle the current quest card into the quest deck, then reveal a new quest card. Otherwise, New Devilry gains Surge.");
   });
});