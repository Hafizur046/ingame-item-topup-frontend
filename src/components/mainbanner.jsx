import React from 'react'

export default function MainBanner(){
    return(
    <div class="mainbanner">
      <div
        id="main-banner"
        class="owl-carousel home-slider owl-theme"
        style={{opacity: 1, display: "block"}}
      >
        <div class="owl-wrapper-outer">
          <div
            class="owl-wrapper"
            style={{
              width: "8094px",
              left: "0px",
              display: "block",
              // transition: "all 0ms ease 0s",
              // transform: "translate3d(-1349px, 0px, 0px)",
              // transformOrigin: "2023.5px center",
              // perspectiveOrigin: "2023.5px center"
            }}
          >
            <div class="owl-item" style={{width: "1349px"}}>
              <div class="item">
                <a href="http://html.lionode.com/moonstore/ms01/index.html#"
                  ><img
                    src="./MoonStore_files/Main-Banner1.jpg"
                    alt="main-banner1"
                    class="img-responsive"
                /></a>
              </div>
            </div>
          </div>
        </div>

        <div class="owl-controls clickable" style={{display: "block"}}>
          <div class="owl-pagination">
            <div class="owl-page"><span class=""></span></div>
            <div class="owl-page active"><span class=""></span></div>
            <div class="owl-page"><span class=""></span></div>
          </div>
          <div class="owl-buttons">
            <div class="owl-prev">prev</div>
            <div class="owl-next">next</div>
          </div>
        </div>
      </div>
    </div>

    )
}