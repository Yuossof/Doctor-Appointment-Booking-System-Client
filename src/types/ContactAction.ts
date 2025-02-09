export interface ContactActionForm {
    success: boolean;
    message: string;
    errors: {
      message?: string[];
    };
    data: {
        message?: string;
    }
  }
  