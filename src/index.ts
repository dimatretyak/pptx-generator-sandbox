import pptxgen from "pptxgenjs";
import path from "node:path";

const getWelcomeSlide = (slide: pptxgen.Slide) => {
  slide.addText("Hello World from PptxGenJS!", {
    x: 1,
    y: 1,
    color: "FF0000",
  });
};

const getMediaSlide = (slide: pptxgen.Slide) => {
  slide.addImage({
    path: path.join(__dirname, "assets", "images", "avatar.jpeg"),
    x: 1,
    y: 1,
  });
};

const slides = [getWelcomeSlide, getMediaSlide];

const execute = () => {
  // 1. Create a Presentation
  const presentation = new pptxgen();

  presentation.layout = "LAYOUT_16x9"; // Set the layout to 16:9

  for (const generateSlide of slides) {
    const slide = presentation.addSlide();
    generateSlide(slide);
  }

  // 4. Save the Presentation
  presentation.writeFile({
    fileName: "output/demo.pptx",
  });
};

execute();
