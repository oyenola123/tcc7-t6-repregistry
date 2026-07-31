export function successResponse(message: string, data: unknown) {
  return Response.json({
    success: true,
    message,
    data,
  });
}

export function errorResponse(message: string, status = 400) {
  return Response.json(
    {
      success: false,
      message,
    },
    { status }
  );
}

