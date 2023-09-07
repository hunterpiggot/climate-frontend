import { IApiResponseIssueItem } from "./ApiResponseIssueItem.interface";

/**
 * @name IApiResponseWithNotificationIssues
 * @description
 */
export interface IApiResponseWithNotificationIssues {
  notificationIssues?: {
    error: {
      issues: IApiResponseIssueItem[];
    };
    userId: string;
  }[];
}
