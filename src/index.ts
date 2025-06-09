import pptxgen from "pptxgenjs";

const getWelcomeSlide = (slide: pptxgen.Slide) => {
  slide.addText("Hello World from PptxGenJS!", {
    x: 1,
    y: 1,
    color: "FF0000",
  });
};

const slides = [getWelcomeSlide];

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
    fileName: "assets/demo.pptx",
  });
};

execute();
