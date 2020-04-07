function getShopCard(item)
{
    return '<div class="shop-card" data-idx="'+item.id+'">'+getName(item)+getBoroughWithOptions(item)+getOpen(item)+getSmallTagHtml(item)+'</div>'
}

function getMapCard(item)
{
    return '<div class="map-card">'+getName(item)+getAddress(item)+getPhone(item)+getWebsite(item)+getOpen(item)+getOptions(item)+getNote(item)+getBigTagHtml(item)+getUrlupdate(item)+'</div>'
}

function getSmallTagHtml(item)
{
    var obj = getIconAndColor(item)
    return '<div class="small-tag" style="background: transparent;color:'+obj.color+'" class="badge">'+getTagIcon(obj)+item.category+'</div>'
}

function getBigTagHtml(item)
{
    var obj = getIconAndColor(item)
    return '<div class="big-tag" style="border-color:'+obj.color+';color:'+obj.color+'">'+getTagIcon(obj)+item.category+'</div>'
}

function getTagIcon(obj)
{
    return '<i class="'+obj.icon+'"></i> '+(obj.closed ? '(Fermé) ': '')
}


function getItemWithId(id)
{
    for (var i = items.length - 1; i >= 0; i--) {
        if(items[i].id == id)
            return items[i]
    }
}

function getName(item)
{
    return '<h3 class="shop-title">'+item.name+'</h3>'
}

function getCategory(item)
{
    return '<div>'+item.category+'</div>'
}

function getBoroughWithOptions(item)
{
    return '<div>'+item.borough+' '+getOptions(item)+'</div>'
}

function getAddress(item)
{
    return '<div><i class="fas fa-map-marker-alt"></i> '+item.address+'</div>'
}

function getPhone(item)
{
    return item.phone ? ('<div><i class="fas fa-phone"></i> <a href="tel:'+item.phone+'">'+item.phone+'</a></div>') : ''
}
function getOpen(item)
{
    return '<div class="card-open">'+item.open+'</div>'
}
function getOptions(item)
{
    return '<div class="card-options">'+getOnline(item)+getDelivery(item)+getTakeaway(item)+getAppointment(item)+'</div>'
}
function getOnline(item)
{
    return item.online ? getOptionHtml('fas fa-globe', 'En ligne') : ''
}
function getDelivery(item)
{
    return item.delivery ? getOptionHtml('fas fa-shipping-fast', 'Livraison') : ''
}
function getTakeaway(item)
{
    return item.takeaway ? getOptionHtml('fas fa-store', 'À emporter') : ''
}
function getAppointment(item)
{
    return item.appointment ? getOptionHtml('far fa-calendar', 'Prendre RDV') : ''
}
function getOptionHtml(icon, text)
{
    return '<div class="option-div"><i class="'+icon+'"></i> <div>'+text+'</div>&nbsp;</div>'
}

function getNote(item)
{
    /*var tags = ''
    $.each(item.note.split(','), function(i, val){
        tags += '<span class="badge badge-secondary">'+val+'</span>'
    })*/
    return '<div>'+item.note+'</div>'
}

function validURL(str) {
  return str.startsWith('http') || str.startsWith('www')
}

function getWebsite(item)
{
    if(item.website){
        var websiteOrGoogle = validURL(item.website) ? item.website : ('https://google.ca/search?q='+item.name)
        return '<a class="btn btn-sm btn-warning" target="_blank" href="'+websiteOrGoogle+'">Site web</a>'
    }
    return ''
}

function isClosed(item)
{
    return !item.open || item.open == 'Fermé'
}

function getUrlupdate(item)
{
    if(item.urlupdate){
        return '<div><a class="btn btn-xs btn-light" target="_blank" href="'+ item.urlupdate +'">Mettre à jour</a></div>'
    }
    return ''
}
