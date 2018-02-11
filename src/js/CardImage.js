"use strict";

define(function()
{
   function CardImage(props)
   {
      this.props = () => props;
   }

   var BASE_URL = "../../images/";

   CardImage.prototype.render = function()
   {
      var card = this.props().card;
      var width = this.props().width;
      var cardSrc = card.image;

      if (cardSrc !== undefined)
      {
         cardSrc = cardSrc.replace(/ /g, "%20");
      }

      var src = BASE_URL + cardSrc;

      var alt = card.name;
      var content = "<img src=\"" + src + "\" width=\"" + width + "\" alt=\"" + alt + "\" />";
      var style = "padding: 0.25em;";
      var title = card.encounter_set + ": " + card.name;
      var element = "<div style=\"" + style + "\" title=\"" + title + "\">" + content + "</div>";

      return element;
   };

   return CardImage;
});