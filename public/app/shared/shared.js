var myAlert = function(msg, type)
{
  type = type || 4;

  if (type === 1){
    var alert = 'alert-success';
  }else if (type === 2){
    var alert = 'alert-info';
  }else if (type === 3){
    var alert = 'alert-warning';
  }else {
    var alert = 'alert-danger';
  }
    var that = $('.custom-alert')
    if (that.find('#text-info').html() === "")
    {
      that.toggleClass('hide');
      that.find('div:first').addClass(alert);
      $('#text-info').text(msg);
    }
}
