import colors, { palette } from "../data/constants";
import {
  extractInfoBlockData,
  extractMonthLabels,
  extractTableData,
} from "../utils/common";

// Responses
import { displayPeriod6Month } from "../data/responses/displayPeriod6Month";
import { displayProduct } from "../data/responses/displayProduct";
import { displayTopKpi } from "../data/responses/displayTopKpi";
import { ampedPeriod6Month } from "../data/responses/ampedPeriod6Month";
import { ampedProduct } from "../data/responses/ampedProduct";
import { ampedTopKpi } from "../data/responses/ampedTopKpi";
import { callTrackingPeriod6Month } from "../data/responses/callTrackingPeriod6Month";
import { callTrackingTopKpi } from "../data/responses/callTrackingTopKpi";
import { emailMarketingPeriod6Month } from "../data/responses/emailMarketingPeriod6Month";
import { emailMarketingTopKpi } from "../data/responses/emailMarketingTopKpi";
import { endorsementPeriod6Month } from "../data/responses/endorsementPeriod6Month";
import { endorsementProduct } from "../data/responses/endorsementProduct";
import { endorsementTopKpi } from "../data/responses/endorsementTopKpi";
import { programmaticAudioPeriod6Month } from "../data/responses/programmaticAudioPeriod6Month";
import { programmaticAudioTopKpi } from "../data/responses/programmaticAudioTopKpi";
import { semPeriod6Month } from "../data/responses/semPeriod6Month";
import { semTopKpi } from "../data/responses/semTopKpi";
import { socialDisplayPeriod6Month } from "../data/responses/socialDisplayPeriod6Month";
import { socialDisplayProduct } from "../data/responses/socialDisplayProduct";
import { socialDisplayTopKpi } from "../data/responses/socialDisplayTopKpi";
import { socialVideoProduct } from "../data/responses/socialVideoProduct";
import { socialVideoTopKpi } from "../data/responses/socialVideoTopKpi";
import { sparkPeriod6Month } from "../data/responses/sparkPeriod6Month";
import { sparkTopKpi } from "../data/responses/sparkTopKpi";
import { stvPeriod6Month } from "../data/responses/stvPeriod6Month";
import { stvProduct } from "../data/responses/stvProduct";
import { stvTopKpi } from "../data/responses/stvTopKpi";
import { videoPeriod6Month } from "../data/responses/videoPeriod6Month";
import { videoProduct } from "../data/responses/videoProduct";
import { videoTopKpi } from "../data/responses/videoTopKpi";
import { TemplatePayload } from "../types/powerpoint.types";

export default async (payload: TemplatePayload) => {
  // TODO: Fetch data from api endpoints
  // TODO: Dynamically show or hide slides depending on the report menu

  const { builder, footerText } = payload;

  builder.addMultipleToSlide(
    [
      {
        size: {
          height: 1.5,
        },
        entities: [
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
      },
      {
        entities: [
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
      },
    ],
    {
      markup: {
        text: {
          header: "Display Ads - Overall Performance",
          footer: footerText,
        },
      },
    }
  );

  builder.addBarChartSlide(
    {
      labelFormatCode: "0.00%",
      rotateBottomLabels: true,
      data: [
        {
          name: "Display - CTR Last 6 Months",
          color: colors.chartBar1,
          labels: extractMonthLabels(displayPeriod6Month.result.data),
          values: displayPeriod6Month.result.data.map((v) => v.ctr),
        },
      ],
    },
    {
      markup: {
        text: {
          header: "Display Ads - Overall Performance",
          footer: footerText,
        },
      },
    }
  );

  builder.addMultipleToSlide(
    [
      {
        size: {
          height: 1.5,
        },
        entities: [
          {
            type: "circles",
            title: "Video - Top KPIs",
            payload: {
              data: extractInfoBlockData(
                [
                  {
                    text: "Impressions",
                    fieldExtract: (v) => v.impressions,
                  },
                  {
                    text: "Video Completes",
                    fieldExtract: (v) => v.videoCompletions,
                  },
                  {
                    text: "VCR(%)",
                    fieldExtract: (v) => v.vcr,
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
                videoTopKpi.result.data
              ),
            },
          },
        ],
      },
      {
        entities: [
          {
            type: "table",
            title: "Video - Product Performance",
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
                  text: "Video Completes",
                  fieldExtractor: (v) => v.videoCompletions,
                  heatMapColor: colors.tableHighlight3,
                },
                {
                  text: "VCR(%)",
                  fieldExtractor: (v) => v.vcr,
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
              ],
              videoProduct.result.data
            ),
          },
        ],
      },
    ],
    {
      markup: {
        text: {
          header: "Video Ads - Overall Performance",
          footer: footerText,
        },
      },
    }
  );

  builder.addBarChartSlide(
    {
      labelFormatCode: "0.00%",
      data: [
        {
          name: "VCR(%)",
          color: palette.green,
          values: videoPeriod6Month.result.data.map((v) => v.vcr),
        },
        {
          name: "CTR(%)",
          color: palette.color1,
          values: videoPeriod6Month.result.data.map((v) => v.ctr),
        },
      ],
    },
    {
      markup: {
        text: {
          header: "Video Ads - Overall Performance",
          content: "Video - CTR & VCR Last 6 Months",
          footer: footerText,
        },
      },
    }
  );

  builder.addMultipleToSlide(
    [
      {
        size: {
          height: 1.5,
        },
        entities: [
          {
            type: "circles",
            title: "STV - Top KPIs",
            payload: {
              data: extractInfoBlockData(
                [
                  {
                    text: "Impressions",
                    fieldExtract: (v) => v.impressions,
                  },
                  {
                    text: "Video Completes",
                    fieldExtract: (v) => v.videoCompletions,
                  },
                  {
                    text: "VCR(%)",
                    fieldExtract: (v) => v.vcr,
                  },
                  {
                    text: "Clicks",
                    fieldExtract: (v) => v.clicks,
                  },
                  {
                    text: "Total Conversions",
                    fieldExtract: (v) => v.conversions,
                  },
                ],
                stvTopKpi.result.data
              ),
            },
          },
        ],
      },
      {
        entities: [
          {
            type: "table",
            title: "STV - Product Performance",
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
                  text: "Video Completes",
                  fieldExtractor: (v) => v.videoCompletions,
                  heatMapColor: colors.tableHighlight3,
                },
                {
                  text: "VCR(%)",
                  fieldExtractor: (v) => v.vcr,
                },
                {
                  text: "Total Conversions",
                  fieldExtractor: (v) => v.conversions,
                },
              ],
              stvProduct.result.data
            ),
          },
        ],
      },
    ],
    {
      markup: {
        text: {
          header: "STV Ads - Overall Performance",
          footer: footerText,
        },
      },
    }
  );

  builder.addBarChartSlide(
    {
      labelFormatCode: "0.00",
      rotateBottomLabels: true,
      data: [
        {
          name: "STV - VCR Last 6 Months",
          labels: extractMonthLabels(stvPeriod6Month.result.data),
          color: palette.color1,
          values: stvPeriod6Month.result.data.map((v) => v.vcr),
        },
      ],
    },
    {
      markup: {
        text: {
          header: "STV Ads - Overall Performance",
          content: "STV - VCR Last 6 Months",
          footer: footerText,
        },
      },
    }
  );

  builder.addMultipleToSlide(
    [
      {
        size: {
          height: 1.5,
        },
        entities: [
          {
            type: "circles",
            title: "Key Performance Indicators (Display)",
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
                  {
                    text: "Engagement",
                    fieldExtract: (v) => v.pageengagements,
                  },
                  {
                    text: "Total Conversions/Leads",
                    fieldExtract: (v) => v.conversions,
                  },
                ],
                socialDisplayTopKpi.result.data
              ),
            },
          },
        ],
      },
      {
        entities: [
          {
            type: "table",
            title: "Product Performance (Display)",
            payload: extractTableData(
              [
                {
                  text: "Product",
                  fieldExtractor: (v) => v._id.subProduct,
                },
                {
                  text: "Impressions",
                  fieldExtractor: (v) => v.impressions,
                  heatMapColor: colors.tableHighlight1,
                },
                {
                  text: "Clicks",
                  fieldExtractor: (v) => v.clicks,
                },
                {
                  text: "CTR(%)",
                  fieldExtractor: (v) => v.ctr,
                },
                {
                  text: "Engagement",
                  fieldExtractor: (v) => v.pageengagements,
                },
                {
                  text: "Conversions/Leads",
                  fieldExtractor: (v) => v.conversions,
                },
              ],
              socialDisplayProduct.result.data
            ),
          },
        ],
      },
    ],
    {
      markup: {
        text: {
          header: "Social Ads - Overall Performance",
          footer: footerText,
        },
      },
    }
  );

  builder.addMultipleToSlide(
    [
      {
        size: {
          height: 1.5,
        },
        entities: [
          {
            type: "circles",
            title: "Key Performance Indicators (Video)",
            payload: {
              data: extractInfoBlockData(
                [
                  {
                    text: "Video Start(s)",
                    fieldExtract: (v) => v.videoStarts,
                  },
                  {
                    text: "Video Complete(s)",
                    fieldExtract: (v) => v.videoCompletions,
                  },
                  {
                    text: "VCR(%)",
                    fieldExtract: (v) => v.vcr,
                  },
                ],
                socialVideoTopKpi.result.data
              ),
            },
          },
        ],
      },
      {
        entities: [
          {
            type: "table",
            title: "Product Performance (Video)",
            payload: extractTableData(
              [
                {
                  text: "Product",
                  fieldExtractor: (v) => v._id.subProduct,
                },
                {
                  text: "Video Start(s)",
                  fieldExtractor: (v) => v.videoStarts,
                },
                {
                  text: "Video Complete(s)",
                  fieldExtractor: (v) => v.videoCompletions,
                  heatMapColor: colors.tableHighlight4,
                },
                {
                  text: "VCR(%)",
                  fieldExtractor: (v) => v.vcr,
                },
              ],
              socialVideoProduct.result.data
            ),
          },
        ],
      },
    ],
    {
      markup: {
        text: {
          header: "Social Ads - Overall Performance",
          footer: footerText,
        },
      },
    }
  );

  builder.addBarChartSlide(
    {
      labelFormatCode: "0.00%",
      rotateBottomLabels: true,
      data: [
        {
          name: "VCR(%)",
          color: palette.color1,
          labels: extractMonthLabels(socialDisplayPeriod6Month.result.data),
          values: socialDisplayPeriod6Month.result.data.map((v) => v.vcr),
        },
        {
          name: "CTR(%)",
          color: palette.color3,
          values: socialDisplayPeriod6Month.result.data.map((v) => v.ctr),
        },
      ],
    },
    {
      markup: {
        text: {
          header: "Social Ads - Overall Performance",
          content: "Social - CTR & VCR Last 6 Months",
          footer: footerText,
        },
      },
    }
  );

  builder.addMultipleToSlide(
    [
      {
        size: {
          height: 2.5,
        },
        entities: [
          {
            type: "circles",
            title: "Search Engine Marketing",
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
                  {
                    text: "Primary Conversions",
                    fieldExtract: (v) => v.conversions,
                  },
                  {
                    text: "Primary Conv. Rate",
                    fieldExtract: (v) => v.conversionsRate,
                  },
                  {
                    text: "All Conversions",
                    fieldExtract: (v) => v.allConversions,
                  },
                  {
                    text: "All Conv. Rate",
                    fieldExtract: (v) => v.allconversionsRate,
                  },
                ],
                semTopKpi.result.data,
                {
                  perChunk: 4,
                }
              ),
            },
          },
        ],
      },
      {
        entities: [
          {
            type: "bar",
            title: "SEM - CTR Last 6 Months",
            payload: {
              rotateBottomLabels: true,
              data: [
                {
                  name: "SEM - CTR Last 6 Months",
                  color: colors.chartBar1,
                  labels: extractMonthLabels(semPeriod6Month.result.data),
                  values: semPeriod6Month.result.data.map((v) => v.ctr),
                },
              ],
            },
          },
        ],
      },
    ],
    {
      markup: {
        text: {
          header: "SEM Ads - Overall Performance",
          footer: footerText,
        },
      },
    }
  );

  builder.addMultipleToSlide(
    [
      {
        entities: [
          {
            type: "circles",
            title: "SPARK - Top KPIs",
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
                  {
                    text: "Conversions",
                    fieldExtract: (v) => v.conversions,
                  },
                ],
                sparkTopKpi.result.data
              ),
            },
          },
        ],
      },
      {
        entities: [
          {
            type: "bar",
            title: "SPARK - CTR Last 6 Months",
            payload: {
              rotateBottomLabels: true,
              data: [
                {
                  name: "SPARK - CTR Last 6 Months",
                  color: colors.chartBar1,
                  labels: extractMonthLabels(sparkPeriod6Month.result.data),
                  values: sparkPeriod6Month.result.data.map((v) => v.ctr),
                },
              ],
            },
          },
        ],
      },
    ],
    {
      markup: {
        text: {
          header: "SPARK Ads - Overall Performance",
          footer: footerText,
        },
      },
    }
  );

  builder.addMultipleToSlide(
    [
      {
        entities: [
          {
            type: "circles",
            title: "E-mail Marketing - Top KPIs",
            payload: {
              data: extractInfoBlockData(
                [
                  {
                    text: "Opens",
                    fieldExtract: (v) => v.opens,
                  },
                  {
                    text: "Clicks",
                    fieldExtract: (v) => v.clicks,
                  },
                  {
                    text: "Click Rate(%)",
                    fieldExtract: (v) => v.clickRate,
                  },
                ],
                emailMarketingTopKpi.result.data
              ),
            },
          },
        ],
      },
      {
        entities: [
          {
            type: "bar",
            title: "E-mail Marketing - CTR Last 6 Months",
            payload: {
              labelFormatCode: "0.00",
              rotateBottomLabels: true,
              data: [
                {
                  name: "E-mail Marketing -CTR Last 6 Months",
                  color: palette.color1,
                  labels: extractMonthLabels(sparkPeriod6Month.result.data),
                  values: emailMarketingPeriod6Month.result.data.map(
                    (v) => v.clickRate
                  ),
                },
              ],
            },
          },
        ],
      },
    ],
    {
      markup: {
        text: {
          header: "E-mail Marketing - Overall Performance",
          footer: footerText,
        },
      },
    }
  );

  builder.addMultipleToSlide(
    [
      {
        entities: [
          {
            type: "circles",
            title: "Digital Endorsements - Top KPIs",
            payload: {
              data: extractInfoBlockData(
                [
                  {
                    text: "Impressions",
                    fieldExtract: (v) => v.impressions,
                  },
                  {
                    text: "Link Clicks",
                    fieldExtract: (v) => v.clicks,
                  },
                  {
                    text: "CTR(%)",
                    fieldExtract: (v) => v.ctr,
                  },
                ],
                endorsementTopKpi.result.data
              ),
            },
          },
        ],
      },
      {
        entities: [
          {
            type: "table",
            title: "Digital Endorsements - Product Performance",
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
                  text: "Link Clicks",
                  fieldExtractor: (v) => v.clicks,
                  heatMapColor: colors.tableHighlight3,
                },
              ],
              endorsementProduct.result.data
            ),
          },
        ],
      },
    ],
    {
      markup: {
        text: {
          header: "Digital and Local Endorsements - Overall Performance",
          footer: footerText,
        },
      },
    }
  );

  builder.addBarChartSlide(
    {
      labelFormatCode: "0.00",
      rotateBottomLabels: true,
      data: [
        {
          name: "Digital Endorsements - CTR Last 6 Months",
          color: colors.chartBar1,
          labels: extractMonthLabels(endorsementPeriod6Month.result.data),
          values: endorsementPeriod6Month.result.data.map((v) => v.ctr),
        },
      ],
    },
    {
      markup: {
        text: {
          header: "Digital and Local Endorsements - Overall Performance",
          content: "Digital Endorsements - CTR Last 6 Months",
          footer: footerText,
        },
      },
    }
  );

  builder.addMultipleToSlide(
    [
      {
        entities: [
          {
            type: "circles",
            title: "Local Display (AMPED) - Top KPIs",
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
                ampedTopKpi.result.data
              ),
            },
          },
        ],
      },
      {
        entities: [
          {
            type: "table",
            title: "Local Display (AMPED) - Product Performance",
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
              ],
              ampedProduct.result.data
            ),
          },
        ],
      },
    ],
    {
      markup: {
        text: {
          header: "AMPED Ads - Overall Performance",
          footer: footerText,
        },
      },
    }
  );

  builder.addBarChartSlide(
    {
      rotateBottomLabels: true,
      data: [
        {
          name: "Local Display - CTR Last 6 Months",
          color: colors.chartBar1,
          labels: extractMonthLabels(ampedPeriod6Month.result.data),
          values: ampedPeriod6Month.result.data.map((v) => v.clicks),
        },
      ],
    },
    {
      markup: {
        text: {
          header: "AMPED Ads - Overall Performance",
          content: "Local Display - CTR Last 6 Months",
          footer: footerText,
        },
      },
    }
  );

  builder.addMultipleToSlide(
    [
      {
        entities: [
          {
            type: "circles",
            title: "Programmatic Audio Marketing - Top KPIs",
            payload: {
              data: extractInfoBlockData(
                [
                  {
                    text: "Impressions",
                    fieldExtract: (v) => v.impressions,
                  },
                  {
                    text: "Audio Start(s)",
                    fieldExtract: (v) => v.videoStarts,
                  },
                  {
                    text: "Audio Complete(s)",
                    fieldExtract: (v) => v.videoCompletions,
                  },
                  {
                    text: "ACR(%)",
                    fieldExtract: (v) => v.vcr,
                  },
                  {
                    text: "Clicks",
                    fieldExtract: (v) => v.clicks,
                  },
                ],
                programmaticAudioTopKpi.result.data,
                {
                  perChunk: 6,
                }
              ),
            },
          },
        ],
      },
      {
        entities: [
          {
            type: "bar",
            title: "ACR(%)(Last 6 Months)",
            payload: {
              rotateBottomLabels: true,
              data: [
                {
                  name: "ACR(%)(Last 6 Months)",
                  color: colors.chartBar1,
                  labels: extractMonthLabels(
                    programmaticAudioPeriod6Month.result.data
                  ),
                  values: programmaticAudioPeriod6Month.result.data.map(
                    (v) => v.vcr
                  ),
                },
              ],
            },
          },
        ],
      },
    ],
    {
      markup: {
        text: {
          header: "Programmatic Audio Marketing Ads - Overall Performance",
          footer: footerText,
        },
      },
    }
  );

  builder.addMultipleToSlide(
    [
      {
        entities: [
          {
            type: "circles",
            title: "Call Performance - Top KPIs",
            payload: {
              data: extractInfoBlockData(
                [
                  {
                    text: "Total Calls",
                    fieldExtract: (v) => v.callCount,
                  },
                  {
                    text: "First Calls",
                    fieldExtract: (v) => v.firstCall,
                  },
                  {
                    text: "Answered Calls",
                    fieldExtract: (v) => v.answeredCalls,
                  },
                  {
                    text: "Answered(%)",
                    fieldExtract: (v) => v.answeredRate,
                  },
                ],
                callTrackingTopKpi.result.data,
                {
                  perChunk: 2,
                }
              ),
            },
          },
          {
            type: "bar",
            title: "ACR(%)(Last 6 Months)",
            payload: {
              rotateBottomLabels: true,
              data: [
                {
                  name: "Call Performance Tracking - Last 6 Months",
                  color: colors.chartBar1,
                  labels: extractMonthLabels(
                    callTrackingPeriod6Month.result.data
                  ),
                  values: callTrackingPeriod6Month.result.data.map(
                    (v) => v.callCount
                  ),
                },
              ],
            },
          },
        ],
      },
    ],
    {
      markup: {
        text: {
          header: "Call Tracking - Overall Performance",
          footer: footerText,
        },
      },
    }
  );

  return builder;
};
