class GoogleMapAPI{
    API_KEY = 'AIzaSyA_yIOa-xcxX3ToUlAQroKIO8tQktzOcKY'

    init() {
        console.log('GoogleMap init')

        this.searchInput = document.querySelector(`input[name="term"]`)

        this.setupListener()
    }

    setupListener() {
        const searchButton = document.querySelector(`.search-controls__button`)

        searchButton.addEventListener(`click`, this.handlePlaceSearch)
        // this.searchInput.addEventListener(`keyup`, this.checkForEnter)
    }

    handlePlaceSearch = (evt) => {
        var placeName = this.searchInput.value

        var placeRequest = {
            location: this.map.getCenter(),
            radius: 50,
            query: placeName,
        }

        this.service = new google.maps.places.PlacesService(this.map)
        this.service.textSearch(placeRequest, this.handlePlaceResults)

    }

    handlePlaceResults = (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            console.log('got results', results)
        }
    }

    ready() {
        console.log('GoogleMap is ready')

        const theCircus = {
            lat: 33.81328,
            lng: -84.36175,
        }

        const mapOptions = {
            center: theCircus,
            zoom: 15,
        }

        this.map = new google.maps.Map(document.querySelector('.map'), mapOptions)

        const marker = new google.maps.Marker({
            position: theCircus,
            map: this.map,
            title: 'The Circus',
            // label: 'The Creative Circus',
            // draggable: true,

        })

        const infoWindowContent = `<div><h2>Hi Circus</h2><p>I'm at 812 Lambert.</p></div>`

        const infoWindow = new google.maps.InfoWindow({
            content: infoWindowContent,
        })

        marker.addListener('click', () => {
            infoWindow.open(this.map, marker)
        })
    }
}

window.gMap = new GoogleMapAPI()
window.gMap.init()