import * as bcrypt from 'bcrypt';
const saltRounds = 10;

export const hashPassword = async (plainPassword: string) => {
  try {
    return await bcrypt.hash(plainPassword, saltRounds);
  } catch (err) {
    console.log('err', err);
  }
};

export const compareHashedPassword = (
  hashedPassword: string,
  password: string,
) => {
  try {
    return bcrypt.compare(hashedPassword, password);
  } catch (err) {
    console.log('err');
  }
};

// export const comparePassword = async (hashedPassword: string)=>{
//     try {
//         return await bcrypt.compare(hashedPassword,saltRounds)
//     }
// }
