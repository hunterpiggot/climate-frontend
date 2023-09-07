import i18next from "i18next";
import { IAppNotification, NotificationStatus } from "@/models/shared";
import { IHttpClientExceptionInfo } from "./HttpClient.interface";

/**
 * @name httpResponseHelper
 * @description TODO needs description
 */
export const httpResponseHelper = Object.freeze({
  parseExceptionMessage(message: string): string {
    if (typeof message === "string" && message.includes("EXCEPTION")) {
      if (message.includes("invalid arguments")) {
        return "Incorrect email address or password.";
      }
    }
    return message || "";
  },

  getAppNotificationFromHttpExceptionInfo(
    httpExceptionInfo: IHttpClientExceptionInfo,
    t: typeof i18next.t = i18next.t
  ): IAppNotification {
    const appNotification: IAppNotification = {
      message: "",
      status: NotificationStatus.none,
    };

    if (httpExceptionInfo) {
      const { status, statusText, headers } = httpExceptionInfo;
      const parsedMessage = httpResponseHelper.parseExceptionMessage(
        httpExceptionInfo.message!
      );
      const errorPlaceHolder = "[error]";
      let message: string = (t ? t("asdf") : parsedMessage).toString();
      if ((statusText || "").length > 0) {
        const statusMessage = `${statusText}: HttpStatus is ${status}`;
        if (message.indexOf(errorPlaceHolder) > -1) {
          message = message.replace(errorPlaceHolder, statusMessage);
        } else {
          message = `${message}: ${statusText}: HttpStatus is ${status}`;
        }
      }
      if (message.indexOf(errorPlaceHolder) > -1) {
        message = message.replace(errorPlaceHolder, "unknown");
      }
      appNotification.message = message;
      appNotification.status =
        Number(status) >= 400
          ? NotificationStatus.error
          : NotificationStatus.warning;
      appNotification.otherInfo = {
        statusText,
        headers,
      };
    }

    return appNotification;
  },
});
