import type { CSSProperties, ReactNode } from "react";
import { Grid, Panel, Stack, Text } from "../components";

interface SurfaceComparisonProps {
  canvas: ReactNode;
  panel: ReactNode;
  maxWidth?: CSSProperties["maxWidth"];
}

export function SurfaceComparison({ canvas, panel, maxWidth = 960 }: SurfaceComparisonProps) {
  return (
    <Grid columns={2} align="start" style={{ maxWidth }}>
      <div style={{ border: "1px solid transparent", borderRadius: "var(--mds-radius-md)", padding: "var(--mds-panel-padding)" }}>
        <Stack gap="sm">
          <Text weight="strong">Canvas</Text>
          {canvas}
        </Stack>
      </div>
      <Panel variant="raised">
        <Stack gap="sm">
          <Text weight="strong">Panel</Text>
          {panel}
        </Stack>
      </Panel>
    </Grid>
  );
}
