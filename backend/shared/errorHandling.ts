class ErrorResponses {
  static NotFound = { status: 404, message: 'Not found' }
  static ServerError = { status: 500, message: 'Server error' };
  static ClientError = (message: string) => ({ status: 400, message });
};

export default ErrorResponses;