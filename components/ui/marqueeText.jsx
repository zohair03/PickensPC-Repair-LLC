import { MarqueeText } from "../../cms/content/content";


const Marquee = () => {
  return (
    <div className="led-board-wrapper">
      {/* Outer casing / bezel */}
      <div className="led-board-bezel">
        {/* Display area */}
        <div className="led-display">
          {/* Scanline overlay */}
          <div className="led-scanlines" aria-hidden="true" />
          {/* Dot grid overlay */}
          <div className="led-dot-grid" aria-hidden="true" />
          {/* Edge fade masks */}
          <div className="led-fade-left" aria-hidden="true" />
          <div className="led-fade-right" aria-hidden="true" />

          {/* Scrolling text track */}
          <div className="led-scroll-track">
            {/* First set */}
            {MarqueeText.map((item, i) => (
              <span key={`a-${i}`} className="led-text">
                {item}
              </span>
            ))}

            {/* Duplicate set for seamless loop */}
            {MarqueeText.map((item, i) => (
              <span key={`b-${i}`} className="led-text">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marquee;