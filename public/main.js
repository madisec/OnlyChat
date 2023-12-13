// import moment from "moment"
const socket = io()

const clientTotal = document.getElementById('client-total')
const messageContainer = document.getElementById('message-container')
const nameInput = document.getElementById('name-input')
const messageForm = document.getElementById('message-form')
const messageInput = document.getElementById('message-input')

messageForm.addEventListener('submit', (e) => {
    e.preventDefault()
    sendMEssage()
})


socket.on('clients-total', (data) => {
    clientTotal.innerText = `Clients total: ${data}`
})

function sendMEssage () {
    console.log(messageInput.value)
    const data = {
        name: nameInput.value,
        message: messageInput.value,
        dateTime: new Date(),
    }
    socket.emit('message', data)
    addMessageToUI(true, data)
    messageInput.value = ''
}

socket.on('chat-message', (data) => {
    // console.log(data)
    addMessageToUI(false, data)
})

function addMessageToUI (isOwnMessage, data) {
    const element = `
    <li class="${isOwnMessage ? "message-right" : "message-left"}">
    <p class="message">
      ${data.message}
      <span>${data.name} - ${data.dateTime}</span>
    </p>
  </li>
  `
    messageContainer.innerHTML += element;
    scrollToBottom()
}

function scrollToBottom () {
    messageContainer.scrollTo(0, messageContainer.scrollHeight)
}