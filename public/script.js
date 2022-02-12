// Make connection
const socket = io();
// const socket = io.connect("http://localhost:5000");

// Elements
const message = document.querySelector("#message");
const handle = document.querySelector("#handle");
const btn = document.querySelector("#send");
const output = document.querySelector("#output");
const feedback = document.querySelector("#feedback");

// Emit events
btn.addEventListener("click", () => {
  socket.emit("chat", {
    handle: handle.value,
    message: message.value,
  });
  message.value = "";
});

message.addEventListener("keydown", () => {
  socket.emit("typing", handle.value);
});

// Listen for events
socket.on("chat", (data) => {
  feedback.innerHTML = "";
  output.innerHTML += `<p><strong>${data.handle}</strong> ${data.message}</p>`;
});

socket.on("typing", (data) => {
  feedback.innerHTML = `<p>${data} is typing a message...</p>`;
});
