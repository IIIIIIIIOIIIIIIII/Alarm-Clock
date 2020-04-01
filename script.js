let alarmClockApp = new Vue({
    el: '#app',
    data: {
       time: {
           hours: 0,
           minutes: 0,
           seconds: 0    
       },
       track: {
           imgStorage: ['img/astley.jpg', 
                        'img/darude.jpg', 
                        'img/dre.jpg', 
                        'img/gunther.jpg', 
                        'img/helford.jpg'],
           trackNameStorage: ['Rick Astley - Never Gonna Give You Up', 
                              'Darude - Sandstrom', 
                              'Dr.Dre feat. Snoop Dog - Still Dre', 
                              'Gunther & the Sunshine Girls - Ding Dong Song', 
                              'Judas Priest - Painkiller'],
           currentTrackNumber: 0,
           trackPictureSrc: 'img/astley.jpg',
           trackName: 'Rick Astley - Never Gonna Give You Up'
       }               
    },
    computed: {
        showHours(){
            if(this.time.hours < 10) return '0' + this.time.hours;
            else return this.time.hours;
        },
        showMinutes(){
            if(this.time.minutes < 10) return '0' + this.time.minutes;
            else return this.time.minutes;
        },
        showSeconds(){
            if(this.time.seconds < 10) return '0' + this.time.seconds;
            else return this.time.seconds;
        }
    },
    methods: {
       getNextTrack(){
           ++this.track.currentTrackNumber;
           if(this.track.currentTrackNumber > 4){
               this.track.currentTrackNumber = 0;
               this.track.trackPictureSrc = 'img/astley.jpg';
               this.track.trackName = 'Rick Astley - Never Gonna Give You Up';           
           };           
           
           this.track.trackPictureSrc = this.track.imgStorage[this.track.currentTrackNumber];
           this.track.trackName = this.track.trackNameStorage[this.track.currentTrackNumber];           
           
           console.log(this.track.currentTrackNumber)
           console.log(this.track.trackPictureSrc)
           console.log(this.track.trackName)
       },
       getPreviousTrack(){
           --this.track.currentTrackNumber;           

           if(this.track.currentTrackNumber < 0){
               this.track.currentTrackNumber = 4;
           };
           
           this.track.trackPictureSrc = this.track.imgStorage[this.track.currentTrackNumber];
           this.track.trackName = this.track.trackNameStorage[this.track.currentTrackNumber];
           
           console.log(this.track.currentTrackNumber)
           console.log(this.track.trackPictureSrc)
           console.log(this.track.trackName)
       },
       setAlarm(){ 
           let alarmClock = document.getElementById('app');
           for(let i = 0; i < alarmClock.children.length; i++){
                if(alarmClock.children[i].dataset.property == 'hide'){
                    alarmClock.children[i].style.visibility = 'hidden';
                };
            };     
           let userHours = document.getElementById('hours').textContent;
           let userMinutes = document.getElementById('minutes').textContent;
           let userSeconds = document.getElementById('seconds').textContent;
           let userTime = userHours + userMinutes + userSeconds;

           let checkedHours, checkedMinutes, checkedSeconds;
           let checkedTime = '';

           let timer = setInterval(() => {
                let date = new Date();
                checkedHours = String(date.getHours());
                if(checkedHours < 10) {
                    checkedHours = '0' + checkedHours;
                };
                
                checkedMinutes = String(date.getMinutes());
                if(checkedMinutes < 10) {
                    checkedMinutes = '0' + checkedMinutes;
                };
                
                checkedSeconds = date.getSeconds();
                if(checkedSeconds < 10) {
                    checkedSeconds = '0' + checkedSeconds
                };
                
                checkedTime = checkedHours + checkedMinutes + checkedSeconds;

                if(userTime === checkedTime){
                    console.log('Hello!');
                    let audio = document.createElement('audio');
                    audio.src = 'sounds/' + this.track.trackName + '.mp3';
                    audio.autoplay = true;
                    alarmClock.appendChild(audio);
                    clearInterval(timer);
                };

                console.log('user: ' + userTime + ' ' + typeof(userTime))
                console.log('checked: ' + checkedTime + ' ' + typeof(checkedTime));
           }, 1000);
           
           

        

           

           
       },
       setTimeUp(event){
           let target = event.target;
           
           if(target.id == 'hoursUp' && this.time.hours < 24){
               this.time.hours++;
           }
           if(target.id == 'hoursUp' && this.time.hours == 24){
               this.time.hours = 0;
           }

           if(target.id == 'minutesUp'){
            this.time.minutes++;
           }
           if(target.id == 'minutesUp' && this.time.minutes == 60){
                this.time.minutes = 0;
           }

           if(target.id == 'secondsUp'){
            this.time.seconds++;
           }
           if(target.id == 'secondsUp' && this.time.seconds == 60){
                this.time.seconds = 0;
           }
        },
        setTimeDown(event){
            let target = event.target;

            if(target.id == 'hoursDown' && this.time.hours > 0){
                this.time.hours--;
            }
            if(target.id == 'hoursDown' && this.time.hours == 0){
                this.time.hours = 23;
            }            
 
            if(target.id == 'minutesDown' && this.time.minutes > 0){
                this.time.minutes--;
            }
            if(target.id == 'minutesDown' && this.time.minutes == 0){
                this.time.minutes = 59;
            }
 
            if(target.id == 'secondsDown' && this.time.seconds > 0){
                this.time.seconds--;
            }
            if(target.id == 'secondsDown' && this.time.seconds == 0){
                this.time.seconds = 59;
            };
        }
    }
})

