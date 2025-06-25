import colors from "../data/constants";
import { extractInfoBlockData, extractTableData } from "../utils/common";

// Responses
import { displayProduct } from "../data/responses/displayProduct";
import { displayTopKpi } from "../data/responses/displayTopKpi";
import { TemplatePayload } from "../types/powerpoint.types";

export default async (payload: TemplatePayload) => {
  // TODO: Fetch data from api endpoints
  // TODO: Dynamically show or hide slides depending on the report menu

  const { builder } = payload;
  const footer = "06/23/2025-06/23/2025";

  builder.addMultipleToSlide(
    [
      [
        {
          type: "circles",
          title: "Display - Top KPIs",
          payload: {
            data: extractInfoBlockData(
              [
                {
                  text: "Impressions",
                  fieldExtract: (v) => v.impressions,
                },
                {
                  text: "Clicks",
                  fieldExtract: (v) => v.clicks,
                },
                {
                  text: "CTR(%)",
                  fieldExtract: (v) => v.ctr,
                },
              ],
              displayTopKpi.result.data
            ),
          },
        },
      ],
      [
        {
          type: "table",
          title: "Display - Product Performance",
          payload: extractTableData(
            [
              {
                text: "Product",
                fieldExtractor: (v) => v._id.subProduct,
              },
              {
                text: "Impressions",
                fieldExtractor: (v) => v.impressions,
              },
              {
                text: "Clicks",
                fieldExtractor: (v) => v.clicks,
                heatMapColor: colors.tableHighlight1,
              },
              {
                text: "CTR(%)",
                fieldExtractor: (v) => v.ctr,
              },
              {
                text: "Total Conversions",
                fieldExtractor: (v) => v.conversions,
                heatMapColor: colors.tableHighlight3,
              },
            ],
            displayProduct.result.data
          ),
        },
      ],
    ],
    {
      markup: {
        text: {
          header: "Display Ads - Overall Performance",
          footer,
        },
      },
    }
  );

  return builder;
};
