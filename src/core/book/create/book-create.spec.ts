describe("Create book", () => {
  const url = "http://localhost:3000/api/books";

  it("POST to /books should return 201", async () => {
    const body = {
      title: "Title test",
      author: "Author test",
      publishedYear: 2024
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })

    expect(response.status).toBe(201);

  }, 30000)

  it("POST to /books should return 400 if publishedYear is invalid", async () => {
    const body = {
      title: "Livro Teste",
      author: "Author test",
      publishedYear: "invalid year",
    };

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    expect(response.status).toBe(400);
  }, 30000);


  it("POST to /books should return 409 if the book title already exists", async () => {
    const body = {
      title: "O Senhor dos Anéis",
      author: "Author test",
      publishedYear: 2024
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })

    expect(response.status).toBe(409);

  }, 30000)
})