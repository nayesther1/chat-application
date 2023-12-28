const estherSelectorBtn = document.querySelector('#esther-selector')
const keilySelectorBtn = document.querySelector('#keily-selector')
const chatHeader = document.querySelector('.chat-header')
const chatMessages = document.querySelector('.chat-messages')
const chatInputForm = document.querySelector('.chat-input-form')
const chatInput = document.querySelector('.chat-input')
const clearChatBtn = document.querySelector('.clear-chat-button')

const messages = JSON.parse(localStorage.getItem('message')) || []

const createchatMessageElement = (message)=>`
    <div class="message ${message.sender === 'Esther' ? 'blue-bg' : 'gray-bg'}">
        <div class="message-sender">${message.sender}</div>
        <div class="message-text">${message.text}</div>
        <div class="message-timestamp">${message.timestamp}</div>
            </div>
`
window.onload = () => {
    messages.forEach((message)=>{
        chatMessages.innerHTML += createchatMessageElement(message)
    
})
}

let messageSender ='Esther'

const updateMessageSender = (name) => {
messageSender = name
chatHeader.innerText = `${messageSender} chatting...`
chatInput.placeholder = `Type here, ${messageSender}`

if (name === 'esther') {
    estherSelectorBtn.classList.add('active-person')
    keilySelectorBtn.classList.remove('active-person')

}


if (name === 'keily') {
    keilySelectorBtn.classList.add('active-person')
    estherSelectorBtn.classList.remove('active-person')

}

chatInput.focus()
}
estherSelectorBtn.onclick = () =>updateMessageSender('Esther')
keilySelectorBtn.onclick = () =>updateMessageSender('Keily')

const sendMessage = (e) =>{
    e.preventDefault()
    const timestamp = new Date().toLocaleString('en-US', { hour:'numeric', minute: 'numeric', hour12: 'true'})
    const message = {
        sender: messageSender,
        text: chatInput.value,
        timestamp,
    }
    messages.push(message)
    localStorage.setItem('messages', JSON.stringify(message))
    chatMessages.innerHTML += createchatMessageElement(message)
    chatInputForm.reset()
    chatMessages.scrollTop = chatMessages.scrollHeight
}
chatInputForm.addEventListener('submit', sendMessage)

clearChatBtn.addEventListener('click', () => {
    localStorage.clear()
    chatMessages.innerHTML = ''
})