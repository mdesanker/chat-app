// Make connection
const socket = io();
// const socket = io.connect("http://localhost:5000");

// Elements
const message = document.querySelector("#message");
const handle = document.querySelector("#handle");
const btn = document.querySelector("#send");
const output = document.querySelector("#output");

// Emit events
btn.addEventListener("click", () => {
  socket.emit("chat", {
    handle: handle.value,
    message: message.value,
  });
});

// Listen for events
socket.on("chat", (data) => {
  output.innerHTML += `<p><strong>${data.handle}</strong> ${data.message}</p>`;
});
