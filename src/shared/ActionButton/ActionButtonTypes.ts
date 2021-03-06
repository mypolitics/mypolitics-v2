import { FlattenSimpleInterpolation } from "styled-components";

export type Variant = "bluish" | "red" | "white" | "green";
export type Variants = Record<Variant, FlattenSimpleInterpolation>;

export type Size = "regular" | "large";
export type Sizes = Record<Size, FlattenSimpleInterpolation>;
