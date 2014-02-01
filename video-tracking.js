var vidreq = new Object();
        vidreq.ht = '390'
        vidreq.wid = '640'
        vidreq.vid = 'K3O9flJbtnw'

        var tag = document.createElement('script');
        tag.src = "http://www.youtube.com/player_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        var player;
        var lastAction = '';
        var actionCount = 0;
        function onYouTubePlayerAPIReady() {
            player = new YT.Player('player', {
                height: vidreq.ht,
                width: vidreq.wid,
                videoId: vidreq.vid,
                events: {
                    'onStateChange': onPlayerStateChange
                }
            });
        }

        function onPlayerStateChange(event) {
            switch (event.data) {
            case YT.PlayerState.PLAYING:
            	lastAction = 'play'
                actionCount ++
                console.log('played at the current time: ' + player.getCurrentTime() + " and number of actions so far: " + actionCount);
                //console.log('play' + " " + player.getVideoUrl()+ " " + player.getCurrentTime());
                //var startMyInterval=setInterval(function(){myTimer()},1000);
                break;
            case YT.PlayerState.ENDED:
                //TRUE if the user just goes there an plays the video from start to finish
                if (actionCount < 4) {
                    console.log('you watched ' + player.getVideoUrl() + 'til the end! Action count:' + actionCount);
                } else{
                    lastAction = 'end'
                    actionCount ++
                    console.log('end' + " " + player.getVideoUrl() + " " + actionCount);
                }
                break;
            case YT.PlayerState.PAUSED:
                if (lastAction != 'paused' && actionCount != 0) {
                    actionCount ++
                    console.log('paused at the current time: ' + player.getCurrentTime() + " and number of actions so far: " + actionCount);
                    lastAction = 'paused';
                    oldTime = player.getCurrentTime();

                } else if (actionCount != 0){
                	jumpedTime = player.getCurrentTime() - oldTime;
                    actionCount ++;
                    console.log('you jumped ' + jumpedTime + " seconds " + actionCount);
                } else {
                    console.log("you started it in the middle at the " + player.getCurrentTime() + " second mark")
                }
                break;
            }
        }