import { PickType } from "@nestjs/swagger";
import { User } from "@users/models/user.model";

export class Owner extends PickType(User, ["username", "profilePicture", "name", "shop", "campus", "verified"]) {}
