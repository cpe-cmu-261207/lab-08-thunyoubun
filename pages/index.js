import ColorPickerContainer from "../components/ColorPickerContainer";
import Header from "../components/Header";
import { PainterContext } from "../contexts/PainterContext";
import { useState } from "react";
import Canvas from "../components/Canvas";
import CanvasLib from "../libs/CanvasLib";

export default function Home() {
  //selected color from color picker
  //set black color as default
  const [selColor, setSelColor] = useState("#000000");

  //16x16 2D Array that holds color data
  const [pixels, setPixels] = useState(CanvasLib.createEmptyCanvas());

  //will be called by Cell component
  const paint = (xPos, yPos) => {
    //copy from old 2d Array
    const newPixels = CanvasLib.copyCanvas(pixels);
    //your code here
    newPixels[yPos][xPos] = selColor;
    setPixels(newPixels);
  };

  const clear = () => {
    //your code here
    //Hint : use CanvasLib.createEmptyCanvas()
    const newCanvas = CanvasLib.createEmptyCanvas(pixels);
    setPixels(newCanvas);
  };

  const randomColor = () => {
    const newPixels = CanvasLib.copyCanvas(pixels);
    const colors = [
      "#000000",
      "#804000",
      "#FE0000",
      "#FE6A00",
      "#FFFFFF",
      "#01FFFF",
      "#0094FE",
      "#0026FF",
      "#B100FE",
      "#FF006E",
      "#FFD800",
      "#00FF01",
    ];

    for (let i = 0; i < 16; i++) {
      for (let j = 0; j < 16; j++) {
        newPixels[i][j] = colors[Math.floor(Math.random() * colors.length)];
        setPixels(newPixels);
      }
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "GhostWhite" }}>
      <PainterContext.Provider value={{ selColor, setSelColor, pixels, paint }}>
        <Header />
        <ColorPickerContainer />
        <Canvas />

        <div className="d-flex justify-content-center gap-2">
          <button className="btn btn-dark" onClick={clear}>
            Clear
          </button>
          <button className="btn btn-dark" onClick={randomColor}>
            Random Color
          </button>
        </div>
      </PainterContext.Provider>
    </div>
  );
}
