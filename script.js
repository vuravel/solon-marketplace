var data
var mymap
var markers = []
var items = []
var latsum = 0
var lngsum = 0
var total = 0
var displayed = 0
var isMobile = false


$(document).ready(function(){

    isMobile = window.matchMedia("only screen and (max-width: 700px)").matches;

    mymap = L.map(isMobile ? 'mapid-mobile' : 'mapid').setView([45.5417, -73.5873], 12);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: '',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiYmVsaGFjaGVtIiwiYSI6ImNrOGJueXBoNDA4dXIzZWpxdm81cHpuN2MifQ.v3PJptqOWEKDVy3eZvJ_-g'
    }).addTo(mymap);

    getData({})


    $('#name_input').keyup($.debounce(500, function(){
        $(this).val() ? $('.fa-times').show() : $('.fa-times').hide()
        search()
    }))

    $('#category_input,#borough_input,#takeaway_input,#delivery_input,#appointment_input,#closed_input').change(function(){
        search()
    })

    $("#toggleFilters").click(function(){
        $("#more_filters").slideToggle()
        $("#toggleFilters").toggleClass('filters_open')
    })

    $(".fa-times").click(function(){
        $('#name_input').val('')
        $('.fa-times').hide()
        search()
    })
})

function search()
{
    getData({
        name: $("#name_input").val(),
        category: $("#category_input").val(),
        borough: $("#borough_input").val(),
        takeaway: $("#takeaway_input").is(':checked'),
        delivery: $("#delivery_input").is(':checked'),
        appointment: $("#appointment_input").is(':checked'),
        closed: $("#closed_input").is(':checked')
    })
}


function getData(search)
{
    clearMarkers()

    $.ajax({
        type: "GET",  
        url: "commerces.csv",
        dataType: "text",       
        success: function(response){
            data = shuffle(Papa.parse(response, {
                delimiter: ",",
                header: true
            }).data)

            for (i = 0; i < data.length; i++) {
                var item = data[i]
                item.id = i+1

                var nameResult = !search.name || (search.name && cleanString(item.name).indexOf(cleanString(search.name)) !== -1)
                var categoryResult = !search.category || (search.category && item.category == search.category)
                var boroughResult = !search.borough || (search.borough && item.borough == search.borough)
                var takeawayResult = !search.takeaway || (search.takeaway && item.takeaway)
                var deliveryResult = !search.delivery || (search.delivery && item.delivery)
                var appointmentResult = !search.appointment || (search.appointment && item.appointment)
                var openResult = (!search.closed && !isClosed(item)) || (search.closed)

                if(nameResult && categoryResult && boroughResult && takeawayResult && deliveryResult && appointmentResult && openResult)
                {
                    total += 1
                    setShop(item)
                }
            }

            $("#shop_count").html(total+" commerce(s)")
            centerMap()

            $(".shop-card").click(function(){
                var id = $(this).data('idx')
                var marker = getMarkerWithId(id)
                var item = getItemWithId(id)

                if(!marker || isMobile){
                    $("#infos-commerce").html(getMapCard(item))
                    $('#infos-commerce-modal').modal('show')
                    if(marker) //if marker but mobile
                        openPopup(marker.marker, item, true)
                }else{
                    $('#infos-commerce-modal').modal('hide')
                    openPopup(marker.marker, item)
                }
            })

        }
    })
}

function setShop(item)
{
    setCard(item)
    setMarker(item)
}

function setCard(item)
{
    items.push(item)
    $("#shop-cards").append(getShopCard(item))
}

function cleanString(str)
{
    return _.deburr(str).toLowerCase().replace(/[^a-zA-Z]/g, "")
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}