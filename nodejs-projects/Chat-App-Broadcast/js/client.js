const socket = io("http://localhost:8000", { transports: ["websocket"] });

const sendForm = document.getElementById("send-form");
const inputMessage = document.getElementById("input-message");
const messageContainer = document.getElementById("message-container");

const username = prompt("Enter your name");
socket.emit("new-user-joined", username);

const append = (position, message) => {
    const newMessage = document.createElement("div");
    newMessage.innerText = message;
    newMessage.classList.add("message");
    newMessage.classList.add(position);
    messageContainer.append(newMessage);
};

socket.on("user-joined", (name) => {
    append("left", `${name} joined the chat`);
});

socket.on("receive", (data) => {
    append("left", `${data.name}: ${data.message}`);
});

socket.on("left-chat", (name) => {
    append("left", `${name} left the chat`);
});

sendForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const message = inputMessage.value;
    inputMessage.value = "";

    append("right", `You: ${message}`);

    socket.emit("send", message);
});
