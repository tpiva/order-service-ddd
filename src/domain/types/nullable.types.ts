/**
 * Makes a type nullable (can be null)
 */
export type Nullable<T> = T | null;

/**
 * Makes a type optional (can be undefined)
 */
export type Optional<T> = T | undefined;

/**
 * Makes a type both nullable and optional
 */
export type NullableOptional<T> = T | null | undefined;
