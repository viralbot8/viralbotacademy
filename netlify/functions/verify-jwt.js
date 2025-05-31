exports.handler = async (event) => {
  console.log("✅ verify-jwt function was triggered");
  return {
    statusCode: 200,
    body: JSON.stringify({ valid: true })
  };
};
