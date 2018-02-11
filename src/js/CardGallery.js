"use strict";

define(["js/CardImage"], function(CardImage)
{
   function CardGallery(props)
   {
      this.props = () => props;
   }

   CardGallery.prototype.render = function()
   {
      var cards = this.props().cards;
      var width = this.props().width;

      var content = cards.reduce((accumulator, card) =>
      {
         var cardImage = new CardImage(
         {
            card: card,
            width: width,
         });
         return accumulator + cardImage.render();
      }, "");

      var style = "display: flex; flex-wrap: wrap;";
      var element = "<div style=\"" + style + "\">" + content + "</div>";

      return element;
   };

   return CardGallery;
});