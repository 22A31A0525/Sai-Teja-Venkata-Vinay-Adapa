export const contactLimits = { name: 120, email: 254, message: 5000 };

export function validateContact(input) {
  const data = Object.fromEntries(Object.keys(contactLimits).map((key) => [key, typeof input?.[key] === "string" ? input[key].trim() : ""]));
  const errors = {};
  if (!data.name) errors.name = "Enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Enter a valid email address.";
  if (!data.message) errors.message = "Enter a message.";
  for (const [key, limit] of Object.entries(contactLimits)) {
    if (data[key].length > limit) errors[key] = `Use ${limit} characters or fewer.`;
  }
  return { data, errors, valid: Object.keys(errors).length === 0 };
}

export function contactErrorMessage(error) {
  if (error?.code === "permission-denied") return "The message service could not accept your message. Please email me instead.";
  if (error?.code === "unavailable" || error?.code === "deadline-exceeded") return "The message service is unavailable. Your message is still here; try again or email me.";
  return "Your message could not be saved. Your text is still here; try again or email me.";
}
