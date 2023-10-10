const sendMessage = () => {
    var timeStamp = new Date().getTime() 
    //Get message from input
    var messages = document.querySelector('.chat input').value
    //Get current user
    var user = apiFirebase.getLogin()
    //Get time when message has posted
    var currentTimeStamp = apiFirebase.currentTime()
    //Check when user don't write anything
    
    if (messages !== '') {
        database.ref('message').push().set({
            messages,
            ...user,
            ...currentTimeStamp,
        })
        document.querySelector('.chat input').value = ''
    } else {
        console.log('please write something ');
        return
    }
}

const setChat = (data) => {
    let dataValue = data.val()
    let html = `
    <div class="message" data-id="${data.key}">
   
         <div class="message-auth">
             <div class="auth-avatar avatar">
                 <img src="${dataValue.photoURL}" alt="">
             </div>
         </div>
        
         <div class="message-content">
             <div class="auth-name">
                 ${dataValue.displayName}:
             </div>
             <div class="text">${dataValue.messages}</div>
         </div>
       
        <div class="message-time">
            ${dataValue.timeFormat}
        </div>
 </div>`
    document.querySelector('.middle').appendChild(createElement(html))
}

auth.onAuthStateChanged((user) => {
    if (user) {
       document.querySelector('.chat button.send').addEventListener('click',sendMessage)
       document.querySelector('.bottom-bar').style.display = 'unset'
       document.querySelector('.chat input[type="text"]').onkeyup = (e)=>{
           if(e.which === 13) sendMessage()
       }
    } else {
        document.querySelector('.bottom-bar').style.display = 'none'
    }
})
//Check when database has been added and get it to client 
database.ref('message').on('child_added', (snapshot) =>{
    //Set user chat 
    setChat(snapshot)

})