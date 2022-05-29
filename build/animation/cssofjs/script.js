(function () {
  var openComment, styles, time, writeStyleChar, writeStyles;

  styles = `/* 
 */

body {
  background-color: #1a1c24; color: #fff;
  font-size: 13px; line-height: 1.4;
  -webkit-font-smoothing: subpixel-antialiased;
}

/* ...                  
 *
 * ...hello?            
 *
 * Oh hai! It's me, pen#PwLXXP.         
 *
 * I'm just sitting here coding away.            
 *
 * Sure, you can watch.                       
 *
 *
 * This CSS is being injected into a DOM <style> element 
 * and written in this <pre> element simultaneously.        
 *
 * Confused? Watch!
 *
 */

pre { 
  position: fixed; width: 48%;
  top: 30px; bottom: 30px; left: 26%;
  transition: left 500ms;
  overflow: auto;
  background-color: #313744; color: #a6c3d4;
  border: 1px solid rgba(0,0,0,0.2);
  padding: 24px 12px;
  box-sizing: border-box;
  border-radius: 3px;
  box-shadow: 0px 4px 0px 2px rgba(0,0,0,0.1);
}


/* 
 * Syntax highlighting 
 * Colors based on Base16 Ocean Dark
 */

pre em:not(.comment) { font-style: normal; }

.comment       { color: #707e84; }
.selector      { color: #c66c75; }
.selector .key { color: #c66c75; }
.key           { color: #c7ccd4; }
.value         { color: #d5927b; }


/* 
 * Let's build my little pen heart.
 */ 


/* First, we'll move this s*** over */

pre { left: 50%; }


/* Now we can build my heart */

#heart, #echo { 
  position: fixed;
  width: 300px; height: 300px;
  top: calc(50% - 150px); left: calc(25% - 150px);
  text-align: center;
  -webkit-transform: scale(0.95);
          transform: scale(0.95);
}

#heart { z-index: 8; }
#echo  { z-index: 7; }

#heart::before, #heart::after, #echo::before, #echo::after {
    content: '';
    position: absolute;
    top: 40px;
    width: 150px; height: 240px;
    background: #c66c75;
    border-radius: 150px 150px 0 0;
    -webkit-transform: rotate(-45deg);
            transform: rotate(-45deg);
    -webkit-transform-origin: 0 100%;
            transform-origin: 0 100%;
}

#heart::before, #echo::before {
  left: 150px;
}

#heart::after, #echo::after {
  left: 0;
  -webkit-transform: rotate(45deg);
          transform: rotate(45deg);
  -webkit-transform-origin: 100% 100%;
          transform-origin: 100% 100%;
}


/* It needs some depth  */

#heart::after { 
  box-shadow:
    inset -6px -6px 0px 6px rgba(255,255,255,0.1);
}

#heart::before { 
  box-shadow:
    inset 6px 6px 0px 6px rgba(255,255,255,0.1);
}


/* Makin it mine. */

#heart i::before {
  content: 'pen#PwLXXP';
  position: absolute;
  z-index: 9;
  width: 100%;
  top: 35%; left: 0;
  font-style: normal;
  color: rgba(255,255,255,0.8);
  font-weight: 100;
  font-size: 30px;
  text-shadow: -1px -1px 0px rgba(0,0,0,0.2);
}


/* 
 * Hearts gotta beat. 
 */

@-webkit-keyframes heartbeat {
  0%, 100% { 
    -webkit-transform: scale(0.95); 
            transform: scale(0.95); 
  }
  50% { 
    -webkit-transform: scale(1.00); 
            transform: scale(1.00); 
  }
}

@keyframes heartbeat {
  0%, 100% { transform: scale(0.95); }
  50%      { transform: scale(1.00); }
}

@-webkit-keyframes echo {
  0%   { 
    opacity: 0.1;
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  100% { 
    opacity: 0;
    -webkit-transform: scale(1.4);
            transform: scale(1.4);
  }
}

@keyframes echo {
  0%   { 
    opacity: 0.1;
    transform: scale(1);
  }
  100% { 
    opacity: 0;
    transform: scale(1.4);
  }
}


/* 
 * Beautiful! Now for the beating...
 */

#heart, #echo {
  -webkit-animation-duration: 2000ms;
          animation-duration: 2000ms;
  -webkit-animation-timing-function: 
    cubic-bezier(0, 0, 0, 1.74);
          animation-timing-function: 
            cubic-bezier(0, 0, 0, 1.74);
  -webkit-animation-delay: 500ms;
          animation-delay: 500ms;
  -webkit-animation-iteration-count: infinite;
          animation-iteration-count: infinite;
  -webkit-animation-play-state: paused;
          animation-play-state: paused;
}

#heart { 
  -webkit-animation-name: heartbeat; 
          animation-name: heartbeat; 
}
#echo { 
  -webkit-animation-name: echo; 
          animation-name: echo; 
}


/* 
 * Ready...           
 */

#heart, #echo {

/* 
 * ...set...          
 */
  
  -webkit-animation-play-state: running;
          animation-play-state: running;
  
/* 
 * ...beat!        
 */
  
}

/* 
 *
 * Wahoo!         
 *
 * We did it!       
 *
 * I mean *I* did it, but you know, whatever...
 * jake albaugh definitely did not have anything 
 * to do with this.
 *    
 * 
 * See you later!
 *  
 */`;

  openComment = false;

  writeStyleChar = function (which) {
    // begin wrapping open comments
    if (which === "/" && openComment === false) {
      openComment = true;
      styles = $("#style-text").html() + which;
    } else if (which === "/" && openComment === true) {
      openComment = false;
      styles = $("#style-text")
        .html()
        .replace(/(\/[^\/]*\*)$/, '<em class="comment">$1/</em>');
      // wrap style declaration
    } else if (which === ":") {
      styles = $("#style-text")
        .html()
        .replace(/([a-zA-Z- ^\n]*)$/, '<em class="key">$1</em>:');
      // wrap style value
    } else if (which === ";") {
      styles = $("#style-text")
        .html()
        .replace(/([^:]*)$/, '<em class="value">$1</em>;');
      // wrap selector
    } else if (which === "{") {
      styles = $("#style-text")
        .html()
        .replace(/(.*)$/, '<em class="selector">$1</em>{');
    } else {
      styles = $("#style-text").html() + which;
    }
    $("#style-text").html(styles);
    return $("#style-tag").append(which);
  };

  writeStyles = function (message, index, interval) {
    var pre;
    if (index < message.length) {
      pre = document.getElementById("style-text");
      pre.scrollTop = pre.scrollHeight;
      writeStyleChar(message[index++]);
      return setTimeout(function () {
        return writeStyles(message, index, interval);
      }, interval);
    }
  };

  // appending the tags I'll need.
  $("body").append(`  <style id="style-tag"></style>
<span id="echo"></span>
<span id="heart"><i></i></span>
<pre id="style-text"></pre>`);

  time = window.innerWidth <= 578 ? 4 : 16;

  // starting it off
  writeStyles(styles, 0, time);

  /*
Changelog:
1.0.0: i exist!
1.0.1: heart instead of circle
1.0.2: including standard CSS3 transforms and animations
	was only using `-webkit` to be less verbose (standard transforms dont work in safari)
	now works in FF
1.0.3: crossbrowser echo 
	nested `scale()` styles (scaled in scaled) only worked in chrome
	moved echo out of heart to fix
1.0.4: more efficient animations
	`0%, 100% {}` instead of duplicated keyframes
1.0.5: overflwo fix
  `overflow: auto` on the `pre`
*/
}.call(this));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiPGFub255bW91cz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBLFdBQUEsRUFBQSxNQUFBLEVBQUEsSUFBQSxFQUFBLGNBQUEsRUFBQTs7RUFBQSxNQUFBLEdBQVMsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQUFBOztFQXdQVCxXQUFBLEdBQWM7O0VBRWQsY0FBQSxHQUFpQixRQUFBLENBQUMsS0FBRCxDQUFBLEVBQUE7O0lBRWYsSUFBRyxLQUFBLEtBQVMsR0FBVCxJQUFnQixXQUFBLEtBQWUsS0FBbEM7TUFDRSxXQUFBLEdBQWM7TUFDZCxNQUFBLEdBQVMsQ0FBQSxDQUFFLGFBQUYsQ0FBZ0IsQ0FBQyxJQUFqQixDQUFBLENBQUEsR0FBMEIsTUFGckM7S0FBQSxNQUdLLElBQUcsS0FBQSxLQUFTLEdBQVQsSUFBZ0IsV0FBQSxLQUFlLElBQWxDO01BQ0gsV0FBQSxHQUFjO01BQ2QsTUFBQSxHQUFTLENBQUEsQ0FBRSxhQUFGLENBQWdCLENBQUMsSUFBakIsQ0FBQSxDQUF1QixDQUFDLE9BQXhCLENBQWdDLGVBQWhDLEVBQWlELDhCQUFqRCxFQUZOOztLQUFBLE1BSUEsSUFBRyxLQUFBLEtBQVMsR0FBWjtNQUNILE1BQUEsR0FBUyxDQUFBLENBQUUsYUFBRixDQUFnQixDQUFDLElBQWpCLENBQUEsQ0FBdUIsQ0FBQyxPQUF4QixDQUFnQyxtQkFBaEMsRUFBcUQsMEJBQXJELEVBRE47O0tBQUEsTUFHQSxJQUFHLEtBQUEsS0FBUyxHQUFaO01BQ0gsTUFBQSxHQUFTLENBQUEsQ0FBRSxhQUFGLENBQWdCLENBQUMsSUFBakIsQ0FBQSxDQUF1QixDQUFDLE9BQXhCLENBQWdDLFVBQWhDLEVBQTRDLDRCQUE1QyxFQUROOztLQUFBLE1BR0EsSUFBRyxLQUFBLEtBQVMsR0FBWjtNQUNILE1BQUEsR0FBUyxDQUFBLENBQUUsYUFBRixDQUFnQixDQUFDLElBQWpCLENBQUEsQ0FBdUIsQ0FBQyxPQUF4QixDQUFnQyxPQUFoQyxFQUF5QywrQkFBekMsRUFETjtLQUFBLE1BQUE7TUFHSCxNQUFBLEdBQVMsQ0FBQSxDQUFFLGFBQUYsQ0FBZ0IsQ0FBQyxJQUFqQixDQUFBLENBQUEsR0FBMEIsTUFIaEM7O0lBSUwsQ0FBQSxDQUFFLGFBQUYsQ0FBZ0IsQ0FBQyxJQUFqQixDQUFzQixNQUF0QjtXQUNBLENBQUEsQ0FBRSxZQUFGLENBQWUsQ0FBQyxNQUFoQixDQUF1QixLQUF2QjtFQXBCZTs7RUFzQmpCLFdBQUEsR0FBYyxRQUFBLENBQUMsT0FBRCxFQUFVLEtBQVYsRUFBaUIsUUFBakIsQ0FBQTtBQUNkLFFBQUE7SUFBRSxJQUFHLEtBQUEsR0FBUSxPQUFPLENBQUMsTUFBbkI7TUFDRSxHQUFBLEdBQU0sUUFBUSxDQUFDLGNBQVQsQ0FBd0IsWUFBeEI7TUFDTixHQUFHLENBQUMsU0FBSixHQUFnQixHQUFHLENBQUM7TUFDcEIsY0FBQSxDQUFlLE9BQU8sQ0FBQyxLQUFBLEVBQUQsQ0FBdEI7YUFDQSxVQUFBLENBQVcsQ0FBQyxRQUFBLENBQUEsQ0FBQTtlQUNWLFdBQUEsQ0FBWSxPQUFaLEVBQXFCLEtBQXJCLEVBQTRCLFFBQTVCO01BRFUsQ0FBRCxDQUFYLEVBRUcsUUFGSCxFQUpGOztFQURZLEVBaFJkOzs7O0VBMlJBLENBQUEsQ0FBRSxNQUFGLENBQVMsQ0FBQyxNQUFWLENBQWlCLENBQUE7OzsyQkFBQSxDQUFqQixFQTNSQTs7O0VBbVNBLElBQUEsR0FBVSxNQUFNLENBQUMsVUFBUCxJQUFxQixHQUF4QixHQUFpQyxDQUFqQyxHQUF3QyxHQW5TL0M7Ozs7RUFzU0EsV0FBQSxDQUFZLE1BQVosRUFBb0IsQ0FBcEIsRUFBdUIsSUFBdkI7O0VBdFNBOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSIsInNvdXJjZXNDb250ZW50IjpbInN0eWxlcyA9IFwiXCJcIlxuLyogXG4gKiBcIk15c2VsZlwiIHYxLjAuNVxuICogUm9ib3QgcmlnaHRzIHByb3RlY3RlZCB1bmRlciBCT1QgTGljZW5zZVxuICogQXV0aG9yZWQgYnkgcGVuI1B3TFhYUFxuICovXG5cbmJvZHkge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWExYzI0OyBjb2xvcjogI2ZmZjtcbiAgZm9udC1zaXplOiAxM3B4OyBsaW5lLWhlaWdodDogMS40O1xuICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBzdWJwaXhlbC1hbnRpYWxpYXNlZDtcbn1cblxuLyogLi4uICAgICAgICAgICAgICAgICAgXG4gKlxuICogLi4uaGVsbG8/ICAgICAgICAgICAgXG4gKlxuICogT2ggaGFpISBJdCdzIG1lLCBwZW4jUHdMWFhQLiAgICAgICAgIFxuICpcbiAqIEknbSBqdXN0IHNpdHRpbmcgaGVyZSBjb2RpbmcgYXdheS4gICAgICAgICAgICBcbiAqXG4gKiBTdXJlLCB5b3UgY2FuIHdhdGNoLiAgICAgICAgICAgICAgICAgICAgICAgXG4gKlxuICpcbiAqIFRoaXMgQ1NTIGlzIGJlaW5nIGluamVjdGVkIGludG8gYSBET00gPHN0eWxlPiBlbGVtZW50IFxuICogYW5kIHdyaXR0ZW4gaW4gdGhpcyA8cHJlPiBlbGVtZW50IHNpbXVsdGFuZW91c2x5LiAgICAgICAgXG4gKlxuICogQ29uZnVzZWQ/IFdhdGNoIVxuICpcbiAqL1xuXG5wcmUgeyBcbiAgcG9zaXRpb246IGZpeGVkOyB3aWR0aDogNDglO1xuICB0b3A6IDMwcHg7IGJvdHRvbTogMzBweDsgbGVmdDogMjYlO1xuICB0cmFuc2l0aW9uOiBsZWZ0IDUwMG1zO1xuICBvdmVyZmxvdzogYXV0bztcbiAgYmFja2dyb3VuZC1jb2xvcjogIzMxMzc0NDsgY29sb3I6ICNhNmMzZDQ7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMCwwLDAsMC4yKTtcbiAgcGFkZGluZzogMjRweCAxMnB4O1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBib3JkZXItcmFkaXVzOiAzcHg7XG4gIGJveC1zaGFkb3c6IDBweCA0cHggMHB4IDJweCByZ2JhKDAsMCwwLDAuMSk7XG59XG5cblxuLyogXG4gKiBTeW50YXggaGlnaGxpZ2h0aW5nIFxuICogQ29sb3JzIGJhc2VkIG9uIEJhc2UxNiBPY2VhbiBEYXJrXG4gKi9cblxucHJlIGVtOm5vdCguY29tbWVudCkgeyBmb250LXN0eWxlOiBub3JtYWw7IH1cblxuLmNvbW1lbnQgICAgICAgeyBjb2xvcjogIzcwN2U4NDsgfVxuLnNlbGVjdG9yICAgICAgeyBjb2xvcjogI2M2NmM3NTsgfVxuLnNlbGVjdG9yIC5rZXkgeyBjb2xvcjogI2M2NmM3NTsgfVxuLmtleSAgICAgICAgICAgeyBjb2xvcjogI2M3Y2NkNDsgfVxuLnZhbHVlICAgICAgICAgeyBjb2xvcjogI2Q1OTI3YjsgfVxuXG5cbi8qIFxuICogTGV0J3MgYnVpbGQgbXkgbGl0dGxlIHBlbiBoZWFydC5cbiAqLyBcblxuXG4vKiBGaXJzdCwgd2UnbGwgbW92ZSB0aGlzIHMqKiogb3ZlciAqL1xuXG5wcmUgeyBsZWZ0OiA1MCU7IH1cblxuXG4vKiBOb3cgd2UgY2FuIGJ1aWxkIG15IGhlYXJ0ICovXG5cbiNoZWFydCwgI2VjaG8geyBcbiAgcG9zaXRpb246IGZpeGVkO1xuICB3aWR0aDogMzAwcHg7IGhlaWdodDogMzAwcHg7XG4gIHRvcDogY2FsYyg1MCUgLSAxNTBweCk7IGxlZnQ6IGNhbGMoMjUlIC0gMTUwcHgpO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgwLjk1KTtcbiAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDAuOTUpO1xufVxuXG4jaGVhcnQgeyB6LWluZGV4OiA4OyB9XG4jZWNobyAgeyB6LWluZGV4OiA3OyB9XG5cbiNoZWFydDo6YmVmb3JlLCAjaGVhcnQ6OmFmdGVyLCAjZWNobzo6YmVmb3JlLCAjZWNobzo6YWZ0ZXIge1xuICAgIGNvbnRlbnQ6ICcnO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDQwcHg7XG4gICAgd2lkdGg6IDE1MHB4OyBoZWlnaHQ6IDI0MHB4O1xuICAgIGJhY2tncm91bmQ6ICNjNjZjNzU7XG4gICAgYm9yZGVyLXJhZGl1czogMTUwcHggMTUwcHggMCAwO1xuICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoLTQ1ZGVnKTtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKC00NWRlZyk7XG4gICAgLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiAwIDEwMCU7XG4gICAgICAgICAgICB0cmFuc2Zvcm0tb3JpZ2luOiAwIDEwMCU7XG59XG5cbiNoZWFydDo6YmVmb3JlLCAjZWNobzo6YmVmb3JlIHtcbiAgbGVmdDogMTUwcHg7XG59XG5cbiNoZWFydDo6YWZ0ZXIsICNlY2hvOjphZnRlciB7XG4gIGxlZnQ6IDA7XG4gIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpO1xuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTtcbiAgLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiAxMDAlIDEwMCU7XG4gICAgICAgICAgdHJhbnNmb3JtLW9yaWdpbjogMTAwJSAxMDAlO1xufVxuXG5cbi8qIEl0IG5lZWRzIHNvbWUgZGVwdGggICovXG5cbiNoZWFydDo6YWZ0ZXIgeyBcbiAgYm94LXNoYWRvdzpcbiAgICBpbnNldCAtNnB4IC02cHggMHB4IDZweCByZ2JhKDI1NSwyNTUsMjU1LDAuMSk7XG59XG5cbiNoZWFydDo6YmVmb3JlIHsgXG4gIGJveC1zaGFkb3c6XG4gICAgaW5zZXQgNnB4IDZweCAwcHggNnB4IHJnYmEoMjU1LDI1NSwyNTUsMC4xKTtcbn1cblxuXG4vKiBNYWtpbiBpdCBtaW5lLiAqL1xuXG4jaGVhcnQgaTo6YmVmb3JlIHtcbiAgY29udGVudDogJ3BlbiNQd0xYWFAnO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHotaW5kZXg6IDk7XG4gIHdpZHRoOiAxMDAlO1xuICB0b3A6IDM1JTsgbGVmdDogMDtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBjb2xvcjogcmdiYSgyNTUsMjU1LDI1NSwwLjgpO1xuICBmb250LXdlaWdodDogMTAwO1xuICBmb250LXNpemU6IDMwcHg7XG4gIHRleHQtc2hhZG93OiAtMXB4IC0xcHggMHB4IHJnYmEoMCwwLDAsMC4yKTtcbn1cblxuXG4vKiBcbiAqIEhlYXJ0cyBnb3R0YSBiZWF0LiBcbiAqL1xuXG5ALXdlYmtpdC1rZXlmcmFtZXMgaGVhcnRiZWF0IHtcbiAgMCUsIDEwMCUgeyBcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMC45NSk7IFxuICAgICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwLjk1KTsgXG4gIH1cbiAgNTAlIHsgXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEuMDApOyBcbiAgICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS4wMCk7IFxuICB9XG59XG5cbkBrZXlmcmFtZXMgaGVhcnRiZWF0IHtcbiAgMCUsIDEwMCUgeyB0cmFuc2Zvcm06IHNjYWxlKDAuOTUpOyB9XG4gIDUwJSAgICAgIHsgdHJhbnNmb3JtOiBzY2FsZSgxLjAwKTsgfVxufVxuXG5ALXdlYmtpdC1rZXlmcmFtZXMgZWNobyB7XG4gIDAlICAgeyBcbiAgICBvcGFjaXR5OiAwLjE7XG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEpO1xuICAgICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgfVxuICAxMDAlIHsgXG4gICAgb3BhY2l0eTogMDtcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMS40KTtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS40KTtcbiAgfVxufVxuXG5Aa2V5ZnJhbWVzIGVjaG8ge1xuICAwJSAgIHsgXG4gICAgb3BhY2l0eTogMC4xO1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gIH1cbiAgMTAwJSB7IFxuICAgIG9wYWNpdHk6IDA7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjQpO1xuICB9XG59XG5cblxuLyogXG4gKiBCZWF1dGlmdWwhIE5vdyBmb3IgdGhlIGJlYXRpbmcuLi5cbiAqL1xuXG4jaGVhcnQsICNlY2hvIHtcbiAgLXdlYmtpdC1hbmltYXRpb24tZHVyYXRpb246IDIwMDBtcztcbiAgICAgICAgICBhbmltYXRpb24tZHVyYXRpb246IDIwMDBtcztcbiAgLXdlYmtpdC1hbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBcbiAgICBjdWJpYy1iZXppZXIoMCwgMCwgMCwgMS43NCk7XG4gICAgICAgICAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogXG4gICAgICAgICAgICBjdWJpYy1iZXppZXIoMCwgMCwgMCwgMS43NCk7XG4gIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiA1MDBtcztcbiAgICAgICAgICBhbmltYXRpb24tZGVsYXk6IDUwMG1zO1xuICAtd2Via2l0LWFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IGluZmluaXRlO1xuICAgICAgICAgIGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IGluZmluaXRlO1xuICAtd2Via2l0LWFuaW1hdGlvbi1wbGF5LXN0YXRlOiBwYXVzZWQ7XG4gICAgICAgICAgYW5pbWF0aW9uLXBsYXktc3RhdGU6IHBhdXNlZDtcbn1cblxuI2hlYXJ0IHsgXG4gIC13ZWJraXQtYW5pbWF0aW9uLW5hbWU6IGhlYXJ0YmVhdDsgXG4gICAgICAgICAgYW5pbWF0aW9uLW5hbWU6IGhlYXJ0YmVhdDsgXG59XG4jZWNobyB7IFxuICAtd2Via2l0LWFuaW1hdGlvbi1uYW1lOiBlY2hvOyBcbiAgICAgICAgICBhbmltYXRpb24tbmFtZTogZWNobzsgXG59XG5cblxuLyogXG4gKiBSZWFkeS4uLiAgICAgICAgICAgXG4gKi9cblxuI2hlYXJ0LCAjZWNobyB7XG5cbi8qIFxuICogLi4uc2V0Li4uICAgICAgICAgIFxuICovXG4gIFxuICAtd2Via2l0LWFuaW1hdGlvbi1wbGF5LXN0YXRlOiBydW5uaW5nO1xuICAgICAgICAgIGFuaW1hdGlvbi1wbGF5LXN0YXRlOiBydW5uaW5nO1xuICBcbi8qIFxuICogLi4uYmVhdCEgICAgICAgIFxuICovXG4gIFxufVxuXG4vKiBcbiAqXG4gKiBXYWhvbyEgICAgICAgICBcbiAqXG4gKiBXZSBkaWQgaXQhICAgICAgIFxuICpcbiAqIEkgbWVhbiAqSSogZGlkIGl0LCBidXQgeW91IGtub3csIHdoYXRldmVyLi4uXG4gKiBqYWtlIGFsYmF1Z2ggZGVmaW5pdGVseSBkaWQgbm90IGhhdmUgYW55dGhpbmcgXG4gKiB0byBkbyB3aXRoIHRoaXMuXG4gKlxuICogVGhpcyBwZW4gbG92ZXMgQ29kZVBlbiEgICAgICAgXG4gKiBcbiAqIFNlZSB5b3UgbGF0ZXIhXG4gKiAgXG4gKi9cblwiXCJcIlxuXG5vcGVuQ29tbWVudCA9IGZhbHNlXG5cbndyaXRlU3R5bGVDaGFyID0gKHdoaWNoKSAtPlxuXHQjIGJlZ2luIHdyYXBwaW5nIG9wZW4gY29tbWVudHNcbiAgaWYgd2hpY2ggPT0gJy8nICYmIG9wZW5Db21tZW50ID09IGZhbHNlXG4gICAgb3BlbkNvbW1lbnQgPSB0cnVlXG4gICAgc3R5bGVzID0gJCgnI3N0eWxlLXRleHQnKS5odG1sKCkgKyB3aGljaFxuICBlbHNlIGlmIHdoaWNoID09ICcvJyAmJiBvcGVuQ29tbWVudCA9PSB0cnVlXG4gICAgb3BlbkNvbW1lbnQgPSBmYWxzZVxuICAgIHN0eWxlcyA9ICQoJyNzdHlsZS10ZXh0JykuaHRtbCgpLnJlcGxhY2UoLyhcXC9bXlxcL10qXFwqKSQvLCAnPGVtIGNsYXNzPVwiY29tbWVudFwiPiQxLzwvZW0+JylcbiAgIyB3cmFwIHN0eWxlIGRlY2xhcmF0aW9uXG4gIGVsc2UgaWYgd2hpY2ggPT0gJzonXG4gICAgc3R5bGVzID0gJCgnI3N0eWxlLXRleHQnKS5odG1sKCkucmVwbGFjZSgvKFthLXpBLVotIF5cXG5dKikkLywgJzxlbSBjbGFzcz1cImtleVwiPiQxPC9lbT46JylcbiAgIyB3cmFwIHN0eWxlIHZhbHVlIFxuICBlbHNlIGlmIHdoaWNoID09ICc7J1xuICAgIHN0eWxlcyA9ICQoJyNzdHlsZS10ZXh0JykuaHRtbCgpLnJlcGxhY2UoLyhbXjpdKikkLywgJzxlbSBjbGFzcz1cInZhbHVlXCI+JDE8L2VtPjsnKVxuICAjIHdyYXAgc2VsZWN0b3JcbiAgZWxzZSBpZiB3aGljaCA9PSAneydcbiAgICBzdHlsZXMgPSAkKCcjc3R5bGUtdGV4dCcpLmh0bWwoKS5yZXBsYWNlKC8oLiopJC8sICc8ZW0gY2xhc3M9XCJzZWxlY3RvclwiPiQxPC9lbT57JylcbiAgZWxzZVxuICAgIHN0eWxlcyA9ICQoJyNzdHlsZS10ZXh0JykuaHRtbCgpICsgd2hpY2hcbiAgJCgnI3N0eWxlLXRleHQnKS5odG1sIHN0eWxlc1xuICAkKCcjc3R5bGUtdGFnJykuYXBwZW5kIHdoaWNoXG5cbndyaXRlU3R5bGVzID0gKG1lc3NhZ2UsIGluZGV4LCBpbnRlcnZhbCkgLT5cbiAgaWYgaW5kZXggPCBtZXNzYWdlLmxlbmd0aFxuICAgIHByZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkICdzdHlsZS10ZXh0J1xuICAgIHByZS5zY3JvbGxUb3AgPSBwcmUuc2Nyb2xsSGVpZ2h0XG4gICAgd3JpdGVTdHlsZUNoYXIgbWVzc2FnZVtpbmRleCsrXVxuICAgIHNldFRpbWVvdXQgKC0+XG4gICAgICB3cml0ZVN0eWxlcyBtZXNzYWdlLCBpbmRleCwgaW50ZXJ2YWxcbiAgICApLCBpbnRlcnZhbFxuICAgIFxuXG4jIGFwcGVuZGluZyB0aGUgdGFncyBJJ2xsIG5lZWQuXG4kKCdib2R5JykuYXBwZW5kIFwiXCJcIlxuICA8c3R5bGUgaWQ9XCJzdHlsZS10YWdcIj48L3N0eWxlPlxuXHQ8c3BhbiBpZD1cImVjaG9cIj48L3NwYW4+XG5cdDxzcGFuIGlkPVwiaGVhcnRcIj48aT48L2k+PC9zcGFuPlxuXHQ8cHJlIGlkPVwic3R5bGUtdGV4dFwiPjwvcHJlPlxuXCJcIlwiXG5cbiMgZmFzdGVyIHR5cGluZyBpbiBzbWFsbCBpZnJhbWUgb24gY29kZXBlbiBob21lcGFnZVxudGltZSA9IGlmIHdpbmRvdy5pbm5lcldpZHRoIDw9IDU3OCB0aGVuIDQgZWxzZSAxNlxuICBcbiMgc3RhcnRpbmcgaXQgb2ZmXG53cml0ZVN0eWxlcyhzdHlsZXMsIDAsIHRpbWUpXG5cbiMjI1xuQ2hhbmdlbG9nOlxuMS4wLjA6IGkgZXhpc3QhXG4xLjAuMTogaGVhcnQgaW5zdGVhZCBvZiBjaXJjbGVcbjEuMC4yOiBpbmNsdWRpbmcgc3RhbmRhcmQgQ1NTMyB0cmFuc2Zvcm1zIGFuZCBhbmltYXRpb25zXG5cdHdhcyBvbmx5IHVzaW5nIGAtd2Via2l0YCB0byBiZSBsZXNzIHZlcmJvc2UgKHN0YW5kYXJkIHRyYW5zZm9ybXMgZG9udCB3b3JrIGluIHNhZmFyaSlcblx0bm93IHdvcmtzIGluIEZGXG4xLjAuMzogY3Jvc3Nicm93c2VyIGVjaG8gXG5cdG5lc3RlZCBgc2NhbGUoKWAgc3R5bGVzIChzY2FsZWQgaW4gc2NhbGVkKSBvbmx5IHdvcmtlZCBpbiBjaHJvbWVcblx0bW92ZWQgZWNobyBvdXQgb2YgaGVhcnQgdG8gZml4XG4xLjAuNDogbW9yZSBlZmZpY2llbnQgYW5pbWF0aW9uc1xuXHRgMCUsIDEwMCUge31gIGluc3RlYWQgb2YgZHVwbGljYXRlZCBrZXlmcmFtZXNcbjEuMC41OiBvdmVyZmx3byBmaXhcbiAgYG92ZXJmbG93OiBhdXRvYCBvbiB0aGUgYHByZWBcbiMjIyJdfQ==
//# sourceURL=coffeescript
