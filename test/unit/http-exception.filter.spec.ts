import { BadRequestException, HttpException, HttpStatus } from "@nestjs/common";
import { HttpErrorFilter } from "../../src/nest/http/http-exception.filter";
import { Issue } from "../../src/nest/echo/api-error.type";

function hostMock() {
  const json = jest.fn();

  const res = {
    status: jest.fn().mockReturnThis(),
    json,
  };

  const host = {
    switchToHttp: () => ({
      getResponse: () => res,
    }),
  } as any;

  return { host, status: res.status, json };
}

describe("HttpErrorFilter", () => {
  it("must return 404 route_not_found when the route does not exist", () => {
    const filter = new HttpErrorFilter();
    const { host, status, json } = hostMock();
    const exception = new HttpException("not found", HttpStatus.NOT_FOUND);

    filter.catch(exception, host as any);

    expect(status).toHaveBeenCalledWith(404);
    expect(json).toHaveBeenCalledWith({
      status: 404,
      code: "not_found",
      message: "Route not found",
    });
  });

  it("must return 415 unsupported_media_type when the media type is not application/json", () => {
    const filter = new HttpErrorFilter();
    const { host, status, json } = hostMock();
    const exception = new HttpException(
      "unsupported_media_type",
      HttpStatus.UNSUPPORTED_MEDIA_TYPE,
    );

    filter.catch(exception, host as any);

    expect(status).toHaveBeenCalledWith(415);
    expect(json).toHaveBeenCalledWith({
      status: 415,
      code: "unsupported_media_type",
      message: "Unsupported media type",
    });
  });

  it("must return 400 validation_error and the list of issues when the type of the values in the request are not valid", () => {
    const filter = new HttpErrorFilter();
    const { host, status, json } = hostMock();
    const mockIssues: Issue[] = [
      {
        path: "hello",
        code: "minLength",
        message: "hello must be longer than or equal to 1 characters",
      },
      { path: "n", code: "min", message: "n must not be less than 0" },
    ];
    const exception = new BadRequestException({
      error: "validation_error",
      issues: mockIssues,
    });

    filter.catch(exception, host as any);

    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 400,
        code: "validation_error",
        issues: expect.arrayContaining<Issue>([
          expect.objectContaining({
            path: expect.any(String),
            code: expect.any(String),
            message: expect.any(String),
          }),
        ]),
      }),
    );
  });

  it("must return 400 invalid_json when the json is not valid", () => {
    const filter = new HttpErrorFilter();
    const { host, status, json } = hostMock();
    const exception = new SyntaxError("invalid_json");

    filter.catch(exception, host as any);

    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith({
      status: 400,
      code: "invalid_json",
      message: "Invalid JSON body",
    });
  });

  it("must return 405 method_not_allowed when the method used is not valid for the endpoint", () => {
    const filter = new HttpErrorFilter();
    const { host, status, json } = hostMock();
    const exception = new HttpException(
      "method_not_allowed",
      HttpStatus.METHOD_NOT_ALLOWED,
    );

    filter.catch(exception, host as any);

    expect(status).toHaveBeenCalledWith(405);
    expect(json).toHaveBeenCalledWith({
      status: 405,
      code: "method_not_allowed",
      message: "Method not allowed",
    });
  });

  it("must return 400 bad_request request is not valid", () => {
    const filter = new HttpErrorFilter();
    const { host, status, json } = hostMock();
    const exception = new HttpException({}, HttpStatus.BAD_REQUEST);

    filter.catch(exception, host as any);

    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith({
      status: 400,
      code: "bad_request",
      message: "Bad Request",
    });
  });

  it("must return a http_error for unhandled HttpExceptions", () => {
    const filter = new HttpErrorFilter();
    const { host, status, json } = hostMock();
    const exception = new HttpException(
      "Too Many Requests",
      HttpStatus.TOO_MANY_REQUESTS,
    );

    filter.catch(exception, host as any);

    expect(status).toHaveBeenCalledWith(429);
    expect(json).toHaveBeenCalledWith({
      status: 429,
      code: "http_error",
      message: "Too Many Requests",
    });
  });

  it("must return 500 internal_error for unexpected non-HttpException errors", () => {
    const filter = new HttpErrorFilter();
    const { host, status, json } = hostMock();
    const exception = new Error("boom");

    filter.catch(exception, host as any);

    expect(status).toHaveBeenCalledWith(500);
    expect(json).toHaveBeenCalledWith({
      status: 500,
      code: "internal_error",
      message: "Internal Server Error",
    });
  });
});
