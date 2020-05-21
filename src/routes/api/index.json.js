import cards from "./../../data/_cards.js";

const contents = JSON.stringify(
  cards.map((card) => {
    return {
      ...card,
    };
  })
);

export function get(req, res) {
  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  res.end(contents);
}
