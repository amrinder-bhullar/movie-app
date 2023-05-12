import { useState } from "react";

function Slider({ bookmarks }) {
    const [hoverActive, setHoverActive] = useState();

    const handleHover = (index) => {
        setHoverActive(index);
    };

    return (
        <div className="slider w-full h-96 flex justify-start">
            {bookmarks.slice(0, 6).map((slide, index) => (
                <div
                    style={{ backgroundImage: `url(${slide.poster})` }}
                    key={index}
                    onMouseEnter={() => {
                        handleHover(index);
                    }}
                    className={
                        hoverActive === index
                            ? "transition-all duration-500 h-full w-5/6 border-white border bg-no-repeat bg-cover"
                            : "transition-all duration-500 h-full w-4/12 border-white border bg-no-repeat bg-cover"
                    }
                >
                    {slide.title}
                </div>
            ))}
        </div>
    );
}

export default Slider;
