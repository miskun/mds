import { forwardRef, useEffect, useId, useImperativeHandle, useMemo, useRef, useState } from "react";
import type { HTMLAttributes } from "react";
import uPlot from "uplot";
import "uplot/dist/uPlot.min.css";
import { cx } from "./utils";
import "./time-series-chart.css";

export type TimeSeriesChartSize = "sm" | "md" | "lg";
export type TimeSeriesChartLegendPosition = "top" | "bottom";

export interface TimeSeriesChartPoint {
  /** Unix timestamp in milliseconds. */
  timestamp: number;
  /** Numeric value, or null when the series has a gap. */
  value: number | null;
}

export interface TimeSeriesChartSeries {
  /** Stable series id. */
  id: string;
  /** Display label used for legends and accessible summaries. */
  label: string;
  /** Series values in timestamp order. */
  data: TimeSeriesChartPoint[];
  /** Optional CSS color. Defaults to the MDS chart palette. */
  color?: string;
  /** Render the series with an area fill. */
  area?: boolean;
  /** Hide this series without changing the aligned data shape. */
  hidden?: boolean;
}

export interface TimeSeriesChartRef {
  /** Access the underlying uPlot instance for advanced integrations. */
  getPlot: () => uPlot | null;
  /** Redraw the chart after external layout changes. */
  redraw: () => void;
}

export interface TimeSeriesChartProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /** Chart series. Timestamps are Unix milliseconds and are aligned automatically. */
  series: TimeSeriesChartSeries[];
  /** Semantic chart height within the active MDS target. */
  size?: TimeSeriesChartSize;
  /** Text title for assistive technology when no aria-label is provided. */
  title?: string;
  /** Compact description of the chart's purpose or key takeaway. */
  summary?: string;
  /** Custom value formatter for axis ticks and fallback data. */
  formatValue?: (value: number) => string;
  /** Custom timestamp formatter for fallback data. */
  formatTimestamp?: (timestamp: number) => string;
  /** Include zero in the y-axis range. */
  includeZero?: boolean;
  /** Show the series legend. */
  showLegend?: boolean;
  /** Legend placement around the plotting region. Defaults to bottom. */
  legendPosition?: TimeSeriesChartLegendPosition;
}

const chartPalette = [
  "--mds-chart-series-1",
  "--mds-chart-series-2",
  "--mds-chart-series-3",
  "--mds-chart-series-4",
  "--mds-chart-series-5",
];

const fallbackPalette = ["#7dd3fc", "#c084fc", "#facc15", "#34d399", "#fb7185"];

export const TimeSeriesChart = forwardRef<TimeSeriesChartRef, TimeSeriesChartProps>(function TimeSeriesChart(
  {
    series,
    size = "md",
    title,
    summary,
    formatValue = formatCompactValue,
    formatTimestamp = formatDateTime,
    includeZero = true,
    showLegend = true,
    legendPosition = "bottom",
    className,
    id,
    role,
    "aria-label": ariaLabel,
    "aria-describedby": ariaDescribedBy,
    ...props
  },
  ref,
) {
  const generatedId = useId();
  const chartId = id ?? `mds-time-series-chart-${generatedId}`;
  const summaryId = summary ? `${chartId}-summary` : undefined;
  const plotMountRef = useRef<HTMLDivElement>(null);
  const plotRef = useRef<uPlot | null>(null);
  const [width, setWidth] = useState(0);

  const aligned = useMemo(() => alignSeries(series), [series]);
  const legendItems = useMemo(() => {
    return series.map((item, index) => ({
      id: item.id,
      label: item.label,
      color: item.color ?? `var(${chartPalette[index % chartPalette.length]})`,
      hidden: item.hidden === true,
    }));
  }, [series]);

  useImperativeHandle(ref, () => ({
    getPlot: () => plotRef.current,
    redraw: () => plotRef.current?.redraw(),
  }));

  useEffect(() => {
    const element = plotMountRef.current;
    if (!element) return;

    const updateWidth = () => {
      setWidth(Math.max(0, Math.floor(element.getBoundingClientRect().width)));
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const element = plotMountRef.current;
    if (!element || width <= 0) return;

    plotRef.current?.destroy();
    plotRef.current = null;

    if (aligned.data[0].length === 0) return;

    const styles = getComputedStyle(element);
    const height = readPxToken(styles, `--mds-chart-height-${size}`, 260);
    const axisColor = readColorToken(styles, "--mds-chart-axis", "#73737c");
    const axisLabelColor = readColorToken(styles, "--mds-chart-axis-label", "#a6a6ad");
    const gridColor = readColorToken(styles, "--mds-chart-grid", "#2a2a2e");
    const axisFontSize = readPxToken(styles, "--mds-font-size-xxs", 11);
    const axisFont = `${axisFontSize}px ${styles.fontFamily}`;
    const labelInset = readPxToken(styles, "--mds-field-gap", 8);
    const yAxisLabelInset = readPxToken(styles, "--mds-panel-padding", 16);
    const labelEdgeMargin = readPxToken(styles, "--mds-stack-gap", 12);
    const xAxisHeight = readPxToken(styles, "--mds-chart-x-axis-height", 36);
    const colors = series.map((item, index) =>
      resolveCanvasColor(
        styles,
        item.color ?? `var(${chartPalette[index % chartPalette.length]})`,
        fallbackPalette[index % fallbackPalette.length],
      ),
    );
    const yRange = getYRange(aligned.data, includeZero);

    plotRef.current = new uPlot(
      {
        width,
        height,
        padding: [0, 0, 0, 0],
        legend: { show: false },
        cursor: {
          points: { show: true, size: 6, width: 2 },
          drag: { x: false, y: false },
        },
        select: { show: false, left: 0, top: 0, width: 0, height: 0 },
        scales: {
          x: { time: true },
          y: { auto: false, range: () => yRange },
        },
        axes: [
          {
            scale: "x",
            space: 64,
            size: (_plot, values) => getXAxisHeight(values, xAxisHeight, axisFontSize, labelInset),
            gap: labelInset,
            stroke: axisColor,
            grid: { show: true, stroke: gridColor, width: 1 },
            ticks: { show: true, stroke: gridColor, width: 1, size: 4 },
            font: axisFont,
          },
          {
            scale: "y",
            size: 0,
            gap: 0,
            stroke: "transparent",
            grid: { show: true, stroke: gridColor, width: 1 },
            ticks: { show: false },
            splits: (plot) => {
              const scale = plot.scales.y;
              if (!scale || scale.min == null || scale.max == null) return [];
              return calculateNiceTicks(scale.min, scale.max);
            },
            values: () => [],
          },
        ],
        series: [
          {},
          ...series.map((item, index) => ({
            label: item.label,
            show: item.hidden !== true,
            stroke: colors[index],
            width: 2,
            fill: item.area ? withAlpha(colors[index], 0.16) : undefined,
            points: {
              show: false,
              stroke: colors[index],
              fill: readColorToken(styles, "--mds-black", "#000000"),
              width: 2,
            },
          })),
        ],
        hooks: {
          draw: [
            (plot) => {
              drawYAxisLabelsInside(plot, {
                color: axisLabelColor,
                edgeMargin: labelEdgeMargin,
                font: axisFont,
                formatValue,
                inset: yAxisLabelInset,
              });
            },
          ],
        },
      },
      aligned.data,
      element,
    );

    return () => {
      plotRef.current?.destroy();
      plotRef.current = null;
    };
  }, [aligned.data, formatValue, includeZero, series, size, width]);

  const describedBy = [ariaDescribedBy, summaryId].filter(Boolean).join(" ") || undefined;

  return (
    <div
      {...props}
      id={chartId}
      className={cx(
        "mds-time-series-chart",
        `mds-time-series-chart--${size}`,
        showLegend && `mds-time-series-chart--legend-${legendPosition}`,
        className,
      )}
      role={role ?? "group"}
      aria-label={ariaLabel ?? title}
      aria-describedby={describedBy}
    >
      {showLegend && legendPosition === "top" ? (
        <TimeSeriesChartLegend items={legendItems} position={legendPosition} />
      ) : null}
      <div className="mds-time-series-chart__plot">
        <div ref={plotMountRef} className="mds-time-series-chart__plot-mount" />
      </div>
      {showLegend && legendPosition === "bottom" ? (
        <TimeSeriesChartLegend items={legendItems} position={legendPosition} />
      ) : null}
      {summary ? (
        <p id={summaryId} className="mds-time-series-chart__summary">
          {summary}
        </p>
      ) : null}
      <table className="mds-time-series-chart__table">
        <caption>{title ?? "Time series chart data"}</caption>
        <thead>
          <tr>
            <th scope="col">Time</th>
            {series.map((item) => (
              <th key={item.id} scope="col">
                {item.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {aligned.timestamps.map((timestamp, index) => (
            <tr key={timestamp}>
              <th scope="row">{formatTimestamp(timestamp)}</th>
              {series.map((item, seriesIndex) => {
                const value = aligned.data[seriesIndex + 1][index];
                return <td key={item.id}>{value == null ? "" : formatValue(value)}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

interface TimeSeriesChartLegendItem {
  color: string;
  hidden: boolean;
  id: string;
  label: string;
}

function TimeSeriesChartLegend({
  items,
  position,
}: {
  items: TimeSeriesChartLegendItem[];
  position: TimeSeriesChartLegendPosition;
}) {
  return (
    <div className={cx("mds-time-series-chart__legend", `mds-time-series-chart__legend--${position}`)} aria-hidden="true">
      {items.map((item) => (
        <span key={item.id} className={cx("mds-time-series-chart__legend-item", item.hidden && "mds-time-series-chart__legend-item--hidden")}>
          <i className="mds-time-series-chart__legend-swatch" style={{ background: item.color }} />
          <span className="mds-time-series-chart__legend-label">{item.label}</span>
        </span>
      ))}
    </div>
  );
}

function alignSeries(series: TimeSeriesChartSeries[]) {
  const timestamps = Array.from(new Set(series.flatMap((item) => item.data.map((point) => point.timestamp)))).sort((a, b) => a - b);
  const values = series.map((item) => {
    const byTimestamp = new Map(item.data.map((point) => [point.timestamp, point.value]));
    return timestamps.map((timestamp) => byTimestamp.get(timestamp) ?? null);
  });

  return {
    timestamps,
    data: [timestamps.map((timestamp) => timestamp / 1000), ...values] as uPlot.AlignedData,
  };
}

function getYRange(data: uPlot.AlignedData, includeZero: boolean): [number, number] {
  const values = data
    .slice(1)
    .flat()
    .filter((value): value is number => value != null);
  if (!values.length) return [0, 1];

  let min = Math.min(...values);
  let max = Math.max(...values);

  if (includeZero) {
    min = Math.min(0, min);
    max = Math.max(0, max);
  }

  if (min === max) {
    const padding = Math.abs(min) * 0.1 || 1;
    return [min - padding, max + padding];
  }

  const padding = (max - min) * 0.1;
  return [min - padding, max + padding];
}

function calculateNiceTicks(min: number, max: number, targetCount = 5) {
  const range = max - min;
  if (range <= 0) return [min];

  const roughStep = range / targetCount;
  const magnitude = 10 ** Math.floor(Math.log10(roughStep));
  const niceMultiples = [1, 2, 2.5, 5, 10];
  const niceStep = niceMultiples.find((multiple) => magnitude * multiple >= roughStep) ?? 10;
  const step = magnitude * niceStep;
  const ticks: number[] = [];
  let tick = Math.ceil(min / step) * step;

  while (tick <= max) {
    ticks.push(Math.round(tick * 1e10) / 1e10);
    tick += step;
  }

  return ticks;
}

function getXAxisHeight(values: string[] | null, minHeight: number, fontSize: number, gap: number) {
  const rows = Math.max(1, ...(values ?? []).map((value) => String(value).split("\n").length));
  const lineHeight = fontSize * 1.5;
  const tickSize = 4;
  return Math.max(minHeight, Math.ceil(tickSize + gap + rows * lineHeight + 4));
}

interface YAxisLabelOptions {
  color: string;
  edgeMargin: number;
  font: string;
  formatValue: (value: number) => string;
  inset: number;
}

function drawYAxisLabelsInside(plot: uPlot, options: YAxisLabelOptions) {
  const scale = plot.scales.y;
  if (!scale || scale.min == null || scale.max == null) return;

  const ticks = calculateNiceTicks(scale.min, scale.max);
  if (!ticks.length) return;

  const ratio = uPlot.pxRatio;
  const inset = options.inset * ratio;
  const edgeMargin = options.edgeMargin * ratio;

  plot.ctx.save();
  plot.ctx.font = scaleCanvasFont(options.font, ratio);
  plot.ctx.fillStyle = options.color;
  plot.ctx.textAlign = "left";
  plot.ctx.textBaseline = "middle";
  plot.ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
  plot.ctx.shadowBlur = 4 * ratio;
  plot.ctx.shadowOffsetX = 0;
  plot.ctx.shadowOffsetY = 0;

  for (const value of ticks) {
    const y = plot.valToPos(value, "y", true);
    const insideBounds = y >= plot.bbox.top + edgeMargin && y <= plot.bbox.top + plot.bbox.height - edgeMargin;
    if (insideBounds) {
      plot.ctx.fillText(options.formatValue(value), plot.bbox.left + inset, y);
    }
  }

  plot.ctx.restore();
}

function scaleCanvasFont(font: string, ratio: number) {
  return font.replace(/^([\d.]+)px /, (_match, size: string) => `${Number.parseFloat(size) * ratio}px `);
}

function readPxToken(styles: CSSStyleDeclaration, token: string, fallback: number) {
  const value = Number.parseFloat(styles.getPropertyValue(token));
  return Number.isFinite(value) ? value : fallback;
}

function readColorToken(styles: CSSStyleDeclaration, token: string, fallback: string) {
  return resolveCanvasColor(styles, styles.getPropertyValue(token).trim(), fallback);
}

function resolveCanvasColor(styles: CSSStyleDeclaration, color: string, fallback: string, seen = new Set<string>()) {
  if (!color) return fallback;

  const variableMatch = color.match(/^var\((--[^),]+)(?:,[^)]+)?\)$/);
  if (variableMatch) {
    const token = variableMatch[1];
    if (seen.has(token)) return fallback;

    seen.add(token);
    return resolveCanvasColor(styles, styles.getPropertyValue(token).trim(), fallback, seen);
  }

  return color;
}

function withAlpha(color: string, alpha: number) {
  if (color.startsWith("#") && color.length === 7) {
    const r = Number.parseInt(color.slice(1, 3), 16);
    const g = Number.parseInt(color.slice(3, 5), 16);
    const b = Number.parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  if (color.startsWith("rgb(")) {
    return color.replace("rgb(", "rgba(").replace(")", `, ${alpha})`);
  }

  return color;
}

function formatCompactValue(value: number) {
  return new Intl.NumberFormat(undefined, { notation: "compact", maximumFractionDigits: 1 }).format(value);
}

function formatDateTime(timestamp: number) {
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
  }).format(timestamp);
}
