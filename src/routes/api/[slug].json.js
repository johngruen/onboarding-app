import cards from "../../data/_cards.js";

const ERR_INVALID_SET = "one or more of the card IDs you're using are invalid";
const ERR_NO_PARAMS =
  "In order to query cards, please pass in one or more ids into the ?id= query";

const lookup = new Map();
cards.forEach((card) => {
  lookup.set(card.id, card);
});

export async function get(req, res, next) {
  const { slug } = req.params;

  let data = {
    cards: [],
    status: 200,
    message: "",
  };

  if (slug === "undefined") {
    data.message = ERR_NO_PARAMS;
    data.status = 404;
  } else {
    const cardSet = slug.split(",");
    cardSet.forEach((item) => {
      if (lookup.has(item)) {
        data.cards.push(lookup.get(item));
      } else {
        data.message = ERR_INVALID_SET;
        data.status = 404;
      }
    });
  }

  res.writeHead(data.status, {
    "Content-Type": "application/json",
  });

  res.end(JSON.stringify(data));
}
