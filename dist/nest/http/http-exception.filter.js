var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
            ? (desc = Object.getOwnPropertyDescriptor(target, key))
            : desc,
      d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return (c > 3 && r && Object.defineProperty(target, key, r), r);
  };
import { Catch, HttpException, Injectable } from "@nestjs/common";
import { response } from "express";
let HttpErrorFilter = class HttpErrorFilter {
  catch(exception, host) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    let status = 500;
    let body = { error: "internal_error" };
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const response = exception.getResponse();
      if (typeof response === "object") {
        body = response;
      } else {
        body = { error: String(response) };
      }
    }
    if (
      exception instanceof HttpException &&
      typeof exception.getResponse() === "object" &&
      exception.getStatus() === 404
    ) {
      status = 404;
      body = { error: "not_found" };
    }
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(status).json(body);
  }
};
HttpErrorFilter = __decorate([Injectable(), Catch()], HttpErrorFilter);
export { HttpErrorFilter };
//# sourceMappingURL=http-exception.filter.js.map
