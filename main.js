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

function chess_gameSet() {
    document.querySelectorAll("td").forEach( v => {
        var img = document.createElement('img');
        if(v.dataset.y ==  '2') {
            img.src = "./img/footmanw.png"
            img.className = "footman figure"
            img.dataset.color = "white"
            img.dataset.x = v.dataset.x
            img.dataset.y = v.dataset.y
            v.appendChild(img)
        }
        if(v.dataset.y ==  '7') {
            img.src = "./img/footmanb.png"
            img.className = "footman figure"
            img.dataset.color = "black"
            img.dataset.x = v.dataset.x
            img.dataset.y = v.dataset.y
            v.appendChild(img)
        }
        if((v.dataset.y ==  '1' && v.dataset.x == "1") || (v.dataset.y ==  '1' && v.dataset.x == "8")) {
            img.src = "./img/towerw.png"
            img.className = "tower figure"
            img.dataset.color = "white"
            img.dataset.x = v.dataset.x
            img.dataset.y = v.dataset.y
            v.appendChild(img)
        }
        if((v.dataset.y ==  '8' && v.dataset.x == "1") || (v.dataset.y ==  '8' && v.dataset.x == "8")) {
            img.src = "./img/towerb.png"
            img.className = "tower figure"
            img.dataset.color = "black"
            img.dataset.x = v.dataset.x
            img.dataset.y = v.dataset.y
            v.appendChild(img)
        }
        if((v.dataset.y ==  '8' && v.dataset.x == "2") || (v.dataset.y ==  '8' && v.dataset.x == "7")) {
            img.src = "./img/horseb.png"
            img.className = "horse figure"
            img.dataset.color = "black"
            img.dataset.x = v.dataset.x
            img.dataset.y = v.dataset.y
            v.appendChild(img)
        }
        if((v.dataset.y ==  '1' && v.dataset.x == "2") || (v.dataset.y ==  '1' && v.dataset.x == "7")) {
            img.src = "./img/horsew.png"
            img.className = "horse figure"
            img.dataset.color = "white"
            img.dataset.x = v.dataset.x
            img.dataset.y = v.dataset.y
            v.appendChild(img)
        }
        if((v.dataset.y ==  '1' && v.dataset.x == "3") || (v.dataset.y ==  '1' && v.dataset.x == "6")) {
            img.src = "./img/bishopw.png"
            img.className = "bishop figure"
            img.dataset.color = "white"
            img.dataset.x = v.dataset.x
            img.dataset.y = v.dataset.y
            v.appendChild(img)
        }
        if((v.dataset.y ==  '8' && v.dataset.x == "3") || (v.dataset.y ==  '8' && v.dataset.x == "6")) {
            img.src = "./img/bishopb.png"
            img.className = "bishop figure"
            img.dataset.color = "black"
            img.dataset.x = v.dataset.x
            img.dataset.y = v.dataset.y
            v.appendChild(img)
        }
        if(v.dataset.y ==  '8' && v.dataset.x == "4") {
            img.src = "./img/queenb.png"
            img.className = "queen figure"
            img.dataset.color = "black"
            img.dataset.x = v.dataset.x
            img.dataset.y = v.dataset.y
            v.appendChild(img)
        }
        if(v.dataset.y ==  '1' && v.dataset.x == "4") {
            img.src = "./img/queenw.png"
            img.className = "queen figure"
            img.dataset.color = "white"
            img.dataset.x = v.dataset.x
            img.dataset.y = v.dataset.y
            v.appendChild(img)
        }
        if(v.dataset.y ==  '1' && v.dataset.x == "5") {
            img.src = "./img/kingw.png"
            img.className = "king figure"
            img.dataset.color = "white"
            img.dataset.x = v.dataset.x
            img.dataset.y = v.dataset.y
            v.appendChild(img)
        }
        if(v.dataset.y ==  '8' && v.dataset.x == "5") {
            img.src = "./img/kingb.png"
            img.className = "king figure"
            img.dataset.color = "black"
            img.dataset.x = v.dataset.x
            img.dataset.y = v.dataset.y
            v.appendChild(img)
        }
    })
    chess_move()
}
var now_play = 'white'
var checked_figure
var checked = 0
function chess_move() {
    document.querySelectorAll(".figure").forEach( v => {
        v.onclick = (e) => {
            if(checked == 1) {
                if (v.firstChild == checked_figure) {
                    console.log(checked)
                    checked = 0 
                    v.setAttribute('id', '')
                    console.log(checked)
                    e.stopPropagation()
                }
            }else{
                checked = 1
                checked_figure = v
                if(checked_figure.dataset.color == now_play) {
                    checked_figure.setAttribute('id', 'choosed')
                }
                else{
                    checked = 0
                    checked_figure = ""
                }
                e.stopPropagation()
                // console.log(checked_figure)
                document.querySelectorAll("td").forEach( v2 => {
                    v2.onclick = (e) => {
                        var child = v2.firstChild
                        console.log("test")
                        console.log(child)
                        if(check_move(checked_figure, v2.dataset.x, v2.dataset.y, child, now_play)) {
                            if(checked == 1) {
                                if(child != null) {
                                    console.log('figura')
                                    if (child.dataset.color != checked_figure.dataset.color) {
                                        console.log('bicie')
                                        child.remove()
                                        v2.appendChild(checked_figure)
                                        checked_figure.dataset.x = v2.dataset.x
                                        checked_figure.dataset.y = v2.dataset.y
                                        checked = 0 
                                        checked_figure.setAttribute('id', '')
                                        checked_figure = ""
                                        if(now_play == "white") {
                                            now_play = "black"
                                        }
                                        else{
                                            now_play = "white"
                                        }
                                    }else if (child.dataset.color == checked_figure.dataset.color) {
                                        console.log('sojusznik')
                                        checked = 0 
                                        checked_figure.setAttribute('id', '')
                                        checked_figure = ""
                                    }
                                }else {
                                    checked_figure.dataset.x = v2.dataset.x
                                    checked_figure.dataset.y = v2.dataset.y
                                    v2.appendChild(checked_figure)
                                    checked = 0 
                                    checked_figure.setAttribute('id', '')
                                    checked_figure = ""
                                    if(now_play == "white") {
                                        now_play = "black"
                                    }
                                    else{
                                        now_play = "white"
                                    }
                                }
                            }
                        }
                        else {
                            console.log('zle pole')
                            checked = 0 
                            checked_figure.setAttribute('id', '')
                            checked_figure = ""
                        }    
                    }
                })
            } 
        }
    })
}

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
var bishop_move_x
var bishop_move_y
var white_king_move = 0
var black_king_move = 0
var control = 0
function check_move(figure, vectorX, vectorY, field_child, who) {
    if(figure.dataset.color == who) {
        if(figure.className == "footman figure") {
            if(figure.dataset.color == "black") {
                if(field_child == null) {
                    console.log("puste foot")
                    if(figure.dataset.y != "7") {
                        if(((parseInt(figure.dataset.y - vectorY)) == 1) && (parseInt(figure.dataset.x) == parseInt(vectorX))) {
                            return true
                        }
                    }else{
                        if((((parseInt(figure.dataset.y) - parseInt(vectorY)) == 2) || ((parseInt(figure.dataset.y) - parseInt(vectorY)) == 1))  && (parseInt(figure.dataset.x) == parseInt(vectorX))) {
                            if(parseInt(figure.dataset.y) - parseInt(vectorY) == 2) {
                                var check_y = figure.dataset.y
                                var check_x = figure.dataset.x
                                var id = '#' + letters[check_x - 1] +""+(parseInt(check_y) - 1)
                                console.log(id)
                                var check_field = document.querySelector(id).firstChild
                                if(check_field != null) {
                                    return false
                                }
                            }
                            return true
                        }
                    }
                }else if(field_child.dataset.color == "white") {
                    console.log("wrog foot")
                    if((parseInt(figure.dataset.y - vectorY)) == 1 && ((parseInt(figure.dataset.x - vectorX) == 1) || (parseInt(figure.dataset.x - vectorX) == -1) )) {
                        return true
                    }
                }
            }
            if(figure.dataset.color == "white") {
                if(field_child == null) {
                    console.log("puste foot")
                    if(figure.dataset.y != "2") {
                        if(((parseInt(figure.dataset.y - vectorY)) == -1) && (parseInt(figure.dataset.x) == parseInt(vectorX))) {
                            return true
                        }
                    }else{
                        if((((parseInt(figure.dataset.y) - parseInt(vectorY)) == -2) || ((parseInt(figure.dataset.y) - parseInt(vectorY)) == -1))  && (parseInt(figure.dataset.x) == parseInt(vectorX))) {
                            if(parseInt(figure.dataset.y) - parseInt(vectorY) == -2) {
                                var check_y = figure.dataset.y
                                var check_x = figure.dataset.x
                                var id = '#' + letters[check_x - 1] +""+(parseInt(check_y) + 1)
                                console.log(id)
                                var check_field = document.querySelector(id).firstChild
                                if(check_field != null) {
                                    return false
                                }
                            }
                            return true
                        }
                    }
                }else if(field_child.dataset.color == "black") {
                    console.log("wrog foot")
                    if((parseInt(figure.dataset.y - vectorY)) == -1 && ((parseInt(figure.dataset.x - vectorX) == 1) || (parseInt(figure.dataset.x - vectorX) == -1) )) {
                        return true
                    }
                }
            }
            console.log("false foot")
            return false
        }
        if((figure.className == "tower figure") || (figure.className == "queen figure")) {
            var check_x = figure.dataset.x
            var check_y = figure.dataset.y
            if(figure.dataset.y < vectorY) {
                bishop_move_y = "++"
                console.log("gora")
            }
            else if(figure.dataset.y > vectorY) {
                bishop_move_y = "--"
                console.log("dol")
            }
            else {
                bishop_move_y = ""
            }
            if(figure.dataset.x < vectorX) {
                bishop_move_x = "++"
                console.log("prawo")
            }
            else if(figure.dataset.x > vectorX) {
                bishop_move_x = "--"
                console.log("lewo")
            }
            else {
                bishop_move_x = ""
            }
            if((bishop_move_x != "") && (bishop_move_y != "")) {
                console.log("queen")
            }else {
                if((vectorX != figure.dataset.x) && (vectorY != figure.dataset.y)) {
                    control = 0
                }
                do{
                    if(bishop_move_x == "++") {
                        check_x++
                        console.log({check_x})
                    }else if(bishop_move_x == "--"){
                        check_x--
                        console.log({check_x})
                    }
                    if(bishop_move_y == "++") {
                        check_y++
                        console.log({check_y})
                    }else if(bishop_move_y == "--"){
                        check_y--
                        console.log({check_y})
                    }
                    var id = '#' + letters[check_x - 1] +""+check_y
                    console.log(id)
                    var check_field = document.querySelector(id).firstChild
                    if(
                        (check_field != null) && 
                        (check_x == parseInt(vectorX)) && 
                        (check_y == parseInt(vectorY))
                    ){
                        control = 1
                    }else if((check_field != null)){
                        control = 0
                    }
                }while(((check_x != parseInt(vectorX)) && (check_y != parseInt(vectorY))))
                if((vectorX == figure.dataset.x) && (vectorY != figure.dataset.y)) {
                    control = 1
                }
                if((vectorX != figure.dataset.x) && (vectorY == figure.dataset.y)) {
                    control = 1
                }
                console.log("control"+control)
                if(control == 1) {
                    var child_for_king = field_child
                    console.log(child_for_king)
                    if(child_for_king == null) {
                        return true
                    }else if(child_for_king.className == "king figure"){
                        console.log('start')
                        const letters_for_x = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
                        if(figure.dataset.color == child_for_king.dataset.color) {
                            console.log(child_for_king.dataset.color)
                            if(child_for_king.dataset.color == "white"){
                                var king_x = child_for_king.dataset.x
                                console.log(white_king_move)
                                if(white_king_move == 0){
                                    if(bishop_move_x == "--") {
                                        var id_for_tower = '#' + letters_for_x[king_x - 1] +""+check_y
                                        var id_for_king = '#' + letters_for_x[king_x] +""+check_y
                                    }else if(bishop_move_x == "++") {
                                        var id_for_tower = '#' + letters_for_x[king_x - 1] +""+check_y
                                        var id_for_king = '#' + letters_for_x[king_x - 2] +""+check_y
                                    } 
                                    console.log(id_for_king, id_for_tower)
                                    document.querySelector(id_for_tower).appendChild(figure)
                                    document.querySelector(id_for_king).appendChild(child_for_king)
                                    checked = 0
                                    white_king_move == 1
                                    if(now_play == "white") {
                                        now_play = "black"
                                    }
                                    else{
                                        now_play = "white"
                                    }
                                    return false
                                }else{
                                    console.log("king make move")
                                }
                            }else{
                                if(black_king_move == 0){
                                    var king_x = child_for_king.dataset.x
                                    if(bishop_move_x == "--") {
                                        var id_for_tower = '#' + letters_for_x[king_x - 1] +""+check_y
                                        var id_for_king = '#' + letters_for_x[king_x] +""+check_y
                                    }else if(bishop_move_x == "++") {
                                        var id_for_tower = '#' + letters_for_x[king_x - 1] +""+check_y
                                        var id_for_king = '#' + letters_for_x[king_x - 2] +""+check_y
                                    } 
                                    console.log(id_for_king, id_for_tower)
                                    document.querySelector(id_for_tower).appendChild(figure)
                                    document.querySelector(id_for_king).appendChild(child_for_king)
                                    checked = 0
                                    black_king_move == 1
                                    if(now_play == "white") {
                                        now_play = "black"
                                    }
                                    else{
                                        now_play = "white"
                                    }
                                    return false
                                }else{
                                    console.log("king make move")
                                }
                            }
                        }else{
                            return true
                        }
                    }
                }else{
                    return false
                }
            }
        }
        if(figure.className == "horse figure") {
            if((((parseInt(figure.dataset.y) - parseInt(vectorY)) == -2) || ((parseInt(figure.dataset.y) - parseInt(vectorY)) == 2)) && (((parseInt(figure.dataset.x) - parseInt(vectorX)) == 1) || ((parseInt(figure.dataset.x) - parseInt(vectorX)) == -1))) {
                return true
            }
            if((((parseInt(figure.dataset.y) - parseInt(vectorY)) == -1) || ((parseInt(figure.dataset.y) - parseInt(vectorY)) == 1)) && (((parseInt(figure.dataset.x) - parseInt(vectorX)) == 2) || ((parseInt(figure.dataset.x) - parseInt(vectorX)) == -2))) {
                return true
            }
            return false
        }
        if((figure.className == "bishop figure") || (figure.className == "queen figure")) {
            var check_x = checked_figure.dataset.x
            var check_y = checked_figure.dataset.y
            if(figure.dataset.y < vectorY) {
                bishop_move_y = "++"
                console.log("gora")
            }
            else if(figure.dataset.y > vectorY) {
                bishop_move_y = "--"
                console.log("dol")
            }
            else {
                bishop_move_y = ""
            }
            if(figure.dataset.x < vectorX) {
                bishop_move_x = "++"
                console.log("prawo")
            }
            else if(figure.dataset.x > vectorX) {
                bishop_move_x = "--"
                console.log("lewo")
            }
            else {
                bishop_move_x = ""
            }
            do{
                if(bishop_move_x == "++") {
                    check_x++
                    console.log({check_x})
                }else if(bishop_move_x == "--"){
                    check_x--
                    console.log({check_x})
                }else {
                    continue
                }
                if(bishop_move_y == "++") {
                    check_y++
                    console.log({check_y})
                }else if(bishop_move_y == "--"){
                    check_y--
                    console.log({check_y})
                }else {
                    continue
                }
                var id = '#' + letters[check_x - 1] +""+check_y
                console.log(id)
                var check_field = document.querySelector(id).firstChild
                if(
                    (check_field != null) && 
                    (check_x == parseInt(vectorX)) && 
                    (check_y == parseInt(vectorY))
                ){
                    return true
                }else if((check_field != null)){
                    return false
                }
            }while(((check_x != parseInt(vectorX)) && (check_y != parseInt(vectorY))))
            console.log(check_y, check_x, vectorY, vectorX)
            if((check_x == vectorX) && (check_y == vectorY)) {
                return true
            }
            return false
        }
        if(figure.className == "king figure") {
            if((parseInt(figure.dataset.y - vectorY)) == 1 || (parseInt(figure.dataset.y - vectorY) == -1)) {
                if(figure.dataset.color == "white") {
                    white_king_move = 1
                }else {
                    black_king_move = 1
                }
                return true
            }else if((parseInt(figure.dataset.x - vectorX)) == 1 || ((parseInt(figure.dataset.x - vectorX)) == -1)) {
                if(figure.dataset.color == "white") {
                    white_king_move = 1
                }else {
                    black_king_move = 1
                }
                return true
            }
            return false
        }
        // if(figure.className == "queen figure") {
        //     var check_x = checked_figure.dataset.x
        //     var check_y = checked_figure.dataset.y
        //     if(figure.dataset.y < vectorY) {
        //         bishop_move_y = "++"
        //         console.log("gora")
        //     }
        //     else if(figure.dataset.y > vectorY) {
        //         bishop_move_y = "--"
        //         console.log("dol")
        //     }
        //     else {
        //         bishop_move_y = ""
        //     }
        //     if(figure.dataset.x < vectorX) {
        //         bishop_move_x = "++"
        //         console.log("prawo")
        //     }
        //     else if(figure.dataset.x > vectorX) {
        //         bishop_move_x = "--"
        //         console.log("lewo")
        //     }
        //     else {
        //         bishop_move_x = ""
        //     }
        //     do{
        //         if(bishop_move_x == "++") {
        //             check_x++
        //             console.log({check_x})
        //         }else if(bishop_move_x == "--"){
        //             check_x--
        //             console.log({check_x})
        //         }
        //         if(bishop_move_y == "++") {
        //             check_y++
        //             console.log({check_y})
        //         }else if(bishop_move_y == "--"){
        //             check_y--
        //             console.log({check_y})
        //         }
        //         var id = '#' + letters[check_x - 1] +""+check_y
        //         console.log(id)
        //         var check_field = document.querySelector(id).firstChild
        //         if(
        //             (check_field != null) && 
        //             (check_x == parseInt(vectorX)) && 
        //             (check_y == parseInt(vectorY))
        //         ){
        //             return true
        //         }else if((check_field != null)){
        //             return false
        //         }
        //         if((bishop_move_x == "") || (bishop_move_y == "")){
        //             if((vectorX == figure.dataset.x) && (vectorY != figure.dataset.y)) {
        //                 return true
        //             }
        //             if((vectorX != figure.dataset.x) && (vectorY == figure.dataset.y)) {
        //                 return true
        //             }
        //         }    
        //     }while(((check_x != parseInt(vectorX)) && (check_y != parseInt(vectorY))))
        //     return false

        // }
    }else{
        console.log("now play"+now_play)
        return false
    }    
}

