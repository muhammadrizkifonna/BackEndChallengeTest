/**
 * Direction:
 * Remove key that have null or undefined value
 *
 * Expected Result:
 * [
 *   { session_name: 'first test', classes: [{ students: [{ student_name: 'budi' }] }] },
 *   { classes: [{ class_name: 'second class', students: [{ student_name: 'adi' }] }] },
 * ]
 */
const data = [
  { session_name: 'first test', classes: [{ class_name: undefined, students: [{ student_name: 'budi' }] }] },
  { session_name: null, classes: [{ class_name: 'second class', students: [{ student_name: 'adi' }] }] },
];



function result(data) {
  // Your Code Here
  for(var i=0;i<data.length;i++)
  {
    for (var propName in data[i]) {
      if (Array.isArray(data[i][propName]))
      {
        helper(data[i][propName]);
      }
      else if (data[i][propName] === null || data[i][propName] === undefined) {
        delete data[i][propName];
      }
    }
  }
  return data;


}


function helper(data)
{
  for(var i=0;i<data.length;i++)
  {
    for (var propName in data[i]) {
      if (Array.isArray(data[i][propName]))
      {
        helper(data[i][propName]);
      }
      else if (data[i][propName] === null || data[i][propName] === undefined) {
        delete data[i][propName];
      }
    }
  }
}




console.log(result(data));
