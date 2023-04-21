$(document).ready(function () {

  $(".winnerStamp").hide(); //hide winner stamp
  enableButton($(".redButton")); //start game with red player, disable all other players
  disableButton($(".blueButton"));
  disableButton($(".yellowButton"));
  disableButton($(".greenButton"));

  //GREEN
  $(".greenButton").off("click").on("click", function () {
      if ($(".fas").parent().hasClass("finish") == true) { //remove classes from player after reaching finish home
          $(".fas").parent(".finish").children().removeClass("active");
          $(".fas").parent(".finish").children().removeClass("greenPlayer");
      }
      rollDice($(".greenDice"), $(".yellowButton")); //rollDice to obtain random number
      $(".redDice").empty(); //empty previous dice
      $(".yellowDice").empty();
      $(".blueDice").empty();
      if ($(".gp").hasClass("winner") == true) { //skip chance if won
          $(".greenDice").empty();
          enableButton($(".yellowButton"));
      }
      if ($(".greenDice").text() != 6) {
          disableButton($(".greenButton"));
          if ($(".greenPlayer").hasClass("active") == false) {
              enableButton($(".yellowButton"));
          }
      }
      $(".greenPlayer.active").off("click").on("click", function () {
          if ($(this).siblings().length == 1) { //if single pawn present in a block change pawn size to default
              originalPawnSize($(this).siblings());
          }
          greenMovement(this); //move pawn according to dice number
          if ($(this).parent().hasClass("finish") == true) { //if pawn goes into final house respective player gets one more chance to roll dice
              enableButton($(".greenButton"));
              $(".yellowButton").addClass("repeatChance");
          }
          if ($(this).siblings().length > 0) { //if more than one pawn is present in a block then resize pawn
              resizePawn($(this));
          } else {
              originalPawnSize($(this));
          }
          if ($(this).parent().not('.safe').children().length > 1) { //kill opponent if not in safe zone
              if ($(this).siblings().hasClass('greenPlayer') === false) { //check whether pawn is an opponent or not
                  killPawn($(this), $(".yellowButton")); //append the killed pawn to respective pawn home
                  enableButton($(".greenButton"));
              }
          }
          if ($(".greenPlayer, .bluePlayer, .yellowPlayer, .redPlayer").hasClass("active") == true) {
              if ($(".yellowButton").hasClass("repeatChance") == false) {
                  enableButton($(".yellowButton"));
              }
              if ($(".greenPlayer").hasClass("winner") == true) {
                  enableButton($(".yellowButton"));
              }
          }
          $(".greenPlayer").off("click");
          removeHighlight($(".greenPlayer"));
      });
      if ($(".greenDice").text() == 6) {
          disableButton($(".greenButton"));
          highlightPawn($(".greenPlayer"));
          $(".highlighted").off("click").on("click", function () {
              if ($(this).siblings().length == 1) { //if single pawn present in a block change pawn size to default
                  originalPawnSize($(this).siblings());
                  originalPawnSize($(this));
              }
              $(".highlighted").off("click"); //disable click untill dice is rolled
              if ($(".greenDice").text() == 6) {
                  if ($(this).hasClass("active") == true) { //if player active then move to respective position
                      greenMovement(this);
                      if ($(this).parent().not('.safe').children().length > 1) {
                          if ($(this).siblings().hasClass('greenPlayer') === false) {
                              killPawn($(this));
                          }
                      }
                  } else {
                      $(this).appendTo(".g0"); //after the dice rolls to 6 append pawn to start position
                      $(this).addClass("active"); //if not in pawn home add class active

                      if ($(this).siblings().length > 0) {
                          resizePawn($(this));
                      } else {
                          originalPawnSize($(this));
                      }
                  }
              }
              enableButton($(".greenButton"));
              removeHighlight($(".greenPlayer")); //remove highlight after appending to respective position
          });
      } else {
          $(".greenPlayer.active").addClass("highlighted");
          $(".greenPlayer.active").addClass("spinAnimation");
      }
  });

  //repeat same steps for all four teams

  //BLUE
  $(".blueButton").off("click").on("click", function () {
      if ($(".fas").parent().hasClass("finish") == true) {
          $(".fas").parent(".finish").children().removeClass("active");
          $(".fas").parent(".finish").children().removeClass("bluePlayer");
      }
      rollDice($(".blueDice"), $(".redButton"));
      if ($(".bp").hasClass("winner") == true) {
          $(".blueDice").empty();
          enableButton($(".redButton"));
      }
      $(".redDice").empty();
      $(".yellowDice").empty();
      $(".greenDice").empty();
      if ($(".blueDice").text() != 6) {
          disableButton($(".blueButton"));
          if ($(".bluePlayer").hasClass("active") == false) {
              enableButton($(".redButton"));
          }
      }
      $(".bluePlayer.active").off("click").on("click", function () {
          if ($(this).siblings().length == 1) {
              originalPawnSize($(this).siblings());
          }
          blueMovement(this);
          if ($(this).parent().hasClass("finish") == true) {
              enableButton($(".blueButton"));
              $(".redButton").addClass("repeatChance");
          }
          if ($(this).siblings().length > 0) {
              resizePawn($(this));
          } else {
              originalPawnSize($(this));
          }
          if ($(this).parent().not('.safe').children().length > 1) {
              if ($(this).siblings().hasClass('bluePlayer') === false) {
                  killPawn($(this), $(".redButton"));
                  enableButton($(".blueButton"));
              }
          }
          if ($(".greenPlayer, .bluePlayer, .yellowPlayer, .redPlayer").hasClass("active") == true) {

              if ($(".redButton").hasClass("repeatChance") == false) {
                  enableButton($(".redButton"));
              }
          }
          $(".bluePlayer").off("click");
          removeHighlight($(".bluePlayer"));
      });
      if ($(".blueDice").text() == 6) {
          disableButton($(".blueButton"));
          highlightPawn($(".bluePlayer"));
          $(".highlighted").off("click").on("click", function () {
              if ($(this).siblings().length == 1) {
                  originalPawnSize($(this));
                  originalPawnSize($(this).siblings());
              }
              $(".highlighted").off("click");
              if ($(".blueDice").text() == 6) {
                  if ($(this).hasClass("active") == true) {
                      blueMovement(this);
                      if ($(this).parent().not('.safe').children().length > 1) {
                          if ($(this).siblings().hasClass('bluePlayer') === false) {
                              killPawn($(this));
                          }
                      }
                  } else {
                      $(this).appendTo(".b0");
                      $(this).addClass("active");

                      if ($(this).siblings().length > 0) {
                          resizePawn($(this));
                      } else {
                          originalPawnSize($(this));
                      }
                  }
              }
              enableButton($(".blueButton"));
              removeHighlight($(".bluePlayer"));
          });
      } else {
          $(".bluePlayer.active").addClass("highlighted");
          $(".bluePlayer.active").addClass("spinAnimation");
      }
  });

  //RED
  $(".redButton").off("click").on("click", function () {
      if ($(".fas").parent().hasClass("finish") == true) {
          $(".fas").parent(".finish").children().removeClass("active");
          $(".fas").parent(".finish").children().removeClass("redPlayer");
      }
      rollDice($(".redDice"), $(".greenButton"));
      if ($(".rp").hasClass("winner") == true) {
          $(".redDice").empty();
          enableButton($(".greenButton"));
      }
      $(".blueDice").empty();
      $(".yellowDice").empty();
      $(".greenDice").empty();
      if ($(".redDice").text() != 6) {
          disableButton($(".redButton"));
          if ($(".redPlayer").hasClass("active") == false) {
              enableButton($(".greenButton"));
          }
      }
      $(".redPlayer.active").off("click").on("click", function () {
          if ($(this).siblings().length == 1) {
              originalPawnSize($(this).siblings());
          }
          redMovement(this);
          if ($(this).parent().hasClass("finish") == true) {
              enableButton($(".redButton"));
              $(".greenButton").addClass("repeatChance");
          }
          if ($(this).siblings().length > 0) {
              resizePawn($(this));
          } else {
              originalPawnSize($(this));
          }
          if ($(this).parent().not('.safe').children().length > 1) {
              if ($(this).siblings().hasClass('redPlayer') === false) {
                  killPawn($(this), $(".greenButton"));
                  enableButton($(".redButton"));
              }
          }
          if ($(".yellowPlayer, .redPlayer, .bluePlayer, .greenPlayer").hasClass("active") == true) {

              if ($(".greenButton").hasClass("repeatChance") == false) {
                  enableButton($(".greenButton"));
              }
          }
          $(".redPlayer").off("click");
          removeHighlight($(".redPlayer"));
      });
      if ($(".redDice").text() == 6) {
          disableButton($(".redButton"));
          highlightPawn($(".redPlayer"));
          $(".highlighted").off("click").on("click", function () {
              if ($(this).siblings().length == 1) {
                  originalPawnSize($(this));
                  originalPawnSize($(this).siblings());
              }
              $(".highlighted").off("click");
              if ($(".redDice").text() == 6) {
                  if ($(this).hasClass("active") == true) {
                      redMovement(this);
                      if ($(this).parent().not('.safe').children().length > 1) {
                          if ($(this).siblings().hasClass('redPlayer') === false) {
                              killPawn($(this));
                          }
                      }
                  } else {
                      $(this).appendTo(".r0");
                      $(this).addClass("active");

                      if ($(this).siblings().length > 0) {
                          resizePawn($(this));
                      } else {
                          originalPawnSize($(this));
                      }
                  }
              }
              enableButton($(".redButton"));
              removeHighlight($(".redPlayer"));
          });
      } else {
          $(".redPlayer.active").addClass("highlighted");
          $(".redPlayer.active").addClass("spinAnimation");
      }
  });

  //YELLOW
  $(".yellowButton").off("click").on("click", function () {
      if ($(".fas").parent().hasClass("finish") == true) {
          $(".fas").parent(".finish").children().removeClass("active");
          $(".fas").parent(".finish").children().removeClass("yellowPlayer");
      }
      rollDice($(".yellowDice"), $(".blueButton"));
      if ($(".yp").hasClass("winner") == true) {
          $(".yellowDice").empty();
          enableButton($(".blueButton"));
      }
      $(".greenDice").empty();
      $(".blueDice").empty();
      $(".redDice").empty();
      if ($(".yellowDice").text() != 6) {
          disableButton($(".yellowButton"));
          if ($(".yellowPlayer").hasClass("active") == false) {
              enableButton($(".blueButton"));
          }
      }
      $(".yellowPlayer.active").off("click").on("click", function () {
          if ($(this).siblings().length == 1) {
              originalPawnSize($(this).siblings());
          }
          yellowMovement(this);
          if ($(this).parent().hasClass("finish") == true) {
              enableButton($(".yellowButton"));
              $(".blueButton").addClass("repeatChance");
          }
          if ($(this).siblings().length > 0) {
              resizePawn($(this));
          } else {
              originalPawnSize($(this));
          }
          if ($(this).parent().not('.safe').children().length > 1) {
              if ($(this).siblings().hasClass('yellowPlayer') === false) {
                  killPawn($(this), $(".blueButton"));
                  enableButton($(".yellowButton"));
              }
          }
          if ($(".yellowPlayer, .redPlayer, .bluePlayer, .greenPlayer").hasClass("active") == true) {
              if ($(".blueButton").hasClass("repeatChance") == false) {
                  enableButton($(".blueButton"));
              }
          }
          $(".yellowPlayer").off("click");
          removeHighlight($(".yellowPlayer"));
      });
      if ($(".yellowDice").text() == 6) {
          disableButton($(".yellowButton"));
          highlightPawn($(".yellowPlayer"));
          $(".highlighted").off("click").on("click", function () {
              if ($(this).siblings().length == 1) {
                  originalPawnSize($(this).siblings());
                  originalPawnSize($(this));
              }
              $(".highlighted").off("click");
              if ($(".yellowDice").text() == 6) {
                  if ($(this).hasClass("active") == true) {
                      yellowMovement($(this));
                      if ($(this).parent().not('.safe').children().length > 1) {
                          if ($(this).siblings().hasClass('yellowPlayer') === false) {
                              killPawn($(this));
                          }
                      }
                  } else {
                      $(this).appendTo(".y0");
                      $(this).addClass("active");
                      if ($(this).siblings().length > 0) {
                          resizePawn($(this));
                      } else {
                          originalPawnSize($(this));
                      }
                  }
              }
              enableButton($(".yellowButton"));
              removeHighlight($(".yellowPlayer"));
          });
      } else {
          $(".yellowPlayer.active").addClass("highlighted");
          $(".yellowPlayer.active").addClass("spinAnimation");
      }
  });

  function rollDice($dice, $button) {
      $($button).removeClass("repeatChance");
      var number = 1 + Math.floor(Math.random() * 6); //generate random dice number
      $($dice).text(number); //append text to dice
      //according to the dice number display respective image of dice
      if (number == 1) {
          $($dice).append("<img src='images/one.png' />")
      }
      if (number == 2) {
          $($dice).append("<img src='images/two.png' />")
      }
      if (number == 3) {
          $($dice).append("<img src='images/three.png' />")
      }
      if (number == 4) {
          $($dice).append("<img src='images/four.png' />")
      }
      if (number == 5) {
          $($dice).append("<img src='images/five.png' />")
      }
      if (number == 6) {
          $($dice).append("<img src='images/six.png' />")
      }
  }

  function greenMovement($pawn) {
      var $currentPosition = $($pawn).parent().attr("class").replace("blocks ", "").replace("g", ""); //fetch current position of the pawn
      var $diceNumber = $(".greenDice").text(); //fetch dice number
      var $moveTo = parseInt($currentPosition) + parseInt($diceNumber); //convert class name into integer type
      $($pawn).appendTo(".g" + $moveTo); //move pawn to the sum of current posiiton and dice number
      if ($(".blocks").children().hasClass("greenPlayer") == false) {
          if ($(".pawnHome").children().hasClass("greenPlayer") == false) {
              //if all players are in final home declare the team as winner
              $(".winnerStampGreen").show();
              $(".gp").addClass("winner");
              disableButton($(".greenButton"));
          }
      }
  }

  function blueMovement($pawn) {
      var $currentPosition = $($pawn).parent().attr("class").replace("blocks ", "").replace("b", "");
      var $diceNumber = $(".blueDice").text();
      $currentPosition.split(" ");
      $currentPosition = $currentPosition.split(" ")[1];
      var $moveTo = parseInt($currentPosition) + parseInt($diceNumber);
      $($pawn).appendTo(".b" + $moveTo);
      if ($(".blocks").children().hasClass("bluePlayer") == false) {
          if ($(".pawnHome").children().hasClass("bluePlayer") == false) {
              $(".winnerStampBlue").show();
              $(".bp").addClass("winner");
              disableButton($(".blueButton"));
          }
      }
  }

  //similar steps for movement of all players

  function redMovement($pawn) {
      var $currentPosition = $($pawn).parent().attr("class").replace("blocks ", "").replace("r", "");
      var $diceNumber = $(".redDice").text();
      $currentPosition.split(" ");
      $currentPosition = $currentPosition.split(" ")[2];
      var $moveTo = parseInt($currentPosition) + parseInt($diceNumber);
      $($pawn).appendTo(".r" + $moveTo);
      if ($(".blocks").children().hasClass("redPlayer") == false) {
          if ($(".pawnHome").children().hasClass("redPlayer") == false) {
              $(".winnerStampRed").show();
              $(".rp").addClass("winner");
              disableButton($(".redButton"));
          }
      }
  }

  function yellowMovement($pawn) {
      var $currentPosition = $($pawn).parent().attr("class").replace("blocks ", "").replace("y", "");
      var $diceNumber = $(".yellowDice").text();
      $currentPosition.split(" ");
      $currentPosition = $currentPosition.split(" ")[3];
      var $moveTo = parseInt($currentPosition) + parseInt($diceNumber);
      $($pawn).appendTo(".y" + $moveTo);
      if ($(".blocks").children().hasClass("yellowPlayer") == false) {
          if ($(".pawnHome").children().hasClass("yellowPlayer") == false) {
              $(".winnerStampYellow").show();
              $(".yp").addClass("winner");
              disableButton($(".yellowButton"));
          }
      }
  }

  function disableButton($button) {
      $($button).prop("disabled", true);
      $($button).css("opacity", 0.7);
      $($button).css("font-size", "13px");
  }

  function enableButton($button) {
      $($button).prop("disabled", false);
      $($button).css("opacity", 1);
      $($button).css("font-size", "20px");
  }

  function resizePawn($pawn) {
      $($pawn).siblings().css("font-size", "20px");
      $($pawn).css("font-size", "20px");
  }

  function originalPawnSize($pawn) {
      $($pawn).css("font-size", "30px");
  }

  function killPawn($pawn, $button) {
      var $position = $($pawn).siblings().attr("start"); //fetch specific pawn home of resective pawn
      $($pawn).siblings().removeClass("active"); //remove active class once killed
      $($pawn).siblings().css("font-size", "40px");
      $("." + $position).append($($pawn).siblings()); //append pawn to respective pawn home
      $($pawn).css("font-size", "30px");
      $($button).addClass("repeatChance"); //killer gets to roll dice again
  }

  function highlightPawn($pawn) {
      $($pawn).addClass("highlighted");
      $($pawn).addClass("spinAnimation");
  }

  function removeHighlight($pawn) {
      $($pawn).removeClass("highlighted");
      $($pawn).removeClass("spinAnimation");
  }
});