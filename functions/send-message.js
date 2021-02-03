const crypto = require("crypto");

exports.handler = function (context, event, callback) {
  console.log("in function");
  const groupSid =
    event.group === "ALL"
      ? process.env.SIGNUP_SERVICE_ID
      : process.env.PARTICIPATE_SERVICE_ID;

  console.log("groupSid: " + groupSid);

  const hash = crypto.createHash("sha512");
  const hashPasscode = hash.update(event.passcode, "utf-8");
  const passcode = hashPasscode.digest("hex");

  if (passcode !== context.PASSCODE) {
    const response = new Twilio.Response();
    response.setStatusCode(401);
    response.setBody("Invalid passcode");
    return callback(null, response);
  }

  const client = context.getTwilioClient();
  const notificationOpts = {
    tag: "all",
    body: event.message,
  };

  client.notify
    .services(groupSid)
    .notifications.create(notificationOpts)
    .then((notification) => {
      console.log("sent");
      return callback(null, { notification });
    })
    .catch((error) => {
      console.error(error);
      return callback("Failed to fetch messages");
    });
};
