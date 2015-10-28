(function() {
  var images = [
    'images/3f9fb39e2843764a33e834bcb4e06863.jpg',
    'images/funny-pictures-lolcats-maru-the-ninja.jpg',
    'images/lolcat_this_is_mah_job.jpg',
    'images/LOLCatsIWillSleepHere.jpg',
    'images/yuAFV.jpg',
    'images/crazyrunninggirl.lolcats-nap.jpeg',
    'images/chat_relax_019.jpg'
  ];
  var image = images[Math.floor(Math.random()*images.length)];
  document.write('<img src="' + image + '"/>');
})();

