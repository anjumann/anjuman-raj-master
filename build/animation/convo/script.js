var interval;
var msgContainer;
var timeOut;
var toolTip = $(".tooltipMsg");
var restartButton = $(".restartConvo");
var msgContainer = $(".msg-container");
var messagesInterval = 3000;

restartButton.click(() => {
  closeConversation();
  toolTip.removeClass("active");
});

toolTip.click(function (e) {
  e.stopPropagation();

  toolTip.removeClass("active");
  msgContainer.removeClass("animated");
  // closeConversation();
  toolTip.addClass("active");
  msgContainer.toggleClass("animated");
  starConversation(msgContainer);
  // clickedTooltip.next().next().addClass('open');
});

function starConversation($msgContainer) {
  var msgContainer = $msgContainer;
  var messages = msgContainer.find(".msg");
  var numberOfMessages = messages.length;
  var iteration = 0;

  conversation(msgContainer, messages, numberOfMessages, iteration)();
}

function conversation(msgContainer, messages, numberOfMessages, iteration) {
  return function () {
    var msgToShow = msgContainer.find(`.msg.msg-${iteration}`);
    msgToShow.show();
    msgToShow.removeClass("hidden");
    msgContainer.animate(
      {
        scrollTop: msgContainer[0].scrollHeight,
      },
      500
    );
    iteration++;
    if (iteration < numberOfMessages)
      timeOut = setTimeout(
        conversation(msgContainer, messages, numberOfMessages, iteration),
        messagesInterval
      );
  };
}

function closeConversation() {
  var messages = $(".msg-container .msg");
  if (timeOut) {
    clearTimeout(timeOut);
  }
  messages.addClass("hidden").hide();
}
