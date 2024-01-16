const $ = (id) => document.getElementById(id)

class Jukebox {
    constructor(albums) {
        this.albums = []
    }
    addAlbum = function(album) {
        this.albums.push(album)
    }
    favoriteAlbum = function() {
        let max = -1, fav
        for (let i = 0; i < this.albums.length; i++) {
            if (this.albums[i].played > max) {
                max = this.albums[i].played
                fav = this.albums[i]
            }
        }
        return fav.display()
    }

    listAlbums = function() {
        for (let i = 0; i < jbox.albums.length; i++) {
            console.log(`Album #${i+1}: ${this.albums[i].title} by ${this.albums[i].artist} was played ${this.albums[i].played} times`)
        }
    }
}

class Album {
    constructor(artist, title) {
        this.artist = artist
        this.title = title
        this.played = 0
    }
    play = function() {
        this.played += 1
    }
    display = function() {
        return `${this.artist}: ${this.title}. The album has been played ${this.played} times.`
    }
}

// Create & populate an array of available Albums (including Artist & Title)
let availableAlbums = [
    { 'artist': 'Metallica', 'title': 'Black Album'},
    { 'artist': 'Rainbow', 'title': 'Long Live Rock \'N\' Roll'},
    { 'artist': 'Accept', 'title': 'Balls to the wall'},
    { 'artist': 'Slayer', 'title': 'Reign In Blood'}
]

// Populate the 'selection' drop-down menu options with Album information from the 'availableAlbums' array
document.addEventListener("DOMContentLoaded", function(event) {
    let select = $('selection')

    for(let i = 0; i < availableAlbums.length; i++) {
        let txtStr = `${availableAlbums[i].artist} - ${availableAlbums[i].title}`
        let option = document.createElement("option")
        let txt = document.createTextNode(txtStr)

        option.appendChild(txt)
        option.setAttribute("value",i)
        select.insertBefore(option,select.lastChild);
    }
})

// Play Button's event handler
$('btnPlay').addEventListener('click', (e) => {
    jbox.albums[$('selection').value].play()
})

// Favorite Album Button's event handler
$('btnFavorite').addEventListener('click', (e) => {
    jbox.listAlbums()
    $('favoriteAlbum').innerHTML = `Your favorite album is ${jbox.favoriteAlbum()}`
})

// Create a Jukebox Object
const jbox = new Jukebox()

// Programmatically add Albums (from the 'availableAlbums' array) to the Jukebox
for (let a in availableAlbums) {
    jbox.addAlbum(new Album(availableAlbums[a].artist, availableAlbums[a].title))
}

