// (C) 2007-2020 GoodData Corporation
/* tslint:disable: jsx-no-lambda */
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { screenshotWrap } from "@gooddata/test-storybook";
import { PivotTable } from "../../../src";
import { onErrorHandler } from "../../mocks";
import { ATTRIBUTE_1, ATTRIBUTE_2, MEASURE_1, MEASURE_2 } from "../../data/componentProps";
import { ScreenshotReadyWrapper, visualizationNotLoadingResolver } from "../../utils/ScreenshotReadyWrapper";
import { action } from "@storybook/addon-actions";
import {
    IWeakMeasureColumnWidthItem,
    IMeasureColumnWidthItem,
    IAllMeasureColumnWidthItem,
} from "../../../src/interfaces/PivotTable";

const wrapperStyle = { width: 1200, height: 300 };
const ATTRIBUTE_WIDTH = 400;
const MEASURE_WIDTH = 60;
const MEASURE_2_WIDTH = 150;
const ALL_MEASURE_WIDTH = 300;

const measureColumnWidthItemSimple: IMeasureColumnWidthItem = {
    measureColumnWidthItem: {
        width: {
            value: MEASURE_WIDTH,
        },
        locators: [
            {
                measureLocatorItem: {
                    measureIdentifier: MEASURE_1.measure.localIdentifier,
                },
            },
        ],
    },
};

const allMeasureColumnWidthItem: IAllMeasureColumnWidthItem = {
    measureColumnWidthItem: {
        width: {
            value: ALL_MEASURE_WIDTH,
        },
    },
};

const measureColumnWidthItemWithAttr: IMeasureColumnWidthItem = {
    measureColumnWidthItem: {
        width: {
            value: MEASURE_WIDTH,
        },
        locators: [
            {
                attributeLocatorItem: {
                    attributeIdentifier: ATTRIBUTE_2.visualizationAttribute.localIdentifier,
                    element: "/gdc/md/storybook/obj/5/elements?id=1",
                },
            },
            {
                measureLocatorItem: {
                    measureIdentifier: MEASURE_1.measure.localIdentifier,
                },
            },
        ],
    },
};
const attributeColumnWidthItem = {
    attributeColumnWidthItem: {
        width: { value: ATTRIBUTE_WIDTH },
        attributeIdentifier: ATTRIBUTE_1.visualizationAttribute.localIdentifier,
    },
};

const weakMeasureColumnWidthItemM1: IWeakMeasureColumnWidthItem = {
    measureColumnWidthItem: {
        width: {
            value: MEASURE_WIDTH,
        },
        locator: {
            measureLocatorItem: {
                measureIdentifier: MEASURE_1.measure.localIdentifier,
            },
        },
    },
};

const weakMeasureColumnWidthItemM2: IWeakMeasureColumnWidthItem = {
    measureColumnWidthItem: {
        width: {
            value: MEASURE_2_WIDTH,
        },
        locator: {
            measureLocatorItem: {
                measureIdentifier: MEASURE_2.measure.localIdentifier,
            },
        },
    },
};

storiesOf("Core components/PivotTable/ManualResizing/Simple table", module)
    .add("autoResize=off, growToFit=off", () => {
        const PivotTableWrapper = () => {
            const [attributeColumnWidth, setAttributeColumnWidth] = React.useState<number>(ATTRIBUTE_WIDTH);
            const [measureColumnWidth, setMeasureColumnWidth] = React.useState<number>(MEASURE_WIDTH);

            return (
                <>
                    <PivotTable
                        projectId="storybook"
                        measures={[MEASURE_1, MEASURE_2]}
                        rows={[ATTRIBUTE_1]}
                        config={{
                            columnSizing: {
                                defaultWidth: "unset",
                                growToFit: false,
                                columnWidths: [
                                    {
                                        measureColumnWidthItem: {
                                            width: {
                                                value: measureColumnWidth,
                                            },
                                            locators: [
                                                {
                                                    measureLocatorItem: {
                                                        measureIdentifier: MEASURE_1.measure.localIdentifier,
                                                    },
                                                },
                                            ],
                                        },
                                    },
                                    {
                                        attributeColumnWidthItem: {
                                            width: {
                                                value: attributeColumnWidth,
                                            },
                                            attributeIdentifier:
                                                ATTRIBUTE_1.visualizationAttribute.localIdentifier,
                                        },
                                    },
                                ],
                            },
                        }}
                        onError={onErrorHandler}
                        LoadingComponent={null}
                        ErrorComponent={null}
                    />
                    <button onClick={() => setAttributeColumnWidth(400)}>
                        Set attributes column to width 400
                    </button>
                    <button onClick={() => setAttributeColumnWidth(150)}>
                        Set attributes column to width 150
                    </button>
                    <button onClick={() => setMeasureColumnWidth(200)}>
                        Set measure columns to width 200
                    </button>
                    <button onClick={() => setMeasureColumnWidth(50)}>Set measure columns to width 50</button>
                </>
            );
        };
        return screenshotWrap(
            <ScreenshotReadyWrapper resolver={visualizationNotLoadingResolver()}>
                <div style={wrapperStyle} className="s-table">
                    <PivotTableWrapper />
                </div>
            </ScreenshotReadyWrapper>,
        );
    })
    .add("autoResize=off, growToFit=on", () =>
        screenshotWrap(
            <ScreenshotReadyWrapper resolver={visualizationNotLoadingResolver()}>
                <div style={wrapperStyle} className="s-table">
                    <PivotTable
                        projectId="storybook"
                        measures={[MEASURE_1, MEASURE_2]}
                        rows={[ATTRIBUTE_1]}
                        config={{
                            columnSizing: {
                                defaultWidth: "unset",
                                growToFit: true,
                                columnWidths: [measureColumnWidthItemSimple, attributeColumnWidthItem],
                            },
                        }}
                        onError={onErrorHandler}
                        LoadingComponent={null}
                        ErrorComponent={null}
                    />
                </div>
            </ScreenshotReadyWrapper>,
        ),
    )
    .add("autoResize=on, growToFit=off", () =>
        screenshotWrap(
            <ScreenshotReadyWrapper resolver={visualizationNotLoadingResolver()}>
                <div style={wrapperStyle} className="s-table">
                    <PivotTable
                        projectId="storybook"
                        measures={[MEASURE_1, MEASURE_2]}
                        rows={[ATTRIBUTE_1]}
                        config={{
                            columnSizing: {
                                defaultWidth: "viewport",
                                growToFit: false,
                                columnWidths: [measureColumnWidthItemSimple, attributeColumnWidthItem],
                            },
                        }}
                        onError={onErrorHandler}
                        LoadingComponent={null}
                        ErrorComponent={null}
                    />
                </div>
            </ScreenshotReadyWrapper>,
        ),
    )
    .add("autoResize=on, growToFit=on", () =>
        screenshotWrap(
            <ScreenshotReadyWrapper resolver={visualizationNotLoadingResolver()}>
                <div style={wrapperStyle} className="s-table">
                    <PivotTable
                        projectId="storybook"
                        measures={[MEASURE_1, MEASURE_2]}
                        rows={[ATTRIBUTE_1]}
                        config={{
                            columnSizing: {
                                defaultWidth: "viewport",
                                growToFit: true,
                                columnWidths: [measureColumnWidthItemSimple, attributeColumnWidthItem],
                            },
                        }}
                        onError={onErrorHandler}
                        LoadingComponent={null}
                        ErrorComponent={null}
                    />
                </div>
            </ScreenshotReadyWrapper>,
        ),
    )
    .add("manual size limits", () =>
        screenshotWrap(
            <ScreenshotReadyWrapper resolver={visualizationNotLoadingResolver()}>
                <div style={wrapperStyle} className="s-table">
                    <PivotTable
                        projectId="storybook"
                        measures={[MEASURE_1, MEASURE_2]}
                        rows={[ATTRIBUTE_1]}
                        config={{
                            columnSizing: {
                                defaultWidth: "viewport",
                                growToFit: true,
                                columnWidths: [
                                    {
                                        measureColumnWidthItem: {
                                            ...measureColumnWidthItemSimple.measureColumnWidthItem,
                                            width: { value: 30 }, // Will be ignored and replaced by MIN_WIDTH limit
                                        },
                                    },
                                    {
                                        attributeColumnWidthItem: {
                                            ...attributeColumnWidthItem.attributeColumnWidthItem,
                                            width: { value: 3000 }, // Will be ignored and replaced by MAX_WIDTH limit
                                        },
                                    },
                                ],
                            },
                        }}
                        onError={onErrorHandler}
                        LoadingComponent={null}
                        ErrorComponent={null}
                    />
                </div>
            </ScreenshotReadyWrapper>,
        ),
    );
storiesOf("Core components/PivotTable/ManualResizing/Table with column attr", module)
    .add("autoResize=on, growToFit=on", () => {
        const PivotTableWrapper = () => {
            const [attributeColumnWidth, setAttributeColumnWidth] = React.useState<number>(400);
            const [measureColumnWidth, setMeasureColumnWidth] = React.useState<number>(60);

            const attributeWidth = attributeColumnWidth
                ? {
                      attributeColumnWidthItem: {
                          width: {
                              value: attributeColumnWidth,
                          },
                          attributeIdentifier: ATTRIBUTE_1.visualizationAttribute.localIdentifier,
                      },
                  }
                : undefined;

            const measureWidth = measureColumnWidth
                ? {
                      measureColumnWidthItem: {
                          width: {
                              value: measureColumnWidth,
                          },
                          locators: [
                              {
                                  attributeLocatorItem: {
                                      attributeIdentifier: "a2",
                                      element: "/gdc/md/storybook/obj/5/elements?id=1",
                                  },
                              },
                              {
                                  measureLocatorItem: {
                                      measureIdentifier: "m1",
                                  },
                              },
                          ],
                      },
                  }
                : undefined;

            const columnWidths = [measureWidth, attributeWidth].filter(Boolean);

            return (
                <>
                    <PivotTable
                        projectId="storybook"
                        measures={[MEASURE_1, MEASURE_2]}
                        rows={[ATTRIBUTE_1]}
                        columns={[ATTRIBUTE_2]}
                        config={{
                            columnSizing: {
                                defaultWidth: "viewport",
                                growToFit: true,
                                columnWidths,
                            },
                        }}
                        onError={onErrorHandler}
                        LoadingComponent={null}
                        ErrorComponent={null}
                    />
                    <button onClick={() => setAttributeColumnWidth(400)}>
                        Set attributes column to width 400
                    </button>
                    <button onClick={() => setAttributeColumnWidth(50)}>
                        Set attributes column to width 50
                    </button>
                    <button onClick={() => setAttributeColumnWidth(0)}>
                        Remove width from attributes column
                    </button>
                    <button onClick={() => setMeasureColumnWidth(200)}>
                        Set measure columns to width 200
                    </button>
                    <button onClick={() => setMeasureColumnWidth(50)}>Set measure columns to width 50</button>
                    <button onClick={() => setMeasureColumnWidth(0)}>
                        Remove width from measure columns
                    </button>
                </>
            );
        };
        return screenshotWrap(
            <ScreenshotReadyWrapper resolver={visualizationNotLoadingResolver()}>
                <div style={wrapperStyle} className="s-table">
                    <PivotTableWrapper />
                </div>
            </ScreenshotReadyWrapper>,
        );
    })

    .add("autoResize=off, growToFit=off", () => {
        const columnWidths = [measureColumnWidthItemWithAttr, attributeColumnWidthItem];

        return screenshotWrap(
            <ScreenshotReadyWrapper resolver={visualizationNotLoadingResolver()}>
                <div style={wrapperStyle} className="s-table">
                    <PivotTable
                        projectId="storybook"
                        measures={[MEASURE_1, MEASURE_2]}
                        rows={[ATTRIBUTE_1]}
                        columns={[ATTRIBUTE_2]}
                        config={{
                            columnSizing: {
                                defaultWidth: "unset",
                                growToFit: false,
                                columnWidths,
                            },
                        }}
                        onError={onErrorHandler}
                        LoadingComponent={null}
                        ErrorComponent={null}
                    />
                </div>
            </ScreenshotReadyWrapper>,
        );
    })
    .add("autoResize=on, growToFit=off", () => {
        const columnWidths = [measureColumnWidthItemWithAttr, attributeColumnWidthItem];

        return screenshotWrap(
            <ScreenshotReadyWrapper resolver={visualizationNotLoadingResolver()}>
                <div style={wrapperStyle} className="s-table">
                    <PivotTable
                        projectId="storybook"
                        measures={[MEASURE_1, MEASURE_2]}
                        rows={[ATTRIBUTE_1]}
                        columns={[ATTRIBUTE_2]}
                        config={{
                            columnSizing: {
                                defaultWidth: "viewport",
                                growToFit: false,
                                columnWidths,
                            },
                        }}
                        onError={onErrorHandler}
                        LoadingComponent={null}
                        ErrorComponent={null}
                    />
                </div>
            </ScreenshotReadyWrapper>,
        );
    })
    .add("autoResize=off, growToFit=on", () => {
        const columnWidths = [measureColumnWidthItemWithAttr, attributeColumnWidthItem];

        return screenshotWrap(
            <ScreenshotReadyWrapper resolver={visualizationNotLoadingResolver()}>
                <div style={wrapperStyle} className="s-table">
                    <PivotTable
                        projectId="storybook"
                        measures={[MEASURE_1, MEASURE_2]}
                        rows={[ATTRIBUTE_1]}
                        columns={[ATTRIBUTE_2]}
                        config={{
                            columnSizing: {
                                defaultWidth: "unset",
                                growToFit: true,
                                columnWidths,
                            },
                        }}
                        onError={onErrorHandler}
                        LoadingComponent={null}
                        ErrorComponent={null}
                    />
                </div>
            </ScreenshotReadyWrapper>,
        );
    });

storiesOf("Core components/PivotTable/ManualResizing/With All measure width definition", module)
    .add("autoResize=off, growToFit=off", () => {
        const columnWidths = [
            allMeasureColumnWidthItem,
            measureColumnWidthItemWithAttr,
            attributeColumnWidthItem,
        ];

        return screenshotWrap(
            <ScreenshotReadyWrapper resolver={visualizationNotLoadingResolver()}>
                <div style={wrapperStyle} className="s-table">
                    <PivotTable
                        projectId="storybook"
                        measures={[MEASURE_1, MEASURE_2]}
                        rows={[ATTRIBUTE_1]}
                        columns={[ATTRIBUTE_2]}
                        config={{
                            columnSizing: {
                                defaultWidth: "unset",
                                growToFit: false,
                                columnWidths,
                            },
                        }}
                        onError={onErrorHandler}
                        LoadingComponent={null}
                        ErrorComponent={null}
                        onColumnResized={action("onColumnResized")}
                    />
                </div>
            </ScreenshotReadyWrapper>,
        );
    })
    .add("autoResize=on, growToFit=off", () => {
        const columnWidths = [
            allMeasureColumnWidthItem,
            measureColumnWidthItemWithAttr,
            attributeColumnWidthItem,
        ];

        return screenshotWrap(
            <ScreenshotReadyWrapper resolver={visualizationNotLoadingResolver()}>
                <div style={wrapperStyle} className="s-table">
                    <PivotTable
                        projectId="storybook"
                        measures={[MEASURE_1, MEASURE_2]}
                        rows={[ATTRIBUTE_1]}
                        columns={[ATTRIBUTE_2]}
                        config={{
                            columnSizing: {
                                defaultWidth: "viewport",
                                growToFit: false,
                                columnWidths,
                            },
                        }}
                        onError={onErrorHandler}
                        LoadingComponent={null}
                        ErrorComponent={null}
                        onColumnResized={action("onColumnResized")}
                    />
                </div>
            </ScreenshotReadyWrapper>,
        );
    })
    .add("autoResize=on, growToFit=on", () => {
        const columnWidths = [
            allMeasureColumnWidthItem,
            measureColumnWidthItemWithAttr,
            attributeColumnWidthItem,
        ];

        return screenshotWrap(
            <ScreenshotReadyWrapper resolver={visualizationNotLoadingResolver()}>
                <div style={wrapperStyle} className="s-table">
                    <PivotTable
                        projectId="storybook"
                        measures={[MEASURE_1, MEASURE_2]}
                        rows={[ATTRIBUTE_1]}
                        columns={[ATTRIBUTE_2]}
                        config={{
                            columnSizing: {
                                defaultWidth: "viewport",
                                growToFit: true,
                                columnWidths,
                            },
                        }}
                        onError={onErrorHandler}
                        LoadingComponent={null}
                        ErrorComponent={null}
                        onColumnResized={action("onColumnResized")}
                    />
                </div>
            </ScreenshotReadyWrapper>,
        );
    });

storiesOf("Core components/PivotTable/ManualResizing/With weak measure width definition", module)
    .add("autoResize=off, growToFit=off", () => {
        const columnWidths = [
            weakMeasureColumnWidthItemM2,
            weakMeasureColumnWidthItemM1,
            attributeColumnWidthItem,
        ];

        return screenshotWrap(
            <ScreenshotReadyWrapper resolver={visualizationNotLoadingResolver()}>
                <div style={wrapperStyle} className="s-table">
                    <PivotTable
                        projectId="storybook"
                        measures={[MEASURE_1, MEASURE_2]}
                        rows={[ATTRIBUTE_1]}
                        columns={[ATTRIBUTE_2]}
                        config={{
                            columnSizing: {
                                defaultWidth: "unset",
                                growToFit: false,
                                columnWidths,
                            },
                        }}
                        onError={onErrorHandler}
                        LoadingComponent={null}
                        ErrorComponent={null}
                        onColumnResized={action("onColumnResized")}
                    />
                </div>
            </ScreenshotReadyWrapper>,
        );
    })
    .add("autoResize=on, growToFit=off", () => {
        const columnWidths = [
            weakMeasureColumnWidthItemM2,
            weakMeasureColumnWidthItemM1,
            attributeColumnWidthItem,
        ];

        return screenshotWrap(
            <ScreenshotReadyWrapper resolver={visualizationNotLoadingResolver()}>
                <div style={wrapperStyle} className="s-table">
                    <PivotTable
                        projectId="storybook"
                        measures={[MEASURE_1, MEASURE_2]}
                        rows={[ATTRIBUTE_1]}
                        columns={[ATTRIBUTE_2]}
                        config={{
                            columnSizing: {
                                defaultWidth: "viewport",
                                growToFit: false,
                                columnWidths,
                            },
                        }}
                        onError={onErrorHandler}
                        LoadingComponent={null}
                        ErrorComponent={null}
                        onColumnResized={action("onColumnResized")}
                    />
                </div>
            </ScreenshotReadyWrapper>,
        );
    })
    .add("autoResize=on, growToFit=on", () => {
        const columnWidths = [
            weakMeasureColumnWidthItemM2,
            weakMeasureColumnWidthItemM1,
            attributeColumnWidthItem,
        ];

        return screenshotWrap(
            <ScreenshotReadyWrapper resolver={visualizationNotLoadingResolver()}>
                <div style={wrapperStyle} className="s-table">
                    <PivotTable
                        projectId="storybook"
                        measures={[MEASURE_1, MEASURE_2]}
                        rows={[ATTRIBUTE_1]}
                        columns={[ATTRIBUTE_2]}
                        config={{
                            columnSizing: {
                                defaultWidth: "viewport",
                                growToFit: true,
                                columnWidths,
                            },
                        }}
                        onError={onErrorHandler}
                        LoadingComponent={null}
                        ErrorComponent={null}
                        onColumnResized={action("onColumnResized")}
                    />
                </div>
            </ScreenshotReadyWrapper>,
        );
    });
