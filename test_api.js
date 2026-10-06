const http = require("http");
const app = require("./app");

const PORT = 3001; // test port
const server = app.listen(PORT, async () => {
  console.log(`Test server running on port ${PORT}`);

  const request = (method, path, body = null) => {
    return new Promise((resolve, reject) => {
      const payload = body ? JSON.stringify(body) : null;
      const options = {
        hostname: "localhost",
        port: PORT,
        path,
        method,
        headers: {
          "Content-Type": "application/json",
          ...(payload ? { "Content-Length": Buffer.byteLength(payload) } : {})
        }
      };

      const req = http.request(options, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          resolve({
            statusCode: res.statusCode,
            body: data ? JSON.parse(data) : null
          });
        });
      });

      req.on("error", reject);
      if (payload) req.write(payload);
      req.end();
    });
  };

  try {
    console.log("\n--- Starting API Tests ---\n");

    // Test 1: GET /
    let res = await request("GET", "/");
    console.log("1. GET / -> Status:", res.statusCode, res.body.message);

    // Test 2: GET /students
    res = await request("GET", "/students");
    console.log("2. GET /students -> Status:", res.statusCode, "Count:", res.body.count);

    // Test 3: GET /students/1
    res = await request("GET", "/students/1");
    console.log("3. GET /students/1 -> Status:", res.statusCode, "Student:", res.body.data.name);

    // Test 4: GET /students/999 (404)
    res = await request("GET", "/students/999");
    console.log("4. GET /students/999 (Expect 404) -> Status:", res.statusCode, res.body.message);

    // Test 5: GET /students/abc (400)
    res = await request("GET", "/students/abc");
    console.log("5. GET /students/abc (Expect 400) -> Status:", res.statusCode, res.body.message);

    // Test 6: POST /students
    res = await request("POST", "/students", { name: "Sneha", course: "MCA" });
    console.log("6. POST /students -> Status:", res.statusCode, "Created:", res.body.data);

    // Test 7: POST /students with invalid body (400)
    res = await request("POST", "/students", {});
    console.log("7. POST /students with {} (Expect 400) -> Status:", res.statusCode, res.body.message);

    // Test 8: PUT /students/1
    res = await request("PUT", "/students/1", { name: "Rahul Sharma" });
    console.log("8. PUT /students/1 -> Status:", res.statusCode, "Updated:", res.body.data);

    // Test 9: PUT /students/999 (404)
    res = await request("PUT", "/students/999", { name: "Ghost" });
    console.log("9. PUT /students/999 (Expect 404) -> Status:", res.statusCode, res.body.message);

    // Test 10: DELETE /students/2
    res = await request("DELETE", "/students/2");
    console.log("10. DELETE /students/2 -> Status:", res.statusCode, "Deleted:", res.body.data.name);

    // Test 11: DELETE /students/999 (404)
    res = await request("DELETE", "/students/999");
    console.log("11. DELETE /students/999 (Expect 404) -> Status:", res.statusCode, res.body.message);

    // Test 12: GET /students (Verify final state)
    res = await request("GET", "/students");
    console.log("12. GET /students (Final count) -> Status:", res.statusCode, "Count:", res.body.count);

    console.log("\n All tests passed successfully!\n");
  } catch (err) {
    console.error("Test failed:", err);
  } finally {
    server.close(() => {
      console.log("Test server closed.");
      process.exit(0);
    });
  }
});
