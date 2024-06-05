import {AuthGuard} from "@nestjs/passport";
import {ExecutionContext, Injectable} from "@nestjs/common";
import {Observable} from "rxjs";

@Injectable()
export class LocalGuards extends AuthGuard('local'){
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        console.log('Hello World!');
        return super.canActivate(context);
    }
}