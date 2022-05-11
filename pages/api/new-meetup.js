// /api/new-meetup
// POST /api/new-meetup

function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const { address, description, image, title } = data;
  }
}

export default handler;
