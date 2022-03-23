export const calculateBmi = (height: number, weight: number) => {
  const bmi = weight/((height/100)**2);
  let result: string;
  if (bmi < 18.5) {
    result = 'Underweight';
  }
  else if (bmi < 25.0) {
    result = 'Normal (Healthy weight)';
  }
  else if (bmi < 30.0) {
    result = 'Overweight';
  }
  else {
    result = 'Obese';
  }
  return {
    weight: weight,
    height: height,
    bmi: result
  };
};