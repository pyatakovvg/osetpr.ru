
export class BaseError extends Error {
  constructor(status = 500, data = 'Что-то пошло не так') {
    super();

    this.name = 'NetworkError';
    this.status = status;
    this.data = data;

    if ('captureStackTrace' in Error) {
      Error.captureStackTrace(this, BaseError);
    }
  }
}

export class UserNotFoundError extends BaseError {
  constructor(data = 'Пользователь не найден') {
    super(500, data);

    this.name = 'UserNotFoundError';

    if ('captureStackTrace' in Error) {
      Error.captureStackTrace(this, UserNotFoundError);
    }
  }
}

export class NetworkError extends BaseError {
  constructor(data = 'Что-то пошло не так') {
    super(500, data);

    this.name = 'NetworkError';

    if ('captureStackTrace' in Error) {
      Error.captureStackTrace(this, NetworkError);
    }
  }
}

export class UnavailableError extends BaseError {
  constructor(data = 'Сервис временно недоступен') {
    super(503, data);

    this.name = 'UnavailableError';

    if ('captureStackTrace' in Error) {
      Error.captureStackTrace(this, UnavailableError);
    }
  }
}


export class BadRequestError extends BaseError {
  constructor(data = 'Ошибка авторизации') {
    super(400, data);

    this.name = 'BadRequestError';

    if ('captureStackTrace' in Error) {
      Error.captureStackTrace(this, BadRequestError);
    }
  }
}

export class UnauthorizedError extends BaseError {
  constructor(data = 'Пользователь неавторизован') {
    super(401, data);

    this.name = 'UnauthorizedError';

    if ('captureStackTrace' in Error) {
      Error.captureStackTrace(this, UnauthorizedError);
    }

  }
}

export class ForbiddenError extends BaseError {
  constructor(data = 'Недостаточно прав') {
    super(403, data);

    this.name = 'ForbiddenError';

    if ('captureStackTrace' in Error) {
      Error.captureStackTrace(this, ForbiddenError);
    }
  }
}

export class NotfoundError extends BaseError {
  constructor(data = 'Запрашиваемый ресурс не найден') {
    super(404, data);

    this.name = 'NotfoundError';

    if ('captureStackTrace' in Error) {
      Error.captureStackTrace(this, NotfoundError);
    }
  }
}


export class MethodNotAllowedError extends BaseError {
  constructor(data = 'Метод не поддерживается') {
    super(405, data);

    this.name = 'MethodNotAllowedError';

    if ('captureStackTrace' in Error) {
      Error.captureStackTrace(this, MethodNotAllowedError);
    }
  }
}

export class ValidationError extends BaseError {
  constructor(data = 'Ошибка валидации') {
    super(417, data);

    this.name = 'ValidationError';

    if ('captureStackTrace' in Error) {
      Error.captureStackTrace(this, ValidationError);
    }
  }
}

export class LockedError extends BaseError {
  constructor(data = 'Пользователь заблокирован') {
    super(423, data);

    this.name = 'LockedError';

    if ('captureStackTrace' in Error) {
      Error.captureStackTrace(this, LockedError);
    }
  }
}

export class SyntaxError extends BaseError {
  constructor(data = 'Синтаксическая ошибка') {
    super(500, data);

    this.name = 'LockedError';

    if ('captureStackTrace' in Error) {
      Error.captureStackTrace(this, LockedError);
    }
  }
}

export class ExpiredError extends BaseError {
  constructor(data = 'Время токена истекло') {
    super(419, data);

    this.name = 'ExpiredError';

    if ('captureStackTrace' in Error) {
      Error.captureStackTrace(this, ExpiredError);
    }
  }
}




function checkStatus(status) {
  if (status === 404) {
    throw new NotfoundError({ code: '1.2.1', message: 'Страница не найдена' });
  }
}


export const middlewareErrors = () => async (ctx, next) => {
  try {
    await next();
    checkStatus(ctx['status']);
  }
  catch(error) {

    if (error instanceof ReferenceError) {
      ctx.status = 500;
      ctx.body = { code: '0.0.0', message: error['message'] };
    }
    else if (error instanceof BaseError) {
      ctx.status = error['status'];
      ctx.body = error['data'];
    }
    else {
      ctx.status = 500;
      ctx.body = { code: '1.0.0', message: error['message'] };
    }
  }
};
