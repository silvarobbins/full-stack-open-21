interface ResultObject {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
};

const calculateExcercises = (exercise: number[], target: number) => {
  const sum = exercise.reduce((a,b) => a + b, 0);
  const avg = sum/exercise.length || 0;
  let rating;
  let ratingDescription;
  if ((target - avg) > 1) {
    rating = 1;
    ratingDescription = 'not good, try to do better next time';
  } else if ((target - avg) > 0) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 3;
    ratingDescription = 'good job!';
  }
  
  return {
    periodLength: exercise.length,
    trainingDays: exercise.filter(d => d > 0).length,
    success: avg >= target,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: avg
  }
};

const targetInput: number = Number(process.argv[2]);
let exerciseInput: Array<number> = [];
for (let i = 3; i < process.argv.length ; i++) {
  console.log(process.argv[i])
  exerciseInput = [...exerciseInput, Number(process.argv[i])]
}

console.log(calculateExcercises(exerciseInput, targetInput))