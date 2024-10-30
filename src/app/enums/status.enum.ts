enum Status {
  // Successful responses
  OK = 200,
  CREATED = 201,

  // Client error responses
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  UNPROCESSABLE_CONTENT = 422,
  // Server error responses
  INTERNAL_SERVER_ERROR = 500,
}

export default Status;
