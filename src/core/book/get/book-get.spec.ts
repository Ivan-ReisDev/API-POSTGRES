describe("Get books", () => {

    const url = "http://localhost:8080/api/books";

    it("GET to /books should return 200", async () => {

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })

        expect(response.status).toBe(200);

    }, 30000)

    it("GET to /books should return 200", async () => {
        const title = "O Senhor dos Anéis"
        const response = await fetch(`${url}?title=${title}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })

        expect(response.status).toBe(200);

    }, 30000)

    it("GET to /books should return 404 not found", async () => {

        const title = "NOME QUE NÃO EXISTE"
        const response = await fetch(`${url}?title=${title}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })

        expect(response.status).toBe(404);

    }, 30000)


})