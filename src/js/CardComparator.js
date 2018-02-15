"use strict";

define(["js/Pack"], function(Pack)
{
   var CardComparator = function(a, b)
   {
      // var a_pack_name = a.pack_name;
      // var b_pack_name = b.pack_name;
      //
      // var answer = compare(a_pack_name, b_pack_name);
      var a_pack = Pack.findByName(a.pack_name);
      var b_pack = Pack.findByName(b.pack_name);

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

   // function compare(a, b)
   // {
   //    return (a === b ? 0 : (a > b ? 1 : -1));
   // }

   return CardComparator;
});