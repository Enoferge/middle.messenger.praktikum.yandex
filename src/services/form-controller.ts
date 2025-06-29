export class FormController {
  /* eslint-disable no-use-before-define */
  private static __instance: FormController;

  static getInstance(): FormController {
    if (!FormController.__instance) {
      FormController.__instance = new FormController();
    }
    return FormController.__instance;
  }

  setError(error: string): void {
    window.store.set({
      formError: error,
    });
  }

  clearError(): void {
    window.store.set({
      formError: null,
    });
  }

  getError(): string | null {
    const state = window.store.getState();
    return state.formError;
  }

  hasError(): boolean {
    return this.getError() !== null;
  }

  setLoading(isLoading: boolean): void {
    window.store.set({
      formLoading: isLoading,
    });
  }
}

export const formController = FormController.getInstance();
