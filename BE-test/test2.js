/**
 * Direction:
 * Remove duplicated data from array
 * 
 * Expected Result:
 * [1, 2, 3, 4, 5]
 */
 const data = [1, 4, 2, 3, 5, 3, 2, 4];

 function result(data) {
   // Your Code Here
   const res=[];
   let map_number= new Map();
   // console.log("A");
   for (var i=0;i<data.length;i++)
   {
     // console.log(data[i])
     if (!map_number.has(data[i]))
     {
       map_number.set(data[i], 1);
       res.push(data[i]);
       
     }
   }
   return res.sort();
 
 
 
 }
 
 console.log(result(data));
 