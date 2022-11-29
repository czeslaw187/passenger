import Pusher from "pusher";

export const pusher = new Pusher({
  appId: process.env.NEXT_PUBLIC_PUSHER_APPID,
  key: '6a57e9a755ca2823cf03',
  secret: process.env.NEXT_PUBLIC_PUSHER_SECRET,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
  useTLS: true,
});

export default async function handler(req, res) {
  const { message } = req.body;
  await pusher.trigger("chat", "chat-event", {
    message,
  });

  res.json({ message: "completed" });
}