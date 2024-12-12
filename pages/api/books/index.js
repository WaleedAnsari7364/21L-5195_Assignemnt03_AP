import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("bookstore");

    const books = await db.collection("books").find({}).toArray();

    if (books.length === 0) {
      return res.status(404).json({ message: "No books found" });
    }

    res.status(200).json({ books });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
