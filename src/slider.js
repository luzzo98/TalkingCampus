import $ from 'jquery'

export default $('document').ready(function() {
    $(".leaflet-control-zoom").preventDefault = true;
    $(".leaflet-control-zoom").hide();
    $(".leaflet-control-layers").toggleClass('leaflet-control-layers-expanded')
    $(".leaflet-control-layers").on("mouseleave", function(){
        $(this).toggleClass('leaflet-control-layers-expanded');
    });

    $("#drawer-toggle").click()

    $('#map').click(function () {
        $(".leaflet-control-layers").removeClass('leaflet-control-layers-expanded')
        $(".leaflet-control-layers").toggleClass('leaflet-control-layers-expanded')
    })

});
