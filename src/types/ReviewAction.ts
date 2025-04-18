export default interface RFAction {
        message: string,
        id: string;
        success: boolean;
        data: Record<string, string>;
        errors: {
            message?: string;
            error?: Record<string, string[]>
        };
}