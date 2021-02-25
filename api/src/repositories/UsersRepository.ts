import { EntityRepository, Repository } from "typeorm";
import { User } from "../models/User";

@EntityRepository(User)
class UsersRepository extends Repository<User> { //o extends permite que essa classe tenha todos os metodos presentes no Repository

}

export { UsersRepository }; //poderia ser export default UserRepository