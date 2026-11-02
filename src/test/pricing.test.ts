import { describe, expect, it } from "vitest";
import { calcTotals } from "@/lib/pricing.js";

describe("cart totals", () => {
  it("charges ₹99 shipping below ₹999", () => {
    expect(calcTotals([{ price: 500, qty: 1 }], "").shipping).toBe(99);
  });
  it("ships free at ₹999 or more", () => {
    expect(calcTotals([{ price: 999, qty: 1 }], "").shipping).toBe(0);
  });
  it("applies NEXUS10 as 10% off and 18% GST", () => {
    const t = calcTotals([{ price: 1000, qty: 2 }], "nexus10");
    expect(t.discount).toBe(200);
    expect(t.gst).toBe(324);
    expect(t.total).toBe(2124);
  });
});
