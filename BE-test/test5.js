/**
 * Direction:
 * Find prefix of the word from array of string
 *
 * Expected Result:
 * fl
 */
const words = ['flower', 'flow', 'flight'];

function result(words) {
  // Your Code Here
  if (words.length==0)
  {
    return "";
  }
  var pref=words[0];
  for (var i=0;i<words.length;i++)
  {
    while(words[i].indexOf(pref)!=0)
    {
      pref=pref.substring(0, pref.length-1);
    }
  }
  return pref;
}

console.log(result(words));
