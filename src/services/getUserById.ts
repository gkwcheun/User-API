import db from "../models";
const { User } = db;

async function getUserById(id: string) {
  try {
    const user = await User.findOne({ where: { id } });
    return user;
  } catch (err) {
    throw new Error(`unhandledRejection finding user of id ${id}`);
  }
}

export default getUserById;
