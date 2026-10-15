export function requiredChildren(props, key, component) {
  return props[key] == null ? new Error(`${component} requires children.`) : null;
}
export function optionalBoolean(props, key, component) {
  return props[key] !== undefined && typeof props[key] !== "boolean" ? new Error(`${component}.${key} must be a boolean.`) : null;
}
export function optionalString(props, key, component) {
  return props[key] !== undefined && typeof props[key] !== "string" ? new Error(`${component}.${key} must be a string.`) : null;
}
export function optionalFunction(props, key, component) {
  return props[key] !== undefined && typeof props[key] !== "function" ? new Error(`${component}.${key} must be a function.`) : null;
}
export function architectureStudy(props, key, component) {
  const study = props[key];
  const valid = study && ["id", "title", "flowLabel", "architectureNote"].every((field) => typeof study[field] === "string")
    && Array.isArray(study.architecture) && study.architecture.length > 0
    && study.architecture.every((step) => typeof step.title === "string" && typeof step.detail === "string");
  return valid ? null : new Error(`${component}.${key} requires a case study with labelled architecture steps.`);
}
