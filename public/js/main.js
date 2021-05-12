// access the form
const chatForm = document.getElementById("chat-form");

const socket = io();

//Message from server
socket.on("message", (message) => {
  console.log(message);
  outputMessage(message);
});

// Message submit
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get message text
  const msg = e.target.elements.msg.value;

  //Emit massage to the server
  socket.emit("chatMassage", msg);
});

// outoutMessage to DOM
function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<p class="meta">Brad <span>9:20pm</span></p>
    <p class="text">
     ${message}
    </p>`;

  document.querySelector(".chat-messages").appendChild(div);
}
