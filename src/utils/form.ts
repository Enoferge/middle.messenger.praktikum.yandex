export function prepareForm(
  formId: string,
  submitCb: (data: Record<string, FormDataEntryValue>) => void,
) {
  const form = document.getElementById(formId) as HTMLFormElement | undefined;

  if (!form) {
    console.error(`Form with id: ${formId} not found!`);
    return;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const values = Object.fromEntries(formData.entries());
    submitCb(values);
  });
}
