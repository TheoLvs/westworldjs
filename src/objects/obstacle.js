import {BaseObject} from "../objects/baseObject";


export class Obstacle extends BaseObject{

    get isBlocking(){
        return true;
    }

    get isStationary(){
        return true;
    }
}