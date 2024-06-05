import {AuthGuard} from "@nestjs/passport";
import {ExecutionContext} from "@nestjs/common";
import {Observable} from "rxjs";

export class JwtAuthGuards extends AuthGuard('jwt'){
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        console.log('Inside jWT AuthGuard canActivate');
        return super.canActivate(context);
    }
}