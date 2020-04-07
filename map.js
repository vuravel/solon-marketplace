
function centerMap()
{
    if(markers.length)
        mymap.setView([latsum/markers.length, lngsum/markers.length], 14)

    console.log(latsum, lngsum, markers.length, latsum/markers.length, lngsum/markers.length)
}

function setMarker(item)
{
    if(!item.lat || !item.lng)
        return

    var icon = L.divIcon({
        className: 'marker',
        html: getMarkerHtml(item),
        iconSize: [30, 42],
        iconAnchor: [15, 42],
        popupAnchor: [0, -30]
    });

    
    var marker = L.marker([parseFloat(item.lat), parseFloat(item.lng)], { icon: icon }).addTo(mymap)
    marker.on('click', function(){
    	markerClick(marker, item)
    })
    markers.push({marker: marker, id: item.id})

    latsum += parseFloat(item.lat)
    lngsum += parseFloat(item.lng)
}

function openPopup(marker, item, simple)
{
    marker.bindPopup(simple ? getName(item) : getMapCard(item),{
      maxWidth: "auto"
    })
	var latlng = marker.getLatLng()
    mymap.setView([latlng.lat + (isMobile ? 0.0002 : 0.0008), latlng.lng], 18)
    marker.openPopup()
    marker.on('click', function(){
    	markerClick(marker, item)
    })
}

function clearMarkers()
{
    for (var i = markers.length - 1; i >= 0; i--) {
      markers[i].marker.remove()
    }
    $("#shop-cards").html('')
    markers = []
    items = []
    latsum = 0
    lngsum = 0
    total = 0
    displayed = 0
}

function markerClick(marker, item)
{
	if(!marker || isMobile){
        $("#infos-commerce").html(getMapCard(item))
        $('#infos-commerce-modal').modal('show')
        openPopup(marker, item, true)
    }else{
        $('#infos-commerce-modal').modal('hide')
        openPopup(marker, item)
    }
}

function getMarkerWithId(id)
{
    for (var i = markers.length - 1; i >= 0; i--) {
        if(markers[i].id == id)
            return markers[i]
    }
}

function getMarkerHtml(item)
{
	var obj = getIconAndColor(item)
	return '<div style="background-color:'+obj.color+'" class="marker-pin"></div><i class="'+obj.icon+'"></i>'
}

function getIconAndColor(item)
{
	var color,
		icon,
		closed = false

	if(item.category == "Alimentation"){
		color = '#3dad57'
		icon = 'fas fa-shopping-basket'

	}else if(item.category == "Restos et Cafés"){
		color = '#fecd3d'
		icon = 'fas fa-utensils'

	}else if(item.category == "Mode et accessoires"){
		color = '#d68484'
		icon = 'fas fa-tshirt'

	}else if(item.category == "Santé, sports, beauté et bien-être"){
		color = '#3c69b1'
		icon = 'fas fa-running'

	}else if(item.category == "OBNL"){
		color = '#72b13c'
		icon = 'fas fa-hand-holding-heart'

	}else if(item.category == "Culture"){
		color = '#a055e0'
		icon = 'fas fa-theater-masks'

	}else if(item.category == "Autres commerces et services"){
		color = '#55abe0'
		icon = 'fas fa-store'

	}else{
		color = '#55abe0'
		icon = 'fas fa-store-alt'

	}

	if(isClosed(item)){
		color = 'gainsboro'
		icon = 'fas fa-lock'
		closed = true
	}

	return {
		color: color,
		icon: icon,
		closed: closed
	}
}