import { TR } from "../constants";

export const getErrorMessage = (error) => {
    switch (error.code) {
        case "auth/invalid-email":
        return TR.errors.invalid_email;
        case "auth/email-already-in-use":
        return TR.errors.email_already_in_use;
        case "auth/operation-not-allowed":
        return TR.errors.operation_not_allowed;
        case "auth/weak-password":
        return TR.errors.weak_password;
        case "auth/user-not-found":
        return TR.errors.user_not_found;
        case "auth/wrong-password":
        return TR.errors.wrong_password;
        default:
        return TR.errors.unknown_error;
    }
}

export const isErrorMessage = (error) => {
    return error && error.code && error.message;
}