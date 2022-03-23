import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  return res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    return res.send(calculateBmi(Number(height), Number(weight)));
  } else {
    return res.send({error: 'malformatted parameters'}).status(400);
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/no-unsafe-assignment
  const exercises = req.body.daily_exercises;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/no-unsafe-assignment
  const target = req.body.target;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/no-unsafe-assignment
  if ( !exercises || !target) {
    return res.send({ error: 'parameters missing'}).status(400);
  }

  let wrongType = true;
  if (Array.isArray(exercises)) {
    wrongType = false;
    exercises.forEach(function(val){
       if(typeof val !== 'number'){
        wrongType = true;
       }
    });
 }
  if ( wrongType || isNaN(Number(target))) {
     return res.send({ error: 'malformatted parameters'}).status(400);
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculateExercises(exercises, Number(target));
  return res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
