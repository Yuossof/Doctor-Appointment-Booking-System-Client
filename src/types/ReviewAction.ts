export default interface RFAction {
        message: string,
        id: string;
        success: boolean;
        data: {};
        errors: {
            message?: string;
            error?: Record<string, string[]>
        };
}