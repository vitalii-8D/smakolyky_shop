import {NextFunction, Request, Response} from 'express';
import {ActionEnum/*, ResponseStatusCodesEnum*/} from '../../constants';
import {userService} from '../../services';
// import {ErrorHandler} from '../../errors';

const randomToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDM1NDg2NzgsImV4cCI6MTYwMzYzNTA3OH0.v9lhCVaFKxSsYUAB25Ok03I22222222222222222222';

export const checkIsTokenAlreadyExistsMiddleware = (tokensAction: ActionEnum, deleteFlag?: boolean) =>
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const userByAction = await userService.findByActionEnum(tokensAction) || {_id: randomToken};

    if (userByAction._id !== randomToken) {
      if (deleteFlag) {
        userService.deleteTokenByActionEnum(userByAction._id, tokensAction);
      }

      // return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, `${tokensAction} token is already exists`));
    }

    next();
  };
