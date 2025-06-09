import pptxgen from "pptxgenjs";

// 1. Create a Presentation
let pres = new pptxgen();

// 2. Add a Slide to the presentation
let slide = pres.addSlide();

// 3. Add 1+ objects (Tables, Shapes, etc.) to the Slide
slide.addText("Hello World from PptxGenJS!", {
  x: 1,
  y: 1,
  color: "363636",
});

// 4. Save the Presentation
pres.writeFile({
  fileName: "assets/Hello-World.pptx",
});
