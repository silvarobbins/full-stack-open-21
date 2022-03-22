const calculateBmi = (height: number, weight: number) => {
  const bmi = weight/((height/100)**2);
  if (bmi < 18.5) {
    return('Underweight')
  }
  else if (bmi < 25.0) {
    return ('Normal (Healthy weight)')
  }
  else if (bmi < 30.0) {
    return ('Overweight')
  }
  else {
    return ('Obese')
  }
};

const height: number = Number(process.argv[2])
const weight: number = Number(process.argv[3])

console.log(calculateBmi(height, weight));