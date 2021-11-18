/**
 * Direction:
 * Find missing number from the list
 *
 * Expected Result:
 * 8
 */
const numbers = [9, 6, 4, 2, 3, 5, 7, 0, 1];

function result(numbers) {
  // Your Code Here
  numbers=numbers.sort();
  for (var i=0;i<numbers.length-1;i++)
  {
    if (numbers[i+1]!=numbers[i]+1)
    {
      return numbers[i]+1;
    }
  }
  return number[numbers.length-1]+1;



}

console.log(result(numbers));
