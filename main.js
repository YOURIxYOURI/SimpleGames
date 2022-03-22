function getDocument(address, source, post, destName) {
	if (destName===undefined)
		destName='#content'
	if (post===undefined)
		post=''
	const comm = new XMLHttpRequest()

    return new Promise((resolve, reject) => {
      
        comm.onreadystatechange= function() {
            console.log('OPERATION')
            if (comm.readyState === 4) {
                if (comm.status === 200) {
                    window.history.replaceState('', '', "?site="+source);
                    document.querySelector(destName).innerHTML = comm.responseText
                    resolve('Success!');		
                }
            }
        }
        
        comm.open('POST',address)
        comm.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        comm.send(post)
        
    });
}

function addEvents() {
    document.querySelectorAll("#restart-ttt").forEach( v => {	
        v.onclick = () => {
            window.location.href = v.dataset.href
        }
    })
    var info = document.querySelector('#info')
    info.innerHTML = "Now play circle"
}

// TICK TACK TOE ------------------------------------------------------------------------------------------------------------------------------------------------------------

var badge = 'o'
function move(cancel) {
    document.querySelectorAll("td").forEach( v => {	
        v.onclick = () => {
            if (cancel == 1) {
                return
            }
            if (v.dataset.badge == "x" || v.dataset.badge == "o") {
                info.innerHTML = "choose free field"
            }else {
                v.dataset.badge = badge
                let img = document.createElement('img');
                img.src = "./img/"+badge+".png"
                v.appendChild(img)
                //alert(badge)
                if(badge == 'x') {
                    badge = 'o'
                    winner = "cross"
                    info.innerHTML = "Now play circle"
                }else{
                    badge = 'x'
                    winner = "circle"
                    info.innerHTML = "Now play cross"
                }
                check_victory()
            }
        }
    })	
}

function check_victory() {
    var check = document.querySelectorAll("td")
    var info = document.querySelector('#info')
    if ((check[0].dataset.badge == check[1].dataset.badge) && (check[1].dataset.badge == check[2].dataset.badge)) {
        info.innerHTML = "winner is " + winner +" !!!"
        move(1)
    }
    if ((check[3].dataset.badge == check[4].dataset.badge) && (check[4].dataset.badge == check[5].dataset.badge)) {
        info.innerHTML = "winner is " + winner +" !!!"
        move(1)
    }
    if ((check[6].dataset.badge == check[7].dataset.badge) && (check[1].dataset.badge == check[8].dataset.badge)) {
        info.innerHTML = "winner is " + winner +" !!!"
        move(1)
    }
    if ((check[0].dataset.badge == check[3].dataset.badge) && (check[3].dataset.badge == check[6].dataset.badge)) {
        info.innerHTML = "winner is " + winner +" !!!"
        move(1)
    }
    if ((check[1].dataset.badge == check[4].dataset.badge) && (check[4].dataset.badge == check[7].dataset.badge)) {
        info.innerHTML = "winner is " + winner +" !!!"
        move(1)
    }
    if ((check[2].dataset.badge == check[5].dataset.badge) && (check[5].dataset.badge == check[8].dataset.badge)) {
        info.innerHTML = "winner is " + winner +" !!!"
        move(1)
    }
    if ((check[2].dataset.badge == check[4].dataset.badge) && (check[4].dataset.badge == check[6].dataset.badge)) {
        info.innerHTML = "winner is " + winner +" !!!"
        move(1)
    }
    if ((check[0].dataset.badge == check[4].dataset.badge) && (check[4].dataset.badge == check[8].dataset.badge)) {
        info.innerHTML = "winner is " + winner +" !!!"
        move(1)
    }
}

// HANGMAN ------------------------------------------------------------------------------------------------------------------------------------------------------------

function restart_hg() {
    window.location.href = 'hangman.html'
}

function gameStart() {
    let word = document.querySelector('#word').value
    if (word == '' || !/^[a-zA-ZąęółAĄĘÓŁ]+$/.test(word)){
        document.querySelector('#info-hg').innerHTML = "Enter valid form of word"
        return
    }
    else{
        var check = 1
    }
    if (check == 1) {
        word = word.toUpperCase()
        getDocument('hanggame.html', 'hanggame.html').then(() => (gameSet(word)))
    }
}

var table

function gameSet(word) {
    table = word.split('');
    table.forEach((char, index) =>{
        let a = document.createElement("div")
        a.id = "index"+index
        a.class = "char-box"
        document.querySelector('#charOfWord').appendChild(a)
    })
    return table
}

var guess_string = ''
var good_chars = 0
var image_value = 0

function checkChar() {
    var table_length = table.length
    var valid = true
    var char_true = 0
    var user_char = document.querySelector("#char").value
    user_char = user_char.toUpperCase()
    if (user_char.length != 1 || user_char == '' || !/^[a-zA-ZąęółAĄĘÓŁ]+$/.test(user_char)){
        document.querySelector('#info-hgame').innerHTML = "Enter valid form of letter"
        valid = false  
    }
    if (valid) {
        table.forEach((char, index,) => {
            if(char == user_char) {
                char_true = 1
                document.querySelector("#index"+index).innerHTML = user_char
                good_chars++
                document.querySelector('#info-hgame').innerHTML = ""
                document.querySelector("#char").value = ""
            }
        })
        guess_string = guess_string + user_char + ", " 
        if(char_true == 0) {
            image_value++
            document.querySelector("#img-hg").src = "./img/hangman" + image_value + ".png"
        }
        if(good_chars == table_length) {
            document.querySelector('#info-hgame').innerHTML = "You have been saved from the gallows"
        }
        if(image_value == 10) {
            document.querySelector('#info-hgame').innerHTML = "You ended up on the gallows"
        }
        char_true = 0
    }
    document.querySelector("#char").value = ""
    document.querySelector("#guess-list").innerHTML = guess_string
}

// CHESS -----------------------------------------------------------------------------------------------------------------------------------------------------------------


