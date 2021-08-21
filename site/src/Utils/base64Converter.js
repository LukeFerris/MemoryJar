import readFileAsync from '../Utils/readFileAsync';

export default async (blob) => {
  
  let result = await readFileAsync(blob);
  
  return(result.split(',')[1]);

};