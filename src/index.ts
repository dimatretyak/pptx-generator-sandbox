import pptxgen from "pptxgenjs";
import path from "node:path";

class PresentationBuilder {
  private slideGenerators: Array<(slide: pptxgen.Slide) => void> = [];

  addWelcomeSlide() {
    this.slideGenerators.push((slide) => {
      slide.addText("Hello World from PptxGenJS!", {
        x: 1,
        y: 1,
        color: "FF0000",
      });
    });

    return this;
  }

  addMediaSlide() {
    this.slideGenerators.push((slide) => {
      slide.addImage({
        path: path.join(__dirname, "assets", "images", "avatar.jpeg"),
        x: 1,
        y: 1,
      });
    });

    return this;
  }

  buildAndSave(fileName: string) {
    const presentation = new pptxgen();
    presentation.layout = "LAYOUT_16x9";

    for (const generateSlide of this.slideGenerators) {
      const slide = presentation.addSlide();
      generateSlide(slide);
    }

    presentation.writeFile({ fileName });
  }
}

const builder = new PresentationBuilder().addWelcomeSlide().addMediaSlide();

builder.buildAndSave("output/demo.pptx");
