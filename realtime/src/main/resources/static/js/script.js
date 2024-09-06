// Captura dos "Elements"

// Login elements
const login = document.querySelector(".login");
const loginForm = login.querySelector(".login__form");
const loginInput = login.querySelector(".login__input");

// Chat elements
const chat = document.querySelector(".chat");
const chatForm = chat.querySelector(".chat__form");
const chatInput = chat.querySelector(".chat__input");
const chatMessages = chat.querySelector(".chat__messages");

const colors = [
    "cadetblue",
    "darkgoldenrod",
    "cornflowerblue",
    "darkkhaki",
    "hotpink",
    "gold",
];

const user = { id: "", name: "", color: "" };
let websocket;

const createMessageSelfElement = (content) => {
    const div = document.createElement("div");

    div.classList.add("message--self");
    div.innerHTML = content;

    return div;
};

const createMessageOtherElement = (content, sender, senderColor) => {
    const div = document.createElement("div");
    const span = document.createElement("span");

    div.classList.add("message--other");

    span.classList.add("message--sender");
    span.style.color = senderColor;

    div.appendChild(span);

    span.innerHTML = sender;
    div.innerHTML += content;

    return div;
};

// Adopts getRandomColor function from original code

// Scroll automático
const scrollScreen = () => {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
    });
};

const processMessage = ({ data }) => {
    const { userId, userName, userColor, content } = JSON.parse(data);

    const message =
        userId === user.id
            ? createMessageSelfElement(content)
            : createMessageOtherElement(content, userName, userColor);

    chatMessages.appendChild(message);

    scrollScreen();
};

// Connect using WebSocket protocol and subscribe to the provided channel
function connect() {
    websocket = new WebSocket("ws://localhost:8080/conect"); // Replace with your actual WebSocket URL

    websocket.onopen = function () {
        console.log("Conectado ao servidor!");
        websocket.subscribe("/canal"); // Subscribe to the chat channel
    };

    websocket.onmessage = processMessage;

    websocket.onerror = function (error) {
        console.error("Erro na conexão:", error);
        // Handle connection errors gracefully (e.g., display error message to the user)
    };
}

const handleLogin = (event) => {
    event.preventDefault();

    user.id = crypto.randomUUID();
    user.name = loginInput.value;
    user.color = getRandomColor();

    login.style.display = "none";
    chat.style.display = "flex";

    connect(); // Connect to the WebSocket server after login
};

const sendMessage = (event) => {
    event.preventDefault();

    const message = {
        userId: user.id,
        userName: user.name,
        userColor: user.color,
        content: chatInput.value,
    };

    websocket.send(JSON.stringify(message));

    chatInput.value = "";
};

loginForm.addEventListener("submit", handleLogin);
chatForm.addEventListener("submit", sendMessage);