"use server";

export async function handleForm(prevState: any, formData: FormData) {
  const passowrd = formData.get("password");

  if (passowrd !== "12345") {
    return {
      errors: ["Wrong Passowrd"],
      success: false,
    };
  } else
    return {
      success: true,
    };
}
