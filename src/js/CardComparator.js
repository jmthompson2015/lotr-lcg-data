"use strict";

define(["js/Pack"], function(Pack)
{
   var CardComparator = function(a, b)
   {
      var a_pack = Pack.findByName(a.pack_name.replace("The Hobbit: ", ""));
      var b_pack = Pack.findByName(b.pack_name.replace("The Hobbit: ", ""));

      var answer = a_pack.cycle_position - b_pack.cycle_position;

      if (answer === 0)
      {
         answer = a_pack.position - b_pack.position;
      }

      if (answer === 0)
      {
         answer = a.position - b.position;
      }

      return answer;
   };

   return CardComparator;
});