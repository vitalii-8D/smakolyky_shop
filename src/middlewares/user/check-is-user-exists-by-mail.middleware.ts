import {NextFunction, Response} from 'express';
import {userService} from '../../services';
import {customErrors, ErrorHandler} from '../../errors';
import {ResponseStatusCodesEnum} from '../../constants';
import {IRequestExtended} from '../../models';

export const checkIsUserExistsByMailMiddleware =
  async (req: IRequestExtended, res: Response, next: NextFunction): Promise<void | NextFunction> => {
    const {email} = req.body;

    /*console.log('checkIsUserExistsByMailMiddleware -----****---**-*-*');
    console.log(req.body);*/

    const userByEmail = await userService.findOneByParams({email});

    if (!userByEmail) {
      return next(new ErrorHandler(
        ResponseStatusCodesEnum.FORBIDDEN,
        customErrors.FORBIDDEN_WRONG_CREDENTIALS.message,
        customErrors.FORBIDDEN_WRONG_CREDENTIALS.code
      ));
    }

    req.user = userByEmail;

    next();
  };
