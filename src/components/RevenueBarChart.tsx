"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Bucket = {
  dia: string;
  direta: number;
  recorrencia: number;
};

const NAVY = "#0e2a47";
const GOLD = "#a6822f";
const LINE = "#e5dfd2";
const INK_3 = "#8a95a3";

function buildBuckets(seed: number): Bucket[] {
  const buckets: Bucket[] = [];
  for (let i = 1; i <= 30; i++) {
    const wave = Math.sin((i + seed) * 0.6) * 0.4 + 0.6;
    const direta = Math.round(400 + wave * 320 + (i % 7) * 18);
    const recorrencia = Math.round(220 + (1 - wave) * 260 + (i % 5) * 12);
    buckets.push({ dia: String(i).padStart(2, "0"), direta, recorrencia });
  }
  return buckets;
}

const TICKS = ["01", "10", "20", "30"];

type RevenueBarChartProps = {
  /** Periodo seleciondo no W10 — muda o seed do mock pra "filtrar" sem backend. */
  periodo?: "HOJE" | "7D" | "30D" | "90D";
};

/**
 * Grafico receita 30 dias dual series (direta navy + recorrencia gold-deep).
 * Recharts wrapper estatico — dataset varia pelo seed do periodo.
 */
export function RevenueBarChart({ periodo = "30D" }: RevenueBarChartProps) {
  const seed = periodo === "HOJE" ? 9 : periodo === "7D" ? 3 : periodo === "90D" ? 1 : 0;
  const data = buildBuckets(seed);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-64 w-full rounded-lg bg-paper/40" aria-hidden />;
  }

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 12, left: -8, bottom: 0 }}>
          <CartesianGrid stroke={LINE} strokeDasharray="2 4" vertical={false} />
          <XAxis
            dataKey="dia"
            stroke={INK_3}
            tick={{
              fontFamily: "var(--f-mono)",
              fontSize: 11,
              fill: INK_3,
              letterSpacing: "0.08em",
            }}
            tickLine={false}
            axisLine={false}
            ticks={TICKS}
            tickFormatter={(v) => `${v} MAI`}
          />
          <YAxis
            stroke={INK_3}
            tick={{
              fontFamily: "var(--f-mono)",
              fontSize: 10,
              fill: INK_3,
            }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `R$${(v as number) / 100 / 10}k`}
            width={48}
          />
          <Tooltip
            cursor={{ fill: "rgba(14,42,71,0.04)" }}
            contentStyle={{
              borderRadius: 8,
              border: `1px solid ${LINE}`,
              backgroundColor: "#fbfaf7",
              fontFamily: "var(--f-mono)",
              fontSize: 11,
            }}
            labelFormatter={(v) => `Dia ${v}`}
            formatter={(v) => `R$ ${Number(v).toLocaleString("pt-BR")}`}
          />
          <Bar dataKey="direta" name="Direta" fill={NAVY} radius={[3, 3, 0, 0]} />
          <Bar
            dataKey="recorrencia"
            name="Recorrencia"
            fill={GOLD}
            radius={[3, 3, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
