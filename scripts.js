const submit = document.getElementById('btn');
const displayEvents = document.getElementById('today-events');
const mailId = document.getElementById('mail-inp');
const dateId = document.getElementById('date-inp');
const nameId = document.getElementById('name');

chrome.storage.sync.get(['Events'],(param)=>{
    if(param.Events) {
        for(let i of param.Events) {
            let vals = i[1].split('-');
            let y = vals[0];
            let m = Number(vals[1]);
            let d = Number(vals[2]);

            let today = new Date();
            let tm = today.getMonth() + 1;
            let td = today.getDate();
            if(m==tm && d==td) {
                let ll = document.createElement('li');
                ll.textContent = `Today is ${i[2]}'s birthday`;

                let wish = document.createElement('a');
                wish.textContent = 'Wish him/her';
                wish.href = `mailto:${i[0]}`;

                displayEvents.appendChild(ll);
                displayEvents.appendChild(wish);

                var birthdayNotify = {
                    type: "basic",
                    iconUrl: "icon48.png",
                    title: "",
                    message: `Today is ${i[2]}'s birthday`
                };
                chrome.notifications.create('eventOcc', birthdayNotify);
            }
        }
    }
})
submit.addEventListener("click",()=>{
    let Email = mailId.value;
    let Date = dateId.value;
    let Name = nameId.value;
    
    
    if(Email && Date && Name){
        var successNotify = {
            type: "basic",
            iconUrl: "./birthday.png",
            title: "",
            message: "Remainder added successfully."
        };
        chrome.notifications.create('saved', successNotify);
    
        chrome.storage.sync.get({Events:[]},function(data){
            let event = data.Events;
            event.push([Email,Date,Name]);
            chrome.storage.sync.set({Events: event},()=>{})
        });
        
    }
})
