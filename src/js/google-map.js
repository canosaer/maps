class GoogleMapAPI{
    API_KEY = 'AIzaSyA_yIOa-xcxX3ToUlAQroKIO8tQktzOcKY'

    init() {
        this.searchInput = document.querySelector(`input[name="term"]`)
        this.mapSection = document.querySelector('.map')
        this.currentMarkers = []

        this.setupListener()
    }

    setupListener() {
        const searchButton = document.querySelector(`.search-controls__button`)

        searchButton.addEventListener(`click`, this.handlePlaceSearch)
        this.searchInput.addEventListener(`keyup`, this.checkForEnter)
    }

    handlePlaceSearch = (evt) => {
        var placeName = this.searchInput.value
        if(placeName){
            var placeRequest = {
                location: this.map.getCenter(),
                radius: 50,
                query: placeName,
            }
    
            this.service = new google.maps.places.PlacesService(this.map)
            this.service.textSearch(placeRequest, this.handlePlaceResults)
        }

    }

    checkForEnter = (evt) => {
        if(evt.key === `Enter`) this.handlePlaceSearch()
    }

    handlePlaceResults = (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            console.log(results)

            this.currentMarkers.forEach(marker => {
                marker.setMap(null);
                marker = null;
            });
            this.currentMarkers = []
            
            const resultsSection = document.querySelector(`.results`)
            const oldList = resultsSection.querySelectorAll(`*`)
            if(oldList){
                oldList.forEach(element => {
                    element.remove()
                })
            }

            results.forEach(location => {
                
                const marker = new google.maps.Marker({
                    position: location.geometry.location,
                    map: this.map,
                    title: location.name,
                })
        
                const infoWindowContent = `
                    <div>
                        <h2>${location.name}</h2>
                        <p>${location.rating} stars (${location.user_ratings_total} reviews)</p>
                    </div>
                `

                const infoWindow = new google.maps.InfoWindow({
                    content: infoWindowContent,
                })
        
                marker.addListener('click', () => {
                    infoWindow.open(this.map, marker)
                })

                this.currentMarkers.push(marker)

                let resultRow = document.createElement(`div`)
                resultRow.classList.add(`results__row`)

                let photoAnchor = document.createElement(`a`)
                photoAnchor.classList.add(`results__photo`)
                if(location.photos){
                    photoAnchor.style.background = `url(${location.photos[0].getUrl({'maxWidth': 100, 'maxHeight': 100})}`
                }
                else photoAnchor.style.background = `url(${location.icon})`
                photoAnchor.style.backgroundSize = `cover`
                photoAnchor.style.backgroundPoisition = `center`
                // photoAnchor.href = business.url
                // photoAnchor.setAttribute(`target`, `_blank`)
                resultRow.appendChild(photoAnchor)

                let nameAnchor = document.createElement(`a`)
                // nameAnchor.href = business.url
                // nameAnchor.setAttribute(`target`, `_blank`)
                nameAnchor.classList.add(`results__name`)
                nameAnchor.textContent = location.name
                resultRow.appendChild(nameAnchor)

                let ratingRow = document.createElement(`div`)
                ratingRow.classList.add(`results__rating-row`)
                
                let ratingSpan = document.createElement(`span`)
                ratingSpan.classList.add(`results__rating`)
                ratingSpan.textContent = `${location.rating} stars `
                ratingRow.appendChild(ratingSpan)

                let reviewsSpan = document.createElement(`span`)
                reviewsSpan.classList.add(`results__reviews`)
                reviewsSpan.textContent = `(${location.user_ratings_total} reviews)`
                ratingRow.appendChild(reviewsSpan)

                resultRow.appendChild(ratingRow)

                resultsSection.appendChild(resultRow)

            });
        }
    }

    ready() {
        const theCircus = {
            lat: 33.81328,
            lng: -84.36175,
        }

        const mapOptions = {
            center: theCircus,
            zoom: 11,
        }

        this.map = new google.maps.Map(this.mapSection, mapOptions)

        // const marker = new google.maps.Marker({
        //     position: theCircus,
        //     map: this.map,
        //     title: 'The Circus',
        //     // label: 'The Creative Circus',
        //     // draggable: true,

        // })

        // const infoWindowContent = `<div><h2>Hi Circus</h2><p>I'm at 812 Lambert.</p></div>`

        // const infoWindow = new google.maps.InfoWindow({
        //     content: infoWindowContent,
        // })

        // marker.addListener('click', () => {
        //     infoWindow.open(this.map, marker)
        // })
    }
}

window.gMap = new GoogleMapAPI()
window.gMap.init()