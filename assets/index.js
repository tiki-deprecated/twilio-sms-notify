const sendNotificationForm = document.getElementById("sendNotificationForm");
const resultSection = document.getElementById("resultSection");

function clearForm(form) {
  // only clearing the passcode and leaving the message for convience
  form.passcode.value = "";
}

sendNotificationForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  resultSection.innerText = "Sending messages. One moment";

  const data = {
    passcode: evt.target.passcode.value,
    message: evt.target.message.value,
    group: evt.target.group.value,
  };

  evt.target.passcode.value = "";

  fetch("send-message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        if (resp.status === 401) {
          throw new Error("Invalid Passcode");
        } else {
          throw new Error(
            "Unexpected error. Please check the logs for what went wrong."
          );
        }
      }
    })
    .then((body) => {
      resultSection.innerText = `Sent !`;
    })
    .catch((err) => {
      resultSection.innerText = err.message;
    });
});
